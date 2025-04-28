"use client";

import { StarIcon } from "@heroicons/react/24/solid";

type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  //console.log(" RatingStars : " + rating);

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
}
