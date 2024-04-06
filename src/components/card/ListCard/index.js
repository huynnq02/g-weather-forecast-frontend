import React, { useState } from "react";
import "./styles.scss";
import FutureDayWeatherCard from "../FutureDayWeatherCard";
function FutureWeatherList({ weatherData }) {
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(true);
  };

  if (!weatherData || !Array.isArray(weatherData) || weatherData.length === 0) {
    return null;
  }

  let itemsToDisplay = weatherData;
  if (!showAll && weatherData.length > 4) {
    itemsToDisplay = weatherData.slice(0, 4);
  }

  return (
    <div>
      <label htmlFor="cityInput" className="label-text">
        4 - Day Forecast
      </label>
      <div className="future-weather-list">
        {itemsToDisplay.map((dayData, index) => (
          <FutureDayWeatherCard
            key={index}
            city={dayData.city}
            date={dayData.date}
            temperature={dayData.temperature}
            wind={dayData.wind}
            humidity={dayData.humidity}
            text={dayData.text}
            icon={dayData.icon}
          />
        ))}
        {!showAll && (
          <button onClick={handleClick} className="more-button">
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default FutureWeatherList;
