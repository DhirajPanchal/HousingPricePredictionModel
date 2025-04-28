// 'use client';

import InteractiveForm from "@/components/analysis/InteractiveForm";
import Summary from "@/components/analysis/Summary";
import Graphics from "@/components/analysis/Graphics";
import DataSet from "@/components/analysis/DataSet";

export default function MarketAnalysis() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 border-gray-300 p-4 ml-6">
        <InteractiveForm />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto space-y-6">
        {/* Summary Cards */}
        <Summary />

        {/* Graphs Section */}
        <Graphics />

        {/* Property DataSet Table */}
        <DataSet />
      </div>
    </div>
  );
}
