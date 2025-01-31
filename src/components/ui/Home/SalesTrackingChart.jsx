import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetOrderStatsForUserQuery } from "../../../redux/apiSlices/orderSlice";

// Define month names for mapping
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SalesTrackingChart = ({ id }) => {
  const [year, setYear] = React.useState(2025);
  const { data: stats, isLoading } = useGetOrderStatsForUserQuery(year, id && id);

  // Transform API data into recharts-friendly format
  const chartData = MONTHS.map((month, index) => {
    const monthData = stats?.data?.monthlyStats?.find((m) => m.month === index + 1) || { totalOrders: 0 };
    return {
      name: month,
      TotalOrders: monthData.totalOrders,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="TotalOrders"
          stackId="a"
          fill="#292c61"
          radius={[8, 8, 0, 0]}
          barSize={35}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesTrackingChart;
