import React from "react";
import "./styles.scss";
import formatTime from "../../../utils/formatTime";

function HistoryCard({ location, searchTime, onClick }) {
  const formattedTime = formatTime(searchTime);

  return (
    <div className="history-card" onClick={onClick}>
      <div className="location">{location}</div>
      <div className="search-time">{formattedTime}</div>
    </div>
  );
}

export default HistoryCard;
