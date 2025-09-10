from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import hashlib
from config import MONGO_URI, DATABASE_NAME

class Database:
    def __init__(self):
        self.client = AsyncIOMotorClient(MONGO_URI)
        self.db = self.client[DATABASE_NAME]
        self.movies = self.db.movies
        self.logs = self.db.logs

    async def add_movie(self, movie_data):
        """Add movie to database if not duplicate"""
        file_hash = hashlib.md5(f"{movie_data['title']}{movie_data['year']}".encode()).hexdigest()
        
        existing = await self.movies.find_one({"file_hash": file_hash})
        if existing:
            return False
        
        movie_data["file_hash"] = file_hash
        movie_data["date_added"] = datetime.utcnow()
        await self.movies.insert_one(movie_data)
        return True

    async def search_movies(self, query, limit=10):
        """Search movies by title"""
        return await self.movies.find(
            {"title": {"$regex": query, "$options": "i"}}
        ).limit(limit).to_list(length=limit)

    async def get_movie_count(self):
        """Get total movie count"""
        return await self.movies.count_documents({})

    async def log_error(self, error_msg):
        """Log errors to database"""
        await self.logs.insert_one({
            "error": error_msg,
            "timestamp": datetime.utcnow()
        })

db = Database()