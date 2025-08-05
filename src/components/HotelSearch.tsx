
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface HotelSearchProps {
  onSearch?: (params: SearchParams) => void;
  showDetailed?: boolean;
}

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

const HotelSearch = ({ onSearch, showDetailed = false }: HotelSearchProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchParams);
    } else {
      const queryParams = new URLSearchParams({
        location: searchParams.location,
        checkin: searchParams.checkIn,
        checkout: searchParams.checkOut,
        guests: searchParams.guests.toString(),
        rooms: searchParams.rooms.toString()
      });
      navigate(`/hotels?${queryParams.toString()}`);
    }
  };

  const handleInputChange = (field: keyof SearchParams, value: string | number) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  if (showDetailed) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Where are you going?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="City, hotel name, or landmark"
                value={searchParams.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Guests & Rooms</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={searchParams.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value) || 1)}
                  className="pl-7 text-xs"
                  placeholder="Guests"
                />
              </div>
              <Input
                type="number"
                min="1"
                max="10"
                value={searchParams.rooms}
                onChange={(e) => handleInputChange('rooms', parseInt(e.target.value) || 1)}
                className="text-xs"
                placeholder="Rooms"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-12 py-3 text-lg"
            disabled={!searchParams.location.trim()}
          >
            <Search className="w-5 h-5 mr-2" />
            Search Hotels
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center bg-gray-50 rounded-lg px-3 py-2 cursor-pointer border border-gray-200 hover:border-blue-300 transition-colors"
        onClick={() => {/* Toggle dropdown */}}
      >
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <span className="text-gray-600 text-sm">
          {searchParams.location || 'Search hotels...'}
        </span>
      </div>
    </div>
  );
};

export default HotelSearch;
