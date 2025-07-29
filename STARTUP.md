# 🚀 Pizza Blog - Full Stack Startup Guide

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

## 🛠️ Quick Setup

### 1. **Install Dependencies**

```bash
# Install frontend dependencies
cd pizza-website
npm install

# Install backend dependencies
cd ../pizza-backend
npm install
```

### 2. **Setup Environment Variables**

```bash
# In pizza-backend directory
cp env.example .env
```

Edit `pizza-backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pizza-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. **Start MongoDB**

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas:**
- Sign up at [MongoDB Atlas](https://mongodb.com/atlas)
- Create a free cluster
- Get your connection string
- Replace `MONGODB_URI` in `.env`

### 4. **Start the Backend**

```bash
cd pizza-backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📝 Blog API: http://localhost:5000/api/blogs
🔐 Auth API: http://localhost:5000/api/auth
✅ Connected to MongoDB
```

### 5. **Start the Frontend**

```bash
cd pizza-website
npm start
```

Frontend will run on `http://localhost:3000`

## 🎯 First Time Setup

### 1. **Create Admin Account**

Visit `http://localhost:3000/admin` and click "Setup Admin Account"

Or use the API directly:
```bash
curl -X POST http://localhost:5000/api/auth/setup-admin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@pizzablog.com",
    "password": "admin123"
  }'
```

### 2. **Login to Admin Panel**

- Go to `http://localhost:3000/admin`
- Login with your admin credentials
- Start creating blog posts!

## 🌐 Available URLs

- **Home Page**: `http://localhost:3000/`
- **Blog Page**: `http://localhost:3000/blog`
- **Admin Panel**: `http://localhost:3000/admin`
- **Backend API**: `http://localhost:5000/api`

## 📚 API Endpoints

### Public Endpoints
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected Endpoints (Admin Only)
- `POST /api/blogs` - Create blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post
- `GET /api/blogs/stats/overview` - Get statistics

## 🔧 Development Scripts

### Backend (pizza-backend/)
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend (pizza-website/)
```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongo --eval "db.runCommand('ping')"

# If not running, start it:
# Windows: net start MongoDB
# macOS/Linux: sudo systemctl start mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Permission Issues
```bash
# On macOS/Linux, you might need:
sudo npm install -g nodemon
```

## 📊 Database Schema

### Blog Posts
```javascript
{
  title: String (required),
  description: String (required),
  image: String (optional),
  category: String (pizza, recipes, news, tips),
  author: ObjectId (ref: User),
  views: Number,
  likes: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Users
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (admin, editor, user),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Production Deployment

### Backend Deployment
1. **Railway** (Recommended)
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

2. **Heroku**
   - Create Heroku app
   - Add MongoDB Atlas addon
   - Deploy with Git

3. **Vercel**
   - Import project
   - Set environment variables
   - Deploy

### Frontend Deployment
1. **Netlify** (Recommended)
   - Drag & drop `build` folder
   - Or connect GitHub repository

2. **Vercel**
   - Import React project
   - Automatic deployment

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for secure storage
- **Input Validation** - Mongoose schema validation
- **CORS Protection** - Cross-origin security
- **Environment Variables** - Secure configuration

## 📱 Features

### Frontend
- ✅ Responsive design
- ✅ Search and filtering
- ✅ Modal for full blog posts
- ✅ Admin authentication
- ✅ Image upload with compression
- ✅ Pagination

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ MongoDB database
- ✅ Image handling
- ✅ Search functionality
- ✅ Blog statistics

## 🆘 Support

If you encounter issues:

1. **Check the console** for error messages
2. **Verify MongoDB** is running
3. **Check environment variables** are set correctly
4. **Restart both servers** if needed

## 🎉 Success!

Your full-stack pizza blog is now running with:
- **Frontend**: React with modern UI
- **Backend**: Node.js/Express API
- **Database**: MongoDB with proper schemas
- **Authentication**: JWT-based admin system
- **Features**: Blog CRUD, search, filtering, pagination

Happy coding! 🍕 