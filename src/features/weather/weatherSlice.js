import formatDate from "../../utils/formatDate.js";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SEARCH_HISTORY_KEY = "weatherSearchHistory";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
    history: loadSearchHistoryFromStorage(),
  },
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      console.log("====================================");
      console.log("Loading");
      console.log("====================================");
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log("Data:", state.data);
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateHistory: (state, action) => {
      const { currentWeather, futureWeather } = action.payload;
      const historyEntry = {
        currentWeather,
        futureWeather,
      };
      console.log("History entry:", historyEntry);
      state.history.push(historyEntry);
      saveSearchHistoryToStorage(state.history);
    },
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  updateHistory,
} = weatherSlice.actions;

function loadSearchHistoryFromStorage() {
  const historyJSON = localStorage.getItem(SEARCH_HISTORY_KEY);
  return historyJSON ? JSON.parse(historyJSON) : [];
}

function saveSearchHistoryToStorage(history) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

export const fetchWeather = (cityName) => async (dispatch) => {
  dispatch(fetchWeatherStart());
  try {
    const response = await axios.get(
      `https://g-weather-forecast.onrender.com/api/v1/weather/?location=${cityName}`
    );
    const data = response.data;
    dispatch(fetchWeatherSuccess(data));
    const location = data.data.location.name;
    const weatherData = data.data.current;
    const futureData = data.data.forecast.forecastday;

    const formattedData = {
      city: location,
      date: formatDate(weatherData.last_updated),
      temperature: weatherData.temp_c,
      wind: weatherData.wind_kph,
      humidity: weatherData.humidity,
      text: weatherData.condition.text,
      icon: weatherData.condition.icon,
    };

    const tempList = futureData.map((element) => ({
      city: location,
      date: element.date,
      temperature: element.day.avgtemp_c,
      wind: element.day.maxwind_kph,
      humidity: element.day.avghumidity,
      text: element.day.condition.text,
      icon: element.day.condition.icon,
    }));

    dispatch(
      updateHistory({
        currentWeather: formattedData,
        futureWeather: tempList,
      })
    );
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};

export default weatherSlice.reducer;
