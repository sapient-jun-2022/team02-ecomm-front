import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./Pages/Shop/Products/Products";
import ProductDetail from "./Pages/Shop/ProductDetail/ProductDetail";
import Error from "./Pages/Error/Error";
import Cart from "./Pages/Shop/Cart/Cart";
import Order from "./Pages/Shop/Order/Order";
import Login from "./Pages/Shop/Login/Login";
import SignUp from "./Pages/Shop/SignUp/SignUp";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
