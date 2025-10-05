import { DebtSummaryCard } from "../DebtSummaryCard";
import { DollarSign, TrendingDown, Calendar, PiggyBank } from "lucide-react";

export default function DebtSummaryCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DebtSummaryCard
        title="Total Debt"
        value="$72,700"
        subtitle="Across 5 accounts"
        icon={DollarSign}
      />
      <DebtSummaryCard
        title="Monthly Payment"
        value="$1,845"
        subtitle="Combined minimum"
        icon={TrendingDown}
      />
      <DebtSummaryCard
        title="Debt-Free Date"
        value="Aug 2028"
        subtitle="With current plan"
        icon={Calendar}
        trend={{ value: "6 months faster", isPositive: true }}
      />
      <DebtSummaryCard
        title="Interest Savings"
        value="$8,400"
        subtitle="vs minimum payments"
        icon={PiggyBank}
        trend={{ value: "Optimized plan", isPositive: true }}
      />
    </div>
  );
}
