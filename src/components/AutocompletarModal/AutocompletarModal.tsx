import React, { useState } from "react";
import "./AutocompletarModalStyles.css";
import { FaBuilding, FaTimes, FaUser } from "react-icons/fa";
import ContactList from "./ContactList";

type AutocompletarModalProps = {
  setIsVisibleAutocompletar: (visible: boolean) => void;
  onSelectSource: (source: "myInfo" | "contacts", contact?: any) => void;
};

const AutocompletarModal: React.FC<AutocompletarModalProps> = ({
  setIsVisibleAutocompletar,
  onSelectSource,
}) => {
  const [isContactListVisible, setIsContactListVisible] = useState(false);

  const handleSourceSelection = (source: "myInfo" | "contacts") => {
    if (source === "contacts") {
      setIsContactListVisible(true);
    } else {
      onSelectSource(source);
      setIsVisibleAutocompletar(false);
    }
  };

  return (
    <div className="AutocompletarModal_container">
      <div className="AutocompletarModal_box">
        <div className="close" onClick={() => setIsVisibleAutocompletar(false)}>
          <FaTimes />
        </div>
        <h3>Elija la fuente de Información</h3>
        <div>
          <button onClick={() => handleSourceSelection("myInfo")}>
            <FaBuilding /> Mi Información
          </button>
          <button onClick={() => handleSourceSelection("contacts")}>
            <FaUser /> Contactos
          </button>
        </div>
        {isContactListVisible && (
          <ContactList
            onSelectContact={(contact) => {
              onSelectSource("contacts", contact);
              setIsVisibleAutocompletar(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AutocompletarModal;
