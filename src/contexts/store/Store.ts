// src/contexts/store/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import alertSlice from "../features/alertSlice";
import userSlice from "../features/userSlice";
import loadingSlice from "../features/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    user: userSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
