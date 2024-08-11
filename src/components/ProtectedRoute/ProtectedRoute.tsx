import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../contexts/store/Store";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isSessionValidated = useSelector(
    (state: RootState) => state.auth.isSessionValidated
  );

  useEffect(() => {
    if (!isSessionValidated && !isAuthenticated) {
      // Lógica que maneja lo que sucede cuando la sesión no es válida
      <Navigate to="/login" />;
    }
  }, [isAuthenticated, isSessionValidated]);

  if (!isSessionValidated) {
    return null; // No mostramos nada mientras se valida la sesión
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
