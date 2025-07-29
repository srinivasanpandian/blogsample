const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../pizza-website/build')));

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-blog')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.log('💡 To use MongoDB Atlas:');
  console.log('1. Go to https://mongodb.com/atlas');
  console.log('2. Create a free account and cluster');
  console.log('3. Get your connection string');
  console.log('4. Add it to your .env file as MONGODB_URI');
  console.log('📝 Server will continue without database connection...');
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../pizza-website/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Blog API: http://localhost:${PORT}/api/blogs`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
}); 