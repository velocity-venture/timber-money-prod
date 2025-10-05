# Financial Debt Management App - Design Guidelines

## Design Approach
**Selected Approach**: Design System - Stripe-inspired with Material Design principles

**Justification**: Financial applications demand trust, clarity, and data-dense displays. Stripe's clean, professional aesthetic combined with Material Design's robust component library provides the perfect foundation for a fintech tool requiring precision and user confidence.

**Key Design Principles**:
- Trust through minimalism and clarity
- Data hierarchy that guides action
- Professional, secure aesthetic
- Action-oriented design for debt reduction

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (default):
- Background: 222 14% 8% (deep slate)
- Surface: 222 14% 12% (elevated slate)
- Surface Elevated: 222 14% 16%
- Primary: 210 100% 60% (trust blue)
- Success/Positive: 142 76% 45% (financial green)
- Warning/Debt: 0 84% 60% (alert red)
- Text Primary: 210 20% 98%
- Text Secondary: 215 20% 65%
- Border: 217 19% 27%

**Light Mode**:
- Background: 0 0% 100%
- Surface: 210 20% 98%
- Primary: 210 100% 50%
- Success: 142 76% 36%
- Warning: 0 72% 51%

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, professional
- **Monospace**: JetBrains Mono (for financial figures)
- **Hierarchy**:
  - H1: 2.5rem/3rem, font-bold (page titles)
  - H2: 1.875rem/2.25rem, font-semibold (section headers)
  - H3: 1.5rem/2rem, font-semibold (card titles)
  - Body: 1rem/1.5rem, font-normal
  - Financial Data: 1.125rem/1.75rem, font-mono, font-medium
  - Small/Meta: 0.875rem/1.25rem, font-normal

### C. Layout System
**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12, 16
- Component padding: p-6 (cards), p-4 (compact elements)
- Section spacing: space-y-8 (main layout), space-y-4 (grouped elements)
- Grid gaps: gap-6 (dashboard cards), gap-4 (form fields)
- Container max-width: max-w-7xl for main content

### D. Component Library

**Dashboard Cards**:
- Rounded corners: rounded-xl
- Shadow: shadow-lg with subtle border
- Padding: p-6
- Headers with icons and action buttons
- Metric displays with large monospace numbers

**Data Visualization**:
- Charts using Chart.js/Recharts in brand colors
- Debt reduction timeline with progress indicators
- Spending breakdown pie/donut charts
- Monthly comparison bar charts

**Document Upload Zone**:
- Dashed border drag-and-drop area
- File type icons (PDF, CSV, bank statements)
- Upload progress with percentage
- Document preview thumbnails in grid

**Financial Summary Components**:
- Total debt counter (large, prominent)
- Monthly payment calculator
- Debt-free date projection
- Savings potential indicator

**Action Buttons**:
- Primary: bg-primary with hover lift effect
- Destructive: bg-warning for debt actions
- Success: bg-success for completed actions
- Sizes: Default (h-10), Large (h-12 for CTAs)

**Navigation**:
- Sidebar navigation (fixed left, w-64)
- Icons with labels: Upload, Dashboard, Analysis, Budget Plan, Reports
- Active state: bg-surface-elevated with left border accent
- Collapsed mobile state with hamburger

**Forms & Inputs**:
- Input fields: h-10, rounded-lg, border focus:ring-2
- Dark mode: bg-surface with border-border
- Labels: text-sm font-medium mb-2
- Validation states with colored borders

**Tables**:
- Striped rows for readability
- Sticky headers for long lists
- Sortable columns with arrow indicators
- Action column (right-aligned) for row actions
- Mobile: Card-based responsive layout

**Data Overlays**:
- Modal dialogs: centered, max-w-2xl, backdrop blur
- Toast notifications: top-right, auto-dismiss
- Confirmation dialogs for debt plan actions

### E. Animations
**Minimal, purposeful animations only**:
- Button hover: subtle scale (scale-105) and shadow increase
- Card hover: gentle lift (translate-y-[-2px])
- Loading states: Skeleton screens (not spinners) for data
- Chart animations: Smooth bar/line growth on load (300ms ease)
- Page transitions: None (instant for data app)

## Application-Specific Design

**Dashboard Layout**:
- 3-column grid on desktop (debt overview, recent uploads, action items)
- 2-column on tablet, single-column mobile
- Sticky metrics header showing total debt and progress

**Upload Interface**:
- Central drag-drop zone (80vh max-height)
- Supported file icons and descriptions
- AI processing indicator with step-by-step progress
- Document classification preview

**Analysis View**:
- Split view: Document preview (left 40%) | AI insights (right 60%)
- Highlighted transactions with categorization
- Inline editing for corrections
- Export analyzed data button

**Budget Plan Display**:
- Timeline visualization of debt payoff
- Monthly breakdown accordion
- "Snowball vs Avalanche" comparison toggle
- Editable payment amounts with real-time recalculation

**Trust Elements**:
- "Bank-level encryption" badge in upload area
- "Your data is never stored" messaging
- Secure connection indicator in header
- Clear data deletion options

This creates a professional, data-focused financial application that inspires trust while providing powerful debt management tools.