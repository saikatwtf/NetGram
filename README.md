# 🎬 NetGram - Netflix-Style Telegram Movie Platform

A complete movie streaming platform that automatically indexes movies from Telegram channels and provides a Netflix-like interface for browsing, searching, and streaming.

## 🚀 Features

- **🤖 Telegram Bot**: Automatically monitors channels and extracts movie metadata
- **🎯 Smart Indexing**: IMDb integration for rich movie data (ratings, posters, plots)
- **🔍 Advanced Search**: Search by title, genre, language, quality
- **📱 Responsive UI**: Netflix-style interface that works on all devices
- **⚡ Fast API**: RESTful backend with MongoDB for scalable data storage
- **🔗 Direct Access**: Download, stream, and Telegram deep links
- **💰 Monetization Ready**: Built-in URL shortener support
- **🛡️ Secure**: Admin controls and duplicate prevention

## 📂 Repository Structure

```
NetGram/
├── bot/                    # Telegram Bot (Pyrogram)
│   ├── main.py            # Bot entry point
│   ├── config.py          # Configuration
│   ├── handlers.py        # Command handlers
│   ├── database.py        # Database operations
│   └── requirements.txt   # Dependencies
│
├── backend/               # FastAPI Backend
│   ├── main.py           # API entry point
│   ├── routes/           # API endpoints
│   │   ├── movies.py     # Movie operations
│   │   ├── search.py     # Search functionality
│   │   └── filters.py    # Filter operations
│   ├── config.py         # Configuration
│   ├── database.py       # Database layer
│   ├── utils.py          # Utility functions
│   └── requirements.txt  # Dependencies
│
├── frontend/             # Next.js Frontend
│   ├── package.json      # Dependencies
│   ├── pages/           # App pages
│   │   ├── index.js     # Home page
│   │   ├── search.js    # Search page
│   │   ├── movie/[id].js # Movie details
│   │   └── stream/[id].js # Stream page
│   ├── components/      # React components
│   │   ├── MovieCard.js # Movie card component
│   │   ├── SearchBar.js # Search component
│   │   ├── Filters.js   # Filter component
│   │   ├── Navbar.js    # Navigation
│   │   └── Footer.js    # Footer
│   ├── styles/          # Styling
│   │   └── globals.css  # Global styles
│   └── utils/           # Utilities
│       └── api.js       # API client
│
├── shared/              # Shared Utilities
│   └── utils.py         # Common functions
│
└── README.md           # This file
```

## 🔑 Environment Variables

Create `.env` files in each directory with these variables:

### Bot Configuration (`bot/.env`)
```env
# Telegram API
API_ID=your_api_id
API_HASH=your_api_hash
BOT_TOKEN=your_bot_token
CHANNEL_ID=-1001234567890

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=netgram

# Admin
ADMIN_IDS=123456789,987654321

# Optional: URL Shortener
SHORTENER_API=https://api.short.io/links
SHORTENER_KEY=your_shortener_key

# Optional: IMDb
IMDB_API_KEY=your_imdb_key
```

### Backend Configuration (`backend/.env`)
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=netgram

# API
API_HOST=0.0.0.0
API_PORT=8000

