import * as api from '../../../shared/api';
import { openAlertMessage } from './alertActions';

// Action types
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const READ_PRODUCTS_REQUEST = 'READ_PRODUCTS_REQUEST';
export const READ_PRODUCTS_SUCCESS = 'READ_PRODUCTS_SUCCESS';
export const READ_PRODUCTS_FAILURE = 'READ_PRODUCTS_FAILURE';
export const READ_PRODUCT_REQUEST = 'READ_PRODUCT_REQUEST';
export const READ_PRODUCT_SUCCESS = 'READ_PRODUCT_SUCCESS';
export const READ_PRODUCT_FAILURE = 'READ_PRODUCT_FAILURE';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

interface User {
  mail: string;
  [key: string]: any;
}

// Action creators
export const createProduct =
  (product: any, user: User) => async (dispatch: any) => {
    if (!user) return;

    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
      const response = await api.createProduct({
        ...product,
        userEmail: user.mail,
      });

      if ('error' in response && response.error) {
        dispatch({
          type: CREATE_PRODUCT_FAILURE,
          error:
            response.exception &&
            typeof response.exception === 'object' &&
            'message' in response.exception
              ? (response.exception as any).message
              : 'Error creating product',
        });
        dispatch(
          openAlertMessage(
            response.exception &&
              typeof response.exception === 'object' &&
              'response' in response.exception
              ? (response.exception as any).response?.data
              : 'Error creating product',
          ),
        );
      } else {
        dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: 'data' in response ? response.data : response,
        });
        dispatch(openAlertMessage('Produkt dodany.'));
      }
    } catch (err: any) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error creating product: ' + err.message));
    }
  };

export const readProducts = (user: User) => async (dispatch: any) => {
  if (!user) return;

  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const response = await api.getProducts({
      userEmail: user.mail,
    });

    if ('error' in response && response.error) {
      dispatch({
        type: READ_PRODUCTS_FAILURE,
        error:
          response.exception &&
          typeof response.exception === 'object' &&
          'message' in response.exception
            ? (response.exception as any).message
            : 'Error reading products',
      });
      dispatch(
        openAlertMessage(
          response.exception &&
            typeof response.exception === 'object' &&
            'response' in response.exception
            ? (response.exception as any).response?.data
            : 'Error reading products',
        ),
      );
    } else {
      dispatch({
        type: READ_PRODUCTS_SUCCESS,
        payload: 'data' in response ? response.data : response,
      });
    }
  } catch (err: any) {
    dispatch({
      type: READ_PRODUCTS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error reading products: ' + err.message));
  }
};

export const readProduct =
  (id: string, user: User) => async (dispatch: any) => {
    if (!user) return;

    dispatch({ type: READ_PRODUCT_REQUEST });
    try {
      const response = await api.getProduct({ id });

      if ('error' in response && response.error) {
        dispatch({
          type: READ_PRODUCT_FAILURE,
          error:
            response.exception &&
            typeof response.exception === 'object' &&
            'message' in response.exception
              ? (response.exception as any).message
              : 'Error reading product',
        });
        dispatch(
          openAlertMessage(
            response.exception &&
              typeof response.exception === 'object' &&
              'response' in response.exception
              ? (response.exception as any).response?.data
              : 'Error reading product',
          ),
        );
      } else {
        dispatch({
          type: READ_PRODUCT_SUCCESS,
          payload: 'data' in response ? response.data : response,
        });
      }
    } catch (err: any) {
      dispatch({
        type: READ_PRODUCT_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error reading product: ' + err.message));
    }
  };

export const updateProduct =
  (product: any, id: string, user: User) => async (dispatch: any) => {
    if (!user) return;

    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
      const response = await api.editProduct({
        ...product,
        id,
        userEmail: user.mail,
      });

      if ('error' in response && response.error) {
        dispatch({
          type: UPDATE_PRODUCT_FAILURE,
          error:
            response.exception &&
            typeof response.exception === 'object' &&
            'message' in response.exception
              ? (response.exception as any).message
              : 'Error updating product',
        });
        dispatch(
          openAlertMessage(
            response.exception &&
              typeof response.exception === 'object' &&
              'response' in response.exception
              ? (response.exception as any).response?.data
              : 'Error updating product',
          ),
        );
      } else {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: 'data' in response ? response.data : response,
        });
        dispatch(openAlertMessage('Produkt zaktualizowany.'));
      }
    } catch (err: any) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error updating product: ' + err.message));
    }
  };

export const deleteProduct =
  (id: string, user: User) => async (dispatch: any) => {
    if (!user) return;

    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
      const response = await api.deleteProduct(id, user.mail);

      if ('error' in response && response.error) {
        dispatch({
          type: DELETE_PRODUCT_FAILURE,
          error:
            response.exception &&
            typeof response.exception === 'object' &&
            'message' in response.exception
              ? (response.exception as any).message
              : 'Error deleting product',
        });
        dispatch(
          openAlertMessage(
            response.exception &&
              typeof response.exception === 'object' &&
              'response' in response.exception
              ? (response.exception as any).response?.data
              : 'Error deleting product',
          ),
        );
      } else {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: 'data' in response ? response.data : response,
        });
        dispatch(openAlertMessage('Produkt usunięty.'));
      }
    } catch (err: any) {
      dispatch({
        type: DELETE_PRODUCT_FAILURE,
        error: err.message,
      });
      dispatch(openAlertMessage('Error deleting product: ' + err.message));
    }
  };
