
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Star, Users, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const categories = [
    {
      id: 'luxury',
      name: 'Luxury Hotels',
      description: 'Premium accommodations with world-class amenities',
      icon: '👑',
      count: 45,
      features: ['5-Star Service', 'Spa & Wellness', 'Fine Dining', 'Concierge'],
      hotels: [
        { name: 'Royal Heritage', location: 'Durbar Square, Kathmandu', rating: 4.9, price: 8500 },
        { name: 'Himalayan Palace', location: 'Thamel, Kathmandu', rating: 4.8, price: 7200 }
      ]
    },
    {
      id: 'boutique',
      name: 'Boutique Hotels',
      description: 'Unique, stylish hotels with personalized service',
      icon: '🏨',
      count: 32,
      features: ['Unique Design', 'Local Culture', 'Personalized Service', 'Intimate Setting'],
      hotels: [
        { name: 'Heritage Boutique', location: 'Patan, Lalitpur', rating: 4.7, price: 4500 },
        { name: 'Mountain View Lodge', location: 'Nagarkot', rating: 4.6, price: 3800 }
      ]
    },
    {
      id: 'budget',
      name: 'Budget-Friendly',
      description: 'Affordable accommodations without compromising comfort',
      icon: '💰',
      count: 128,
      features: ['Great Value', 'Clean Rooms', 'Basic Amenities', 'Central Location'],
      hotels: [
        { name: 'Backpacker Inn', location: 'Thamel, Kathmandu', rating: 4.2, price: 1200 },
        { name: 'Traveler Lodge', location: 'Lakeside, Pokhara', rating: 4.3, price: 1500 }
      ]
    },
    {
      id: 'family',
      name: 'Family Hotels',
      description: 'Perfect for families with children and groups',
      icon: '👨‍👩‍👧‍👦',
      count: 67,
      features: ['Family Rooms', 'Kids Activities', 'Safe Environment', 'Play Areas'],
      hotels: [
        { name: 'Family Resort', location: 'Chitwan National Park', rating: 4.5, price: 5500 },
        { name: 'Garden Hotel', location: 'Bhaktapur', rating: 4.4, price: 3200 }
      ]
    },
    {
      id: 'business',
      name: 'Business Hotels',
      description: 'Ideal for business travelers with meeting facilities',
      icon: '💼',
      count: 54,
      features: ['Meeting Rooms', 'High-Speed WiFi', 'Business Center', 'Airport Transfer'],
      hotels: [
        { name: 'Corporate Plaza', location: 'New Baneshwor, Kathmandu', rating: 4.6, price: 6200 },
        { name: 'Executive Inn', location: 'Durbar Marg, Kathmandu', rating: 4.5, price: 5800 }
      ]
    },
    {
      id: 'eco',
      name: 'Eco-Friendly',
      description: 'Sustainable hotels with environmental consciousness',
      icon: '🌱',
      count: 29,
      features: ['Solar Power', 'Organic Food', 'Waste Management', 'Local Materials'],
      hotels: [
        { name: 'Green Valley Resort', location: 'Dhulikhel', rating: 4.7, price: 4200 },
        { name: 'Eco Lodge', location: 'Bandipur', rating: 4.5, price: 3500 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hotel Categories</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover the perfect accommodation for your needs across Nepal's diverse hospitality landscape
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {category.count} hotels
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Hotels */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Featured Hotels:</h4>
                  <div className="space-y-3">
                    {category.hotels.map((hotel, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-sm text-gray-900">{hotel.name}</h5>
                          <div className="text-lg font-bold text-blue-600">₹{hotel.price.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {hotel.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-xs text-gray-600">{hotel.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore {category.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">
            Use our advanced search and filtering options to find the perfect hotel for your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Advanced Search
            </Button>
            <Button variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
