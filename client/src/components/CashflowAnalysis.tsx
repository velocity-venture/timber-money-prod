import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertCircle,
  CheckCircle,
  Download,
  Calculator,
  Sparkles
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CashflowData {
  monthlyIncome: number;
  essentialExpenses: number;
  minimumDebtPayments: number;
  discretionarySpending: number;
  currentSavings: number;
  safeMonthlyExtra: number;
  confidenceScore: number;
  recommendations: string[];
}

export function CashflowAnalysis() {
  // Fetch cashflow analysis from backend
  const { data: analysis, isLoading } = useQuery<CashflowData>({
    queryKey: ["/api/cashflow/analysis"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Calculating your safe monthly EXTRA...</p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Upload financial documents to generate your cashflow analysis</p>
          <Button onClick={() => window.location.href = "/upload"}>
            Upload Documents
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totalExpenses = analysis.essentialExpenses + analysis.minimumDebtPayments + analysis.discretionarySpending;
  const netCashflow = analysis.monthlyIncome - totalExpenses;
  const extraPercentage = (analysis.safeMonthlyExtra / analysis.monthlyIncome) * 100;

  const exportCashflowWorkbook = () => {
    // Export as CSV for bank import
    const csv = [
      ["Cashflow Foundation Workbook", ""],
      ["Generated", new Date().toLocaleDateString()],
      ["", ""],
      ["Income & Expenses", "Amount"],
      ["Monthly Income", analysis.monthlyIncome],
      ["Essential Expenses", analysis.essentialExpenses],
      ["Minimum Debt Payments", analysis.minimumDebtPayments],
      ["Discretionary Spending", analysis.discretionarySpending],
      ["Net Cashflow", netCashflow],
      ["", ""],
      ["Autopilot Settings", ""],
      ["Safe Monthly EXTRA", analysis.safeMonthlyExtra],
      ["Emergency Buffer", analysis.currentSavings],
      ["Confidence Score", `${analysis.confidenceScore}%`],
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cashflow-foundation-workbook.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Hero Card - Safe Monthly EXTRA */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Your Safe Monthly EXTRA™</CardTitle>
              <CardDescription>
                The maximum amount you can safely allocate to debt payoff each month
              </CardDescription>
            </div>
            <Badge variant="default" className="gap-1">
              <Sparkles className="w-3 h-3" />
              AI Calculated
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="text-5xl font-bold text-primary">
              ${analysis.safeMonthlyExtra.toLocaleString()}
            </div>
            <div className="pb-2">
              <Badge variant="secondary" className="gap-1">
                <Target className="w-3 h-3" />
                {extraPercentage.toFixed(1)}% of income
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-chart-2" />
              <span className="text-sm font-semibold">Confidence Score: {analysis.confidenceScore}%</span>
            </div>
            <Progress value={analysis.confidenceScore} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on 3-month spending patterns and emergency buffer analysis
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={exportCashflowWorkbook} className="gap-2">
              <Download className="w-4 h-4" />
              Export Workbook
            </Button>
            <Button variant="outline" className="gap-2">
              <Calculator className="w-4 h-4" />
              Adjust Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Income vs Expenses Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-chart-2" />
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Income</span>
                  <span className="font-semibold">${analysis.monthlyIncome.toLocaleString()}</span>
                </div>
                <Progress value={100} className="h-2 bg-chart-2/20" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Essential</span>
                  <span className="text-sm">${analysis.essentialExpenses.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(analysis.essentialExpenses / analysis.monthlyIncome) * 100} 
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Minimum Debt Payments</span>
                  <span className="text-sm">${analysis.minimumDebtPayments.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(analysis.minimumDebtPayments / analysis.monthlyIncome) * 100} 
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Discretionary</span>
                  <span className="text-sm">${analysis.discretionarySpending.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(analysis.discretionarySpending / analysis.monthlyIncome) * 100} 
                  className="h-2"
                />
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Total Expenses</span>
                  <span className="font-semibold">${totalExpenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cashflow Waterfall */}
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Waterfall</CardTitle>
          <CardDescription>
            How your income flows through expenses to create your EXTRA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Income */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium">Income</div>
              <div className="flex-1">
                <div className="h-8 bg-chart-2 rounded flex items-center px-3">
                  <span className="text-xs text-primary-foreground font-semibold">
                    ${analysis.monthlyIncome.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Essentials */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-muted-foreground">- Essentials</div>
              <div className="flex-1">
                <div 
                  className="h-6 bg-muted rounded"
                  style={{width: `${(analysis.essentialExpenses / analysis.monthlyIncome) * 100}%`}}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                ${analysis.essentialExpenses.toLocaleString()}
              </span>
            </div>

            {/* Minimum Payments */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-muted-foreground">- Min Payments</div>
              <div className="flex-1">
                <div 
                  className="h-6 bg-muted rounded"
                  style={{width: `${(analysis.minimumDebtPayments / analysis.monthlyIncome) * 100}%`}}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                ${analysis.minimumDebtPayments.toLocaleString()}
              </span>
            </div>

            {/* Discretionary */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-muted-foreground">- Discretionary</div>
              <div className="flex-1">
                <div 
                  className="h-6 bg-muted rounded"
                  style={{width: `${(analysis.discretionarySpending / analysis.monthlyIncome) * 100}%`}}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                ${analysis.discretionarySpending.toLocaleString()}
              </span>
            </div>

            {/* Emergency Buffer */}
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm text-muted-foreground">- Emergency Buffer</div>
              <div className="flex-1">
                <div 
                  className="h-6 bg-border rounded"
                  style={{width: `${((netCashflow - analysis.safeMonthlyExtra) / analysis.monthlyIncome) * 100}%`}}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                ${(netCashflow - analysis.safeMonthlyExtra).toLocaleString()}
              </span>
            </div>

            {/* Safe EXTRA */}
            <div className="flex items-center gap-4 pt-3 border-t">
              <div className="w-32 text-sm font-semibold text-primary">= Safe EXTRA</div>
              <div className="flex-1">
                <div 
                  className="h-8 bg-primary rounded flex items-center px-3"
                  style={{width: `${(analysis.safeMonthlyExtra / analysis.monthlyIncome) * 100}%`}}
                >
                  <span className="text-xs text-primary-foreground font-semibold">
                    ${analysis.safeMonthlyExtra.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}