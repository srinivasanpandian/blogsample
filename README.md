# 🍕 Pizza Website with Blog System

A full-stack pizza website built with React frontend and Node.js/Express backend, featuring a complete blog management system with admin authentication.

## 🚀 Live Demo

- **Frontend**: [Deployed on Netlify](https://your-pizza-website.netlify.app)
- **Backend**: [Deployed on Render/Railway](https://your-backend-url.com)

## ✨ Features

### Frontend (React)
- 🏠 **Home Page**: Beautiful pizza website with hero section
- 📝 **Blog Page**: Display blog posts with search and filtering
- 🔐 **Admin Panel**: Secure admin interface for blog management
- 📱 **Responsive Design**: Works on all devices
- 🖼️ **Image Upload**: Client-side image compression
- 🔍 **Search & Filter**: Find blog posts easily
- 📄 **Pagination**: Handle large numbers of posts
- 🎨 **Modern UI**: Clean, professional design

### Backend (Node.js/Express)
- 🔐 **JWT Authentication**: Secure admin login
- 📊 **MongoDB Atlas**: Cloud database integration
- 🖼️ **Image Handling**: Store and serve images
- 📝 **Blog CRUD**: Full blog post management
- 👥 **User Management**: Admin account system
- 🔒 **Role-based Access**: Admin-only features
- 📈 **API Statistics**: Blog analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **CSS3** - Styling with Flexbox/Grid
- **HTML5 Canvas** - Image compression

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads

## 📁 Project Structure

```
BLog/
├── pizza-website/          # React Frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── ...
│   ├── package.json
│   └── netlify.toml      # Netlify config
├── pizza-backend/         # Node.js Backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # Main server file
│   └── package.json
├── STARTUP.md            # Setup instructions
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd BLog
```

### 2. Backend Setup
```bash
cd pizza-backend
npm install
cp env.example .env
# Edit .env with your MongoDB Atlas connection string
npm run dev
```

### 3. Frontend Setup
```bash
cd pizza-website
npm install
npm start
```

### 4. Access the Application
- **Website**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin
- **Backend API**: http://localhost:5000

## 📖 Detailed Setup

See [STARTUP.md](./STARTUP.md) for comprehensive setup instructions.

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3001
```

#### Frontend
The frontend automatically connects to the backend API.

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/setup-admin` - Create admin account
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get user profile

### Blog Endpoints
- `GET /api/blogs` - Get all blogs (public)
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)
- `POST /api/blogs/:id/like` - Like a blog post

## 🚀 Deployment

### Frontend (Netlify)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

See [DEPLOYMENT.md](./pizza-website/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [STARTUP.md](./STARTUP.md) for troubleshooting
2. Verify your MongoDB Atlas connection
3. Ensure all environment variables are set correctly
4. Check the browser console and server logs for errors

## 🎯 Roadmap

- [ ] Add user comments on blog posts
- [ ] Implement email notifications
- [ ] Add social media sharing
- [ ] Create mobile app
- [ ] Add analytics dashboard
- [ ] Implement caching
- [ ] Add image optimization

---

**Built with ❤️ using React, Node.js, and MongoDB** 