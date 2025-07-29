import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
  }, []);

  return (
    <section id="blog" className="blog">
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Our Blog</h2>
          <p className="blog-subtitle">Latest news, recipes, and stories from Pizza Palace</p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="no-posts">
            <div className="no-posts-icon">📝</div>
            <h3>No blog posts yet</h3>
            <p>Check back soon for exciting content!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <article key={index} className="blog-card">
                <div className="blog-image">
                  {post.image ? (
                    <img src={post.image} alt={post.title} />
                  ) : (
                    <div className="blog-placeholder">🍕</div>
                  )}
                </div>
                <div className="blog-content">
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-post-description">{post.description}</p>
                  <div className="blog-meta">
                    <span className="blog-date">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog; 