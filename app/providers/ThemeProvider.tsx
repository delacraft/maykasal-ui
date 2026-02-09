'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4366F9', // Exact blue from invitation
      light: '#6A85FA', // Lighter blue
      dark: '#2D4DD6', // Darker blue
    },
    secondary: {
      main: '#FD934F', // Exact orange from invitation
      light: '#FDAC75', // Lighter orange
      dark: '#E67B3A', // Darker orange
    },
    background: {
      default: '#F9F9F0', // Exact cream from invitation
      paper: '#FFFEFA', // Off-white paper
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Sailors Slant", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FD934F',
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
      fontFamily: '"Sailors Slant", sans-serif',
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
          transition: 'all 0.3s ease',
        },
        contained: {
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(67, 102, 249, 0.08)',
            transform: 'scale(1.02)',
          },
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
