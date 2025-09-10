import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import { movieAPI } from '../utils/api';
import { Loader2, Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q);
      handleSearch(router.query.q);
    }
  }, [router.query.q]);

  const handleSearch = async (searchQuery, pageNum = 1, reset = true) => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response = await movieAPI.searchMovies(searchQuery, pageNum);
      
      if (reset) {
        setMovies(response.data.movies);
      } else {
        setMovies(prev => [...prev, ...response.data.movies]);
      }
      
      setHasMore(response.data.hasMore);
      setPage(pageNum);
      
      // Update URL
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`, undefined, { shallow: true });
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && query) {
      handleSearch(query, page + 1, false);
    }
  };

  return (
    <>
      <Head>
        <title>Search Movies - NetGram</title>
        <meta name="description" content="Search for movies on NetGram" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-950">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <SearchIcon className="h-12 w-12 text-red-600 mr-4" />
              <h1 className="text-4xl font-bold text-white">Search Movies</h1>
            </div>
            <SearchBar 
              onSearch={(q) => handleSearch(q)} 
              placeholder="Search for movies, actors, genres..."
            />
          </div>

          {/* Search Results */}
          {query && (
            <div className="mb-6">
              <h2 className="text-xl text-white mb-4">
                Search results for: <span className="text-red-600">"{query}"</span>
              </h2>
              {!loading && movies.length > 0 && (
                <p className="text-gray-400">Found {movies.length} movies</p>
              )}
            </div>
          )}

          {loading && movies.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-red-600 animate-spin mr-3" />
              <span className="text-gray-400">Searching movies...</span>
            </div>
          ) : (
            <>
              {movies.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center mt-12">
                      <button
                        onClick={loadMore}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span>Load More Results</span>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : query && !loading ? (
                <div className="text-center py-16">
                  <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 mb-2">No movies found</h3>
                  <p className="text-gray-500">Try searching with different keywords</p>
                </div>
              ) : !query ? (
                <div className="text-center py-16">
                  <SearchIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-400 mb-2">Start searching</h3>
                  <p className="text-gray-500">Enter a movie name to find what you're looking for</p>
                </div>
              ) : null}
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}