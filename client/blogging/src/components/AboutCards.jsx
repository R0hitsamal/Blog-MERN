import React from "react";
import "../pages/Dashboard/Dashboard.css";

function AboutCards({ title, counts, description, symbol }) {
  return (
    <div className="about-card">
      <div className="about-card-header">
        <h2>{title}</h2>
        {symbol}
      </div>
      <h1>{counts}</h1>
      <p>{description}</p>
    </div>
  );
}

export default AboutCards;