import React, { useEffect, useRef } from "react";
import "./StepperStyles.css";

type PDFViewerProps = {
  pdf: any;
  loading: boolean;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ pdf, loading }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (!pdf) return;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context!,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      }
    };

    renderPDF();
  }, [pdf]);

  return (
    <div className="stepper_box">
      {loading ? <div>Loading PDF...</div> : <canvas ref={canvasRef} />}
    </div>
  );
};

export default PDFViewer;
