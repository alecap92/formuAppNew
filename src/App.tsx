import React, { useEffect } from "react";
import AppRoutes from "./routes/routes";
import AlertContainer from "./components/Alert/AlertContainer";
import { useDispatch } from "react-redux";
import { validateSession } from "./contexts/features/authSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateSession());
  }, [dispatch]);

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
