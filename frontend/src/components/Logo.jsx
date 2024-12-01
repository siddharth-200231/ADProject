import React from 'react';
import { Box, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Logo = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.2s ease'
      }
    }}>
      <StorefrontIcon 
        sx={{ 
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderRadius: '12px',
          padding: '6px',
          color: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }} 
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.3rem', md: '1.6rem' },
          letterSpacing: '-0.5px'
        }}
      >
        ShopSmart
      </Typography>
    </Box>
  );
};

export default Logo; 