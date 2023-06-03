import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d3ebe5',
      contrastText: '#a0ded1',
    },
    secondary: {
      light: '#048580',
      main: '#0daba1',
      contrastText: '#2cb8aa',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

// colorPrimaryBg: '#d3ebe5',
// colorPrimaryBgHover: '#a0ded1',
// colorPrimaryBorder: '#75d1c2',
// colorPrimaryBorderHover: '#4fc4b5',
// colorPrimaryHover: '#2cb8aa',

// colorPrimary: '#0daba1',
// colorPrimaryActive: '#048580',
// colorPrimaryTextHover: '#2cb8aa',
// colorPrimaryText: '#0daba1',
// colorPrimaryTextActive: '#048580',
