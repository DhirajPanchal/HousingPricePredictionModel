"use client";

import RatingStars from "@/components/common/RatingStars";
import { useHistory } from "@/contexts/HistoryContext";

export default function HistoryTable() {
  const { state, dispatch } = useHistory();

  const handleCheckboxChange = (id: string) => {
    dispatch({ type: "TOGGLE_SELECT", payload: id });
  };

  const handleCompare = () => {
    dispatch({ type: "SWITCH_TO_COMPARISON" });
  };

  const getStars = (rating: number) => {
    const normalizedRating = rating / 2; // normalize 0–10 scale to 0–5
    const fullStars = Math.floor(normalizedRating);
    const halfStar = normalizedRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex justify-center items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="#facc15"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {halfStar === 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#facc15"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M22 9.24l-7.19-.62L12 2v15.27l6.18 3.73-1.64-7.03L22 9.24z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full bg-white 
        border-l border-gray-200 rounded-md"
      >
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border border-gray-300"></th>
            <th className="p-2 border border-gray-300">Sq. Ft</th>
            <th className="p-2 border border-gray-300">Bedrooms</th>
            <th className="p-2 border border-gray-300">Bathrooms</th>
            <th className="p-2 border border-gray-300">Year Built</th>
            <th className="p-2 border border-gray-300">School Rating</th>
            <th className="p-2 border border-gray-300">Prediction ($)</th>
          </tr>
        </thead>
        <tbody>
          {state.history.map((entry, index) => (
            <tr
              key={entry.id}
              className={`
              ${index === 0 ? "bg-red-100 font-semibold" : ""}
              hover:bg-gray-50
            `}
            >
              <td className="p-2 border border-gray-300 text-center">
                <input
                  type="checkbox"
                  checked={state.selected.includes(entry.id)}
                  onChange={() => handleCheckboxChange(entry.id)}
                />
              </td>
              <td className="p-2 border border-gray-300">
                {entry.formData.square_footage}
              </td>
              <td className="p-2 border border-gray-300">
                {entry.formData.bedrooms}
              </td>
              <td className="p-2 border border-gray-300">
                {entry.formData.bathrooms}
              </td>
              <td className="p-2 border border-gray-300">
                {entry.formData.year_built}
              </td>
              <td className="p-2 border border-gray-300">
                {/* {getStars(entry.formData.school_rating)} */}
                <RatingStars rating={entry.formData.school_rating} />
              </td>
              <td className="p-2 border border-gray-300">
                $ {entry.prediction.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Compare Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCompare}
          disabled={state.selected.length < 2 || state.selected.length > 5}
          className="bg-gray-200 hover:bg-gray-300  px-6 py-2 
            border-t border-l border-gray-200 
            border-b-2 border-r-2 border-gray-200 
            rounded-none shadow disabled:opacity-50"
        >
          Compare Selected ({state.selected.length})
        </button>
      </div>
    </div>
  );
}
