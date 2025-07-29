// Blog service functions for managing blog posts
// These functions work with localStorage directly without React hooks

export const getBlogPosts = () => {
  try {
    const savedPosts = localStorage.getItem('blogPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

export const addBlogPost = (post) => {
  try {
    const existingPosts = getBlogPosts();
    const newPost = {
      ...post,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    return newPost;
  } catch (error) {
    console.error('Error adding blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = (postId) => {
  try {
    const existingPosts = getBlogPosts();
    const updatedPosts = existingPosts.filter(post => post.id !== postId);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export const updateBlogPost = (postId, updatedData) => {
  try {
    const existingPosts = getBlogPosts();
    const updatedPosts = existingPosts.map(post => 
      post.id === postId ? { ...post, ...updatedData } : post
    );
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    return true;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}; 