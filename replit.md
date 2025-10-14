# Timber Money - AI-Powered Financial Management

## Overview
Timber Money is an AI-powered financial management platform featuring the "Timber" AI assistant with "Autopilot Money Ops" philosophy. Built with React, Express, PostgreSQL, and OpenAI (GPT-4o), the application transforms messy financial documents into automated money management. The platform offers mobile-first document upload, AI-powered analysis, and tiered pricing plans. Timber Money empowers users to move from financial chaos to true autopilot management.

## User Preferences

### Design & UX
- **Design System**: Stripe-inspired professional aesthetic
- **Color Scheme**: Dark mode by default with light mode support
- **Security Messaging**: Emphasize "bank-level encryption" throughout UI
- **Trust Signals**: Professional financial statements, clear privacy policy

### Privacy & Security
- **Data Handling**: Documents processed in real-time, not permanently stored
- **Encryption**: Bank-level AES-256 encryption
- **Compliance**: Privacy policy and terms of service included
- **User Control**: Easy data export and account deletion

### Monetization
- Free tier to attract users
- Pro tier ($19/month) for power users
- Family tier ($39/month) for households
- 14-day refund policy
- Stripe integration for secure payments

## System Architecture

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OIDC-based)
- **AI**: OpenAI GPT-4 for document analysis and financial advice
- **Payments**: Stripe for subscriptions
- **Session Management**: PostgreSQL-backed sessions

### Key Features
1. **Document Upload & Analysis**: Dual upload system with AI-powered data extraction and bank-level encryption
   - **AI Vision Analysis** (POST /api/documents/upload): OpenAI GPT-4 vision analyzes images and extracts financial data automatically
   - **PDF/OCR Extraction** (POST /api/docs/upload): Direct text extraction from PDFs using pdf-parse and OCR for images using Tesseract.js
   - Supports 6 document types: bank statements, credit cards, loans, credit reports, investments, income documents
   - Mobile-first upload with camera capture and photo library support
   - Documents processed in real-time, not permanently stored
   - Enhanced error handling ensures UI resilience during upload failures
2. **Financial Profile Dashboard**: Provides complete asset/liability tracking, budget visualizations, income/expense analysis, and credit score tracking.
3. **Debt Payoff Strategies**: Offers Avalanche, Snowball, and hybrid methods with side-by-side comparisons.
4. **AI Financial Advisor**: A chat-based Q&A interface providing personalized, context-aware advice based on user financial profiles and uploaded documents.
5. **Subscription Plans**: Includes Free, Pro, and Family tiers with varying features and access levels.

### Database Schema
- **Users**: Managed by Replit Auth with subscription tracking (stripeCustomerId, stripeSubscriptionId, subscriptionStatus, subscriptionPlan); session management via PostgreSQL.
- **Documents**: Enhanced schema for dual upload system
  - Core fields: userId, fileName, fileType, documentType, status, analysisData (stores both AI analysis and PDF/OCR extracted data)
  - PDF/OCR fields: size, pages, sourcePath, needsReview
  - Supports both AI vision analysis and direct text extraction workflows
- **Debts**: Tracks debts with principal, interest rate, and minimum payments.
- **Assets**: Tracks assets like bank accounts, investments, and property.
- **Income**: Manages income sources, amounts, and frequency.
- **Budgets**: Handles budget category management and monthly allocations.
- **Sessions**: Secure session storage with `express-session` and PostgreSQL.
- **Timber Analytics**: Daily aggregated statistics for Timber AI usage (interactions, messages, documents analyzed)

### Subscription & Payment Flow
1. **Authentication Required**: Users must log in with Replit Auth before subscribing to paid plans
   - Pricing page waits for auth to finish loading before allowing plan selection
   - Prevents race conditions with authentication state
2. **Checkout Creation**: POST /api/checkout with plan parameter (requires authentication)
   - Plans: pro_monthly, pro_annual, family_monthly, family_annual
   - User ID and email automatically passed to Stripe as metadata
3. **Payment Processing**: Users redirected to Stripe Checkout for secure payment
4. **Session Verification**: After payment, users land on /subscription-success with session_id
   - Page automatically calls GET /api/checkout/verify-session (public endpoint)
   - Endpoint validates Stripe session and extracts userId from metadata (no auth required due to Stripe redirect)
   - Security: Session validation through Stripe API, userId extracted from session metadata
   - Handles pending payments (subscription=null or payment_status!='paid') with retry logic
   - Updates user record only after confirming subscription exists and payment is complete
5. **Subscription Tracking**: User subscription status stored in database for access control

### UI/UX Decisions
- Rebranded UI to emphasize the journey from financial chaos to automated management.
- Implemented a bright emerald green primary color scheme.
- Professional financial statements and clear legal pages enhance trust.
- Mobile experience enhanced with photo capture for document upload.
- Document upload error handling: try-finally blocks ensure UI always recovers from upload failures.

### Document Processing Architecture
1. **Shoebox Mode** (Default): Users dump all documents at once
   - Auto-detects document type from filename patterns
   - AI categorizes and extracts data automatically
   - Mobile-optimized with camera capture and photo library
2. **Organized Mode**: Users select document type first, then upload
   - Targeted upload for specific document categories
   - More control over categorization
3. **Processing Pipeline**:
   - Files staged locally with pending status
   - User triggers batch processing via "Analyze & Create Autopilot Plan" button
   - Sequential processing with status updates: pending → uploading → analyzing → completed/error
   - Per-file error handling prevents cascade failures
   - Auto-creates debts, assets, and income from extracted data
4. **Admin Dashboard** (/admin/timber):
   - Header-based authentication using ADMIN_VIEW_KEY secret
   - Real-time Timber analytics with daily stats API
   - Interactive charts for usage tracking

## External Dependencies

- **Replit Auth**: For secure user authentication (Google, GitHub, email/password).
- **Stripe**: For subscription-based monetization, handling payments and subscription management.
- **OpenAI**: Utilized for AI-powered document analysis and the AI financial advisor (GPT-4o-mini for free users, GPT-4o for paid subscribers).
- **PostgreSQL**: The primary database for persistent storage.
- **Vite**: Frontend build tool.
- **Tailwind CSS**: For styling and responsive design.
- **shadcn/ui**: UI component library.
- **Drizzle ORM**: For database schema definition and interaction.
- **express-session**: For secure session management.
- **pdf-parse**: PDF text extraction for document processing.
- **Tesseract.js**: OCR (Optical Character Recognition) for image-based documents.