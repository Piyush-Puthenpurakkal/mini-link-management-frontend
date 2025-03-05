import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const AnalyticsLineChart = ({ data }) => {
  console.log("📊 Line Chart Data:", data); // ✅ Debugging

  if (!data || data.length === 0) {
    return <p>No data available for this chart.</p>;
  }

  return (
    <div className="chart-container">
      <div className="scrollable-chart-container">
        <div className="scrollable-chart-inner">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="month"
                tick={{ fill: "#666" }}
                tickFormatter={(value) => value.split(" ")[0]}
                axisLine={false}
                tickLine={false}
              />{" "}
              <YAxis
                tick={{ fill: "#666" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Area
                type="monotone"
                dataKey="totalVisits"
                stroke="none"
                fill="#f0f5f7"
              />
              <Line
                type="monotone"
                dataKey="totalVisits"
                stroke="black"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsLineChart;
