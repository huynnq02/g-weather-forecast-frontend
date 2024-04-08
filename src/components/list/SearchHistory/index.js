// SearchHistory.js
import React from "react";
import HistoryCard from "../../card/HistoryCard";
import "./styles.scss";

function SearchHistory({ history, onHistoryCardClick }) {
  return (
    <div className="history-container">
      <h2>Search History</h2>
      {history.length === 0 && <p>No search history available.</p>}
      {history.length > 0 && <p>Click a card to view weather info.</p>}
      {history.map((entry, index) => (
        <HistoryCard
          key={index}
          location={entry.currentWeather.city}
          searchTime={entry.searchTime}
          onClick={() => onHistoryCardClick(entry)}
        />
      ))}
    </div>
  );
}

export default SearchHistory;
