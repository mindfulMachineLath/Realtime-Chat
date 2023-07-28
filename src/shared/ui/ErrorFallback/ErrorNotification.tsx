/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorNotificationProps {
  errorMsg: string | null;
  onReset?: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMsg,
  onReset,
}: ErrorNotificationProps) => {
  return (
    <Alert severity="error" onClose={onReset}>
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
      {''}
      {errorMsg}
    </Alert>
  );
};

export default ErrorNotification;

// export default function SimpleSnackbar() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (
//     event: React.SyntheticEvent | Event,
//     reason?: string
//   ) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <Alert severity="error">
//       <AlertTitle>Error</AlertTitle>
//       This is an error alert — <strong>check it out!</strong>
//     </Alert>
//   );
// }
