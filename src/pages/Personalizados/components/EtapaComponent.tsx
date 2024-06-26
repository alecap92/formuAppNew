import React, { useState } from "react";
import "./EtapaComponentStyles.css";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Campo {
  nombre: string;
  baseDeDatos: string;
  tipo: string;
}

interface EtapaComponentProps {
  campos: Campo[];
  setCampos: (campos: Campo[]) => void;
}

const EtapaComponent: React.FC<EtapaComponentProps> = ({
  campos,
  setCampos,
}) => {
  const [nuevoCampo, setNuevoCampo] = useState<Campo>({
    nombre: "",
    baseDeDatos: "",
    tipo: "",
  });

  const handleAgregarCampo = () => {
    if (!nuevoCampo.nombre || !nuevoCampo.baseDeDatos || !nuevoCampo.tipo) {
      alert("Por favor, complete todos los campos antes de agregar.");
      return;
    }
    setCampos([...campos, nuevoCampo]);
    setNuevoCampo({ nombre: "", baseDeDatos: "", tipo: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Campo
  ) => {
    setNuevoCampo({ ...nuevoCampo, [field]: e.target.value });
  };

  const handleEliminarCampo = (index: number) => {
    const nuevosCampos = campos.filter((_, i) => i !== index);
    setCampos(nuevosCampos);
  };

  return (
    <div className="EtapaComponent_container">
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre del campo</th>
              <th>Campo en la base de datos</th>
              <th>Tipo de campo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {campos.map((campo, index) => (
              <tr key={index} className="table-row">
                <td>{campo.nombre}</td>
                <td>{campo.baseDeDatos}</td>
                <td>{campo.tipo}</td>
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
                  value={nuevoCampo.nombre}
                  onChange={(e) => handleChange(e, "nombre")}
                  placeholder="Nombre del campo"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={nuevoCampo.baseDeDatos}
                  onChange={(e) => handleChange(e, "baseDeDatos")}
                  placeholder="Campo en la base de datos"
                />
              </td>
              <td>
                <select
                  value={nuevoCampo.tipo}
                  onChange={(e) => handleChange(e, "tipo")}
                  className="custom-select"
                >
                  <option value="" disabled>
                    Seleccione un tipo
                  </option>
                  <option value="Text">Text</option>
                  <option value="Select">Select</option>
                  <option value="Radio">Radio</option>
                </select>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h4
          className="EtapaComponent_agregarCampo"
          onClick={handleAgregarCampo}
        >
          <FaPlus /> Agregar Campo
        </h4>
      </div>
    </div>
  );
};

export default EtapaComponent;
