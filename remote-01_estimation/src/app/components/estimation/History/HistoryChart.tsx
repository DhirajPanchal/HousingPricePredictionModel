"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHistory } from "@/contexts/HistoryContext";

export default function HistoryChart() {
  const { state } = useHistory();

  const chartData = state.history.map((entry) => ({
    id: entry.id.slice(0, 16),
    prediction: entry.prediction,
  }));

  return (
    <div
      className="h-64 bg-white 
       border-2 border-gray-200 rounded-md p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="prediction" fill="#FF7F7F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
