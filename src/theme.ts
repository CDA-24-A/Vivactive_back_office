import { createTheme } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: { main: '#00829f' },
      secondary: { main: '#7C93F9' },
      text: { primary: '#1A1A1A', secondary: '#4B5563' },
    },
    typography: {
      // Police par défaut pour le corps de texte
      fontFamily: 'Inter, Roboto, sans-serif',

      // On redéfinit Montserrat pour les titres
      h1: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 500,
        fontSize: '1.75rem',
      },
      h4: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 500,
        fontSize: '1.5rem',
      },
      h5: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: '1.25rem',
      },
      h6: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
      },
      body1: {
        fontSize: '1rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#00779f',
            },
          },
        },
      },
    },
  },
  frFR
);

export default theme;
