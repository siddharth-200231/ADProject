import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import unplugged from '../assets/unplugged.png';
import AppContext from '../Context/Context';
import { Modal, Button } from 'react-bootstrap';

const Card = ({ product }) => {
  const { id, brand, name, price, available, imageUrl, stockQuantity } = product;
  const { addToCart, user } = useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!available) return;
    
    try {
      await addToCart(product);
      // Add animation class to button
      e.currentTarget.classList.add('clicked');
      setTimeout(() => e.currentTarget.classList.remove('clicked'), 300);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      if (!user) {
        setShowLoginModal(true);
      }
    }
  };

  return (
    <>
      <div 
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${id}`} className="product-link">
          <div className="product-image-wrapper">
            <img
              src={imageUrl || unplugged}
              alt={name}
              className="product-image"
              onError={(e) => {
                e.target.src = unplugged;
                e.target.onerror = null;
              }}
            />
            {!available && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
            <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
              <button
                className={`add-to-cart-btn ${!available ? 'disabled' : ''}`}
                onClick={handleAddToCart}
                disabled={!available}
                aria-label="Add to cart"
              >
                <i className="bi bi-cart-plus"></i>
              </button>
              <button className="view-details-btn" aria-label="View details">
                <i className="bi bi-eye"></i>
              </button>
            </div>
          </div>

          <div className="product-details">
            <div className="product-info">
              <span className="product-brand">{brand}</span>
              <h3 className="product-name">{name}</h3>
            </div>
            
            <div className="product-footer">
              <div className="product-price">
                <span className="currency">₹</span>
                <span className="amount">{price.toLocaleString()}</span>
              </div>
              <div className="product-status">
                {available ? (
                  <span className="in-stock">
                    <i className="bi bi-check-circle-fill"></i>
                    {stockQuantity} in stock
                  </span>
                ) : (
                  <span className="out-of-stock">
                    <i className="bi bi-x-circle-fill"></i>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in to add items to your cart.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Link to="/login">
            <Button variant="primary" onClick={() => setShowLoginModal(false)}>
              Go to Login
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
