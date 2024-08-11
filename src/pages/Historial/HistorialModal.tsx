import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./HistorialModalStyles.css";
import PdfViewer from "../../services/react-pdf/react-pdf";
import procedureService from "../../services/api/procedureService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../contexts/features/loadingSlice";

type HistorialModalProps = {
  showModal: boolean;
  procedureId: string;
  closeModal: () => void;
};

interface ErrorMessage {
  missingFields: [];
  error: string;
}

const HistorialModal: React.FC<HistorialModalProps> = ({
  showModal,
  procedureId,
  closeModal,
}) => {
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    missingFields: [],
    error: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPdf = async () => {
      dispatch(setLoading(true));

      try {
        const response = await procedureService.getProcedurePdf(procedureId);

        if (
          response.headers["content-type"] === "application/json; charset=utf-8"
        ) {
          const responseText = await response.data.text();
          const json = JSON.parse(responseText);

          setErrorMessage(json);
        } else {
          const blob = response.data;
          setPdfData(blob as any);
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setErrorMessage({
          error: "Error al cargar el documento",
          missingFields: [],
        });
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (showModal) {
      fetchPdf();
    }

    return () => {
      setPdfData(null);
      dispatch(setLoading(false));
    };
  }, [showModal, procedureId, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, closeModal]);

  return (
    <div>
      <div
        className="HistorialModalStyle_container"
        onClick={() => closeModal()}
      ></div>

      <div className="HistorialModalStyle_box">
        <div className="HistorialModalStyle_header">
          <h3>Ver Documento</h3>
          <FaTimes onClick={closeModal} />
        </div>

        <div className="HistorialModalStyle_document_box">
          <div className="HistorialModalStyle_document">
            {errorMessage.missingFields.length > 0 ? (
              <div>
                <h3>{errorMessage.error}</h3>
                <ul>
                  {errorMessage.missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                  ))}
                </ul>
              </div>
            ) : (
              pdfData && <PdfViewer pdfData={pdfData as any} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialModal;
