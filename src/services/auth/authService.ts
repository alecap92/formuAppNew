import { AppDispatch } from "../../contexts/store/Store";
import {
  loginRequest,
  registerUser,
  validateTokenRequest,
} from "../../services/api";
import { auth, googleProvider } from "../../services/firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../../types/types";
import { setUser } from "../../contexts/features/userSlice";
import { setLoading } from "../../contexts/features/loadingSlice";
import {
  setAuthenticated,
  setRemember,
  setSessionValidated,
} from "../../contexts/features/authSlice";

export const loginWithEmail =
  (email: string, password: string, remember: boolean): any =>
  async (dispatch: AppDispatch) => {
    const { refreshToken, token, user } = await loginRequest(email, password);

    if (user && token) {
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
      dispatch(setRemember(remember));
      dispatch(setLoading(false));

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refreshToken", refreshToken);
      }
    }
  };

export const registerWithEmail =
  (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    remember: boolean
  ): any =>
  async (dispatch: AppDispatch) => {
    const data = await registerUser(email, password, firstName, lastName);
    if (data) {
      const userData: IUser = {
        _id: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        idType: data.idType,
        idNumber: data.idNumber,
        mobile: data.mobile,
        address: data.address,
        settings: data.settings,
        phone: data.phone,
        city: data.city,
        state: data.state,
        companyName: data.companyName,
        plan: data.plan,
        templatesUsed: data.templatesUsed,
        documentsUsedThisMonth: data.documentsUsedThisMonth,
      };
      dispatch(setUser(userData));
      dispatch(setAuthenticated(true));
      dispatch(setRemember(remember));
      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
    }
  };

export const validateSession =
  (navigate: NavigateFunction): any =>
  async (dispatch: AppDispatch) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      try {
        const data = await validateTokenRequest(token);

        if (!data) {
          throw new Error("Token inválido");
        }

        const user = { ...data, token };
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
      } catch (error) {
        console.error("Error validating token:", error);
        logoutHandler();
        navigate("/login");
      }
    } else {
      logoutHandler();
      navigate("/login");
    }

    dispatch(setSessionValidated(true));
  };

export const registerOrLoginWithGoogle =
  (): any => async (dispatch: AppDispatch) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user: any = result.user;
      const token = await user.getIdToken();
      const userData = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        idType: user.idType,
        idNumber: user.idNumber,
        mobile: user.mobile,
        address: user.address,
        settings: user.settings,
        phone: user.phone,
        city: user.city,
        state: user.state,
        companyName: user.companyName,
        plan: user.plan,
        templatesUsed: user.templatesUsed,
        documentsUsedThisMonth: user.documentsUsedThisMonth,
      };
      dispatch(setUser(userData));
      dispatch(setAuthenticated(true));
      localStorage.setItem("token", token); // Aquí puedes decidir si guardar en localStorage o sessionStorage según la preferencia del usuario
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

export const logoutHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
};
