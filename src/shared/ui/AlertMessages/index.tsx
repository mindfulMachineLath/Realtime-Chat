import { Alert, Snackbar } from '@mui/material';

interface IAlert {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  status: boolean;
  close?: () => void;
}

const AlertMessages: React.FC<IAlert> = ({ text, severity, status, close }) => {
  return (
    <Snackbar open={status} autoHideDuration={6000} onClose={close}>
      <Alert onClose={close} severity={severity} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessages;
