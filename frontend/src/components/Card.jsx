import React, { useState, useContext } from 'react';
import { 
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Grid,
  styled,
  useTheme
} from '@mui/material';
import { 
  ShoppingCart, 
  Visibility,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AppContext from '../Context/Context';

// Styled components
const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a2635 0%, #0d1b2a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: theme.breakpoints.down('sm') ? '12px' : '20px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
  '&:hover': {
    transform: theme.breakpoints.up('sm') ? 'translateY(-8px)' : 'none',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 25px rgba(0, 0, 0, 0.5)'
      : '0 8px 25px rgba(0, 0, 0, 0.15)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.08)'
    }
  }
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '100%',
  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#2a3441' : '#f8f9fa',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.05) 100%)',
  }
}));

const QuickActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '0.8rem',
  opacity: 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 2,
  '& .MuiIconButton-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.9)',
    color: theme.palette.mode === 'dark' ? '#fff' : '#1a2635',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : theme.palette.primary.main,
      color: theme.palette.mode === 'dark' ? '#fff' : '#fff',
    }
  }
}));

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

const Card = ({ product }) => {
  const theme = useTheme();

  if (!product) {
    return null;
  }

  const { addToCart, user } = useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      await addToCart(product);
    } catch (error) {
      if (error.message === "Please log in to add items to cart") {
        setShowLoginModal(true);
      } else {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  return (
    <StyledCard>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <ProductImage image={product.imageUrl} title={product.name} />
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '1rem', sm: '1.1rem' }
              }}
            >
              {product.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                mb: 1.5,
                fontSize: { xs: '0.8rem', sm: '0.9rem' }
              }}
            >
              {product.brand}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 1.5,
                fontSize: { xs: '1.1rem', sm: '1.2rem' }
              }}
            >
              ₹{formatPrice(product.price)}
            </Typography>
            <Chip
              icon={product.available ? <CheckCircleIcon /> : <CancelIcon />}
              label={product.available ? `${product.stockQuantity} in stock` : "Out of Stock"}
              size="small"
              color={product.available ? "success" : "error"}
              variant="outlined"
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.04)',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.15)'
              }}
            />
          </Box>
        </CardContent>
      </Link>
    </StyledCard>
  );
};

export default Card;
