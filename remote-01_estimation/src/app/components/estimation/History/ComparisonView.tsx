"use client";

import RatingStars from "@/components/common/RatingStars";
import { useHistory } from "@/contexts/HistoryContext";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function ComparisonView() {
  const { state, dispatch } = useHistory();
  const selectedItems = state.history.filter((entry: { id: any }) =>
    state.selected.includes(entry.id)
  );

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
    <div
      className="space-y-6 
      border-2 border-gray-200 rounded-md p-4 space-y-4    
    "
    >
      <h2 className="text-2xl text-gray-600 pl-2 pt-2">Compare Properties</h2>
      <div className="overflow-x-auto">
        <table
          className="min-w-full border-collapse 
                    border-2 border-gray-200 rounded-md"
        >
          <thead>
            <tr>
              <th className="bg-blue-100 p-3 border border-gray-200 font-bold"></th>
              {selectedItems.map(
                (
                  item: {
                    id: Key | null | undefined;
                    prediction: {
                      toLocaleString: () =>
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    };
                  },
                  index: number
                ) => (
                  <th
                    key={item.id}
                    className="bg-blue-100 p-3 border border-gray-200 font-bold"
                  >
                    ({index + 1})
                    <br />${item.prediction.toLocaleString()}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Sq. Ft:", key: "square_footage" },
              { label: "Bedrooms:", key: "bedrooms" },
              { label: "Bathrooms:", key: "bathrooms" },
              { label: "Year Built:", key: "year_built" },
              { label: "Lot Size:", key: "lot_size" },
              { label: "Distance:", key: "distance_to_city_center" },
              { label: "School Rating:", key: "school_rating" },
            ].map((row) => (
              <tr key={row.key} className="hover:bg-gray-100 transition-all">
                <td className="bg-gray-50 p-3 border border-gray-200 font-semibold">
                  {row.label}
                </td>
                {selectedItems.map(
                  (item: {
                    id: string;
                    formData: {
                      [x: string]:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      school_rating: number;
                    };
                  }) => (
                    <td
                      key={item.id + row.key}
                      className="p-3 border border-gray-200 text-center"
                    >
                      {row.key === "school_rating" ? (
                        <RatingStars rating={item.formData.school_rating} />
                      ) : (
                        item.formData[row.key as keyof typeof item.formData]
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* getStars(item.formData.school_rating) */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => dispatch({ type: "SWITCH_TO_HISTORY" })}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 
            px-6 py-2 
            rounded-none shadow 
            border-t border-l border-gray-100 
            border-b-2 border-r-2 border-gray-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}
