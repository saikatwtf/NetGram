from pyrogram import Client, filters
from pyrogram.types import Message
import re
from imdb import IMDb
from database import db
from config import ADMIN_IDS, CHANNEL_ID
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from shared.utils import clean_filename, shortify

ia = IMDb()

@Client.on_message(filters.command("start"))
async def start_handler(client: Client, message: Message):
    await message.reply_text(
        "🎬 **Welcome to NetGram Bot!**\n\n"
        "Commands:\n"
        "• `/search <movie>` - Search movies\n"
        "• `/stats` - View statistics\n\n"
        "Enjoy unlimited movies! 🍿"
    )

@Client.on_message(filters.command("search"))
async def search_handler(client: Client, message: Message):
    if len(message.command) < 2:
        await message.reply_text("Usage: `/search <movie name>`")
        return
    
    query = " ".join(message.command[1:])
    movies = await db.search_movies(query)
    
    if not movies:
        await message.reply_text("No movies found! 😔")
        return
    
    response = "🎬 **Search Results:**\n\n"
    for movie in movies[:5]:
        response += f"**{movie['title']}** ({movie['year']})\n"
        response += f"⭐ {movie.get('imdbRating', 'N/A')}/10\n"
        response += f"📥 [Download]({movie['downloadUrl']}) | "
        response += f"🎥 [Stream]({movie['streamUrl']}) | "
        response += f"📱 [Telegram]({movie['telegramUrl']})\n\n"
    
    await message.reply_text(response, disable_web_page_preview=True)

@Client.on_message(filters.command("stats"))
async def stats_handler(client: Client, message: Message):
    count = await db.get_movie_count()
    await message.reply_text(f"📊 **Total Movies:** {count}")

@Client.on_message(filters.chat(CHANNEL_ID) & filters.document)
async def file_handler(client: Client, message: Message):
    try:
        file_name = message.document.file_name
        if not file_name or not any(ext in file_name.lower() for ext in ['.mp4', '.mkv', '.avi']):
            return
        
        # Extract metadata
        metadata = clean_filename(file_name)
        
        # Get IMDb data
        imdb_data = {}
        try:
            movies = ia.search_movie(metadata['title'])
            if movies:
                movie = ia.get_movie(movies[0].movieID)
                imdb_data = {
                    'imdbRating': movie.get('rating', 0),
                    'genres': [str(g) for g in movie.get('genres', [])],
                    'plot': movie.get('plot outline', ''),
                    'poster': movie.get('cover url', '')
                }
        except:
            pass
        
        # Prepare movie data
        movie_data = {
            'title': metadata['title'],
            'year': metadata['year'],
            'quality': metadata['quality'],
            'language': metadata['language'],
            'file_id': message.document.file_id,
            'message_id': message.id,
            'chat_id': message.chat.id,
            'file_size': message.document.file_size,
            'downloadUrl': shortify(f"https://t.me/c/{str(message.chat.id)[4:]}/{message.id}"),
            'streamUrl': shortify(f"https://your-frontend.vercel.app/stream/{message.id}"),
            'telegramUrl': f"https://t.me/c/{str(message.chat.id)[4:]}/{message.id}",
            **imdb_data
        }
        
        # Add to database
        added = await db.add_movie(movie_data)
        if added:
            print(f"✅ Added: {metadata['title']} ({metadata['year']})")
        
    except Exception as e:
        await db.log_error(str(e))
        print(f"❌ Error processing file: {e}")

@Client.on_message(filters.command("auth") & filters.user(ADMIN_IDS))
async def auth_handler(client: Client, message: Message):
    await message.reply_text("✅ You are authorized as admin!")