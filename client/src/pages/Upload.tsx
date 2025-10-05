import { FileUploadZone } from "@/components/FileUploadZone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Lock } from "lucide-react";

export default function Upload() {
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-upload">
      <div>
        <h1 className="text-3xl font-bold">Upload Documents</h1>
        <p className="text-muted-foreground mt-1">
          Upload your bank statements, credit card bills, and loan documents for AI analysis
        </p>
      </div>

      <FileUploadZone />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-base">Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Bank-level encryption protects your sensitive financial data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-chart-2" />
            </div>
            <CardTitle className="text-base">AI-Powered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced AI extracts data from PDFs, images, and statements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center mb-2">
              <Lock className="w-5 h-5 text-chart-3" />
            </div>
            <CardTitle className="text-base">Not Stored</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Documents are analyzed in real-time and never permanently stored
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
