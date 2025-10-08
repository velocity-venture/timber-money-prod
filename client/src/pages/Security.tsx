import { Link } from "wouter";
import { Shield, Lock, Database, Key, FileX, Eye, Server, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Your Security & Privacy</h1>
            <p className="text-xl text-muted-foreground">
              Transparency about how we protect your financial data
            </p>
          </div>

          {/* Honest Disclosure */}
          <Alert className="mb-8 border-primary/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Full Transparency:</strong> We use OpenAI's enterprise API to analyze your documents. 
              This means your data is processed by OpenAI's secure servers, but OpenAI does not store or train on your data.
              We believe in being completely honest about our data practices.
            </AlertDescription>
          </Alert>

          {/* How Your Data Flows */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="w-6 h-6" />
              How Your Data Flows
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">You Upload a Document</h3>
                  <p className="text-muted-foreground">
                    Your document is encrypted using TLS/HTTPS during upload
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Processing</h3>
                  <p className="text-muted-foreground">
                    We send your document to OpenAI's API for analysis. OpenAI processes it but doesn't store or train on it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Data Extraction</h3>
                  <p className="text-muted-foreground">
                    We extract only financial numbers and discard the document image
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2 mt-1">
                  <span className="font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Storage</h3>
                  <p className="text-muted-foreground">
                    Your extracted financial data is encrypted and stored in our PostgreSQL database
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* What We Do */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                What We Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Use 256-bit TLS encryption for all data transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Process documents through OpenAI's enterprise API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Encrypt your data at rest in our database</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Use OAuth authentication (no password storage)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Allow complete data deletion anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Provide full data export capabilities</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileX className="w-5 h-5 text-orange-600" />
                What We Don't Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't permanently store document images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't sell or share your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't allow OpenAI to train on your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't store your passwords</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't have access to your bank accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">✗</span>
                  <span>We don't keep data after you delete it</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Technical Details */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Server className="w-6 h-6" />
              Technical Security Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Encryption
                </h3>
                <p className="text-sm text-muted-foreground">
                  • TLS 1.3 for data in transit<br />
                  • AES-256 for data at rest<br />
                  • Encrypted session cookies
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Authentication
                </h3>
                <p className="text-sm text-muted-foreground">
                  • OAuth 2.0 via Replit Auth<br />
                  • No password storage<br />
                  • Secure session management
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database
                </h3>
                <p className="text-sm text-muted-foreground">
                  • PostgreSQL with encryption<br />
                  • Regular automated backups<br />
                  • Isolated production environment
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Third Parties
                </h3>
                <p className="text-sm text-muted-foreground">
                  • OpenAI for AI processing<br />
                  • Stripe for payments<br />
                  • Replit for hosting
                </p>
              </div>
            </div>
          </Card>

          {/* OpenAI Data Agreement */}
          <Card className="p-8 mb-8 border-primary/50">
            <h2 className="text-2xl font-bold mb-4">OpenAI Data Agreement</h2>
            <p className="text-muted-foreground mb-4">
              We use OpenAI's API under their enterprise agreement which ensures:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Your data is NOT used to train OpenAI's models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Data is retained for only 30 days for security monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Enterprise-grade security and compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>SOC 2 Type 2 certified infrastructure</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Read more about{" "}
              <a 
                href="https://openai.com/enterprise-privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid="link-openai-privacy"
              >
                OpenAI's enterprise privacy policies
              </a>
            </p>
          </Card>

          {/* Your Rights */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Data Rights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Right to Delete</h3>
                <p className="text-sm text-muted-foreground">
                  Delete all your data instantly from your account settings
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Right to Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download all your data in a standard format anytime
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Right to Know</h3>
                <p className="text-sm text-muted-foreground">
                  This page explains exactly how we handle your data
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Right to Control</h3>
                <p className="text-sm text-muted-foreground">
                  You choose what to upload and can remove it anytime
                </p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-primary/5">
            <h2 className="text-2xl font-bold mb-4">Questions About Security?</h2>
            <p className="text-muted-foreground mb-6">
              We believe in complete transparency about data security. 
              If you have any questions or concerns about how we handle your data, we're here to help.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/privacy" data-testid="button-privacy-policy">
                  Read Privacy Policy
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/terms" data-testid="button-terms">
                  Terms of Service
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}