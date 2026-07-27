import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Product from "./components/Product";

import { AppProvider } from "./Context/Context";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>

        <Navbar onSelectCategory={handleCategorySelect} />

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                selectedCategory={selectedCategory}
              />
            }
          />

          {/* Add Product */}
          <Route
            path="/add_product"
            element={<AddProduct />}
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<Product />}
          />

          {/* Update Product */}
          <Route
            path="/product/update/:id"
            element={<UpdateProduct />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}

export default App;