import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@mui/material';
import { ROUTES } from 'pages/config';
import { Form } from 'features/form';
import { useAuthState } from 'shared/hook';
import styles from './Home.module.scss';
import { ErrorBoundary } from 'shared/hoc';

const Home: React.FC = () => {
  const { isAuth } = useAuthState();
  const location = useLocation();

  const [title, setTitle] = React.useState(false);

  if (isAuth) {
    return <Navigate to={ROUTES.MAIN} state={{ from: location }} />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <ErrorBoundary type="page">
        <div className={styles.main_container}>
          <div className={styles.main_wrapper}>
            <div className={styles.home_logo}></div>
            <Typography variant="h1" component="h1">
              Chatty
            </Typography>
            <Typography component="p" className={styles.note}>
              {title
                ? 'Please enter verify code'
                : 'Please confirm your country code and enter your phone number.'}
            </Typography>

            <Form.Login title={setTitle} />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
