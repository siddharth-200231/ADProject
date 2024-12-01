import React from 'react';
import { Box, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ShoppingBagIcon 
        sx={{ 
          fontSize: { xs: '1.5rem', md: '2rem' },
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          borderRadius: '8px',
          padding: '4px',
          color: 'white'
        }} 
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.2rem', md: '1.5rem' },
        }}
      >
        ShopSmart
      </Typography>
    </Box>
  );
};

export default Logo; 