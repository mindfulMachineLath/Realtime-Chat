import React from 'react';
import { Typography, Link } from '@mui/material';
import { Stack, Box } from '@mui/joy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import s from './Footer.module.scss';

const FooterComponent: React.FC = () => {
  return (
    <footer>
      <Box className={s['footer-container']}>
        <Stack textAlign="center">
          <Typography sx={{ fontSize: '0.7rem' }}>
            Made with{' '}
            <FavoriteIcon
              color="error"
              className={s['footer-icon']}
              sx={{ width: '0.9rem', height: '0.9rem' }}
            />{' '}
            by
            <Link
              href="https://github.com/Alesia-Abaeva"
              target="_blank"
              className={s['footer-logo__link']}
              rel="noreferrer"
            >
              {' '}
              Alesia-Abaeva
            </Link>
          </Typography>

          <Typography sx={{ fontSize: '0.7rem' }}>
            Chatty © 2023 All rights reserved
          </Typography>
        </Stack>
      </Box>
    </footer>
  );
};

export default FooterComponent;
