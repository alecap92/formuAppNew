import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CrearPlantilla from "./components/CrearPlantilla";
import "./PersonalizadosStyles.css";

const Personalizados: React.FC = () => {
  const [submit, setSubmit] = useState(false);

  const fetchFiles = async () => {
    // const files = await fileService.getPrivateFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <MainLayout>
      <div className="subMenuContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>Crear plantillas</h1>
            <p>Crea tus propias plantillas y comienza a crear documentos</p>
          </div>
          <button
            className="CrearPlantilla_guardar"
            onClick={() => {
              setSubmit(true); // Marcar el submit como true al hacer clic
            }}
          >
            Guardar
          </button>
        </div>
      </div>
      <CrearPlantilla
        fetchFiles={fetchFiles}
        submit={submit} // Pasar submit como prop
        setSubmit={setSubmit} // Pasar setSubmit como prop para resetearlo
      />
    </MainLayout>
  );
};

export default Personalizados;
