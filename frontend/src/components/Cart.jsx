import React, { useContext, useState } from 'react';
import AppContext from '../Context/Context';
import CheckoutDialog from './CheckoutDialog';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import {
  RemoveShoppingCart,
  Delete as DeleteIcon,
  ShoppingCart
} from '@mui/icons-material';
import { useNotification } from '../hooks/useNotification';
import axios from '../axios';
import { teal, orange } from '@mui/material/colors';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const calculateTotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await axios.post(`/api/cart/${userId}/purchase`);
      
      if (response.status === 200) {
        showSuccess('Purchase completed successfully!');
        // Clear cart or update UI
      } else {
        showError(`Purchase failed: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      showError(error.response?.data?.message || 'Failed to complete purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 4, minHeight: '60vh' }}>
        <Paper 
          elevation={8}
          sx={{ 
            p: 8,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            borderRadius: '2rem',
            background: `linear-gradient(135deg, ${teal[50]}, ${orange[50]}, ${teal[50]})`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${teal[400]}, ${orange[400]})`,
            }
          }}
        >
          <RemoveShoppingCart sx={{ fontSize: 80, color: teal[300] }} />
          <Typography variant="h4" gutterBottom fontWeight="bold" color={teal[800]}>
            Your cart is empty
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you love!
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ 
        mb: 6,
        p: 4,
        borderRadius: '1.5rem',
        background: `linear-gradient(135deg, ${teal[50]}, ${orange[50]})`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        transform: 'translateY(-20px)',
      }}>
        <Typography variant="h3" 
          sx={{
            fontWeight: 900,
            color: teal[800],
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: `linear-gradient(90deg, ${teal[400]}, ${orange[400]})`,
              borderRadius: '2px',
            }
          }}>
          Your Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ 
            p: 4,
            borderRadius: '1.5rem',
            background: '#ffffff',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${orange[50]}, transparent)`,
              borderRadius: 'inherit',
              zIndex: 0,
            }
          }}>
            {cart.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 3,
                  borderRadius: '1rem',
                  position: 'relative',
                  zIndex: 1,
                  background: '#ffffff',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.product.imageUrl || `https://via.placeholder.com/150?text=${item.product.name}`}
                        alt={item.product.name}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 2,
                          objectFit: 'cover',
                          boxShadow: 2
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {item.product.name}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {item.product.brand}
                          </Typography>
                          <Typography variant="h5" color={teal[600]} fontWeight="bold" gutterBottom>
                            {formatPrice(item.product?.price)}
                          </Typography>
                          <Box sx={{ 
                            mt: 2, 
                            p: 1, 
                            borderRadius: 1, 
                            bgcolor: teal[50],
                            display: 'inline-block'
                          }}>
                            <Typography variant="body1" fontWeight="medium">
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton 
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                          sx={{ 
                            alignSelf: 'flex-start',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              bgcolor: 'error.light'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={6}
            sx={{ 
              p: 4,
              position: 'sticky',
              top: 24,
              borderRadius: '1.5rem',
              background: `linear-gradient(145deg, #ffffff, ${teal[50]})`,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${teal[100]}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.1)`,
            }}
          >
            <Typography variant="h5" gutterBottom color={teal[800]} fontWeight="bold">
              Order Summary
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Items ({cart?.length || 0})</Typography>
              <Typography>{formatPrice(calculateTotal())}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Delivery</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6" color={teal[600]}>
                {formatPrice(calculateTotal())}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => setCheckoutOpen(true)}
              sx={{ 
                mt: 4,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '1rem',
                background: `linear-gradient(135deg, ${teal[600]}, ${teal[700]})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${teal[700]}, ${teal[800]})`,
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.4s ease'
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onPurchase={handlePurchase}
        loading={loading}
      />
    </Container>
  );
};

export default Cart;
