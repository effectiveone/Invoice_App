import {
  CREATE_FAKTURA_SUCCESS,
  READ_FAKTURA_SUCCESS,
  EDIT_FAKTURA_SUCCESS,
} from '../Actions/fakturaActions';

const initialState = {
  faktury: [],
  currentInvoiceNumber: null,
  loading: false,
  error: null,
};

const fakturaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FAKTURA_SUCCESS:
      return {
        ...state,
        fakturaData: action.payload,
      };
    case READ_FAKTURA_SUCCESS:
      return {
        ...state,
        faktury: action.payload.faktury,
        currentInvoiceNumber: action.payload.currentInvoiceNumber,
        loading: false,
        error: null,
      };
    case EDIT_FAKTURA_SUCCESS:
      return {
        ...state,
        fakturaData: action.payload,
      };
    default:
      return state;
  }
};

export default fakturaReducer;
