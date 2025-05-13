import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useUser } from './UserContext';
import './css/ProductDetails.css';

function ProductDetails() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();

  if (!state) {
    return <p>No product data available.</p>;
  }

  const handleAddToCart = () => {
    addToCart(state);
    navigate('/shopping-cart');
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('⚠️ Please Sign In To Continue  ');
      navigate('/sign-in');
      return;
    }
    navigate('/checkout', { state: { product: state } });
  };

  return (
    <div className="product-details-wrapper">
      <div className="product-image-card">
        <img src={state.image} alt={state.title} />
      </div>

      <div className="product-info-block">
        <h1>{state.title}</h1>
        <p className="description">{state.description}</p>
        <p className="price">${state.price}</p>

        <div className="action-buttons">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
