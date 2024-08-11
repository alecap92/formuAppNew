import React from "react";
import "./PlanBannerStyles.css";

const PlanBanner = () => {
  return (
    <div className="PlanBanner_Container">
      <h3>
        Has alcanzado el limite mensual de formularios o plantillas en tu
        cuenta. Debes adquirir un plan.
      </h3>
      <button>Adquirir Plan</button>
    </div>
  );
};

export default PlanBanner;
