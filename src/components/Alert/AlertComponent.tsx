import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./AlertComponentStyles.css";

interface AlertComponentProps {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
  onClose: (id: string) => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  id,
  title,
  description,
  type,
  onClose,
}: AlertComponentProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`alert-container ${type}`}>
      <div className="alert-content">
        <h4 className="alert-title">{title}</h4>
        <p className="alert-description">{description}</p>
      </div>
      <FaTimes className="alert-close-icon" onClick={() => onClose(id)} />
    </div>
  );
};

export default AlertComponent;
