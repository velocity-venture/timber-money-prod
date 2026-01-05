import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
// Only use publishable keys (pk_*), not secret keys (sk_*)
const isValidPublishableKey = stripeKey && stripeKey.startsWith('pk_');
if (!isValidPublishableKey && import.meta.env.DEV) {
  console.warn('Stripe publishable key missing or invalid — payments disabled');
}
const stripePromise = isValidPublishableKey && stripeKey ? loadStripe(stripeKey) : null;

const CheckoutForm = ({ amount }: { amount: number }) => {
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
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
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
        data-testid="button-submit-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(100);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const { toast } = useToast();

  const createPaymentIntent = async () => {
    setIsLoadingPayment(true);
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount,
        currency: "usd"
      });
      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("Failed to create payment intent");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoadingPayment(false);
    }
  };

  useEffect(() => {
    // Create PaymentIntent when amount is set
    if (amount > 0 && stripePromise) {
      createPaymentIntent();
    }
  }, []);

  if (!stripePromise) {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>One-Time Payment</CardTitle>
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
      <div className="container max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>One-Time Payment</CardTitle>
            <CardDescription>
              Enter the amount you'd like to pay
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="flex gap-2">
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.50"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="100.00"
                  data-testid="input-payment-amount"
                />
                <Button 
                  onClick={createPaymentIntent}
                  disabled={amount <= 0 || isLoadingPayment}
                  data-testid="button-create-payment"
                >
                  {isLoadingPayment ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create Payment"
                  )}
                </Button>
              </div>
            </div>
            
            {isLoadingPayment && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>
            Enter your payment details below to complete your purchase
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
            <CheckoutForm amount={amount} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
}