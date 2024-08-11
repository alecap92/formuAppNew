import React, { useEffect, useState } from "react";

type PdfViewerProps = {
  pdfData: Blob | null;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfData }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pdfData) {
      // Crear una URL para el Blob y almacenarla en el estado
      const url = URL.createObjectURL(pdfData);
      setPdfUrl(url);

      // Limpiar la URL del Blob cuando el componente se desmonte o pdfData cambie
      return () => {
        URL.revokeObjectURL(url);
        setPdfUrl(null);
      };
    }
  }, [pdfData]);

  if (!pdfData) {
    return <div>No PDF data available</div>;
  }

  return (
    <iframe
      src={pdfUrl as any}
      width="100%"
      height="750px"
      style={{ border: "none" }}
      title="PDF Viewer"
    />
  );
};

export default PdfViewer;
