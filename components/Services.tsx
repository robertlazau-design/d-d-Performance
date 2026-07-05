import React, { useState, useEffect } from 'react';
import { Wrench, Zap, ShieldCheck, Car, X } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Performance Upgrades',
    description: 'Turbochargers, superchargers, intakes, and exhaust systems installed by experts.',
    icon: <Zap className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1486262715619-01b8c2484675?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'General Repair',
    description: 'From check engine lights to complete engine overhauls. We handle it all.',
    icon: <Wrench className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Maintenance',
    description: 'Protect your investment with dealer-quality scheduled maintenance and inspections.',
    icon: <ShieldCheck className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Suspension & Handling',
    description: 'Coilovers, lowering springs, and alignment for track-ready handling.',
    icon: <Car className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1550545994-0f3050085a86?q=80&w=2070&auto=format&fit=crop'
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <div id="services" className="py-24 bg-race-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase italic mb-4">
            Our <span className="text-race-red">Expertise</span>
          </h2>
          <div className="h-1 w-24 bg-race-red mx-auto skew-x-[-12deg]"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Whether you need a simple oil change or a 1000HP engine build, D&D Performance Automotive delivers excellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setSelectedService(service)}
              className="group relative bg-race-carbon border border-gray-800 hover:border-race-red transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02] transform hover:shadow-[0_0_20px_rgba(230,0,0,0.15)] rounded-lg"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors"></div>
              </div>
              
              <div className="p-8 relative">
                <div className="absolute -top-8 right-8 bg-race-red p-3 text-white skew-x-[-12deg] shadow-lg">
                  <div className="skew-x-[12deg]">{service.icon}</div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-3 uppercase italic">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-race-red font-mono font-bold text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative bg-race-carbon border border-gray-800 hover:border-race-red/40 transition-colors w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 md:p-10 shadow-2xl flex flex-col gap-8 scrollbar-thin scrollbar-thumb-race-red"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-black/40 hover:bg-race-red/20 border border-gray-800 hover:border-race-red/30 rounded-full transition-all"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col gap-4 border-b border-gray-800 pb-6">
              <div className="flex items-center gap-4 text-race-red">
                <div className="p-3 bg-race-red/10 border border-race-red/20 rounded-lg">
                  {selectedService.icon}
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest bg-race-red/10 px-3 py-1 rounded text-race-red border border-race-red/20">
                  D&D Service
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase italic tracking-tight">
                {selectedService.title}
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {selectedService.description}
              </p>
            </div>

            {/* Walkthrough of Our Process */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-display font-bold text-white uppercase italic tracking-wider border-l-4 border-race-red pl-3">
                Walkthrough of Our Process
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-black/40 p-5 border border-gray-800/80 rounded-lg flex flex-col gap-2">
                  <span className="text-race-red font-mono font-bold text-xs">01 / DIAGNOSTIC & DISCOVERY</span>
                  <h5 className="text-white font-bold text-sm">Initial Consultation</h5>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We perform a complete assessment and vehicle scan to understand the work scope and match your build targets.
                  </p>
                </div>
                <div className="bg-black/40 p-5 border border-gray-800/80 rounded-lg flex flex-col gap-2">
                  <span className="text-race-red font-mono font-bold text-xs">02 / BUILD PLANNING</span>
                  <h5 className="text-white font-bold text-sm">Parts & Custom Design</h5>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Sourcing of premium parts and developing the full specifications before starting execution.
                  </p>
                </div>
                <div className="bg-black/40 p-5 border border-gray-800/80 rounded-lg flex flex-col gap-2">
                  <span className="text-race-red font-mono font-bold text-xs">03 / PRECISION INSTALL</span>
                  <h5 className="text-white font-bold text-sm">Execution & Calibration</h5>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Our team conducts clean, precise installation followed by system testing for validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-display font-bold text-white uppercase italic tracking-wider border-l-4 border-race-red pl-3">
                Current Projects
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-black/20 p-4 border border-gray-800/80 rounded-lg flex items-center gap-4">
                  <div className="w-16 h-16 bg-race-red/10 rounded-lg flex items-center justify-center text-race-red border border-race-red/20 font-bold font-mono">
                    LS3
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm">1969 Chevy Camaro</h5>
                    <p className="text-gray-400 text-xs mt-1">Engine fitting and high-output twin-turbo system mapping.</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-race-red/20 text-race-red text-[10px] uppercase font-bold tracking-widest rounded">In Progress</span>
                  </div>
                </div>
                <div className="bg-black/20 p-4 border border-gray-800/80 rounded-lg flex items-center gap-4">
                  <div className="w-16 h-16 bg-race-red/10 rounded-lg flex items-center justify-center text-race-red border border-race-red/20 font-bold font-mono">
                    FA24
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm">2022 Subaru BRZ</h5>
                    <p className="text-gray-400 text-xs mt-1">Track alignment setup and coilover suspension dampening adjustment.</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] uppercase font-bold tracking-widest rounded">Waiting for Parts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Finished Projects */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-display font-bold text-white uppercase italic tracking-wider border-l-4 border-race-red pl-3">
                Finished Projects Gallery
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="relative group overflow-hidden rounded-lg border border-gray-800 aspect-video bg-black/40">
                  <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop" alt="Finished build 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-white font-bold font-mono">2020 Toyota Supra</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg border border-gray-800 aspect-video bg-black/40">
                  <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop" alt="Finished build 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-white font-bold font-mono">2018 Nissan GT-R</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg border border-gray-800 aspect-video bg-black/40">
                  <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop" alt="Finished build 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-white font-bold font-mono">Porsche 911 GT3</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-lg border border-gray-800 aspect-video bg-black/40">
                  <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop" alt="Finished build 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-white font-bold font-mono">Corvette Z06</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;