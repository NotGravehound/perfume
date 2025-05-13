import React from 'react';
import './css/home.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext";

function Home() {
  const navigate = useNavigate();
  const cart = useCart(); // this might be undefined if CartProvider isn't wrapping properly

  if (!cart) {
    return <div style={{ color: 'red', padding: '20px' }}>❌ Error: Cart context not available. Check if CartProvider is wrapping your app.</div>;
  }

  const { addToCart, cartItems } = cart;

  console.log("🧪 useCart hook result:", { addToCart, cartItems });

  const products = [
    {
      id: 31,
      name: "Louis Vuitton - Ombre Nomade",
      price: "$340.00",
      imageUrl: "https://scentira.in/cdn/shop/files/3_1_9e720d9d-62c8-44da-97c6-e90a019c91f8.png?v=1717091006&width=1080"
    },
    {
      id: 32,
      name: "Dior - Sauvage Elixir",
      price: "$230.00",
      imageUrl: "https://scentira.in/cdn/shop/files/2_a7995d64-4eb0-45fb-a239-99f403df56f3.png?v=1717014397&width=1080"
    },
    {
      id: 33,
      name: "Gucci - A Chant for the Nymph",
      price: "$295.00",
      imageUrl: "https://pinoyfragrance.com/cdn/shop/products/14-067-Gucci-Spotlight-image-4.jpg?v=1623059968"
    },
    {
      id: 34,
      name: "Maison Francis Kurkdjian - Baccarat Rouge 540",
      price: "$325.00",
      imageUrl: "https://brandedfragrance.com/wp-content/uploads/2021/07/maison-francis-kurkdjian-baccarat-rouge-540-extrait-de-parfum-samplesdecants-maison-francis-kurkdijian-296302-1.jpg"
    },
    {
      id: 12,
      name: "Creed - Aventus",
      price: "$435.00",
      imageUrl: "https://images-cdn.ubuy.co.in/634ee68548578419b8535618-creed-creed-aventus-cologne-cologne.jpg"
    }
  ];

  const handleShopNow = () => {
    navigate('/products');
  };

  const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^0-9.]/g, ''));

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-left">
          <h1>Explore Our Finest Perfume Collection</h1>
          <p className="subtext">Unlock Your Unique Signature<br />Find the Perfect Scent for Every Occasion</p>
        </div>
        <div className="hero-center">
          <img className="main-bottle" src="https://cdn.pixabay.com/photo/2024/04/29/13/54/ai-generated-8727927_1280.jpg" alt="Main Perfume" />
        </div>
        <div className="hero-right">
          <h3>Discover Exquisite<br />Fragrances at Your Fingertips</h3>
          <p>Indulge Your Senses in a World of Captivating Aromas</p>
          <button className="shop-now-small" onClick={handleShopNow}>Shop Now</button>
        </div>
      </section>

      <section className="best-sellers">
        <h2>Best Selling Products</h2>
        <div className="product-row">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <button
                  className="add-btn"
                  onClick={() => {
                    console.log("➕ Clicked to add:", product);
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: parsePrice(product.price),
                      image: product.imageUrl,
                    });
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <h3>10% Off</h3>
        <p>Our all New Arrivals</p>
        <button className="explore-btn" onClick={handleShopNow}>Explore More</button>
      </section>
    </div>
  );
}

export default Home;
