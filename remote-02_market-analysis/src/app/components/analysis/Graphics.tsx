"use client";

import GraphPriceByBedrooms from "@/components/analysis/GraphPriceByBedrooms";
import GraphYearBuiltPrice from "@/components/analysis/GraphYearBuiltPrice";

export default function Graphics() {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GraphPriceByBedrooms />

        <GraphYearBuiltPrice />
      </div>
    </div>
  );
}
