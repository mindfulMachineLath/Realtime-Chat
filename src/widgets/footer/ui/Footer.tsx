import React from 'react';
import { Typography, Link } from '@mui/material';
import { Stack, Box } from '@mui/joy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './Footer.module.scss';

const FooterComponent: React.FC = () => {
  return (
    <footer>
      <Box className={styles['footer-container']}>
        <Stack textAlign="center">
          <Typography className={styles['footer-typography']}>
            Made with{' '}
            <FavoriteIcon
              color="error"
              className={styles['footer-icon']}
              sx={{ width: '0.9rem', height: '0.9rem' }}
            />{' '}
            by
            <Link
              href="https://github.com/Alesia-Abaeva"
              target="_blank"
              className={styles['footer-logo__link']}
              rel="noreferrer"
            >
              {' '}
              Alesia-Abaeva
            </Link>
          </Typography>

          <Typography className={styles['footer-typography']}>
            Chatty © 2023 All rights reserved
          </Typography>
        </Stack>
      </Box>
    </footer>
  );
};

export default FooterComponent;
