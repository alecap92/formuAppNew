import React from "react";
import { FaRocket } from "react-icons/fa";
import "./StepperStyles.css";

type DocumentNameInputProps = {
  documentName: string;
  handleDocumentNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsVisibleAutocompletar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DocumentNameInput: React.FC<DocumentNameInputProps> = ({
  documentName,
  handleDocumentNameChange,
  setIsVisibleAutocompletar,
}) => {
  return (
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
  );
};

export default DocumentNameInput;
