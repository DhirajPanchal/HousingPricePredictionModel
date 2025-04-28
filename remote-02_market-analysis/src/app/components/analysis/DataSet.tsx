"use client";

import HouseAttributesDataGrid from "@/components/analysis/HouseAttributesDataGrid";

export default function DataSet() {
  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:8004/api/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "properties.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Property Dataset
        </h2>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded shadow-sm transition-all duration-300 ease-in-out"
        >
          Export CSV
        </button>
      </div>

      {/* Data Grid */}
      <HouseAttributesDataGrid />
    </div>
  );
}
