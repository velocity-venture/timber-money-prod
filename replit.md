# Shoebox to Autopilot - Turn Your Bag of Bills Into a Dashboard

## Overview
Shoebox to Autopilot transforms your messy pile of bills and financial documents into an automated money management system. Built with React, Express, PostgreSQL, and OpenAI, the app takes you from paper chaos to payment power with a simple 3-step process: Dump, Digitize, Deploy. Set it once and let it work for you.

## Recent Changes (October 2025)
- ✅ Integrated Replit Auth for secure user authentication (supports Google, GitHub, email/password)
- ✅ Set up Stripe for subscription-based monetization
- ✅ Created comprehensive database schema with Drizzle ORM
- ✅ Implemented OpenAI integration for document analysis and AI financial advisor
- ✅ Built backend API routes with authentication middleware
- ✅ Created landing page, pricing page, privacy policy, and terms of service
- ✅ Integrated frontend with authentication system
- ✅ Set up document upload with AI-powered analysis
- ✅ **MAJOR REBRAND**: Repositioned from "Debt Freedom" to "MoneyMind AI" - comprehensive money management  
- ✅ **FINAL REBRAND**: Updated from "MoneyMind AI" to "Shoebox to Autopilot" - transformation-focused messaging
- ✅ Updated all messaging to emphasize automated financial management, not just debt reduction
- ✅ Added prominent legal disclaimers for informational purposes only
- ✅ Enhanced mobile experience with photo capture capabilities for document upload
- ✅ Rebranded UI to highlight the journey from chaos to automated management
- ✅ **COMPETITIVE POSITIONING**: Added explicit competitor comparison showcasing our "true autopilot" advantage
- ✅ **COLOR REFRESH**: Updated to bright emerald green primary colors for more inviting appearance
- ✅ **OWNERSHIP BRANDING**: All assets now properly reflect Velocity Venture Holdings, LLC copyright
- ✅ **INVESTOR PITCH DECK**: Created comprehensive 11-slide pitch deck at /pitch with problem, solution, market, business model, GTM strategy, competitive analysis, and financials
- ✅ **PITCH DECK TIMELINE ACCURACY**: Updated all dates to reflect November 2025 MVP launch - no fictional metrics, accurate 2026-2030 projections, correct quarterly milestones (Q4 2025 - Q1 2027)
- ✅ **PITCH DECK FINANCIAL REALISM** (Latest Update): Completely overhauled funding ask and projections based on industry research:
  - Reduced ask from $2.5M to $750K (realistic for pre-revenue AI SaaS MVP)
  - Updated pre-money valuation from $10M to $5M (15% equity vs 20%)
  - Rewrote use of funds to reflect AI-era solo founder model:
    * Customer Acquisition: 45% ($340K) - primary growth driver
    * Product & Tech: 20% ($150K) - leveraging AI dev tools like Replit/Cursor (not $1M!)
    * Operations & Team: 20% ($150K) - lean contractor model
    * Working Capital: 15% ($110K) - 18-month runway
  - Updated TAM from $12.5B to $25B (Business Research Insights 2025)
  - Updated growth rate from 23% to 18-20% CAGR (Market Research Future 2025)
  - Added comprehensive industry source citations:
    * Business Research Insights 2025 (TAM data)
    * Market Research Future 2025 (CAGR projections)
    * First Page Sage 2025 (fintech CAC benchmarks: $200-$400)
    * OnGraph, SaaS Capital 2025 (solo founder dev costs: $25K-$100K)
    * Failory 2025 (238 unicorn companies started solo)
  - Highlighted AI copilot development reality: Solo founders can build full SaaS products for $25K-$100K using modern AI tools
  - Added financial projections disclaimer for transparency

## Project Architecture

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OIDC-based)
- **AI**: OpenAI GPT-4 for document analysis and financial advice
- **Payments**: Stripe for subscriptions
- **Session Management**: PostgreSQL-backed sessions

### Key Features
1. **Document Upload & Analysis**
   - Support for 6 document types: bank statements, credit cards, loans, credit reports, investments, income
   - AI-powered automatic data extraction
   - Bank-level encryption (AES-256)
   - Documents processed in real-time, not permanently stored

2. **Financial Profile Dashboard**
   - Complete asset and liability tracking
   - Budget breakdown visualizations
   - Income and expense analysis
   - Credit score tracking

