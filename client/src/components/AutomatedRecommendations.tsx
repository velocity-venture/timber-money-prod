import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  Zap
} from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "savings" | "debt" | "investment" | "optimization";
  automationReady: boolean;
  potentialSavings?: number;
  action?: string;
}

export function AutomatedRecommendations() {
  const recommendations: Recommendation[] = [
    {
      id: "1",
      title: "Auto-Transfer to High-Yield Savings",
      description: "Your checking account has excess balance. Our AI detected you could earn $840/year more by automatically moving funds to a high-yield savings account.",
      impact: "high",
      category: "savings",
      automationReady: true,
      potentialSavings: 840,
      action: "Enable Auto-Transfer"
    },
    {
      id: "2",
      title: "Credit Card Payoff Optimization",
      description: "By restructuring your payment schedule to align with your income dates, you'll save $126 in interest this year with zero extra effort.",
      impact: "high",
      category: "debt",
      automationReady: true,
      potentialSavings: 126,
      action: "Activate Smart Payments"
    },
    {
      id: "3",
      title: "Tax-Loss Harvesting Opportunity",
      description: "Our AI identified $2,300 in potential tax deductions from your investment portfolio. This runs automatically once activated.",
      impact: "high",
      category: "investment",
      automationReady: true,
      potentialSavings: 2300,
      action: "Enable Tax Optimization"
    },
    {
      id: "4",
      title: "Subscription Audit Complete",
      description: "Found 3 unused subscriptions totaling $47/month. We can automatically cancel these and save you $564/year.",
      impact: "medium",
      category: "optimization",
      automationReady: true,
      potentialSavings: 564,
      action: "Cancel Unused Services"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings": return TrendingUp;
      case "debt": return AlertCircle;
      case "investment": return Sparkles;
      case "optimization": return Zap;
      default: return CheckCircle2;
    }
  };

  const totalSavings = recommendations.reduce((acc, rec) => acc + (rec.potentialSavings || 0), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your AI is Working 24/7</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              These opportunities were discovered automatically - no input needed from you
            </p>
          </div>
          <Badge variant="default" className="bg-gradient-to-r from-primary to-chart-1">
            ${totalSavings.toLocaleString()}/year potential
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-primary font-medium">
            Automated Excellence
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Unlike other tools that constantly ask for input, our AI analyzes your finances continuously and presents ready-to-implement solutions. Just approve and let the system handle the rest!
          </p>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec) => {
            const Icon = getCategoryIcon(rec.category);
            return (
              <div
                key={rec.id}
                className="p-4 border rounded-lg hover-elevate transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{rec.title}</h4>
                          <Badge variant={getImpactColor(rec.impact)} className="text-xs">
                            {rec.impact} impact
                          </Badge>
                          {rec.automationReady && (
                            <Badge variant="outline" className="text-xs">
                              Auto-ready
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {rec.description}
                        </p>
                      </div>
                      {rec.potentialSavings && (
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">
                            +${rec.potentialSavings}
                          </p>
                          <p className="text-xs text-muted-foreground">per year</p>
                        </div>
                      )}
                    </div>
                    {rec.action && (
                      <Button 
                        size="sm" 
                        className="mt-3"
                        variant="default"
                        data-testid={`button-automate-${rec.id}`}
                      >
                        {rec.action}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Why this matters:</span> You're saving hours every month that other tools would require for manual input and decision-making. Your financial expert AI is handling everything automatically, just like a wealthy client's personal CFO would. Focus on your career while we optimize your money!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}