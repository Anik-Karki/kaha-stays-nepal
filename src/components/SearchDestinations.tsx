
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const SearchDestinations = () => {
  const destinations = [
    {
      name: 'Kathmandu',
      image: '🏛️',
      description: 'Cultural Heritage & Temples',
      hotels: '180+ hotels',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      name: 'Pokhara',
      image: '🏔️',
      description: 'Lakes & Mountain Views',
      hotels: '120+ hotels',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Chitwan',
      image: '🐘',
      description: 'Wildlife & Nature',
      hotels: '45+ hotels',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Lumbini',
      image: '☸️',
      description: 'Buddha\'s Birthplace',
      hotels: '30+ hotels',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Everest Base Camp',
      image: '⛰️',
      description: 'Himalayan Adventure',
      hotels: '25+ lodges',
      gradient: 'from-gray-400 to-slate-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Search Hotels by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Destination</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Nepal's most beautiful destinations and find the perfect place to stay
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-br ${destination.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {destination.image}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {destination.description}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {destination.hotels}
                </p>
                
                <div className="mt-4 flex items-center text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {destinations.map((destination, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className={`h-24 bg-gradient-to-br ${destination.gradient} flex items-center justify-center rounded-t-2xl`}>
                  <div className="text-4xl">
                    {destination.image}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {destination.description}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {destination.hotels}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105">
            <MapPin className="w-5 h-5 mr-2" />
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchDestinations;
