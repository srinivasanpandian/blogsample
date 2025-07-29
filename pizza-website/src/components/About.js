import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">Our Story</h2>
            <p className="about-description">
              Founded in 1995, Pizza Palace has been serving the community with 
              authentic Italian-style pizzas for over 25 years. What started as a 
              small family-owned pizzeria has grown into one of the most beloved 
              pizza destinations in town.
            </p>
            <p className="about-description">
              Our secret lies in our traditional recipes passed down through 
              generations, combined with the freshest local ingredients. Every 
              pizza is handcrafted with love and baked to perfection in our 
              stone-fired ovens.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Fresh Ingredients</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span className="pizza-icon">🍕</span>
              <span className="chef-icon">👨‍🍳</span>
              <span className="oven-icon">🔥</span>
            </div>
          </div>
        </div>
        
        <div className="about-features">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Fresh Dough</h3>
            <p>Made daily with premium flour and our secret recipe</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧀</div>
            <h3>Quality Cheese</h3>
            <p>Imported mozzarella and locally sourced dairy products</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍅</div>
            <h3>Fresh Toppings</h3>
            <p>Handpicked vegetables and premium meats daily</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 