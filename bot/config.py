import os
from dotenv import load_dotenv

load_dotenv()

# Telegram Bot Config
API_ID = int(os.getenv("API_ID"))
API_HASH = os.getenv("API_HASH")
BOT_TOKEN = os.getenv("BOT_TOKEN")
CHANNEL_ID = int(os.getenv("CHANNEL_ID"))

# Database Config
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "netgram")

# Admin Config
ADMIN_IDS = list(map(int, os.getenv("ADMIN_IDS", "").split(",")))

# Shortener Config (Optional)
SHORTENER_API = os.getenv("SHORTENER_API", "")

# IMDb Config
IMDB_API_KEY = os.getenv("IMDB_API_KEY", "")