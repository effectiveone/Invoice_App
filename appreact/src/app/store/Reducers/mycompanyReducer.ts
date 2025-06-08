import {
  GET_COMPANY_DATA,
  UPDATE_COMPANY_DATA,
  DELETE_COMPANY_DATA,
  ADD_COMPANY_DATA,
} from '../Actions/mycompanyActions';

interface CompanyState {
  companyData: any;
}

interface CompanyAction {
  type: string;
  payload?: any;
}

const initialState: CompanyState = {
  companyData: {},
};

export const companyReducer = (
  state = initialState,
  action: CompanyAction,
): CompanyState => {
  console.log('🏢 COMPANY REDUCER - action:', action.type, action.payload);

  switch (action.type) {
    case GET_COMPANY_DATA:
      console.log('🏢 COMPANY REDUCER - GET_COMPANY_DATA:', action.payload);
      return {
        ...state,
        companyData: action.payload,
      };
    case UPDATE_COMPANY_DATA:
      console.log('🏢 COMPANY REDUCER - UPDATE_COMPANY_DATA:', action.payload);
      return {
        ...state,
        companyData: action.payload,
      };
    case DELETE_COMPANY_DATA:
      console.log('🏢 COMPANY REDUCER - DELETE_COMPANY_DATA');
      return {
        ...state,
        companyData: {},
      };
    case ADD_COMPANY_DATA:
      console.log('🏢 COMPANY REDUCER - ADD_COMPANY_DATA:', action.payload);
      return {
        ...state,
        companyData: action.payload,
      };
    default:
      return state;
  }
};
