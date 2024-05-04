import {
  GET_CONTRACTOR_DATA,
  ADD_CONTRACTOR_DATA,
  UPDATE_CONTRACTOR_DATA,
  UPDATE_CONTRACTOR_DATA_SUCCESS,
  UPDATE_CONTRACTOR_DATA_FAILURE,
  DELETE_CONTRACTOR_REQUEST,
  DELETE_CONTRACTOR_SUCCESS,
  DELETE_CONTRACTOR_FAILURE,
} from '../Actions/kontrahenciActions';

const initialState = {
  contractorData: [],
  loading: false,
  error: null,
};

const contractorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRACTOR_DATA:
      return {
        ...state,
        contractorData: action.payload,
      };
    case ADD_CONTRACTOR_DATA:
      return {
        ...state,
        contractorData: action.payload,
      };
    case UPDATE_CONTRACTOR_DATA:
      return { ...state, loading: true };
    case UPDATE_CONTRACTOR_DATA_SUCCESS:
      return { ...state, contractorData: action.payload, loading: false };
    case UPDATE_CONTRACTOR_DATA_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DELETE_CONTRACTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };
    case DELETE_CONTRACTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };
    case DELETE_CONTRACTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default contractorReducer;
