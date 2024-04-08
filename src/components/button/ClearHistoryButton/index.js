// ClearHistoryButton.js
import React from "react";
import { useDispatch } from "react-redux";
import { clearHistory } from "../../../features/weather/weatherSlice";

function ClearHistoryButton() {
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <button onClick={handleClearHistory} className="clear-history-button">
      Clear Search History
    </button>
  );
}

export default ClearHistoryButton;
