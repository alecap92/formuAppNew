import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaEye, FaPlus } from "react-icons/fa";
import ListComponent from "./components/ListComponent";
import NewListComponent from "./components/NewListComponent";

const ListasDeContactos = () => {
  const [stage, setStage] = useState("list");

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Listas De Contactos</h1>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() =>
              stage === "list" ? setStage("newList") : setStage("list")
            }
          >
            {stage === "list" ? (
              <div>
                <FaPlus />
                Nueva Lista
              </div>
            ) : (
              <div>
                <FaEye />
                Ver Listas
              </div>
            )}
          </button>
        </div>
      </div>
      <div>{stage === "list" ? <ListComponent /> : <NewListComponent />}</div>
    </MainLayout>
  );
};

export default ListasDeContactos;
