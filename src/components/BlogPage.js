import React, { useState, useEffect, useCallback } from 'react';
import { blogAPI } from '../services/apiService';
import Header from './Header';
import Footer from './Footer';
import './BlogPage.css';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    hasNext: false,
    hasPrev: false
  });

  const loadBlogPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      };

      const response = await blogAPI.getAll(params);
      
      setBlogPosts(response.data || []);
      setPagination(response.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 0,
        hasNext: false,
        hasPrev: false
      });
    } catch (error) {
      console.error('Error loading blogs:', error);
      setError('Error loading blog posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, pagination.currentPage]);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);



  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const categories = ['all', 'pizza', 'recipes', 'news', 'tips'];

  if (isLoading && blogPosts.length === 0) {
    return (
      <div className="blog-page">
        <Header />
        <main className="blog-page-main">
          <div className="blog-hero">
            <h1>🍕 Our Blog</h1>
            <p>Discover delicious recipes, tips, and pizza stories</p>
          </div>
          <div className="loading-container">
            <div className="loading">Loading blog posts...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <Header />
      <main className="blog-page-main">
        <div className="blog-hero">
          <h1>🍕 Our Blog</h1>
          <p>Discover delicious recipes, tips, and pizza stories</p>
        </div>

        <div className="blog-filters">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Posts' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {blogPosts.length === 0 && !isLoading ? (
          <div className="no-posts">
            <div className="no-posts-icon">📝</div>
            <h2>No blog posts found</h2>
            <p>
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or category filter'
                : 'Check back soon for new posts!'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="blog-posts-grid">
              {blogPosts.map((post) => (
                <article key={post._id} className="blog-post-card">
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
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
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
                    <p className="blog-post-description">
                      {post.description.length > 150
                        ? `${post.description.substring(0, 150)}...`
                        : post.description
                      }
                    </p>
                    <div className="blog-post-footer">
                      <button
                        className="read-more-btn"
                        onClick={() => handleReadMore(post)}
                      >
                        Read More
                      </button>
                      {post.views > 0 && (
                        <span className="blog-post-views">👁️ {post.views} views</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="pagination-btn"
                >
                  ← Previous
                </button>
                
                <div className="pagination-info">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      {/* Blog Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
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
                  {new Date(selectedPost.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {selectedPost.category && (
                  <span className="modal-category">{selectedPost.category}</span>
                )}
                {selectedPost.views > 0 && (
                  <span className="modal-views">👁️ {selectedPost.views} views</span>
                )}
              </div>
              <h1 className="modal-title">{selectedPost.title}</h1>
              <div className="modal-description">{selectedPost.description}</div>
              {selectedPost.author && (
                <div className="modal-author">
                  By {selectedPost.author.username}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage; 