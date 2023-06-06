import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Routing from 'pages';
import { theme } from './materialUi.config';
import './index.scss';

const appTitle = 'Chatty';

const App: React.FC = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com/',
  });

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`} />
        <ApolloProvider client={client}>
          <Routing />
        </ApolloProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
