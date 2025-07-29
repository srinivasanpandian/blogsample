const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://blogsample-1oli.onrender.com/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  // Setup admin user (first time)
  setupAdmin: async (adminData) => {
    const response = await fetch(`${API_BASE_URL}/auth/setup-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });
    return handleResponse(response);
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Blog API calls
export const blogAPI = {
  // Get all published blogs
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${API_BASE_URL}/blogs?${queryParams}` : `${API_BASE_URL}/blogs`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get single blog by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    return handleResponse(response);
  },

  // Create new blog (admin only)
  create: async (blogData) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    return handleResponse(response);
  },

  // Update blog (admin only)
  update: async (id, blogData) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(blogData)
    });
    return handleResponse(response);
  },

  // Delete blog (admin only)
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Like/unlike blog
  toggleLike: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}/like`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get blog statistics (admin only)
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/blogs/stats/overview`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Image upload helper (for base64 images)
export const imageAPI = {
  // Convert file to base64
  fileToBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  // Compress image
  compressImage: (base64String, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        
        resolve(compressedBase64);
      };
    });
  }
};

// Error handling
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
    authAPI.logout();
    window.location.href = '/admin';
  }
  
  return {
    success: false,
    message: error.message || 'Something went wrong'
  };
}; 