import axios from "../axios";
import { useState, useEffect, createContext } from "react";

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

  const addToCart = async (product) => {
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
            quantity: 1,
            isUserCart: true
          }
        }
      );
      console.log('Add to cart response:', response.data);
      await fetchCart(); // Refresh cart after adding item
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!user) return;
    
    try {
      setLoading(true);
      await axios.delete(`/api/cart/item/${cartItemId}`);
      await fetchCart(); // Refresh cart after removing item
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", credentials);
      const userData = response.data;
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { 
        success: false, 
        error: error.response?.data || "Invalid credentials" 
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Signup failed:", error);
      return { 
        success: false, 
        error: error.response?.data || "Registration failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('user');
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