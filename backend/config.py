import os
from dotenv import load_dotenv

load_dotenv()

# Database Config
MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "netgram")

# API Config
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))

# CORS Config
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")