import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-race-red selection:text-white">
      <Navbar />
      <Hero />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
      <AIChat />
    </div>
  );
};

export default App;