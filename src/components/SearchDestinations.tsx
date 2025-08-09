
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchDestinations = () => {
  const destinations = [
    {
      name: 'Kathmandu',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      description: 'Cultural Heritage & Temples',
      hotels: '180+ hotels',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      name: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop',
      description: 'Lakes & Mountain Views',
      hotels: '120+ hotels',
      gradient: 'from-teal-400 to-emerald-500'
    },
    {
      name: 'Chitwan',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
      description: 'Wildlife & Nature',
      hotels: '45+ hotels',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Lumbini',
      image: 'https://images.unsplash.com/photo-1544640344-2b89510b1fe8?w=400&h=300&fit=crop',
      description: 'Buddha\'s Birthplace',
      hotels: '30+ hotels',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      name: 'Everest Base Camp',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      description: 'Himalayan Adventure',
      hotels: '25+ lodges',
      gradient: 'from-green-400 to-emerald-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Explore Nepal by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Destination</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Nepal's most beautiful destinations and find the perfect place to stay
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {destinations.map((destination, index) => (
            <Link 
              key={index}
              to={`/hotels?location=${encodeURIComponent(destination.name)}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden"
            >
              <div className="h-32 overflow-hidden relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {destination.description}
                </p>
                <p className="text-sm font-medium text-emerald-600">
                  {destination.hotels}
                </p>
                
                <div className="mt-4 flex items-center text-emerald-600 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max px-4">
            {destinations.map((destination, index) => (
              <Link 
                key={index}
                to={`/hotels?location=${encodeURIComponent(destination.name)}`}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
              >
                <div className="h-24 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {destination.description}
                  </p>
                  <p className="text-sm font-medium text-emerald-600">
                    {destination.hotels}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/hotels">
            <button className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105">
              <MapPin className="w-5 h-5 mr-2" />
              View All Destinations
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchDestinations;
