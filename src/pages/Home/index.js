import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import "./styles.scss";
import CurrentDayWeatherCard from "../../components/card/CurrentDayWeatherCard";
import SearchForm from "../../components/form/SearchForm";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import FutureDayWeatherCard from "../../components/card/FutureDayWeatherCard";

function Home() {
  const weatherData = useSelector(
    (state) => state.weather?.data?.data?.current
  );
  const location = useSelector(
    (state) => state.weather?.data?.data?.location?.name
  );
  const futureData = useSelector(
    (state) => state.weather?.data?.data.forecast?.forecastday[0]
  );
  const [data, setData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    if (weatherData && futureData) {
      // console.log("Weather Data:", weatherData);
      // console.log("location:", location);
      console.log(
        "Future:",

        futureData
      );

      const formattedData = {
        city: location,
        date: formatDate(weatherData?.last_updated),
        temperature: weatherData?.temp_c,
        wind: weatherData?.wind_kph,
        humidity: weatherData?.humidity,
        text: weatherData?.condition?.text,
        icon: weatherData?.condition?.icon,
      };
      const formattedListData = {
        city: location,
        date: futureData?.date,
        temperature: futureData?.day?.avgtemp_c,
        wind: futureData?.day?.maxwind_kph,
        humidity: futureData?.day?.avghumidity,
        text: futureData?.day?.condition?.text,
        icon: futureData?.day?.condition?.icon,
      };
      setData(formattedData);
      setListData(formattedListData);
      console.log(formattedListData);
    }
  }, [weatherData, location, futureData]);

  return (
    <div className="home-dashboard">
      <HomeHeader />
      <div className="home-body">
        <SearchForm />
        <CurrentDayWeatherCard {...data} />
      </div>
      <FutureDayWeatherCard {...listData} />
    </div>
  );
}

export default Home;
