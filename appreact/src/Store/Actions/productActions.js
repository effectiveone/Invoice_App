import axios from "axios";
import { openAlertMessage } from "./alertActions";

// Action types
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const READ_PRODUCTS_REQUEST = "READ_PRODUCTS_REQUEST";
export const READ_PRODUCTS_SUCCESS = "READ_PRODUCTS_SUCCESS";
export const READ_PRODUCTS_FAILURE = "READ_PRODUCTS_FAILURE";
export const READ_PRODUCT_REQUEST = "READ_PRODUCT_REQUEST";
export const READ_PRODUCT_SUCCESS = "READ_PRODUCT_SUCCESS";
export const READ_PRODUCT_FAILURE = "READ_PRODUCT_FAILURE";
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Action creators
export const createProduct = (product, user) => async (dispatch) => {
  if (!user) return;

  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const res = await axios.post(
      `http://localhost:5002/api/auth/product`,
      product
    );
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Produkt dodany."));
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error creating product: " + err.message));
  }
};

export const readProducts = (user) => async (dispatch) => {
  if (!user) return;

  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const res = await axios.get(
      `http://localhost:5002/api/auth/products`,
      mail
    );
    dispatch({
      type: READ_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: READ_PRODUCTS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error reading products: " + err.message));
  }
};

export const readProduct = (id, user) => async (dispatch) => {
  if (!user) return;

  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: READ_PRODUCT_REQUEST });
  try {
    const res = await axios.post(`http://localhost:5002/api/auth/product`, {
      id,
    });
    dispatch({
      type: READ_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: READ_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error reading product: " + err.message));
  }
};

export const updateProduct = (product, id, user) => async (dispatch) => {
  if (!user) return;

  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const res = await axios.post(
      `http://localhost:5002/api/auth/product/${id}`,
      product
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Produkt zaktualizowany."));
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error updating product: " + err.message));
  }
};

export const deleteProduct = (id, user) => async (dispatch) => {
  if (!user) return;

  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const res = await axios.delete(
      `http://localhost:5002/api/auth/product/${id}`
    );
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Produkt usunięty."));
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error deleting product: " + err.message));
  }
};
