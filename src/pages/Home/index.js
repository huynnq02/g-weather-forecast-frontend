import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import "./styles.scss";
import CurrentDayWeatherCard from "../../components/card/CurrentDayWeatherCard";
import SearchForm from "../../components/form/SearchForm";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import FutureWeatherList from "../../components/card/ListCard";

function Home() {
  const weatherData = useSelector(
    (state) => state.weather?.data?.data?.current
  );
  const location = useSelector(
    (state) => state.weather?.data?.data?.location?.name
  );
  const futureData = useSelector(
    (state) => state.weather?.data?.data.forecast?.forecastday
  );
  const [data, setData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    if (weatherData && futureData) {
      const formattedData = {
        city: location,
        date: formatDate(weatherData?.last_updated),
        temperature: weatherData?.temp_c,
        wind: weatherData?.wind_kph,
        humidity: weatherData?.humidity,
        text: weatherData?.condition?.text,
        icon: weatherData?.condition?.icon,
      };
      const tempList = futureData.map((element) => ({
        city: location,
        date: element?.date,
        temperature: element?.day?.avgtemp_c,
        wind: element?.day?.maxwind_kph,
        humidity: element?.day?.avghumidity,
        text: element?.day?.condition?.text,
        icon: element?.day?.condition?.icon,
      }));
      setData(formattedData);
      setListData(tempList);
    }
  }, [weatherData, location, futureData]);

  return (
    <div className="home-dashboard">
      <HomeHeader />
      <div className="home-body">
        <div className="form-container">
          <SearchForm />
        </div>
        <div className="weather-container">
          <CurrentDayWeatherCard {...data} />
          <FutureWeatherList weatherData={listData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
