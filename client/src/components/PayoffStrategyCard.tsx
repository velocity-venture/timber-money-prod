import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";

interface Strategy {
  id: string;
  name: string;
  description: string;
  debtFreeDate: string;
  totalInterest: number;
  monthlyPayment: number;
  recommended?: boolean;
}

interface PayoffStrategyCardProps {
  strategies: Strategy[];
}

export function PayoffStrategyCard({ strategies }: PayoffStrategyCardProps) {
  const [selectedStrategy, setSelectedStrategy] = useState(
    strategies.find((s) => s.recommended)?.id || strategies[0].id
  );

  return (
    <Card data-testid="card-payoff-strategy">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Debt Payoff Strategy</span>
          <Badge variant="outline">Compare Plans</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            onClick={() => setSelectedStrategy(strategy.id)}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all
              ${
                selectedStrategy === strategy.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover-elevate"
              }
            `}
            data-testid={`strategy-${strategy.id}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedStrategy === strategy.id
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {selectedStrategy === strategy.id && (
                    <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                <h4 className="font-semibold">{strategy.name}</h4>
              </div>
              {strategy.recommended && (
                <Badge variant="default" className="text-xs">
                  Recommended
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3 ml-7">
              {strategy.description}
            </p>
            <div className="grid grid-cols-3 gap-4 ml-7">
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>Debt-Free</span>
                </div>
                <p className="text-sm font-mono font-semibold">
                  {strategy.debtFreeDate}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Total Interest</span>
                </div>
                <p className="text-sm font-mono font-semibold">
                  ${strategy.totalInterest.toLocaleString()}
                </p>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Monthly
                </div>
                <p className="text-sm font-mono font-semibold">
                  ${strategy.monthlyPayment.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        <Button className="w-full" size="lg" data-testid="button-select-strategy">
          Use Selected Strategy
        </Button>
      </CardContent>
    </Card>
  );
}
