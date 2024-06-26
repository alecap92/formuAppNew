import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./ContactosStyles.css";
import ContactModal from "./components/ContactModal/ContactModal";

const Contactos = () => {
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>Contactos</h1>
            <p>103 Contactos</p>
          </div>
          <button
            type="button"
            className="subMenuContainerButton"
            onClick={() => setIsOpenModal(true)}
          >
            <FaPlus /> Crear Contacto
          </button>
        </div>
      </div>
      <div className="Contactos_container">
        <div className="Contactos_buscador">
          <FaSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Buscar contacto"
          />
        </div>

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
              <td colSpan={4}>No hay contactos creados</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isOpenModal && <ContactModal setIsOpenModal={setIsOpenModal} />}
    </MainLayout>
  );
};

export default Contactos;
