import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Check } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripeKey && import.meta.env.DEV) {
  console.warn('Stripe key missing — payments disabled');
}
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/subscription-success`,
      },
    });

    if (error) {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Subscription Successful",
        description: "Welcome to Premium! Your subscription is now active.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement className="mb-6" />
      <Button 
        type="submit" 
        disabled={!stripe || !elements || isProcessing}
        className="w-full"
        size="lg"
        data-testid="button-subscribe"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
    </form>
  );
};

export default function Subscribe() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Create subscription as soon as the page loads
    const createSubscription = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-subscription");
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to create subscription");
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to initialize subscription. Please ensure you're logged in.",
          variant: "destructive",
        });
        console.error("Error creating subscription:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createSubscription();
  }, []);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Premium Subscription</CardTitle>
            <CardDescription>
              Payment processing is currently unavailable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stripe payment integration is not configured. Please contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Premium Subscription</CardTitle>
            <CardDescription>
              Please log in to continue with your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You need to be logged in to subscribe to our premium plan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Plan Details */}
        <Card>
          <CardHeader>
            <CardTitle>Premium Plan</CardTitle>
            <CardDescription>
              Unlock all features and get the most out of our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">
              $29.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Unlimited Document Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Upload and analyze unlimited financial documents
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Advanced AI Advisor</p>
                  <p className="text-sm text-muted-foreground">
                    Get personalized financial advice and strategies
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Debt Payoff Optimizer</p>
                  <p className="text-sm text-muted-foreground">
                    Smart strategies to become debt-free faster
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Priority Support</p>
                  <p className="text-sm text-muted-foreground">
                    Get help when you need it most
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Cancel anytime. No hidden fees. Secure payment processing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter your payment information to start your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Elements 
              stripe={stripePromise} 
              options={{ 
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: 'hsl(var(--primary))',
                  },
                },
              }}
            >
              <SubscribeForm />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}