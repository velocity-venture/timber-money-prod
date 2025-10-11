# Shoebox to Autopilot - Turn Your Bag of Bills Into a Dashboard

## Overview
Shoebox to Autopilot transforms financial documents into an automated money management system. Built with React, Express, PostgreSQL, and OpenAI, the application simplifies personal finance into a 3-step process: Dump, Digitize, Deploy. Its core purpose is to provide automated money management, not just debt reduction. The project aims to empower users to move from financial chaos to autopilot management.

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
1. **Document Upload & Analysis**: Supports 6 document types with AI-powered data extraction and bank-level encryption. Documents are processed in real-time and not permanently stored.
2. **Financial Profile Dashboard**: Provides complete asset/liability tracking, budget visualizations, income/expense analysis, and credit score tracking.
3. **Debt Payoff Strategies**: Offers Avalanche, Snowball, and hybrid methods with side-by-side comparisons.
4. **AI Financial Advisor**: A chat-based Q&A interface providing personalized, context-aware advice based on user financial profiles and uploaded documents.
5. **Subscription Plans**: Includes Free, Pro, and Family tiers with varying features and access levels.

### Database Schema
- **Users**: Managed by Replit Auth; session management via PostgreSQL.
- **Documents**: Stores user-uploaded financial documents with type categorization and metadata.
- **Debts**: Tracks debts with principal, interest rate, and minimum payments.
- **Assets**: Tracks assets like bank accounts, investments, and property.
- **Income**: Manages income sources, amounts, and frequency.
- **Budgets**: Handles budget category management and monthly allocations.
- **Sessions**: Secure session storage with `express-session` and PostgreSQL.

### UI/UX Decisions
- Rebranded UI to emphasize the journey from financial chaos to automated management.
- Implemented a bright emerald green primary color scheme.
- Professional financial statements and clear legal pages enhance trust.
- Mobile experience enhanced with photo capture for document upload.

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