import { Button } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import styles from './ErrorFallback.module.scss';

interface ErrorPageNotificationProps {
  errorMsg: string | null;
  onReset?: () => void;
}
const ErrorPageNotification: React.FC<ErrorPageNotificationProps> = ({
  errorMsg,
  onReset,
}: ErrorPageNotificationProps) => {
  const location = useLocation();

  const reloadPage = () => window.location.reload();

  return (
    <>
      <Helmet>
        <title>ERROR</title>
      </Helmet>
      <div className={styles['not-found']}>
        <div className={styles['not-found__wrapper']}>
          <h3>An error occurred</h3>
          <h4>{errorMsg || 'Something went wrong'}</h4>
          <Button
            type="link"
            href={location.pathname}
            onClick={(event) => {
              event?.preventDefault();
              reloadPage();
            }}
          >
            Try to reload
          </Button>
          {onReset && <Button onClick={onReset}> Try again</Button>}
        </div>
        <span className={styles.ground} />
      </div>
    </>
  );
};

export default ErrorPageNotification;

// "errorBoundary": {
//     "errorTitle": "An error occurred",
//     "defaultMsg": "Something went wrong",
//     "errorReset": "Try again",
//     "errorReload": "Try to reload",
//     "errorSignOut": "There was an error while signing out"
