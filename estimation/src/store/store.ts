import { configureStore } from "@reduxjs/toolkit";
import drugsSlice from "./slice/drugs/drugs-slice";
import predictionSlice from "./slice/predictions/prediction-slice";

export const appStore = configureStore({
  reducer: {
    drugs: drugsSlice.reducer,
    predictions: predictionSlice.reducer,
  },
});

export * from "./slice/drugs/drugs-async-thunks";
export * from "./slice/predictions/prediction-async-thunks";

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
