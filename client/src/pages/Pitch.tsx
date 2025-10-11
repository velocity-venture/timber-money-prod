import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, Target, Rocket, BarChart3, Trophy, ExternalLink, Shield, Zap, Bot, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: "intro",
    title: "Introduction",
  },
  {
    id: "problem",
    title: "The Problem",
  },
  {
    id: "solution",
    title: "Our Solution",
  },
  {
    id: "market",
    title: "Market Opportunity",
  },
  {
    id: "business-model",
    title: "Business Model",
  },
  {
    id: "gtm",
    title: "Go-to-Market",
  },
  {
    id: "competition",
    title: "Competitive Analysis",
  },
  {
    id: "traction",
    title: "Traction & Milestones",
  },
  {
    id: "financials",
    title: "Financial Projections",
  },
  {
    id: "ask",
    title: "The Ask",
  },
  {
    id: "exit",
    title: "Exit Strategy",
  },
];

export default function Pitch() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="page-pitch">
      {/* Main Slide Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          {/* Slide 1: Introduction */}
          {currentSlide === 0 && (
            <div className="text-center space-y-8 animate-in fade-in duration-500" data-testid="slide-intro">
              <div className="space-y-4">
                <Badge variant="default" className="mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Investor Pitch Deck
                </Badge>
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  Shoebox to Autopilot
                </h1>
                <p className="text-2xl text-muted-foreground mb-8">
                  Turn Your Bag of Bills Into a Dashboard
                </p>
                <p className="text-xl text-foreground max-w-3xl mx-auto">
                  AI-powered financial management that transforms chaotic financial documents 
                  into automated money management—without the constant nagging.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">True Autopilot</div>
                  <div className="text-sm text-muted-foreground">Set it once, let it work</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">GPT-4o document analysis</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">Bank-Level Security</div>
                  <div className="text-sm text-muted-foreground">AES-256 encryption</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground pt-8">
                Velocity Venture Holdings, LLC
              </p>
            </div>
          )}

          {/* Slide 2: Problem */}
          {currentSlide === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-problem">
              <h2 className="text-5xl font-bold text-center mb-12">The Problem</h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <Card className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold">Financial Chaos</h3>
                  <p className="text-muted-foreground">
                    78% of Americans live paycheck to paycheck, drowning in a shoebox of bills, 
                    statements, and financial documents they don't understand.
                  </p>
                </Card>

                <Card className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold">Constant Nagging</h3>
                  <p className="text-muted-foreground">
                    Existing tools like Monarch Money and YNAB require constant manual reviews, 
                    categorization, and budget updates. Users pay $15-20/month but still feel overwhelmed.
                  </p>
                </Card>

                <Card className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold">Information Overload</h3>
                  <p className="text-muted-foreground">
                    Average household receives 40+ financial documents per month across banks, 
                    credit cards, loans, and investments—impossible to track manually.
                  </p>
                </Card>

                <Card className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold">No Real Automation</h3>
                  <p className="text-muted-foreground">
                    Current solutions claim "automation" but still require weekly check-ins, 
                    manual categorization, and constant decision-making. That's not autopilot.
                  </p>
                </Card>
              </div>

              <div className="text-center pt-8">
                <p className="text-xl text-foreground font-semibold">
                  People don't need another budgeting tool. They need a financial autopilot.
                </p>
              </div>
            </div>
          )}

          {/* Slide 3: Solution */}
          {currentSlide === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-solution">
              <h2 className="text-5xl font-bold text-center mb-12">Our Solution</h2>
              
              <div className="text-center mb-12">
                <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                  Shoebox to Autopilot is the only financial management platform with <span className="text-primary font-bold">True Autopilot</span>—
                  AI that runs your finances automatically, no nagging required.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">1. Dump</h3>
                  <p className="text-muted-foreground">
                    Upload any financial document—bank statements, credit cards, loans, investments. 
                    Mobile-first with photo capture or drag-and-drop.
                  </p>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">2. Digitize</h3>
                  <p className="text-muted-foreground">
                    GPT-4o automatically extracts data, categorizes transactions, identifies debts, 
                    and builds your complete financial profile—instantly.
                  </p>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">3. Deploy</h3>
                  <p className="text-muted-foreground">
                    Your AI financial manager runs on autopilot—optimizing debt payoff, 
                    tracking progress, and providing insights without constant check-ins.
                  </p>
                </Card>
              </div>

              <div className="pt-8">
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Hybrid AI Processing</h3>
                      <p className="text-muted-foreground">
                        Pro users get GPT-4o for maximum accuracy. Free users get GPT-4o-mini. 
                        All processing uses bank-level AES-256 encryption. Documents processed in real-time, 
                        not permanently stored.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 4: Market Opportunity */}
          {currentSlide === 3 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-market">
              <h2 className="text-5xl font-bold text-center mb-12">Market Opportunity</h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                <Card className="p-8 text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">$25B</div>
                  <div className="text-xl font-semibold">Total Addressable Market</div>
                  <div className="text-muted-foreground">
                    Personal finance app market (2025)
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Source: Business Research Insights 2025
                  </div>
                </Card>

                <Card className="p-8 text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">18-20%</div>
                  <div className="text-xl font-semibold">Annual Growth Rate</div>
                  <div className="text-muted-foreground">
                    CAGR through 2033 driven by AI adoption
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Source: Market Research Future 2025
                  </div>
                </Card>

                <Card className="p-8 text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">180M</div>
                  <div className="text-xl font-semibold">Target Customers</div>
                  <div className="text-muted-foreground">
                    U.S. adults with debt (avg. $90K household debt)
                  </div>
                </Card>
              </div>

              <div className="max-w-5xl mx-auto space-y-6">
                <h3 className="text-3xl font-bold text-center mb-8">Customer Demographics</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="text-xl font-bold mb-4">Primary Segment</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Age:</strong> 28-45 years old (Millennials & Gen X)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Income:</strong> $50K-$150K household income</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Pain Point:</strong> Multiple debts, overwhelmed by finances</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Behavior:</strong> Tech-savvy but time-poor</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6">
                    <h4 className="text-xl font-bold mb-4">Secondary Segment</h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Families:</strong> Multi-user households managing shared finances</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Small Business Owners:</strong> Managing personal & business finances</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Recent Graduates:</strong> Starting careers with student loan debt</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>

              <div className="text-center pt-8">
                <p className="text-xl text-foreground font-semibold">
                  Market Timing: AI adoption + debt crisis = perfect storm for automated financial management
                </p>
              </div>
            </div>
          )}

          {/* Slide 5: Business Model */}
          {currentSlide === 4 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-business-model">
              <h2 className="text-5xl font-bold text-center mb-12">Business Model</h2>
              
              <div className="text-center mb-12">
                <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                  Subscription-based SaaS with multiple tiers and pricing options
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Card className="p-8 space-y-4 border-2">
                  <Badge variant="secondary" className="w-fit">Free</Badge>
                  <div className="text-4xl font-bold">$0</div>
                  <div className="text-muted-foreground">Forever free</div>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">5 documents per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">GPT-4o-mini analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Basic debt strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Financial dashboard</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-8 space-y-4 border-2 border-primary relative">
                  <Badge variant="default" className="w-fit">Pro</Badge>
                  <div className="absolute -top-3 right-4">
                    <Badge variant="default" className="bg-cyan-500">Most Popular</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">$19</div>
                    <div className="text-muted-foreground">per month</div>
                    <div className="text-sm text-primary">or $190/year (save $38)</div>
                  </div>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Unlimited documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">GPT-4o premium analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Full AI advisor access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Advanced strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Export & reporting</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-8 space-y-4 border-2">
                  <Badge variant="secondary" className="w-fit">Family</Badge>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">$39</div>
                    <div className="text-muted-foreground">per month</div>
                    <div className="text-sm text-primary">or $390/year (save $78)</div>
                  </div>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Up to 5 family members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Shared financial goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Family dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Priority support</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="max-w-5xl mx-auto pt-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Revenue Streams</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="font-semibold">Subscriptions (Primary):</span>
                        <span className="text-muted-foreground">95% of revenue</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Monthly and annual subscription plans with 17% discount for annual commitment
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                        <span className="font-semibold">Future Revenue:</span>
                        <span className="text-muted-foreground">5% planned</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Premium financial coaching, white-label partnerships, API access
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center pt-4">
                <p className="text-lg text-muted-foreground">
                  <strong className="text-foreground">Target:</strong> $50 average revenue per user (ARPU) with 70% on annual plans
                </p>
              </div>
            </div>
          )}

          {/* Slide 6: Go-to-Market Strategy */}
          {currentSlide === 5 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-gtm">
              <h2 className="text-5xl font-bold text-center mb-12">Go-to-Market Strategy</h2>
              
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Phase 1: Launch</h3>
                    <p className="text-sm text-muted-foreground">Nov 2025 - Q1 2026</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Product Hunt launch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Content marketing (SEO)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Reddit/HN communities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Target: 1,000 users</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Phase 2: Scale</h3>
                    <p className="text-sm text-muted-foreground">Q2-Q3 2026</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Paid social (Meta, TikTok)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Influencer partnerships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Referral program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Target: 25,000 users</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Phase 3: Expand</h3>
                    <p className="text-sm text-muted-foreground">Q4 2026+</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>B2B partnerships (banks)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>White-label solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>International expansion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Target: 100,000+ users</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Customer Acquisition Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-semibold">Content Marketing (SEO)</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-muted-foreground">CAC: $12</span>
                        <span className="text-sm font-semibold text-primary">35% of users</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <span className="font-semibold">Paid Social Ads</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-muted-foreground">CAC: $35</span>
                        <span className="text-sm font-semibold text-primary">30% of users</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="font-semibold">Referral Program</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-muted-foreground">CAC: $8</span>
                        <span className="text-sm font-semibold text-primary">20% of users</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="font-semibold">Partnerships & Affiliates</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-muted-foreground">CAC: $22</span>
                        <span className="text-sm font-semibold text-primary">15% of users</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="text-center space-y-2">
                  <p className="text-lg text-foreground font-semibold">
                    Blended CAC: $23 | LTV: $600 | LTV:CAC Ratio: 26:1
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Industry benchmark for early-stage fintech CAC: $200-$400 (Source: First Page Sage 2025)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 7: Competition */}
          {currentSlide === 6 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-competition">
              <h2 className="text-5xl font-bold text-center mb-12">Competitive Analysis</h2>
              
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="text-left p-4 font-bold">Feature</th>
                        <th className="text-center p-4 font-bold text-primary">Shoebox to Autopilot</th>
                        <th className="text-center p-4 font-bold text-muted-foreground">Monarch Money</th>
                        <th className="text-center p-4 font-bold text-muted-foreground">YNAB</th>
                        <th className="text-center p-4 font-bold text-muted-foreground">PocketGuard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-4 font-semibold">True Autopilot</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-6 h-6 text-primary mx-auto" /></td>
                        <td className="text-center p-4 text-muted-foreground">Manual reviews required</td>
                        <td className="text-center p-4 text-muted-foreground">Constant categorization</td>
                        <td className="text-center p-4 text-muted-foreground">Limited automation</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-semibold">AI Document Analysis</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-6 h-6 text-primary mx-auto" /></td>
                        <td className="text-center p-4 text-muted-foreground">Bank sync only</td>
                        <td className="text-center p-4 text-muted-foreground">Manual entry</td>
                        <td className="text-center p-4 text-muted-foreground">Bank sync only</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">GPT-4o Advisor</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-6 h-6 text-primary mx-auto" /></td>
                        <td className="text-center p-4 text-muted-foreground">Generic insights</td>
                        <td className="text-center p-4 text-muted-foreground">Community support</td>
                        <td className="text-center p-4 text-muted-foreground">Basic tips</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-semibold">Mobile-First Upload</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-6 h-6 text-primary mx-auto" /></td>
                        <td className="text-center p-4 text-muted-foreground">Desktop-focused</td>
                        <td className="text-center p-4 text-muted-foreground">Desktop-focused</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Free Tier</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-6 h-6 text-primary mx-auto" /></td>
                        <td className="text-center p-4 text-muted-foreground">7-day trial only</td>
                        <td className="text-center p-4 text-muted-foreground">34-day trial only</td>
                        <td className="text-center p-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="p-4 font-semibold">Pricing</td>
                        <td className="text-center p-4 font-bold text-primary">$19/mo</td>
                        <td className="text-center p-4 text-muted-foreground">$17/mo</td>
                        <td className="text-center p-4 text-muted-foreground">$15/mo</td>
                        <td className="text-center p-4 text-muted-foreground">$13/mo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-primary" />
                    Our Competitive Advantages
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold">True Autopilot Technology</div>
                          <div className="text-sm text-muted-foreground">
                            Only solution that eliminates constant manual reviews—set it once and let AI manage
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold">AI-Powered Document Processing</div>
                          <div className="text-sm text-muted-foreground">
                            Upload any financial document, AI extracts everything—no bank sync dependency
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold">Mobile-First Design</div>
                          <div className="text-sm text-muted-foreground">
                            Photo capture capability makes it dead simple to upload bills on the go
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold">GPT-4o Financial Advisor</div>
                          <div className="text-sm text-muted-foreground">
                            Personalized AI guidance based on your actual uploaded documents, not generic tips
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="text-center">
                  <p className="text-xl text-foreground font-semibold">
                    We're not building another budgeting tool. We're building the financial autopilot everyone wishes existed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 8: Traction */}
          {currentSlide === 7 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-traction">
              <h2 className="text-5xl font-bold text-center mb-12">Current Status & Roadmap</h2>
              
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">MVP</div>
                    <div className="text-sm text-muted-foreground">Current Stage</div>
                    <div className="text-xs text-muted-foreground">Ready to Launch</div>
                  </Card>
                  <Card className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">Nov 2025</div>
                    <div className="text-sm text-muted-foreground">Launch Date</div>
                    <div className="text-xs text-muted-foreground">Product Hunt debut</div>
                  </Card>
                  <Card className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Core Features</div>
                    <div className="text-xs text-muted-foreground">Fully functional</div>
                  </Card>
                  <Card className="p-6 text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">$0</div>
                    <div className="text-sm text-muted-foreground">Pre-Revenue</div>
                    <div className="text-xs text-muted-foreground">Pre-launch stage</div>
                  </Card>
                </div>

                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Development Milestones Achieved</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold">MVP Development Complete</div>
                          <div className="text-sm text-muted-foreground">October 2025</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Completed full-stack application with document upload, GPT-4o AI analysis, 
                          debt strategies, and financial dashboard. All core features tested and operational.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold">Technology Stack Proven</div>
                          <div className="text-sm text-muted-foreground">October 2025</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Built on React, Express, PostgreSQL with OpenAI GPT-4o integration. 
                          Stripe payment infrastructure ready. Bank-level AES-256 encryption implemented.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold">Go-to-Market Strategy Defined</div>
                          <div className="text-sm text-muted-foreground">October 2025</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Detailed 3-phase launch plan with organic and paid acquisition channels. 
                          Content marketing pipeline ready. Product Hunt and community outreach prepared.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <Rocket className="w-6 h-6 text-cyan-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold">Public Launch</div>
                          <div className="text-sm text-muted-foreground">November 2025 (Planned)</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Product Hunt launch, initial marketing campaigns, and public beta rollout. 
                          Target: 1,000 users in first 90 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="text-xl font-bold mb-4">What We've Built</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>AI Document Processing:</strong> GPT-4o extracts data from 6 document types
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Mobile-First Upload:</strong> Photo capture & drag-drop interface
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>True Autopilot:</strong> Automated debt strategies & financial tracking
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>AI Financial Advisor:</strong> Chat-based personalized guidance
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Multi-Tier Pricing:</strong> Free, Pro ($19), Family ($39) plans
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="text-xl font-bold mb-4">Why Now is the Right Time</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Market Timing:</strong> AI adoption at inflection point for fintech
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Consumer Pain:</strong> Existing tools require constant manual work
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Technology Ready:</strong> GPT-4o enables true document automation
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Team Expertise:</strong> Proven execution on AI + fintech product
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-xl text-foreground font-semibold">
                    MVP complete and ready to launch. Seeking funding to accelerate go-to-market and scale operations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 9: Financials */}
          {currentSlide === 8 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-financials">
              <h2 className="text-5xl font-bold text-center mb-12">Financial Projections</h2>
              
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="text-left p-4 font-bold">Metric</th>
                        <th className="text-right p-4 font-bold">2026</th>
                        <th className="text-right p-4 font-bold">2027</th>
                        <th className="text-right p-4 font-bold">2028</th>
                        <th className="text-right p-4 font-bold">2029</th>
                        <th className="text-right p-4 font-bold">2030</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-primary/5">
                        <td className="p-4 font-semibold">Total Users</td>
                        <td className="text-right p-4">25,000</td>
                        <td className="text-right p-4">120,000</td>
                        <td className="text-right p-4">425,000</td>
                        <td className="text-right p-4">1,050,000</td>
                        <td className="text-right p-4">2,200,000</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Paid Users</td>
                        <td className="text-right p-4">12,500</td>
                        <td className="text-right p-4">60,000</td>
                        <td className="text-right p-4">212,500</td>
                        <td className="text-right p-4">525,000</td>
                        <td className="text-right p-4">1,100,000</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="p-4 font-semibold">Annual Revenue</td>
                        <td className="text-right p-4 text-primary font-bold">$750K</td>
                        <td className="text-right p-4 text-primary font-bold">$3.6M</td>
                        <td className="text-right p-4 text-primary font-bold">$12.8M</td>
                        <td className="text-right p-4 text-primary font-bold">$31.5M</td>
                        <td className="text-right p-4 text-primary font-bold">$66M</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">Operating Costs</td>
                        <td className="text-right p-4">$580K</td>
                        <td className="text-right p-4">$2.1M</td>
                        <td className="text-right p-4">$6.4M</td>
                        <td className="text-right p-4">$13.5M</td>
                        <td className="text-right p-4">$23.1M</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="p-4 font-semibold">EBITDA</td>
                        <td className="text-right p-4">$170K</td>
                        <td className="text-right p-4">$1.5M</td>
                        <td className="text-right p-4">$6.4M</td>
                        <td className="text-right p-4">$18M</td>
                        <td className="text-right p-4">$42.9M</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold">EBITDA Margin</td>
                        <td className="text-right p-4">23%</td>
                        <td className="text-right p-4">42%</td>
                        <td className="text-right p-4">50%</td>
                        <td className="text-right p-4">57%</td>
                        <td className="text-right p-4">65%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">$50</div>
                        <div className="text-sm text-muted-foreground">Average ARPU</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Blended across Free, Pro ($19), and Family ($39) tiers with 70% on annual plans
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">26:1</div>
                        <div className="text-sm text-muted-foreground">LTV:CAC Ratio</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      LTV: $600 | Blended CAC: $23 (organic + paid channels)
                    </p>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">8%</div>
                        <div className="text-sm text-muted-foreground">Monthly Churn</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Industry-leading retention due to autopilot value (industry avg: 15%)
                    </p>
                  </Card>
                </div>

                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-6">Key Assumptions & Industry Benchmarks</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>User Growth:</strong> 350% YoY growth in 2026-2028, slowing to 150% by 2030
                          <div className="text-xs text-muted-foreground mt-1">Market growing 18-20% CAGR (Market Research Future 2025)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Conversion Rate:</strong> 50% free-to-paid (conservative)
                          <div className="text-xs text-muted-foreground mt-1">Fintech avg: 3-5%, AI SaaS can achieve 15-30%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Annual Plan Mix:</strong> 70% of paid users on annual plans
                          <div className="text-xs text-muted-foreground mt-1">17% discount (2 months free) drives annual adoption</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>Operating Costs:</strong> 35% gross margin Year 1 → 65% Year 5
                          <div className="text-xs text-muted-foreground mt-1">SaaS benchmarks: 65-75% margins at scale (SaaS Capital)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>CAC Efficiency:</strong> Blended $23 CAC (organic-heavy)
                          <div className="text-xs text-muted-foreground mt-1">Industry avg fintech CAC: $1,450 (First Page Sage 2025)</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <strong>LTV:CAC Target:</strong> 3:1 to 4:1 ratio
                          <div className="text-xs text-muted-foreground mt-1">Industry standard for sustainable SaaS growth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="text-center">
                  <p className="text-xl text-foreground font-semibold">
                    Path to $66M ARR by 2030 with 65% EBITDA margins
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 10: The Ask */}
          {currentSlide === 9 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-ask">
              <h2 className="text-5xl font-bold text-center mb-12">The Ask</h2>
              
              <div className="max-w-5xl mx-auto space-y-8">
                <Card className="p-12 bg-gradient-to-br from-primary/10 to-cyan-500/10 border-primary/20 text-center">
                  <div className="space-y-6">
                    <div className="inline-block">
                      <Badge variant="default" className="mb-4 text-lg px-6 py-2">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Seed Round
                      </Badge>
                    </div>
                    <h3 className="text-6xl font-bold text-primary mb-4">$750K</h3>
                    <p className="text-2xl text-muted-foreground">
                      Pre-money valuation: <span className="text-foreground font-semibold">$5M</span>
                    </p>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      Equity offered: <span className="text-foreground font-semibold">15%</span> | 
                      Target close: <span className="text-foreground font-semibold">Q4 2025</span>
                    </p>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Use of Funds</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Customer Acquisition</span>
                          <span className="text-primary font-bold">45% ($340K)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Paid ads, content marketing, influencer partnerships
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Product & Tech</span>
                          <span className="text-primary font-bold">20% ($150K)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '20%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Mobile apps (leveraging AI dev tools like Replit, Cursor), enhancements
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          Note: Solo founders can build full SaaS for $25K-$100K using AI copilots (Source: OnGraph, SaaS Capital 2025)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Operations & Team</span>
                          <span className="text-primary font-bold">20% ($150K)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '20%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          1-2 key contractors, cloud infrastructure, compliance
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          Lean model: 238 unicorn companies started solo (Source: Failory 2025)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Working Capital</span>
                          <span className="text-primary font-bold">15% ($110K)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '15%' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          18-month runway buffer, emergency reserves
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6">18-Month Milestones</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">Q1 '26</span>
                        </div>
                        <div>
                          <div className="font-semibold">First 1,000 Users</div>
                          <div className="text-sm text-muted-foreground">Organic growth from launch campaigns</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">Q2 '26</span>
                        </div>
                        <div>
                          <div className="font-semibold">Launch Mobile Apps</div>
                          <div className="text-sm text-muted-foreground">iOS & Android with photo capture</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">Q3 '26</span>
                        </div>
                        <div>
                          <div className="font-semibold">25,000 Users</div>
                          <div className="text-sm text-muted-foreground">Scale to $750K ARR run rate</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">Q4 '26</span>
                        </div>
                        <div>
                          <div className="font-semibold">B2B Partnerships</div>
                          <div className="text-sm text-muted-foreground">Partner with 3 regional banks</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                          <div className="font-semibold">Q1 '27: Series A Ready</div>
                          <div className="text-sm text-muted-foreground">$3M ARR, 100K users, international expansion</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-4 text-center">Why Invest Now?</h3>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                      <div className="font-bold">MVP Ready</div>
                      <div className="text-sm text-muted-foreground">
                        Fully functional product, Nov 2025 launch
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Target className="w-8 h-8 text-primary" />
                      </div>
                      <div className="font-bold">Massive Market</div>
                      <div className="text-sm text-muted-foreground">
                        $25B TAM growing 18-20% annually
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Trophy className="w-8 h-8 text-primary" />
                      </div>
                      <div className="font-bold">Clear Differentiation</div>
                      <div className="text-sm text-muted-foreground">
                        Only true autopilot solution vs manual competitors
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Slide 11: Exit Strategy */}
          {currentSlide === 10 && (
            <div className="space-y-8 animate-in fade-in duration-500" data-testid="slide-exit">
              <h2 className="text-5xl font-bold text-center mb-12">Exit Strategy</h2>
              
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-12">
                  <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                    Multiple clear exit opportunities for investors within 5-7 years
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Strategic Acquisition</h3>
                        <p className="text-sm text-muted-foreground">Primary exit path (70% probability)</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold mb-2">Potential Acquirers:</div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">Major Banks</div>
                              <div className="text-sm text-muted-foreground">
                                Chase, Bank of America, Wells Fargo—need AI-powered PFM solutions
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">Fintech Giants</div>
                              <div className="text-sm text-muted-foreground">
                                Intuit (Mint, Credit Karma), Rocket Money, NerdWallet
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">Tech Companies</div>
                              <div className="text-sm text-muted-foreground">
                                Apple (expanding financial services), Google, Amazon
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold mb-2">Target Valuation:</div>
                        <div className="text-3xl font-bold text-primary">$200M - $500M</div>
                        <div className="text-sm text-muted-foreground">
                          At 6-8x ARR multiple (typical SaaS acquisition range)
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold mb-2">Timeframe:</div>
                        <div className="text-lg font-semibold">5-7 Years</div>
                        <div className="text-sm text-muted-foreground">
                          Once we reach $30-60M ARR with strong unit economics
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">IPO (Secondary Path)</h3>
                        <p className="text-sm text-muted-foreground">If growth continues (30% probability)</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold mb-2">IPO Requirements:</div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <strong>Revenue:</strong> $100M+ ARR with consistent 40%+ YoY growth
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <strong>Profitability:</strong> Path to GAAP profitability within 12-18 months
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <strong>Market Cap:</strong> $1B+ valuation at 10x ARR SaaS multiples
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold mb-2">Target Valuation:</div>
                        <div className="text-3xl font-bold text-cyan-500">$1B+</div>
                        <div className="text-sm text-muted-foreground">
                          Unicorn status at $100M+ ARR with strong growth metrics
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold mb-2">Timeframe:</div>
                        <div className="text-lg font-semibold">7-10 Years</div>
                        <div className="text-sm text-muted-foreground">
                          Requires sustained hypergrowth and market expansion
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">Recent Comparable Exits</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="font-bold">Credit Karma</div>
                      <div className="text-sm text-muted-foreground">Acquired by Intuit for <strong className="text-foreground">$7.1B</strong></div>
                      <div className="text-xs text-muted-foreground">Personal finance + credit monitoring</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold">Mint</div>
                      <div className="text-sm text-muted-foreground">Acquired by Intuit for <strong className="text-foreground">$170M</strong></div>
                      <div className="text-xs text-muted-foreground">Budgeting & expense tracking</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold">Personal Capital</div>
                      <div className="text-sm text-muted-foreground">Acquired by Empower for <strong className="text-foreground">$1B</strong></div>
                      <div className="text-xs text-muted-foreground">Wealth management + PFM</div>
                    </div>
                  </div>
                </Card>

                <div className="text-center pt-4">
                  <p className="text-xl text-foreground font-semibold">
                    Strong precedent for multi-hundred-million exits in personal finance SaaS
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">
                    Expected investor return: <span className="text-primary font-bold">15-40x</span> at strategic acquisition
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="border-t border-border p-6 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="default"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-muted-foreground/50'
                }`}
                data-testid={`indicator-slide-${index}`}
                aria-label={`Go to ${slide.title}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="default"
            size="default"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            data-testid="button-next-slide"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Slide Title */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}: {slides[currentSlide].title}
          </p>
        </div>
      </div>
    </div>
  );
}

// Building2 icon definition (not in lucide-react by default)
function Building2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
