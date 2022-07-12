import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Shop/Products/Products";
import ProductDetail from "./Pages/Shop/ProductDetail/ProductDetail";
import Error from "./Pages/Error/Error";
import Cart from "./Pages/Shop/Cart/Cart";
import Order from "./Pages/Shop/Order/Order";
import Login from "./Pages/Shop/Login/Login";
import SignUp from "./Pages/Shop/SignUp/SignUp";
import Admin from "./Pages/Admin/Admin";
import ProductList from "./Pages/Admin/Products/ProductList/ProductList";
import AddProduct from "./Pages/Admin/Products/AddProduct/AddProduct";

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
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="admin" element={<Admin />} >
            <Route path="product" element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="add/:productId" element={<AddProduct />} />
            <Route path="product" element={<ProductList />} />
            {/* <Route path="" element={<ProductList />} /> */}
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
