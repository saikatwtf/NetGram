import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import { movieAPI } from '../utils/api';
import { Loader2, TrendingUp, Clock } from 'lucide-react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recent');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMovies();
  }, [activeTab]);

  const loadMovies = async (pageNum = 1, reset = true) => {
    try {
      setLoading(true);
      const response = activeTab === 'popular' 
        ? await movieAPI.getPopular(pageNum)
        : await movieAPI.getRecent(pageNum);
      
      if (reset) {
        setMovies(response.data.movies);
      } else {
        setMovies(prev => [...prev, ...response.data.movies]);
      }
      
      setHasMore(response.data.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      loadMovies();
      return;
    }
    
    try {
      setLoading(true);
      const response = await movieAPI.searchMovies(query);
      setMovies(response.data.movies);
      setHasMore(false);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      const response = await movieAPI.filterMovies(filters);
      setMovies(response.data.movies);
      setHasMore(false);
    } catch (error) {
      console.error('Error filtering movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadMovies(page + 1, false);
    }
  };

  return (
    <>
      <Head>
        <title>NetGram - Netflix-style Telegram Movies</title>
        <meta name="description" content="Stream and download movies from Telegram channels" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-950">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to <span className="text-red-600">NetGram</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover and stream movies from Telegram channels
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Tabs and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('recent')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'recent'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Recent</span>
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'popular'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Popular</span>
              </button>
            </div>
            
            <Filters onFilter={handleFilter} />
          </div>

          {/* Movies Grid */}
          {loading && movies.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {movies.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">No movies found</p>
                </div>
              )}

              {hasMore && movies.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span>Load More</span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}