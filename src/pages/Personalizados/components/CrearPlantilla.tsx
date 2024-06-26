import React, { useState } from "react";
import {
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import EtapaComponent from "./EtapaComponent";
import "./CrearPlantillaStyles.css";

interface Campo {
  nombre: string;
  baseDeDatos: string;
  tipo: string;
}

interface Etapa {
  nombre: string;
  campos: Campo[];
  isOpen: boolean;
}

const CrearPlantilla = () => {
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [nombreEtapa, setNombreEtapa] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleAgregarEtapa = () => {
    if (!nombreEtapa) {
      alert("Por favor, ingrese un nombre para la etapa.");
      return;
    }

    setEtapas([...etapas, { nombre: nombreEtapa, campos: [], isOpen: false }]);
    setNombreEtapa("");
  };

  const handleToggleEtapa = (index: number) => {
    setEtapas(
      etapas.map((etapa, i) =>
        i === index ? { ...etapa, isOpen: !etapa.isOpen } : etapa
      )
    );
  };

  const handleEliminarEtapa = (index: number) => {
    setEtapas(etapas.filter((_, i) => i !== index));
  };

  const setCampos = (index: number, campos: Campo[]) => {
    const nuevasEtapas = [...etapas];
    nuevasEtapas[index].campos = campos;
    setEtapas(nuevasEtapas);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formularioCompleto = {
      nombreArchivo,
      archivo,
      etapas,
    };
    console.log("Formulario completo:", formularioCompleto);
    // Limpiar el formulario
    setNombreArchivo("");
    setArchivo(null);
    setEtapas([]);
  };

  return (
    <>
      <div className="CrearPlantilla_container">
        <div className="CrearPlantilla_box">
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">Tipo de Archivo</label>
              <button type="button" className="CrearPlantilla_pdf_button">
                PDF
              </button>
            </div>
            <div>
              <label htmlFor="">Nombre del documento</label>
              <input
                type="text"
                value={nombreArchivo}
                onChange={(e) => setNombreArchivo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="S">Selecciona el archivo</label>
              <input
                type="file"
                onChange={(e) =>
                  setArchivo(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
            <div>
              <div>
                <label htmlFor="">Nombre de la etapa</label>
                <input
                  type="text"
                  value={nombreEtapa}
                  onChange={(e) => setNombreEtapa(e.target.value)}
                  className="input-nombre-etapa"
                />
                <button
                  type="button"
                  className="CrearPlantilla_agregarEtapa"
                  onClick={handleAgregarEtapa}
                >
                  <FaPlus /> Agregar Etapa
                </button>
              </div>
              {etapas.map((etapa, index) => (
                <div key={index} className="etapa-container">
                  <div
                    className="etapa-header"
                    onClick={() => handleToggleEtapa(index)}
                  >
                    {etapa.nombre}
                    {etapa.isOpen ? (
                      <FaChevronUp className="dropdown-icon" />
                    ) : (
                      <FaChevronDown className="dropdown-icon" />
                    )}
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevenir el toggle del dropdown
                        handleEliminarEtapa(index);
                      }}
                    />
                  </div>
                  {etapa.isOpen && (
                    <EtapaComponent
                      campos={etapa.campos}
                      setCampos={(campos) => setCampos(index, campos)}
                    />
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="CrearPlantilla_guardar">
              Guardar
            </button>
          </form>
        </div>
        <div className="CrearPlantilla_box">
          <h2>
            <FaInfoCircle /> Conoce FormuApp
          </h2>
          <h3>¿Qué son los Documentos Personalizados?</h3>
          <p>
            Con FormuApp puedes crear tus propias plantillas en PDF y
            completarlas automáticamente con nuestra tecnología. Crea un
            documento PDF desde Illustrator, Corel, Canva, Word, Excel,
            PowerPoint, o cualquier otra herramienta, súbelo y comienza a usar
            tu plantilla para generar documentos.
          </p>
          <h3>¿Cómo funciona el autocompletado?</h3>
          <p>
            En FormuApp no necesitas repetir la misma información una y otra
            vez. Almacena tus datos en la base de datos o utiliza una conexión
            API para acceder a ellos y completar automáticamente miles de
            documentos con un solo clic.
          </p>
          <h3>¿Por qué usar FormuApp?</h3>
          <p>
            Un caso común es la generación de rótulos para envíos. Cada vez que
            creas un documento en Word, Canva o PowerPoint, tienes que ingresar
            la misma información como nombre, dirección y teléfono una y otra
            vez. Con FormuApp, esta información ya estará guardada,
            permitiéndote generar documentos personalizados con un solo clic.
            Además, no solo tendrás plantillas para rótulos de envío, sino que
            contamos con miles de plantillas, y no tendrás que volver a ingresar
            la misma información.
          </p>
        </div>
      </div>
    </>
  );
};

export default CrearPlantilla;
