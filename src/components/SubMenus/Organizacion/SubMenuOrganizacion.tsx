import React from "react";
import "./SubMenuOrganizacionStyles.css";
import { FaPlus } from "react-icons/fa";
import { SubmenuType } from "../../../pages/Organizacion/Organizacion";

interface SubMenuOrganizacionProps {
  submenu: SubmenuType;
  setSubmenu: React.Dispatch<React.SetStateAction<SubmenuType>>;
}

const SubMenuOrganizacion: React.FC<SubMenuOrganizacionProps> = ({
  submenu,
  setSubmenu,
}) => {
  return (
    <div className="subMenuContainer">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Mi Organizacion</h1>
        <button type="button" className="subMenuContainerButton">
          <FaPlus /> Crear Documento
        </button>
      </div>
      <div className="subMenuList">
        <ul>
          <li
            onClick={() => setSubmenu("inicio")}
            className={submenu === "inicio" ? "active" : ""}
          >
            Inicio
          </li>
          <li
            onClick={() => setSubmenu("usuarios")}
            className={submenu === "usuarios" ? "active" : ""}
          >
            Usuarios
          </li>
          <li
            onClick={() => setSubmenu("suscripcion")}
            className={submenu === "suscripcion" ? "active" : ""}
          >
            Suscripcion
          </li>
          <li
            onClick={() => setSubmenu("pagos")}
            className={submenu === "pagos" ? "active" : ""}
          >
            Pagos
          </li>
          <li
            onClick={() => setSubmenu("perfil")}
            className={submenu === "perfil" ? "active" : ""}
          >
            Perfil
          </li>
          <li
            onClick={() => setSubmenu("seguridad")}
            className={submenu === "seguridad" ? "active" : ""}
          >
            Seguridad
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubMenuOrganizacion;
