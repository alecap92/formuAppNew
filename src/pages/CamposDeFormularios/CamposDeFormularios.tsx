import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaInfoCircle, FaPlus, FaSearch } from "react-icons/fa";
import NuevoCampoModal from "./components/NuevoCampoModal";

const CamposDeFormularios = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Campos de Formularios</h1>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Crear Documento
          </button>
        </div>
      </div>

      <div className="global-fila">
        <div>
          <div className="global-search-input">
            <FaSearch />
            <input type="text" name="search" id="search" placeholder="Buscar" />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre del campo</th>
                <th>Id de la variable</th>
                <th>Tipo de campo</th>
                <th>Valor por defecto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>No hay Propiedades creadas</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="global-icon-row">
            <FaInfoCircle />
            <h2>Conoce los campos</h2>
          </div>
          <h3>Que son los campos de formularios</h3>
          <p>
            Para lograr autocompletar los documentos, formuapp utiliza variables
            para identificar la posicion y valores que llevan los campos. En
            ocasiones necesitamos campos mas personalizados para nuestra
            empresa.{" "}
          </p>
          <h3>Campos Por defecto</h3>
          <p>
            Para que FormuApp funcione, requerimos dejar algunos campos
            genéricos por defecto como Nombre, Celular, Dirección los cuales no
            podrán ser eliminados o modificados.
          </p>
          <h3>Campos Personalizados</h3>
          <p>
            Crea los campos necesarios para tu negocio, ya sea si es una
            inmobiliaria, concesionario de vehículos o una ferretería, puedes
            crear tus propias variables para reutilizar en todos tus documentos.
          </p>
          <h3>Valor por defecto</h3>
          <p>
            En ocasiones necesitamos traer la misma informacion en una variable,
            utilizando el campo de valor por defecto, podrás traer el valor de
            la variable.
          </p>
        </div>
      </div>
      {showModal && <NuevoCampoModal setShowModal={setShowModal} />}
    </MainLayout>
  );
};

export default CamposDeFormularios;
