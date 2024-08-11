import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import InicioComponent from "./components/InicioComponent";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export type SubmenuType =
  | "inicio"
  | "usuarios"
  | "suscripcion"
  | "pagos"
  | "perfil"
  | "seguridad";

const Organizacion: React.FC = () => {
  return (
    <MainLayout>
      <div className="subMenuContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Dashboard</h1>
          <Link
            to={"/formatos"}
            type="button"
            className="subMenuContainerButton"
          >
            <FaPlus /> Crear Documento
          </Link>
        </div>
      </div>
      <InicioComponent />
    </MainLayout>
  );
};

export default Organizacion;
