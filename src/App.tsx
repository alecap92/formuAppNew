import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/routes";
import AlertContainer from "./components/Alert/AlertContainer";
import { useDispatch } from "react-redux";
import { validateSession } from "./contexts/features/authSlice";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  console.log(isAuthenticated);
  useEffect(() => {
    const validate = async () => {
      await dispatch(validateSession());
      setLoading(false);
    };

    validate();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o algún indicador de carga
  }

  return (
    <>
      <div className="App">
        <AppRoutes />
        <AlertContainer />
      </div>
    </>
  );
};

export default App;
