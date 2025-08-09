import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Phone, MessageCircle, Wifi, Car, Coffee, 
  Utensils, Users, ArrowLeft, Calendar, CreditCard, CheckCircle, Hotel
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { findBestRoomMatch, getRoomTypeColor, formatRoomTypeName } from '../utils/roomMatcher';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoomMatch, setSelectedRoomMatch] = useState<any>(null);

  // Auto-calculate optimal rooms when guests change
  const handleGuestChange = (newGuestCount: number) => {
    setGuestCount(newGuestCount);
    const optimalRooms = Math.ceil(newGuestCount / 2); // 2 guests per room default
    setRoomCount(optimalRooms);
  };

  const handleBackClick = () => {
    navigate('/hotels');
  };

  // Hotel data based on ID from URL
  const getHotelById = (hotelId: string) => {
    const hotels = {
      '1': {
        id: 1,
        name: 'Hotel Everest View',
        location: 'Thamel, Kathmandu',
        address: 'Tridevi Marg, Thamel, Kathmandu 44600, Nepal',
        rating: 4.8,
        reviewCount: 234,
        verified: true,
        images: ['🏛️', '🏔️', '🏨', '🛏️', '🍽️'],
        description: 'Experience the perfect blend of traditional Nepali hospitality and modern comfort at Hotel Everest View. Located in the heart of Thamel, our hotel offers stunning mountain views and easy access to Kathmandu\'s cultural attractions.',
        amenities: [
          { icon: Wifi, name: 'Free WiFi', available: true },
          { icon: Car, name: 'Parking', available: true },
          { icon: Coffee, name: 'Breakfast', available: true },
          { icon: Utensils, name: 'Restaurant', available: true }
        ],
        roomTypes: [
          {
            type: 'economy',
            name: 'Economy Room',
            capacity: 2,
            price: 2000,
            features: ['Free WiFi', 'AC', 'Private Bathroom'],
            available: 5
          },
          {
            type: 'standarddelux',
            name: 'Standard Deluxe',
            capacity: 2,
            price: 3500,
            features: ['Free WiFi', 'AC', 'Mountain View', 'Mini Bar'],
            available: 3
          },
          {
            type: 'suite',
            name: 'Suite Room',
            capacity: 3,
            price: 5500,
            features: ['Free WiFi', 'AC', 'Living Area', 'Balcony', 'City View'],
            available: 2
          },
          {
            type: 'family',
            name: 'Family Room',
            capacity: 5,
            price: 7500,
            features: ['Free WiFi', 'AC', '2 Bedrooms', 'Kitchen', 'Mountain View'],
            available: 1
          }
        ],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          pets: 'Pets not allowed',
          smoking: 'Non-smoking property'
        }
      },
      '2': {
        id: 2,
        name: 'Lake Palace Hotel',
        location: 'Lakeside, Pokhara',
        address: 'Lakeside Road, Pokhara 33700, Nepal',
        rating: 4.6,
        reviewCount: 189,
        verified: true,
        images: ['🏨', '🌊', '🏔️', '🛏️', '🍽️'],
        description: 'Stunning lakeside hotel with panoramic views of Phewa Lake and the Annapurna range. Perfect for a peaceful retreat in nature.',
        amenities: [
          { icon: Wifi, name: 'Free WiFi', available: true },
          { icon: Coffee, name: 'Breakfast', available: true },
          { icon: Utensils, name: 'Restaurant', available: true }
        ],
        roomTypes: [
          {
            type: 'suite',
            name: 'Lake View Suite',
            capacity: 3,
            price: 7200,
            features: ['Free WiFi', 'AC', 'Lake View', 'Balcony'],
            available: 3
          },
          {
            type: 'standarddelux',
            name: 'Mountain View Room',
            capacity: 2,
            price: 4800,
            features: ['Free WiFi', 'AC', 'Mountain View'],
            available: 4
          }
        ],
        policies: {
          checkIn: '2:00 PM',
          checkOut: '12:00 PM',
          cancellation: 'Free cancellation up to 24 hours before check-in',
          pets: 'Pets not allowed',
          smoking: 'Non-smoking property'
        }
      }
    };
    
    return hotels[hotelId as keyof typeof hotels] || hotels['1'];
  };

  const hotel = getHotelById(id || '1');

  const roomMatches = findBestRoomMatch(guestCount, hotel.roomTypes, roomCount);

  const handleBookRoom = (match: any) => {
    setSelectedRoomMatch(match);
    setShowBookingModal(true);
  };

  const renderEnhancedRoomMatches = () => {
    if (roomMatches.length === 0) {
      return (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 text-center shadow-lg">
          <div className="text-orange-600 mb-4 text-4xl">⚠️</div>
          <h3 className="font-bold text-orange-800 mb-3 text-xl">No available room combinations for {guestCount} guests in {roomCount} room{roomCount > 1 ? 's' : ''}</h3>
          <p className="text-orange-600 font-medium">Try adjusting the number of guests or rooms, or explore different dates.</p>
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">💡 <strong>Suggestions:</strong></p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Try {Math.ceil(guestCount / 2)} room{Math.ceil(guestCount / 2) > 1 ? 's' : ''} for {guestCount} guests</li>
              <li>• Consider reducing guest count to {Math.floor(guestCount * 0.8)}</li>
              <li>• Check availability for different dates</li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {roomMatches.map((match, index) => {
          const isOptimal = match.roomCount === roomCount;
          const isRecommended = match.roomCount === Math.ceil(guestCount / 2);
          
          return (
            <div key={index} className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 ${
              isOptimal ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-white/30'
            }`}>
              {/* Match Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Hotel className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-gray-900">
                        {match.roomCount} Room{match.roomCount > 1 ? 's' : ''} for {guestCount} Guests
                      </span>
                    </div>
                    {isOptimal && (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Your Selection
                      </span>
                    )}
                    {isRecommended && !isOptimal && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ₹{match.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">total per night</div>
                  </div>
                </div>
                
                {/* Guest Distribution */}
                <div className="mt-3 flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Guest Distribution:</span>
                  {match.guestDistribution?.map((guests, idx) => (
                    <div key={idx} className="flex items-center space-x-1 bg-white rounded-lg px-3 py-1 shadow-sm">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">Room {idx + 1}: {guests} guest{guests > 1 ? 's' : ''}</span>
                    </div>
                  )) || (
                    <div className="flex items-center space-x-1 bg-white rounded-lg px-3 py-1 shadow-sm">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">1 Room: {guestCount} guests</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="grid gap-4">
                  {match.rooms.map((room, roomIdx) => (
                    <div key={roomIdx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={room.type === 'economy' ? 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100&h=80&fit=crop' : 
                               room.type === 'standarddelux' ? 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=100&h=80&fit=crop' : 
                               room.type === 'suite' ? 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=80&fit=crop' : 
                               'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=80&fit=crop'}
                          alt={room.name}
                          className="w-16 h-16 rounded-lg object-cover shadow-sm"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{room.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Capacity: {room.capacity}</span>
                            <span>•</span>
                            <span>Guests: {match.guestDistribution?.[roomIdx] || Math.min(guestCount, room.capacity)}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                              {room.type}
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {room.available} Available
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">₹{room.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per night</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl mt-6 ${
                    isOptimal 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                  }`}
                  onClick={() => handleBookRoom(match)}
                  disabled={match.rooms.some(room => room.available === 0)}
                >
                  {match.rooms.some(room => room.available === 0) ? 'Not Available' : 
                   isOptimal ? `Book ${match.roomCount} Room${match.roomCount > 1 ? 's' : ''} - ₹${match.totalPrice.toLocaleString()}` :
                   `Select This Option - ₹${match.totalPrice.toLocaleString()}`}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRoomMatches = () => {
    if (hotel.roomTypes.length === 0) {
      return (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 text-center shadow-lg">
          <div className="text-orange-600 mb-4 text-4xl">⚠️</div>
          <h3 className="font-bold text-orange-800 mb-3 text-xl">No available rooms for {guestCount} guests</h3>
          <p className="text-orange-600 font-medium">Try reducing the number of guests or explore different dates.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {hotel.roomTypes.map((room, index) => (
          <div key={index} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row">
              {/* Room Image */}
              <div className="lg:w-80 h-64 lg:h-72 relative overflow-hidden">
                <img 
                  src={room.type === 'economy' ? 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop' : 
                       room.type === 'standarddelux' ? 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop' : 
                       room.type === 'suite' ? 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop' : 
                       'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {room.available} Available
                </div>
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}
              </div>

              {/* Room Details */}
              <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                      {room.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="w-5 h-5 mr-2 text-emerald-500" />
                      <span className="font-medium">Up to {room.capacity} guests</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">25 sqm</span>
                    </div>
                    
                    {/* Room for guests indicator */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">1 room for {room.capacity} guests</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                          <span className="text-sm text-gray-600">Occupancy</span>
                          <span className="ml-2 text-sm font-medium">{Math.min(guestCount, room.capacity)} of {room.capacity} guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Bed Configuration */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-600">🛏️ 1 Queen Bed</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-600">👥 Max {room.capacity} guests per room</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right ml-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                      <div className="text-sm text-gray-500 line-through mb-1">NPR {(room.price * 1.2).toLocaleString()}</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        NPR {room.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">per night</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-1">Save 17%</div>
                    </div>
                  </div>
                </div>

                {/* Room Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Mountain View</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Non-smoking</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Free Cancellation</span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">Room Service</span>
                  </div>

                  {/* Amenities Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-emerald-500">✓</span>
                      <span>Free WiFi</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-emerald-500">✓</span>
                      <span>Air Conditioning</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-emerald-500">✓</span>
                      <span>Private Bathroom</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-emerald-500">✓</span>
                      <span>TV</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
                  onClick={() => handleBookRoom({ rooms: [room], totalPrice: room.price, totalCapacity: room.capacity })}
                  disabled={room.available === 0}
                >
                  {room.available === 0 ? 'Sold Out' : 'Select Room'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <button 
          onClick={handleBackClick}
          className="flex items-center text-emerald-600 hover:text-emerald-700 mb-8 font-medium transition-all duration-300 hover:translate-x-1"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to hotels
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{hotel.name}</h1>
                    {hotel.verified && (
                      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Premium Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                    <span className="text-base font-medium">{hotel.address}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-6 h-6 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 ml-4 text-lg font-medium">
                      {hotel.rating} ({hotel.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Hotel
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-5 gap-3 mb-8">
                {hotel.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`${index === 0 ? 'col-span-3 row-span-2 h-80' : 'h-[150px]'} bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className={`${index === 0 ? 'text-8xl' : 'text-4xl'} opacity-90`}>
                      {image}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed text-lg font-light">{hotel.description}</p>
            </div>

            {/* Room Selection */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Available Rooms</h2>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Guests:</span>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={guestCount}
                      onChange={(e) => handleGuestChange(parseInt(e.target.value) || 1)}
                      className="w-20 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hotel className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Rooms:</span>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={roomCount}
                      onChange={(e) => setRoomCount(parseInt(e.target.value) || 1)}
                      className="w-20 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Suggested: {Math.ceil(guestCount / 2)} room{Math.ceil(guestCount / 2) > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {renderEnhancedRoomMatches()}
            </div>

            {/* Amenities */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">Premium Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-gray-900 text-lg">{amenity.name}</span>
                      {amenity.available && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">Hotel Policies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Check-in / Check-out</h3>
                  <p className="text-gray-600 text-sm mb-1">Check-in: {hotel.policies.checkIn}</p>
                  <p className="text-gray-600 text-sm">Check-out: {hotel.policies.checkOut}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Cancellation</h3>
                  <p className="text-gray-600 text-sm">{hotel.policies.cancellation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sticky top-24 border border-white/20">
              <h3 className="font-bold text-xl mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Premium Booking</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Check-in</label>
                    <Input 
                      type="date" 
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 text-sm" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Check-out</label>
                    <Input 
                      type="date" 
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 text-sm"
                      defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Guests</label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="20" 
                      value={guestCount}
                      onChange={(e) => handleGuestChange(parseInt(e.target.value) || 1)}
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Rooms</label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={roomCount}
                      onChange={(e) => setRoomCount(parseInt(e.target.value) || 1)}
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3" 
                    />
                  </div>
                </div>

                {/* Room Suggestion */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">
                      Suggested: {Math.ceil(guestCount / 2)} room{Math.ceil(guestCount / 2) > 1 ? 's' : ''} for {guestCount} guests
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-4 text-base font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl"
                  onClick={() => setShowBookingModal(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
              </div>

              {/* Pricing Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">Estimated Total</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{roomCount} room{roomCount > 1 ? 's' : ''} × 1 night</span>
                      <span className="font-medium">₹{(2500 * roomCount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxes & fees</span>
                      <span className="font-medium">₹{Math.round(2500 * roomCount * 0.12).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            ₹{Math.round(2500 * roomCount * 1.12).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">for 1 night</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Best price guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Complete Your Premium Booking
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                  Booking Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=80&h=60&fit=crop"
                      alt={hotel.name}
                      className="w-16 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="text-gray-600">Check-in</div>
                      <div className="font-semibold">Today</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="text-gray-600">Check-out</div>
                      <div className="font-semibold">Tomorrow</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="text-gray-600">Guests</div>
                      <div className="font-semibold">{guestCount} people</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-emerald-200">
                      <div className="text-gray-600">Rooms</div>
                      <div className="font-semibold">{roomCount} room{roomCount > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <h5 className="font-semibold text-gray-900 mb-3">Price Breakdown</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{roomCount} room{roomCount > 1 ? 's' : ''} × 1 night</span>
                        <span>₹{(2500 * roomCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & service fees</span>
                        <span>₹{Math.round(2500 * roomCount * 0.12).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total Amount</span>
                          <span className="text-emerald-600">₹{Math.round(2500 * roomCount * 1.12).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Guest Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
                      <Input 
                        placeholder="Enter first name" 
                        className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
                      <Input 
                        placeholder="Enter last name" 
                        className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
                    <Input 
                      type="tel" 
                      placeholder="+977 98XXXXXXXX" 
                      className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Special Requests</label>
                    <textarea 
                      placeholder="Any special requests or preferences..."
                      className="w-full px-4 py-3 border-2 border-gray-200 focus:border-emerald-500 rounded-xl resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-3">Payment Method</h5>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="payment" value="card" defaultChecked className="text-emerald-600" />
                        <span className="text-sm font-medium">Credit/Debit Card</span>
                        <div className="flex space-x-1 ml-auto">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="payment" value="paypal" className="text-emerald-600" />
                        <span className="text-sm font-medium">PayPal</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="payment" value="bank" className="text-emerald-600" />
                        <span className="text-sm font-medium">Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 text-emerald-600" required />
                      <span className="text-sm text-blue-800">
                        I agree to the <span className="font-semibold underline">Terms & Conditions</span> and <span className="font-semibold underline">Privacy Policy</span>. 
                        I understand the cancellation policy and booking terms.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-4 text-base font-semibold border-2 border-gray-300 hover:border-gray-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-4 text-base font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Confirm Booking ₹{Math.round(2500 * roomCount * 1.12).toLocaleString()}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    🔒 Your booking is secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default HotelDetail;
