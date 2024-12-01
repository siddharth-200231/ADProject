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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { SnackbarProvider } from 'notistack';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useMemo(() => getTheme('dark'), []);

  useEffect(() => {
    document.body.className = 'dark-theme';
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="dark-theme">
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <Navbar 
              onSelectCategory={handleCategorySelect} 
              onSearch={setSearchQuery}
              isDarkMode={true}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home selectedCategory={selectedCategory} searchQuery={searchQuery} />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add_product" element={<AddProduct />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
