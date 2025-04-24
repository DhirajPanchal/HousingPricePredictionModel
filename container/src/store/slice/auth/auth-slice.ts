import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../model/auth.model";
import { userLogin, userProfile, userRegistration } from "./auth-async-thunks";

type AuthSliceType = {
  isAuthenticated: boolean;
  pricipal: IUser | null;
  isLoading: boolean;
  error: any;
};

const AuthSliceInitialState: AuthSliceType = {
  isAuthenticated: false,
  pricipal: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthSliceInitialState,
  reducers: {
    doLogout(state) {
      state.isAuthenticated = false;
      sessionStorage.removeItem("TOKEN");
    },
  },
  extraReducers(builder) {
    // Login
    builder.addCase(userLogin.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      sessionStorage.setItem("TOKEN", action.payload?.token);
      state.isLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Registration
    builder.addCase(userRegistration.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(userRegistration.fulfilled, (state, _action) => {
      state.isLoading = false;
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Profile
    builder.addCase(userProfile.pending, (state, _action) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pricipal = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default authSlice;

export const { doLogout } = authSlice.actions;
