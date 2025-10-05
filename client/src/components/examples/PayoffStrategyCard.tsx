import { PayoffStrategyCard } from "../PayoffStrategyCard";

export default function PayoffStrategyCardExample() {
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

  return <PayoffStrategyCard strategies={strategies} />;
}
