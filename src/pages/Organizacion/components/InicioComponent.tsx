import React, { useState } from "react";
import "./InicioComponentStyles.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import ProcedimientosGrafica from "../../../components/Graficas/ProcedimientosGrafica";
import CardComponent from "../../../components/card/CardComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../contexts/store/Store";

const InicioComponent = () => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <div>
        <div id="contenedor01" className="organizacionContenedor01">
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
                    <td
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {user.plan.name}
                    </td>
                  </tr>
                  <tr>
                    <td>Precio</td>
                    <td>
                      <p>${user.plan.price.toLocaleString()}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Documentos creados</td>
                    <td>
                      <p
                        style={
                          user.documentsUsedThisMonth >
                          user.plan.monthlyDocuments
                            ? { color: "red" }
                            : {}
                        }
                      >
                        {user.documentsUsedThisMonth} /{" "}
                        {user.plan.monthlyDocuments.toLocaleString()}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Plantillas personalizadas</td>
                    <td>
                      <p
                        style={
                          user.templatesUsed > user.plan.templates
                            ? { color: "red" }
                            : {}
                        }
                      >
                        {user.templatesUsed} /{" "}
                        {user.plan.templates.toLocaleString()}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="button01">Upgrade</button>
            </div>
            <div className="secondColumn01">
              <div>
                <div>
                  <h3>Plantillas Personalizadas</h3>
                  <ProgressBar
                    used={user.templatesUsed}
                    total={user.plan.templates}
                  />
                </div>
              </div>
              <div>
                <div>
                  <h3>Documentos realizados</h3>
                  <ProgressBar
                    used={user.documentsUsedThisMonth}
                    total={user.plan.monthlyDocuments}
                  />
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
            id="rotulos-envios"
            title="Rótulos para envíos"
            category="Vehículos"
            usageCount={23}
            onClick={() => {}}
            fetchFiles={() => {}}
            handleDelete={() => {}}
            activeModalId={activeModalId}
            setActiveModalId={setActiveModalId}
          />
        </div>
      </div>
    </div>
  );
};

export default InicioComponent;
