import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Review } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const reviews: Review[] = [
  {
    id: 1,
    name: "Michael R.",
    rating: 5,
    text: "Took my Corvette here for a dyno tune. The difference is night and day. These guys know their stuff and treated my car like it was their own.",
    car: "2019 Corvette Z06",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    rating: 5,
    text: "Honest mechanics are hard to find. D&D not only fixed my issue for less than the dealer quoted, but they also explained everything clearly. Highly recommended!",
    car: "2018 Honda Civic Type R",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "David K.",
    rating: 5,
    text: "Absolute legends. Did a full engine swap on my project car. The attention to detail is unmatched in this area. They even fixed some wiring issues the previous shop messed up.",
    car: "1995 Nissan 240SX",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "James T.",
    rating: 5,
    text: "Brought my WRX in for a clutch job. Done fast, done right. The new clutch feel is amazing. They even detailed the engine bay.",
    car: "2020 Subaru WRX STI",
    date: "1 week ago"
  },
  {
    id: 5,
    name: "Mark D.",
    rating: 5,
    text: "Best shop in town for LS swaps. These guys are wizards. My truck runs better than factory now and makes twice the power.",
    car: "1985 Chevy C10",
    date: "4 days ago"
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  }),
};

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000); // Auto-flip every 6 seconds
    return () => clearInterval(timer);
  }, [index]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentReview = reviews[index];

  return (
    <div id="reviews" className="py-32 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
        {/* Background texture */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
           <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-race-red to-orange-600">Verdict</span>
            </h2>
            <div className="flex items-center justify-center gap-4 bg-race-carbon/80 backdrop-blur border border-race-red/30 px-6 py-2 rounded-full inline-flex">
              <span className="text-3xl font-bold text-white">5.0</span>
              <div className="flex text-race-red">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-400 text-sm border-l border-gray-700 pl-4 uppercase tracking-widest">Google Verified</span>
            </div>
        </div>

        {/* Carousel Section */}
        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-[1000px]">
            
            {/* Navigation Buttons */}
            <button 
                onClick={() => paginate(-1)}
                className="absolute left-0 z-20 p-3 rounded-full bg-race-carbon border border-gray-800 text-gray-400 hover:text-white hover:border-race-red transition-all hover:scale-110 hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
                onClick={() => paginate(1)}
                className="absolute right-0 z-20 p-3 rounded-full bg-race-carbon border border-gray-800 text-gray-400 hover:text-white hover:border-race-red transition-all hover:scale-110 hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={index}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        rotateY: { duration: 0.4 }
                    }}
                    className="absolute w-full md:w-[800px]"
                >
                    <div className="bg-race-carbon p-8 md:p-12 border border-gray-800 rounded-xl relative shadow-2xl bg-opacity-95 backdrop-blur-sm">
                        {/* Decorative Quote Mark */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-race-red p-4 rounded-full shadow-[0_0_20px_rgba(230,0,0,0.5)]">
                             <Quote className="w-8 h-8 text-white fill-white" />
                        </div>

                        <div className="mt-6 text-center">
                            <div className="flex justify-center mb-6 text-race-red">
                                {[...Array(currentReview.rating)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-current" />
                                ))}
                            </div>
                            
                            <p className="text-xl md:text-3xl font-display font-medium text-white mb-8 leading-tight italic">
                                "{currentReview.text}"
                            </p>
                            
                            <div className="border-t border-gray-800 pt-6 flex flex-col items-center">
                                <h4 className="text-xl font-bold text-white uppercase tracking-wider">{currentReview.name}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-3 py-1 bg-black rounded text-xs text-race-red font-mono border border-race-red/30">
                                        {currentReview.car}
                                    </span>
                                    <span className="text-gray-500 text-xs">{currentReview.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
        
        {/* Indicators */}
        <div className="flex gap-3 mt-8">
            {reviews.map((_, i) => (
                <button
                    key={i}
                    onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        setIndex(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? 'w-8 bg-race-red' : 'w-2 bg-gray-700 hover:bg-gray-500'
                    }`}
                />
            ))}
        </div>

        <div className="mt-12 text-center">
             <a 
                href="https://www.google.com/search?q=D%26D+Performance+Automotive" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors border-b border-transparent hover:border-race-red pb-1"
             >
                Read all reviews on Google
             </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;