import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import "./CardActionsModalStyles.css";

interface CardActionsModalProps {
  setActionsIsVisible: (visible: boolean) => void;
  id: string;
  fetchFiles: () => void;
  handleDelete: () => void;
}

const CardActionsModal: React.FC<CardActionsModalProps> = ({
  setActionsIsVisible,
  id,
  fetchFiles,
  handleDelete,
}) => {
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    setActionsIsVisible(false);
    navigate(`/formatos/${id}`);
  };

  const actions = [
    {
      icon: <FaPen />,
      name: "Crear Documento",
      handler: handleCreateDocument,
    },
    {
      icon: <FaTrash />,
      name: "Eliminar",
      handler: () => {
        handleDelete();
        setActionsIsVisible(false);
      },
    },
  ];

  return (
    <div className="CardActionsModal_container">
      <div className="CardActionsModal_list">
        {actions.map((action, index) => (
          <div
            key={index}
            className="CardActionsModal_action"
            onClick={action.handler}
            style={{ color: "black" }}
          >
            {action.icon}
            <p>{action.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardActionsModal;
