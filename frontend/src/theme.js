import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
      light: mode === 'dark' ? '#b3e5fc' : '#42a5f5',
      dark: mode === 'dark' ? '#648dae' : '#1565c0',
    },
    background: {
      default: mode === 'dark' ? '#0a1929' : '#ffffff',
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
          boxShadow: mode === 'dark' 
            ? '0 2px 4px rgba(0,0,0,0.3)' 
            : '0 2px 4px rgba(0,0,0,0.1)',
          backgroundColor: mode === 'dark' ? '#101f33' : '#ffffff',
          '& .MuiTypography-root': {
            color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          },
          '& .MuiIconButton-root': {
            color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          },
          '& .MuiButton-root': {
            color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#172b3f' : '#ffffff',
          boxShadow: mode === 'dark'
            ? '0 4px 6px rgba(0, 0, 0, 0.4)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#101f33' : '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: mode === 'dark' 
              ? '0 2px 8px rgba(0, 0, 0, 0.4)'
              : '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
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
});

export { getTheme as default }; 