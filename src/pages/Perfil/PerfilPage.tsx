import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus } from "react-icons/fa";
import "../../components/SubMenus/Organizacion/SubMenuOrganizacionStyles.css";
import PagosComponent from "../Organizacion/components/PagosComponent";
import PerfilComponent from "../Organizacion/components/PerfilComponent";
import SeguridadComponent from "../Organizacion/components/SeguridadComponent";

export type SubmenuType =
  | "inicio"
  | "usuarios"
  | "suscripcion"
  | "pagos"
  | "perfil"
  | "seguridad";

const PerfilPage = () => {
  const [submenu, setSubmenu] = useState<SubmenuType>("perfil");
  return (
    <div>
      <MainLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "40px 30px",
          }}
        >
          <h1>Mi Cuenta</h1>
          <button type="button" className="subMenuContainerButton">
            <FaPlus /> Crear Documento
          </button>
        </div>
        <div className="subMenuList">
          <ul>
            <li
              onClick={() => setSubmenu("perfil")}
              className={submenu === "perfil" ? "active" : ""}
            >
              Perfil
            </li>

            <li
              onClick={() => setSubmenu("pagos")}
              className={submenu === "pagos" ? "active" : ""}
            >
              Pagos y Suscripcion
            </li>
            <li
              onClick={() => setSubmenu("seguridad")}
              className={submenu === "seguridad" ? "active" : ""}
            >
              Seguridad
            </li>
          </ul>
        </div>

        {submenu === "perfil" && <PerfilComponent />}
        {submenu === "pagos" && <PagosComponent />}
        {submenu === "seguridad" && <SeguridadComponent />}
      </MainLayout>
    </div>
  );
};

export default PerfilPage;
