import { createAsyncThunk } from "@reduxjs/toolkit";
import ExternalInterface from "../../../service/ExternalInterface";

const performPrediction: any = createAsyncThunk(
  "prediction/performPrediction",
  async (payload: IHouseInput, thunkApi) => {
    try {
      const data = await ExternalInterface.performPrediction(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export { performPrediction };
