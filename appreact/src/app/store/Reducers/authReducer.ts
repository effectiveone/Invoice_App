import { authActions } from '../Actions/authActions';

interface AuthState {
  userDetails: any;
}

interface AuthAction {
  type: string;
  userDetails?: any;
}

// Initialize state from localStorage if available
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

const initState: AuthState = {
  userDetails: getUserFromLocalStorage(),
};

const reducer = (state = initState, action: AuthAction): AuthState => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;
