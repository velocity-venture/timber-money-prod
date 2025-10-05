import { PayoffTimeline } from "../PayoffTimeline";

export default function PayoffTimelineExample() {
  const data = [
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

  return <PayoffTimeline data={data} />;
}
