// src/api/requester.ts
import axios from "axios";

// Crear una instancia de axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Reemplaza esto con la URL base de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para manejar errores de respuesta
const handleResponseError = (error: any) => {
  // Puedes agregar lógica para manejar errores aquí
  console.error("API call error:", error);
  throw error;
};

export { apiClient, handleResponseError };
