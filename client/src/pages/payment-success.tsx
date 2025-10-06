import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="container max-w-2xl mx-auto py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your payment. You will receive a confirmation email shortly.
          </p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild data-testid="button-back-home">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-view-dashboard">
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}