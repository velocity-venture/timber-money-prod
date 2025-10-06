import { AIQuestionInterface } from "@/components/AIQuestionInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, TrendingUp, DollarSign } from "lucide-react";

export default function Advisor() {
  const uploadedDocs = [
    { type: "Bank Statements", count: 3, icon: FileText },
    { type: "Credit Cards", count: 2, icon: CreditCard },
    { type: "Investment Accounts", count: 2, icon: TrendingUp },
    { type: "Pay Stubs", count: 4, icon: DollarSign },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6" data-testid="page-advisor">
      <div>
        <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your finances and get personalized insights
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analyzed Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {uploadedDocs.map((doc) => {
              const Icon = doc.icon;
              return (
                <div
                  key={doc.type}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.count} document{doc.count > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AIQuestionInterface />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What I Can Help With</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Credit Score Expertise</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Rapid credit score improvement (450→750+)</li>
                <li>• Remove negative items & collections</li>
                <li>• Pay-for-delete negotiation strategies</li>
                <li>• Credit utilization optimization</li>
                <li>• Goodwill letter templates</li>
                <li>• Post-bankruptcy credit rebuilding</li>
                <li>• Medical debt removal tactics</li>
                <li>• Rapid rescoring strategies</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Budgeting & Planning</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Monthly budget optimization</li>
                <li>• Expense categorization insights</li>
                <li>• Income analysis and forecasting</li>
                <li>• Savings goal planning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Investments & Assets</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Portfolio performance review</li>
                <li>• Asset allocation suggestions</li>
                <li>• Retirement planning guidance</li>
                <li>• Net worth tracking</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Financial Statements</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Personal balance sheet generation</li>
                <li>• Cash flow statements</li>
                <li>• Financial health reports</li>
                <li>• Tax document preparation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
