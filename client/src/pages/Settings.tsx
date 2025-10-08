import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Download, Shield, CreditCard, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  // Get user data
  const { data: user } = useQuery<any>({
    queryKey: ["/api/auth/user"],
  });

  // Delete all data mutation
  const deleteDataMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("/api/user/data", "DELETE");
    },
    onSuccess: () => {
      toast({
        title: "Data Deleted Successfully",
        description: "All your financial data has been removed. Your account remains active.",
      });
      // Clear all cached data
      queryClient.clear();
      // Redirect to dashboard
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete your data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteData = async () => {
    setIsDeleting(true);
    await deleteDataMutation.mutateAsync();
    setIsDeleting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and privacy preferences
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="text-sm text-muted-foreground">Email:</span>
            <p className="font-medium">{user?.email || "Not available"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Name:</span>
            <p className="font-medium">{user?.name || "Not set"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Account Type:</span>
            <p className="font-medium">
              {user?.stripeSubscriptionId ? (
                <span className="text-green-600">Pro Account</span>
              ) : (
                <span>Free Account</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Subscription
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user?.stripeSubscriptionId ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  You have an active Pro subscription. Your AI analysis uses our premium GPT-4o model.
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                To manage your subscription, billing details, or cancel, please contact support.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You're on the free plan with GPT-4o-mini AI analysis.
              </p>
              <Button onClick={() => setLocation("/pricing")} data-testid="button-upgrade-plan">
                Upgrade to Pro
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-medium">Security Information</h4>
              <p className="text-sm text-muted-foreground">
                Learn how we protect your data
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setLocation("/security")}
              data-testid="button-view-security"
            >
              View Security
            </Button>
          </div>

          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download all your financial data in JSON format
              </p>
            </div>
            <Button variant="outline" disabled data-testid="button-export-data">
              <Download className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-destructive/50">
            <AlertDescription>
              <strong>Warning:</strong> The actions below are permanent and cannot be undone.
            </AlertDescription>
          </Alert>

          <div className="p-4 border border-destructive/20 rounded-lg space-y-3">
            <h4 className="font-medium">Delete All Financial Data</h4>
            <p className="text-sm text-muted-foreground">
              This will permanently delete all your uploaded documents, financial profiles, 
              debt information, assets, and AI chat history. Your account will remain active 
              but all financial data will be removed.
            </p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isDeleting}
                  data-testid="button-delete-data"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete All My Data"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>
                      This action cannot be undone. This will permanently delete:
                    </p>
                    <ul className="list-disc list-inside text-sm">
                      <li>All uploaded documents and analysis</li>
                      <li>Your financial profile and credit information</li>
                      <li>All debt and asset records</li>
                      <li>Your entire AI chat history</li>
                      <li>Any saved strategies or plans</li>
                    </ul>
                    <p className="font-semibold mt-3">
                      Your account will remain active, but all financial data will be gone forever.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteData}
                    className="bg-destructive hover:bg-destructive/90"
                    data-testid="button-confirm-delete"
                  >
                    Yes, Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="p-4 border border-muted rounded-lg space-y-3 opacity-50">
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
            <Button variant="outline" disabled data-testid="button-delete-account">
              Contact Support to Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}