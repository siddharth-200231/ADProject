import React, { useEffect, useState } from "react";
import axios from "../axios";
import Card from "./Card";
import unplugged from "../assets/unplugged.png";
import "./Home.css";
import { Grid, Container, Box, Typography, CircularProgress } from '@mui/material';

const Home = ({ selectedCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products");
        if (response.data) {
          setProducts(response.data);
          setError(null);
        } else {
          setError("No products found");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || "Failed to fetch products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesSearch = !searchQuery || 
      (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
  
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary'
        }}
      >
        <img 
          src={unplugged} 
          alt="Error" 
          style={{ 
            maxWidth: '200px',
            width: '100%',
            marginBottom: '1rem'
          }} 
        />
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 2, sm: 4 },
        bgcolor: 'background.default',
        minHeight: '100vh'
      }}
    >
      {selectedCategory && selectedCategory !== 'All Categories' && (
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 700 
          }}>
            {selectedCategory}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filteredProducts.length} products found
          </Typography>
        </Box>
      )}

      {filteredProducts.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: { xs: 4, sm: 8 } 
        }}>
          <img 
            src={unplugged} 
            alt="No Products" 
            style={{ 
              maxWidth: '200px',
              width: '100%' 
            }} 
          />
          <Typography variant="h5" sx={{ mt: 2 }}>No Products Found</Typography>
          <Typography color="text.secondary">Try adjusting your search or filters</Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
