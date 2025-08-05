import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Wifi, Car, Coffee, Utensils, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const Hotels = () => {
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const mockHotels = [
    {
      id: 1,
      name: 'Hotel Everest View',
      location: 'Thamel, Kathmandu',
      rating: 4.8,
      reviewCount: 234,
      price: 2500,
      image: '🏛️',
      verified: true,
      roomTypes: ['economy', 'standarddelux', 'suite'],
      amenities: ['wifi', 'parking', 'restaurant', 'breakfast']
    },
    {
      id: 2,
      name: 'Lake Palace Hotel',
      location: 'Lakeside, Pokhara',
      rating: 4.6,
      reviewCount: 189,
      price: 3200,
      image: '🏔️',
      verified: true,
      roomTypes: ['standarddelux', 'suite', 'family'],
      amenities: ['wifi', 'restaurant', 'breakfast', 'spa']
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      location: 'Nagarkot, Bhaktapur',
      rating: 4.4,
      reviewCount: 156,
      price: 1800,
      image: '⛰️',
      verified: false,
      roomTypes: ['economy', 'standarddelux'],
      amenities: ['wifi', 'parking', 'breakfast']
    },
    {
      id: 4,
      name: 'Heritage Grand',
      location: 'Durbar Square, Kathmandu',
      rating: 4.9,
      reviewCount: 312,
      price: 4500,
      image: '🏰',
      verified: true,
      roomTypes: ['suite', 'family'],
      amenities: ['wifi', 'parking', 'restaurant', 'breakfast', 'spa']
    }
  ];

  const roomTypeFilters = [
    { id: 'economy', label: 'Economy', icon: '💰' },
    { id: 'standarddelux', label: 'Standard Deluxe', icon: '🏨' },
    { id: 'suite', label: 'Suite', icon: '👑' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' }
  ];

  const amenityFilters = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils }
  ];

  const toggleFilter = (filterId: string, filterType: 'roomType' | 'amenity') => {
    if (filterType === 'roomType') {
      setSelectedRoomTypes(prev => 
        prev.includes(filterId) 
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      );
    } else {
      setSelectedAmenities(prev => 
        prev.includes(filterId) 
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search hotels in Kathmandu..." 
                className="pl-10 py-3"
                defaultValue="Kathmandu"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">156 hotels found</span> • 3 guests • 2 nights
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Modify Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Price per night</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  min={500}
                  step={250}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Room Types */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Room Types</h4>
                <div className="space-y-3">
                  {roomTypeFilters.map(filter => (
                    <label key={filter.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRoomTypes.includes(filter.id)}
                        onChange={() => toggleFilter(filter.id, 'roomType')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-lg">{filter.icon}</span>
                      <span className="text-sm">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h4 className="font-medium mb-4">Amenities</h4>
                <div className="space-y-3">
                  {amenityFilters.map(filter => {
                    const Icon = filter.icon;
                    return (
                      <label key={filter.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(filter.id)}
                          onChange={() => toggleFilter(filter.id, 'amenity')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{filter.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="font-medium mb-4">Sort by</h4>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="verified">KahaTAG Verified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hotel Listings */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {mockHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Hotel Image */}
                    <div className="lg:w-80 h-48 lg:h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative">
                      <div className="text-8xl opacity-80">{hotel.image}</div>
                      {hotel.verified && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          KahaTAG Verified
                        </div>
                      )}
                    </div>

                    {/* Hotel Info */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hotel.location}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              {hotel.rating} ({hotel.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600">₹{hotel.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>

                      {/* Room Types */}
                      <div className="mb-4">
                        <span className="text-sm text-gray-600 font-medium">Available: </span>
                        <span className="text-sm text-gray-800">
                          {hotel.roomTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center space-x-4 mb-6">
                        {hotel.amenities.map(amenity => {
                          const amenityConfig = amenityFilters.find(a => a.id === amenity);
                          if (amenityConfig) {
                            const Icon = amenityConfig.icon;
                            return (
                              <div key={amenity} className="flex items-center space-x-1 text-gray-600">
                                <Icon className="w-4 h-4" />
                                <span className="text-xs">{amenityConfig.label}</span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Action Button */}
                      <Link to={`/hotels/${hotel.id}`}>
                        <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 px-8">
                          View Details & Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Hotels
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
