import React from 'react';
import { ConfigProvider } from 'antd';
import { customTheme } from './antd.config';
import App from '../App';

const Apps: React.FC = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <App />
    </ConfigProvider>
  );
};

export default Apps;
