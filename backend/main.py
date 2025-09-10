from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import movies, search, filters
from config import FRONTEND_URL

app = FastAPI(
    title="NetGram API",
    description="Netflix-style Telegram movie platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(movies.router, tags=["movies"])
app.include_router(search.router, tags=["search"])
app.include_router(filters.router, tags=["filters"])

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "NetGram API is running"}

if __name__ == "__main__":
    import uvicorn
    from config import API_HOST, API_PORT
    uvicorn.run(app, host=API_HOST, port=API_PORT)