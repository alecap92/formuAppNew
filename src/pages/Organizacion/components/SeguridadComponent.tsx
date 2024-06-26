import React from "react";
import "./SeguridadComponentStyles.css";

const SeguridadComponent = () => {
  return (
    <div className="SeguridadComponent_container">
      <h3>Cambia tu contraseña</h3>
      <form action="" className="SeguridadComponent_form">
        <div className="form-group">
          <label htmlFor="password">Contraseña actual</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Nueva contraseña</label>
          <input type="password" id="new-password" name="new-password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirma tu nueva contraseña</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
        </div>
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default SeguridadComponent;
