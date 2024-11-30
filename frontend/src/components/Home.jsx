import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import Card from "../components/Card";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products and images only when data is available
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: unplugged }; // Fallback to placeholder image
            }
          })
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts); // Initially set all products as filtered
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  // Filter products by selected category
  const filterProducts = (searchQuery) => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Error handling
  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: "6rem", height: "6rem" }} />
        <p>There was an error fetching products.</p>
      </h2>
    );
  }

  // Loading or empty state
  if (!data || products.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "4rem" }}>
        <img src={unplugged} alt="No Products" style={{ width: "6rem", height: "6rem" }} />
        <p>No Products Available</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} product={product} addToCart={addToCart} />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
