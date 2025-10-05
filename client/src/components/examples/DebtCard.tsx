import { DebtCard } from "../DebtCard";

export default function DebtCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
