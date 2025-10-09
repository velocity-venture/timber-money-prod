import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Sparkles,
  TrendingDown,
  FileText,
  CreditCard,
  BarChart3,
  CheckCircle2,
  Bot,
  LineChart,
  PiggyBank,
  Receipt,
  Target,
  Brain,
  Lock,
  Eye,
  UserX,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background" data-testid="page-landing">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Shoebox to Autopilot</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild data-testid="button-pricing-header">
              <a href="/pricing">Pricing</a>
            </Button>
            <Button asChild data-testid="button-login">
              <a href="/api/login">Sign In</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <section className="text-center mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-2/10 blur-3xl opacity-50 -z-10"></div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Bot className="w-4 h-4 animate-pulse" />
            <span>From Paper Chaos to Payment Power</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto bg-gradient-to-r from-foreground via-primary/90 to-foreground bg-clip-text text-transparent animate-fade-in">
            Turn Your Shoebox Into a Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Transform that bag of bills into a set-and-forget money system.
            Our AI turns your messy paperwork into automated financial management
            — bills paid, debt reduced, wealth growing. All on autopilot.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-delay-2">
            <Button size="lg" className="shadow-xl hover:shadow-2xl transition-shadow" asChild data-testid="button-get-started">
              <a href="/api/login">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started Free
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="backdrop-blur-sm cursor-pointer" 
              data-testid="button-learn-more"
              onClick={() => {
                const featuresSection = document.getElementById('features-section');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>
          <div className="mt-8 text-sm text-muted-foreground animate-fade-in-delay-3">
            <CheckCircle2 className="w-4 h-4 inline mr-1 text-primary" />
            No credit card required • 5 free documents • Cancel anytime
          </div>
        </section>

        {/* Trust & Security Badges */}
        <section className="mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center items-center p-8 bg-muted/30 rounded-2xl border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">256-bit Encryption</p>
                  <p className="text-xs text-muted-foreground">Bank-level security</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-semibold">OAuth 2.0 Login</p>
                  <p className="text-xs text-muted-foreground">No passwords stored</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <UserX className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="font-semibold">Delete Anytime</p>
                  <p className="text-xs text-muted-foreground">Your data, your control</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="font-semibold">Transparent Processing</p>
                  <p className="text-xs text-muted-foreground">Clear data practices</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="/security" className="text-sm text-primary hover:underline inline-flex items-center gap-1" data-testid="link-security-details">
                Learn about our security practices
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="features-section" className="grid gap-8 md:grid-cols-3 mb-24">
          <a href="/api/login" className="block cursor-pointer" data-testid="card-dump-shoebox">
            <Card className="relative overflow-hidden border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 shadow-md">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Dump Your Shoebox</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Upload or snap photos of that pile of bills and statements. 
                  Our AI instantly digitizes and organizes everything — 
                  turning your paper chaos into clear data.
                </p>
              </CardContent>
            </Card>
          </a>

          <a href="/api/login" className="block cursor-pointer" data-testid="card-deploy-autopilot">
            <Card className="relative overflow-hidden border-chart-2/20 shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate md:scale-105 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-2/10 to-transparent rounded-bl-full"></div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-chart-2 text-primary-foreground text-xs font-medium rounded-full">
                Set & Forget
              </div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-chart-2 to-chart-2/80 flex items-center justify-center mb-4 shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Deploy on Autopilot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Set it once and let it work. Your money moves itself — 
                  bills paid automatically, extra funds allocated strategically, 
                  all running 24/7 without daily management.
                </p>
              </CardContent>
            </Card>
          </a>

          <a href="/api/login" className="block cursor-pointer" data-testid="card-breathe-easy">
            <Card className="relative overflow-hidden border-chart-3/20 shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-3/10 to-transparent rounded-bl-full"></div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-chart-3 to-chart-3/80 flex items-center justify-center mb-4 shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Breathe Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Watch your dashboard transform — debts shrinking, 
                  savings growing, everything handled. From overwhelm 
                  to on-time, automatically.
                </p>
              </CardContent>
            </Card>
          </a>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Complete AI Money Management Suite
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                icon: Receipt,
                title: "Automatic Bill Monitoring",
                description:
                  "AI tracks and ensures all bills are paid on time, alerting you only when needed",
              },
              {
                icon: PiggyBank,
                title: "Smart Savings Optimization",
                description:
                  "Automatically finds and moves extra money into savings and investments",
              },
              {
                icon: TrendingDown,
                title: "Debt Elimination Planning",
                description:
                  "Strategic debt payoff using avalanche, snowball, or custom methods",
              },
              {
                icon: LineChart,
                title: "Wealth Growth Tracking",
                description:
                  "Monitor net worth, investment performance, and progress to financial goals",
              },
              {
                icon: Brain,
                title: "24/7 AI Financial Expert",
                description:
                  "Ask questions anytime and get personalized advice based on your complete profile",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description:
                  "Your data is encrypted and protected with enterprise-grade security",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 rounded-3xl p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Stop Managing Money. Start Living Life.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands who've automated their finances with AI. 
              Your personal money manager works 24/7, handling everything 
              while you focus on what matters most.
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all" asChild data-testid="button-cta">
                <a href="/api/login">
                  <Bot className="w-4 h-4 mr-2" />
                  Activate Your AI Manager
                </a>
              </Button>
              <div className="text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 inline mr-1 text-primary" />
                Free trial • No credit card
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex gap-6 justify-center mb-4">
            <a href="/privacy" className="hover:text-foreground" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground" data-testid="link-terms">
              Terms of Service
            </a>
            <a href="/security" className="hover:text-foreground" data-testid="link-security-footer">
              Security
            </a>
            <a href="/pricing" className="hover:text-foreground" data-testid="link-pricing-footer">
              Pricing
            </a>
          </div>
          <p className="mb-3">&copy; 2025 Shoebox to Autopilot. All rights reserved.</p>
          
          {/* Legal Disclaimer - now at bottom, less conspicuous */}
          <div className="mt-6 pt-6 border-t border-border/50 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/80">
              <Shield className="w-3 h-3 inline-block mr-1" />
              <span className="font-medium">Important:</span> This service is for informational purposes only. 
              Please consult your accountant or trusted tax advisor before implementing any financial suggestions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
