import { FinancialProfileCard } from "@/components/FinancialProfileCard";
import { AssetCard } from "@/components/AssetCard";
import { CreditReportSummary } from "@/components/CreditReportSummary";
import { DebtCard } from "@/components/DebtCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export default function FinancialProfile() {
  const creditFactors = [
    {
      name: "Payment History",
      status: "good" as const,
      impact: "No late payments in 24 months - excellent!",
      percentage: 35,
    },
    {
      name: "Credit Utilization",
      status: "fair" as const,
      impact: "Using 42% of available credit - try to keep below 30%",
      percentage: 30,
    },
    {
      name: "Credit Age",
      status: "good" as const,
      impact: "Average age of 8.5 years is healthy",
      percentage: 15,
    },
    {
      name: "Credit Mix",
      status: "good" as const,
      impact: "Good variety of credit types",
      percentage: 10,
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-profile">
      <div>
        <h1 className="text-3xl font-bold">Your Complete Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          From receipt chaos to clear visibility - everything organized in one place
        </p>
      </div>

      {/* Legal Disclaimer */}
      <Alert className="bg-muted/50 border-muted">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <span className="font-medium">Disclaimer:</span> This information is for educational purposes only. 
          Consult your accountant or tax advisor before making financial decisions.
        </AlertDescription>
      </Alert>

      <FinancialProfileCard
        totalAssets={564300}
        totalLiabilities={72700}
        monthlyIncome={6500}
        monthlyExpenses={5195}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Assets</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AssetCard
                name="Primary Residence"
                value={425000}
                type="property"
                details="3 bed, 2 bath • Purchased 2019"
              />
              <AssetCard
                name="401(k) Retirement"
                value={89500}
                type="investment"
                growth={12.4}
                details="Employer match: 6% • Vanguard Target 2050"
              />
              <AssetCard
                name="2021 Honda Accord"
                value={22000}
                type="vehicle"
                details="38k miles • Fair condition"
              />
              <AssetCard
                name="Emergency Fund"
                value={15000}
                type="savings"
                details="High-yield savings account"
              />
              <AssetCard
                name="Brokerage Account"
                value={12800}
                type="investment"
                growth={8.2}
                details="Index funds & ETFs"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Liabilities</h2>
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
          <CreditReportSummary
            score={728}
            factors={creditFactors}
            accounts={{
              total: 12,
              open: 8,
              closed: 4,
            }}
            inquiries={2}
          />
        </div>
      </div>
    </div>
  );
}
