import RatingStars from "@/components/common/RatingStars";

interface SummaryData {
  avg_price: number;
  median_sqft: number;
  price_range_min: number;
  price_range_max: number;
  avg_school_rating: number;
}

async function getSummaryData(): Promise<SummaryData> {
  const res = await fetch("http://localhost:8004/api/market-summary", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch market summary");
  }

  return res.json();
}

export default async function Summary() {
  const summary = await getSummaryData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Avg Price */}
      <div className="border border-gray-200 bg-white rounded-md p-4 flex flex-col items-center justify-center ">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          Avg Price
        </div>
        <div className="text-xl font-bold text-gray-800">
          ${summary.avg_price.toLocaleString("en-US")}
        </div>
      </div>

      {/* Median Sqft */}
      <div className="border border-gray-200 bg-white rounded-md p-4 flex flex-col items-center justify-center">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          Median Sqft
        </div>
        <div className="text-xl font-bold text-gray-800">
          {summary.median_sqft.toLocaleString("en-US")} Sqft
        </div>
      </div>

      {/* Price Range */}
      <div className="border border-gray-200 bg-white rounded-md p-4 flex flex-col items-center justify-center">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          Price Range
        </div>
        <div className="text-sm font-semibold text-gray-700">
          ${summary.price_range_min.toLocaleString("en-US")} - $
          {summary.price_range_max.toLocaleString("en-US")}
        </div>
      </div>

      {/* Avg School Rating */}
      <div className="border border-gray-200 bg-white rounded-md p-4 flex flex-col items-center justify-center">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          Avg School Rating
        </div>
        <RatingStars rating={summary.avg_school_rating} />
      </div>
    </div>
  );
}
