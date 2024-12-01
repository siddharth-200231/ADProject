import React, { useState } from 'react';
import { 
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Fade,
  styled
} from '@mui/material';
import { 
  ShoppingCart, 
  Visibility,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Styled components
const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
  borderRadius: '20px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.08)'
    },
    '& .quick-actions': {
      opacity: 1,
      transform: 'translate(-50%, -5px)'
    }
  }
}));

const ProductImage = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(45deg, #f8f9fa, #ffffff)'
});

const QuickActions = styled(Box)({
  position: 'absolute',
  bottom: '1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '0.8rem',
  opacity: 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 2
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: `0 6px 20px ${theme.palette.primary.main}40`
  }
}));

const Card = ({ product }) => {
  const { id, name, brand, price, available, stockQuantity, imageUrl } = product;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Your cart logic here
  };

  return (
    <StyledCard>
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ position: 'relative' }}>
          <ProductImage
            image={imageUrl || "placeholder-image-url"}
            title={name}
          />
          
          {!available && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(2px)'
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Out of Stock
              </Typography>
            </Box>
          )}

          <QuickActions className="quick-actions">
            <ActionButton
              disabled={!available}
              onClick={handleAddToCart}
              size="large"
            >
              <ShoppingCart />
            </ActionButton>
            <ActionButton
              component={Link}
              to={`/product/${id}`}
              size="large"
            >
              <Visibility />
            </ActionButton>
          </QuickActions>
        </Box>

        <CardContent sx={{ p: 2.5 }}>
          <Chip 
            label={brand}
            size="small"
            color="primary"
            sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          />
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              fontSize: '1.2rem',
              lineHeight: 1.4
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 1.5,
              borderTop: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '0.9em',
                  color: 'text.secondary',
                  mr: 0.5 
                }}
              >
                ₹
              </Typography>
              {price.toLocaleString()}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {available ? (
                <Chip
                  icon={<CheckCircleIcon />}
                  label={`${stockQuantity} in stock`}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip
                  icon={<CancelIcon />}
                  label="Out of Stock"
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Link>
    </StyledCard>
  );
};

export default Card;
