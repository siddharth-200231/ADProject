import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#000000',
      light: '#404040',
      dark: '#000000',
    },
    secondary: {
      main: '#666666',
      light: '#808080',
      dark: '#404040',
    },
    background: {
      default: mode === 'dark' ? '#000000' : '#ffffff',
      paper: mode === 'dark' ? '#121212' : '#f5f5f5',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#b3b3b3' : '#666666',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          }
        },
        contained: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? '#ffffff' : '#000000',
          color: mode === 'dark' ? '#000000' : '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#e0e0e0' : '#404040',
          }
        }
      }
    }
  }
});

export { getTheme as default }; 