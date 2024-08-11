import React, { useEffect } from "react";
import AppRoutes from "./routes/routes";
import AlertContainer from "./components/Alert/AlertContainer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import Loading from "./components/Loading/Loading";
import { setLoading } from "./contexts/features/loadingSlice";
import { validateSession } from "./services/auth/authService";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa useNavigate para redirigir

  const isLoading = useSelector((state: any) => state.loading.isLoading);

  useEffect(() => {
    const validate = async () => {
      dispatch(setLoading(true));
      await dispatch(validateSession(navigate));
      dispatch(setLoading(false));
    };

    validate();
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <AppRoutes />
      <AlertContainer />
      {isLoading && <Loading />}
    </div>
  );
};

export default App;
