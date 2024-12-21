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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, minHeight: '70vh' }}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 6,
            textAlign: 'center',
            borderRadius: '16px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          <ShoppingCart sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
          <Typography variant="h4" fontWeight={600}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            Start shopping to add items to your cart
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/"
            sx={{
              mt: 2,
              borderRadius: '8px',
              textTransform: 'none',
              px: 4
            }}
          >
            Browse Products
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
        Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            {cart.map((item, index) => (
              <React.Fragment key={item.id}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.product.imageUrl || `https://via.placeholder.com/150?text=${item.product.name}`}
                        alt={item.product.name}
                        sx={{
                          width: '100%',
                          aspectRatio: '1',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.product.brand}
                      </Typography>
                      <Box 
                        sx={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          bgcolor: 'grey.100',
                          borderRadius: '8px',
                          px: 2,
                          py: 0.5,
                          mt: 1
                        }}
                      >
                        <Typography variant="body2">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ textAlign: { sm: 'right' } }}>
                      <Typography variant="h6" fontWeight={600}>
                        {formatPrice(item.product?.price * item.quantity)}
                      </Typography>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                        sx={{ mt: 1, textTransform: 'none' }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                {index < cart.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '16px',
            position: 'sticky',
            top: 24
          }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={500}>{formatPrice(calculateTotal())}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography color="success.main" fontWeight={500}>Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography variant="h6" fontWeight={600}>
                  {formatPrice(calculateTotal())}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setCheckoutOpen(true)}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Checkout
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
