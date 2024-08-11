import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaFilePdf } from "react-icons/fa";
import "./CardComponentStyles.css";
import CardActionsModal from "./modal/CardActionsModal";

interface CardComponentProps {
  id?: string;
  title: string;
  category: string;
  usageCount: number;
  onClick: () => void;
  fetchFiles: () => void;
  handleDelete: () => void;
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  id,
  title,
  category,
  usageCount,
  onClick,
  fetchFiles,
  handleDelete,
  activeModalId,
  setActiveModalId,
}) => {
  const [actionsIsVisible, setActionsIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActionsIsVisible(false);
        setActiveModalId(null);
      }
    };

    if (actionsIsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionsIsVisible, setActiveModalId]);

  const handleModalToggle = () => {
    if (actionsIsVisible) {
      setActionsIsVisible(false);
      setActiveModalId(null);
    } else {
      setActionsIsVisible(true);
      setActiveModalId(id || null);
    }
  };

  return (
    <div className="CardComponent_wrapper">
      <div className="CardComponent_container">
        <div className="CardComponent_row">
          <div className="CardComponent_row_pdf_container">
            <FaFilePdf />
          </div>
          <FaEllipsisV
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={handleModalToggle}
          />
        </div>
        <h2 onClick={onClick}>{title}</h2>
        <hr />
        <p>Categoria: {category}</p>
        <p>Usado {usageCount} veces</p>
        {actionsIsVisible && activeModalId === id && (
          <div ref={modalRef}>
            <CardActionsModal
              setActionsIsVisible={setActionsIsVisible}
              id={id as string}
              fetchFiles={fetchFiles}
              handleDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
