import {
    CITY_FORECAST_REQUEST,
    CITY_FORECAST_SUCCESS,
    CITY_FORECAST_FAIL,
  } from "../types/cityForcastTypes";
  import { getCurrentCondition, getFiveDayWeather } from "../services/services";
  
  export const getCityForecast = (key, name, country) => async (dispatch) => {
    try {
      dispatch({ type: CITY_FORECAST_REQUEST });
  
      const days = await getFiveDayWeather(key);
      const currentCondition = await getCurrentCondition(key);
      const data = { days, key, name, country, currentCondition };
  
      dispatch({
        type: CITY_FORECAST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CITY_FORECAST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };