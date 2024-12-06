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

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
          elevation={6} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            borderRadius: 4,
            background: `linear-gradient(145deg, ${teal[50]}, ${orange[50]})`,
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
    <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
      <Box sx={{ 
        mb: 5, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        p: 3,
        borderRadius: 2,
        background: `linear-gradient(90deg, ${teal[50]}, ${orange[50]})`,
      }}>
        <ShoppingCart sx={{ fontSize: 40, color: teal[600] }} />
        <Typography variant="h3" fontWeight="bold" color={teal[800]}>
          Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            mb: 2, 
            borderRadius: 3,
            background: `linear-gradient(145deg, ${orange[50]}, #ffffff)`,
          }}>
            {cart.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  '&:last-child': { mb: 0 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
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
                            ₹{item.product.price.toLocaleString()}
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
            elevation={4} 
            sx={{ 
              p: 4, 
              position: 'sticky', 
              top: 24,
              borderRadius: 3,
              background: `linear-gradient(145deg, ${orange[100]}, ${teal[50]})`,
            }}
          >
            <Typography variant="h5" gutterBottom color={teal[800]} fontWeight="bold">
              Order Summary
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Items ({cart.length})</Typography>
              <Typography>₹{calculateTotal()}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Delivery</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6" color={teal[600]}>
                ₹{calculateTotal()}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => setCheckoutOpen(true)}
              sx={{ 
                mt: 3,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                bgcolor: teal[600],
                '&:hover': {
                  bgcolor: teal[700],
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
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
