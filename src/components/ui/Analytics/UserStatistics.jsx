import { Spin } from "antd";
import logo from "../../../assets/logo.png";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyChartData = [
  { month: "January", userCount: 120 },
  { month: "February", userCount: 150 },
  { month: "March", userCount: 200 },
  { month: "April", userCount: 180 },
  { month: "May", userCount: 220 },
  { month: "June", userCount: 250 },
  { month: "July", userCount: 300 },
  { month: "August", userCount: 280 },
  { month: "September", userCount: 310 },
  { month: "October", userCount: 400 },
  { month: "November", userCount: 350 },
  { month: "December", userCount: 450 },
];

const UserStatistics = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const isLoading = false; // Simulate loading state for testing
  const chartData = dummyChartData; // Use dummy data for development

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => currentYear - 10 + i
  ).reverse();

  return (
    <div className="bg-white border p-4 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">User Statistics</p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="border rounded-md px-3 py-1 cursor-pointer"
          style={{
            maxHeight: "150px",
            overflowY: "scroll",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="userCount"
            stroke="#5c2579cc"
            fill="#f6e7ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatistics;
