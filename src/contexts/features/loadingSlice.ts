import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Loading {
  isLoading: boolean;
}

const initialState: Loading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
