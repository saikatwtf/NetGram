from typing import Dict, Any

def format_movie_response(movie: Dict[str, Any]) -> Dict[str, Any]:
    """Format movie data for API response"""
    return {
        "id": movie.get("message_id"),
        "title": movie.get("title", "Unknown"),
        "year": movie.get("year", 0),
        "genres": movie.get("genres", []),
        "language": movie.get("language", "Unknown"),
        "quality": movie.get("quality", "Unknown"),
        "imdbRating": movie.get("imdbRating", 0),
        "poster": movie.get("poster", ""),
        "plot": movie.get("plot", ""),
        "downloadUrl": movie.get("downloadUrl", ""),
        "streamUrl": movie.get("streamUrl", ""),
        "telegramUrl": movie.get("telegramUrl", ""),
        "fileSize": movie.get("file_size", 0),
        "dateAdded": movie.get("date_added")
    }