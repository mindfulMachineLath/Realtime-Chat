import React from 'react';
import { ConfigProvider } from 'antd';
import { customTheme } from './antd.config';
import Routing from 'pages';

import './index.scss';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const appTitle = 'GraphiQL';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ConfigProvider theme={customTheme}>
        <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`} />
        <Routing />
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
