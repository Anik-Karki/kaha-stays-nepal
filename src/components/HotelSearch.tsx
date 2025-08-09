
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Hotel } from 'lucide-react';
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

// Room allocation logic
const calculateOptimalRooms = (guests: number): number => {
  if (guests <= 0) return 1;
  if (guests <= 2) return 1;
  if (guests <= 4) return 2;
  if (guests <= 6) return 3;
  return Math.ceil(guests / 2); // 2 guests per room as default
};

const HotelSearch = ({ onSearch, showDetailed = false }: HotelSearchProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  // Auto-calculate rooms when guests change
  const handleGuestChange = (newGuestCount: number) => {
    const optimalRooms = calculateOptimalRooms(newGuestCount);
    setSearchParams(prev => ({ 
      ...prev, 
      guests: newGuestCount,
      rooms: optimalRooms
    }));
  };

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
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto border border-white/20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <Input
                placeholder="City, hotel name, or landmark"
                value={searchParams.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <Input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <Input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="pl-12 py-3 text-base border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800">Guests & Rooms</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={searchParams.guests}
                  onChange={(e) => handleGuestChange(parseInt(e.target.value) || 1)}
                  className="pl-10 py-3 text-sm border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
                  placeholder="Guests"
                />
              </div>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={searchParams.rooms}
                  onChange={(e) => handleInputChange('rooms', parseInt(e.target.value) || 1)}
                  className="py-3 text-sm border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-sm"
                  placeholder="Rooms"
                />
                <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                  Suggested: {calculateOptimalRooms(searchParams.guests)} room{calculateOptimalRooms(searchParams.guests) > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleSearch}
            className="px-16 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
            disabled={!searchParams.location.trim()}
          >
            <Search className="w-6 h-6 mr-3" />
            Search Hotels
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center bg-gray-50 rounded-lg px-3 py-2 cursor-pointer border border-gray-200 hover:border-emerald-300 transition-colors"
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
