import React, { useState, useRef, useEffect } from "react";
import "./FieldsModalStyles.css";
import { getUser, updateUserFields } from "../../../services/api";
import { useDispatch } from "react-redux";
import { addAlert } from "../../../contexts/features/alertSlice";
import { setUser } from "../../../contexts/features/userSlice";
import { setLoading } from "../../../contexts/features/loadingSlice";

interface FieldsModalProps {
  searchTerm: string;
  handleSelect: (key: string) => void;
  setShowModal: (show: boolean) => void;
}

const FieldsModal: React.FC<FieldsModalProps> = ({
  searchTerm,
  handleSelect,
  setShowModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [availableProperties, setAvailableProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        setAvailableProperties(user.settings.contactProperties);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const filtered = availableProperties.filter((property: any) =>
      property.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, availableProperties]);

  const handleCreateNew = async () => {
    if (!searchTerm.trim()) {
      alert("El nombre del campo no puede estar vacío.");
      return;
    }

    const newProperty = {
      key: searchTerm,
      type: "Text",
      value: "",
    };

    try {
      dispatch(setLoading(true));
      const updatedSettings = {
        contactProperties: [...availableProperties, newProperty],
      };

      await updateUserFields(updatedSettings);

      const user = await getUser();
      setAvailableProperties(user.settings.contactProperties);

      handleSelect(searchTerm);
      setShowModal(false);

      dispatch(
        setUser({
          ...user,
          settings: {
            ...user.settings,
            contactProperties: updatedSettings.contactProperties,
          },
        })
      );
      dispatch(setLoading(false));

      dispatch(
        addAlert({
          message: "Campo creado con éxito",
          type: "success",
          id: Date.now().toString(),
        })
      );
    } catch (error) {
      console.error("Error updating user fields:", error);
      dispatch(
        addAlert({
          message: "Error al crear el campo",
          type: "error",
          id: Date.now().toString(),
        })
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  return (
    <div className="FieldsModalStyles_Container" ref={modalRef}>
      <ul className="FieldsModalStyles_List">
        {filteredProperties.map((property: any) => (
          <li
            key={property.key}
            onClick={() => {
              handleSelect(property.key);
              setShowModal(false);
            }}
          >
            {property.key}
          </li>
        ))}
        <li onClick={handleCreateNew}>Crear "{searchTerm}"</li>
      </ul>
    </div>
  );
};

export default FieldsModal;
