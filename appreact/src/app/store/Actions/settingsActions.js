import { openAlertMessage } from './alertActions';
import * as api from '../../../shared/api';

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';
export const UPDATE_SETTINGS_OPTIMISTIC = 'UPDATE_SETTINGS_OPTIMISTIC';
export const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

// Optimistic update action
export const updateSettingsOptimistic = (settingsData) => ({
  type: UPDATE_SETTINGS_OPTIMISTIC,
  payload: settingsData,
});

export const updateSettings = (settingsData, user) => async (dispatch) => {
  if (!user) {
    console.error('updateSettings: brak użytkownika');
    return Promise.reject(new Error('Brak użytkownika'));
  }

  console.log('updateSettings called with:', {
    settingsData,
    user: {
      mail: user.mail,
      username: user.username,
    },
  });

  dispatch({ type: UPDATE_SETTINGS_REQUEST });

  try {
    const response = await api.saveSettings(settingsData);

    console.log('updateSettings response:', response);

    if (response.error) {
      console.error('updateSettings error:', response);
      const errorMessage =
        response.exception?.response?.data || 'Error updating settings';

      dispatch({
        type: UPDATE_SETTINGS_FAILURE,
        error: response.exception?.message || 'Error updating settings',
      });

      // Nie pokazujemy automatycznych alertów sukcesu/błędu dla języka
      // Pozwalamy komponenkom na własną obsługę
      if (!settingsData.lang) {
        dispatch(openAlertMessage(errorMessage));
      }

      return Promise.reject(new Error(errorMessage));
    } else {
      console.log('updateSettings success:', response.data);

      dispatch({
        type: UPDATE_SETTINGS_SUCCESS,
        payload: response.data,
      });

      // Nie pokazujemy automatycznych alertów sukcesu dla języka
      if (!settingsData.lang) {
        dispatch(openAlertMessage('Ustawienia zostały zaktualizowane!'));
      }

      return Promise.resolve(response.data);
    }
  } catch (err) {
    console.error('updateSettings exception:', err);

    dispatch({
      type: UPDATE_SETTINGS_FAILURE,
      error: err.message,
    });

    // Nie pokazujemy automatycznych alertów błędu dla języka
    if (!settingsData.lang) {
      dispatch(
        openAlertMessage('Błąd podczas aktualizacji ustawień: ' + err.message),
      );
    }

    return Promise.reject(err);
  }
};

export const getSettings = (user) => async (dispatch) => {
  if (!user) return;
  const { mail } = user;

  dispatch({ type: GET_SETTINGS_REQUEST });
  try {
    const response = await api.getSettings({
      email: mail,
    });

    if (response.error) {
      dispatch({
        type: GET_SETTINGS_FAILURE,
        error: response.exception?.message || 'Error getting settings',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error getting settings',
        ),
      );
    } else {
      dispatch({
        type: GET_SETTINGS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error getting settings: ' + err.message));
  }
};
