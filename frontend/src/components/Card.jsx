import React from 'react';
import { Link } from 'react-router-dom';
import unplugged from '../assets/unplugged.png';

const Card = ({ product, addToCart }) => {
  const { id, brand, name, price, available, imageUrl } = product;

  return (
    <div
      className="card modern-card"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
        position: "relative",
        marginBottom: "2rem", // Add some margin between cards
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Link
        to={`/product/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={imageUrl || unplugged} // Default to placeholder if no image
            alt={name}
            style={{
              width: "100%",
              height: "16rem", // Adjust the height for better proportions
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
              borderBottom: "2px solid #eee", // Clean bottom border
            }}
          />
          {!available && ( // Display "Out of Stock" only when available is false
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              OUT OF STOCK
            </div>
          )}
        </div>

        <div
          className="card-body"
          style={{
            padding: "1.5rem 1rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <div>
            <h5
              className="card-title"
              style={{
                fontSize: "1.3rem", // Slightly larger font for modern touch
                fontWeight: "600",
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "1.5px", // Spacing for a modern feel
                marginBottom: "0.8rem", // More spacing for clarity
              }}
            >
              {name}
            </h5>
            <p
              className="card-brand"
              style={{
                fontStyle: "italic",
                fontSize: "1rem",
                color: "#777",
                marginBottom: "0.8rem",
              }}
            >
              {"~ " + brand}
            </p>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              margin: "1rem 0",
            }}
          />
          <div className="home-cart-price">
            <h5
              className="card-text"
              style={{
                fontWeight: "600",
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "0.8rem",
              }}
            >
              <i className="bi bi-currency-rupee"></i>
              {price}
            </h5>
          </div>
          <button
            className="btn-hover color-9"
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: available ? "#28a745" : "#6c757d", // Green for available, gray for out of stock
              color: "#fff",
              borderRadius: "0.5rem",
              border: "none",
              cursor: available ? "pointer" : "not-allowed",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
              marginTop: "1rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (available) {
                addToCart(product);
              }
            }}
            disabled={!available} // Disable if product is not available
          >
            {available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
