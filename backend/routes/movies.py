from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from database import db
from utils import format_movie_response

router = APIRouter()

@router.get("/movies")
async def get_movies(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
) -> Dict[str, Any]:
    """Get paginated movies"""
    skip = (page - 1) * limit
    movies = await db.get_movies(skip=skip, limit=limit)
    
    return {
        "movies": [format_movie_response(movie) for movie in movies],
        "page": page,
        "limit": limit,
        "hasMore": len(movies) == limit
    }

@router.get("/movies/{movie_id}")
async def get_movie(movie_id: int) -> Dict[str, Any]:
    """Get single movie by ID"""
    movie = await db.get_movie_by_id(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    return format_movie_response(movie)

@router.get("/popular")
async def get_popular_movies(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
) -> Dict[str, Any]:
    """Get popular movies by IMDb rating"""
    skip = (page - 1) * limit
    movies = await db.get_popular_movies(skip=skip, limit=limit)
    
    return {
        "movies": [format_movie_response(movie) for movie in movies],
        "page": page,
        "limit": limit,
        "hasMore": len(movies) == limit
    }

@router.get("/recent")
async def get_recent_movies(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
) -> Dict[str, Any]:
    """Get recently added movies"""
    skip = (page - 1) * limit
    movies = await db.get_recent_movies(skip=skip, limit=limit)
    
    return {
        "movies": [format_movie_response(movie) for movie in movies],
        "page": page,
        "limit": limit,
        "hasMore": len(movies) == limit
    }