import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// Dummy data
const dummyData = [
  { _id: "1", orderPercentage: 60, serviceName: "Haircut" },
  { _id: "2", orderPercentage: 30, serviceName: "Facial" },
  { _id: "3", orderPercentage: 10, serviceName: "Manicure" },
];

const COLORS = ["#5c2579cc", "#c274ec", "#dfbff0"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BestShortsChart = () => {
  const chartData = dummyData;

  return (
    <div className="bg-white border rounded-2xl p-4">
      <h1 className="font-bold">Best Services</h1>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              dataKey="orderPercentage"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center my-1 flex-wrap gap-1">
        {chartData.map((service, index) => (
          <div key={service._id} className="flex items-center gap-1">
            <div className={`w-3 h-2 ${COLORS[index]} rounded-full`}></div>
            <p>{`${service.orderPercentage.toFixed(1)}% ${
              service.serviceName
            }`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestShortsChart;
