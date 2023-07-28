/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

interface ErrorNotificationProps {
  errorMsg: string | null;
  onReset?: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMsg,
  onReset,
}: ErrorNotificationProps) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onReset}
    >
      <Alert severity="error" sx={{ width: '100%', textAlign: 'left' }}>
        <AlertTitle>An error occurred</AlertTitle>
        This is an error alert —{' '}
        {<strong>{errorMsg}</strong> || 'Something went wrong'}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;
