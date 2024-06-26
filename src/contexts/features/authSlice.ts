import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../contexts/store/Store";
import {
  loginRequest,
  registerUser,
  validateTokenRequest,
} from "../../services/api";
import Cookies from "js-cookie";
import { auth, googleProvider } from "../../services/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

interface ApiUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  document: string;
  document_type: string;
  phone: string;
  birth_date: string | null;
  document_expedition_date: string | null;
  token: string;
}

interface AuthState {
  user: ApiUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ApiUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const loginWithEmail =
  (email: string, password: string, remember: boolean): any =>
  async (dispatch: AppDispatch) => {
    const data = await loginRequest(email, password);
    if (data) {
      const userData: ApiUser = {
        id: data._id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        document: data.document,
        document_type: data.document_type,
        phone: data.phone,
        birth_date: data.birth_date,
        document_expedition_date: data.document_expedition_date,
        token: data.token,
      };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      if (remember) {
        Cookies.set("authorization", data.token, { expires: 7 });
      } else {
        Cookies.set("authorization", data.token);
      }
    }
  };

export const registerWithEmail =
  (email: string, password: string, firstName: string, lastName: string): any =>
  async (dispatch: AppDispatch) => {
    const data = await registerUser(email, password, firstName, lastName);
    if (data) {
      const userData: ApiUser = {
        id: data._id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        document: data.document,
        document_type: data.document_type,
        phone: data.phone,
        birth_date: data.birth_date,
        document_expedition_date: data.document_expedition_date,
        token: data.token,
      };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      Cookies.set("authorization", data.token, { expires: 7 });
    }
  };

export const validateSession = (): any => async (dispatch: AppDispatch) => {
  const token = Cookies.get("authorization");
  console.log(token);
  if (token) {
    try {
      const data = await validateTokenRequest(token);
      console.log(data);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as ApiUser;
        parsedUser.token = token;
        dispatch(setUser(parsedUser));
      }
    } catch (error) {
      console.error("Error validating token:", error);
      dispatch(clearUser());
    }
  }
};

export const registerOrLoginWithGoogle =
  (): any => async (dispatch: AppDispatch) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user;
      const token = await user.getIdToken();
      const userData: ApiUser = {
        id: user.uid,
        email: user.email || "",
        first_name: user.displayName || "",
        last_name: "",
        document: "",
        document_type: "",
        phone: "",
        birth_date: null,
        document_expedition_date: null,
        token: token,
      };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      Cookies.set("authorization", token, { expires: 7 });
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

export const logout = (): any => async (dispatch: AppDispatch) => {
  dispatch(clearUser());
  localStorage.removeItem("user");
  Cookies.remove("authorization");
};

export default authSlice.reducer;
