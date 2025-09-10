from fastapi import APIRouter, Query
from typing import Dict, Any
from database import db
from utils import format_movie_response

router = APIRouter()

@router.get("/search")
async def search_movies(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
) -> Dict[str, Any]:
    """Search movies by title"""
    skip = (page - 1) * limit
    movies = await db.search_movies(query, skip=skip, limit=limit)
    
    return {
        "movies": [format_movie_response(movie) for movie in movies],
        "query": query,
        "page": page,
        "limit": limit,
        "hasMore": len(movies) == limit
    }