import React from "react";
import "../pages/Dashboard/Dashboard.css";

function QuickActionsCard({ title, description, button, symbol }) {
  return (
    <div className="quick-card">
      <div className="quick-card-header">
        <h2>{title}</h2>
        {symbol}
      </div>
      <p>{description}</p>
      <button>{button}</button>
    </div>
  );
}

export default QuickActionsCard;
