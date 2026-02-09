'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3843D0', // Royal blue mula sa invitation
      light: '#5C67E8',
      dark: '#2534B8',
    },
    secondary: {
      main: '#FF6B35', // Orange/coral accent
      light: '#FF8C61',
      dark: '#E55A2B',
    },
    background: {
      default: '#F5EFE7', // Cream/beige background
      paper: '#FFFEFA', // Off-white paper
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Marker Felt", "Brush Script MT", cursive, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FF6B35',
      letterSpacing: '0.03em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2C2C2C',
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive',
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
          fontWeight: 600,
          borderRadius: 12,
          letterSpacing: '0.02em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: '12px',
            paddingRight: '12px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '12px',
          '&:last-child': {
            paddingBottom: '12px',
          },
          '@media (min-width:600px)': {
            padding: '16px',
            '&:last-child': {
              paddingBottom: '16px',
            },
          },
        },
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
