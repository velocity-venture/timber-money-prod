import { PrivacyControls } from "@/components/PrivacyControls";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacySettings() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4" data-testid="page-privacy-settings">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Privacy & Data Control</h1>
        <p className="text-muted-foreground">
          Your data belongs to you. Control how it's stored, processed, and deleted.
        </p>
      </div>
      
      <PrivacyControls />
    </div>
  );
}