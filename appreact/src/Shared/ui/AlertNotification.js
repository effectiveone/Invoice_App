import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { connect } from 'react-redux';
import { getActions } from '../../app/store/Actions/alertActions';

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  // Zabezpieczenie - zawsze renderuj string
  const messageText =
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
      <Alert severity='info'>{messageText}</Alert>
    </Snackbar>
  );
};

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps,
)(AlertNotification);
