import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./HistorialStyles.css";
import CardComponent from "../../components/card/CardComponent";
import HistorialModal from "./HistorialModal";
import { Link } from "react-router-dom";

const Historial = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout>
      <>
        <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Historial</h1>
            <Link to="/personalizados">
              <button type="button" className="subMenuContainerButton">
                <FaPlus /> Crear Formato Personalizado
              </button>
            </Link>
          </div>
        </div>
        <div className="Historial_container">
          <div className="Historial_container_search">
            <FaSearch />
            <input type="text" name="" id="" placeholder="Buscar documento" />
          </div>

          <div id="cards" className="Historial_Cards">
            <CardComponent
              title="Rótulos para envíos"
              category="Vehículos"
              usageCount={23}
              onClick={() => setShowModal(true)}
            />
            <CardComponent
              title="Rótulos para envíos"
              category="Vehículos"
              usageCount={23}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>

        {showModal && (
          <HistorialModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </>
    </MainLayout>
  );
};

export default Historial;
