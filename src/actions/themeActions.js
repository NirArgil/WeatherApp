import { TOGGLE_DARK_MODE } from "../types/themeTypes";
import { TOGGLE_TEMP_VALUE } from "../types/themeTypes";

export const toggleDarkMode = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_DARK_MODE });
  localStorage.setItem("theme", JSON.stringify(getState().theme));
};

export const toggleTempValue = () => (dispatch, getState) => {
  dispatch({ type: TOGGLE_TEMP_VALUE });
  localStorage.setItem("theme", JSON.stringify(getState().theme));
};