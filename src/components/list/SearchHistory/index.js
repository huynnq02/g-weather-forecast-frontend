import React from "react";
import "./styles.scss";

function SearchHistory({ history }) {
  return (
    <div className="history-container">
      <h2>Search History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry.currentWeather.city}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchHistory;
