import React from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column brand-column">
          <h2 className="brand">ARÔME NOIR</h2>
          <p className="tagline">Crafting elegant scents that define you.</p>
        </div>

        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-column subscribe-column">
          <h4>Stay in the know</h4>
          <p>
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 ARÔME NOIR. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
