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
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen" data-testid="page-landing">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Debt Freedom</span>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/login">Sign In</a>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Financial Freedom</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Take Control of Your Finances with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your financial documents and get a personalized debt payoff
            plan, credit analysis, and professional financial guidance — all
            powered by AI.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-get-started">
              <a href="/api/login">Get Started Free</a>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mb-20">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simply upload your bank statements, credit reports, loan
                documents, and pay stubs. Our AI analyzes everything
                automatically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-chart-2" />
              </div>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced AI extracts your debts, assets, income, and credit
                data to build a complete financial profile in seconds.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-chart-3" />
              </div>
              <CardTitle>Get Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive a personalized debt payoff strategy that saves you
                money and gets you debt-free faster.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                icon: CreditCard,
                title: "Credit Report Analysis",
                description:
                  "Upload your credit report and get insights on improving your score",
              },
              {
                icon: BarChart3,
                title: "Asset & Liability Tracking",
                description:
                  "Complete financial profile with all your assets and debts",
              },
              {
                icon: TrendingDown,
                title: "Debt Payoff Strategies",
                description:
                  "Compare avalanche, snowball, and hybrid payoff methods",
              },
              {
                icon: Sparkles,
                title: "AI Financial Advisor",
                description:
                  "Ask questions and get personalized advice based on your finances",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description:
                  "Your data is encrypted and never permanently stored",
              },
              {
                icon: FileText,
                title: "Financial Statements",
                description:
                  "Generate professional financial reports for loans or planning",
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

        <section className="bg-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Achieve Financial Freedom?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their finances
            with AI-powered insights and personalized guidance.
          </p>
          <Button size="lg" asChild data-testid="button-cta">
            <a href="/api/login">Start Your Journey Free</a>
          </Button>
        </section>
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex gap-6 justify-center mb-4">
            <a href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-foreground">
              Terms of Service
            </a>
            <a href="/pricing" className="hover:text-foreground">
              Pricing
            </a>
          </div>
          <p>&copy; 2025 Debt Freedom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
