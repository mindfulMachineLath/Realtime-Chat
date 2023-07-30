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
      <div className={styles.page_container}>
        <h3>An error occurred </h3>
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
    </>
  );
};

export default ErrorPageNotification;
