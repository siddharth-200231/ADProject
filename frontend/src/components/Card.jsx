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
  Cancel as CancelIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AppContext from '../Context/Context';

// Styled components
const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #1a2635 0%, #0d1b2a 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: theme.breakpoints.down('sm') ? '12px' : '16px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
  [theme.breakpoints.down('sm')]: {
    '&:hover': {
      transform: 'none',
      '& .quick-actions': {
        opacity: 1,
        transform: 'translateY(0)',
      }
    }
  },
  [theme.breakpoints.up('sm')]: {
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 12px 30px rgba(0, 0, 0, 0.5)'
        : '0 12px 30px rgba(0, 0, 0, 0.15)',
      '& .MuiCardMedia-root': {
        transform: 'scale(1.1)'
      }
    }
  }
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '100%',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#2a3441' : '#f8f9fa',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '75%',
  }
}));

const QuickActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '1rem',
  left: '50%',
  transform: 'translate(-50%, 20px)',
  display: 'flex',
  gap: '0.8rem',
  opacity: 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    bottom: '0.5rem',
    gap: '0.5rem',
    '& .MuiIconButton-root': {
      width: 32,
      height: 32,
      '& svg': {
        fontSize: 16
      }
    }
  }
}));

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

const Card = ({ product }) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return null;
  }

  const { addToCart, user } = useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

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
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', flex: 1 }}>
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <ProductImage 
            image={product.imageUrl}
            title={product.name}
            sx={{
              backgroundSize: 'contain',
              backgroundColor: theme.palette.mode === 'dark' ? '#2a3441' : '#f8f9fa',
            }}
          />
          {!product.available && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}
            >
              <Typography
                sx={{
                  color: 'error.main',
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  transform: 'rotate(-15deg)',
                  fontWeight: 600
                }}
              >
                Out of Stock
              </Typography>
            </Box>
          )}
          <QuickActions className="quick-actions">
            <IconButton
              size="small"
              onClick={(e) => handleAddToCart(e)}
              sx={{ 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                '& svg': {
                  fontSize: { xs: 16, sm: 20 }
                }
              }}
            >
              <ShoppingCart />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              to={`/product/${product.id}`}
              sx={{ 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                '& svg': {
                  fontSize: { xs: 16, sm: 20 }
                }
              }}
            >
              <Visibility />
            </IconButton>
          </QuickActions>
        </Box>
        <CardContent sx={{ 
          p: { xs: 1.5, sm: 2.5 }, 
          flex: 1 
        }}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3
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
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                '& .MuiChip-icon': {
                  fontSize: '1rem'
                }
              }}
            />
          </Box>
        </CardContent>
      </Link>
    </StyledCard>
  );
};

export default Card;
