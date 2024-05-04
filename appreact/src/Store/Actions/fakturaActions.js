import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const CREATE_FAKTURA_REQUEST = "CREATE_FAKTURA_REQUEST";
export const CREATE_FAKTURA_SUCCESS = "CREATE_FAKTURA_SUCCESS";
export const CREATE_FAKTURA_FAILURE = "CREATE_FAKTURA_FAILURE";
export const READ_FAKTURA_REQUEST = "READ_FAKTURA_REQUEST";
export const READ_FAKTURA_SUCCESS = "READ_FAKTURA_SUCCESS";
export const READ_FAKTURA_FAILURE = "READ_FAKTURA_FAILURE";
export const EDIT_FAKTURA_REQUEST = "EDIT_FAKTURA_REQUEST";
export const EDIT_FAKTURA_SUCCESS = "EDIT_FAKTURA_SUCCESS";
export const EDIT_FAKTURA_FAILURE = "EDIT_FAKTURA_FAILURE";

export const createFaktura = (faktura, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: CREATE_FAKTURA_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:5002/api/auth/faktury",
      faktura
    );
    dispatch({
      type: CREATE_FAKTURA_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Faktura created successfully!"));
  } catch (err) {
    dispatch({
      type: CREATE_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error creating faktura: " + err.message));
  }
};

export const readFaktury = (user) => async (dispatch) => {
  if (!user) return;

  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: READ_FAKTURA_REQUEST });
  try {
    const currentInvoiceNumberRes = await axios.post(
      `http://localhost:5002/api/auth/invoiceAllNumber`,
      {
        userEmail: mail,
      }
    );
    const currentInvoiceNumber = currentInvoiceNumberRes.data;

    const fakturyRes = await axios.post(
      `http://localhost:5002/api/auth/get-faktury`,
      {
        userEmail: mail,
      }
    );
    const faktury = fakturyRes.data;

    dispatch({
      type: READ_FAKTURA_SUCCESS,
      payload: {
        faktury,
        currentInvoiceNumber,
      },
    });
  } catch (err) {
    dispatch({
      type: READ_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error reading faktura: " + err.message));
  }
};

export const editFaktury = (faktura, user) => async (dispatch) => {
  if (!user) return;

  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: EDIT_FAKTURA_REQUEST });
  try {
    const res = await axios.post(
      `http://localhost:5002/api/auth/edit-faktura`,

      faktura
    );
    dispatch({
      type: EDIT_FAKTURA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error reading faktura: " + err.message));
  }
};
