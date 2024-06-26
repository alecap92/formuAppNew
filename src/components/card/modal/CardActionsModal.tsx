import React from "react";
import {
  FaEnvelope,
  FaPen,
  FaPrint,
  FaTrash,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import "./CardActionsModalStyles.css";

const CardActionsModal = ({ setActionsIsVisible }: any) => {
  const actions = [
    {
      icon: <FaPrint />,
      name: "Imprimir",
    },
    {
      icon: <FaEnvelope />,
      name: "Enviar por correo",
    },
    {
      icon: <FaWhatsapp />,
      name: "Enviar por WhatsApp",
    },
    {
      icon: <FaPen />,
      name: "Editar",
    },
    {
      icon: <FaTrash />,
      name: "Eliminar",
    },
    {
      icon: <FaStar />,
      name: "Agregar a favoritos",
    },
  ];
  return (
    <div>
      <div className="CardActionsModal_container">
        <div className="CardActionsModal_list">
          {actions.map((action, index) => (
            <div key={index} className="CardActionsModal_action">
              {action.icon}
              <p>{action.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardActionsModal;
