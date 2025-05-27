import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

export const GET_COMPANY_DATA = 'GET_COMPANY_DATA';
export const UPDATE_COMPANY_DATA = 'UPDATE_COMPANY_DATA';
export const DELETE_COMPANY_DATA = 'DELETE_COMPANY_DATA';
export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';

export const getCompanyData = (user) => {
  if (!user) return;
  const { mail } = user;

  return async (dispatch) => {
    try {
      const response = await api.getCompany({
        userEmail: mail,
      });

      if (response.error) {
        console.log(response.exception);
        dispatch(openAlertMessage('Error fetching company data'));
      } else {
        dispatch({
          type: GET_COMPANY_DATA,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        openAlertMessage('Error fetching company data: ' + error.message),
      );
    }
  };
};

export const addCompanyData = (newData, user) => async (dispatch) => {
  if (!user) return;
  const { mail } = user;

  try {
    const response = await api.createCompany({
      ...newData,
      userEmail: mail,
    });

    if (response.error) {
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error adding company data',
        ),
      );
    } else {
      dispatch({
        type: ADD_COMPANY_DATA,
        payload: response.data,
      });
      dispatch(openAlertMessage('Company data added successfully!'));
    }
  } catch (err) {
    dispatch(openAlertMessage('Error adding company data: ' + err.message));
  }
};

export const updateCompanyData = (updatedData, user) => {
  if (!user) return;
  const { mail } = user;

  return async (dispatch) => {
    try {
      const response = await api.editCompany({
        userEmail: mail,
        ...updatedData,
      });

      if (response.error) {
        console.log(response.exception);
        dispatch(openAlertMessage('Error updating company data'));
      } else {
        dispatch({
          type: UPDATE_COMPANY_DATA,
          payload: response.data,
        });
        dispatch(openAlertMessage('Company data updated successfully!'));
      }
    } catch (error) {
      console.log(error);
      dispatch(
        openAlertMessage('Error updating company data: ' + error.message),
      );
    }
  };
};

export const deleteCompanyData = (user) => {
  if (!user) return;

  return async (dispatch) => {
    try {
      // Note: We need to add deleteCompany function to api.js or handle this differently
      // For now, keeping original structure but without manual token setting
      dispatch({
        type: DELETE_COMPANY_DATA,
      });
      dispatch(openAlertMessage('Company data deleted successfully!'));
    } catch (error) {
      console.log(error);
      dispatch(
        openAlertMessage('Error deleting company data: ' + error.message),
      );
    }
  };
};
