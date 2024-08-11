import React from "react";
import "./StepperStyles.css";
import { Etapa } from "../../types/types";

type DatosFormulario = {
  name: string;
  category: string;
  fileName: string;
  etapas: Etapa[];
};

type StepperFormProps = {
  datos: DatosFormulario;
  currentStep: number;
  formValues: Record<string, Record<string, string>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    etapa: string,
    baseDeDatos: string
  ) => void;
};

const StepperForm: React.FC<StepperFormProps> = ({
  datos,
  currentStep,
  formValues,
  handleInputChange,
}) => {
  const etapaActual = datos.etapas[currentStep];

  return (
    <div className="stepper_formContainer">
      <h2>{etapaActual.label}</h2>
      {etapaActual.key.map((campo) => (
        <div
          className="stepper_formGroup"
          key={`${etapaActual.label}-${campo.key}`} // clave única
        >
          <label htmlFor={campo.key}>{campo.label}*</label>
          {campo.type === "Text" ? (
            <input
              required={campo.required}
              type="text"
              name={campo.key}
              id={campo.key}
              value={formValues[etapaActual.label]?.[campo.key] || ""}
              onChange={(e) =>
                handleInputChange(e, etapaActual.label, campo.key)
              }
            />
          ) : (
            <select
              name={campo.key}
              id={campo.key}
              value={formValues[etapaActual.label]?.[campo.key] || ""}
              onChange={(e) =>
                handleInputChange(e, etapaActual.label, campo.key)
              }
            >
              <option value="">-- Elija una opción --</option>
              {campo.options?.split(",").map((option) => (
                <option key={option.trim()} value={option.trim()}>
                  {option.trim()}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperForm;
