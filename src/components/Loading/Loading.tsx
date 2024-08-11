import React from "react";
import "./LoadingStyles.css";

const Loading: React.FC = () => {
  return (
    <div className="loading_overlay">
      <div className="loading_content">
        <img src="/favicon.ico" alt="Loading icon" className="loading_icon" />
        <p className="loading_text">Espere</p>
        <div className="loading_dots">
          <div className="loading_dot"></div>
          <div className="loading_dot"></div>
          <div className="loading_dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
