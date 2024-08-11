import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addAlert } from "../../../../contexts/features/alertSlice";
import "./ContactModalStyles.css";
import { useSelector } from "react-redux";
import { contactService } from "../../../../services/api/contactService";

interface ContactModalProps {
  setIsOpenModal: (value: boolean) => void;
  fetchContacts: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  setIsOpenModal,
  fetchContacts,
}: ContactModalProps) => {
  const [form, setForm] = useState<any>([]);
  const dispatch = useDispatch();
  const inputFields = useSelector(
    (state: any) => state.user.settings.contactProperties
  );

  const handleSave = async () => {
    // Aquí puedes añadir la lógica para guardar el contacto
    await contactService.createContact({ properties: form });

    // Despacha la alerta de "Guardado exitosamente"
    dispatch(
      addAlert({
        id: new Date().toISOString(),
        message: "Guardado exitosamente",
        type: "success",
      })
    );
    setForm([]);
    // Cierra el modal
    setIsOpenModal(false);
    fetchContacts();
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
          {inputFields.map((field: any, index: any) => (
            <div className="input-group" key={index}>
              <label htmlFor={field.key} className="label">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.key}
                id={field.key}
                className="input"
                onChange={(e) =>
                  setForm((prevForm: any) => {
                    const updatedForm = prevForm.map((item: any) =>
                      item.key === field.key
                        ? { ...item, value: e.target.value }
                        : item
                    );

                    // Si la clave no existe en el array, añade un nuevo objeto
                    if (
                      !updatedForm.some((item: any) => item.key === field.key)
                    ) {
                      updatedForm.push({
                        key: field.key,
                        value: e.target.value,
                      });
                    }

                    return updatedForm;
                  })
                }
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
