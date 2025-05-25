// jpkActions.js

import * as api from '../../api';
import { openAlertMessage } from './alertActions';

export const GET_JPK_REQUEST = 'GET_JPK_REQUEST';
export const GET_JPK_SUCCESS = 'GET_JPK_SUCCESS';
export const GET_JPK_FAILURE = 'GET_JPK_FAILURE';

export const SEND_JPK_REQUEST = 'SEND_JPK_REQUEST';
export const SEND_JPK_SUCCESS = 'SEND_JPK_SUCCESS';
export const SEND_JPK_FAILURE = 'SEND_JPK_FAILURE';

export const getJPK = (user) => async (dispatch) => {
  if (!user) return;
  const { mail } = user;

  dispatch({ type: GET_JPK_REQUEST });
  try {
    const response = await api.getJpkData({
      userEmail: mail,
    });

    if (response.error) {
      dispatch({
        type: GET_JPK_FAILURE,
        error: response.exception?.message || 'Error getting JPK data',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error getting JPK data',
        ),
      );
    } else {
      dispatch({
        type: GET_JPK_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_JPK_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error getting JPK data: ' + err.message));
  }
};

export const sendJPK =
  (user, selectedYear, selectedMonth) => async (dispatch) => {
    if (!user) return;
    const { mail } = user;

    dispatch({ type: SEND_JPK_REQUEST });
    try {
      const response = await api.getJpkXml({
        userEmail: mail,
        selectedYear,
        selectedMonth,
      });

      if (response.error) {
        dispatch({
          type: SEND_JPK_FAILURE,
          error: response.exception?.message || 'Error sending JPK',
        });
        dispatch(
          openAlertMessage(
            response.exception?.response?.data || 'Error sending JPK',
          ),
        );
      } else {
        dispatch({
          type: SEND_JPK_SUCCESS,
          payload: response.data,
        });
        dispatch(openAlertMessage(response.data));
      }
    } catch (err) {
      dispatch({
        type: SEND_JPK_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error sending JPK: ' + err.message));
    }
  };
