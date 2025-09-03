# TeleMedicine Platform Deployment Guide

## 🚀 Frontend Deployment (Vercel)

### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from root directory
vercel --prod
```

### Environment Variables for Vercel
Set these in your Vercel dashboard:
- `VITE_API_URL`: Your backend API URL

## 🖥️ Backend Deployment Options

### Option 1: Railway
1. Connect your GitHub repository to Railway
2. Select the `Server` folder as the root directory
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: 5000

### Option 2: Render
1. Connect your GitHub repository to Render
2. Set root directory to `Server`
3. Build command: `npm install`
4. Start command: `npm start`

### Option 3: Heroku
```bash
# From Server directory
heroku create your-telemedicine-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git subtree push --prefix Server heroku main
```

## 📋 Deployment Checklist

### Frontend (Client)
- [x] Vite configuration optimized
- [x] Environment variables configured
- [x] Build scripts added
- [x] Vercel configuration created

### Backend (Server)
- [ ] MongoDB database set up (MongoDB Atlas recommended)
- [ ] Environment variables configured
- [ ] CORS configured for frontend domain
- [ ] JWT secret set
- [ ] API endpoints tested

### Post-Deployment
- [ ] Update `VITE_API_URL` in frontend env with actual backend URL
- [ ] Test all API endpoints
- [ ] Verify CORS configuration
- [ ] Test authentication flow
- [ ] Monitor error logs

## 🔧 Troubleshooting

### Common Issues
1. **"vite: command not found"**: Make sure you're deploying from the Client directory or using the provided vercel.json
2. **CORS errors**: Update CORS configuration in server.js with your frontend domain
3. **Environment variables**: Ensure all required env vars are set in your deployment platform

### Local Development
```bash
# Start frontend
cd Client
npm run dev

# Start backend
cd Server
npm run dev
```

## 📱 Testing Deployment
1. Test all routes work correctly
2. Verify API calls are successful
3. Check responsive design on mobile
4. Test authentication flow
5. Verify all components load properly
