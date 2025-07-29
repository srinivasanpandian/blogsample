import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🍕 Pizza Palace</h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/#menu" className="nav-link">Menu</a></li>
            <li><a href="/#about" className="nav-link">About</a></li>
            <li><a href="/blog" className="nav-link">Blog</a></li>
            <li><a href="/#contact" className="nav-link">Contact</a></li>
            <li><a href="/admin" className="nav-link admin-link">Admin</a></li>
          </ul>
        </nav>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
      </div>
    </header>
  );
};

export default Header; 