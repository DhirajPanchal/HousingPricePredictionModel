"use client";

import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

type Filters = {
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  lotSize: number;
  distanceToCityCenter: number;
  schoolRating: number;
};

export default function InteractiveForm() {
  const [filters, setFilters] = useState<Filters>({
    squareFootage: 2000,
    bedrooms: 3,
    bathrooms: 2.5,
    yearBuilt: 2000,
    lotSize: 4000,
    distanceToCityCenter: 10,
    schoolRating: 5,
  });

  const [prediction, setPrediction] = useState<number>(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const callPredictAPI = async (payload: Filters) => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        "http://localhost:8004/api/predict-property-price",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Server responded with error");
      }

      const data: number[] = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setPrediction(data[0]);
      } else {
        setPrediction(0.0);
      }
    } catch (err) {
      console.error("Prediction API failed", err);
      setError(true);
      setPrediction(0.0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callPredictAPI(filters);
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      squareFootage: 2000,
      bedrooms: 3,
      bathrooms: 2.5,
      yearBuilt: 2000,
      lotSize: 4000,
      distanceToCityCenter: 10,
      schoolRating: 5,
    });
  };

  const handleChange = (field: keyof typeof filters, value: number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-blue-100 border border-blue-200 rounded-md p-6 flex flex-col space-y-6 mt-2">
      {/* Top Bar: Title + Spinner */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Estimation</h2>
        <ArrowPathIcon
          className={`w-6 h-6 transition-all ${
            loading
              ? "animate-spin text-gray-700"
              : error
              ? "text-red-600"
              : "text-gray-400"
          }`}
        />
      </div>

      {/* Prediction */}
      <div className="font-bold text-2xl text-center bg-red-600 text-white py-2 rounded-md">
        ${Math.round(prediction).toLocaleString("en-US")}
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4">
        {/* Bedrooms Dropdown */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleChange("bedrooms", parseInt(e.target.value))}
            className="block w-full p-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {[2, 3, 4, 5].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Sliders */}
        {[
          { label: "Year Built", field: "yearBuilt", min: 1950, max: 2025 },
          { label: "School Rating", field: "schoolRating", min: 0, max: 10 },
          {
            label: "Distance to City Center",
            field: "distanceToCityCenter",
            min: 0,
            max: 50,
          },
          { label: "Lot Size", field: "lotSize", min: 1000, max: 10000 },
          {
            label: "Square Footage",
            field: "squareFootage",
            min: 500,
            max: 5000,
          },
          { label: "Bathrooms", field: "bathrooms", min: 1, max: 5 },
        ].map((slider) => (
          <div key={slider.field}>
            <label className="text-sm text-gray-500 mb-1 block">
              {slider.label}
            </label>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step="1"
              value={filters[slider.field as keyof typeof filters]}
              onChange={(e) =>
                handleChange(
                  slider.field as keyof typeof filters,
                  Number(e.target.value)
                )
              }
              className="w-full"
            />
            <div className="text-xs text-gray-600">
              {filters[slider.field as keyof typeof filters]}
            </div>
          </div>
        ))}

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-2 px-4 rounded-md transition-all duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
