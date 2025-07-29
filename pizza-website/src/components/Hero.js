import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            The Best Pizza in Town
          </h1>
          <p className="hero-subtitle">
            Fresh ingredients, authentic recipes, and oven-baked perfection. 
            Experience the taste that makes us famous!
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Order Now</button>
            <a href="/#menu" className="btn btn-secondary">View Menu</a>
            <a href="/blog" className="btn btn-secondary">View Blog</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="pizza-illustration">
            🍕
          </div>
        </div>
      </div>
      <div className="hero-features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <span className="feature-text">Fast Delivery</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🔥</span>
          <span className="feature-text">Fresh Baked</span>
        </div>
        <div className="feature">
          <span className="feature-icon">⭐</span>
          <span className="feature-text">5-Star Rated</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 