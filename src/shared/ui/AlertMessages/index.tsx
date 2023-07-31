import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

interface AlertProps {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  status: boolean;
  close?: () => void;
  anchorOrigin?: SnackbarOrigin;
}

const AlertMessages: React.FC<AlertProps> = ({
  text,
  severity,
  status,
  close,
  anchorOrigin,
}) => {
  return (
    <Snackbar
      open={status}
      autoHideDuration={6000}
      onClose={close}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={close}
        severity={severity}
        sx={{ width: '100%' }}
        variant={'filled'}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessages;
