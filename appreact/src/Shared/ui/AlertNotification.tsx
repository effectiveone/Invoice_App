import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { connect, ConnectedProps } from 'react-redux';
import { getActions } from '../../app/store/Actions/alertActions';

// Redux state types
interface AlertState {
  showAlertMessage: boolean;
  alertMessageContent: string | { message?: string } | null;
}

interface ReduxState {
  alert: AlertState;
}

// Props from Redux connect
const mapStoreStateToProps = (state: ReduxState) => ({
  ...state.alert,
});

const mapActionsToProps = (dispatch: any) => ({
  ...getActions(dispatch),
});

// Connected component props type
const connector = connect(mapStoreStateToProps, mapActionsToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface AlertNotificationProps extends PropsFromRedux {
  showAlertMessage: boolean;
  closeAlertMessage: () => any;
  alertMessageContent: string | { message?: string } | null;
  severity?: AlertColor;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
  severity = 'info',
}): JSX.Element => {
  // Zabezpieczenie - zawsze renderuj string
  const messageText: string =
    typeof alertMessageContent === 'string'
      ? alertMessageContent
      : alertMessageContent?.message ||
        JSON.stringify(alertMessageContent) ||
        'Wystąpił błąd';

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity={severity}>{messageText}</Alert>
    </Snackbar>
  );
};

export default connector(AlertNotification);
