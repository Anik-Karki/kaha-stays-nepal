import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search, Filter, MapPin, Star, Wifi, Car, Coffee, Users, Calendar,
  ChevronDown, SlidersHorizontal, Grid, List, Heart, Share2,
  TrendingUp, Award, Sparkles, Eye, ArrowRight, Clock, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Mock hotel data - in real app, this would come from API
const mockHotels = [
  {
    id: 1,
    name: 'Hotel Everest Grand',
    location: 'Thamel, Kathmandu',
    rating: 4.8,
    reviews: 1247,
    price: 8500,
    originalPrice: 12000,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    amenities: ['Wifi', 'Parking', 'Restaurant', 'Spa'],
    isPopular: true,
    discount: 29,
    description: 'Luxury hotel in the heart of Kathmandu with stunning mountain views'
  },
  {
    id: 2,
    name: 'Pokhara Lake Resort',
    location: 'Lakeside, Pokhara',
    rating: 4.6,
    reviews: 892,
    price: 6500,
    originalPrice: 8500,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Gym'],
    isPopular: false,
    discount: 24,
    description: 'Beautiful lakeside resort with panoramic lake and mountain views'
  },
  {
    id: 3,
    name: 'Chitwan Jungle Lodge',
    location: 'Sauraha, Chitwan',
    rating: 4.4,
    reviews: 634,
    price: 4500,
    originalPrice: 6000,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    amenities: ['Wifi', 'Restaurant', 'Safari', 'Nature'],
    isPopular: true,
    discount: 25,
    description: 'Authentic jungle experience with wildlife safari and cultural programs'
  }
];

const HotelSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || '2');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const amenityOptions = ['Wifi', 'Parking', 'Restaurant', 'Pool', 'Gym', 'Spa', 'Safari', 'Nature'];

  useEffect(() => {
    // Filter and sort hotels based on current filters
    let filtered = mockHotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesAmenities = selectedAmenities.length === 0 || 
                              selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
      
      return matchesSearch && matchesPrice && matchesAmenities;
    });

    // Sort hotels
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    setFilteredHotels(filtered);
  }, [searchQuery, priceRange, selectedAmenities, sortBy]);

  const handleSearch = () => {
    // Update URL params and trigger search
    const params = new URLSearchParams();
    if (searchQuery) params.set('location', searchQuery);
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (guests) params.set('guests', guests);
    
    navigate(`/search?${params.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Search Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 flex flex-col lg:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Where do you want to stay?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pl-10 h-12 w-40"
                    placeholder="Check-in"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pl-10 h-12 w-40"
                    placeholder="Check-out"
                  />
                </div>
                
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-10 pr-8 h-12 w-24 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSearch} className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 space-y-6`}>
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                
                {/* Price Range */}
                <div className="space-y-3">
                  <h4 className="font-medium">Price Range (NPR)</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>NPR 0</span>
                      <span>NPR {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <h4 className="font-medium">Amenities</h4>
                  <div className="space-y-2">
                    {amenityOptions.map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredHotels.length} hotels found
                </h2>
                <p className="text-gray-600">
                  {searchQuery && `in ${searchQuery}`}
                  {checkIn && checkOut && ` • ${checkIn} to ${checkOut}`}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex border border-gray-200 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {filteredHotels.map(hotel => (
                <Card key={hotel.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm group cursor-pointer">
                  <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                    {/* Hotel Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-80' : 'h-64'} overflow-hidden`}>
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {hotel.isPopular && (
                          <Badge className="bg-red-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {hotel.discount > 0 && (
                          <Badge className="bg-green-500 text-white">
                            {hotel.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {hotel.name}
                          </h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hotel.location}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{hotel.rating}</span>
                            <span className="text-gray-500 text-sm">({hotel.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {hotel.description}
                      </p>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 4).map(amenity => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity === 'Wifi' && <Wifi className="w-3 h-3 mr-1" />}
                            {amenity === 'Parking' && <Car className="w-3 h-3 mr-1" />}
                            {amenity === 'Restaurant' && <Coffee className="w-3 h-3 mr-1" />}
                            {amenity}
                          </Badge>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{hotel.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      {/* Price and Book Button */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              NPR {hotel.price.toLocaleString()}
                            </span>
                            {hotel.originalPrice > hotel.price && (
                              <span className="text-gray-500 line-through text-sm">
                                NPR {hotel.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">per night</p>
                        </div>
                        
                        <Button 
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 20000]);
                  setSelectedAmenities([]);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;