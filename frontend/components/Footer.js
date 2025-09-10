import { Film, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Film className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-white">NetGram</span>
          </div>
          
          <div className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for movie lovers
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2024 NetGram. All rights reserved. Educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}