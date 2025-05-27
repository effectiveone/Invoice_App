import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

export const GET_CONTRACTOR_DATA = 'GET_CONTRACTOR_DATA';
export const ADD_CONTRACTOR_DATA = 'ADD_CONTRACTOR_DATA';
export const UPDATE_CONTRACTOR_DATA = 'UPDATE_CONTRACTOR_DATA';
export const UPDATE_CONTRACTOR_DATA_SUCCESS = 'UPDATE_CONTRACTOR_DATA_SUCCESS';
export const UPDATE_CONTRACTOR_DATA_FAILURE = 'UPDATE_CONTRACTOR_DATA_FAILURE';
export const DELETE_CONTRACTOR_REQUEST = 'DELETE_CONTRACTOR_REQUEST';
export const DELETE_CONTRACTOR_SUCCESS = 'DELETE_CONTRACTOR_SUCCESS';
export const DELETE_CONTRACTOR_FAILURE = 'DELETE_CONTRACTOR_FAILURE';

export const getContractorData = (user) => {
  if (!user) return;
  const { mail } = user;

  return async (dispatch) => {
    try {
      const response = await api.getKontrahent({
        userEmail: mail,
      });

      if (response.error) {
        console.log(response.exception);
        dispatch(openAlertMessage('Error fetching contractor data'));
      } else {
        dispatch({
          type: GET_CONTRACTOR_DATA,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        openAlertMessage('Error fetching contractor data: ' + error.message),
      );
    }
  };
};

export const addContractorData = (newData, user) => async (dispatch) => {
  if (!user) return;

  try {
    const response = await api.createKontrahent({
      ...newData,
      userEmail: user.mail,
    });

    if (response.error) {
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error adding contractor',
        ),
      );
    } else {
      dispatch({
        type: ADD_CONTRACTOR_DATA,
        payload: response.data,
      });
      dispatch(openAlertMessage('Contractor added successfully!'));
    }
  } catch (err) {
    dispatch(openAlertMessage('Error adding contractor: ' + err.message));
  }
};

export const updateContractorData =
  (updatedData, paramsId, user) => async (dispatch) => {
    if (!user) return;

    dispatch({ type: UPDATE_CONTRACTOR_DATA });
    try {
      const response = await api.editKontrahent({
        ...updatedData,
        id: paramsId,
        userEmail: user.mail,
      });

      if (response.error) {
        dispatch({
          type: UPDATE_CONTRACTOR_DATA_FAILURE,
          payload: response.exception?.message,
        });
        dispatch(
          openAlertMessage(
            response.exception?.response?.data || 'Error updating contractor',
          ),
        );
      } else {
        dispatch({
          type: UPDATE_CONTRACTOR_DATA_SUCCESS,
          payload: response.data,
        });
        dispatch(openAlertMessage('Contractor updated successfully!'));
      }
    } catch (err) {
      dispatch({ type: UPDATE_CONTRACTOR_DATA_FAILURE, payload: err.message });
      dispatch(openAlertMessage('Error updating contractor: ' + err.message));
    }
  };

export const deleteContractor = (paramsId, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: DELETE_CONTRACTOR_REQUEST });
  try {
    const response = await api.deleteKontrahent(paramsId);

    if (response.error) {
      dispatch({
        type: DELETE_CONTRACTOR_FAILURE,
        payload: response.exception?.message,
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error deleting contractor',
        ),
      );
    } else {
      dispatch({
        type: DELETE_CONTRACTOR_SUCCESS,
        payload: paramsId,
      });
      dispatch(openAlertMessage('Contractor deleted successfully!'));
    }
  } catch (err) {
    dispatch({ type: DELETE_CONTRACTOR_FAILURE, payload: err.message });
    dispatch(openAlertMessage('Error deleting contractor: ' + err.message));
  }
};
