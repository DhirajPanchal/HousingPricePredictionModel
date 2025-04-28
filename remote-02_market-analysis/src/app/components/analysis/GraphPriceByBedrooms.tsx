"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import GraphCard from "@/components/analysis/GraphCard";

interface PriceByBedrooms {
  bedrooms: number;
  avgPrice: number;
}

// Example color palette (different good shades)
//const COLORS = ["#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"];
const COLORS = [
  "#60a5fa",
  "#2563eb",
  "#1e40af",
  "#60a5fa",
  "#2563eb",
  "#1e40af",
];
export default function GraphPriceByBedrooms() {
  const [data, setData] = useState<PriceByBedrooms[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8004/api/graph-price-bedrooms")
      .then((res) => res.json())
      .then((data: PriceByBedrooms[]) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, []);

  return (
    <GraphCard title="Price by Bedrooms" loading={loading}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bedrooms" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => {
              return Number(Math.round(value)).toLocaleString("en-US");
            }}
          />
          <Bar dataKey="avgPrice" animationDuration={1000}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GraphCard>
  );
}
