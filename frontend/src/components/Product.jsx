import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import unplugged from "../assets/unplugged.png";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        setImageUrl(unplugged);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      refreshData();
      navigate("/");
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    if (product.available) {
      addToCart(product);
      alert("Product added to cart");
    }
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <div className="product-detail-image">
          <img
            src={imageUrl || unplugged}
            alt={product.name}
            onError={(e) => {
              e.target.src = unplugged;
              e.target.onerror = null;
            }}
          />
        </div>

        <div className="product-detail-info">
          <div className="product-detail-header">
            <div className="product-category-date">
              <span className="product-category">{product.category}</span>
              <span className="product-date">
                Listed: {new Date(product.releaseDate).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="product-detail-name">{product.name}</h1>
            <span className="product-detail-brand">{product.brand}</span>
          </div>

          <div className="product-detail-description">
            <h2>Product Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-detail-price-stock">
            <div className="price-stock-info">
              <h2 className="product-detail-price">${product.price}</h2>
              <span className={`stock-status ${product.available ? 'in-stock' : 'out-of-stock'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="stock-quantity">
                Stock Available: {product.stockQuantity} units
              </span>
            </div>

            <button
              className={`add-to-cart-button ${!product.available ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              {product.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className="product-detail-actions">
            <button
              className="edit-button"
              onClick={handleEditClick}
            >
              <i className="bi bi-pencil"></i> Edit Product
            </button>
            <button
              className="delete-button"
              onClick={deleteProduct}
            >
              <i className="bi bi-trash"></i> Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;