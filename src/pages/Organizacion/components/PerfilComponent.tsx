import React from "react";
import "./PerfilComponentStyles.css";

const PerfilComponent = () => {
  return (
    <div className="PerfilComponent_container">
      <div style={{ width: "60%" }}>
        <form action="" className="PerfilComponent_form">
          <div className="form-group">
            <label htmlFor="companyName">Nombre de la empresa</label>
            <input type="text" id="companyName" name="companyName" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input type="email" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="idType">Tipo de Identificacion</label>
            <input type="text" id="idType" name="idType" />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">Numero de Identificacion</label>
            <input type="text" id="idNumber" name="idNumber" />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular</label>
            <input type="text" id="celular" name="celular" />
          </div>
          <div>
            <h3 style={{ color: "#F65232" }}>Datos de Ubicacion</h3>
            <hr />
          </div>
          <div className="form-group">
            <label htmlFor="address">Direccion</label>
            <input type="text" id="address" name="address" />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" />
          </div>
          <div className="form-group">
            <label htmlFor="state">Departamento (Estado)</label>
            <input type="text" id="state" name="state" />
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
