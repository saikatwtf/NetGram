import re
import requests
from typing import Dict, Any
import os

def clean_filename(filename: str) -> Dict[str, Any]:
    """Extract metadata from filename"""
    # Remove file extension
    name = re.sub(r'\.[^.]+$', '', filename)
    
    # Extract year
    year_match = re.search(r'(\d{4})', name)
    year = int(year_match.group(1)) if year_match else 0
    
    # Extract quality
    quality_patterns = ['4K', '2160p', '1080p', '720p', '480p', 'HDRip', 'BluRay', 'WEBRip']
    quality = 'Unknown'
    for q in quality_patterns:
        if q.lower() in name.lower():
            quality = q
            break
    
    # Extract language
    language_patterns = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada']
    language = 'Unknown'
    for lang in language_patterns:
        if lang.lower() in name.lower():
            language = lang
            break
    
    # Clean title (remove year, quality, language indicators)
    title = re.sub(r'\d{4}', '', name)
    title = re.sub(r'(4K|2160p|1080p|720p|480p|HDRip|BluRay|WEBRip)', '', title, flags=re.IGNORECASE)
    title = re.sub(r'(Hindi|English|Tamil|Telugu|Malayalam|Kannada)', '', title, flags=re.IGNORECASE)
    title = re.sub(r'[^\w\s]', ' ', title)
    title = ' '.join(title.split()).strip()
    
    return {
        'title': title or 'Unknown Movie',
        'year': year,
        'quality': quality,
        'language': language
    }

def shortify(url: str) -> str:
    """Shorten URL using configured shortener API"""
    shortener_api = os.getenv('SHORTENER_API', '')
    
    if not shortener_api:
        return url
    
    try:
        # Generic shortener implementation
        # Replace with specific API calls based on your shortener service
        response = requests.post(
            shortener_api,
            json={'url': url},
            timeout=5
        )
        
        if response.status_code == 200:
            data = response.json()
            return data.get('short_url', url)
    except:
        pass
    
    return url

def is_duplicate(title: str, year: int, existing_movies: list) -> bool:
    """Check if movie already exists"""
    for movie in existing_movies:
        if (movie.get('title', '').lower() == title.lower() and 
            movie.get('year') == year):
            return True
    return False

def log(message: str, level: str = 'INFO') -> None:
    """Simple logging function"""
    import datetime
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{timestamp}] {level}: {message}")

def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format"""
    if size_bytes == 0:
        return "0 B"
    
    size_names = ["B", "KB", "MB", "GB", "TB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    
    return f"{size_bytes:.1f} {size_names[i]}"