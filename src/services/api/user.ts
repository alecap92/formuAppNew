import { handleResponseError } from "./requester";
import axiosConfig from "./axiosConfig";

// Función para registrar un nuevo usuario
export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axiosConfig.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const getUser = async () => {
  try {
    const response = await axiosConfig.get(`/users/`);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

// Función para realizar una solicitud de login
export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axiosConfig.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const validateTokenRequest = async (token: string) => {
  try {
    const response = await axiosConfig.get("/auth/verify", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
    return null; // Asegurarse de devolver null en caso de error
  }
};

export const updateUserFields = async (fields: any) => {
  try {
    const response = await axiosConfig.put(`/users/settings`, fields);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const updateUser = async (data: any) => {
  try {
    const response = await axiosConfig.put(`/users`, data);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const changePassword = async (data: any) => {
  try {
    const response = await axiosConfig.put(`/users/change-password`, data);
    return response;
  } catch (error) {
    handleResponseError(error);
  }
};

export const checkPlanStatus = async () => {
  try {
    const response = await axiosConfig.get("/users/plan-status");
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const getDocumentsUsage = async () => {
  try {
    const response = await axiosConfig.get("/users/documents-usage");
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};
