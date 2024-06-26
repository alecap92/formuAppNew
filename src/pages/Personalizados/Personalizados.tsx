import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus } from "react-icons/fa";
import Inicio from "./components/Inicio";
import CrearPlantilla from "./components/CrearPlantilla";

const Personalizados = () => {
  const [isVisible, setIsVisible] = useState("inicio");

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Documentos Personalizados</h1>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() => setIsVisible("plantilla")}
          >
            <FaPlus /> Crear Plantilla
          </button>
        </div>
      </div>

      {isVisible === "inicio" ? <Inicio /> : <CrearPlantilla />}
    </MainLayout>
  );
};

export default Personalizados;
