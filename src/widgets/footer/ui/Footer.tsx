import React from 'react';
import { Space, Typography, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import styles from './Footer.module.scss';

const { Text } = Typography;

const FooterComponent: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Footer style={{ background: colorPrimary, padding: '0' }}>
      <div className={styles['footer-container']}>
        <Space direction="vertical" align="center" size={0}>
          <Space size={5}>
            <Text>
              <span>Made with</span> ❤ <span>by</span>
            </Text>
            <p>
              <a
                href="https://github.com/Alesia-Abaeva"
                target="_blank"
                rel="noreferrer"
                className={styles['footer-logo__link']}
              >
                Alesia-Abaeva
              </a>
            </p>
          </Space>
          <Text>
            <Space>Chatty © 2023 All rights reserved</Space>
          </Text>
        </Space>
      </div>
    </Footer>
  );
};

export default FooterComponent;
