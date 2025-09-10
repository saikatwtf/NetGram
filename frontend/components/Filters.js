import { useState } from 'react';
import { Filter, X } from 'lucide-react';

export default function Filters({ onFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    language: '',
    quality: ''
  });

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];
  const qualities = ['480p', '720p', '1080p', '4K'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { genre: '', language: '', quality: '' };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
          hasActiveFilters
            ? 'bg-red-600 border-red-600 text-white'
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-white text-red-600 rounded-full px-2 py-0.5 text-xs font-bold">
            {Object.values(filters).filter(v => v).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 min-w-80 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Filter Movies</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:border-red-500 focus:outline-none"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:border-red-500 focus:outline-none"
              >
                <option value="">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">Quality</label>
              <select
                value={filters.quality}
                onChange={(e) => handleFilterChange('quality', e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:border-red-500 focus:outline-none"
              >
                <option value="">All Qualities</option>
                {qualities.map(quality => (
                  <option key={quality} value={quality}>{quality}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}