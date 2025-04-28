"use client";

import { useState } from "react";
import { useHistory } from "@/contexts/HistoryContext";

export default function HousingPriceForm() {
  const { dispatch } = useHistory();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    square_footage: "",
    bedrooms: "",
    bathrooms: "",
    year_built: "",
    lot_size: "",
    distance_to_city_center: "",
    school_rating: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateTimestampId = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!Number.isInteger(Number(formData.square_footage))) {
      newErrors.square_footage = "Square footage must be an integer";
    }
    if (!Number.isInteger(Number(formData.bedrooms))) {
      newErrors.bedrooms = "Bedrooms must be an integer";
    }
    if (!Number.isInteger(Number(formData.lot_size))) {
      newErrors.lot_size = "Lot size must be an integer";
    }
    const bathrooms = Number(formData.bathrooms);
    if (!(bathrooms >= 1 && bathrooms % 0.5 === 0)) {
      newErrors.bathrooms = "Bathrooms must be >= 1 and multiple of 0.5";
    }
    const year = Number(formData.year_built);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      newErrors.year_built = "Year built must be a valid year";
    }
    const distance = Number(formData.distance_to_city_center);
    if (isNaN(distance) || distance < 0) {
      newErrors.distance_to_city_center = "Distance must be >= 0";
    }
    const rating = Number(formData.school_rating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      newErrors.school_rating = "School rating must be between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      square_footage: "",
      bedrooms: "",
      bathrooms: "",
      year_built: "",
      lot_size: "",
      distance_to_city_center: "",
      school_rating: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SHOW_TOAST",
      payload: { type: "loading", message: "Predicting..." },
    });

    try {
      const res = await fetch("http://localhost:8005/predict-property-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          square_footage: Number(formData.square_footage),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          year_built: Number(formData.year_built),
          lot_size: Number(formData.lot_size),
          distance_to_city_center: Number(formData.distance_to_city_center),
          school_rating: Number(formData.school_rating),
        }),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }

      const data = await res.json();
      if (data?.predictions?.length > 0) {
        const p = data.predictions[0];
        setPrediction(p);
        dispatch({
          type: "ADD_HISTORY",
          payload: {
            id: generateTimestampId(),
            formData: {
              square_footage: Number(formData.square_footage),
              bedrooms: Number(formData.bedrooms),
              bathrooms: Number(formData.bathrooms),
              year_built: Number(formData.year_built),
              lot_size: Number(formData.lot_size),
              distance_to_city_center: Number(formData.distance_to_city_center),
              school_rating: Number(formData.school_rating),
            },
            prediction: p,
          },
        });

        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "success", message: "Prediction successful!" },
        });
        handleReset();
      } else {
        throw new Error("Invalid prediction response");
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "error",
          message: "Prediction failed. Please try again.",
        },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-md p-6">
      <div className="mt-6 text-center bg-red-600 rounded-md">
        <h2 className="text-2xl font-bold text-white m-12 p-4">
          Estimated Price: $ {prediction}
        </h2>
      </div>

      <h2 className="text-2xl mb-6 text-gray-600">Estimate Housing Price</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { name: "square_footage", label: "Square Footage" },
          { name: "bedrooms", label: "Bedrooms" },
          { name: "bathrooms", label: "Bathrooms" },
          { name: "year_built", label: "Year Built" },
          { name: "lot_size", label: "Lot Size" },
          { name: "distance_to_city_center", label: "Distance to City Center" },
          { name: "school_rating", label: "School Rating" },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              id={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="block w-full 
              border-1 border-gray-200
              p-2 rounded-md
              shadow-sm focus:ring-red-500 focus:border-red-500"
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* Submit and Reset buttons */}
        <div className="flex space-x-4 col-span-full justify-end mt-4">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md text-sm transition-all"
          >
            Estimate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md text-sm transition-all"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
