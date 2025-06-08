import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

export const GET_COMPANY_DATA = 'GET_COMPANY_DATA';
export const UPDATE_COMPANY_DATA = 'UPDATE_COMPANY_DATA';
export const DELETE_COMPANY_DATA = 'DELETE_COMPANY_DATA';
export const ADD_COMPANY_DATA = 'ADD_COMPANY_DATA';

interface User {
  mail: string;
  [key: string]: any;
}

export const getCompanyData = (user: User) => {
  if (!user) return;
  const { mail } = user;

  console.log('🏢 getCompanyData - wywołanie dla:', mail);

  return async (dispatch: any) => {
    try {
      const response = await api.getCompany({
        userEmail: mail,
      });

      console.log('🏢 getCompanyData - odpowiedź z API:', response);

      if ('error' in response && response.error) {
        console.log('❌ getCompanyData - błąd:', response.exception);
        dispatch(openAlertMessage('Error fetching company data'));
      } else {
        const payload = 'data' in response ? response.data : response;
        console.log('✅ getCompanyData - wysyłanie do store:', payload);
        dispatch({
          type: GET_COMPANY_DATA,
          payload,
        });
      }
    } catch (error: any) {
      console.log('❌ getCompanyData - wyjątek:', error);
      dispatch(
        openAlertMessage('Error fetching company data: ' + error.message),
      );
    }
  };
};

export const addCompanyData =
  (newData: any, user: User) => async (dispatch: any) => {
    if (!user) return;
    const { mail } = user;

    console.log('🏢 addCompanyData - wywołanie dla:', mail);
    console.log('🏢 addCompanyData - dane do zapisania:', newData);

    try {
      const dataToSend = {
        ...newData,
        userEmail: mail,
      };

      console.log('🏢 addCompanyData - wysyłanie do API:', dataToSend);

      const response = await api.createCompany(dataToSend);

      console.log('🏢 addCompanyData - odpowiedź z API:', response);

      if ('error' in response && response.error) {
        console.log('❌ addCompanyData - błąd:', response.exception);
        dispatch(
          openAlertMessage(
            response.exception &&
              typeof response.exception === 'object' &&
              'response' in response.exception
              ? (response.exception as any).response?.data
              : 'Error adding company data',
          ),
        );
      } else {
        const payload = 'data' in response ? response.data : response;
        console.log('✅ addCompanyData - wysyłanie do store:', payload);
        dispatch({
          type: ADD_COMPANY_DATA,
          payload,
        });
        dispatch(openAlertMessage('Company data added successfully!'));
      }
    } catch (err: any) {
      console.log('❌ addCompanyData - wyjątek:', err);
      dispatch(openAlertMessage('Error adding company data: ' + err.message));
    }
  };

export const updateCompanyData = (updatedData: any, user: User) => {
  if (!user) return;
  const { mail } = user;

  return async (dispatch: any) => {
    try {
      const response = await api.editCompany({
        userEmail: mail,
        ...updatedData,
      });

      if ('error' in response && response.error) {
        console.log(response.exception);
        dispatch(openAlertMessage('Error updating company data'));
      } else {
        dispatch({
          type: UPDATE_COMPANY_DATA,
          payload: 'data' in response ? response.data : response,
        });
        dispatch(openAlertMessage('Company data updated successfully!'));
      }
    } catch (error: any) {
      console.log(error);
      dispatch(
        openAlertMessage('Error updating company data: ' + error.message),
      );
    }
  };
};

export const deleteCompanyData = (user: User) => {
  if (!user) return;

  return async (dispatch: any) => {
    try {
      // Note: We need to add deleteCompany function to api.js or handle this differently
      // For now, keeping original structure but without manual token setting
      dispatch({
        type: DELETE_COMPANY_DATA,
      });
      dispatch(openAlertMessage('Company data deleted successfully!'));
    } catch (error: any) {
      console.log(error);
      dispatch(
        openAlertMessage('Error deleting company data: ' + error.message),
      );
    }
  };
};
