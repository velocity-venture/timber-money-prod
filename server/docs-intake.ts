import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Tesseract from "tesseract.js";
import { db } from "./db";
import { documents } from "../shared/schema";
import { eq, and } from "drizzle-orm";
import { enrich } from "./docs-parse-pass";
import { uploadToS3 } from "./s3-storage";

export const docsRouter = Router();

const upload = multer({ 
  dest: path.join(process.cwd(), "uploads"),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

function guessDocumentType(text: string, fileName: string): string {
  const t = text.toLowerCase();
  const f = fileName.toLowerCase();
  
  if (/statement/i.test(t) && /balance/i.test(t)) return "bank-statement";
  if (/(bank|checking|savings)\s+statement/i.test(t)) return "bank-statement";
  if (/credit\s+card/i.test(t)) return "credit-card";
  if (/invoice/i.test(t)) return "invoice";
  if (/receipt/i.test(t)) return "receipt";
  if (/tax\s+return|1040|w-?2/i.test(t)) return "tax-document";
  if (/pay\s*stub|payroll/i.test(t)) return "paystub";
  
  return "other";
}

function normalizeExtractedData(text: string, fileName: string) {
  const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 500);
  
  const totalsMatch = text.match(/\btotal(?:\s+amount)?\s*[:-]?\s*\$?\s*([0-9][0-9,]*.?[0-9]{0,2})/i);
  const dateMatch = text.match(/\b(20\d{2}[-\/.]\d{1,2}[-\/.]\d{1,2}|\d{1,2}[-\/.]\d{1,2}[-\/.]20\d{2})\b/);
  const vendorMatch = text.match(/\b(from|vendor|merchant|payee)[:\s]+([A-Za-z0-9&., -]{3,40})/i);
  const accountMatch = text.match(/\b(?:account|acct)(?:\s+#|:|\s+number)?\s*([0-9X*]{4,})/i);
  
  return {
    type: guessDocumentType(text, fileName),
    summary: {
      total: totalsMatch ? totalsMatch[1] : null,
      date: dateMatch ? dateMatch[1] : null,
      vendor: vendorMatch ? vendorMatch[2].trim() : null,
      account: accountMatch ? accountMatch[1] : null,
    },
    preview: lines.slice(0, 40),
    fullText: text.slice(0, 5000),
  };
}

async function extractFromPDF(filePath: string) {
  const buf = fs.readFileSync(filePath);
  // Dynamic import for pdf-parse (CommonJS module)
  const pdfParseModule = await import("pdf-parse");
  const pdfParse = pdfParseModule.default || pdfParseModule;
  const data = await pdfParse(buf);
  const text = (data.text || "").trim();
  return { text, pages: data.numpages || 1 };
}

async function extractFromImage(filePath: string) {
  const res = await Tesseract.recognize(filePath, "eng", { 
    logger: () => {} 
  });
  const text = (res.data.text || "").trim();
  return { text, pages: 1 };
}

docsRouter.post("/upload", upload.single("file"), async (req: any, res: Response) => {
  try {
    if (!req.user?.claims?.sub) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.claims.sub;
    const file = req.file;
    const srcPath = file.path;
    const mime = file.mimetype;
    const name = file.originalname;
    const size = file.size;

    let text = "";
    let pages: number = 1;
    let extractionError = false;

    try {
      if (/pdf$/i.test(mime) || /\.pdf$/i.test(name)) {
        const out = await extractFromPDF(srcPath);
        text = out.text;
        pages = out.pages;
      } else if (/image\/(png|jpeg|jpg|gif|webp)/i.test(mime) || /\.(png|jpeg|jpg|gif|webp)$/i.test(name)) {
        const out = await extractFromImage(srcPath);
        text = out.text;
        pages = out.pages;
      } else {
        try {
          text = fs.readFileSync(srcPath, "utf8");
        } catch {
          extractionError = true;
        }
      }
    } catch (e) {
      console.error("[docs] extraction error:", e);
      extractionError = true;
    }

    const parsed = text ? normalizeExtractedData(text, name) : null;
    
    // Enrichment pass: add period, transactions, validation
    if (parsed && text) {
      try {
        const enriched = enrich(text, parsed as any);
        (parsed as any).period = enriched.period;
        (parsed as any).transactions = enriched.transactions;
        (parsed as any).validations = enriched.validations;
      } catch (e) {
        console.error("[docs] enrich pass error", e);
      }
    }
    
    const needsReview = extractionError || !parsed?.summary.total;
    const documentType = parsed?.type || "other";
    
    // Simple binary status: extraction succeeded only if no errors AND we have text and parsed data
    // Any extraction error → failed, regardless of residual text
    const status = (!extractionError && text && parsed) ? "completed" : "failed";

    // Upload to S3 and get S3 key
    let s3Key: string | null = null;
    try {
      s3Key = await uploadToS3(srcPath, name, mime);
    } catch (e) {
      console.error("[docs] S3 upload error:", e);
      // If S3 upload fails, clean up local file
      try {
        fs.unlinkSync(srcPath);
      } catch {}
    }

    const [doc] = await db
      .insert(documents)
      .values({
        userId,
        fileName: name,
        fileType: mime,
        documentType,
        status,
        size,
        pages,
        sourcePath: srcPath, // Keep for backward compatibility
        s3Key,
        analysisData: parsed,
        needsReview,
        processedAt: new Date(),
      })
      .returning();

    // Queue removed - all processing is synchronous

    res.json({
      id: doc.id,
      fileName: name,
      documentType,
      status,
      pages,
      needsReview,
      analysisData: parsed,
    });
  } catch (e) {
    console.error("[docs] upload error:", e);
    res.status(500).json({ error: "Upload failed" });
  }
});

docsRouter.get("/:id", async (req: any, res: Response) => {
  try {
    if (!req.user?.claims?.sub) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userId = req.user.claims.sub;
    const id = req.params.id;
    const [doc] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id))
      .limit(1);

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    if (doc.userId !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(doc);
  } catch (e) {
    console.error("[docs] fetch error:", e);
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

docsRouter.get("/", async (req: any, res: Response) => {
  try {
    if (!req.user?.claims?.sub) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userId = req.user.claims.sub;
    const statusFilter = req.query.status as string | undefined;
    
    let query = db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId));

    // Apply status filter if provided
    if (statusFilter) {
      query = db
        .select()
        .from(documents)
        .where(and(
          eq(documents.userId, userId),
          eq(documents.status, statusFilter)
        ));
    }

    const docs = await query.orderBy(documents.uploadedAt).limit(100);

    res.json(docs);
  } catch (e) {
    console.error("[docs] list error:", e);
    res.status(500).json({ error: "Failed to list documents" });
  }
});
