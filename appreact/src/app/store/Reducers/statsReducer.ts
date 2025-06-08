import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from '../Actions/statsActions';

interface StatsState {
  stats: any;
  isLoading: boolean;
  error: string | null;
}

interface StatsAction {
  type: string;
  payload?: any;
}

const initialState: StatsState = {
  stats: null,
  isLoading: false,
  error: null,
};

const statsReducer = (
  state = initialState,
  action: StatsAction,
): StatsState => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload,
        isLoading: false,
      };
    case FETCH_STATS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default statsReducer;
