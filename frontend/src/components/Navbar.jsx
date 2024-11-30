import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array ensures it only runs once after the component mounts

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
    onSearch(value); // Pass search value to parent component (Home) to filter products
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category); // Call the parent handler if you need to pass this category to a parent component
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <header>
        <nav
          className={`navbar navbar-expand-lg fixed-top ${
            theme === "dark-theme" ? "bg-dark text-light" : "bg-light text-dark"
          } shadow-sm`}
        >
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">
              <i className="bi bi-house-door-door"></i> E-comm
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/add_product">
                    Add Product
                  </a>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category}>
                          <button
                            className="dropdown-item"
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>
                        <button className="dropdown-item" disabled>
                          No categories available
                        </button>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>

              {/* Theme Toggle Button */}
              <button
                className="btn theme-btn border-0 bg-transparent d-flex align-items-center ms-3"
                onClick={toggleTheme}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill text-dark fs-4"></i>
                ) : (
                  <i className="bi bi-sun-fill text-warning fs-4"></i>
                )}
              </button>

              {/* Cart & Search Section */}
              <div className="d-flex align-items-center ms-auto">
                <a
                  href="/cart"
                  className="nav-link text-dark d-flex align-items-center me-3"
                  style={{ fontSize: "1rem" }}
                >
                  <i className="bi bi-cart me-2"></i>
                  Cart
                </a>

                {/* Search Input */}
                <div className="position-relative">
                  <input
                    className="form-control rounded-pill ps-4"
                    type="search"
                    placeholder="Search Products"
                    aria-label="Search"
                    value={input}
                    onChange={handleSearchChange}
                    style={{
                      maxWidth: "300px",
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
