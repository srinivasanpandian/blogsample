# 🚀 Deploy to Netlify

## Method 1: Drag & Drop (Easiest)

1. **Build the project** (already done):
   ```bash
   npm run build
   ```

2. **Go to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account

3. **Deploy**:
   - Drag and drop the `build` folder from your project to Netlify's deploy area
   - Your site will be live in seconds!

## Method 2: Connect GitHub Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Click "Deploy site"

## Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy**:
   ```bash
   netlify login
   netlify deploy --prod --dir=build
   ```

## ⚙️ Configuration Files

- `netlify.toml`: Build and redirect configuration
- `public/_redirects`: Handles React Router routing
- `build/`: Production-ready files

## 🌐 Your Site Features

- **Home Page**: Pizza restaurant landing page
- **Blog Page**: `/blog` - Searchable blog with categories
- **Admin Panel**: `/admin` - Blog management interface
- **Responsive Design**: Works on all devices
- **Image Upload**: Admin can upload images for blog posts

## 🔧 Custom Domain (Optional)

1. Go to your Netlify dashboard
2. Click on your site
3. Go to "Domain settings"
4. Add your custom domain

## 📝 Important Notes

- The site uses localStorage for blog data (client-side storage)
- Images are compressed and stored as base64
- All routing is handled by React Router
- The site is fully responsive and optimized

## 🎉 Success!

Your pizza website is now live on Netlify with:
- Beautiful pizza restaurant design
- Functional blog system
- Admin panel for content management
- Mobile-responsive layout
- Fast loading and optimized performance 