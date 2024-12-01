import "./App.css";
import React, { useState, useMemo, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProduct from "./components/UpdateProduct";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from './theme';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.body.className = mode === 'dark' ? 'dark-theme' : '';
  }, [mode]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={mode === 'dark' ? 'dark-theme' : ''}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar 
            onSelectCategory={handleCategorySelect} 
            onSearch={setSearchQuery}
            onThemeToggle={toggleTheme}
            isDarkMode={mode === 'dark'}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home selectedCategory={selectedCategory} searchQuery={searchQuery} />
              }
            />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/update/:id" element={<UpdateProduct />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
