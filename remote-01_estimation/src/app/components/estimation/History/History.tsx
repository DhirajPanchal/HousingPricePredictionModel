"use client";

import { useHistory } from "@/contexts/HistoryContext";
import HistoryTable from "./HistoryTable";
import HistoryChart from "./HistoryChart";
import ComparisonView from "./ComparisonView";

import { ChartBarIcon, TableCellsIcon } from "@heroicons/react/24/solid";

export default function History() {
  const { state, dispatch } = useHistory();

  if (state.view === "comparison") {
    return <ComparisonView />;
  }

  const switchTo = (view: "table" | "chart") => {
    dispatch({ type: "SWITCH_HISTORY_VIEW", payload: view });
  };

  return (
    <div
      className="bg-white 
      border-2 border-gray-200 rounded-md p-4 space-y-4"
    >
      {/* Top Bar: Title + Switch Buttons */}
      <div className="flex items-center justify-between mb-4">
        {/* Title Left */}
        <h2 className="text-2xl text-gray-600 pl-2">Previous Estimates</h2>

        {/* Two Switch Buttons */}
        <div className="flex space-x-2">
          {/* Table Button */}
          <button
            onClick={() => switchTo("table")}
            className={`p-2 
            border-t border-l border-gray-200 
            border-b-2 border-gray-400"
            ${
              state.historyView === "table"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            } 
            rounded-none shadow hover:bg-red-500 transition`}
            title="Table View"
          >
            <TableCellsIcon className="w-6 h-6" />
          </button>

          {/* Chart Button */}
          <button
            onClick={() => switchTo("chart")}
            className={`p-2 
            border-t border-gray-200 
            border-b-2 border-r-2 border-gray-400"
            ${
              state.historyView === "chart"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700"
            } 
            rounded-none shadow hover:bg-red-500 transition`}
            title="Chart View"
          >
            <ChartBarIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Content View */}
      {state.historyView === "table" ? <HistoryTable /> : <HistoryChart />}
    </div>
  );
}
