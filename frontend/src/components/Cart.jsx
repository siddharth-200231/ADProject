import React, { useContext, useState } from 'react';
import AppContext from '../Context/Context';
import CheckoutPopup from './CheckoutPopup';
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

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCheckout(false);
    alert('Thank you for your purchase!');
  };

  if (!cart || cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 4, minHeight: '60vh' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <RemoveShoppingCart sx={{ fontSize: 60, color: 'text.secondary' }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add some products to your cart to see them here!
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <ShoppingCart sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h4">
          Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            {cart.map((item) => (
              <Card 
                key={item.id} 
                sx={{ 
                  mb: 2, 
                  '&:last-child': { mb: 0 },
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.product.imageUrl || `https://via.placeholder.com/150?text=${item.product.name}`}
                        alt={item.product.name}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 1,
                          objectFit: 'cover'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {item.product.name}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            {item.product.brand}
                          </Typography>
                          <Typography variant="h6" color="primary" gutterBottom>
                            ₹{item.product.price}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                        <IconButton 
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                          sx={{ alignSelf: 'flex-start' }}
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
            elevation={3} 
            sx={{ 
              p: 3, 
              position: 'sticky', 
              top: 24,
              bgcolor: 'background.paper' 
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            
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
              <Typography variant="h6" color="primary">
                ₹{calculateTotal()}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => setShowCheckout(true)}
              sx={{ 
                mt: 2,
                py: 1.5,
                fontWeight: 'bold',
                boxShadow: 2,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: 3
                }
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <CheckoutPopup
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        cartItems={cart}
        totalPrice={calculateTotal()}
        handleCheckout={handleCheckout}
      />
    </Container>
  );
};

export default Cart;
