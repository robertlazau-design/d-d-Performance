import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2898&auto=format&fit=crop" 
          alt="Performance Car on Track" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
      </div>

      <div className="relative h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-race-red">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-gray-300 font-bold uppercase tracking-wider text-sm">Top Rated Local Shop</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none mb-6">
            More Power.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-race-red to-orange-600">
              Less Compromise.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl border-l-4 border-race-red pl-6">
            Welcome to D&D Performance Automotive. We don't just fix cars; we engineer excitement. 
            Trusted by enthusiasts, proven on the dyno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact"
              className="group relative px-8 py-4 bg-race-red text-white font-bold uppercase tracking-widest overflow-hidden skew-x-[-12deg] hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] inline-block text-center"
            >
              <div className="skew-x-[12deg] flex items-center justify-center gap-2">
                Book Appointment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
            
            <a 
              href="#services"
              className="group relative px-8 py-4 border border-white text-white font-bold uppercase tracking-widest overflow-hidden skew-x-[-12deg] hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] inline-block text-center"
            >
               <div className="skew-x-[12deg]">
                Explore Services
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Hero;