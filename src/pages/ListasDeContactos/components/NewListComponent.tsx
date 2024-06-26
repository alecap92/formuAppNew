import React from "react";
import "./NewListComponentStyles.css";
import { FaInfoCircle } from "react-icons/fa";

const NewListComponent = () => {
  return (
    <div className="NewListComponent_container">
      <div className="NewListComponent_LeftColumn">
        <div>
          <label htmlFor="">Nombre de la lista</label>
          <input type="text" name="" id="" />
        </div>
        <div>
          <label htmlFor="">Filtros</label>
          <div className="filterBox">
            <p>No hay filtos añadidos</p>
            <p
              style={{
                color: "#F65232",
                marginTop: "10px",
                textDecoration: "underline",
              }}
            >
              {" "}
              + Agregar Filtro
            </p>
          </div>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  No hay contactos aun en la lista, selecciona los filtros para
                  iniciar.
                </td>
              </tr>
            </tbody>
          </table>
          <button className="global-action-button">Guardar</button>
        </div>
      </div>
      <div className="NewListComponent_RightColumn">
        <div className="NewListComponent_RightColumn_icon">
          <FaInfoCircle />
          <h2>Conoce las listas</h2>
        </div>
        <h3>Que son las listas de contactos?</h3>
        <p>
          Las listas de contactos son filtros en comun que tienen tus contactos,
          son muy utiles en caso que quieras tener organizados los contactos en
          tu base de datos, con estas listas podrás programar el envio de
          plantillas auto completables y automatizadas.
        </p>
      </div>
    </div>
  );
};

export default NewListComponent;
