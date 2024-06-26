import React from "react";
import "./ProgressBarStyles.css";

interface ProgressBarProps {
  used: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ used, total }) => {
  const percentage = (used / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-bar-text">
        {used}/{total}
      </div>
    </div>
  );
};

export default ProgressBar;
