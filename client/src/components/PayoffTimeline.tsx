import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TimelineData {
  month: string;
  balance: number;
  paid: number;
}

interface PayoffTimelineProps {
  data: TimelineData[];
}

export function PayoffTimeline({ data }: PayoffTimelineProps) {
  return (
    <Card data-testid="card-payoff-timeline">
      <CardHeader>
        <CardTitle>Debt Payoff Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              name="Remaining Balance"
            />
            <Line
              type="monotone"
              dataKey="paid"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Total Paid"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
