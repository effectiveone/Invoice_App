import * as api from '../../api';
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

// Action creators
export const createProduct = (product, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const response = await api.createProduct(product);

    if (response.error) {
      dispatch({
        type: CREATE_PRODUCT_FAILURE,
        error: response.exception?.message || 'Error creating product',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error creating product',
        ),
      );
    } else {
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Produkt dodany.'));
    }
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error creating product: ' + err.message));
  }
};

export const readProducts = (user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const response = await api.getProducts();

    if (response.error) {
      dispatch({
        type: READ_PRODUCTS_FAILURE,
        error: response.exception?.message || 'Error reading products',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error reading products',
        ),
      );
    } else {
      dispatch({
        type: READ_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: READ_PRODUCTS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error reading products: ' + err.message));
  }
};

export const readProduct = (id, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: READ_PRODUCT_REQUEST });
  try {
    const response = await api.getProduct({ id });

    if (response.error) {
      dispatch({
        type: READ_PRODUCT_FAILURE,
        error: response.exception?.message || 'Error reading product',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error reading product',
        ),
      );
    } else {
      dispatch({
        type: READ_PRODUCT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: READ_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error reading product: ' + err.message));
  }
};

export const updateProduct = (product, id, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const response = await api.editProduct({
      ...product,
      id,
    });

    if (response.error) {
      dispatch({
        type: UPDATE_PRODUCT_FAILURE,
        error: response.exception?.message || 'Error updating product',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error updating product',
        ),
      );
    } else {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Produkt zaktualizowany.'));
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error updating product: ' + err.message));
  }
};

export const deleteProduct = (id, user) => async (dispatch) => {
  if (!user) return;

  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const response = await api.deleteProduct(id);

    if (response.error) {
      dispatch({
        type: DELETE_PRODUCT_FAILURE,
        error: response.exception?.message || 'Error deleting product',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error deleting product',
        ),
      );
    } else {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Produkt usunięty.'));
    }
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error deleting product: ' + err.message));
  }
};
