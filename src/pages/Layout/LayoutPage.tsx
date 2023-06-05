import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/footer';
import { Box, Container } from '@mui/material';
import styles from './Layout.module.scss';

const LayoutPage: React.FC = () => {
  return (
    <Container
      disableGutters={true}
      className={styles.container}
      maxWidth={false}
    >
      <Box className={styles.main}>
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Box>
      <Footer />
    </Container>
  );
};

export default LayoutPage;
