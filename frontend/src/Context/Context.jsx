import axios from "../axios";
import { useState, useEffect, createContext } from "react";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  user: null,
  loading: false,
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData: () => {},
  login: (userData) => {},
  logout: () => {},
  signup: (userData) => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fetch cart whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchCart();
    } else {
      localStorage.removeItem('user');
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/cart/${user.id}`, {
        params: { isUserCart: true }
      });
      if (response.data && response.data.items) {
        setCart(response.data.items);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity) => {
    if (!user) {
      throw new Error("Please log in to add items to cart");
    }
    
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/cart/${user.id}/add/${product.id}`,
        null,
        { 
          params: {
            quantity: quantity,
            isUserCart: true
          }
        }
      );
      await fetchCart(); // Refresh cart after adding item
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/item/${itemId}`);
      // Update local cart state after successful removal
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      if (response.data) {
        setData(response.data);
        setIsError("");
      } else {
        setIsError("No products found");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsError(error.response?.data?.message || "Failed to fetch products");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", {
        username: userData.name,
        email: userData.email,
        password: userData.password
      });
      
      if (response.data) {
        return { success: true };
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Registration failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCart([]);
  };

  useEffect(() => {
    refreshData();
  }, []);
  
  return (
    <AppContext.Provider 
      value={{ 
        data, 
        isError, 
        cart, 
        user,
        loading,
        addToCart, 
        removeFromCart,
        refreshData,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

