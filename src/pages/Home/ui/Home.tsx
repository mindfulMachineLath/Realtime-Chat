import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { ROUTES } from 'pages/config';
import { Form } from 'features/form';
import { useAuthState } from 'shared/hook';
import styles from './Home.module.scss';

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   '&:hover': {
//     backgroundColor: purple[700],
//   },
// })); // TODO: кастомизированная кнопка

const Home: React.FC = () => {
  const { isAuth } = useAuthState();
  const location = useLocation();

  // if (isAuth) {
  //   return <Navigate to={ROUTES.MAIN} state={{ from: location }} />;
  // }

  return (
    <div className={styles.main_container}>
      <div className={styles.main_wrapper}>
        <div className={styles.home_logo}></div>
        <Typography variant="h1" component="h1">
          Chatty
        </Typography>
        <Typography component="p" className={styles.note}>
          Please confirm your country code and enter your phone number.
        </Typography>

        <Form.Login />
      </div>
    </div>
  );
};

export default Home;
