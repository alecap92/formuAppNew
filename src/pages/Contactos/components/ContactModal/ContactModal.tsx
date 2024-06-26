import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addAlert } from "../../../../contexts/features/alertSlice";
import "./ContactModalStyles.css";

interface ContactModalProps {
  setIsOpenModal: (value: boolean) => void;
}

const inputFields = [
  { label: "Nombre", type: "text", name: "name" },
  { label: "Apellidos", type: "text", name: "surname" },
  { label: "Celular", type: "text", name: "phone" },
];

const ContactModal: React.FC<ContactModalProps> = ({
  setIsOpenModal,
}: ContactModalProps) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    // Aquí puedes añadir la lógica para guardar el contacto

    // Despacha la alerta de "Guardado exitosamente"
    dispatch(
      addAlert({
        id: new Date().toISOString(),
        message: "Guardado exitosamente",
        type: "success",
      })
    );

    // Cierra el modal
    setIsOpenModal(false);
  };

  const handleDelete = () => {
    // Aquí puedes añadir la lógica para eliminar el contacto

    // Despacha la alerta de "Eliminado exitosamente"
    dispatch(
      addAlert({
        id: new Date().toISOString(),
        message: "Eliminado exitosamente",
        type: "success",
      })
    );

    // Cierra el modal
    setIsOpenModal(false);
  };

  return (
    <div className="global-modal-container">
      <div className="global-modal-content">
        <div className="global-modal-header">
          <h3 className="global-modal-title">Modificar Contacto</h3>
          <FaTimes
            className="close-icon"
            onClick={() => setIsOpenModal(false)}
          />
        </div>
        <div className="global-modal-body">
          {inputFields.map((field, index) => (
            <div className="input-group" key={index}>
              <label htmlFor={field.name} className="label">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="input"
              />
            </div>
          ))}
        </div>
        <div className="global-modal-footer">
          <button className="button save-button" onClick={handleSave}>
            Guardar
          </button>
          <button className="button delete-button" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
