import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { movieAPI } from '../../utils/api';
import { 
  Download, 
  Play, 
  ExternalLink, 
  Star, 
  Calendar, 
  Globe, 
  Monitor,
  ArrowLeft,
  Loader2,
  Film
} from 'lucide-react';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await movieAPI.getMovie(id);
      setMovie(response.data);
    } catch (error) {
      console.error('Error loading movie:', error);
      setError('Movie not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - NetGram</title>
        </Head>
        <div className="min-h-screen bg-gray-950">
          <Navbar />
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin mr-3" />
            <span className="text-gray-400">Loading movie details...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Head>
          <title>Movie Not Found - NetGram</title>
        </Head>
        <div className="min-h-screen bg-gray-950">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h1 className="text-2xl text-white mb-4">Movie Not Found</h1>
              <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist.</p>
              <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{movie.title} ({movie.year}) - NetGram</title>
        <meta name="description" content={movie.plot || `Watch ${movie.title} on NetGram`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-950">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
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
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                  <Film className="h-24 w-24" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {movie.imdbRating > 0 && (
                    <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-md font-bold">
                      <Star className="h-4 w-4 mr-1" />
                      {movie.imdbRating}/10
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {movie.year}
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Globe className="h-4 w-4 mr-1" />
                    {movie.language}
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Monitor className="h-4 w-4 mr-1" />
                    {movie.quality}
                  </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {movie.plot && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-3">Plot</h2>
                    <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <Link
                    href={`/stream/${movie.id}`}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center text-lg"
                  >
                    <Play className="h-5 w-5 mr-3" />
                    Stream Now
                  </Link>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href={movie.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                    
                    <a
                      href={movie.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Telegram
                    </a>
                  </div>
                </div>

                {movie.fileSize > 0 && (
                  <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-white font-medium mb-2">File Information</h3>
                    <p className="text-gray-400 text-sm">
                      Size: {(movie.fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}