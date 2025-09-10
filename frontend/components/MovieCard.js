import Link from 'next/link';
import { Download, Play, ExternalLink, Star, Film } from 'lucide-react';

export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="relative aspect-[2/3] bg-gray-800">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-400">
          <Film className="h-16 w-16" />
        </div>
        
        {movie.imdbRating > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold flex items-center">
            <Star className="h-3 w-3 mr-1" />
            {movie.imdbRating}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">
          {movie.year} • {movie.quality} • {movie.language}
        </p>
        
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Link
            href={`/movie/${movie.id}`}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Play className="h-4 w-4 mr-2" />
            View Details
          </Link>
          
          <div className="flex space-x-2">
            <a
              href={movie.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </a>
            <a
              href={movie.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}