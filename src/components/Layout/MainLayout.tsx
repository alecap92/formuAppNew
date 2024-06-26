import React from "react";
import NavMenu from "../Navmenu/Navmenu";
import "./MainLayoutStyles.css";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container">
      <div className="navMenu">
        <NavMenu />
      </div>
      <main className="content">{children}</main>
    </div>
  );
};

export default MainLayout;
