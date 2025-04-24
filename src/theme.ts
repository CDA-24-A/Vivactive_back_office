// theme.ts
import { createTheme } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4BA8B4', // Couleur principale Vivactive
    },
    secondary: {
      main: '#7C93F9', // Accent secondaire
    },
    // background: {
    //   default: '#E3EAFB',
    //   paper: '#FFFFFF',
    // },
    text: {
      primary: '#1A1A1A',
      secondary: '#4B5563',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
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
          backgroundColor: '#0195a0',
          color: "#ffffff",
          '&:hover': {
            backgroundColor: '#E3EAFB',
          },
        },
      },
    }
  },
  
},frFR);

export default theme;
