import React from 'react';
import { Gauge, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-4">
             <Gauge className="h-8 w-8 text-race-red" />
             <span className="font-display font-bold text-2xl tracking-tighter uppercase italic text-white">
              D&D <span className="text-race-red">Performance</span>
            </span>
          </div>
          <p className="text-gray-500 text-center max-w-md">
            Unleashing the true potential of your vehicle. Professional tuning, fabrication, and maintenance.
          </p>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          <a 
            href="https://www.facebook.com/p/DD-Performance-Automotive-LLC-100083150689714/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-race-red transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </a>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} D&D Performance Automotive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;