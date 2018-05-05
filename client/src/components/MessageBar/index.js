import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default ({ open, onClose, message, ...rest }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    open={open}
    onClose={onClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id={'message-id'}>{message}</span>}
    autoHideDuration={6000}
    {...rest}
  />
);