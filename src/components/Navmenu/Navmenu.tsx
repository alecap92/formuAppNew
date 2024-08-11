import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaPuzzlePiece,
  FaFileAlt,
  FaBook,
  FaQuestionCircle,
  FaSignOutAlt,
  FaRocket,
  FaCogs,
  FaUsers,
} from "react-icons/fa";
import "./NavMenuStyles.css";
import { useDispatch } from "react-redux";
import { logout } from "../../contexts/features/authSlice";
import { addAlert } from "../../contexts/features/alertSlice";
import { logoutHandler } from "../../services/auth/authService";
import { setUser } from "../../contexts/features/userSlice";

const NavMenu: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      section: "Inicio",
      items: [{ name: "Dashboard", icon: <FaHome />, link: "/" }],
    },
    {
      section: "Documentos realizados",
      items: [{ name: "Historial", icon: <FaHistory />, link: "/historial" }],
    },
    {
      section: "Creacion",
      items: [
        { name: "Crear Documento", icon: <FaFileAlt />, link: "/formatos" },
      ],
    },
    {
      section: "Base de Datos ",
      items: [{ name: "Contactos", icon: <FaUsers />, link: "/contactos" }],
    },

    {
      section: "Configuración",
      items: [
        { name: "Mi Cuenta", icon: <FaCogs />, link: "/perfil" },
        {
          name: "Crear Plantillas",
          icon: <FaPuzzlePiece />,
          link: "/personalizados",
        },
        {
          name: "Campos personalizados",
          icon: <FaBook />,
          link: "/campos-de-formularios",
        },
      ],
    },
  ];

  const handleLogout = async () => {
    await logoutHandler();

    dispatch(logout());

    dispatch(
      setUser({
        _id: "",
        firstName: "",
        lastName: "",
        mobile: "",
        idType: "",
        idNumber: "",
        email: "",
        city: "",
        state: "",
        address: "",
        settings: {},
        phone: "",
        companyName: "",
        plan: {
          _id: "",
          name: "",
          monthlyDocuments: 0,
          templates: 0,
          price: 0,
        },
        documentsUsedThisMonth: 0,
        templatesUsed: 0,
      })
    );

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
      <div className="menu-content">
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
                  >
                    <Link
                      to={item.link}
                      onClick={() => setActiveItem(item.link)}
                    >
                      {item.icon} <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
      <div className="menu-footer">
        <div className="footer-hr">
          <hr />
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
    </div>
  );
};

export default NavMenu;
