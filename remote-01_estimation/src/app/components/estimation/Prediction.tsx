"use client";

import HousingPriceForm from "./HousingPriceForm";
import History from "./History/History";
import { HistoryProvider, useHistory } from "@/contexts/HistoryContext";

export default function Prediction() {
  return (
    <HistoryProvider>
      <>
        {/* <h1 className="text-2xl font-bold text-gray-600 pl-6 ">
          Property Value Estimator
        </h1> */}
        <div className="flex flex-col md:flex-row gap-8 p-4">
          <div className="md:w-1/2">
            <HousingPriceForm />
          </div>
          <div className="md:w-1/2">
            <History />
          </div>
        </div>
      </>
      {/* <CommonToast /> */}
    </HistoryProvider>
  );
}
