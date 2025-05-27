import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  READ_PRODUCTS_REQUEST,
  READ_PRODUCTS_SUCCESS,
  READ_PRODUCTS_FAILURE,
  READ_PRODUCT_REQUEST,
  READ_PRODUCT_SUCCESS,
  READ_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from '../Actions/productActions';

const initialState = {
  products: [],
  currentProduct: {},
  loading: false,
  error: '',
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
    case READ_PRODUCTS_REQUEST:
    case READ_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case READ_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: '',
      };
    case READ_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: '',
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case CREATE_PRODUCT_FAILURE:
    case READ_PRODUCTS_FAILURE:
    case READ_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
