import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (Required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table (Required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status"), // active, canceled, past_due, etc.
  subscriptionPlan: varchar("subscription_plan"), // free, pro_monthly, pro_annual, family_monthly, family_annual
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Financial Documents table
export const documents = pgTable("documents", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileType: varchar("file_type").notNull(),
  documentType: varchar("document_type").notNull(), // bank-statement, credit-card, etc
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  processedAt: timestamp("processed_at"),
  analysisData: jsonb("analysis_data"), // Extracted data from AI
  status: varchar("status").notNull().default("pending"), // pending, processing, completed, failed
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
  processedAt: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// Debts table
export const debts = pgTable("debts", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  creditor: text("creditor").notNull(),
  debtType: varchar("debt_type").notNull(), // credit-card, loan, mortgage
  currentBalance: decimal("current_balance", { precision: 12, scale: 2 }).notNull(),
  originalBalance: decimal("original_balance", { precision: 12, scale: 2 }),
  apr: decimal("apr", { precision: 5, scale: 2 }).notNull(),
  minimumPayment: decimal("minimum_payment", { precision: 10, scale: 2 }).notNull(),
  dueDate: integer("due_date"), // Day of month
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDebtSchema = createInsertSchema(debts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDebt = z.infer<typeof insertDebtSchema>;
export type Debt = typeof debts.$inferSelect;

// Assets table
export const assets = pgTable("assets", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  assetType: varchar("asset_type").notNull(), // property, vehicle, investment, savings
  currentValue: decimal("current_value", { precision: 12, scale: 2 }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;

// Financial Profile table
export const financialProfiles = pgTable("financial_profiles", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  monthlyIncome: decimal("monthly_income", { precision: 10, scale: 2 }),
  creditScore: integer("credit_score"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFinancialProfileSchema = createInsertSchema(
  financialProfiles
).omit({
  id: true,
  updatedAt: true,
});

export type InsertFinancialProfile = z.infer<
  typeof insertFinancialProfileSchema
>;
export type FinancialProfile = typeof financialProfiles.$inferSelect;

// Chat Messages table (for AI conversations)
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role").notNull(), // user or assistant
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Pitch Deck Access Tokens table (for secure sharing)
export const pitchAccessTokens = pgTable("pitch_access_tokens", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  token: varchar("token").notNull().unique(), // The actual access token
  createdBy: varchar("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  recipientEmail: varchar("recipient_email"), // Optional: who this was sent to
  recipientName: varchar("recipient_name"), // Optional: name for tracking
  expiresAt: timestamp("expires_at"), // Optional expiration
  maxUses: integer("max_uses"), // Optional usage limit
  usageCount: integer("usage_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  lastUsedAt: timestamp("last_used_at"),
});

export const insertPitchAccessTokenSchema = createInsertSchema(pitchAccessTokens).omit({
  id: true,
  usageCount: true,
  createdAt: true,
  lastUsedAt: true,
});

export type InsertPitchAccessToken = z.infer<typeof insertPitchAccessTokenSchema>;
export type PitchAccessToken = typeof pitchAccessTokens.$inferSelect;
