import axios from "axios";
import { openAlertMessage } from "./alertActions";
export const FETCH_STATS_REQUEST = "FETCH_STATS_REQUEST";
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";
export const FETCH_STATS_FAILURE = "FETCH_STATS_FAILURE";

export const fetchStatsRequest = () => {
  return {
    type: FETCH_STATS_REQUEST,
  };
};

export const fetchStatsSuccess = (stats) => {
  return {
    type: FETCH_STATS_SUCCESS,
    payload: stats,
  };
};

export const fetchStatsFailure = (error) => {
  return {
    type: FETCH_STATS_FAILURE,
    payload: error,
  };
};

export const fetchStats = (user) => async (dispatch) => {
  if (!user) return;

  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch(fetchStatsRequest());
  try {
    const statsRes = await axios.post(`http://localhost:5002/api/auth/stats`, {
      userEmail: mail,
    });
    const stats = statsRes.data;

    dispatch(fetchStatsSuccess(stats));
  } catch (err) {
    dispatch(fetchStatsFailure(err.message));
    dispatch(openAlertMessage("Error fetching stats: " + err.message));
  }
};
