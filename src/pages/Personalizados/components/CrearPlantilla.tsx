import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import EtapaComponent from "./EtapaComponent";
import "./CrearPlantillaStyles.css";
import fileService from "../../../services/api/fileService";
import { RootState } from "../../../contexts/store/Store";
import { Campo, Etapa } from "../../../types/types";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../contexts/features/loadingSlice";

const CrearPlantilla = ({ fetchFiles, submit, setSubmit }: any) => {
  const [nombreArchivo, setNombreArchivo] = useState<string>("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("Personalizados");
  const [isPublic, setIsPublic] = useState<string>("false");
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [nombreEtapa, setNombreEtapa] = useState("");

  const dispatch = useDispatch();

  const contactProperties = useSelector(
    (state: RootState) => state.user?.settings.contactProperties || []
  );

  const handleAgregarEtapa = () => {
    if (!nombreEtapa) {
      alert("Por favor, ingrese un nombre para la etapa.");
      return;
    }

    setEtapas([...etapas, { label: nombreEtapa, key: [], isOpen: false }]);
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

  const setCampos = (index: number, key: Campo[]) => {
    const nuevasEtapas = [...etapas];
    nuevasEtapas[index].key = key;
    setEtapas(nuevasEtapas);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (!nombreArchivo) {
        alert("Por favor, ingrese un nombre para el archivo.");
        return;
      }
      if (!category) {
        alert("Por favor, seleccione una categoría para el archivo.");
        return;
      }
      if (!archivo) {
        alert("Por favor, seleccione un archivo.");
        return;
      }

      const formData = new FormData();
      formData.append("name", nombreArchivo);
      formData.append("category", "Personalizados");
      formData.append("file", archivo);
      formData.append("isPublic", isPublic.toString());
      formData.append("etapas", JSON.stringify(etapas));

      try {
        dispatch(setLoading(true));

        await fileService.createFile(formData);
        fetchFiles();
        dispatch(setLoading(false));
        // Limpiar el formulario
        setNombreArchivo("");
        setArchivo(null);

        setIsPublic("false");
        setEtapas([]);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      } finally {
        setSubmit(false); // Resetear submit después de enviar el formulario
      }
    };

    if (submit) {
      handleSubmit();
    }
  }, [
    submit,
    nombreArchivo,
    category,
    archivo,
    isPublic,
    etapas,
    fetchFiles,
    dispatch,
    setSubmit,
  ]);

  return (
    <>
      <div className="CrearPlantilla_container">
        <div className="CrearPlantilla_box">
          <form>
            <div>
              <label htmlFor="isPublic">
                Es público o privado el documento?
              </label>
              <select
                name="isPublic"
                id="isPublic"
                onChange={(e) => setIsPublic(e.target.value)}
                required
              >
                <option value="false">Privado</option>
                <option value="true">Público</option>
              </select>
            </div>
            <div>
              <label htmlFor="nombreArchivo">Nombre del documento</label>
              <input
                type="text"
                id="nombreArchivo"
                value={nombreArchivo}
                onChange={(e) => setNombreArchivo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Categoría del documento</label>

              <select
                name=""
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                defaultValue={"Personalizados"}
              >
                <option value="Personalizados">Personalizados</option>
              </select>
            </div>
            <div>
              <label htmlFor="archivo">Selecciona el archivo</label>
              <input
                type="file"
                id="archivo"
                onChange={(e) =>
                  setArchivo(e.target.files ? e.target.files[0] : null)
                }
                required
              />
            </div>

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
                  {etapa.label}
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
                    campos={etapa.key}
                    setCampos={(key) => setCampos(index, key)}
                    contactProperties={contactProperties}
                  />
                )}
              </div>
            ))}
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
