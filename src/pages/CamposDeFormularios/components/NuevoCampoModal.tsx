import React from "react";
import "./NuevoCampoModalStyles.css";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  setShowModal: (value: boolean) => void;
}

const NuevoCampoModal: React.FC<ModalProps> = ({ setShowModal }: any) => {
  return (
    <div className="global-modal-container">
      <div className="global-modal-content">
        <div className="global-modal-header">
          <h3 className="global-modal-title">Nuevo Campo</h3>
          <FaTimes
            className="close-icon"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </div>
        <div className="global-modal-body NuevoCampoModal_content">
          <div className="form-group">
            <label htmlFor="">Nombre del campo</label>
            <input type="text" name="" id="" />
          </div>
          <div className="form-group">
            <label htmlFor="">Id de la variable</label>
            <div className="NuevoCampoModal_personalizada">
              <p>Personalizada__</p>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Tipo de campo</label>
            <select name="" id="">
              <option value="">Texto</option>
              <option value="">Número</option>
              <option value="">Fecha</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Valor por defecto</label>
            <input type="text" name="" id="" />
          </div>
        </div>
        <div className="global-modal-footer">
          <button className="global-action-button">Guardar</button>
          <button className="global-action-delete-button">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default NuevoCampoModal;
