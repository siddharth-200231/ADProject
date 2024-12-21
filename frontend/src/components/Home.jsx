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
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#121212',
      pt: 4,
      pb: 6
    }}>
      <Container maxWidth="xl">
        {selectedCategory && selectedCategory !== 'All Categories' && (
          <Box sx={{ 
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            bgcolor: '#1e1e1e',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                {selectedCategory}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#9e9e9e',
                  mt: 0.5 
                }}
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </Typography>
            </Box>
          </Box>
        )}

        {filteredProducts.length === 0 ? (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            bgcolor: '#1e1e1e',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            p: 4
          }}>
            <img 
              src={unplugged} 
              alt="No Products" 
              style={{ 
                width: '120px',
                marginBottom: '24px',
                opacity: '0.7'
              }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#ffffff' }}>
              No Products Found
            </Typography>
            <Typography sx={{ color: '#9e9e9e' }}>
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <Grid 
            container 
            spacing={3}
            sx={{
              position: 'relative',
              '& .MuiGrid-item': {
                display: 'flex'
              }
            }}
          >
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Box sx={{ 
                  width: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    filter: 'brightness(1.1)'
                  }
                }}>
                  <Card product={product} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
