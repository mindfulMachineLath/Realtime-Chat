import React from 'react';
import styles from './Home.module.scss';
import { Typography } from '@mui/material';

import { Form } from 'features/form';

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   '&:hover': {
//     backgroundColor: purple[700],
//   },
// })); // TODO: кастомизированная кнопка

const Home: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
