import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">🍕 Pizza Palace</h3>
            <p className="footer-description">
              Serving the best pizzas in town since 1995. 
              Fresh ingredients, authentic recipes, and unforgettable taste.
            </p>
            <div className="social-links">
              <button className="social-link">📘</button>
              <button className="social-link">📷</button>
              <button className="social-link">🐦</button>
              <button className="social-link">📺</button>
            </div>
          </div>
          
                      <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/#menu">Menu</a></li>
                <li><a href="/#about">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>📍 123 Pizza Street, Foodie City</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ hello@pizzapalace.com</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Hours</h4>
            <ul className="footer-hours">
              <li>Monday - Sunday</li>
              <li>11:00 AM - 10:00 PM</li>
              <li>Open 7 days a week!</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Pizza Palace. All rights reserved.</p>
          <p>Made with ❤️ for pizza lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 