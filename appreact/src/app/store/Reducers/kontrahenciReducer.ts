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

interface ContractorState {
  contractorData: any[];
  loading: boolean;
  error: string | null;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

interface ContractorAction {
  type: string;
  payload?: any;
}

const initialState: ContractorState = {
  contractorData: [],
  loading: false,
  error: null,
};

const contractorReducer = (
  state = initialState,
  action: ContractorAction,
): ContractorState => {
  console.log(
    '👥 KONTRAHENCI REDUCER - Akcja:',
    action.type,
    'Payload:',
    action.payload,
  );

  switch (action.type) {
    case GET_CONTRACTOR_DATA:
      return {
        ...state,
        contractorData: Array.isArray(action.payload) ? action.payload : [],
      };
    case ADD_CONTRACTOR_DATA:
      const currentData = Array.isArray(state.contractorData)
        ? state.contractorData
        : [];
      return {
        ...state,
        contractorData: [...currentData, action.payload],
      };
    case UPDATE_CONTRACTOR_DATA:
      return { ...state, loading: true };
    case UPDATE_CONTRACTOR_DATA_SUCCESS:
      const contractorDataForUpdate = Array.isArray(state.contractorData)
        ? state.contractorData
        : [];
      return {
        ...state,
        contractorData: contractorDataForUpdate.map((contractor: any) =>
          contractor._id === action.payload._id ||
          contractor.id === action.payload.id
            ? action.payload
            : contractor,
        ),
        loading: false,
      };
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
      const contractorDataForDelete = Array.isArray(state.contractorData)
        ? state.contractorData
        : [];
      return {
        ...state,
        contractorData: contractorDataForDelete.filter(
          (contractor: any) =>
            contractor._id !== action.payload &&
            contractor.id !== action.payload,
        ),
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
