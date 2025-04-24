import React, { useState } from "react";
import { appDispatch, useThunk } from "../store/hooks";
import { performPrediction, RootState } from "../store/store";
import BusySpinner from "../control/BusySpinner";
import { setCurrentPrediction } from "../store/slice/predictions/prediction-slice";
import { useSelector } from "react-redux";
import { IHouseInput, IPrediction } from "../model/property.model";

const defaultFormData: IHouseInput = {
  square_footage: 1200,
  bedrooms: 2,
  bathrooms: 2.5,
  year_built: 1990,
  lot_size: 2400,
  distance_to_city_center: 8,
  school_rating: 8,
  // ui_only_errors: [],
};

export default function HouseInputView() {
  const dispatch = appDispatch();

  const proPrice = useSelector(
    (state: RootState) => state.predictions.currentPredictionValue
  );

  const [doPrediction, isLoading, error] = useThunk(performPrediction);

  const [formData, setFormData] = useState<IHouseInput>(defaultFormData);

  const formSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData);
    const payload: IHouseInput = { ...formData };

    console.log("Payload : ", payload);

    updateCurrentPrediction(payload);
    const resultAction = await doPrediction(payload);
  };

  const isBathroomsValid = (value: number): boolean => {
    return value >= 1 && value % 0.5 === 0;
  };

  const updateValue = (key: string, value: any) => {
    //console.log(`--- ${key} :: ${value}`);
    let input: any = { ...formData };
    input[key] = value;

    setFormData(input);
  };

  const updateCurrentPrediction = (payload: IHouseInput) => {
    const prediction: IPrediction = { ...payload };
    dispatch(setCurrentPrediction(prediction));
  };

  return (
    <div className="font-[sans-serif]">
      <div className="mt-0 flex fle-col items-center justify-center py-0 px-0">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <form
            onSubmit={formSubmit}
            className="max-w-md md:ml-auto w-full bg-gray-200 p-4 border-r-8 "
          >
            <div className="space-x-6 flex justify-center">
              <h1 className="text-red-500 text-5xl font-bold mb-8">
                {proPrice}
              </h1>
            </div>
            <BusySpinner
              isLoading={isLoading}
              isError={error}
              className="float-right"
            />
            <h2 className="text-blue-900 text-3xl font-extrabold mb-8">
              Price Prediction
            </h2>

            <div className="space-y-4">
              <div>
                <input
                  name="square_footage"
                  type="numeric"
                  pattern="[0-9]*"
                  required
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900 h-12"
                  placeholder="Square Footage (e.g.1200)"
                  onChange={(e) =>
                    updateValue("square_footage", e.target.value)
                  }
                  // defaultValue={1200}
                />
              </div>

              <div>
                <input
                  name="bedrooms"
                  type="numeric"
                  pattern="[0-9]*"
                  required
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="Bedrooms  (e.g. 2)"
                  onChange={(e) => updateValue("bedrooms", e.target.value)}
                  // defaultValue={2}
                />
              </div>

              <div>
                <input
                  name="bathrooms"
                  type="numeric"
                  pattern="^\d+(\.\d+)?$"
                  required
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="Bathrooms (e.g. 1, 1.5, 2)"
                  onChange={(e) => updateValue("bathrooms", e.target.value)}
                  // defaultValue={2.5}
                />
              </div>

              <div>
                <input
                  name="year_built"
                  type="numeric"
                  pattern="^\d{4}$"
                  required
                  autoComplete="true"
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="Year Built  (e.g. 2030)"
                  onChange={(e) => updateValue("year_built", e.target.value)}
                  // defaultValue={1990}
                />
              </div>

              <div>
                <input
                  name="lot_size"
                  type="numeric"
                  pattern="[0-9]*"
                  required
                  autoComplete="true"
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="Lot Size (e.g. 1800)"
                  onChange={(e) => updateValue("lot_size", e.target.value)}
                  // defaultValue={2400}
                />
              </div>

              <div>
                <input
                  name="distance_to_city_center"
                  type="numeric"
                  pattern="^\d+(\.\d+)?$"
                  required
                  autoComplete="true"
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="Distance to city center  (e.g. 5.5)"
                  onChange={(e) =>
                    updateValue("distance_to_city_center", e.target.value)
                  }
                  // defaultValue={8.3}
                />
              </div>

              <div>
                <input
                  name="school_rating"
                  type="numeric"
                  pattern="^\d+(\.\d+)?$"
                  required
                  autoComplete="true"
                  className="bg-white w-full text-lg px-4 py-3.5 rounded-md outline-blue-900  h-12"
                  placeholder="School Rating  (1 to 10)"
                  onChange={(e) => updateValue("school_rating", e.target.value)}
                  // defaultValue={10}
                />
              </div>

              <div className="m-0 p-0">
                <p className="text-red-600 m-0 p-0 text-b">{error?.message}</p>
                {error?.errors?.map((errorLine: any, index: number) => (
                  <p key={index} className="text-red-600 m-0 p-0">
                    {errorLine}
                  </p>
                ))}
              </div>
            </div>

            <div className="!mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-900 hover:bg-blue-600 focus:outline-none disabled:bg-gray-500"
              >
                Predict
              </button>
            </div>
          </form>

          {/* <div className="bg-green-200">
            <ActiveDataGrid
              columns={DRUGLIST_COLUMNS}
              listResponse={historyList}
              triggerRefresh={(payload) => loadDrugs(payload)}
            ></ActiveDataGrid>
          </div> */}
        </div>
      </div>
    </div>
  );
}
