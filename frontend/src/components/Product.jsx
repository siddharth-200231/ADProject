import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../Context/Context';
import {
  ShoppingCart as CartIcon,
  Add as PlusIcon,
  Remove as MinusIcon,
  LocalShipping as ShippingIcon,
  Inventory as StockIcon,
  Star as RatingIcon
} from '@mui/icons-material';
import './Product.css';
import axios from '../axios';
import LoginModal from './LoginModal';

const Product = () => {
  const { id } = useParams();
  const { addToCart, user } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    console.log('Adding to cart:', { product, quantity, user });
    
    if (!user) {
      console.log('No user logged in');
      setShowLoginModal(true);
      return;
    }

    if (product) {
      try {
        await addToCart(product, quantity);
        console.log('Successfully added to cart');
      } catch (error) {
        console.error('Error in handleAddToCart:', error);
        if (error.message === "Please log in to add items to cart") {
          setShowLoginModal(true);
        } else {
          console.error("Failed to add to cart:", error);
        }
      }
    }
  };

  const getAvailabilityStatus = () => {
    if (!product.available) {
      return {
        text: 'Out of Stock',
        color: 'var(--error-color)',
        icon: <StockIcon sx={{ fontSize: 20, marginRight: 1, color: 'var(--error-color)' }} />
      };
    }
    if (product.stockQuantity <= 5) {
      return {
        text: 'Low Stock',
        color: 'var(--warning-color)',
        icon: <StockIcon sx={{ fontSize: 20, marginRight: 1, color: 'var(--warning-color)' }} />
      };
    }
    return {
      text: 'In Stock',
      color: 'var(--success-color)',
      icon: <StockIcon sx={{ fontSize: 20, marginRight: 1, color: 'var(--success-color)' }} />
    };
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-detail-grid">
          <div className="product-image-section">
            {!product.available && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`product-image ${!product.available ? 'unavailable' : ''}`}
            />
            <div className="image-overlay" />
          </div>
          
          <div className="product-info-section">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              <span className="price-currency">$</span>
              {product.price.toFixed(2)}
            </div>
            
            <div className="availability-status" style={{ color: getAvailabilityStatus().color }}>
              {getAvailabilityStatus().icon}
              <span>{getAvailabilityStatus().text}</span>
            </div>

            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <div className="quantity-control">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || !product.available}
                >
                  <MinusIcon />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockQuantity || !product.available}
                >
                  <PlusIcon />
                </button>
              </div>
              
              <button 
                className={`add-to-cart-btn ${!product.available ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.available}
              >
                <CartIcon />
                {product.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <div className="meta-label">Stock</div>
                <div className="meta-value">
                  <StockIcon sx={{ fontSize: 20, marginRight: 1 }} />
                  {product.stockQuantity} units
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-label">Shipping</div>
                <div className="meta-value">
                  <ShippingIcon sx={{ fontSize: 20, marginRight: 1 }} />
                  Free Delivery
                </div>
              </div>
              
              <div className="meta-item">
                <div className="meta-label">Brand</div>
                <div className="meta-value">
                  {product.brand}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showLoginModal && (
        <LoginModal 
          open={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Product;