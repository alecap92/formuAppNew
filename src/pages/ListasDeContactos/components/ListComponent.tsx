import React from "react";
import { FaSearch } from "react-icons/fa";

const ListComponent = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div className="global-search-input">
        <FaSearch />
        <input type="text" placeholder="Buscar lista" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre de la lista</th>
            <th>Propietario</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>No hay listas creadas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListComponent;
