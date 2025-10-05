import { BudgetBreakdown } from "../BudgetBreakdown";

export default function BudgetBreakdownExample() {
  const categories = [
    { name: "Housing", amount: 1800, color: "hsl(var(--chart-1))" },
    { name: "Transportation", amount: 450, color: "hsl(var(--chart-2))" },
    { name: "Food & Groceries", amount: 600, color: "hsl(var(--chart-3))" },
    { name: "Utilities", amount: 200, color: "hsl(var(--chart-4))" },
    { name: "Insurance", amount: 300, color: "hsl(var(--chart-5))" },
    { name: "Debt Minimum", amount: 1845, color: "hsl(var(--destructive))" },
  ];

  return <BudgetBreakdown income={6500} categories={categories} />;
}
