import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Sparkles, 
  Shield, 
  Zap,
  FileStack,
  Calculator,
  Download,
  HeadphonesIcon,
  Users,
  CreditCard,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    icon?: any;
  }[];
  cta: string;
  value: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "diy",
    name: "DIY Kit",
    price: 197,
    description: "Everything you need to create your own debt freedom plan",
    features: [
      { text: "Shoebox Document Upload", included: true, icon: FileStack },
      { text: "AI Document Analysis", included: true, icon: Sparkles },
      { text: "Cashflow Foundation Calculator", included: true, icon: Calculator },
      { text: "Basic Avalanche Plan", included: true, icon: TrendingUp },
      { text: "CSV Export for Banks", included: true, icon: Download },
      { text: "30-Day Email Course", included: true, icon: Calendar },
      { text: "1-on-1 Setup Call", included: false, icon: HeadphonesIcon },
      { text: "Quarterly Check-ins", included: false, icon: Clock },
      { text: "Done-For-You Setup", included: false, icon: Users },
    ],
    cta: "Start DIY Journey",
    value: "Perfect for self-starters who want the tools",
  },
  {
    id: "guided",
    name: "Guided",
    price: 997,
    description: "Personal guidance to implement your debt freedom system",
    popular: true,
    features: [
      { text: "Everything in DIY Kit", included: true, icon: Check },
      { text: "1-on-1 Setup Call (60 min)", included: true, icon: HeadphonesIcon },
      { text: "Custom Avalanche Optimization", included: true, icon: Zap },
      { text: "Bank Autopay Setup Support", included: true, icon: CreditCard },
      { text: "Quarterly Progress Reviews", included: true, icon: Clock },
      { text: "Priority Email Support", included: true, icon: Shield },
      { text: "Cashflow Optimization Audit", included: true, icon: Calculator },
      { text: "Done-For-You Setup", included: false, icon: Users },
      { text: "Weekly Check-ins", included: false, icon: Calendar },
    ],
    cta: "Get Guided Support",
    value: "Most popular - get expert help setting up",
  },
  {
    id: "dfy",
    name: "Done-For-You",
    price: 2997,
    description: "We handle everything - you just watch your debts disappear",
    features: [
      { text: "Everything in Guided", included: true, icon: Check },
      { text: "Complete Setup Service", included: true, icon: Users },
      { text: "Bank Integration Setup", included: true, icon: CreditCard },
      { text: "Weekly Progress Monitoring", included: true, icon: Calendar },
      { text: "Debt Negotiation Support", included: true, icon: Shield },
      { text: "Tax Optimization Review", included: true, icon: Calculator },
      { text: "Investment Transition Plan", included: true, icon: TrendingUp },
      { text: "Lifetime Updates", included: true, icon: Sparkles },
      { text: "White-Glove Service", included: true, icon: Shield },
    ],
    cta: "Get Everything Done",
    value: "For busy professionals who want results now",
  },
];

export default function Pricing() {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createCheckoutSession = useMutation({
    mutationFn: async (tierId: string) => {
      setIsProcessing(true);
      const tier = pricingTiers.find(t => t.id === tierId);
      if (!tier) throw new Error("Invalid tier");

      // In production, this would create a Stripe checkout session
      const response = await apiRequest("POST", "/api/create-subscription", {
        tierId,
        priceAmount: tier.price,
        tierName: tier.name,
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      // In production, redirect to Stripe checkout
      toast({
        title: "Redirecting to checkout...",
        description: "You'll be redirected to secure payment in a moment.",
      });
      // window.location.href = data.checkoutUrl;
    },
    onError: (error) => {
      toast({
        title: "Setup Required",
        description: "Please contact support to enable payments: support@debtfreedom.ai",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    createCheckoutSession.mutate(tierId);
  };

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4" data-testid="page-pricing">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="default" className="mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          Limited Time: Launch Pricing
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          Choose Your Path to Debt Freedom
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          From DIY tools to done-for-you service, we have the right solution for your journey.
          No monthly fees - just one-time investment in your financial future.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Save 2+ Years</h3>
            <p className="text-sm text-muted-foreground">
              Average client becomes debt-free 26 months faster
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="font-semibold mb-1">Save $8,400+</h3>
            <p className="text-sm text-muted-foreground">
              Average interest savings with optimized payoff
            </p>
          </CardContent>
        </Card>
        <Card className="text-center p-4">
          <CardContent className="pt-4">
            <div className="w-12 h-12 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="font-semibold mb-1">100% Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              30-day money back if you're not satisfied
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.id} 
            className={`relative ${tier.popular ? 'border-2 border-primary shadow-lg scale-105' : ''}`}
            data-testid={`plan-${tier.id}`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="default" className="px-3 py-1">
                  MOST POPULAR
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
              <p className="text-sm text-primary mt-2">{tier.value}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground line-through'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={tier.popular ? "default" : "outline"}
                size="lg"
                onClick={() => handleSelectTier(tier.id)}
                disabled={isProcessing && selectedTier === tier.id}
                data-testid={`button-${tier.id}`}
              >
                {isProcessing && selectedTier === tier.id ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  tier.cta
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Why one-time instead of monthly?</h3>
              <p className="text-sm text-muted-foreground">
                We believe in solving your problem once, not creating a recurring expense.
                Monthly subscriptions like Monarch Money keep you dependent. We want you free.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's the difference between tiers?</h3>
              <p className="text-sm text-muted-foreground">
                DIY gives you the tools. Guided adds personal support. Done-For-You means
                we handle everything while you focus on your life.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my financial data secure?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely. Bank-level encryption, no data selling, and you can delete
                everything anytime. We make money from our service, not your data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I need to upgrade later?</h3>
              <p className="text-sm text-muted-foreground">
                You can upgrade anytime and only pay the difference. Start with DIY
                and upgrade to Guided or Done-For-You whenever you're ready.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Back Guarantee */}
      <Card className="bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
        <CardContent className="py-8 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">30-Day Money Back Guarantee</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try any tier risk-free for 30 days. If you're not completely satisfied with your
            progress toward debt freedom, we'll refund every penny. No questions asked.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}