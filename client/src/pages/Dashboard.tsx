import { CashflowAnalysis } from "@/components/CashflowAnalysis";
import { AvalancheAutopilot } from "@/components/AvalancheAutopilot";
import { SetAndForgetStatus } from "@/components/SetAndForgetStatus";
import { DebtSummaryCard } from "@/components/DebtSummaryCard";
import { DebtCard } from "@/components/DebtCard";
import { PayoffTimeline } from "@/components/PayoffTimeline";
import { PayoffStrategyCard } from "@/components/PayoffStrategyCard";
import { AutomatedRecommendations } from "@/components/AutomatedRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  DollarSign, 
  TrendingDown, 
  Calendar, 
  PiggyBank, 
  FileStack,
  Sparkles,
  AlertCircle,
  Shield
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  // Fetch real data
  const { data: debts } = useQuery<any[]>({
    queryKey: ["/api/debts"],
  });
  
  const { data: documents } = useQuery<any[]>({
    queryKey: ["/api/documents"],
  });

  const { data: cashflow } = useQuery<any>({
    queryKey: ["/api/cashflow/analysis"],
  });

  const hasDocuments = documents && documents.length > 0;
  const totalDebt = debts?.reduce((sum, debt) => sum + parseFloat(debt.currentBalance), 0) || 0;
  const totalMinPayment = debts?.reduce((sum, debt) => sum + parseFloat(debt.minimumPayment), 0) || 0;

  // Mock timeline data (would be calculated from debt payoff plan)
  const timelineData = [
    { month: "Jan '25", balance: totalDebt, paid: 0 },
    { month: "Apr '25", balance: totalDebt * 0.91, paid: totalDebt * 0.09 },
    { month: "Jul '25", balance: totalDebt * 0.82, paid: totalDebt * 0.18 },
    { month: "Oct '25", balance: totalDebt * 0.72, paid: totalDebt * 0.28 },
    { month: "Jan '26", balance: totalDebt * 0.61, paid: totalDebt * 0.39 },
    { month: "Apr '26", balance: totalDebt * 0.49, paid: totalDebt * 0.51 },
    { month: "Jul '26", balance: totalDebt * 0.37, paid: totalDebt * 0.63 },
    { month: "Oct '26", balance: totalDebt * 0.24, paid: totalDebt * 0.76 },
    { month: "Jan '27", balance: totalDebt * 0.11, paid: totalDebt * 0.89 },
    { month: "Apr '27", balance: 0, paid: totalDebt },
  ];

  const strategies = [
    {
      id: "avalanche",
      name: "Debt Avalanche",
      description: "Pay off highest interest rate debts first to minimize total interest paid",
      debtFreeDate: "Aug 2028",
      totalInterest: Math.round(totalDebt * 0.17),
      monthlyPayment: totalMinPayment + (cashflow?.safeMonthlyExtra || 0),
      recommended: true,
    },
    {
      id: "snowball",
      name: "Debt Snowball",
      description: "Pay off smallest balances first for psychological wins and momentum",
      debtFreeDate: "Oct 2028",
      totalInterest: Math.round(totalDebt * 0.19),
      monthlyPayment: totalMinPayment + (cashflow?.safeMonthlyExtra || 0),
    },
    {
      id: "hybrid",
      name: "Hybrid Approach",
      description: "Balance between interest savings and quick wins",
      debtFreeDate: "Sep 2028",
      totalInterest: Math.round(totalDebt * 0.18),
      monthlyPayment: totalMinPayment + (cashflow?.safeMonthlyExtra || 0),
    },
  ];

  if (!hasDocuments) {
    return (
      <div className="space-y-6" data-testid="page-dashboard">
        <div>
          <h1 className="text-3xl font-bold">Your Money Foundation System™</h1>
          <p className="text-muted-foreground mt-1">
            Turn your shoebox of bills into an automated payoff system
          </p>
        </div>

        <Card className="border-2 border-dashed">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileStack className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Start Your Shoebox to Autopilot Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Upload your financial documents and we'll create your personalized automated payoff plan.
              No daily nudges, no constant re-auth - just set it and forget it.
            </p>
            <Button size="lg" onClick={() => window.location.href = "/upload"} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      <div>
        <h1 className="text-3xl font-bold">Your Money Foundation System™</h1>
        <p className="text-muted-foreground mt-1">
          Your automated debt payoff system is active - no daily logins required
        </p>
      </div>

      {/* Legal Disclaimer */}
      <Alert className="bg-muted/50 border-muted">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <span className="font-medium">Disclaimer:</span> This service provides informational guidance only. 
          Please consult your accountant or trusted tax advisor before implementing any financial suggestions.
        </AlertDescription>
      </Alert>

      {/* Status Bar */}
      <Card className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="default" className="gap-1">
                <Sparkles className="w-3 h-3" />
                Autopilot Active
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last analysis: {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-chart-2" />
              <span>No action needed - system running</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="status" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="status">Autopilot</TabsTrigger>
          <TabsTrigger value="cashflow">Cashflow</TabsTrigger>
          <TabsTrigger value="avalanche">Avalanche</TabsTrigger>
          <TabsTrigger value="debts">Debts</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <SetAndForgetStatus />
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <CashflowAnalysis />
        </TabsContent>

        <TabsContent value="avalanche" className="space-y-6">
          <AvalancheAutopilot />
        </TabsContent>

        <TabsContent value="debts" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Debt Portfolio</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {debts?.map((debt) => (
                <DebtCard
                  key={debt.id}
                  creditor={debt.creditor}
                  balance={parseFloat(debt.currentBalance)}
                  originalBalance={parseFloat(debt.originalBalance)}
                  apr={parseFloat(debt.apr)}
                  minimumPayment={parseFloat(debt.minimumPayment)}
                  type={debt.debtType}
                />
              ))}
              {(!debts || debts.length === 0) && (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Upload more documents to see your complete debt portfolio
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <AutomatedRecommendations />
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export for Bank Autopay Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download your payment schedule and import it directly into your bank's autopay system.
                Set it once and never worry about it again.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Payment Schedule CSV</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    For importing into bank autopay systems
                  </p>
                  <Button variant="outline" className="w-full">
                    Download CSV
                  </Button>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Autopay Script</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step setup instructions
                  </p>
                  <Button variant="outline" className="w-full">
                    View Instructions
                  </Button>
                </Card>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Your Monthly Autopay Settings</h4>
                  <div className="space-y-2 text-sm">
                    {debts?.map((debt) => (
                      <div key={debt.id} className="flex justify-between py-2 border-b last:border-0">
                        <span className="text-muted-foreground">{debt.creditor}</span>
                        <span className="font-mono font-semibold">
                          ${(parseFloat(debt.minimumPayment) + ((cashflow?.safeMonthlyExtra || 0) / (debts?.length || 1))).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 font-semibold">
                      <span>Total Monthly</span>
                      <span className="font-mono text-primary">
                        ${(totalMinPayment + (cashflow?.safeMonthlyExtra || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}