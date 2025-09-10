import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Film } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-white">NetGram</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
              Search
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <Link href="/" className="block py-2 text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/search" className="block py-2 text-gray-300 hover:text-white">
              Search
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}