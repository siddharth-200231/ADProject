import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import AppContext from '../Context/Context';
import { useContext } from 'react';

const CheckoutDialog = ({ open, onClose, onPurchase, loading, cart }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Summary</DialogTitle>
      <DialogContent>
        {cart?.map((item) => (
          <Box key={item.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>
              {item.product?.name} x {item.quantity}
            </Typography>
            <Typography>
              ₹{(item.product?.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total: ₹{calculateTotal(cart).toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onPurchase}
          variant="contained" 
          color="primary"
          disabled={loading || !cart?.length}
        >
          {loading ? <CircularProgress size={24} /> : 'Confirm Purchase'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Helper function to calculate total price
const calculateTotal = (items = []) => {
  return items.reduce((total, item) => {
    return total + (item.product?.price * item.quantity);
  }, 0);
};

export default CheckoutDialog; 