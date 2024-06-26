import React, { useState, useEffect } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import "./HistorialModalStyles.css";
import PdfViewer from "../../services/react-pdf/react-pdf";

type HistorialModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const HistorialModal: React.FC<HistorialModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer when the component is unmounted or when showModal changes
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div className="HistorialModalStyle_container">
      <div className="HistorialModalStyle_box">
        <div className="HistorialModalStyle_header">
          <h3>Ver Documento</h3>
          <FaTimes
            onClick={() => {
              setShowModal(!showModal);
            }}
          />
        </div>

        <div>
          <div className="HistorialModalStyle_document_box">
            <div className="HistorialModalStyle_document">
              {isLoading ? (
                <FaSpinner className="spinner" />
              ) : (
                <PdfViewer fileUrl={"/samples/pdf"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialModal;
