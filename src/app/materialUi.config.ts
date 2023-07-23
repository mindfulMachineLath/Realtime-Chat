import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0daba0',
      contrastText: '#e0f3f2',
      light: '#b1e1de',
      dark: '#005245',
    },
    secondary: {
      main: '#600B8E',
      contrastText: '#f2e3f3',
      light: '#c88dd1',
      dark: '#400580',
    },
    error: {
      main: '#ab0d18',
      contrastText: '#fdeaed',
      light: '#db6c6e',
      dark: '#ab0d18',
    },
    success: {
      main: '#0dab51',
      contrastText: '#e5f5e9',
      light: '#6ac485',
      dark: '#005a1e',
    },
    info: {
      main: '#0d67ab',
      contrastText: '#e3f2fa',
      light: '#69b4e4',
      dark: '#004a8c',
    },
    action: {
      disabled: '#ffffffcc',
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
