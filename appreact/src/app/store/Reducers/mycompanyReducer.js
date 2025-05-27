import {
  GET_COMPANY_DATA,
  UPDATE_COMPANY_DATA,
  DELETE_COMPANY_DATA,
  ADD_COMPANY_DATA,
} from '../Actions/mycompanyActions';

const initialState = {
  companyData: {},
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    case UPDATE_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    case DELETE_COMPANY_DATA:
      return {
        ...state,
        companyData: {},
      };
    case ADD_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    default:
      return state;
  }
};
