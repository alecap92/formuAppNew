import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus } from "react-icons/fa";

const ConexionApi = () => {
  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Integraciones API</h1>
          <button type="button" className="subMenuContainerButton">
            <FaPlus /> Crear Plantilla
          </button>
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Api Key</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hubspot</td>
              <td>FA623123982</td>
              <td>Alejandro Cabrejo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default ConexionApi;
