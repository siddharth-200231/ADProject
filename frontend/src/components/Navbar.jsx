import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    fetchCategories();
    
    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  const handleCategorySelect = (category) => {
    const selectedCat = category === "All" ? "" : category;
    setSelectedCategory(selectedCat);
    onSelectCategory(selectedCat);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const authButtons = user ? (
    <div className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
        {user.username}
      </a>
      <ul className="dropdown-menu">
        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  ) : (
    <>
      <button className="btn btn-outline-primary me-2" onClick={() => setShowLogin(true)}>
        Login
      </button>
      <button className="btn btn-primary" onClick={() => setShowSignup(true)}>
        Sign Up
      </button>
    </>
  );

  const loginModal = showLogin && (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );

  const signupModal = showSignup && (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <Signup onClose={() => setShowSignup(false)} onSignupSuccess={handleSignupSuccess} />
      </div>
    </div>
  );

  return (
    <header className={`fixed-top navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar navbar-expand-lg ${theme === "dark-theme" ? "navbar-dark" : "navbar-light"}`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-shop me-2"></i>
            <span className="brand-text">ShopEase</span>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add_product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li key="all">
                    <button
                      className="dropdown-item"
                      onClick={() => handleCategorySelect("All")}
                    >
                      All
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="nav-actions d-flex align-items-center gap-3">
              <div className="search-bar">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search products..."
                  value={input}
                  onChange={handleSearchChange}
                />
                <i className="bi bi-search"></i>
              </div>

              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-stars-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <Link to="/cart" className="cart-button">
                <i className="bi bi-cart3"></i>
                <span>Cart</span>
              </Link>
              {authButtons}
            </div>
          </div>
        </div>
      </nav>
      {loginModal}
      {signupModal}
    </header>
  );
};

export default Navbar;
