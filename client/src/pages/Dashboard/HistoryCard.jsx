import React from "react";
import './Dashboard.css';
function HistoryCard({ symbol, activity, time }) {
  return (
    <div className="history-card">
      {symbol}
      <div>
        <h4>{activity}</h4>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default HistoryCard;
