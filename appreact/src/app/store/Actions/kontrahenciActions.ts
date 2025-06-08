import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';
import { Dispatch } from 'redux';

export const GET_CONTRACTOR_DATA = 'GET_CONTRACTOR_DATA';
export const ADD_CONTRACTOR_DATA = 'ADD_CONTRACTOR_DATA';
export const UPDATE_CONTRACTOR_DATA = 'UPDATE_CONTRACTOR_DATA';
export const UPDATE_CONTRACTOR_DATA_SUCCESS = 'UPDATE_CONTRACTOR_DATA_SUCCESS';
export const UPDATE_CONTRACTOR_DATA_FAILURE = 'UPDATE_CONTRACTOR_DATA_FAILURE';
export const DELETE_CONTRACTOR_REQUEST = 'DELETE_CONTRACTOR_REQUEST';
export const DELETE_CONTRACTOR_SUCCESS = 'DELETE_CONTRACTOR_SUCCESS';
export const DELETE_CONTRACTOR_FAILURE = 'DELETE_CONTRACTOR_FAILURE';

interface User {
  mail: string;
  [key: string]: any;
}

interface ContractorData {
  [key: string]: any;
}

export const getContractorData = (user: User) => {
  if (!user) return;
  const { mail } = user;

  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await api.getKontrahent({
        userEmail: mail,
      });

      if ('error' in response && response.error) {
        console.log((response as any).exception);
        dispatch(openAlertMessage('Error fetching contractor data'));
      } else {
        dispatch({
          type: GET_CONTRACTOR_DATA,
          payload: (response as any).data,
        });
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        openAlertMessage('Error fetching contractor data: ' + error.message),
      );
    }
  };
};

export const addContractorData =
  (newData: ContractorData, user: User) => async (dispatch: Dispatch<any>) => {
    if (!user) return;

    try {
      const response = await api.createKontrahent({
        ...newData,
        userEmail: user.mail,
      });

      if ('error' in response && response.error) {
        dispatch(
          openAlertMessage(
            (response as any).exception?.response?.data ||
              'Error adding contractor',
          ),
        );
      } else {
        dispatch({
          type: ADD_CONTRACTOR_DATA,
          payload: (response as any).data,
        });
        dispatch(openAlertMessage('Contractor added successfully!'));
      }
    } catch (err: any) {
      dispatch(openAlertMessage('Error adding contractor: ' + err.message));
    }
  };

export const updateContractorData =
  (updatedData: ContractorData, paramsId: string, user: User) =>
  async (dispatch: Dispatch<any>) => {
    if (!user) return;

    dispatch({ type: UPDATE_CONTRACTOR_DATA });
    try {
      const response = await api.editKontrahent({
        ...updatedData,
        id: paramsId,
        userEmail: user.mail,
      });

      if ('error' in response && response.error) {
        dispatch({
          type: UPDATE_CONTRACTOR_DATA_FAILURE,
          payload: (response as any).exception?.message,
        });
        dispatch(
          openAlertMessage(
            (response as any).exception?.response?.data ||
              'Error updating contractor',
          ),
        );
      } else {
        dispatch({
          type: UPDATE_CONTRACTOR_DATA_SUCCESS,
          payload: (response as any).data,
        });
        dispatch(openAlertMessage('Contractor updated successfully!'));
      }
    } catch (err: any) {
      dispatch({ type: UPDATE_CONTRACTOR_DATA_FAILURE, payload: err.message });
      dispatch(openAlertMessage('Error updating contractor: ' + err.message));
    }
  };

export const deleteContractor =
  (paramsId: string, user: User) => async (dispatch: Dispatch<any>) => {
    if (!user) return;

    dispatch({ type: DELETE_CONTRACTOR_REQUEST });
    try {
      const response = await api.deleteKontrahent(paramsId, user.mail);

      if ('error' in response && response.error) {
        dispatch({
          type: DELETE_CONTRACTOR_FAILURE,
          payload: (response as any).exception?.message,
        });
        dispatch(
          openAlertMessage(
            (response as any).exception?.response?.data ||
              'Error deleting contractor',
          ),
        );
      } else {
        dispatch({
          type: DELETE_CONTRACTOR_SUCCESS,
          payload: paramsId,
        });
        dispatch(openAlertMessage('Contractor deleted successfully!'));
      }
    } catch (err: any) {
      dispatch({ type: DELETE_CONTRACTOR_FAILURE, payload: err.message });
      dispatch(openAlertMessage('Error deleting contractor: ' + err.message));
    }
  };
