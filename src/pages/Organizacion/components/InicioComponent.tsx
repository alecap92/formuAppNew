import React from "react";
import "./InicioComponentStyles.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import ProcedimientosGrafica from "../../../components/Graficas/ProcedimientosGrafica";
import CardComponent from "../../../components/card/CardComponent";

const InicioComponent = () => {
  return (
    <div>
      <div>
        <div id="contenedor01" className="organizacionContenedor01">
          <h2>Dashboard</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="firsColumn01">
              <table className="table01">
                <tbody>
                  <tr>
                    <td>Current Plan: </td>
                    <td>FREE</td>
                  </tr>
                  <tr>
                    <td>Precios</td>
                    <td>
                      <p>$0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Formularios</td>
                    <td>
                      <p>15</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Formularios sin usar</td>
                    <td>
                      <p>20</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="button01">Upgrade</button>
              <p style={{ marginTop: "20px" }}>
                Reinicio de contador: 12 Jul 2024
              </p>
            </div>
            <div className="secondColumn01">
              <div>
                <div>
                  <h3>Formularios Personalizados</h3>
                  <ProgressBar used={2} total={5} />
                </div>
              </div>
              <div>
                <div>
                  <h3>Documentos realizados</h3>
                  <ProgressBar used={7} total={20} />
                </div>
              </div>
              <div>
                <h3>Documentos por Mes</h3>
                <ProcedimientosGrafica />
              </div>
            </div>
          </div>
        </div>
        <div id="contenedor02" className="organizacionContenedor01">
          <h2>Plantillas favoritas</h2>
          <CardComponent
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default InicioComponent;
