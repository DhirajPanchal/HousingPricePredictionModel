import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { performPrediction } from "./prediction-async-thunks";
import { IPrediction } from "../../../model/property.model";

type PredictionsType = {
  currentPrediction: IPrediction | null;
  currentPredictionValue: string;
  previous: IPrediction[];
  isLoading: boolean;
  error: any;
};

const predictionSliceInitialState: PredictionsType = {
  currentPrediction: null,
  currentPredictionValue: "$0.0",
  previous: [],
  isLoading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState: predictionSliceInitialState,
  reducers: {
    setCurrentPrediction(state, action: PayloadAction<IPrediction>) {
      console.log("------------------------1");
      console.log(action.payload);

      state.currentPrediction = action.payload;
    },
  },
  extraReducers(builder) {
    // Login
    // Registration
    builder.addCase(performPrediction.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(performPrediction.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      const price: number = action.payload?.predictions[0];
      state.currentPredictionValue = "$" + price;
      console.log("------------------------2");
      console.log(state.currentPrediction);
      if (state.currentPrediction) {
        console.log("AAA");
        state.currentPrediction.price = price;
        state.currentPrediction.id = crypto.randomUUID();
        state.previous = [...state.previous, state.currentPrediction];
      } else {
        console.log("BBB");
      }
      //state.currentPrediction = action.payload
    });
    builder.addCase(performPrediction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setCurrentPrediction } = predictionSlice.actions;

export default predictionSlice;
