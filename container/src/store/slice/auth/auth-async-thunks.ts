import { createAsyncThunk } from "@reduxjs/toolkit";
import ExternalInterface from "../../../service/ExternalInterface";
import { ILogin, IRegistration } from "../../../model/auth.model";

const userLogin: any = createAsyncThunk(
  "auth/login",
  async (payload: ILogin, thunkApi) => {
    try {
      const data = await ExternalInterface.userLogin(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

const userRegistration: any = createAsyncThunk(
  "auth/registration",
  async (payload: IRegistration, thunkApi) => {
    try {
      const data = await ExternalInterface.userRegistration(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

const userProfile: any = createAsyncThunk("user/profile", async () => {
  try {
    const data = await ExternalInterface.userProfile();
    return data;
  } catch (error: any) {
    return error;
  }
});

export { userLogin, userRegistration, userProfile };
