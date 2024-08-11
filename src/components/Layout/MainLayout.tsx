import React, { useEffect, useState } from "react";
import NavMenu from "../Navmenu/Navmenu";
import "./MainLayoutStyles.css";
import PlanBanner from "../PlanBanner/PlanBanner";
import { checkPlanStatus } from "../../services/api";

interface PlanStatus {
  valid: boolean;
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planStatus, setPlanStatus] = useState<PlanStatus>({ valid: true });
  const fetchPlanStatus = async () => {
    const response = await checkPlanStatus();
    setPlanStatus(response);
  };

  useEffect(() => {
    fetchPlanStatus();
  }, []);

  return (
    <div className="container">
      <div className="navMenu">
        <NavMenu />
      </div>
      <div className="content">
        {!planStatus?.valid && <PlanBanner />}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
