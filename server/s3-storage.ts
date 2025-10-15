import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import fs from "fs";

// Validate required S3 environment variables
const requiredEnvVars = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "AWS_S3_BUCKET"];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`[S3] Missing required environment variables: ${missingVars.join(", ")}`);
  console.error("[S3] S3 storage will be disabled. Set these variables to enable cloud storage.");
}

const s3Enabled = missingVars.length === 0;

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.AWS_S3_BUCKET || "";

export async function uploadToS3(localPath: string, originalName: string, mime: string): Promise<string> {
  if (!s3Enabled) {
    throw new Error("S3 storage is not configured. Required environment variables are missing.");
  }
  const key = `uploads/${randomUUID()}-${originalName}`;
  const body = fs.readFileSync(localPath);
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: mime }));
  // Clean up local file only after successful S3 upload
  fs.unlinkSync(localPath);
  return key; // S3 key
}

export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  if (!s3Enabled) {
    throw new Error("S3 storage is not configured. Required environment variables are missing.");
  }
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return await getSignedUrl(s3, command, { expiresIn });
}

export async function getS3Object(key: string): Promise<Buffer> {
  if (!s3Enabled) {
    throw new Error("S3 storage is not configured. Required environment variables are missing.");
  }
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  const response = await s3.send(command);
  const stream = response.Body as any;
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
