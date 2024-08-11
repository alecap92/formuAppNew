import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  remember: boolean;
  isSessionValidated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  remember: false,
  isSessionValidated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
    },
    setSessionValidated: (state, action: PayloadAction<boolean>) => {
      state.isSessionValidated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isSessionValidated = false;
      state.remember = false;
    },
  },
});

export const { setAuthenticated, setRemember, setSessionValidated, logout } =
  authSlice.actions;

export default authSlice.reducer;
