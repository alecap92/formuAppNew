import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AlertComponent from "./AlertComponent";
import { RootState } from "../../contexts/store/Store";
import { removeAlert } from "../../contexts/features/alertSlice";

const AlertContainer: React.FC = () => {
  const alerts = useSelector((state: RootState) => state.alert.alerts);
  const dispatch = useDispatch();

  const handleRemoveAlert = (id: string) => {
    dispatch(removeAlert(id));
  };

  return (
    <div>
      {alerts.map((alert) => (
        <AlertComponent
          key={alert.id}
          id={alert.id}
          title={alert.type.toUpperCase()}
          description={alert.message}
          type={alert.type}
          onClose={handleRemoveAlert}
        />
      ))}
    </div>
  );
};

export default AlertContainer;
