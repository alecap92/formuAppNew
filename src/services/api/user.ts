// src/api/user.ts
import { apiClient, handleResponseError } from "./requester";

// Función para registrar un nuevo usuario
export const registerUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  try {
    const response = await apiClient.post("/user/new", {
      email,
      password,
      first_name,
      last_name,
    });
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

// Función para realizar una solicitud de login
export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
};

export const validateTokenRequest = async (token: string) => {
  console.log(token, 1);
  try {
    const response = await apiClient.get("/user/me", {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud", error);
  }
};
