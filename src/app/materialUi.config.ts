import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0daba1',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#048580',
      main: '#0daba1',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#048580',
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    // custom: {
    //   light: '#ffa726',
    //   main: '#f57c00',
    //   dark: '#ef6c00',
    //   contrastText: 'rgba(0, 0, 0, 0.87)',
    // },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
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
