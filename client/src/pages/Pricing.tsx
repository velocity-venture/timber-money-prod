import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Pricing() {
  const { isAuthenticated } = useAuth();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Upload up to 5 documents",
        "Basic debt tracking",
        "Simple payoff calculator",
        "Credit score tracking",
        "Limited AI advisor (5 questions/month)",
      ],
      cta: isAuthenticated ? "Current Plan" : "Get Started",
      href: isAuthenticated ? undefined : "/api/login",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious debt management",
      features: [
        "Unlimited document uploads",
        "Advanced AI document analysis",
        "All debt payoff strategies",
        "Complete financial profile",
        "Unlimited AI advisor",
        "Priority support",
        "Export financial statements",
        "Monthly progress reports",
      ],
      cta: "Upgrade to Pro",
      href: "/subscribe",
      highlighted: true,
    },
    {
      name: "Family",
      price: "$39",
      period: "per month",
      description: "Manage finances together",
      features: [
        "Everything in Pro",
        "Up to 5 family members",
        "Shared financial dashboard",
        "Family budget planning",
        "Joint debt strategies",
        "Premium support",
      ],
      cta: "Get Family Plan",
      href: "/subscribe?plan=family",
      highlighted: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8" data-testid="page-pricing">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your financial journey. Upgrade or
          downgrade anytime.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
            data-testid={`plan-${plan.name.toLowerCase()}`}
          >
            {plan.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">
                  / {plan.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                asChild={!!plan.href}
                disabled={!plan.href}
                data-testid={`button-${plan.name.toLowerCase()}`}
              >
                {plan.href ? <a href={plan.href}>{plan.cta}</a> : plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! Cancel your subscription anytime with no penalties. Your
                plan remains active until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Is my data secure?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely. We use bank-level encryption and your uploaded
                documents are processed in real-time and never permanently
                stored.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">How does billing work?</h4>
              <p className="text-sm text-muted-foreground">
                All plans are billed monthly. You can upgrade or downgrade your
                plan at any time, and changes take effect at your next billing
                cycle.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What payment methods?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards through our secure payment
                processor. Your payment information is never stored on our
                servers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
