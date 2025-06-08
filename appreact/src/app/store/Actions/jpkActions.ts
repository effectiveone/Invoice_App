// jpkActions.ts

import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';
import { Dispatch } from 'redux';

export const GET_JPK_REQUEST = 'GET_JPK_REQUEST';
export const GET_JPK_SUCCESS = 'GET_JPK_SUCCESS';
export const GET_JPK_FAILURE = 'GET_JPK_FAILURE';

export const SEND_JPK_REQUEST = 'SEND_JPK_REQUEST';
export const SEND_JPK_SUCCESS = 'SEND_JPK_SUCCESS';
export const SEND_JPK_FAILURE = 'SEND_JPK_FAILURE';

interface User {
  mail: string;
  [key: string]: any;
}

export const getJPK = (user: User) => async (dispatch: Dispatch<any>) => {
  if (!user) return;
  const { mail } = user;

  dispatch({ type: GET_JPK_REQUEST });
  try {
    const response = await api.getJpkData({
      userEmail: mail,
    });

    if ('error' in response && response.error) {
      dispatch({
        type: GET_JPK_FAILURE,
        error: (response as any).exception?.message || 'Error getting JPK data',
      });
      const errorMessage =
        (response as any).exception?.response?.data?.message ||
        (response as any).exception?.message ||
        'Error getting JPK data';
      dispatch(openAlertMessage(errorMessage));
    } else {
      dispatch({
        type: GET_JPK_SUCCESS,
        payload: (response as any).data,
      });
    }
  } catch (err: any) {
    dispatch({
      type: GET_JPK_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error getting JPK data: ' + err.message));
  }
};

export const sendJPK =
  (user: User, selectedYear: number, selectedMonth: number) =>
  async (dispatch: Dispatch<any>) => {
    if (!user) return;
    const { mail } = user;

    dispatch({ type: SEND_JPK_REQUEST });
    try {
      const response = await api.getJpkXml({
        userEmail: mail,
        selectedYear,
        selectedMonth,
      });

      if ('error' in response && response.error) {
        dispatch({
          type: SEND_JPK_FAILURE,
          error: (response as any).exception?.message || 'Error sending JPK',
        });
        const errorMessage =
          (response as any).exception?.response?.data?.message ||
          (response as any).exception?.message ||
          'Error sending JPK';
        dispatch(openAlertMessage(errorMessage));
      } else {
        dispatch({
          type: SEND_JPK_SUCCESS,
          payload: (response as any).data,
        });
        const successMessage =
          (response as any).data?.message ||
          (response as any).data ||
          'JPK sent successfully';
        dispatch(
          openAlertMessage(
            typeof successMessage === 'string'
              ? successMessage
              : 'JPK sent successfully',
          ),
        );
      }
    } catch (err: any) {
      dispatch({
        type: SEND_JPK_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error sending JPK: ' + err.message));
    }
  };
