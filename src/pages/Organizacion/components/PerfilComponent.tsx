import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../contexts/store/Store";
import "./PerfilComponentStyles.css";

interface FormData {
  companyName?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  document_type?: string;
  document?: string;
  celular?: string;
  address?: string;
  city?: string;
  state?: string;
}

const PerfilComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user.companyName,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        document_type: user.document_type,
        document: user.document,
        celular: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes hacer algo con los datos del formulario, como enviarlos a una API
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="PerfilComponent_container">
      <div style={{ width: "60%" }}>
        <form className="PerfilComponent_form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Nombre de la empresa</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">Nombre completo</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Nombre completo</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="document_type">Tipo de Identificación</label>
            <select
              id="document_type"
              name="document_type"
              value={formData.document_type || ""}
              onChange={() => {
                return handleChange;
              }}
            >
              <option value="" disabled>
                Seleccione un tipo de identificación
              </option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PA">Pasaporte</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="document">Número de Identificación</label>
            <input
              type="text"
              id="document"
              name="document"
              value={formData.document || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input
              type="text"
              id="celular"
              name="celular"
              value={formData.celular || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3 style={{ color: "#F65232" }}>Datos de Ubicación</h3>
            <hr />
          </div>
          <div className="form-group">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">Departamento (Estado)</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
      <div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ color: "#F65232" }}>Logo de empresa</h3>
          <hr />
        </div>
        <div className="PerfilComponent_ImageContainer">
          <img
            src="https://via.placeholder.com/200x200.png"
            alt="Logo de empresa"
          />
          <p>Tamaño recomendado 200px X 200px (max 1mb)</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" name="" id="" />
            <button>Cargar Imagen</button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h3 style={{ color: "#F65232" }}>Firma digital</h3>
          <hr />
        </div>
        <div className="PerfilComponent_ImageContainer">
          <img
            src="https://via.placeholder.com/200x200.png"
            alt="Firma digital"
          />
          <p>Tamaño recomendado 200px X 200px (max 1mb)</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" name="" id="" />
            <button>Cargar Imagen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilComponent;
