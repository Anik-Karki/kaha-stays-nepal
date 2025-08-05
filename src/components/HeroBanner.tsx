
import React from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotelSearch from './HotelSearch';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="mountain-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 5 L15 15 L5 15 Z" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#mountain-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl relative">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 50,000+ travelers
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Verified Hotels</span> Across Nepal
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Book smart. Stay connected. Experience verified KahaTAG locations with transparent pricing and immersive visuals.
          </p>
        </div>

        {/* Enhanced Search Widget */}
        <div className="mb-12">
          <HotelSearch showDetailed={true} />
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">1000+</div>
            <div className="text-sm text-gray-600">Verified Hotels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Hotel Card Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                🏛️
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">Hotel Everest View</h3>
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Verified
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  Thamel, Kathmandu
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(4.8)</span>
                  <span className="text-sm font-bold text-blue-600">₹2,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Preview */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Quick Search Results</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>Pokhara, Kaski</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">2 Guests • 1 Room</span>
                <span className="font-medium text-blue-600">15 hotels found</span>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Featured Destinations</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🏔️</div>
                <div className="text-xs font-medium text-purple-800">Mountain Views</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🍽️</div>
                <div className="text-xs font-medium text-orange-800">Local Cuisine</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
