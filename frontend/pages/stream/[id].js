import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { movieAPI } from '../../utils/api';
import { ArrowLeft, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

export default function StreamMovie() {
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
          <title>Loading Stream... - NetGram</title>
        </Head>
        <div className="min-h-screen bg-black">
          <Navbar />
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 text-red-600 animate-spin mr-3" />
            <span className="text-gray-400">Loading stream...</span>
          </div>
        </div>
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Head>
          <title>Stream Not Available - NetGram</title>
        </Head>
        <div className="min-h-screen bg-black">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl text-white mb-4">Stream Not Available</h1>
              <p className="text-gray-400 mb-8">This movie stream is currently unavailable.</p>
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
        <title>Stream: {movie.title} - NetGram</title>
        <meta name="description" content={`Stream ${movie.title} on NetGram`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-black">
        <Navbar />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Link 
            href={`/movie/${movie.id}`}
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movie Details
          </Link>

          {/* Video Player Container */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center p-8">
                <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl text-white mb-4">Direct Streaming Not Available</h2>
                <p className="text-gray-400 mb-6">
                  Due to Telegram's file serving limitations, direct streaming is not supported. 
                  Please use one of the options below to watch this movie.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={movie.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Download & Watch
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
            </div>
          </div>

          {/* Movie Info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-400 mb-4">
              {movie.year} • {movie.quality} • {movie.language}
            </p>
            
            {movie.plot && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">How to Watch</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                <p>Click "Download & Watch" to get the direct file link</p>
              </div>
              <div className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                <p>Use your preferred video player (VLC, MX Player, etc.) to stream directly from the link</p>
              </div>
              <div className="flex items-start">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                <p>Or download the file to watch offline</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}