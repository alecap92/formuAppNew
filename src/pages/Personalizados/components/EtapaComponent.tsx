import React, { useState } from "react";
import "./EtapaComponentStyles.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Campo } from "../../../types/types";
import FieldsModal from "./FieldsModal";

interface ContactProperty {
  key: string;
  value: string;
}

interface EtapaComponentProps {
  campos: Campo[];
  setCampos: (campos: Campo[]) => void;
  contactProperties: ContactProperty[];
}

const EtapaComponent: React.FC<EtapaComponentProps> = ({
  campos,
  setCampos,
  contactProperties,
}) => {
  const [nuevoCampo, setNuevoCampo] = useState<Campo>({
    label: "",
    key: "",
    type: "",
    required: false,
    options: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAgregarCampo = () => {
    if (!nuevoCampo.label || !nuevoCampo.key || !nuevoCampo.type) {
      alert("Por favor, complete todos los campos antes de agregar.");
      return;
    }
    setCampos([...campos, nuevoCampo]);
    setNuevoCampo({
      label: "",
      key: "",
      type: "",
      required: false,
      options: "",
    });
    setSearchTerm(""); // Resetear el término de búsqueda
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Campo
  ) => {
    setNuevoCampo({ ...nuevoCampo, [field]: e.target.value });
  };

  const handleSelect = (key: string) => {
    setNuevoCampo({ ...nuevoCampo, key });
    setShowModal(false);
  };

  const handleEliminarCampo = (index: number) => {
    const nuevosCampos = campos.filter((_, i) => i !== index);
    setCampos(nuevosCampos);
  };

  // Filtrar las propiedades que ya han sido seleccionadas
  const propiedadesDisponibles = contactProperties.filter(
    (property) => !campos.some((campo) => campo.key === property.key)
  );

  // Verificar si hay algún campo de tipo Select para mostrar la columna de valores
  const mostrarColumnaValores = nuevoCampo.type === "Select";

  return (
    <div className="EtapaComponent_container">
      <div>
        <table>
          <thead>
            <tr>
              <th>Etiqueta</th>
              <th>Campo en la base de datos (key)</th>
              <th>Tipo de campo</th>
              {mostrarColumnaValores && <th>Valores (si es Select)</th>}
              <th>Requerido</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {campos.map((campo, index) => (
              <tr key={index} className="table-row">
                <td>{campo.label}</td>
                <td>{campo.key}</td>
                <td>{campo.type}</td>
                {campo.type === "Select" && <td>{campo.options}</td>}
                <td>{campo.required ? "Verdadero" : "Falso"}</td>
                <td className="action-cell">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleEliminarCampo(index)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={nuevoCampo.label}
                  onChange={(e) => handleChange(e, "label")}
                  placeholder="Nombre del campo"
                />
              </td>
              <td>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar o crear un campo"
                    onClick={() => setShowModal(true)}
                  />
                  {showModal && (
                    <FieldsModal
                      searchTerm={searchTerm}
                      handleSelect={handleSelect}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>
              </td>
              <td>
                <select
                  value={nuevoCampo.type}
                  onChange={(e) => handleChange(e, "type")}
                  className="custom-select"
                  disabled={propiedadesDisponibles.length === 0}
                >
                  <option value="" disabled>
                    Seleccione un tipo
                  </option>
                  <option value="Text">Text</option>
                  <option value="Select">Select</option>
                  <option value="Radio">Radio</option>
                </select>
              </td>
              {mostrarColumnaValores && (
                <td>
                  <input
                    type="text"
                    value={nuevoCampo.options || ""}
                    onChange={(e) => handleChange(e, "options")}
                    placeholder="Valores separados por coma"
                  />
                </td>
              )}
              <td>
                <input
                  type="checkbox"
                  checked={nuevoCampo.required}
                  onChange={(e) =>
                    setNuevoCampo({ ...nuevoCampo, required: e.target.checked })
                  }
                  name="required"
                  id="required"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h4
          className="EtapaComponent_agregarCampo"
          onClick={handleAgregarCampo}
          style={{
            cursor:
              propiedadesDisponibles.length > 0 ? "pointer" : "not-allowed",
          }}
        >
          <FaPlus /> Agregar Campo
        </h4>
      </div>
    </div>
  );
};

export default EtapaComponent;
