import React, { useState, useEffect, useCallback } from 'react';
import { authAPI, blogAPI, imageAPI } from '../services/apiService';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Setup admin state
  const [setupData, setSetupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Blog form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: 'pizza'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      if (authAPI.isAuthenticated()) {
        const user = authAPI.getCurrentUser();
        if (user && user.role === 'admin') {
          setIsAuthenticated(true);
          loadBlogPosts();
        } else {
          authAPI.logout();
          setShowLogin(true);
        }
      } else {
        setShowLogin(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setShowLogin(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check authentication on component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadBlogPosts = async () => {
    try {
      const response = await blogAPI.getAll({ limit: 100 });
      setBlogPosts(response.data || []);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setMessage('Error loading blog posts');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await authAPI.login(loginData);
      if (response.data?.user?.role === 'admin') {
        setIsAuthenticated(true);
        setShowLogin(false);
        loadBlogPosts();
        setMessage('Login successful!');
      } else {
        setMessage('Access denied. Admin privileges required.');
        authAPI.logout();
      }
    } catch (error) {
      setMessage(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetupAdmin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    if (setupData.password !== setupData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      await authAPI.setupAdmin({
        username: setupData.username,
        email: setupData.email,
        password: setupData.password
      });
      
      setIsAuthenticated(true);
      setShowLogin(false);
      setShowSetup(false);
      loadBlogPosts();
      setMessage('Admin account created successfully!');
    } catch (error) {
      setMessage(error.message || 'Setup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setShowLogin(true);
    setBlogPosts([]);
    setMessage('Logged out successfully');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSetupChange = (e) => {
    setSetupData({ ...setupData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size and type validation
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }

      setSelectedFile(file);
      try {
        const base64 = await imageAPI.fileToBase64(file);
        const compressedImage = await imageAPI.compressImage(base64);
        setImagePreview(compressedImage);
        setFormData(prev => ({ ...prev, image: '' }));
      } catch (error) {
        setMessage('Error processing image');
      }
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      let imageData = formData.image;

      if (selectedFile) {
        imageData = imagePreview;
      }

      const blogData = {
        title: formData.title,
        description: formData.description,
        image: imageData,
        category: formData.category
      };

      await blogAPI.create(blogData);
      
      setFormData({ title: '', description: '', image: '', category: 'pizza' });
      setSelectedFile(null);
      setImagePreview('');
      setMessage('Blog post added successfully!');
      
      // Reload blog posts
      loadBlogPosts();
    } catch (error) {
      setMessage(error.message || 'Error adding blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.delete(postId);
        setMessage('Blog post deleted successfully!');
        loadBlogPosts();
      } catch (error) {
        setMessage(error.message || 'Error deleting blog post');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="admin">
        <div className="admin-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className="admin">
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">🍕 Setup Admin Account</h1>
            <p className="admin-subtitle">Create the first admin account</p>
            <button onClick={() => setShowSetup(false)} className="back-btn">← Back to Login</button>
          </div>

          {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

          <form onSubmit={handleSetupAdmin} className="admin-form">
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={setupData.username}
                onChange={handleSetupChange}
                required
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={setupData.email}
                onChange={handleSetupChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={setupData.password}
                onChange={handleSetupChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={setupData.confirmPassword}
                onChange={handleSetupChange}
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Admin...' : 'Create Admin Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="admin">
        <div className="admin-container">
          <div className="admin-header">
            <h1 className="admin-title">🍕 Blog Admin Login</h1>
            <p className="admin-subtitle">Access the blog management panel</p>
            <a href="/" className="back-to-website">← Back to Website</a>
          </div>

          {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="setup-section">
            <p>First time here? <button onClick={() => setShowSetup(true)} className="setup-link">Setup Admin Account</button></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">🍕 Blog Admin Panel</h1>
          <p className="admin-subtitle">Manage your blog posts</p>
          <div className="admin-actions">
            <span className="user-info">Welcome, {authAPI.getCurrentUser()?.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <a href="/" className="back-to-website">← Back to Website</a>
          </div>
        </div>

        {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

        <div className="admin-content">
          <div className="admin-form-section">
            <h2>Add New Blog Post</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength="200"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                  <option value="pizza">Pizza</option>
                  <option value="recipes">Recipes</option>
                  <option value="news">News</option>
                  <option value="tips">Tips</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image (optional)</label>
                <div className="image-input-container">
                  <div className="image-input-section">
                    <label htmlFor="imageUrl" className="input-label">Image URL:</label>
                    <input type="url" id="imageUrl" name="image" value={formData.image} onChange={handleImageUrlChange} placeholder="Enter image URL (e.g., https://example.com/image.jpg)"/>
                  </div>
                  <div className="image-input-divider">OR</div>
                  <div className="image-input-section">
                    <label htmlFor="imageFile" className="input-label">Upload from computer:</label>
                    <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} className="file-input"/>
                    <label htmlFor="imageFile" className="file-input-label">📁 Choose File</label>
                  </div>
                </div>
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" onClick={() => { setSelectedFile(null); setImagePreview(''); }} className="remove-image-btn">✕ Remove</button>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Adding Blog Post...' : 'Add Blog Post'}
              </button>
            </form>
          </div>

          <div className="admin-posts-section">
            <h2>Existing Blog Posts ({blogPosts.length})</h2>
            {blogPosts.length === 0 ? (
              <p className="no-posts">No blog posts yet. Create your first one above!</p>
            ) : (
              <div className="blog-posts-list">
                {blogPosts.map((post) => (
                  <div key={post._id} className="blog-post-item">
                    <div className="post-info">
                      <h3>{post.title}</h3>
                      <p className="post-meta">
                        Category: {post.category} | 
                        Created: {new Date(post.createdAt).toLocaleDateString()} |
                        Views: {post.views || 0}
                      </p>
                      <p className="post-description">{post.description.substring(0, 100)}...</p>
                    </div>
                    <div className="post-actions">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 