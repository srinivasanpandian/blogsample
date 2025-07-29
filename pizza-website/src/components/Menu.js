import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: "Margherita Classic",
      description: "Fresh mozzarella, tomato sauce, and basil",
      price: 12.99,
      category: "classic",
      image: "🍕",
      popular: true
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      description: "Spicy pepperoni with melted cheese",
      price: 15.99,
      category: "meat",
      image: "🍕"
    },
    {
      id: 3,
      name: "Vegetarian Delight",
      description: "Bell peppers, mushrooms, onions, and olives",
      price: 13.99,
      category: "vegetarian",
      image: "🍕"
    },
    {
      id: 4,
      name: "BBQ Chicken",
      description: "Grilled chicken with BBQ sauce and red onions",
      price: 16.99,
      category: "meat",
      image: "🍕"
    },
    {
      id: 5,
      name: "Hawaiian Paradise",
      description: "Ham and pineapple with a sweet touch",
      price: 14.99,
      category: "classic",
      image: "🍕"
    },
    {
      id: 6,
      name: "Supreme Deluxe",
      description: "Pepperoni, sausage, bell peppers, mushrooms, onions",
      price: 18.99,
      category: "meat",
      image: "🍕",
      popular: true
    },
    {
      id: 7,
      name: "Spinach & Feta",
      description: "Fresh spinach, feta cheese, and garlic",
      price: 14.99,
      category: "vegetarian",
      image: "🍕"
    },
    {
      id: 8,
      name: "Buffalo Chicken",
      description: "Spicy buffalo chicken with ranch drizzle",
      price: 17.99,
      category: "meat",
      image: "🍕"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Pizzas' },
    { id: 'classic', name: 'Classic' },
    { id: 'meat', name: 'Meat Lovers' },
    { id: 'vegetarian', name: 'Vegetarian' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="menu">
      <div className="menu-container">
        <div className="menu-header">
          <h2 className="menu-title">Our Delicious Menu</h2>
          <p className="menu-subtitle">Handcrafted pizzas made with love and fresh ingredients</p>
        </div>

        <div className="menu-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`menu-item ${item.popular ? 'popular' : ''}`}>
              {item.popular && <span className="popular-badge">🔥 Popular</span>}
              <div className="menu-item-image">
                <span className="pizza-emoji">{item.image}</span>
              </div>
              <div className="menu-item-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">${item.price}</span>
                  <button className="order-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu; 