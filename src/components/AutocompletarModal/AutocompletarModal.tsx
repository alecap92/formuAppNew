import React from "react";
import "./AutocompletarModalStyles.css";
import { FaBuilding, FaTimes, FaUser } from "react-icons/fa";

type AutocompletarModalProps = {
  setIsVisibleAutocompletar: (visible: boolean) => void;
};

const AutocompletarModal = ({
  setIsVisibleAutocompletar,
}: AutocompletarModalProps) => {
  return (
    <div className="AutocompletarModal_container">
      <div className="AutocompletarModal_box">
        <div className="close" onClick={() => setIsVisibleAutocompletar(false)}>
          <FaTimes />
        </div>
        <h3>Elija la fuente de Información</h3>
        <div>
          <button>
            <FaBuilding /> Mi Información
          </button>
          <button>
            <FaUser /> Contactos
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutocompletarModal;
