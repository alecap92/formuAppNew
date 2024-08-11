// src/routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Organizacion from "../pages/Organizacion/Organizacion";
import Historial from "../pages/Historial/Historial";
import ConexionApi from "../pages/ConexionApi/ConexionApi";
import Personalizados from "../pages/Personalizados/Personalizados";
import Formatos from "../pages/Formatos/Formatos";
import Contactos from "../pages/Contactos/Contactos";
import CamposDeFormularios from "../pages/CamposDeFormularios/CamposDeFormularios";
import Stepper from "../pages/Stepper/Stepper";
import ListasDeContactos from "../pages/ListasDeContactos/ListasDeContactos";
import PerfilPage from "../pages/Perfil/PerfilPage";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<Organizacion />} />}
        />
        <Route
          path="/historial"
          element={<ProtectedRoute element={<Historial />} />}
        />
        <Route
          path="/conexion-api"
          element={<ProtectedRoute element={<ConexionApi />} />}
        />
        <Route
          path="/personalizados"
          element={<ProtectedRoute element={<Personalizados />} />}
        />
        <Route
          path="/formatos"
          element={<ProtectedRoute element={<Formatos />} />}
        />
        <Route
          path="/formatos/:id"
          element={<ProtectedRoute element={<Stepper />} />}
        />
        <Route
          path="/contactos"
          element={<ProtectedRoute element={<Contactos />} />}
        />
        <Route
          path="/contactos/listas"
          element={<ProtectedRoute element={<ListasDeContactos />} />}
        />

        <Route
          path="/campos-de-formularios"
          element={<ProtectedRoute element={<CamposDeFormularios />} />}
        />
        <Route
          path="/perfil"
          element={<ProtectedRoute element={<PerfilPage />} />}
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
