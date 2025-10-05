import { DebtSummaryCard } from "@/components/DebtSummaryCard";
import { DebtCard } from "@/components/DebtCard";
import { PayoffTimeline } from "@/components/PayoffTimeline";
import { BudgetBreakdown } from "@/components/BudgetBreakdown";
import { PayoffStrategyCard } from "@/components/PayoffStrategyCard";
import { DollarSign, TrendingDown, Calendar, PiggyBank } from "lucide-react";

export default function Dashboard() {
  const timelineData = [
    { month: "Jan '25", balance: 72700, paid: 0 },
    { month: "Apr '25", balance: 66200, paid: 6500 },
    { month: "Jul '25", balance: 59400, paid: 13300 },
    { month: "Oct '25", balance: 52100, paid: 20600 },
    { month: "Jan '26", balance: 44300, paid: 28400 },
    { month: "Apr '26", balance: 36000, paid: 36700 },
    { month: "Jul '26", balance: 27200, paid: 45500 },
    { month: "Oct '26", balance: 17800, paid: 54900 },
    { month: "Jan '27", balance: 7900, paid: 64800 },
    { month: "Apr '27", balance: 0, paid: 72700 },
  ];

  const strategies = [
    {
      id: "avalanche",
      name: "Debt Avalanche",
      description: "Pay off highest interest rate debts first to minimize total interest paid",
      debtFreeDate: "Aug 2028",
      totalInterest: 12400,
      monthlyPayment: 2200,
      recommended: true,
    },
    {
      id: "snowball",
      name: "Debt Snowball",
      description: "Pay off smallest balances first for psychological wins and momentum",
      debtFreeDate: "Oct 2028",
      totalInterest: 13800,
      monthlyPayment: 2200,
    },
    {
      id: "hybrid",
      name: "Hybrid Approach",
      description: "Balance between interest savings and quick wins",
      debtFreeDate: "Sep 2028",
      totalInterest: 13100,
      monthlyPayment: 2200,
    },
  ];

  const budgetCategories = [
    { name: "Housing", amount: 1800, color: "hsl(var(--chart-1))" },
    { name: "Transportation", amount: 450, color: "hsl(var(--chart-2))" },
    { name: "Food & Groceries", amount: 600, color: "hsl(var(--chart-3))" },
    { name: "Utilities", amount: 200, color: "hsl(var(--chart-4))" },
    { name: "Insurance", amount: 300, color: "hsl(var(--chart-5))" },
    { name: "Debt Minimum", amount: 1845, color: "hsl(var(--destructive))" },
  ];

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      <div>
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your personalized debt freedom roadmap
        </p>
      </div>

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

      <div className="grid gap-6 lg:grid-cols-2">
        <PayoffTimeline data={timelineData} />
        <BudgetBreakdown income={6500} categories={budgetCategories} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Debts</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <DebtCard
                creditor="Chase Sapphire"
                balance={12500}
                originalBalance={15000}
                apr={18.99}
                minimumPayment={375}
                type="credit-card"
              />
              <DebtCard
                creditor="Auto Loan"
                balance={18200}
                originalBalance={25000}
                apr={5.49}
                minimumPayment={450}
                type="loan"
              />
              <DebtCard
                creditor="Student Loan"
                balance={42000}
                originalBalance={50000}
                apr={4.25}
                minimumPayment={520}
                type="loan"
              />
            </div>
          </div>
        </div>
        <div>
          <PayoffStrategyCard strategies={strategies} />
        </div>
      </div>
    </div>
  );
}
