import * as api from '../../api';
import { openAlertMessage } from './alertActions';

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';

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

  const { mail } = user;
  dispatch(fetchStatsRequest());
  try {
    const response = await api.getInvoiceStats({
      userEmail: mail,
    });

    if (response.error) {
      dispatch(
        fetchStatsFailure(
          response.exception?.message || 'Error fetching stats',
        ),
      );
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error fetching stats',
        ),
      );
    } else {
      dispatch(fetchStatsSuccess(response.data));
    }
  } catch (err) {
    dispatch(fetchStatsFailure(err.message));
    dispatch(openAlertMessage('Error fetching stats: ' + err.message));
  }
};
