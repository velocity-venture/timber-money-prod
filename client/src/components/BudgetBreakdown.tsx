import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BudgetCategory {
  name: string;
  amount: number;
  color: string;
}

interface BudgetBreakdownProps {
  income: number;
  categories: BudgetCategory[];
}

export function BudgetBreakdown({ income, categories }: BudgetBreakdownProps) {
  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const surplus = income - totalExpenses;
  const surplusPercentage = (surplus / income) * 100;

  return (
    <Card data-testid="card-budget-breakdown">
      <CardHeader>
        <CardTitle>Monthly Budget Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Income Distribution
            </h4>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm font-mono font-medium">
                      ${category.amount.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(category.amount / income) * 100}
                    className="h-2"
                  />
                </div>
              ))}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-chart-2">
                    Debt Payment Surplus
                  </span>
                  <span className="text-sm font-mono font-semibold text-chart-2">
                    ${surplus.toLocaleString()}
                  </span>
                </div>
                <Progress value={surplusPercentage} className="h-2" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Expense Overview
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--popover-border))",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-chart-2/10 border border-chart-2/20 rounded-lg p-4">
          <p className="text-sm font-medium text-chart-2 mb-1">
            Monthly Income: ${income.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Apply ${surplus.toLocaleString()} surplus toward debt payoff for
            faster results
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
