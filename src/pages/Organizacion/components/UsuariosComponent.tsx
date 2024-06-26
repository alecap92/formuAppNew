import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./UsuariosComponentStyles.css";
import UsuariosComponentXModal from "./UsuariosComponentXModal";

const UsuariosComponent = () => {
  const [inviteUserModal, setInviteUserModal] = useState(false);

  return (
    <div className="UsuariosComponent_container">
      <button
        className="UsuariosComponent_button"
        onClick={() => setInviteUserModal(true)}
      >
        <FaPlus /> Invitar nuevo usuario
      </button>
      <div style={{ width: "100%" }}>
        <table className="UsuariosComponent_table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alejandro Cabrejo Porras</td>
              <td>alejandro.cabrejo@gmail.com</td>
              <td>20 jun 2024 22:30pm</td>
              <td>Administrador</td>
            </tr>
          </tbody>
        </table>
      </div>

      {inviteUserModal && <UsuariosComponentXModal />}
    </div>
  );
};

export default UsuariosComponent;
