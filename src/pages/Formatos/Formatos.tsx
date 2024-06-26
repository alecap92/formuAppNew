import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./FormatosStyles.css";
import CardComponent from "../../components/card/CardComponent";
import { Link } from "react-router-dom";

const Formatos = () => {
  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Formatos de documentos</h1>
          <Link to="/personalizados">
            <button type="button" className="subMenuContainerButton">
              <FaPlus /> Crear Formato Personalizado
            </button>
          </Link>
        </div>
      </div>
      <div className="Plantillas_container">
        <div className="Plantillas_search">
          <FaSearch />
          <input
            type="text"
            name="buscar"
            id="buscar"
            placeholder="Buscar plantillas.."
          />
        </div>
        <p
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginBottom: "10px",
            color: "#939393",
          }}
        >
          Total Formatos: 102
        </p>
        <div id="Plantillas_grid">
          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />

          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Formatos;
