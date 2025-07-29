import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './BlogPage.css';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load blog posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'pizza', 'recipes', 'news', 'tips'];

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="blog-page">
      <Header />
      
      <main className="blog-page-main">
        <div className="blog-page-hero">
          <div className="blog-page-hero-content">
            <h1>🍕 Pizza Palace Blog</h1>
            <p>Discover delicious recipes, pizza tips, and the latest news from our kitchen</p>
          </div>
        </div>

        <div className="blog-page-container">
          <div className="blog-page-filters">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-page-content">
            {filteredPosts.length === 0 ? (
              <div className="no-posts-page">
                <div className="no-posts-icon">📝</div>
                <h2>No blog posts found</h2>
                <p>
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Check back soon for exciting content!'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="clear-filters-btn"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="blog-posts-count">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                </div>
                
                <div className="blog-posts-grid">
                  {filteredPosts.map((post, index) => (
                    <article key={post.id || index} className="blog-post-card">
                      <div className="blog-post-image">
                        {post.image ? (
                          <img src={post.image} alt={post.title} />
                        ) : (
                          <div className="blog-post-placeholder">🍕</div>
                        )}
                      </div>
                      <div className="blog-post-content">
                        <div className="blog-post-meta">
                          <span className="blog-post-date">
                            {new Date(post.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          {post.category && (
                            <span className="blog-post-category">{post.category}</span>
                          )}
                        </div>
                        <h2 className="blog-post-title">{post.title}</h2>
                        <p className="blog-post-description">{post.description}</p>
                        <button 
                          className="read-more-btn"
                          onClick={() => handleReadMore(post)}
                        >
                          Read More
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Blog Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>
            
            <div className="modal-image">
              {selectedPost.image ? (
                <img src={selectedPost.image} alt={selectedPost.title} />
              ) : (
                <div className="modal-placeholder">🍕</div>
              )}
            </div>
            
            <div className="modal-body">
              <div className="modal-meta">
                <span className="modal-date">
                  {new Date(selectedPost.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {selectedPost.category && (
                  <span className="modal-category">{selectedPost.category}</span>
                )}
              </div>
              
              <h1 className="modal-title">{selectedPost.title}</h1>
              <div className="modal-description">
                {selectedPost.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage; 