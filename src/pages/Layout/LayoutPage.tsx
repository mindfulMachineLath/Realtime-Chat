import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/footer';
import { Box, Container } from '@mui/material';
import s from './Layout.module.scss';

const LayoutPage: React.FC = () => {
  return (
    <Container disableGutters={true} className={s.container} maxWidth={false}>
      <Box className={s.main}>
        <div>
          <div className={s.starsec} />
          <div className={s.starthird} />
          <div className={s.starfourth} />
          <div className={s.starfifth} />
        </div>
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </Box>
      <Footer />
    </Container>
  );
};

export default LayoutPage;
