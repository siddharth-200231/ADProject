import React, { useEffect, useState } from "react";
import axios from "../axios";
import Card from "./Card";
import unplugged from "../assets/unplugged.png";
import "./Home.css";

const Home = ({ selectedCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    let matches = true;
    
    if (selectedCategory) {
      matches = matches && product.category === selectedCategory;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches && (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return matches;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <img src={unplugged} alt="Error" className="error-image" />
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {selectedCategory && (
        <div className="category-header">
          <h1 className="category-title">{selectedCategory}</h1>
          <p className="category-count">{filteredProducts.length} products found</p>
        </div>
      )}

      <div className="products-section">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <img src={unplugged} alt="No Products" />
            <h2>No Products Found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
