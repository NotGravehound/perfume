import React from "react";
import "./css/about.css";
import { Link } from "react-router-dom";

const scrollToTop = () => {
    window.scrollTo(0, 0);
};

const About = () => {
    return (
        <div className="about-us-wrapper">

            {/* Hero Section */}
            <section className="hero-section animate-fade">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>About Us</h1>
                        <p className="hero-subtext">Crafting luxury fragrances that tell your story.</p>
                    </div>
                    <div className="hero-image">
                        <img src="https://i.pinimg.com/736x/b3/b4/10/b3b4104ffaf23a2ff9e0afab1ec1f4c4.jpg" alt="Perfume Illustration" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section animate-fade">
                <div className="feature-box">
                    <div className="icon">✨</div>
                    <h3>The Perfection</h3>
                    <p>Our curated fragrances define timeless elegance and luxury.</p>
                </div>
                <div className="feature-box">
                    <div className="icon">📦</div>
                    <h3>Fast Shipping</h3>
                    <p>Speedy delivery straight to your doorstep.</p>
                </div>
                <div className="feature-box">
                    <div className="icon">🎧</div>
                    <h3>24/7 Support</h3>
                    <p>Our customer care team is always here to assist you.</p>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section animate-fade">
                <div className="stat-block">
                    <h2>13</h2>
                    <p>Years Experience</p>
                </div>
                <div className="stat-block">
                    <h2>30+</h2>
                    <p>Products</p>
                </div>
                <div className="stat-block">
                    <h2>100+</h2>
                    <p>Happy Customers</p>
                </div>
                <div className="stat-block">
                    <h2>5K+</h2>
                    <p>Orders Delivered</p>
                </div>
            </section>

            {/* Highlight */}
            <section className="about-highlight animate-fade">
                <div className="image"></div>
                <div className="text">
                    <h2>About</h2>
                    <h3>The New Fresh Sensation</h3>
                    <p>
                        Discover our exclusive perfume collection that redefines freshness, elegance,
                        and luxury with every spray.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefit-section animate-fade">
                <h2>Benefit</h2>
                <h3>Perks & Benefits</h3>
                <div className="benefits">
                    <div>
                        <div className="icon">💳</div>
                        <h4>Quick Payment</h4>
                        <p>Fast and secure checkout with multiple payment options.</p>
                    </div>
                    <div>
                        <div className="icon">🏷️</div>
                        <h4>Affordable Prices</h4>
                        <p>Premium quality perfumes at unbeatable prices.</p>
                    </div>
                    <div>
                        <div className="icon">💥</div>
                        <h4>Big Deals</h4>
                        <p>Seasonal offers and limited-time discounts for our members.</p>
                    </div>
                </div>
            </section>

            {/* Promo */}
            <section className="pastel-promo-section animate-fade">
                <div className="pastel-promo">
                    <div className="promo-left">
                        <h3>Limited Edition Offer</h3>
                        <p>Get your favorite scents at <strong>10% OFF</strong></p>
                    </div>
                    <Link to="/products" className="promo-btn" onClick={scrollToTop}>Shop Now</Link>
                </div>
            </section>

        </div>
    );
};

export default About;

