import React from "react";
import "./styles.scss";
function CurrentDayWeatherCard({
  city,
  date,
  temperature,
  wind,
  humidity,
  text,
  weatherIconUrl,
}) {
  if (!city || !date || !temperature || !wind || !humidity) {
    return null;
  }

  return (
    <div className="current-weather-card">
      <div className="weather-info">
        <h2>
          {city} ({date})
        </h2>
        <p>Temperature: {temperature}°C</p>
        <p>Wind: {wind} M/S</p>
        <p>Humidity: {humidity}%</p>
      </div>
      <div className="weather-icon">
        <img src={weatherIconUrl} alt={text} />
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CurrentDayWeatherCard;
