import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: mode === 'dark' ? '#111827' : '#ffffff',
      paper: mode === 'dark' ? '#1f2937' : '#f8fafc',
    },
    text: {
      primary: mode === 'dark' ? '#f3f4f6' : '#111827',
      secondary: mode === 'dark' ? '#9ca3af' : '#4b5563',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
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
          backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
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
          backgroundImage: 'linear-gradient(to right, #3b82f6, #2563eb)',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
          '&:hover': {
            backgroundImage: 'linear-gradient(to right, #2563eb, #1d4ed8)',
          }
        }
      }
    }
  }
});

export { getTheme as default }; 