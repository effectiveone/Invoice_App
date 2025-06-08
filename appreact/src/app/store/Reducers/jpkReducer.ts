// jpkReducer.js

import {
  GET_JPK_REQUEST,
  GET_JPK_SUCCESS,
  GET_JPK_FAILURE,
  SEND_JPK_REQUEST,
  SEND_JPK_SUCCESS,
  SEND_JPK_FAILURE,
} from '../Actions/jpkActions';

interface JpkState {
  loading: boolean;
  error: string | null;
  jpkList: any[];
  jpkXml: string | null;
}

interface JpkAction {
  type: string;
  payload?: any;
  error?: string;
}

const initialState: JpkState = {
  loading: false,
  error: null,
  jpkList: [],
  jpkXml: null,
};

export const jpkReducer = (
  state = initialState,
  action: JpkAction,
): JpkState => {
  switch (action.type) {
    case GET_JPK_REQUEST:
      return { ...state, loading: true };
    case GET_JPK_SUCCESS:
      return {
        ...state,
        loading: false,
        jpkList: Array.isArray(action.payload) ? action.payload : [],
      };
    case GET_JPK_FAILURE:
      return { ...state, loading: false, error: action.error || null };
    case SEND_JPK_REQUEST:
      return { ...state, loading: true };
    case SEND_JPK_SUCCESS:
      return { ...state, loading: false, jpkXml: action.payload };
    case SEND_JPK_FAILURE:
      return { ...state, loading: false, error: action.error || null };
    default:
      return state;
  }
};