3. **Debt Payoff Strategies**
   - Avalanche method (highest interest first)
   - Snowball method (smallest balance first)
   - Hybrid approaches
   - Side-by-side comparison of strategies

4. **AI Financial Advisor**
   - Chat-based Q&A interface
   - Personalized advice based on user's financial profile
   - Context-aware responses using uploaded document data

5. **Subscription Plans**
   - Free tier: Limited features, 5 documents
   - Pro ($19/month): Unlimited uploads, full AI advisor access
   - Family ($39/month): Multi-user support for families

### Database Schema

**Users**
- Managed by Replit Auth
- Session management via PostgreSQL

**Documents**
- User-uploaded financial documents
- Type categorization (bank, credit_card, loan, etc.)
- Metadata and upload timestamps

**Debts**
- Debt tracking with principal, interest rate, minimum payment
- Linked to users for personalized strategies

**Assets**
- Asset tracking (bank accounts, investments, property)
- Current value and category

**Income**
- Income source tracking
- Amount and frequency

**Budgets**
- Budget category management
- Monthly amount allocation

**Sessions**
- Secure session storage with express-session
- PostgreSQL-backed for persistence

## API Routes

### Authentication
- `GET /api/login` - Initiate Replit Auth login
- `GET /api/auth/callback` - OAuth callback handler
- `GET /api/auth/user` - Get current user info
- `POST /api/logout` - Log out user

### Documents
- `POST /api/documents/upload` - Upload and analyze document
- `GET /api/documents` - List user's documents
- `DELETE /api/documents/:id` - Delete document

### Financial Data
- `GET /api/debts` - Get user's debts
- `POST /api/debts` - Add new debt
- `GET /api/assets` - Get user's assets
- `GET /api/income` - Get income sources
- `GET /api/budget` - Get budget breakdown

### AI Advisor
- `POST /api/advisor/ask` - Ask AI financial advisor a question

### Subscriptions (Stripe)
- `POST /api/subscribe` - Create Stripe checkout session
- `GET /api/subscription` - Get subscription status

## Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection (auto-provided by Replit)
- `SESSION_SECRET` - Session encryption key (auto-provided)
- `OPENAI_API_KEY` - OpenAI API key (user must provide)
- `STRIPE_SECRET_KEY` - Stripe secret key (optional, for subscriptions)
- `STRIPE_PUBLISHABLE_KEY` - Stripe public key (optional)
- `REPLIT_AUTH_CLIENT_ID` - Auto-provided by Replit Auth
- `REPLIT_AUTH_CLIENT_SECRET` - Auto-provided by Replit Auth
- `ISSUER_URL` - OIDC issuer URL (auto-provided)

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

## File Structure

### Frontend (`client/src/`)
- `pages/` - All page components
  - `Landing.tsx` - Public landing page
  - `Dashboard.tsx` - Main authenticated dashboard
  - `Upload.tsx` - Document upload interface
  - `FinancialProfile.tsx` - Complete financial overview
  - `Advisor.tsx` - AI advisor chat interface
  - `Pricing.tsx` - Subscription plans
  - `Privacy.tsx` - Privacy policy
  - `Terms.tsx` - Terms of service
- `components/` - Reusable UI components
  - `ui/` - shadcn/ui components
  - `app-sidebar.tsx` - Main navigation sidebar
  - `ThemeProvider.tsx` - Dark/light theme management
- `hooks/` - Custom React hooks
  - `useAuth.ts` - Authentication state management
- `lib/` - Utilities
  - `queryClient.ts` - TanStack Query configuration

### Backend (`server/`)
- `index.ts` - Express server entry point
- `routes.ts` - All API route handlers
- `storage.ts` - Data access layer (memory-based for now)
- `openai.ts` - OpenAI integration for document analysis
- `replitAuth.ts` - Replit Auth configuration
- `vite.ts` - Vite dev server integration

### Shared (`shared/`)
- `schema.ts` - Database schema with Drizzle ORM + Zod validation

## Development Workflow

### Running the Application
```bash
npm run dev  # Starts Express + Vite dev server on port 5000
```

### Database Migrations
```bash
npm run db:push  # Sync schema changes to database
```

### Type Checking
```bash
npm run check  # Run TypeScript compiler
```

## Next Steps for Production

