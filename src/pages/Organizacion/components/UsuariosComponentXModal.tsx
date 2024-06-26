import React from "react";
import "./UsuariosComponentXModalStyles.css";

const UsuariosComponentXModal = () => {
  return (
    <div className="UsuariosComponentXModal_container">
      <h1>Modal</h1>

      <div className="UsuariosComponentXModal_box">
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="email">
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="role">
            <label htmlFor="role">Rol</label>
            <select name="role" id="role">
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button className="button01">Invitar</button>
        </form>
      </div>
    </div>
  );
};

export default UsuariosComponentXModal;
