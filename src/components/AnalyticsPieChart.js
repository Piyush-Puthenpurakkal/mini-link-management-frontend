import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#114c2e", "#38d9a9", "#9cf3d7", "#21c088"];

const AnalyticsPieChart = ({ data }) => {
  console.log("📊 Received Pie Chart Data:", data); // ✅ Debugging

  // ✅ Ensure platformStats exists and is valid
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

  // ✅ Ensure all platforms appear, even if views are 0
  const chartData = Object.entries(data).map(([platform, value], index) => ({
    name: platform,
    value: value > 0 ? value : 0, // ✅ Prevents zero-sized sections
    color: value > 0 ? COLORS[index % COLORS.length] : "#d3d3d3", // ✅ Gray out 0-value sections
  }));

  console.log("📊 Processed Chart Data:", chartData); // ✅ Debugging

  return (
    <>
      <div className="pie-chart-container">
        <h3 className="pie-chart-title">Sites</h3>
        <div className="pie-chart">
          <PieChart width={300} height={280}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="custom-legend">
            {chartData.map((entry, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-dot"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="legend-label">{entry.name}</span>
                <span className="legend-value">
                  {entry.value > 0 ? entry.value : 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPieChart;
