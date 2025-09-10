from pyrogram import Client
from config import API_ID, API_HASH, BOT_TOKEN
import handlers

app = Client(
    "netgram_bot",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN
)

if __name__ == "__main__":
    print("🚀 NetGram Bot Starting...")
    app.run()