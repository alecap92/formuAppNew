// src/routes.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/organizacion"
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
        <Route path="/formatos/:id" element={<Stepper />} />
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

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
