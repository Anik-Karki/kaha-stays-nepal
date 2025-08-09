
import React from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotelSearch from './HotelSearch';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-24 px-4 overflow-hidden">
      {/* Premium Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-100/30"></div>
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
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm border border-emerald-200/50">
            <Star className="w-4 h-4 mr-2 text-emerald-600" />
            Trusted by 50,000+ travelers worldwide
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">Amazing Hotels</span> in Nepal
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Experience authentic Nepalese hospitality and comfort. From mountain resorts to city hotels, discover your perfect stay in Nepal.
          </p>
        </div>

        {/* Enhanced Search Widget */}
        <div className="mb-12">
          <HotelSearch showDetailed={true} />
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-12 mb-12">
          <div className="text-center group">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">1000+</div>
            <div className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">Premium Hotels</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="text-center group">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">98%</div>
            <div className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">Satisfaction Rate</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="text-center group">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">24/7</div>
            <div className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">Concierge Support</div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Hotel Card Preview */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl shadow-lg">
                🏔️
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-base">Luxury Everest Resort</h3>
                  <div className="flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 animate-pulse"></div>
                    Premium
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                  Thamel, Kathmandu
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">(4.8)</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹8,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Preview */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100/50 shadow-xl">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Instant Search Results</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Pokhara, Kaski</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">2 Guests • 1 Suite</span>
                <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">25 hotels found</span>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Featured Experiences</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🏔️</div>
                <div className="text-sm font-bold text-emerald-800">Mountain Views</div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🍽️</div>
                <div className="text-sm font-bold text-teal-800">Fine Dining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Floating Elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-full opacity-10 animate-pulse blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 rounded-full opacity-10 animate-pulse delay-1000 blur-xl"></div>
        <div className="absolute top-1/4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 -left-4 w-20 h-20 bg-gradient-to-br from-teal-300 to-green-400 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
