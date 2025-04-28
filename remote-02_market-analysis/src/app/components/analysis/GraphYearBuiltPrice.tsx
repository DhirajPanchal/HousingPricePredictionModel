"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import GraphCard from "@/components/analysis/GraphCard";

interface YearBuiltPrice {
  yearBuilt: number;
  avgPrice: number;
}

export default function GraphYearBuiltPrice() {
  const [data, setData] = useState<YearBuiltPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8004/api/graph-year-build-price")
      .then((res) => res.json())
      .then((data: YearBuiltPrice[]) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, []);

  return (
    <GraphCard title="Year Built vs Price" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="yearBuilt" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avgPrice"
            stroke="#6366f1" // Softer professional blue-purple
            strokeWidth={3} // Thicker line
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </GraphCard>
  );
}
