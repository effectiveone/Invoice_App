import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const GET_CONTRACTOR_DATA = "GET_CONTRACTOR_DATA";
export const ADD_CONTRACTOR_DATA = "ADD_CONTRACTOR_DATA";
export const UPDATE_CONTRACTOR_DATA = "UPDATE_CONTRACTOR_DATA";
export const UPDATE_CONTRACTOR_DATA_SUCCESS = "UPDATE_CONTRACTOR_DATA_SUCCESS";
export const UPDATE_CONTRACTOR_DATA_FAILURE = "UPDATE_CONTRACTOR_DATA_FAILURE";
export const DELETE_CONTRACTOR_REQUEST = "DELETE_CONTRACTOR_REQUEST";
export const DELETE_CONTRACTOR_SUCCESS = "DELETE_CONTRACTOR_SUCCESS";
export const DELETE_CONTRACTOR_FAILURE = "DELETE_CONTRACTOR_FAILURE";

export const getContractorData = (user) => {
  if (!user) return;
  const { mail, token } = user;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .post("http://localhost:5002/api/auth/get-kontrahenci", {
        userEmail: mail,
      })
      .then((response) => {
        dispatch({
          type: GET_CONTRACTOR_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addContractorData = (newData, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.post(
      "http://localhost:5002/api/auth/kontrahenci",
      newData
    );
    dispatch({
      type: ADD_CONTRACTOR_DATA,
      payload: res.data,
    });
    dispatch(openAlertMessage("Task added successfully!"));
  } catch (err) {
    dispatch(openAlertMessage("Error adding task: " + err));
  }
};

export const updateContractorData =
  (updatedData, paramsId, user) => async (dispatch) => {
    if (!user) return;
    const { token } = user;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: UPDATE_CONTRACTOR_DATA });
    try {
      const res = await axios.patch(
        `http://localhost:5002/api/auth/kontrahenci/${paramsId}`,
        updatedData
      );
      dispatch({
        type: UPDATE_CONTRACTOR_DATA_SUCCESS,
        payload: res.data,
      });
      dispatch(openAlertMessage("Data updated successfully!"));
    } catch (err) {
      dispatch({ type: UPDATE_CONTRACTOR_DATA_FAILURE, payload: err.message });
      dispatch(openAlertMessage("Error updating data: " + err));
    }
  };

export const deleteContractor = (paramsId, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: DELETE_CONTRACTOR_REQUEST });
  try {
    await axios.delete(
      `http://localhost:5002/api/auth/kontrahenci/${paramsId}`
    );
    dispatch({ type: DELETE_CONTRACTOR_SUCCESS });
    dispatch(openAlertMessage("Contractor deleted successfully!"));
  } catch (err) {
    dispatch({ type: DELETE_CONTRACTOR_FAILURE, payload: err.message });
    dispatch(openAlertMessage("Error deleting contractor: " + err));
  }
};
