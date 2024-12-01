import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/Context';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const LoginModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { login, loading } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: 'var(--dark-bg-secondary)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))',
          borderRadius: '16px',
          border: '1px solid var(--glass-border)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Login Required
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ 
            color: 'var(--dark-text-secondary)',
            '&:hover': { color: 'var(--dark-text-primary)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                color: '#ff5252',
                '& .MuiAlert-icon': {
                  color: '#ff5252'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'var(--dark-bg-elevated)',
                '&:hover fieldset': {
                  borderColor: 'var(--primary-color)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'var(--dark-text-secondary)',
              },
              '& .MuiOutlinedInput-input': {
                color: 'var(--dark-text-primary)',
              }
            }}
          />

          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'var(--dark-bg-elevated)',
                '&:hover fieldset': {
                  borderColor: 'var(--primary-color)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'var(--dark-text-secondary)',
              },
              '& .MuiOutlinedInput-input': {
                color: 'var(--dark-text-primary)',
              }
            }}
          />

          <DialogActions sx={{ px: 0, pb: 0 }}>
            <Button 
              onClick={onClose}
              disabled={loading}
              sx={{ 
                color: 'var(--dark-text-secondary)',
                '&:hover': {
                  color: 'var(--dark-text-primary)',
                  backgroundColor: 'var(--dark-hover)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'var(--gradient-primary)',
                '&:hover': {
                  filter: 'brightness(110%)',
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal; 