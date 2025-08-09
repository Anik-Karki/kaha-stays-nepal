import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Wifi, Car, Coffee, Utensils, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Get search parameters from URL
  const locationParam = searchParams.get('location') || '';
  const guestsParam = searchParams.get('guests') || '2';

  useEffect(() => {
    setSearchTerm(locationParam);
  }, [locationParam]);

  const mockHotels = [
    {
      id: 1,
      name: 'Hotel Everest View',
      location: 'Thamel, Kathmandu',
      rating: 4.8,
      reviewCount: 234,
      price: 2500,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
      verified: true,
      roomTypes: ['economy', 'standarddelux', 'suite'],
      amenities: ['wifi', 'parking', 'restaurant', 'breakfast'],
      city: 'kathmandu'
    },
    {
      id: 2,
      name: 'Lake Palace Hotel',
      location: 'Lakeside, Pokhara',
      rating: 4.6,
      reviewCount: 189,
      price: 3200,
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop',
      verified: true,
      roomTypes: ['standarddelux', 'suite', 'family'],
      amenities: ['wifi', 'restaurant', 'breakfast', 'spa'],
      city: 'pokhara'
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      location: 'Nagarkot, Bhaktapur',
      rating: 4.4,
      reviewCount: 156,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      verified: false,
      roomTypes: ['economy', 'standarddelux'],
      amenities: ['wifi', 'parking', 'breakfast'],
      city: 'bhaktapur'
    },
    {
      id: 4,
      name: 'Heritage Grand',
      location: 'Durbar Square, Kathmandu',
      rating: 4.9,
      reviewCount: 312,
      price: 4500,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      verified: true,
      roomTypes: ['suite', 'family'],
      amenities: ['wifi', 'parking', 'restaurant', 'breakfast', 'spa'],
      city: 'kathmandu'
    },
    {
      id: 5,
      name: 'Safari Resort Chitwan',
      location: 'Sauraha, Chitwan',
      rating: 4.5,
      reviewCount: 178,
      price: 3800,
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop',
      verified: true,
      roomTypes: ['standarddelux', 'family'],
      amenities: ['wifi', 'restaurant', 'breakfast'],
      city: 'chitwan'
    },
    {
      id: 6,
      name: 'Buddha Garden Hotel',
      location: 'Lumbini Garden, Lumbini',
      rating: 4.7,
      reviewCount: 145,
      price: 2800,
      image: 'https://images.unsplash.com/photo-1544640344-2b89510b1fe8?w=400&h=300&fit=crop',
      verified: true,
      roomTypes: ['economy', 'standarddelux', 'suite'],
      amenities: ['wifi', 'parking', 'restaurant', 'breakfast'],
      city: 'lumbini'
    }
  ];

  // Filter hotels based on search and filters
  useEffect(() => {
    let filtered = mockHotels;

    // Search by name or location
    if (searchTerm) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(hotel => 
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Filter by room types
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter(hotel => 
        hotel.roomTypes.some(type => selectedRoomTypes.includes(type))
      );
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'verified':
          return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    setFilteredHotels(filtered);
  }, [searchTerm, priceRange, selectedRoomTypes, selectedAmenities, sortBy]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />
      
      {/* Search Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
              <Input 
                placeholder="Search hotels by name or location..." 
                className="pl-12 py-4 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredHotels.length} hotels found</span> 
                {locationParam && <span> in {locationParam}</span>}
                {guestsParam !== '2' && <span> • {guestsParam} guests</span>}
              </div>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300">
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
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sticky top-24 border border-white/20">
              <h3 className="font-bold text-xl mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Filters</h3>
              
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
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="verified">Verified Hotels</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hotel Listings */}
          <div className="lg:col-span-3">
            {filteredHotels.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
                <div className="text-8xl mb-6">🏨</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">No hotels found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your search criteria or explore different locations</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/20 transform hover:-translate-y-2">
                    <div className="flex flex-col lg:flex-row">
                      {/* Hotel Image */}
                      <div className="lg:w-80 h-48 lg:h-64 relative overflow-hidden">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        {hotel.verified && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center shadow-lg">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>

                      {/* Hotel Info */}
                      <div className="flex-1 p-8">
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-4">
                              <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                              <span className="text-base font-medium">{hotel.location}</span>
                            </div>
                            <div className="flex items-center mb-6">
                              <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1 rounded-full">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-base text-gray-700 ml-3 font-medium">
                                {hotel.rating} ({hotel.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <div className="text-right mt-4 lg:mt-0 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                            <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">₹{hotel.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-600 font-medium">per night</div>
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
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          {hotel.amenities.slice(0, 4).map(amenity => {
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
                          <Button className="w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-10 py-3 text-base font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                            View Details & Book
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredHotels.length > 0 && (
              <div className="text-center mt-16">
                <Button variant="outline" size="lg" className="px-12 py-4 text-base border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 rounded-xl shadow-lg">
                  Load More Hotels
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
