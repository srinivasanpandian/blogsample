const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { auth, adminAuth } = require('../middleware/auth');

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query;
    
    const query = { status: 'published' };
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blogs',
      error: error.message 
    });
  }
});

// Get single blog by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('likes', 'username');
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching blog',
      error: error.message 
    });
  }
});

// Create new blog (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, image, category, tags } = req.body;
    
    const blog = new Blog({
      title,
      description,
      image,
      category,
      tags: tags || [],
      author: req.user._id
    });
    
    await blog.save();
    
    const populatedBlog = await blog.populate('author', 'username');
    
    res.status(201).json({ 
      success: true, 
      message: 'Blog created successfully',
      data: populatedBlog 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating blog',
      error: error.message 
    });
  }
});

// Update blog (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, description, image, category, tags, status } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    // Update fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (image !== undefined) blog.image = image;
    if (category) blog.category = category;
    if (tags) blog.tags = tags;
    if (status) blog.status = status;
    
    await blog.save();
    
    const updatedBlog = await blog.populate('author', 'username');
    
    res.json({ 
      success: true, 
      message: 'Blog updated successfully',
      data: updatedBlog 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating blog',
      error: error.message 
    });
  }
});

// Delete blog (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    await blog.remove();
    
    res.json({ 
      success: true, 
      message: 'Blog deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting blog',
      error: error.message 
    });
  }
});

// Like/Unlike blog (authenticated users)
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      });
    }
    
    const likeIndex = blog.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      blog.likes.splice(likeIndex, 1);
    } else {
      // Like
      blog.likes.push(req.user._id);
    }
    
    await blog.save();
    
    res.json({ 
      success: true, 
      message: likeIndex > -1 ? 'Blog unliked' : 'Blog liked',
      likes: blog.likes.length 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating like',
      error: error.message 
    });
  }
});

// Get blog statistics (admin only)
router.get('/stats/overview', adminAuth, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    
    const categoryStats = await Blog.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.total || 0,
        categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics',
      error: error.message 
    });
  }
});

module.exports = router; 