// jpkActions.js

import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const GET_JPK_REQUEST = "GET_JPK_REQUEST";
export const GET_JPK_SUCCESS = "GET_JPK_SUCCESS";
export const GET_JPK_FAILURE = "GET_JPK_FAILURE";

export const SEND_JPK_REQUEST = "SEND_JPK_REQUEST";
export const SEND_JPK_SUCCESS = "SEND_JPK_SUCCESS";
export const SEND_JPK_FAILURE = "SEND_JPK_FAILURE";

export const getJPK = (user) => async (dispatch) => {
  if (!user) return;
  const { token, mail } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: GET_JPK_REQUEST });
  try {
    const res = await axios.post("http://localhost:5002/api/auth/jpk", {
      userEmail: mail,
    });
    dispatch({
      type: GET_JPK_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_JPK_FAILURE,
      error: err.message,
    });
  }
};

export const sendJPK =
  (user, selectedYear, selectedMonth) => async (dispatch) => {
    if (!user) return;
    const { token, mail } = user;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: SEND_JPK_REQUEST });
    try {
      const res = await axios.post("http://localhost:5002/api/auth/send-jpk", {
        userEmail: mail,
        selectedYear,
        selectedMonth,
      });
      dispatch({
        type: SEND_JPK_SUCCESS,
        payload: res.data,
      });
      dispatch(openAlertMessage(res.data));
    } catch (err) {
      dispatch({
        type: SEND_JPK_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage(err.message));
    }
  };
