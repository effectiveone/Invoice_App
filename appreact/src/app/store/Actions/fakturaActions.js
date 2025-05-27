import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

export const CREATE_FAKTURA_REQUEST = 'CREATE_FAKTURA_REQUEST';
export const CREATE_FAKTURA_SUCCESS = 'CREATE_FAKTURA_SUCCESS';
export const CREATE_FAKTURA_FAILURE = 'CREATE_FAKTURA_FAILURE';
export const READ_FAKTURA_REQUEST = 'READ_FAKTURA_REQUEST';
export const READ_FAKTURA_SUCCESS = 'READ_FAKTURA_SUCCESS';
export const READ_FAKTURA_FAILURE = 'READ_FAKTURA_FAILURE';
export const EDIT_FAKTURA_REQUEST = 'EDIT_FAKTURA_REQUEST';
export const EDIT_FAKTURA_SUCCESS = 'EDIT_FAKTURA_SUCCESS';
export const EDIT_FAKTURA_FAILURE = 'EDIT_FAKTURA_FAILURE';

export const createFaktura = (faktura, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: CREATE_FAKTURA_REQUEST });
  try {
    const response = await api.createFaktura(faktura);

    if (response.error) {
      dispatch({
        type: CREATE_FAKTURA_FAILURE,
        error: response.exception?.message || 'Error creating faktura',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error creating faktura',
        ),
      );
    } else {
      dispatch({
        type: CREATE_FAKTURA_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Faktura created successfully!'));
    }
  } catch (err) {
    dispatch({
      type: CREATE_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error creating faktura: ' + err.message));
  }
};

export const readFaktury = (user) => async (dispatch) => {
  if (!user) return;

  const { mail } = user;
  dispatch({ type: READ_FAKTURA_REQUEST });
  try {
    const currentInvoiceNumberResponse = await api.getInvoiceAllNumber({
      userEmail: mail,
    });

    const fakturyResponse = await api.getFaktury({
      userEmail: mail,
    });

    if (currentInvoiceNumberResponse.error || fakturyResponse.error) {
      const errorMessage =
        currentInvoiceNumberResponse.exception?.response?.data ||
        fakturyResponse.exception?.response?.data ||
        'Error reading faktury';
      dispatch({
        type: READ_FAKTURA_FAILURE,
        error: errorMessage,
      });
      dispatch(openAlertMessage(errorMessage));
    } else {
      dispatch({
        type: READ_FAKTURA_SUCCESS,
        payload: {
          faktury: fakturyResponse.data,
          currentInvoiceNumber: currentInvoiceNumberResponse.data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: READ_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error reading faktura: ' + err.message));
  }
};

export const editFaktury = (faktura, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: EDIT_FAKTURA_REQUEST });
  try {
    const response = await api.editFaktura(faktura);

    if (response.error) {
      dispatch({
        type: EDIT_FAKTURA_FAILURE,
        error: response.exception?.message || 'Error editing faktura',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error editing faktura',
        ),
      );
    } else {
      dispatch({
        type: EDIT_FAKTURA_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Faktura updated successfully!'));
    }
  } catch (err) {
    dispatch({
      type: EDIT_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error editing faktura: ' + err.message));
  }
};
