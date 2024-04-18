import React, { useState } from "react";
import "./styles.scss";
import colors from "../../../assets/colors";
import Button from "../../button/Button";
import TextLine from "../../line/TextLine";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../../features/weather/weatherSlice";

function SearchForm() {
  const [cityName, setCityName] = useState("");
  const loading = useSelector((state) => state.weather.loading);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!cityName.trim()) {
      alert("Please enter a city name.");
      return;
    }
    dispatch(fetchWeather(cityName));
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          dispatch(fetchWeather(`${latitude},${longitude}`));
        },
        (error) => {
          console.error("Error getting current location:", error.message);
          alert("Error getting current location. Please try again later.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="search-form">
        <div className="form-row">
          <label htmlFor="cityInput" className="label-text">
            Enter a City Name
          </label>
        </div>
        <div className="form-row">
          <input
            type="text"
            id="cityInput"
            placeholder="E.g., New York, London, Tokyo"
            value={cityName}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-row">
          <Button
            type="button"
            label="Search"
            color={colors.cornflowerBlue}
            height="50px"
            width="370px"
            onClick={() => handleFormSubmit()}
          />
        </div>
        {/* <TextLine text="or" /> */}
      </form>
      <div className="form-row">
        <Button
          label="Use Current Location"
          color={colors.slateGrey}
          height="50px"
          width="370px"
          onClick={handleUseCurrentLocation}
        />
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default SearchForm;
