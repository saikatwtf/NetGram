from fastapi import APIRouter, Query
from typing import Dict, Any, Optional
from database import db
from utils import format_movie_response

router = APIRouter()

@router.get("/filter")
async def filter_movies(
    genre: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    quality: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
) -> Dict[str, Any]:
    """Filter movies by genre, language, quality"""
    skip = (page - 1) * limit
    movies = await db.filter_movies(
        genre=genre,
        language=language,
        quality=quality,
        skip=skip,
        limit=limit
    )
    
    return {
        "movies": [format_movie_response(movie) for movie in movies],
        "filters": {
            "genre": genre,
            "language": language,
            "quality": quality
        },
        "page": page,
        "limit": limit,
        "hasMore": len(movies) == limit
    }