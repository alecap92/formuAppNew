import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaLink,
  FaHistory,
  FaPuzzlePiece,
  FaFileAlt,
  FaUser,
  FaBook,
  FaQuestionCircle,
  FaSignOutAlt,
  FaRocket,
  FaList,
} from "react-icons/fa";
import "./NavMenuStyles.css";
import { useDispatch } from "react-redux";
import { logout } from "../../contexts/features/authSlice";
import { addAlert } from "../../contexts/features/alertSlice";

const NavMenu: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    {
      section: "Mi Organización",
      items: [
        { name: "Organización", icon: <FaHome />, link: "/organizacion" },
        { name: "Conexiones API", icon: <FaLink />, link: "/conexion-api" },
      ],
    },
    {
      section: "Documentos y plantillas",
      items: [
        { name: "Historial", icon: <FaHistory />, link: "/historial" },
        {
          name: "Personalizados",
          icon: <FaPuzzlePiece />,
          link: "/personalizados",
        },
        { name: "Plantillas", icon: <FaFileAlt />, link: "/formatos" },
      ],
    },
    {
      section: "Datos y Autocompletado",
      items: [
        { name: "Ver Contactos", icon: <FaUser />, link: "/contactos" },
        {
          name: "Listas de Contactos",
          icon: <FaList />,
          link: "/contactos/listas",
        },
        {
          name: "Campos de formularios",
          icon: <FaBook />,
          link: "/campos-de-formularios",
        },
      ],
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      addAlert({
        id: new Date().toISOString(),
        message: "Sesión cerrada exitosamente",
        type: "success",
      })
    );
  };

  return (
    <div className="side-menu">
      <div className="side-menu">
        <div className="logo">
          <img src="/img/Logo-Horizontal-Blanco.png" alt="FormuApp Logo" />
        </div>
        <nav>
          <ul>
            {menuItems.map((menuSection, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <li className="menu-section-title">{menuSection.section}</li>
                {menuSection.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`menu-item ${
                      activeItem === item.link ? "active" : ""
                    }`}
                    onClick={() => setActiveItem(item.link)}
                  >
                    <Link to={item.link}>
                      {item.icon} <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "80%" }} />
      </div>
      <ul className="footer-section">
        <li>
          <FaRocket /> Lo Nuevo
        </li>
        <li>
          <FaQuestionCircle /> Ayuda y tutoriales
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
