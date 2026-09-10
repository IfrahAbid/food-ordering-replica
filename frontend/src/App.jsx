import "./App.css";
import Branches from "./components/Branches";
import Blog from "./components/Blog";
import PrivacyPolicy from "./components/PrivacyPolicy";
import BlogArticle from "./components/BlogArticle";
import OrderHistory from "./components/OrderHistory";
import AdminOrders from "./components/AdminOrders";
import OrderSuccess from "./components/OrderSuccess";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
import Menu from "./components/Menu";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/branches" element={<Branches />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;