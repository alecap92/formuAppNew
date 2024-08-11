import React from "react";
import "./StepperStyles.css";

type StepperButtonsProps = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
};

const StepperButtons: React.FC<StepperButtonsProps> = ({
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="stepper_buttons">
      {currentStep > 0 && (
        <button className="salir_button" onClick={prevStep}>
          Anterior
        </button>
      )}
      <button className="siguiente_button" onClick={nextStep}>
        {currentStep === totalSteps - 1 ? "Guardar" : "Siguiente"}
      </button>
    </div>
  );
};

export default StepperButtons;
