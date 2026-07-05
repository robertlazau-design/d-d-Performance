import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div id="contact" className="py-24 bg-race-dark border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase italic mb-8">
              Visit <span className="text-race-red">The Shop</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Ready to transform your ride? Stop by the shop or give us a call. 
              We are located in the heart of the automotive district.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-race-carbon p-3 rounded border border-gray-800">
                  <MapPin className="w-6 h-6 text-race-red" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Address</h4>
                  <p className="text-gray-400">12689 NE Whitaker Way<br />Portland, OR 97230</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-race-carbon p-3 rounded border border-gray-800">
                  <Phone className="w-6 h-6 text-race-red" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Phone</h4>
                  <a href="tel:5035091164" className="text-gray-400 hover:text-race-red transition-colors">
                    (503) 509-1164
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="bg-race-carbon p-3 rounded border border-gray-800">
                  <Mail className="w-6 h-6 text-race-red" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Email</h4>
                  <a href="mailto:Dndperformanceautomotive@gmail.com" className="text-gray-400 hover:text-race-red transition-colors">
                    Dndperformanceautomotive@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-race-carbon p-3 rounded border border-gray-800">
                  <Clock className="w-6 h-6 text-race-red" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase mb-1">Hours</h4>
                  <p className="text-gray-400">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Sat: 9:00 AM - 2:00 PM</p>
                  <p className="text-race-red font-bold">Sun: Closed (Racing Day)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Form Side */}
          <div className="bg-race-carbon p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white uppercase mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-red transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-red transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-red transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
              </div>

              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-gray-400 mb-2">Vehicle (Year/Make/Model)</label>
                <input 
                  type="text" 
                  id="vehicle"
                  className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-red transition-colors"
                  placeholder="e.g. 2020 Ford Mustang GT"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">How can we help?</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-race-red transition-colors"
                  placeholder="Looking for a dyno tune..."
                ></textarea>
              </div>

              <button 
                type="button"
                className="w-full bg-race-red text-white font-bold uppercase tracking-widest py-4 hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] block">Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;