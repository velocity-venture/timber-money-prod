// Implementation of storage interface using database
import {
  users,
  documents,
  debts,
  assets,
  financialProfiles,
  chatMessages,
  pitchAccessTokens,
  type User,
  type UpsertUser,
  type Document,
  type InsertDocument,
  type Debt,
  type InsertDebt,
  type Asset,
  type InsertAsset,
  type FinancialProfile,
  type InsertFinancialProfile,
  type ChatMessage,
  type InsertChatMessage,
  type PitchAccessToken,
  type InsertPitchAccessToken,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(
    userId: string,
    customerId: string,
    subscriptionId: string
  ): Promise<User>;
  updateUserSubscription(
    userId: string,
    subscriptionData: {
      stripeCustomerId: string;
      stripeSubscriptionId: string;
      subscriptionStatus: string;
      subscriptionPlan: string;
    }
  ): Promise<User>;

  // Document operations
  createDocument(doc: InsertDocument): Promise<Document>;
  getDocumentsByUser(userId: string): Promise<Document[]>;
  updateDocumentStatus(
    id: string,
    status: string,
    analysisData?: any
  ): Promise<Document>;

  // Debt operations
  createDebt(debt: InsertDebt): Promise<Debt>;
  getDebtsByUser(userId: string): Promise<Debt[]>;
  updateDebt(id: string, updates: Partial<InsertDebt>): Promise<Debt>;
  deleteDebt(id: string): Promise<void>;

  // Asset operations
  createAsset(asset: InsertAsset): Promise<Asset>;
  getAssetsByUser(userId: string): Promise<Asset[]>;
  updateAsset(id: string, updates: Partial<InsertAsset>): Promise<Asset>;
  deleteAsset(id: string): Promise<void>;

  // Financial Profile operations
  upsertFinancialProfile(
    profile: InsertFinancialProfile
  ): Promise<FinancialProfile>;
  getFinancialProfile(userId: string): Promise<FinancialProfile | undefined>;

  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(userId: string, limit?: number): Promise<ChatMessage[]>;
  
  // Pitch deck access token operations
  createPitchAccessToken(token: InsertPitchAccessToken): Promise<PitchAccessToken>;
  getPitchAccessToken(token: string): Promise<PitchAccessToken | undefined>;
  getAllPitchAccessTokens(createdBy: string): Promise<PitchAccessToken[]>;
  incrementTokenUsage(token: string): Promise<PitchAccessToken>;
  deactivateToken(id: string): Promise<void>;
  
  // Data deletion
  deleteAllUserData(userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(
    userId: string,
    customerId: string,
    subscriptionId: string
  ): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserSubscription(
    userId: string,
    subscriptionData: {
      stripeCustomerId: string;
      stripeSubscriptionId: string;
      subscriptionStatus: string;
      subscriptionPlan: string;
    }
  ): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: subscriptionData.stripeCustomerId,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
        subscriptionStatus: subscriptionData.subscriptionStatus,
        subscriptionPlan: subscriptionData.subscriptionPlan,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Document operations
  async createDocument(doc: InsertDocument): Promise<Document> {
    const [document] = await db.insert(documents).values(doc).returning();
    return document;
  }

  async getDocumentsByUser(userId: string): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId))
      .orderBy(desc(documents.uploadedAt));
  }

  async updateDocumentStatus(
    id: string,
    status: string,
    analysisData?: any
  ): Promise<Document> {
    const [document] = await db
      .update(documents)
      .set({
        status,
        processedAt: status === "completed" ? new Date() : null,
        analysisData,
      })
      .where(eq(documents.id, id))
      .returning();
    return document;
  }

  // Debt operations
  async createDebt(debt: InsertDebt): Promise<Debt> {
    const [result] = await db.insert(debts).values(debt).returning();
    return result;
  }

  async getDebtsByUser(userId: string): Promise<Debt[]> {
    return await db.select().from(debts).where(eq(debts.userId, userId));
  }

  async updateDebt(id: string, updates: Partial<InsertDebt>): Promise<Debt> {
    const [debt] = await db
      .update(debts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(debts.id, id))
      .returning();
    return debt;
  }

  async deleteDebt(id: string): Promise<void> {
    await db.delete(debts).where(eq(debts.id, id));
  }

  // Asset operations
  async createAsset(asset: InsertAsset): Promise<Asset> {
    const [result] = await db.insert(assets).values(asset).returning();
    return result;
  }

  async getAssetsByUser(userId: string): Promise<Asset[]> {
    return await db.select().from(assets).where(eq(assets.userId, userId));
  }

  async updateAsset(id: string, updates: Partial<InsertAsset>): Promise<Asset> {
    const [asset] = await db
      .update(assets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(assets.id, id))
      .returning();
    return asset;
  }

  async deleteAsset(id: string): Promise<void> {
    await db.delete(assets).where(eq(assets.id, id));
  }

  // Financial Profile operations
  async upsertFinancialProfile(
    profileData: InsertFinancialProfile
  ): Promise<FinancialProfile> {
    const [profile] = await db
      .insert(financialProfiles)
      .values(profileData)
      .onConflictDoUpdate({
        target: financialProfiles.userId,
        set: {
          ...profileData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return profile;
  }

  async getFinancialProfile(
    userId: string
  ): Promise<FinancialProfile | undefined> {
    const [profile] = await db
      .select()
      .from(financialProfiles)
      .where(eq(financialProfiles.userId, userId));
    return profile;
  }

  // Chat operations
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [msg] = await db.insert(chatMessages).values(message).returning();
    return msg;
  }

  async getChatHistory(
    userId: string,
    limit: number = 50
  ): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);
  }
  
  // Pitch deck access token operations
  async createPitchAccessToken(tokenData: InsertPitchAccessToken): Promise<PitchAccessToken> {
    const [token] = await db.insert(pitchAccessTokens).values(tokenData).returning();
    return token;
  }

  async getPitchAccessToken(token: string): Promise<PitchAccessToken | undefined> {
    const [accessToken] = await db
      .select()
      .from(pitchAccessTokens)
      .where(eq(pitchAccessTokens.token, token));
    return accessToken;
  }

  async getAllPitchAccessTokens(createdBy: string): Promise<PitchAccessToken[]> {
    return await db
      .select()
      .from(pitchAccessTokens)
      .where(eq(pitchAccessTokens.createdBy, createdBy))
      .orderBy(desc(pitchAccessTokens.createdAt));
  }

  async incrementTokenUsage(token: string): Promise<PitchAccessToken> {
    const [updated] = await db
      .update(pitchAccessTokens)
      .set({
        usageCount: sql`${pitchAccessTokens.usageCount} + 1`,
        lastUsedAt: new Date(),
      })
      .where(eq(pitchAccessTokens.token, token))
      .returning();
    return updated;
  }

  async deactivateToken(id: string): Promise<void> {
    await db
      .update(pitchAccessTokens)
      .set({ isActive: false })
      .where(eq(pitchAccessTokens.id, id));
  }

  // Delete all user data
  async deleteAllUserData(userId: string): Promise<void> {
    // Delete in order of dependencies (reverse of foreign keys)
    await db.delete(chatMessages).where(eq(chatMessages.userId, userId));
    await db.delete(documents).where(eq(documents.userId, userId));
    await db.delete(debts).where(eq(debts.userId, userId));
    await db.delete(assets).where(eq(assets.userId, userId));
    await db.delete(financialProfiles).where(eq(financialProfiles.userId, userId));
    await db.delete(pitchAccessTokens).where(eq(pitchAccessTokens.createdBy, userId));
    // Note: We keep the user account itself for auth purposes
    // If you want to fully delete, uncomment the next line:
    // await db.delete(users).where(eq(users.id, userId));
  }
}

export const storage = new DatabaseStorage();
