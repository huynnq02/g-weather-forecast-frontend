import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
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
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;
export const fetchWeather = (cityName) => async (dispatch) => {
  dispatch(fetchWeatherStart());
  try {
    const response = await axios.get(
      `https://g-weather-forecast.onrender.com/api/v1/weather/?location=${cityName}`
    );
    const data = response.data;
    dispatch(fetchWeatherSuccess(data));
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};

export default weatherSlice.reducer;
