import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
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
  const [storageUsage, setStorageUsage] = useState(0);

  useEffect(() => {
    // Load existing blog posts
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
      // Calculate storage usage
      setStorageUsage(savedPosts.length);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        let { width, height } = img;
        const maxSize = 800;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size too large. Please select an image smaller than 5MB.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }
      
      setSelectedFile(file);
      
      try {
        // Compress and create preview
        const compressedImage = await compressImage(file);
        setImagePreview(compressedImage);
        
        // Clear the URL input when file is selected
        setFormData(prev => ({ ...prev, image: '' }));
      } catch (error) {
        setMessage('Error processing image. Please try again.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.value
    });
    // Clear file selection when URL is entered
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage('Please fill in all required fields');
      return;
    }

    // Check storage usage before adding new post
    const newPostData = JSON.stringify([{ ...formData, timestamp: new Date().toISOString(), id: Date.now() }, ...blogPosts]);
    
    // Estimate storage usage (rough calculation)
    if (newPostData.length > 4 * 1024 * 1024) { // 4MB limit
      setMessage('Storage limit approaching. Please delete some posts or use smaller images.');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    
    // If a file is selected, use the compressed image
    if (selectedFile) {
      const newPost = {
        ...formData,
        image: imagePreview, // Use the already compressed image
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      try {
        const updatedPosts = [newPost, ...blogPosts];
        setBlogPosts(updatedPosts);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
        
        setFormData({ title: '', description: '', image: '', category: 'pizza' });
        setSelectedFile(null);
        setImagePreview('');
        setMessage('Blog post added successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        if (error.name === 'QuotaExceededError') {
          setMessage('Storage limit exceeded. Please delete some posts or use smaller images.');
        } else {
          setMessage('Error saving post. Please try again.');
        }
        setTimeout(() => setMessage(''), 5000);
      }
      return;
    }

    const newPost = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };

    try {
      const updatedPosts = [newPost, ...blogPosts];
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      setFormData({ title: '', description: '', image: '', category: 'pizza' });
      setSelectedFile(null);
      setImagePreview('');
      setMessage('Blog post added successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        setMessage('Storage limit exceeded. Please delete some posts or use smaller images.');
      } else {
        setMessage('Error saving post. Please try again.');
      }
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleDelete = (postId) => {
    const updatedPosts = blogPosts.filter(post => post.id !== postId);
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setMessage('Blog post deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">🍕 Blog Admin Panel</h1>
          <p className="admin-subtitle">Manage your blog posts</p>
          <div className="storage-info">
            <span className="storage-text">
              Storage Usage: {storageUsage} bytes
            </span>
            {storageUsage > 3 * 1024 * 1024 && (
              <span className="storage-warning">⚠️ Storage limit approaching</span>
            )}
          </div>
          <a href="/" className="back-to-website">← Back to Website</a>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

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
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter blog post description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
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
                    <input
                      type="url"
                      id="imageUrl"
                      name="image"
                      value={formData.image}
                      onChange={handleImageUrlChange}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    />
                  </div>
                  <div className="image-input-divider">OR</div>
                  <div className="image-input-section">
                    <label htmlFor="imageFile" className="input-label">Upload from computer:</label>
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="imageFile" className="file-input-label">
                      📁 Choose File
                    </label>
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview('');
                      }}
                      className="remove-image-btn"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Add Blog Post
              </button>
            </form>
          </div>

          <div className="admin-posts-section">
            <h2>Existing Blog Posts ({blogPosts.length})</h2>
            {blogPosts.length === 0 ? (
              <div className="no-posts-admin">
                <div className="no-posts-icon">📝</div>
                <p>No blog posts yet. Add your first post above!</p>
              </div>
            ) : (
              <div className="admin-posts-grid">
                {blogPosts.map((post) => (
                  <div key={post.id} className="admin-post-card">
                    <div className="admin-post-image">
                      {post.image ? (
                        <img src={post.image} alt={post.title} />
                      ) : (
                        <div className="admin-post-placeholder">🍕</div>
                      )}
                    </div>
                    <div className="admin-post-content">
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <div className="admin-post-meta">
                        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="delete-btn"
                        >
                          🗑️ Delete
                        </button>
                      </div>
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