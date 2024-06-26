// src/contexts/store/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import alertSlice from "../features/alertSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
