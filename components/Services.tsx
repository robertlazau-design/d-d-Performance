import React from 'react';
import { Wrench, Activity, Zap, ShieldCheck, PenTool, Car } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Dyno Tuning',
    description: 'Precision calibration for maximum horsepower and torque tailored to your specific build.',
    icon: <Activity className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1597762696660-8456d2035882?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Performance Upgrades',
    description: 'Turbochargers, superchargers, intakes, and exhaust systems installed by experts.',
    icon: <Zap className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1486262715619-01b8c2484675?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'General Repair',
    description: 'From check engine lights to complete engine overhauls. We handle it all.',
    icon: <Wrench className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Maintenance',
    description: 'Protect your investment with dealer-quality scheduled maintenance and inspections.',
    icon: <ShieldCheck className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Suspension & Handling',
    description: 'Coilovers, lowering springs, and alignment for track-ready handling.',
    icon: <Car className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1550545994-0f3050085a86?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Fabrication',
    description: 'Custom welding and fabrication for unique builds and specialized requirements.',
    icon: <PenTool className="w-8 h-8" />,
    image: 'https://images.unsplash.com/photo-1504222490245-48778a3bf680?q=80&w=2071&auto=format&fit=crop'
  }
];

const Services: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-race-carbon border border-gray-800 hover:border-race-red transition-all duration-300 overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;