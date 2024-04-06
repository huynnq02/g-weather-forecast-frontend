import React, { useState } from "react";
import "./styles.scss";
import FutureDayWeatherCard from "./FutureDayWeatherCard"; // Assuming the component is in the same directory

function FutureWeatherList({ weatherData }) {
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(true); 
  };

  if (!weatherData || weatherData.length === 0) {
    return null; 
  }

  let itemsToDisplay = weatherData;
  if (!showAll) {
    itemsToDisplay = weatherData.slice(0, 4); 
  }

  return (
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
          weatherIconUrl={dayData.weatherIconUrl}
        />
      ))}
      {!showAll && (
        <button onClick={handleClick} className="more-button">
          More
        </button>
      )}
    </div>
  );
}

export default FutureWeatherList;
