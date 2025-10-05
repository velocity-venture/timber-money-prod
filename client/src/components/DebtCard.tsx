import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, CreditCard } from "lucide-react";

interface DebtCardProps {
  creditor: string;
  balance: number;
  originalBalance: number;
  apr: number;
  minimumPayment: number;
  type: "credit-card" | "loan" | "mortgage";
}

export function DebtCard({
  creditor,
  balance,
  originalBalance,
  apr,
  minimumPayment,
  type,
}: DebtCardProps) {
  const progress = ((originalBalance - balance) / originalBalance) * 100;

  const typeColors = {
    "credit-card": "bg-chart-1/10 text-chart-1",
    loan: "bg-chart-2/10 text-chart-2",
    mortgage: "bg-chart-3/10 text-chart-3",
  };

  return (
    <Card data-testid={`card-debt-${creditor}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${typeColors[type]} flex items-center justify-center`}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{creditor}</h3>
            <p className="text-xs text-muted-foreground capitalize">
              {type.replace("-", " ")}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          {apr}% APR
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">
              Current Balance
            </span>
            <span className="text-2xl font-mono font-semibold">
              ${balance.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium">{progress.toFixed(1)}% paid</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingDown className="w-4 h-4" />
            <span>Minimum Payment</span>
          </div>
          <span className="text-sm font-mono font-medium">
            ${minimumPayment.toLocaleString()}/mo
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
