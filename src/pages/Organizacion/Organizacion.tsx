import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import SubMenuOrganizacion from "../../components/SubMenus/Organizacion/SubMenuOrganizacion";
import InicioComponent from "./components/InicioComponent";
import UsuariosComponent from "./components/UsuariosComponent";
import PagosComponent from "./components/PagosComponent";
import PerfilComponent from "./components/PerfilComponent";
import SeguridadComponent from "./components/SeguridadComponent";

export type SubmenuType =
  | "inicio"
  | "usuarios"
  | "suscripcion"
  | "pagos"
  | "perfil"
  | "seguridad";

const Organizacion: React.FC = () => {
  const [submenu, setSubmenu] = useState<SubmenuType>("inicio");

  return (
    <MainLayout>
      <SubMenuOrganizacion setSubmenu={setSubmenu} submenu={submenu} />
      {submenu === "inicio" && <InicioComponent />}
      {submenu === "usuarios" && <UsuariosComponent />}
      {submenu === "suscripcion" && <h1>En construccion...</h1>}
      {submenu === "pagos" && <PagosComponent />}
      {submenu === "perfil" && <PerfilComponent />}
      {submenu === "seguridad" && <SeguridadComponent />}
    </MainLayout>
  );
};

export default Organizacion;
