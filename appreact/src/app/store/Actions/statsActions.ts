import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';

interface User {
  mail: string;
  [key: string]: any;
}

export const fetchStatsRequest = () => {
  return {
    type: FETCH_STATS_REQUEST,
  };
};

export const fetchStatsSuccess = (stats: any) => {
  return {
    type: FETCH_STATS_SUCCESS,
    payload: stats,
  };
};

export const fetchStatsFailure = (error: string) => {
  return {
    type: FETCH_STATS_FAILURE,
    payload: error,
  };
};

export const fetchStats = (user: User) => async (dispatch: any) => {
  if (!user) return;

  const { mail } = user;
  dispatch(fetchStatsRequest());
  try {
    const response = await api.getInvoiceStats({
      userEmail: mail,
    });

    if ('error' in response && response.error) {
      dispatch(
        fetchStatsFailure(
          response.exception &&
            typeof response.exception === 'object' &&
            'message' in response.exception
            ? (response.exception as any).message
            : 'Error fetching stats',
        ),
      );
      dispatch(
        openAlertMessage(
          response.exception &&
            typeof response.exception === 'object' &&
            'response' in response.exception
            ? (response.exception as any).response?.data
            : 'Error fetching stats',
        ),
      );
    } else {
      dispatch(
        fetchStatsSuccess('data' in response ? response.data : response),
      );
    }
  } catch (err: any) {
    dispatch(fetchStatsFailure(err.message));
    dispatch(openAlertMessage('Error fetching stats: ' + err.message));
  }
};
