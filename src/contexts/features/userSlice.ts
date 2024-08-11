// src/features/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

const initialState: IUser = {
  _id: "",
  firstName: "",
  lastName: "",
  mobile: "",
  idType: "",
  idNumber: "",
  email: "",
  city: "",
  state: "",
  address: "",
  phone: "",
  settings: {},
  companyName: "",
  plan: {
    _id: "",
    name: "",
    monthlyDocuments: 0,
    templates: 0,
    price: 0,
  },
  documentsUsedThisMonth: 0,
  templatesUsed: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.mobile = action.payload.mobile;
      state.idType = action.payload.idType;
      state.idNumber = action.payload.idNumber;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.settings = action.payload.settings;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.phone = action.payload.phone;
      state.companyName = action.payload.companyName;
      state.plan = action.payload.plan;
      state.documentsUsedThisMonth = action.payload.documentsUsedThisMonth;
      state.templatesUsed = action.payload.templatesUsed;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
