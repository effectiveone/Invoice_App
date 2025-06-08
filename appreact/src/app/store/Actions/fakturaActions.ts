import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';
import { Dispatch } from 'redux';

export const CREATE_FAKTURA_REQUEST = 'CREATE_FAKTURA_REQUEST';
export const CREATE_FAKTURA_SUCCESS = 'CREATE_FAKTURA_SUCCESS';
export const CREATE_FAKTURA_FAILURE = 'CREATE_FAKTURA_FAILURE';
export const READ_FAKTURA_REQUEST = 'READ_FAKTURA_REQUEST';
export const READ_FAKTURA_SUCCESS = 'READ_FAKTURA_SUCCESS';
export const READ_FAKTURA_FAILURE = 'READ_FAKTURA_FAILURE';
export const EDIT_FAKTURA_REQUEST = 'EDIT_FAKTURA_REQUEST';
export const EDIT_FAKTURA_SUCCESS = 'EDIT_FAKTURA_SUCCESS';
export const EDIT_FAKTURA_FAILURE = 'EDIT_FAKTURA_FAILURE';

interface User {
  mail: string;
  [key: string]: any;
}

interface Faktura {
  [key: string]: any;
}

export const createFaktura =
  (faktura: Faktura, user: User) => async (dispatch: Dispatch<any>) => {
    if (!user) return;

    dispatch({ type: CREATE_FAKTURA_REQUEST });
    try {
      const response = await api.createFaktura(faktura);

      if ('error' in response && response.error) {
        dispatch({
          type: CREATE_FAKTURA_FAILURE,
          error:
            (response as any).exception?.message || 'Error creating faktura',
        });
        dispatch(
          openAlertMessage(
            (response as any).exception?.response?.data ||
              'Error creating faktura',
          ),
        );
      } else {
        dispatch({
          type: CREATE_FAKTURA_SUCCESS,
          payload: (response as any).data,
        });
        dispatch(openAlertMessage('Faktura created successfully!'));
      }
    } catch (err: any) {
      dispatch({
        type: CREATE_FAKTURA_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error creating faktura: ' + err.message));
    }
  };

export const readFaktury = (user: User) => async (dispatch: Dispatch<any>) => {
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

    if (
      ('error' in currentInvoiceNumberResponse &&
        currentInvoiceNumberResponse.error) ||
      ('error' in fakturyResponse && fakturyResponse.error)
    ) {
      const errorMessage =
        (currentInvoiceNumberResponse as any).exception?.response?.data ||
        (fakturyResponse as any).exception?.response?.data ||
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
          faktury: (fakturyResponse as any).data,
          currentInvoiceNumber: (currentInvoiceNumberResponse as any).data,
        },
      });
    }
  } catch (err: any) {
    dispatch({
      type: READ_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error reading faktura: ' + err.message));
  }
};

export const editFaktury =
  (faktura: Faktura, user: User) => async (dispatch: Dispatch<any>) => {
    if (!user) return;

    dispatch({ type: EDIT_FAKTURA_REQUEST });
    try {
      const response = await api.editFaktura(faktura);

      if ('error' in response && response.error) {
        dispatch({
          type: EDIT_FAKTURA_FAILURE,
          error:
            (response as any).exception?.message || 'Error editing faktura',
        });
        dispatch(
          openAlertMessage(
            (response as any).exception?.response?.data ||
              'Error editing faktura',
          ),
        );
      } else {
        dispatch({
          type: EDIT_FAKTURA_SUCCESS,
          payload: (response as any).data,
        });
        dispatch(openAlertMessage('Faktura updated successfully!'));
      }
    } catch (err: any) {
      dispatch({
        type: EDIT_FAKTURA_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error editing faktura: ' + err.message));
    }
  };
