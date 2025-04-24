import { configureStore } from "@reduxjs/toolkit";
import authSlise from "./slice/auth/auth-slice";

export const appStore = configureStore({
  reducer: {
    auth: authSlise.reducer,
  },
});

export * from "./slice/auth/auth-async-thunks";

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;
