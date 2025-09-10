# 🚀 NetGram Deployment Guide

Complete step-by-step deployment guide for NetGram on free hosting platforms.

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free)
- Telegram Bot Token
- Telegram API credentials

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project: "NetGram"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select region closest to your users
4. Name cluster: "netgram-cluster"

### 3. Configure Database Access
1. Go to "Database Access"
2. Add new user with read/write permissions
3. Note username and password

### 4. Configure Network Access
1. Go to "Network Access"
2. Add IP Address: `0.0.0.0/0` (Allow from anywhere)

### 5. Get Connection String
1. Go to "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database password

## 🤖 Bot Deployment (Railway)

### 1. Prepare Repository
```bash
git add .
git commit -m "Initial NetGram setup"
git push origin main
```

### 2. Deploy on Railway
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your NetGram repository
5. Choose "Deploy Now"

### 3. Configure Environment Variables
Add these variables in Railway dashboard:
```
API_ID=your_telegram_api_id
API_HASH=your_telegram_api_hash
BOT_TOKEN=your_bot_token
CHANNEL_ID=-1001234567890
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=netgram
ADMIN_IDS=your_telegram_user_id
```

### 4. Set Start Command
In Railway settings:
- **Root Directory**: `bot`
- **Start Command**: `python main.py`

## 🚀 Backend Deployment (Render)

### 1. Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### 2. Create Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `netgram-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`

### 3. Environment Variables
Add in Render dashboard:
```
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=netgram
API_HOST=0.0.0.0
API_PORT=10000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 4. Note Backend URL
After deployment, note your backend URL:
`https://netgram-backend.onrender.com`

## 🎨 Frontend Deployment (Vercel)

### 1. Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 2. Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`

### 3. Environment Variables
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### 4. Deploy
Click "Deploy" and wait for completion.

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Update your backend's `FRONTEND_URL` environment variable with your actual Vercel URL.

### 2. Test Bot Commands
1. Start your bot on Telegram
2. Send `/start` command
3. Test `/search` with a movie name

### 3. Test Frontend
1. Visit your Vercel URL
2. Check if movies load (may be empty initially)
3. Test search functionality

### 4. Add Movies
1. Add your bot to a Telegram channel
2. Upload video files to trigger indexing
3. Check if movies appear in frontend

## 🔍 Troubleshooting

### Bot Issues
- **Bot not responding**: Check Railway logs for errors
- **Database connection failed**: Verify MongoDB URI
- **Permission denied**: Ensure bot is admin in channel

### Backend Issues
- **API not accessible**: Check Render deployment logs
- **CORS errors**: Verify FRONTEND_URL environment variable
- **Database errors**: Check MongoDB Atlas network access

### Frontend Issues
- **API calls failing**: Verify NEXT_PUBLIC_API_URL
- **Build errors**: Check Vercel build logs
- **Styling issues**: Ensure Tailwind CSS is properly configured

## 📊 Monitoring & Maintenance

### 1. Monitor Logs
- **Railway**: Check bot logs for errors
- **Render**: Monitor API response times
- **Vercel**: Check build and runtime logs

### 2. Database Monitoring
- **MongoDB Atlas**: Monitor storage usage (512MB limit)
- **Performance**: Check query performance
- **Backup**: Atlas provides automatic backups

### 3. Updates
```bash
# Update code
git add .
git commit -m "Update features"
git push origin main

# Auto-deploys on:
# - Railway (bot)
# - Render (backend) 
# - Vercel (frontend)
```

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use different credentials for production
- Rotate API keys regularly

### 2. Database Security
- Use strong database passwords
- Enable MongoDB Atlas security features
- Monitor access logs

### 3. API Security
- Implement rate limiting
- Validate all inputs
- Use HTTPS only

## 💰 Cost Optimization

### Free Tier Limits
- **Railway**: 500 hours/month, $5 credit
- **Render**: 750 hours/month
- **Vercel**: 100GB bandwidth/month
- **MongoDB Atlas**: 512MB storage

### Scaling Options
- **Railway Pro**: $20/month for unlimited hours
- **Render Pro**: $7/month per service
- **Vercel Pro**: $20/month for team features
- **MongoDB Atlas**: $9/month for 2GB cluster

## 🎯 Performance Tips

### 1. Database Optimization
- Create indexes on frequently queried fields
- Use pagination for large datasets
- Implement caching where possible

### 2. Frontend Optimization
- Optimize images and assets
- Implement lazy loading
- Use CDN for static assets

### 3. Backend Optimization
- Implement response caching
- Use connection pooling
- Monitor API response times

## 📈 Analytics & Insights

### 1. User Analytics
- Implement Google Analytics
- Track popular movies
- Monitor search queries

### 2. Performance Monitoring
- Use Vercel Analytics
- Monitor API response times
- Track error rates

### 3. Business Metrics
- Track daily active users
- Monitor movie additions
- Analyze user behavior

---

**🎉 Congratulations! Your NetGram platform is now live and ready for users!**