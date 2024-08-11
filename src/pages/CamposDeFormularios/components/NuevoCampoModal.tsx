import React, { useState } from "react";
import "./NuevoCampoModalStyles.css";
import { FaTimes } from "react-icons/fa";
import { updateUserFields } from "../../../services/api";
import { useSelector } from "react-redux";

interface ModalProps {
  setShowModal: (value: boolean) => void;
  getProperties: () => void;
}

interface Form {
  key?: string;
  type?: string;
  value?: string;
}

const NuevoCampoModal: React.FC<ModalProps> = ({
  setShowModal,
  getProperties,
}: any) => {
  const [form, setForm] = useState<Form>({
    key: "",
    type: "Text",
    value: "",
  });
  const settings = useSelector((state: any) => state.user.settings);

  const handleSave = async () => {
    if (!form.key) {
      alert("Nombre del campo requerido");
      return;
    }

    if (!form.type) {
      alert("Tipo de campo requerido");
      return;
    }

    if (!form.value) {
      setForm({ ...form, value: "" });
    }

    const updatedSettings = {
      ...settings,
      contactProperties: [...settings.contactProperties, form],
    };

    await updateUserFields(updatedSettings);
    setShowModal(false);
    getProperties();
  };

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
            <input
              type="text"
              name="key"
              id="key"
              onChange={(e) =>
                setForm({
                  ...form,
                  key: e.target.value.toLocaleLowerCase().replace(" ", "_"),
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo de campo</label>
            <select
              name="type"
              id="type"
              value={form.type} // El valor controlado por el estado
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value,
                })
              }
            >
              <option value="Text">Texto</option>
              <option value="Number">Número</option>
              <option value="Date">Fecha</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="value">Valor por defecto</label>
            <input
              type="text"
              name="value"
              id="value"
              onChange={(e) =>
                setForm({
                  ...form,
                  value: e.target.value.toLocaleLowerCase().replace(" ", "_"),
                })
              }
            />
          </div>
        </div>
        <div className="global-modal-footer">
          <button className="global-action-button" onClick={handleSave}>
            Guardar
          </button>
          <button className="global-action-delete-button">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default NuevoCampoModal;
