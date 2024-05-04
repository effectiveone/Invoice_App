import * as api from '../../Shared/Utils/api';
import { openAlertMessage } from './alertActions';
import axios from 'axios';
export const authActions = {
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
};

export const getActions = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    loginAction: (userDetails, history) =>
      dispatch(loginAction(userDetails, history)),
    register: (userDetails, history) =>
      dispatch(register(userDetails, history)),
  };
};

const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');

    dispatch(setUserDetails(null));

    try {
      await axios.delete('http://localhost:5002/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const loginAction = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      history('/SettingsPage');
    }
  };
};

const register = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem('user', JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      history('/SettingsPage');
    }
  };
};
