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

const DEFAULT_PRODUCT_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#f8f9fa"/>
      <stop offset="100%" stop-color="#e9ecef"/>
    </linearGradient>
    <pattern id="pattern-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dee2e6" stroke-width="0.5" opacity="0.5"/>
    </pattern>
  </defs>
  
  <rect width="400" height="400" fill="url(#bg-gradient)"/>
  <rect width="400" height="400" fill="url(#pattern-grid)"/>
  
  <g transform="translate(100, 100)">
    <path d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z" 
          fill="#6c757d" opacity="0.1"/>
    <path d="M100 40C66.8629 40 40 66.8629 40 100C40 133.137 66.8629 160 100 160C133.137 160 160 133.137 160 100C160 66.8629 133.137 40 100 40Z" 
          fill="#6c757d" opacity="0.2"/>
    <path d="M100 60C77.9086 60 60 77.9086 60 100C60 122.091 77.9086 140 100 140C122.091 140 140 122.091 140 100C140 77.9086 122.091 60 100 60Z" 
          fill="#6c757d" opacity="0.3"/>
  </g>
  
  <path d="M200 140C178.954 140 162 156.954 162 178C162 199.046 178.954 216 200 216C221.046 216 238 199.046 238 178C238 156.954 221.046 140 200 140Z" 
        fill="#6c757d"/>
        
  <path fill-rule="evenodd" clip-rule="evenodd" 
        d="M160 100H240C262.091 100 280 117.909 280 140V260C280 282.091 262.091 300 240 300H160C137.909 300 120 282.091 120 260V140C120 117.909 137.909 100 160 100ZM240 120H160C148.954 120 140 128.954 140 140V220L170.5 189.5C174.642 185.358 181.358 185.358 185.5 189.5L200 204L229.5 174.5C233.642 170.358 240.358 170.358 244.5 174.5L260 190V140C260 128.954 251.046 120 240 120Z" 
        fill="#6c757d"/>
        
  <circle cx="200" cy="200" r="120" stroke="#6c757d" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
</svg>`)}`;

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
              src={product.imageUrl || DEFAULT_PRODUCT_IMAGE} 
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