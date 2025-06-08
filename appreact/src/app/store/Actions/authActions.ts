import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const authActions = {
  SET_USER_DETAILS: 'AUTH.SET_USER_DETAILS',
};

interface UserDetails {
  email: string;
  password: string;
  name?: string;
}

interface NavigationFunction {
  (path: string): void;
}

export const getActions = (dispatch: Dispatch<any>) => {
  return {
    logout: () => dispatch(logout() as any),
    loginAction: (userDetails: UserDetails, history: NavigationFunction) =>
      dispatch(loginAction(userDetails, history) as any),
    register: (userDetails: UserDetails, history: NavigationFunction) =>
      dispatch(register(userDetails, history) as any),
  };
};

const logout = () => {
  return async (dispatch: Dispatch<any>) => {
    localStorage.removeItem('user');

    dispatch(setUserDetails(null));

    try {
      await axios.delete('http://localhost:5000/api/auth/logout');
    } catch (error) {
      console.error(error);
    }
  };
};

const setUserDetails = (userDetails: any) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const loginAction = (userDetails: UserDetails, history: NavigationFunction) => {
  return async (dispatch: Dispatch<any>) => {
    const response = await api.login(userDetails);
    console.log(response);
    if ('error' in response && response.error) {
      const errorMessage =
        (response as any)?.exception?.response?.data?.message ||
        (response as any)?.exception?.message ||
        'Błąd logowania';
      dispatch(openAlertMessage(errorMessage));
    } else {
      const { userDetails } = response;
      localStorage.setItem('user', JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      history('/dashboard');
    }
  };
};

const register = (userDetails: UserDetails, history: NavigationFunction) => {
  return async (dispatch: Dispatch<any>) => {
    const response = await api.register(userDetails);
    console.log(response);
    if ('error' in response && response.error) {
      const errorMessage =
        (response as any)?.exception?.response?.data?.message ||
        (response as any)?.exception?.message ||
        'Błąd rejestracji';
      dispatch(openAlertMessage(errorMessage));
    } else {
      const { userDetails } = response;
      localStorage.setItem('user', JSON.stringify(userDetails));

      dispatch(setUserDetails(userDetails));
      history('/dashboard');
    }
  };
};
