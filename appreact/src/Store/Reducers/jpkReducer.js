// jpkReducer.js

import {
  GET_JPK_REQUEST,
  GET_JPK_SUCCESS,
  GET_JPK_FAILURE,
  SEND_JPK_REQUEST,
  SEND_JPK_SUCCESS,
  SEND_JPK_FAILURE,
} from '../Actions/jpkActions';

const initialState = {
  loading: false,
  error: null,
  jpkList: [],
  jpkXml: null,
};

export const jpkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JPK_REQUEST:
      return { ...state, loading: true };
    case GET_JPK_SUCCESS:
      return { ...state, loading: false, jpkList: action.payload };
    case GET_JPK_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SEND_JPK_REQUEST:
      return { ...state, loading: true };
    case SEND_JPK_SUCCESS:
      return { ...state, loading: false, jpkXml: action.payload };
    case SEND_JPK_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
