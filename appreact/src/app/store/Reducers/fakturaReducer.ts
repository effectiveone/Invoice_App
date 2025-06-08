import {
  CREATE_FAKTURA_SUCCESS,
  READ_FAKTURA_SUCCESS,
  EDIT_FAKTURA_SUCCESS,
} from '../Actions/fakturaActions';

interface FakturaState {
  faktury: any[];
  currentInvoiceNumber: string | null;
  loading: boolean;
  error: string | null;
  fakturaData?: any;
}

interface FakturaAction {
  type: string;
  payload?: any;
}

const initialState: FakturaState = {
  faktury: [],
  currentInvoiceNumber: null,
  loading: false,
  error: null,
};

const fakturaReducer = (
  state = initialState,
  action: FakturaAction,
): FakturaState => {
  console.log(
    '📄 FAKTURA REDUCER - Akcja:',
    action.type,
    'Payload:',
    action.payload,
  );

  switch (action.type) {
    case CREATE_FAKTURA_SUCCESS:
      console.log(
        '📄 FAKTURA REDUCER - CREATE_FAKTURA_SUCCESS, nowa faktura:',
        action.payload,
      );
      return {
        ...state,
        fakturaData: action.payload,
      };
    case READ_FAKTURA_SUCCESS:
      console.log(
        '📄 FAKTURA REDUCER - READ_FAKTURA_SUCCESS, dane:',
        action.payload,
      );
      console.log('📄 FAKTURA REDUCER - faktury:', action.payload?.faktury);
      console.log(
        '📄 FAKTURA REDUCER - currentInvoiceNumber:',
        action.payload?.currentInvoiceNumber,
      );

      return {
        ...state,
        faktury: Array.isArray(action.payload?.faktury)
          ? action.payload.faktury
          : [],
        currentInvoiceNumber: action.payload?.currentInvoiceNumber || null,
        loading: false,
        error: null,
      };
    case EDIT_FAKTURA_SUCCESS:
      console.log(
        '📄 FAKTURA REDUCER - EDIT_FAKTURA_SUCCESS, zaktualizowana faktura:',
        action.payload,
      );
      return {
        ...state,
        fakturaData: action.payload,
      };
    default:
      return state;
  }
};

export default fakturaReducer;
