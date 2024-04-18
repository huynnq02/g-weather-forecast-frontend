import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import "./styles.scss";
import CurrentDayWeatherCard from "../../components/card/CurrentDayWeatherCard";
import SearchForm from "../../components/form/SearchForm";
import { useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import FutureWeatherList from "../../components/card/ListCard";
import SearchHistory from "../../components/list/SearchHistory";
import ClearHistoryButton from "../../components/button/ClearHistoryButton";
import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const subscribeToWeatherUpdates = async (email, location) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}subscription/send-email`,
      {
        email,
        location,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error subscribing to weather updates:", error);
    return false;
  }
};

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
  const history = useSelector((state) => state.weather?.history);

  const [data, setData] = useState({});
  const [listData, setListData] = useState({});
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [subscriptionLocation, setSubscriptionLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHistoryCardClick = (selectedHistory) => {
    setData(selectedHistory.currentWeather);
    setListData(selectedHistory.futureWeather);
  };

  const handleSubscription = async () => {
    setLoading(true);

    const success = await subscribeToWeatherUpdates(
      email,
      subscriptionLocation
    );
    setLoading(false);

    if (success) {
      alert(
        "We've sent you an email confirmation. Click the link in the email to confirm."
      );
      setShowSubscriptionPopup(false);
    } else {
      alert("Subscription failed. Please try again later.");
    }
  };

  useEffect(() => {
    if (weatherData && futureData && history) {
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
      console.log(history);
    }
  }, [weatherData, location, futureData, history]);

  return (
    <div className="home-dashboard">
      <HomeHeader />
      <div className="home-body">
        <div className="form-container">
          <SearchForm />
          <div className="subscription-text">
            <button
              onClick={() => setShowSubscriptionPopup(true)}
              className="text-button"
            >
              Want to receive updates of weather every day? Click here
            </button>
          </div>
          {showSubscriptionPopup && (
            <div className="subscription-popup">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your location"
                value={subscriptionLocation}
                onChange={(e) => setSubscriptionLocation(e.target.value)}
              />
              <button onClick={handleSubscription}>
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          )}
          {history.length > 0 && <ClearHistoryButton />}
          <SearchHistory
            history={history}
            onHistoryCardClick={handleHistoryCardClick}
          />
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
