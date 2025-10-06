import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";

export default function SubscriptionSuccess() {
  return (
    <div className="container max-w-2xl mx-auto py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Premium!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Your subscription is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You now have access to all premium features. Start exploring your enhanced financial tools!
          </p>
          
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="font-medium">What's next?</p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Upload your financial documents for AI analysis</li>
              <li>• Get personalized debt payoff strategies</li>
              <li>• Chat with your AI financial advisor</li>
              <li>• Track your progress towards financial freedom</li>
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild data-testid="button-go-dashboard">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" data-testid="button-upload-documents">
              <Link href="/documents">
                Upload Documents
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}