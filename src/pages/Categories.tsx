
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Star, Users, Wifi, Car, Coffee, Utensils, Shield, Crown, Heart, Briefcase, Leaf, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 'luxury',
      name: 'Luxury Hotels',
      description: 'Premium accommodations with world-class amenities and exceptional service',
      icon: Crown,
      iconBg: 'from-yellow-400 to-orange-500',
      count: 45,
      features: ['5-Star Service', 'Spa & Wellness', 'Fine Dining', 'Concierge'],
      hotels: [
        { name: 'Royal Heritage', location: 'Durbar Square, Kathmandu', rating: 4.9, price: 8500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
        { name: 'Himalayan Palace', location: 'Thamel, Kathmandu', rating: 4.8, price: 7200, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' }
      ]
    },
    {
      id: 'boutique',
      name: 'Boutique Hotels',
      description: 'Unique, stylish hotels with personalized service and local charm',
      icon: Heart,
      iconBg: 'from-pink-400 to-rose-500',
      count: 32,
      features: ['Unique Design', 'Local Culture', 'Personalized Service', 'Intimate Setting'],
      hotels: [
        { name: 'Heritage Boutique', location: 'Patan, Lalitpur', rating: 4.7, price: 4500, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300&h=200&fit=crop' },
        { name: 'Mountain View Lodge', location: 'Nagarkot', rating: 4.6, price: 3800, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop' }
      ]
    },
    {
      id: 'budget',
      name: 'Budget-Friendly',
      description: 'Affordable accommodations without compromising comfort and quality',
      icon: Home,
      iconBg: 'from-green-400 to-emerald-500',
      count: 128,
      features: ['Great Value', 'Clean Rooms', 'Basic Amenities', 'Central Location'],
      hotels: [
        { name: 'Backpacker Inn', location: 'Thamel, Kathmandu', rating: 4.2, price: 1200, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop' },
        { name: 'Traveler Lodge', location: 'Lakeside, Pokhara', rating: 4.3, price: 1500, image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=300&h=200&fit=crop' }
      ]
    },
    {
      id: 'family',
      name: 'Family Hotels',
      description: 'Perfect for families with children and groups seeking comfort',
      icon: Users,
      iconBg: 'from-blue-400 to-indigo-500',
      count: 67,
      features: ['Family Rooms', 'Kids Activities', 'Safe Environment', 'Play Areas'],
      hotels: [
        { name: 'Family Resort', location: 'Chitwan National Park', rating: 4.5, price: 5500, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=200&fit=crop' },
        { name: 'Garden Hotel', location: 'Bhaktapur', rating: 4.4, price: 3200, image: 'https://images.unsplash.com/photo-1544640344-2b89510b1fe8?w=300&h=200&fit=crop' }
      ]
    },
    {
      id: 'business',
      name: 'Business Hotels',
      description: 'Ideal for business travelers with meeting facilities and services',
      icon: Briefcase,
      iconBg: 'from-gray-400 to-slate-500',
      count: 54,
      features: ['Meeting Rooms', 'High-Speed WiFi', 'Business Center', 'Airport Transfer'],
      hotels: [
        { name: 'Corporate Plaza', location: 'New Baneshwor, Kathmandu', rating: 4.6, price: 6200, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop' },
        { name: 'Executive Inn', location: 'Durbar Marg, Kathmandu', rating: 4.5, price: 5800, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop' }
      ]
    },
    {
      id: 'eco',
      name: 'Eco-Friendly',
      description: 'Sustainable hotels with environmental consciousness and green practices',
      icon: Leaf,
      iconBg: 'from-emerald-400 to-green-500',
      count: 29,
      features: ['Solar Power', 'Organic Food', 'Waste Management', 'Local Materials'],
      hotels: [
        { name: 'Green Valley Resort', location: 'Dhulikhel', rating: 4.7, price: 4200, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop' },
        { name: 'Eco Lodge', location: 'Bandipur', rating: 4.5, price: 3500, image: 'https://images.unsplash.com/photo-1544640344-2b89510b1fe8?w=300&h=200&fit=crop' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />
      
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 60 60">
            <pattern id="category-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#category-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <Shield className="w-4 h-4 mr-2" />
            All hotels verified with KahaTAG technology
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Hotel <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Categories</span>
          </h1>
          <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-emerald-100">
            Discover the perfect accommodation for your needs across Nepal's diverse hospitality landscape. 
            From luxury resorts to budget-friendly stays, find your ideal match.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-12 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">500+</div>
              <div className="text-sm text-emerald-200">Verified Hotels</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">6</div>
              <div className="text-sm text-emerald-200">Categories</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">25+</div>
              <div className="text-sm text-emerald-200">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/20 transform hover:-translate-y-2 group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.iconBg} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {category.count} hotels
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  
                  {/* Premium Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Premium Features:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg p-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Hotels with Images */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Featured Hotels:</h4>
                    <div className="space-y-4">
                      {category.hotels.map((hotel, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name}
                              className="w-16 h-16 rounded-xl object-cover shadow-lg"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-bold text-gray-900 text-base">{hotel.name}</h5>
                                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹{hotel.price.toLocaleString()}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                                  {hotel.location}
                                </div>
                                <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-2 py-1 rounded-full">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                  <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={`/hotels?category=${category.id}`}>
                    <Button className={`w-full py-4 text-base font-semibold bg-gradient-to-r ${category.iconBg} hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl shadow-lg`}>
                      Explore {category.name}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium CTA Section */}
        <div className="bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 backdrop-blur-xl rounded-3xl shadow-2xl p-12 mt-16 text-center border border-white/20">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Use our advanced search and filtering options to find the perfect hotel for your specific needs. 
              Our KahaTAG verified network ensures authentic and reliable accommodations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/hotels">
                <Button className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Advanced Search
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" className="px-10 py-4 text-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 rounded-xl shadow-lg">
                  Contact Support
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
