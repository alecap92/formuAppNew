import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import "./StepperStyles.css";
import { FaRocket } from "react-icons/fa";
import AutocompletarModal from "../../components/AutocompletarModal/AutocompletarModal";

type Campo = {
  nombre: string;
  baseDeDatos: string;
  tipo: "Text" | "Select";
};

type Etapa = {
  nombre: string;
  campos: Campo[];
  isOpen: boolean;
};

type DatosFormulario = {
  nombreArchivo: string;
  archivo: any;
  etapas: Etapa[];
};

const Stepper = () => {
  const { procedureId } = useParams<{ procedureId: string }>();
  const [datos, setDatos] = useState<DatosFormulario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<
    Record<string, Record<string, string>>
  >({});
  const [documentName, setDocumentName] = useState("");
  const [isVisibleAutocompletar, setIsVisibleAutocompletar] =
    useState<boolean>(false);

  useEffect(() => {
    // Simulación de la petición HTTP
    const fetchData = async () => {
      // Simula un retraso para la petición
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // JSON de ejemplo
      const datosFormulario: DatosFormulario = {
        nombreArchivo: "Rotulo PDF",
        archivo: {},
        etapas: [
          {
            nombre: "Remitente",
            campos: [
              {
                nombre: "Nombre",
                baseDeDatos: "name",
                tipo: "Text",
              },
              {
                nombre: "Direccion",
                baseDeDatos: "address",
                tipo: "Text",
              },
            ],
            isOpen: true,
          },
          {
            nombre: "Destinatario",
            campos: [
              {
                nombre: "Nombre",
                baseDeDatos: "name",
                tipo: "Text",
              },
              {
                nombre: "Direccion",
                baseDeDatos: "address",
                tipo: "Select",
              },
            ],
            isOpen: true,
          },
        ],
      };

      // Aquí agregarías la llamada HTTP real, por ejemplo:
      // const response = await fetch(`https://api.example.com/procedures/${procedureId}`);
      // const datosFormulario = await response.json();

      setDatos(datosFormulario);
    };

    fetchData();
  }, [procedureId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    etapa: string,
    baseDeDatos: string
  ) => {
    setFormValues({
      ...formValues,
      [etapa]: {
        ...formValues[etapa],
        [baseDeDatos]: e.target.value,
      },
    });
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  const nextStep = () => {
    if (currentStep < datos!.etapas.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mostrar todos los datos en la consola
      console.log({
        nombreDocumento: documentName,
        valoresFormulario: formValues,
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!datos) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>{datos.nombreArchivo}</h1>
            <h3>Categoria: empresas</h3>
            <h3>Numero de veces utilizado</h3>
          </div>
          <button type="button" className="subMenuContainerButton">
            Mas Informacion
          </button>
        </div>
      </div>
      <div className="stepper_container">
        <div className="stepper_box">
          <iframe
            src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
            title="PDF Viewer"
            width="100%"
            height="500px"
          />
        </div>
        <div className="stepper_box stepper_stepper">
          <div className="document_name">
            <input
              type="text"
              name="documentName"
              id="documentName"
              placeholder="Nombre del documento*"
              value={documentName}
              onChange={handleDocumentNameChange}
            />
            <button
              className="autocompletar_button"
              onClick={() => setIsVisibleAutocompletar(true)}
            >
              <FaRocket /> Autocompletar
            </button>
          </div>
          <h2>{datos.etapas[currentStep].nombre}</h2>
          <div className="stepper_formContainer">
            {datos.etapas[currentStep].campos.map((campo) => (
              <div className="stepper_formGroup" key={campo.baseDeDatos}>
                <label htmlFor={campo.baseDeDatos}>{campo.nombre}*</label>
                {campo.tipo === "Text" ? (
                  <input
                    type="text"
                    name={campo.baseDeDatos}
                    id={campo.baseDeDatos}
                    value={
                      formValues[datos.etapas[currentStep].nombre]?.[
                        campo.baseDeDatos
                      ] || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        datos.etapas[currentStep].nombre,
                        campo.baseDeDatos
                      )
                    }
                  />
                ) : (
                  <select
                    name={campo.baseDeDatos}
                    id={campo.baseDeDatos}
                    value={
                      formValues[datos.etapas[currentStep].nombre]?.[
                        campo.baseDeDatos
                      ] || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        datos.etapas[currentStep].nombre,
                        campo.baseDeDatos
                      )
                    }
                  >
                    <option value="">-- Elija una opción --</option>
                    {/* Aquí puedes agregar las opciones según sea necesario */}
                  </select>
                )}
              </div>
            ))}
          </div>
          <div className="stepper_buttons">
            {currentStep > 0 && (
              <button className="salir_button" onClick={prevStep}>
                Anterior
              </button>
            )}
            <button className="siguiente_button" onClick={nextStep}>
              {currentStep === datos.etapas.length - 1
                ? "Guardar"
                : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
      {isVisibleAutocompletar && (
        <AutocompletarModal
          setIsVisibleAutocompletar={setIsVisibleAutocompletar}
        />
      )}
    </MainLayout>
  );
};

export default Stepper;
