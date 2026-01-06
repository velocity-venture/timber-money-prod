import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, ArrowDown } from "lucide-react";

interface FinancialProfileCardProps {
  totalAssets: number;
  totalLiabilities: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function FinancialProfileCard({
  totalAssets,
  totalLiabilities,
  monthlyIncome,
  monthlyExpenses,
}: FinancialProfileCardProps) {
  const netWorth = totalAssets - totalLiabilities;
  const monthlySurplus = monthlyIncome - monthlyExpenses;
  const debtToIncomeRatio = (monthlyExpenses / monthlyIncome) * 100;

  return (
    <Card data-testid="card-financial-profile">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle>Financial Profile</CardTitle>
        <Button variant="outline" size="sm" data-testid="button-export-profile">
          <Download className="w-4 h-4 mr-2" />
          Export Statement
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Net Worth
              </h3>
              <p className={`text-3xl font-mono font-bold ${netWorth >= 0 ? "text-chart-2" : "text-destructive"}`}>
                ${netWorth.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Assets minus liabilities
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Total Assets</span>
                </div>
                <p className="text-lg font-mono font-semibold">
                  ${totalAssets.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ArrowDown className="w-3 h-3" />
                  <span>Total Liabilities</span>
                </div>
                <p className="text-lg font-mono font-semibold">
                  ${totalLiabilities.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Monthly Cash Flow
              </h3>
              <p className={`text-3xl font-mono font-bold ${monthlySurplus >= 0 ? "text-chart-2" : "text-destructive"}`}>
                ${monthlySurplus.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Income minus expenses
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Monthly Income
                </div>
                <p className="text-lg font-mono font-semibold">
                  ${monthlyIncome.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Monthly Expenses
                </div>
                <p className="text-lg font-mono font-semibold">
                  ${monthlyExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium mb-1">Debt-to-Income Ratio</h4>
              <p className="text-xs text-muted-foreground">
                {debtToIncomeRatio.toFixed(1)}% of income goes to debt
              </p>
            </div>
            <Badge variant={debtToIncomeRatio < 36 ? "default" : "destructive"}>
              {debtToIncomeRatio < 36 ? "Healthy" : "High Risk"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
