import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.png";
import "./css/App.css";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import ListOfProducts from "./ListOfProducts.jsx";
import ProductDetails from "./ProductDetails.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import About from "./about.jsx";
import Checkout from "./Checkout.jsx";
import OrderSuccess from "./OrderSuccess.jsx";
import MyOrder from "./MyOrder.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
  FaBoxOpen,
  FaPlus,
  FaSignOutAlt
} from "react-icons/fa";

import { useCart } from "./CartContext";
import { useUser } from "./UserContext.js";
import { UserProvider } from "./UserContext.js";
import { CartProvider } from "./CartContext";
import Footer from "./Footer";
import ContactUs from "./ContactUs.jsx";
import FAQs from "./Faq.jsx";

function AppContent() {
  const { getTotalItems } = useCart();
  const { user, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleSignOut = () => {
    logout();
    setShowDropdown(false);
  };

  const handleViewOrders = () => {
    const lastOrderId = localStorage.getItem("lastOrderId");
    if (lastOrderId) {
      navigate(`/my-orders/${lastOrderId}`);
    } else {
      alert("No recent order found.");
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="nav-links">
          <Link to="/" className="link">Home</Link>
          <Link to="/products" className="link">Products</Link>
          <Link to="/about" className="link">About</Link>
        </div>

        <div className="nav-icons">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>

          <div className="icon-wrapper">
            <Link to="/shopping-cart" className="icon" style={{ position: 'relative' }}>
              <FaShoppingCart />
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </Link>

            {user ? (
              <div className="account-icon" onClick={toggleDropdown} style={{ position: 'relative' }}>
                <FaUser />
                <div className={`dropdown ${showDropdown ? 'show' : ''}`} ref={dropdownRef}>
                  <div className="profile">
                    <div className="avatar"></div>
                    <div className="profile-info">
                      <div className="name">{user?.username}</div>
                      <div className="email">{user?.email}</div>
                    </div>
                  </div>

                  <div className="menu-item" onClick={handleViewOrders}>
                    <FaBoxOpen />
                    <span>My Orders</span>
                  </div>

                  <div className="menu-item">
                    <FaPlus />
                    <span>Add Account</span>
                  </div>

                  <button onClick={handleSignOut} className="logout-btn">
                    <FaSignOutAlt style={{ marginRight: "8px" }} />
                    Logout
                  </button>

                  <div className="footer">
                    v1 <a href="/about">About</a>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/sign-in" className="sign-in-button">Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ListOfProducts searchQuery={searchQuery} />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders/:orderId" element={<MyOrder />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
