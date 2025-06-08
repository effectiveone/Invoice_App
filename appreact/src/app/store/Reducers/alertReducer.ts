import alertActions from '../Actions/alertActions';

interface AlertState {
  showAlertMessage: boolean;
  alertMessageContent: string | null;
}

interface AlertAction {
  type: string;
  content?: string;
}

const initState: AlertState = {
  showAlertMessage: false,
  alertMessageContent: null,
};

const reducer = (state = initState, action: AlertAction): AlertState => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content || null,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
