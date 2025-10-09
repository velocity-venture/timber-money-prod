import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  yearlyPrice?: number;
  description: string;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
    icon?: any;
  }[];
  cta: string;
  value: string;
  savingsText?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free Start",
    price: 0,
    description: "Start your journey today - everyone deserves a chance at freedom",
    features: [
      { text: "Upload 5 Documents", included: true, icon: FileStack },
      { text: "Basic AI Analysis", included: true, icon: Sparkles },
      { text: "Simple Debt Calculator", included: true, icon: Calculator },
      { text: "Starter Avalanche Plan", included: true, icon: TrendingUp },
      { text: "Hope & Encouragement", included: true, icon: Shield },
      { text: "Community Support Forum", included: true, icon: Users },
      { text: "Advanced AI Advisor", included: false, icon: Sparkles },
      { text: "Autopilot Setup", included: false, icon: Zap },
      { text: "Unlimited Documents", included: false, icon: FileStack },
    ],
    cta: "Start Free Today",
    value: "No credit card required - start immediately",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    yearlyPrice: 190,
    description: "Full automation and AI guidance at coffee-shop prices",
    popular: true,
    savingsText: "Save $38/year",
    features: [
      { text: "Everything in Free", included: true, icon: Check },
      { text: "Unlimited Document Upload", included: true, icon: FileStack },
      { text: "Advanced AI Advisor 24/7", included: true, icon: Sparkles },
      { text: "Set & Forget Autopilot", included: true, icon: Zap },
      { text: "Bank Autopay Templates", included: true, icon: CreditCard },
      { text: "Monthly Progress Reports", included: true, icon: Clock },
      { text: "Cashflow Optimization", included: true, icon: Calculator },
      { text: "Priority Support", included: true, icon: Shield },
      { text: "Family Accounts", included: false, icon: Users },
    ],
    cta: "Go Pro",
    value: "Less than a streaming service, changes your life",
  },
  {
    id: "family",
    name: "Family",
    price: 39,
    yearlyPrice: 390,
    description: "Transform your entire household's financial future together",
    savingsText: "Save $78/year",
    features: [
      { text: "Everything in Pro", included: true, icon: Check },
      { text: "5 Family Member Accounts", included: true, icon: Users },
      { text: "Family Dashboard View", included: true, icon: Shield },
      { text: "Shared Goals & Milestones", included: true, icon: TrendingUp },
      { text: "Kids Financial Education", included: true, icon: Sparkles },
      { text: "Estate Planning Tools", included: true, icon: Calculator },
      { text: "Tax Strategy Guidance", included: true, icon: CreditCard },
      { text: "VIP Support Line", included: true, icon: HeadphonesIcon },
      { text: "Annual Strategy Sessions", included: true, icon: Calendar },
    ],
    cta: "Protect Your Family",
    value: "Build generational wealth, break the debt cycle",
  },
];

export default function Pricing() {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  const createCheckoutSession = useMutation({
    mutationFn: async (tierId: string) => {
      setIsProcessing(true);
      const tier = pricingTiers.find(t => t.id === tierId);
      if (!tier) throw new Error("Invalid tier");

      // Create a Stripe checkout session with the correct plan and interval
      const response = await apiRequest("POST", "/api/create-subscription", {
        plan: tierId, // 'pro' or 'family'
        interval: isYearly ? 'yearly' : 'monthly',
        priceAmount: isYearly && tier.yearlyPrice ? tier.yearlyPrice : tier.price,
        tierName: tier.name,
      });
      
      // Parse response body once
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        responseData = null;
      }
      
      // Check for authentication requirement first
      if (response.status === 401 && responseData?.requiresAuth && responseData?.loginUrl) {
        // Show login toast and redirect
        toast({
          title: "Login Required",
          description: responseData.message || "Please log in to continue with your subscription.",
        });
        setTimeout(() => {
          window.location.href = responseData.loginUrl;
        }, 1500);
        // Return empty object to avoid error but skip onSuccess
        return { authRedirect: true };
      }
      
      // Check for other errors
      if (!response.ok) {
        throw new Error(responseData?.message || 'Failed to create subscription');
      }
      
      return responseData;
    },
    onSuccess: (data) => {
      // Skip if auth redirect case
      if (data?.authRedirect) return;
      
      // Handle successful subscription creation
      if (data?.clientSecret) {
        toast({
          title: "Subscription Created",
          description: "Complete payment to activate your subscription.",
        });
        // TODO: Initialize Stripe Elements with clientSecret
      } else {
        toast({
          title: "Redirecting to checkout...",
          description: "You'll be redirected to secure payment in a moment.",
        });
      }
    },
    onError: (error: any) => {
      // Only show error if not handled in mutationFn
      toast({
        title: "Setup Required",
        description: "Please contact support to enable payments: support@shoeboxtoautopilot.com",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const handleSelectTier = (tierId: string) => {
    // For free tier, redirect to login
    if (tierId === 'free') {
      window.location.href = '/api/login';
      return;
    }
    
    // For paid tiers, initiate checkout
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
          Transform Your Financial Future
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start free. Upgrade when ready. Cancel anytime. Everyone deserves financial freedom,
          regardless of their current situation. There's always hope, always a plan.
        </p>
      </div>

      {/* Annual/Monthly Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Label htmlFor="yearly-toggle" className={!isYearly ? "font-semibold" : "text-muted-foreground"}>
          Monthly
        </Label>
        <Switch
          id="yearly-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-primary"
          data-testid="toggle-yearly"
        />
        <Label htmlFor="yearly-toggle" className={isYearly ? "font-semibold" : "text-muted-foreground"}>
          Yearly
          <Badge variant="secondary" className="ml-2">
            Save 2 Months
          </Badge>
        </Label>
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
                {tier.price === 0 ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : isYearly && tier.yearlyPrice ? (
                  <>
                    <span className="text-4xl font-bold">${tier.yearlyPrice}</span>
                    <span className="text-muted-foreground ml-2">/year</span>
                    <div className="text-sm text-muted-foreground mt-1">
                      (${(tier.yearlyPrice / 12).toFixed(2)}/mo)
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </>
                )}
              </div>
              {isYearly && tier.savingsText && (
                <Badge variant="secondary" className="mt-2">
                  {tier.savingsText}
                </Badge>
              )}
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
            
            <CardFooter className="flex flex-col gap-2">
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
                  <>
                    {tier.cta}
                    {tier.price > 0 && (
                      <span className="ml-1 text-sm opacity-90">
                        {isYearly && tier.yearlyPrice ? 
                          ` - $${tier.yearlyPrice}/year` : 
                          ` - $${tier.price}/mo`
                        }
                      </span>
                    )}
                  </>
                )}
              </Button>
              {isYearly && tier.yearlyPrice && (
                <p className="text-xs text-muted-foreground text-center">
                  Billed annually at ${tier.yearlyPrice}
                </p>
              )}
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
              <h3 className="font-semibold mb-2">Why is there a free option?</h3>
              <p className="text-sm text-muted-foreground">
                Everyone deserves a chance at financial freedom. The free tier gives you real tools 
                and a real plan. No tricks, no "trial period" - it's genuinely free forever.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if I'm too deep in debt?</h3>
              <p className="text-sm text-muted-foreground">
                There's no such thing. We've helped people with $200K debt on minimum wage find hope.
                Even if traditional payoff seems impossible, we'll explore ALL options - settlement, 
                consolidation, even strategic bankruptcy. There's ALWAYS a path forward.
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