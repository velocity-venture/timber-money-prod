// Implementation combining Replit Auth and Stripe integrations
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  analyzeFinancialDocument,
  generateFinancialAdvice,
  createDebtPayoffPlan,
} from "./openai";
import multer from "multer";
import { z } from "zod";
import Stripe from "stripe";

// Set up file upload handling
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Initialize Stripe only if keys are available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Document upload and analysis
  app.post(
    "/api/documents/upload",
    isAuthenticated,
    upload.single("file"),
    async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const file = req.file;
        const documentType = req.body.documentType;

        if (!file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        // Create document record
        const document = await storage.createDocument({
          userId,
          fileName: file.originalname,
          fileType: file.mimetype,
          documentType,
          status: "processing",
          analysisData: null,
        });

        // Analyze document with AI
        const base64Image = file.buffer.toString("base64");
        const analysis = await analyzeFinancialDocument(
          base64Image,
          documentType
        );

        // Update document with analysis
        await storage.updateDocumentStatus(
          document.id,
          "completed",
          analysis
        );

        // Auto-create debts from analysis
        if (analysis.extractedData.debts) {
          for (const debt of analysis.extractedData.debts) {
            await storage.createDebt({
              userId,
              creditor: debt.creditor,
              debtType: documentType === "credit-cards" ? "credit-card" : "loan",
              currentBalance: debt.balance.toString(),
              originalBalance: debt.balance.toString(),
              apr: (debt.apr || 0).toString(),
              minimumPayment: (debt.minimumPayment || 0).toString(),
              dueDate: null,
            });
          }
        }

        // Auto-create assets from analysis
        if (analysis.extractedData.assets) {
          for (const asset of analysis.extractedData.assets) {
            await storage.createAsset({
              userId,
              name: asset.name,
              assetType: asset.type as any,
              currentValue: asset.value.toString(),
              details: asset.details,
            });
          }
        }

        // Update financial profile
        if (analysis.extractedData.income?.monthlyAmount) {
          await storage.upsertFinancialProfile({
            userId,
            monthlyIncome: analysis.extractedData.income.monthlyAmount.toString(),
            creditScore: analysis.extractedData.creditScore || null,
          });
        }

        res.json({ document, analysis });
      } catch (error: any) {
        console.error("Error processing document:", error);
        res
          .status(500)
          .json({ message: "Failed to process document: " + error.message });
      }
    }
  );

  // Get all documents
  app.get("/api/documents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const documents = await storage.getDocumentsByUser(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Debt management
  app.get("/api/debts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const debts = await storage.getDebtsByUser(userId);
      res.json(debts);
    } catch (error) {
      console.error("Error fetching debts:", error);
      res.status(500).json({ message: "Failed to fetch debts" });
    }
  });

  app.post("/api/debts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const debt = await storage.createDebt({ ...req.body, userId });
      res.json(debt);
    } catch (error: any) {
      console.error("Error creating debt:", error);
      res.status(500).json({ message: "Failed to create debt" });
    }
  });

  app.delete("/api/debts/:id", isAuthenticated, async (req: any, res) => {
    try {
      await storage.deleteDebt(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting debt:", error);
      res.status(500).json({ message: "Failed to delete debt" });
    }
  });

  // Asset management
  app.get("/api/assets", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const assets = await storage.getAssetsByUser(userId);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.post("/api/assets", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const asset = await storage.createAsset({ ...req.body, userId });
      res.json(asset);
    } catch (error: any) {
      console.error("Error creating asset:", error);
      res.status(500).json({ message: "Failed to create asset" });
    }
  });

  // Financial profile
  app.get("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getFinancialProfile(userId);
      res.json(profile || {});
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Cashflow Analysis - Calculate safe monthly EXTRA
  app.get("/api/cashflow/analysis", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Get user's financial data
      const debts = await storage.getDebtsByUser(userId);
      const documents = await storage.getDocumentsByUser(userId);
      const profile = await storage.getFinancialProfile(userId);
      
      // Calculate total minimum debt payments
      const minimumDebtPayments = debts.reduce((total, debt) => {
        return total + parseFloat(debt.minimumPayment || "0");
      }, 0);

      // Extract income and expenses from analyzed documents
      let monthlyIncome = profile?.monthlyIncome ? parseFloat(profile.monthlyIncome) : 0;
      let essentialExpenses = 0;
      let discretionarySpending = 0;
      let currentSavings = 0;

      // Process documents to extract financial data
      documents.forEach((doc: any) => {
        if (doc.analysisData?.extractedData) {
          const data = doc.analysisData.extractedData;
          
          // Extract income
          if (data.income?.monthlyAmount) {
            monthlyIncome = Math.max(monthlyIncome, data.income.monthlyAmount);
          }
          
          // Extract expenses from bank statements
          if (doc.documentType === "bank-statements" && data.expenses) {
            essentialExpenses += data.expenses.essential || 0;
            discretionarySpending += data.expenses.discretionary || 0;
          }
          
          // Extract savings
          if (data.accountBalance) {
            currentSavings += data.accountBalance;
          }
        }
      });

      // If no detailed expense data, estimate based on income
      if (essentialExpenses === 0 && monthlyIncome > 0) {
        essentialExpenses = monthlyIncome * 0.5; // 50% for essentials
        discretionarySpending = monthlyIncome * 0.2; // 20% for discretionary
      }

      // Calculate safe monthly EXTRA
      const netCashflow = monthlyIncome - essentialExpenses - minimumDebtPayments - discretionarySpending;
      
      // Safety buffer: Keep 20% of net cashflow as emergency buffer
      const emergencyBuffer = netCashflow * 0.2;
      let safeMonthlyExtra = Math.max(0, netCashflow - emergencyBuffer);
      
      // Cap at 35% of monthly income for safety
      safeMonthlyExtra = Math.min(safeMonthlyExtra, monthlyIncome * 0.35);
      
      // Round to nearest $25
      safeMonthlyExtra = Math.round(safeMonthlyExtra / 25) * 25;

      // Calculate confidence score based on data completeness
      let confidenceScore = 50; // Base score
      if (monthlyIncome > 0) confidenceScore += 20;
      if (documents.length > 3) confidenceScore += 15;
      if (currentSavings > monthlyIncome) confidenceScore += 15;
      confidenceScore = Math.min(100, confidenceScore);

      // Generate AI recommendations
      const recommendations = [];
      
      if (safeMonthlyExtra > 500) {
        recommendations.push("Excellent cashflow! Consider the Avalanche method to minimize interest payments.");
      }
      
      if (currentSavings < monthlyIncome) {
        recommendations.push("Build emergency fund to 1 month of expenses before aggressive debt payoff.");
      }
      
      if (minimumDebtPayments > monthlyIncome * 0.4) {
        recommendations.push("High debt-to-income ratio. Focus on highest interest debts first.");
      }
      
      if (discretionarySpending > monthlyIncome * 0.3) {
        recommendations.push("Consider reducing discretionary spending by 10% to accelerate debt freedom.");
      }

      const analysis = {
        monthlyIncome,
        essentialExpenses,
        minimumDebtPayments,
        discretionarySpending,
        currentSavings,
        safeMonthlyExtra,
        confidenceScore,
        recommendations,
      };

      res.json(analysis);
    } catch (error: any) {
      console.error("Error calculating cashflow analysis:", error);
      res.status(500).json({ message: "Failed to calculate cashflow analysis" });
    }
  });

  // AI Chat
  app.post("/api/chat", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { message } = req.body;

      // Save user message
      await storage.createChatMessage({
        userId,
        role: "user",
        content: message,
      });

      // Get user's financial context
      const debts = await storage.getDebtsByUser(userId);
      const assets = await storage.getAssetsByUser(userId);
      const profile = await storage.getFinancialProfile(userId);

      // Generate AI response
      const response = await generateFinancialAdvice(message, {
        debts,
        assets,
        income: profile?.monthlyIncome ? parseFloat(profile.monthlyIncome) : undefined,
        creditScore: profile?.creditScore || undefined,
      });

      // Save AI response
      await storage.createChatMessage({
        userId,
        role: "assistant",
        content: response,
      });

      res.json({ response });
    } catch (error: any) {
      console.error("Error in chat:", error);
      res.status(500).json({ message: "Failed to process chat: " + error.message });
    }
  });

  app.get("/api/chat/history", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getChatHistory(userId);
      res.json(history.reverse()); // Oldest first
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Debt payoff plan
  app.post("/api/payoff-plan", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const debts = await storage.getDebtsByUser(userId);
      const { monthlyBudget } = req.body;

      const plan = await createDebtPayoffPlan({
        debts: debts.map((d) => ({
          creditor: d.creditor,
          balance: parseFloat(d.currentBalance),
          apr: parseFloat(d.apr),
          minimumPayment: parseFloat(d.minimumPayment),
        })),
        monthlyBudget,
      });

      res.json(plan);
    } catch (error: any) {
      console.error("Error creating payoff plan:", error);
      res.status(500).json({ message: "Failed to create plan: " + error.message });
    }
  });

  // Stripe subscription routes (if Stripe is configured)
  if (stripe) {
    app.post(
      "/api/create-subscription",
      isAuthenticated,
      async (req: any, res) => {
        try {
          const userId = req.user.claims.sub;
          const user = await storage.getUser(userId);

          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          // Check if user already has subscription
          if (user.stripeSubscriptionId) {
            const subscription = await stripe!.subscriptions.retrieve(
              user.stripeSubscriptionId
            );
            return res.json({
              subscriptionId: subscription.id,
              clientSecret: (subscription.latest_invoice as any)?.payment_intent
                ?.client_secret,
            });
          }

          // Create Stripe customer
          const customer = await stripe!.customers.create({
            email: user.email || undefined,
            name: user.firstName
              ? `${user.firstName} ${user.lastName || ""}`.trim()
              : undefined,
          });

          // Create subscription (you'll need to set STRIPE_PRICE_ID)
          const priceId = process.env.STRIPE_PRICE_ID || "price_placeholder";
          const subscription = await stripe!.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
          });

          // Update user with Stripe info
          await storage.updateUserStripeInfo(
            userId,
            customer.id,
            subscription.id
          );

          res.json({
            subscriptionId: subscription.id,
            clientSecret: (subscription.latest_invoice as any)?.payment_intent
              ?.client_secret,
          });
        } catch (error: any) {
          console.error("Error creating subscription:", error);
          res.status(500).json({ message: error.message });
        }
      }
    );
  }

  const httpServer = createServer(app);
  return httpServer;
}
