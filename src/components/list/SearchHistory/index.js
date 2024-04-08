// SearchHistory.js
import React from "react";
import HistoryCard from "../../card/HistoryCard";
import "./styles.scss";

function SearchHistory({ history, onHistoryCardClick }) {
  const reversedHistory = [...history].reverse();

  return (
    <div className="history-container">
      <h2>Search History</h2>
      {reversedHistory.length === 0 && <p>No search history available.</p>}
      {reversedHistory.length > 0 && <p>Click a card to view weather info.</p>}
      {reversedHistory.map((entry, index) => (
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
