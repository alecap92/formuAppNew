import React, { useState } from "react";
import "./SeguridadComponentStyles.css";
import { changePassword } from "../../../services/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../contexts/features/loadingSlice";
import { addAlert } from "../../../contexts/features/alertSlice";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SeguridadComponent = () => {
  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      dispatch(
        addAlert({
          message: "Las contraseñas no coinciden",
          type: "error",
          id: Date.now().toLocaleString(),
        })
      );
      return;
    }
    try {
      dispatch(setLoading(true));
      await changePassword(form);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      dispatch(setLoading(false));
      dispatch(
        addAlert({
          message: "Contraseña cambiada correctamente",
          type: "success",
          id: Date.now().toLocaleString(),
        })
      );
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(
        addAlert({
          message: error.response.data.message,
          type: "error",
          id: Date.now().toLocaleString(),
        })
      );
      return null; // Asegurarse de devolver null en caso de error
    }
  };

  return (
    <div className="SeguridadComponent_container">
      <h3>Cambia tu contraseña</h3>
      <form
        action=""
        className="SeguridadComponent_form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="password">Contraseña actual</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
            value={form.currentPassword}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Nueva contraseña</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            value={form.newPassword}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirma tu nueva contraseña</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            value={form.confirmPassword}
          />
        </div>
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default SeguridadComponent;
