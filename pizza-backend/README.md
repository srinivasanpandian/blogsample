# 🍕 Pizza Blog Backend API

A production-ready Node.js/Express backend for the Pizza Blog website with MongoDB database, JWT authentication, and comprehensive blog management features.

## 🚀 Features

- **🔐 JWT Authentication** - Secure user authentication and authorization
- **📝 Blog Management** - Full CRUD operations for blog posts
- **🖼️ Image Upload** - Support for image uploads with Cloudinary
- **🔍 Search & Filtering** - Advanced search and category filtering
- **📊 Analytics** - Blog statistics and analytics
- **👥 User Management** - Admin and user role management
- **🛡️ Security** - Password hashing, input validation, CORS protection

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/pizza-blog
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/setup-admin` - Create first admin user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Blog Posts
- `GET /api/blogs` - Get all published blogs (public)
- `GET /api/blogs/:id` - Get single blog by ID (public)
- `POST /api/blogs` - Create new blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)
- `POST /api/blogs/:id/like` - Like/unlike blog (authenticated)
- `GET /api/blogs/stats/overview` - Get blog statistics (admin only)

### User Management
- `GET /api/auth/users` - Get all users (admin only)

## 🔧 Configuration

### MongoDB Setup

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/pizza-blog
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizza-blog?retryWrites=true&w=majority
```

### Cloudinary Setup (for image uploads)

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## 🚀 First Time Setup

1. **Start the server**
   ```bash
   npm run dev
   ```

2. **Create admin user**
   ```bash
   curl -X POST http://localhost:5000/api/auth/setup-admin \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@pizzablog.com",
       "password": "admin123"
     }'
   ```

3. **Login to get JWT token**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@pizzablog.com",
       "password": "admin123"
     }'
   ```

## 📝 Usage Examples

### Create a Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Best Pizza Recipe",
    "description": "Learn how to make the perfect pizza at home...",
    "category": "recipes",
    "tags": ["pizza", "recipe", "homemade"]
  }'
```

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

### Search Blogs
```bash
curl "http://localhost:5000/api/blogs?search=pizza&category=recipes"
```

## 🏗️ Project Structure

```
pizza-backend/
├── models/
│   ├── Blog.js          # Blog post model
│   └── User.js          # User model
├── routes/
│   ├── authRoutes.js    # Authentication routes
│   └── blogRoutes.js    # Blog routes
├── middleware/
│   └── auth.js          # Authentication middleware
├── config/              # Configuration files
├── server.js            # Main server file
├── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Tokens** - Stateless authentication
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Cross-origin resource sharing
- **Rate Limiting** - Protection against abuse
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Heroku
1. Create Heroku app
2. Add MongoDB Atlas addon
3. Set environment variables
4. Deploy with Git

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Vercel
1. Import project
2. Set environment variables
3. Deploy

## 📊 Database Schema

### Blog Post
```javascript
{
  title: String (required),
  description: String (required),
  image: String (optional),
  category: String (enum: pizza, recipes, news, tips),
  author: ObjectId (ref: User),
  tags: [String],
  status: String (enum: draft, published),
  views: Number,
  likes: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: admin, editor, user),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@pizzablog.com or create an issue in the repository. 