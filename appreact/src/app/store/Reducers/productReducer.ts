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

interface ProductState {
  products: any[];
  currentProduct: any;
  loading: boolean;
  error: string;
}

interface ProductAction {
  type: string;
  payload?: any;
  error?: string;
}

const initialState: ProductState = {
  products: [],
  currentProduct: {},
  loading: false,
  error: '',
};

export const productReducer = (
  state = initialState,
  action: ProductAction,
): ProductState => {
  console.log(
    '📦 PRODUCT REDUCER - Akcja:',
    action.type,
    'Payload:',
    action.payload,
  );

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
      console.log(
        '📦 PRODUCT REDUCER - CREATE_PRODUCT_SUCCESS, nowy produkt:',
        action.payload,
      );

      // Sprawdź czy payload ma strukturę {data: {...}}
      let newProduct;
      if (action.payload && action.payload.data) {
        newProduct = action.payload.data;
        console.log(
          '📦 PRODUCT REDUCER - Używam action.payload.data:',
          newProduct,
        );
      } else {
        newProduct = action.payload;
        console.log(
          '📦 PRODUCT REDUCER - Używam action.payload bezpośrednio:',
          newProduct,
        );
      }

      const updatedProducts = [...state.products, newProduct];
      console.log(
        '📦 PRODUCT REDUCER - Zaktualizowana lista produktów:',
        updatedProducts,
      );

      return {
        ...state,
        loading: false,
        products: updatedProducts,
        error: '',
      };
    case READ_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: Array.isArray(action.payload) ? action.payload : [],
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
        products: Array.isArray(state.products)
          ? state.products.map((product: any) =>
              product._id === action.payload._id ||
              product.id === action.payload.id
                ? action.payload
                : product,
            )
          : [action.payload],
        error: '',
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: Array.isArray(state.products)
          ? state.products.filter(
              (product: any) =>
                product._id !== action.payload && product.id !== action.payload,
            )
          : [],
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
        error: action.error || '',
      };
    default:
      return state;
  }
};