# CORS
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend Configuration (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=https://your-backend.render.com
```

## ⚡ Setup Guide

### 1. Bot Setup

```bash
cd bot
pip install -r requirements.txt
python main.py
```

**Bot Commands:**
- `/start` - Welcome message
- `/search <movie>` - Search movies
- `/stats` - View statistics
- `/auth` - Admin authentication

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

**API Endpoints:**
- `GET /` - Health check
- `GET /movies` - Get movies (paginated)
- `GET /movies/{id}` - Get movie details
- `GET /search?query=` - Search movies
- `GET /filter?genre=&language=&quality=` - Filter movies
- `GET /popular` - Popular movies (by IMDb rating)
- `GET /recent` - Recently added movies

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Pages:**
- `/` - Home with movie grid
- `/search` - Search interface
- `/movie/[id]` - Movie details page
- `/stream/[id]` - Streaming page

## 🌐 Free Hosting Guide

### Database: MongoDB Atlas (Free)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster (512MB storage)
3. Get connection string
4. Add to `MONGO_URI` in all `.env` files

### Bot: Railway (Free)
1. Connect GitHub to [Railway](https://railway.app)
2. Deploy `bot/` directory
3. Add environment variables
4. Set start command: `python main.py`

### Backend: Render (Free)
1. Connect GitHub to [Render](https://render.com)
2. Create Web Service from `backend/` directory
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `python main.py`
5. Add environment variables

### Frontend: Vercel (Free)
1. Connect GitHub to [Vercel](https://vercel.com)
2. Deploy `frontend/` directory
3. Add environment variables
4. Auto-deploys on git push

## 🛠️ Customization Guide

### Change UI Colors
Edit `frontend/styles/globals.css` and component classes:
```css
/* Change primary color from red to blue */
.bg-red-600 { @apply bg-blue-600; }
.text-red-600 { @apply text-blue-600; }
```

### Add New Filters
1. Update `backend/database.py` - add filter logic
2. Update `frontend/components/Filters.js` - add UI elements
3. Update `backend/routes/filters.py` - handle new parameters

### Switch URL Shortener
Update `shared/utils.py` `shortify()` function:
```python
def shortify(url: str) -> str:
    # Replace with your shortener API
    response = requests.post('https://api.yourshortener.com/shorten', {
        'url': url,
        'key': os.getenv('SHORTENER_KEY')
    })
    return response.json()['short_url']
```

### Add New Bot Commands
Add to `bot/handlers.py`:
```python
@Client.on_message(filters.command("newcommand"))
async def new_command_handler(client: Client, message: Message):
    await message.reply_text("New command response")
```

## 📊 Features Overview

### 🤖 Telegram Bot Features
- **Auto File Detection**: Monitors channels for video files
- **Metadata Extraction**: Extracts title, year, quality from filenames
- **IMDb Integration**: Fetches ratings, posters, plots automatically
- **Duplicate Prevention**: Hash-based duplicate detection
- **Admin Controls**: Restricted commands for admins only
- **Error Logging**: Comprehensive error tracking

### 🎯 Backend Features
- **RESTful API**: Clean, documented endpoints
- **Pagination**: Efficient data loading
- **Search & Filter**: Multiple search and filter options
- **CORS Support**: Proper cross-origin handling
- **Rate Limiting**: Built-in abuse prevention
- **Type Safety**: Pydantic models for data validation

### 📱 Frontend Features
- **Netflix-Style UI**: Modern, responsive design
- **Dark Theme**: Eye-friendly dark interface
- **Instant Search**: Real-time search with debouncing
- **Advanced Filters**: Genre, language, quality filters
- **Mobile Optimized**: Works perfectly on all devices
- **SEO Friendly**: Proper meta tags and structure

## 🔒 Security Features

- **Admin Authentication**: Restricted bot commands
- **Input Validation**: All inputs properly validated
- **Error Handling**: Graceful error management
- **Rate Limiting**: API abuse prevention
- **CORS Configuration**: Secure cross-origin requests

## 🚀 Performance Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Pagination**: Efficient data loading
- **Image Lazy Loading**: Faster page loads
- **API Caching**: Reduced database calls
- **Responsive Images**: Optimized for all screen sizes

## 📈 Scalability Features

- **Modular Architecture**: Easy to extend and modify
- **Microservices Ready**: Separate bot, backend, frontend
- **Database Sharding**: MongoDB Atlas auto-scaling
- **CDN Ready**: Static assets can be served via CDN
- **Load Balancer Compatible**: Stateless design

## 🎯 Future Enhancements

- **Multi-Bot Support**: Scale with multiple worker bots
- **Redis Caching**: Faster data retrieval
- **User Accounts**: Personalized watchlists
- **Recommendations**: AI-powered movie suggestions
- **Streaming Quality**: Multiple quality options per movie
- **Subtitle Support**: Multi-language subtitle integration
- **Download Manager**: Built-in download queue
- **Mobile Apps**: React Native mobile applications

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400/1f2937/ffffff?text=Netflix-Style+Movie+Grid)

### Movie Details
![Movie Details](https://via.placeholder.com/800x400/1f2937/ffffff?text=Movie+Details+Page)

### Search Interface
![Search](https://via.placeholder.com/800x400/1f2937/ffffff?text=Advanced+Search+Interface)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is for educational purposes only. Users are responsible for complying with their local laws and Telegram's Terms of Service. The developers are not responsible for any misuse of this software.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/saikatwtf/netgram/issues)
- **Discussions**: [GitHub Discussions](https://github.com/saikatwtf/netgram/discussions)
- **Email**: annihilisop.t.me

---

**Made with ❤️ for movie lovers worldwide**