1. **Complete Stripe Integration**
   - Add webhook handlers for subscription events
   - Implement subscription management UI
   - Test payment flows end-to-end

2. **Enhanced Security**
   - Add rate limiting on API endpoints
   - Implement CSRF protection
   - Add file upload validation and virus scanning

3. **AI Improvements**
   - Fine-tune document analysis prompts
   - Add support for more document types
   - Improve accuracy of data extraction

4. **Testing**
   - Add unit tests for backend routes
   - Add integration tests for AI analysis
   - Add E2E tests for critical user flows

5. **Performance**
   - Implement caching for frequently accessed data
   - Optimize database queries
   - Add CDN for static assets

6. **Monitoring**
   - Set up error tracking (e.g., Sentry)
   - Add application performance monitoring
   - Implement usage analytics

## Important Notes

- **Mock Data**: Currently using in-memory storage. Switch to PostgreSQL storage implementation for production.
- **Document Storage**: Documents are not permanently stored - they're processed and deleted. Consider adding optional long-term storage.
- **AI Costs**: OpenAI API usage can be expensive at scale. Monitor costs and implement usage limits.
- **Legal Compliance**: Review privacy policy and terms with legal counsel before launch.
- **Data Protection**: Ensure GDPR/CCPA compliance if serving EU/California users.

## Privacy Mode Research (Future Feature)

### Local AI Processing Alternatives

For users who want maximum privacy, we could implement an optional "Privacy Mode" that processes documents locally without sending data to OpenAI. Here are the researched alternatives:

#### 1. **Ollama** (Recommended for simplicity)
- **Pros**: Easy setup, OpenAI-compatible API, drag-and-drop document support
- **Models**: Llama 3.3, Mistral, Phi, Qwen (0.5B-70B parameters)
- **Requirements**: 8-16GB RAM minimum
- **Implementation**: Could offer as downloadable companion app
```javascript
// Example integration
const localAPI = process.env.USE_LOCAL_AI 
  ? 'http://localhost:11434/api' 
  : 'https://api.openai.com/v1';
```

#### 2. **AnythingLLM** (Best for documents)
- **Pros**: Built specifically for document processing, handles PDFs/Word/Excel
- **Features**: RAG-based document chat, multi-user support
- **Architecture**: Could integrate via Docker API
- **Privacy**: All processing stays local, no external calls

#### 3. **LocalAI** (Best for developers)
- **Pros**: Drop-in OpenAI replacement, MIT licensed
- **Features**: LLMs, embeddings, document search
- **Deployment**: Docker/Kubernetes ready
- **API**: OpenAI-compatible endpoints

### Implementation Strategy

**Phase 1: Research & Prototype**
- Test Ollama with financial document extraction
- Benchmark accuracy vs GPT-4o-mini
- Measure hardware requirements

**Phase 2: Optional Download**
- Offer "Privacy Mode" as separate desktop app
- User downloads Ollama + our wrapper
- Documents never leave user's machine

**Phase 3: Hybrid Approach**
- Default: Cloud processing (current implementation)
- Privacy Mode: Local processing (slower but private)
- User toggles in Settings

### Cost-Benefit Analysis

| Feature | Cloud (Current) | Local (Privacy Mode) |
|---------|----------------|---------------------|
| Setup | Instant | 5-10 min download |
| Speed | Fast (1-2s) | Slower (5-30s) |
| Accuracy | High (GPT-4o) | Medium (Llama 3.3) |
| Privacy | OpenAI processes | 100% local |
| Cost | $0.02-0.30/user | Free after setup |
| Hardware | Any device | 16GB+ RAM needed |

### Privacy Mode Benefits
1. **GDPR Compliant**: No data leaves user's device
2. **Zero Cloud Costs**: One-time setup, no API fees
3. **Offline Capable**: Works without internet
4. **Data Sovereignty**: User has complete control

### Challenges to Address
1. **Accuracy**: Local models less accurate for financial data extraction
2. **Support**: Users need technical knowledge for setup
3. **Updates**: Model improvements require manual downloads
4. **Hardware**: Many users lack sufficient RAM/GPU

### Recommendation
Implement Privacy Mode as an optional feature for power users who prioritize privacy over convenience. Market it as "Privacy Mode Beta" with clear tradeoffs documented. This addresses the segment of users who want zero-knowledge processing while maintaining our current cloud-based solution for mainstream users who value speed and accuracy.
