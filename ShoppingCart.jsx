import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // ✅ Import user context
import "./css/ShoppingCart.css";
import { FaTrash } from "react-icons/fa";

function ShoppingCart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useUser(); // ✅ Get user info
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.15;
  const total = subtotal - discount;

  return (
    <div className="shopping-cart-layout">
      <div className="shopping-cart-panel">
        <h1>Shopping Cart</h1>
        <div className="cart-header">
          <span>Product</span>
          <span>Quantity</span>
          <span>Total</span>
          <span></span>
        </div>

        {cartItems.map((item) => (
          <div className="cart-item-row" key={item.id}>
            <div className="item-info">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>Set : Colour: {item.color || "Default"}</p>
              </div>
            </div>

            <div className="item-qty">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>

            <div className="item-remove">
              <FaTrash onClick={() => removeFromCart(item.id)} />
            </div>
          </div>
        ))}
      </div>

      <div className="shopping-cart-summary">
        <h3>Order Summary</h3>
        <div className="voucher-row">
          <input type="text" placeholder="Discount voucher" />
          <button>Apply</button>
        </div>
        <div className="summary-breakdown">
          <p>Sub Total <span>{subtotal.toFixed(2)} USD</span></p>
          <p>Discount (5%) <span>-{discount.toFixed(2)} USD</span></p>
        </div>
        <hr />
        <div className="summary-total">
          <p>Total <span>${total.toFixed(2)} USD</span></p>
        </div>
        <div className="warranty">
          <input type="checkbox" checked readOnly />
          <label>
            90 Day Limited Warranty against manufacturer's defects{" "}
            <a href="#">Details</a>
          </label>
        </div>
        <button
          className="checkout-btn"
          onClick={() => {
            if (!user) {
              alert("⚠️ Please Sign In To Continue ");
              navigate("/sign-in");
            } else {
              navigate("/checkout");
            }
          }}
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
