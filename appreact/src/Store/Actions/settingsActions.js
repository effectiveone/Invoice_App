import { openAlertMessage } from "./alertActions";
import axios from "axios";

export const UPDATE_SETTINGS_REQUEST = "UPDATE_SETTINGS_REQUEST";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const UPDATE_SETTINGS_FAILURE = "UPDATE_SETTINGS_FAILURE";
export const GET_SETTINGS_REQUEST = "GET_SETTINGS_REQUEST";
export const GET_SETTINGS_SUCCESS = "GET_SETTINGS_SUCCESS";
export const GET_SETTINGS_FAILURE = "GET_SETTINGS_FAILURE";

export const updateSettings = (settingsData, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: UPDATE_SETTINGS_REQUEST });
  try {
    const res = await axios.put(
      "http://localhost:5002/api/auth/settings",
      settingsData
    );
    dispatch({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Settings updated successfully!"));
  } catch (err) {
    dispatch({
      type: UPDATE_SETTINGS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error updating settings: " + err.message));
  }
};

export const getSettings = (user) => async (dispatch) => {
  if (!user) return;
  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: GET_SETTINGS_REQUEST });
  try {
    const res = await axios.post("http://localhost:5002/api/auth/settings", {
      email: mail,
    });
    dispatch({
      type: GET_SETTINGS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error getting settings: " + err.message));
  }
};
