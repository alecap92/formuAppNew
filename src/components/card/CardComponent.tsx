import React, { useState } from "react";
import { FaEllipsisV, FaFilePdf } from "react-icons/fa";
import "./CardComponentStyles.css";
import CardActionsModal from "./modal/CardActionsModal";

interface CardComponentProps {
  title: string;
  category: string;
  usageCount: number;
  onClick: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  category,
  usageCount,
  onClick,
}) => {
  const [actionsIsVisible, setActionsIsVisible] = useState(false);

  return (
    <>
      <div className="CardComponent_wrapper">
        <div className="CardComponent_container">
          <div className="CardComponent_row">
            <div className="CardComponent_row_pdf_container">
              <FaFilePdf />
            </div>
            <FaEllipsisV
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => setActionsIsVisible(!actionsIsVisible)}
            />
          </div>
          <h2 onClick={onClick}>{title}</h2>
          <hr />
          <p>Categoria: {category}</p>
          <p>Usado {usageCount} veces</p>
          {actionsIsVisible && (
            <CardActionsModal setActionsIsVisible={setActionsIsVisible} />
          )}
        </div>
      </div>
    </>
  );
};

export default CardComponent;
