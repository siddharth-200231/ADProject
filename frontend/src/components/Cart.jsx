import React, { useContext, useState } from 'react';
import AppContext from '../Context/Context';
import CheckoutPopup from './CheckoutPopup';

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
      <div className="cart-container empty-cart">
        <i className="bi bi-cart-x"></i>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p className="cart-item-brand">{item.product.brand}</p>
                <p className="cart-item-price">₹{item.product.price}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <button 
            className="checkout-btn"
            onClick={() => setShowCheckout(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <CheckoutPopup
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        cartItems={cart}
        totalPrice={calculateTotal()}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
