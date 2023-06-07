import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Routing from 'pages';
import { theme } from './materialUi.config';
import './index.scss';

const appTitle = 'Chatty';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`} />

        <Routing />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
