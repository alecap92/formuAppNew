import React from "react";

const PagosComponent = () => {
  return (
    <div style={{ margin: "20px" }}>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Forma de Pago</th>
            <th>Producto</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1233</td>
            <td>12/12/2024</td>
            <td>Pagado</td>
            <td>Trasferencia</td>
            <td>Plan Mensual</td>
            <td>$20.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PagosComponent;
