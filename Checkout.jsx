import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Checkout.css';

function Checkout() {
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const directProduct = location.state?.product;
  const items = directProduct ? [{ ...directProduct, quantity: 1 }] : cartItems;

  const [customerInfo, setCustomerInfo] = useState({ fullName: '', email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState({ street: '', apt: '', city: '', state: '', zip: '', country: '' });
  const [billingAddress, setBillingAddress] = useState({ street: '', apt: '', city: '', state: '', zip: '', country: '' });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('Standard');
  const [paymentInfo, setPaymentInfo] = useState({ nameOnCard: '', cardNumber: '', expiry: '', cvv: '' });
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const shippingCosts = { Standard: 5, Express: 10, 'Same-day': 20 };
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingCosts[shippingMethod];
  const taxes = +(subtotal * 0.08).toFixed(2);
  const discount = promoCode ? 5 : 0;
  const total = +(subtotal + shippingCost + taxes - discount).toFixed(2);

  const handleConfirmPurchase = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    console.log('Order ready to be submitted (frontend only):', {
      customerInfo,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      items,
      shippingMethod,
      paymentInfo,
      promoCode,
      totals: { subtotal, shippingCost, taxes, discount, total },
    });

    const orderPayload = {
      customerInfo,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      items,
      shippingMethod,
      paymentInfo,
      promoCode,
      totals: { subtotal, shippingCost, taxes, discount, total },
    };

    try {
      const response = await fetch('http://localhost:9000/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error placing order');

      navigate('/order-success', {
        state: {
          orderId: data.orderId,
          shippingAddress: data.shippingAddress,
          totalPrice: data.totalPrice,
        },
      });
    } catch (err) {
      alert('Failed to place order. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="checkout-container">
      <div className="left-panel">
        <section className="form-section">
          <h3>• Customer Information</h3>
          <input placeholder="Full Name" value={customerInfo.fullName} onChange={e => setCustomerInfo({ ...customerInfo, fullName: e.target.value })} />
          <input placeholder="Email Address" value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} />
          <input placeholder="Phone Number (optional)" value={customerInfo.phone} onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
        </section>

        <section className="form-section">
          <h3>• Shipping Address</h3>
          <input placeholder="Street Address" value={shippingAddress.street} onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })} />
          <input placeholder="Apt/Suite (optional)" value={shippingAddress.apt} onChange={e => setShippingAddress({ ...shippingAddress, apt: e.target.value })} />
          <input placeholder="City" value={shippingAddress.city} onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
          <input placeholder="State/Province/Region" value={shippingAddress.state} onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
          <input placeholder="ZIP/Postal Code" value={shippingAddress.zip} onChange={e => setShippingAddress({ ...shippingAddress, zip: e.target.value })} />
          <input placeholder="Country" value={shippingAddress.country} onChange={e => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
          <label className="checkbox-label">
            <input type="checkbox" checked={sameAsShipping} onChange={e => setSameAsShipping(e.target.checked)} /> Billing address same as shipping
          </label>
        </section>

        {!sameAsShipping && (
          <section className="form-section">
            <h3>• Billing Address</h3>
            <input placeholder="Street Address" value={billingAddress.street} onChange={e => setBillingAddress({ ...billingAddress, street: e.target.value })} />
            <input placeholder="Apt/Suite (optional)" value={billingAddress.apt} onChange={e => setBillingAddress({ ...billingAddress, apt: e.target.value })} />
            <input placeholder="City" value={billingAddress.city} onChange={e => setBillingAddress({ ...billingAddress, city: e.target.value })} />
            <input placeholder="State/Province/Region" value={billingAddress.state} onChange={e => setBillingAddress({ ...billingAddress, state: e.target.value })} />
            <input placeholder="ZIP/Postal Code" value={billingAddress.zip} onChange={e => setBillingAddress({ ...billingAddress, zip: e.target.value })} />
            <input placeholder="Country" value={billingAddress.country} onChange={e => setBillingAddress({ ...billingAddress, country: e.target.value })} />
          </section>
        )}

        <section className="form-section">
          <h3>• Shipping Method</h3>
          <select value={shippingMethod} onChange={e => setShippingMethod(e.target.value)}>
            <option value="Standard">Standard (3-5 days) – $5.00</option>
            <option value="Express">Express (1-2 days) – $10.00</option>
            <option value="Same-day">Same-day – $20.00</option>
          </select>
        </section>

        <section className="form-section">
          <h3>• Payment Information</h3>
          <input placeholder="Name on Card" value={paymentInfo.nameOnCard} onChange={e => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })} />
          <input placeholder="Card Number" value={paymentInfo.cardNumber} onChange={e => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} />
          <input placeholder="Expiration Date (MM/YY)" value={paymentInfo.expiry} onChange={e => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} />
          <input placeholder="CVV/CVC" value={paymentInfo.cvv} onChange={e => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} />
        </section>

        <section className="form-section">
          <h3>• Promo Code</h3>
          <input placeholder="Promo Code" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
        </section>

        <section className="form-section">
          <label className="checkbox-label">
            <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} />
            <span> I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></span>
          </label>
        </section>
      </div>

      <div className="right-panel summary-section">
        <h3>Order Summary</h3>
        <ul className="order-items">
          {items.map(item => (
            <li key={item.id}>{item.title} x{item.quantity} – ${item.price.toFixed(2)}</li>
          ))}
        </ul>
        <ul className="summary-totals">
          <li><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></li>
          <li><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></li>
          <li><span>Taxes</span><span>${taxes.toFixed(2)}</span></li>
          {promoCode && <li><span>Discount</span><span>-${discount.toFixed(2)}</span></li>}
        </ul>
        <h4>Total: ${total.toFixed(2)}</h4>
        <button className="confirm-button" disabled={!agreedToTerms} onClick={handleConfirmPurchase}>✅ Confirm Purchase</button>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#555' }}>
          By confirming the order, I accept the terms of the user agreement.
        </p>
      </div>
    </div>
  );
}

export default Checkout;
