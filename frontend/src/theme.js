import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#2196f3',
      light: mode === 'dark' ? '#b3e5fc' : '#64b5f6',
      dark: mode === 'dark' ? '#648dae' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#ce93d8' : '#f50057',
      light: mode === 'dark' ? '#f3e5f5' : '#ff4081',
      dark: mode === 'dark' ? '#ab47bc' : '#c51162',
    },
    background: {
      default: mode === 'dark' ? '#0a1929' : '#f5f5f5',
      paper: mode === 'dark' ? '#101f33' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#1a1a1a',
      secondary: mode === 'dark' ? '#b0bec5' : '#424242',
    },
    action: {
      active: mode === 'dark' ? '#fff' : '#000',
      hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: mode === 'dark' 
            ? 'rgba(16, 31, 51, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          boxShadow: mode === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '6px 16px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
          transition: 'all 0.2s ease'
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: mode === 'dark'
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark'
              ? '0 8px 16px rgba(0,0,0,0.4)'
              : '0 8px 16px rgba(0,0,0,0.15)',
          },
          transition: 'all 0.3s ease'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#101f33' : '#ffffff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : undefined,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
        },
        body1: {
          color: mode === 'dark' ? '#b0bec5' : '#424242',
        },
        body2: {
          color: mode === 'dark' ? '#b0bec5' : '#424242',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          '& .MuiChip-label': {
            color: 'inherit',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-1px'
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  }
});

export { getTheme as default }; 