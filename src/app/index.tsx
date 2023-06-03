import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Routing from 'pages';

import './index.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { theme } from './materialUi.config';

const appTitle = 'GraphiQL';

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
