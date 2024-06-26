import React from "react";

const Inicio = () => {
  return (
    <>
      <div style={{ margin: "20px" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre de la plantilla</th>
              <th>Fecha de creacion</th>
              <th>Propietario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Formato para envios POS</td>
              <td>12/12/2024</td>
              <td>Alejandro Cabrejo Porras</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inicio;
