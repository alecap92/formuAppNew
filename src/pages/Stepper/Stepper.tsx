import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import "./StepperStyles.css";
import fileService from "../../services/api/fileService";
import PDFViewer from "./PDFViewer";
import StepperForm from "./StepperForm";
import StepperButtons from "./StepperButtons";
import DocumentNameInput from "./DocumentNameInput";
import AutocompletarModal from "../../components/AutocompletarModal/AutocompletarModal";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import procedureService from "../../services/api/procedureService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../contexts/features/loadingSlice";
import { handleAutoComplete } from "../../utils/AutoComplete/AutoComplete";
import { addAlert } from "../../contexts/features/alertSlice";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Stepper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [datos, setDatos] = useState<any | null>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<
    Record<string, Record<string, string>>
  >({});
  const [documentName, setDocumentName] = useState("");
  const [isVisibleAutocompletar, setIsVisibleAutocompletar] =
    useState<boolean>(false);
  const [loadingPdf, setLoadingPdf] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fields = await fileService.getFile(id as any);
        if (!fields) {
          console.error("No file data found.");
          return;
        }
        setDatos(fields);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPdf = async () => {
      try {
        const pdfBlob = await fileService.getTemplatePdf(id as any);
        const loadingTask = pdfjsLib.getDocument({ data: pdfBlob });
        const pdf = await loadingTask.promise;
        setPdf(pdf);
        setLoadingPdf(false);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchData();
    fetchPdf();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    etapa: string,
    baseDeDatos: string
  ) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [etapa]: {
        ...prevValues[etapa],
        [baseDeDatos]: e.target.value,
      },
    }));
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  const nextStep = async () => {
    const etapaActual = datos?.etapas[currentStep];
    let isValid = true;

    if (etapaActual) {
      etapaActual.key.forEach((campo: any) => {
        const valorCampo = formValues[etapaActual.label]?.[campo.key] || "";
        if (campo.required && !valorCampo) {
          const inputElement = document.getElementById(campo.key);
          if (inputElement) {
            inputElement.classList.add("stepper_input_error");
          }
          isValid = false;
        } else {
          const inputElement = document.getElementById(campo.key);
          if (inputElement) {
            inputElement.classList.remove("stepper_input_error");
          }
        }
      });
    }

    if (!isValid) return;

    if (currentStep < (datos?.etapas?.length ?? 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (!documentName) {
        dispatch(
          addAlert({
            message: "Por favor, ingresa un nombre para el documento.",
            type: "error",
            id: Math.random().toLocaleString(),
          })
        );
        return;
      }
      dispatch(setLoading(true));

      const submissionData = {
        fileId: id,
        content: Object.keys(formValues).reduce((acc, etapa) => {
          const etapaValues = formValues[etapa];
          Object.keys(etapaValues).forEach((campo) => {
            acc[`${etapa}.${campo}`] = etapaValues[campo];
          });
          return acc;
        }, {} as Record<string, string>),
        name: documentName,
        comments: "",
      };

      const response = await procedureService.createProcedure(submissionData);
      localStorage.setItem("recentProcedureId", response._id);

      dispatch(setLoading(false));
      navigate("/historial");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!datos) {
    return <div>Loading data...</div>;
  }

  return (
    <MainLayout>
      <div className="subMenuContainer" style={{ padding: "40px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1>{datos.name}</h1>
            <h3>Categoria: {datos.category}</h3>
          </div>
          <button type="button" className="subMenuContainerButton">
            Más Información
          </button>
        </div>
      </div>
      <div className="stepper_container">
        <PDFViewer pdf={pdf} loading={loadingPdf} />
        <div className="stepper_box stepper_stepper">
          <DocumentNameInput
            documentName={documentName}
            handleDocumentNameChange={handleDocumentNameChange}
            setIsVisibleAutocompletar={setIsVisibleAutocompletar}
          />
          <StepperForm
            datos={datos}
            currentStep={currentStep}
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
          <StepperButtons
            currentStep={currentStep}
            totalSteps={datos?.etapas?.length}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      </div>
      {isVisibleAutocompletar && (
        <AutocompletarModal
          setIsVisibleAutocompletar={setIsVisibleAutocompletar}
          onSelectSource={(source: "myInfo" | "contacts", contact?: any) =>
            handleAutoComplete(
              source,
              contact,
              user,
              datos!,
              currentStep,
              formValues,
              setFormValues
            )
          }
        />
      )}
    </MainLayout>
  );
};

export default Stepper;
