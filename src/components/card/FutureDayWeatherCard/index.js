import React from "react";
import "./styles.scss";
function FutureDayWeatherCard({
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
    <div className="future-weather-card">
      <div className="weather-info">
        <h2>({date})</h2>
        <img className="icon-weather" src={weatherIconUrl} alt={text} />
        <p>Temp: {temperature}°C</p>
        <p>Wind: {wind} M/S</p>
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
}

export default FutureDayWeatherCard;
