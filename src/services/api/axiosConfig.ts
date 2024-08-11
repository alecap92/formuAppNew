import axios from "axios";

// Crear una instancia de axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleResponseError(error);
    return Promise.reject(error);
  }
);

// Función para manejar errores de respuesta
export const handleResponseError = (error: any) => {
  // Puedes agregar lógica para manejar errores aquí
  console.error("API call error:", error);
  throw error;
};

export default apiClient;
