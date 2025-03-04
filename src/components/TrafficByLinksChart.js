import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#114c2e", "#38d9a9", "#9cf3d7", "#21c088"];
const TrafficByLinksChart = ({ data }) => {
  console.log("📊 Links Data for Chart:", data); // ✅ Debugging

  if (!data || data.length === 0) {
    return <p>No data available for this chart.</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>Traffic by Links</h3>
      <div className="scrollable-chart-container">
        <div className="scrollable-chart-inner">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} barSize={30}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#555", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />{" "}
              <YAxis
                tick={{ fill: "#555", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TrafficByLinksChart;
