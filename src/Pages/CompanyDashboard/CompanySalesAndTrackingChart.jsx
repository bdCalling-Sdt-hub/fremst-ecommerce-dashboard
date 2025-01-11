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

const data = [
  {
    name: "Jan",
    TotalOrders: 4000,
  },
  {
    name: "Feb",
    TotalOrders: 3000,
  },
  {
    name: "Mar",
    TotalOrders: 2000,
  },
  {
    name: "Apr",
    TotalOrders: 2780,
  },
  {
    name: "May",
    TotalOrders: 1890,
  },
  {
    name: "Jun",
    TotalOrders: 2390,
  },
  {
    name: "Jul",
    TotalOrders: 3490,
  },
  {
    name: "Aug",
    TotalOrders: 2000,
  },
  {
    name: "Sep",
    TotalOrders: 2780,
  },
  {
    name: "Oct",
    TotalOrders: 1890,
  },
  {
    name: "Nov",
    TotalOrders: 2390,
  },
  {
    name: "Dec",
    TotalOrders: 3490,
  },
];

const CompanySalesTrackingChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
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

export default CompanySalesTrackingChart;
