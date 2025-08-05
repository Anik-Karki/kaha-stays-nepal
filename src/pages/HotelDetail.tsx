
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, MapPin, Phone, MessageCircle, Wifi, Car, Coffee, 
  Utensils, Users, ArrowLeft, Calendar, CreditCard, CheckCircle 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { findBestRoomMatch, getRoomTypeColor, formatRoomTypeName } from '../utils/roomMatcher';

const HotelDetail = () => {
  const { id } = useParams();
  const [guestCount, setGuestCount] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoomMatch, setSelectedRoomMatch] = useState<any>(null);

  // Mock hotel data
  const hotel = {
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
  };

  const roomMatches = findBestRoomMatch(guestCount, hotel.roomTypes);

  const handleBookRoom = (match: any) => {
    setSelectedRoomMatch(match);
    setShowBookingModal(true);
  };

  const renderRoomMatches = () => {
    if (roomMatches.length === 0) {
      return (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <div className="text-orange-600 mb-2">⚠️</div>
          <h3 className="font-medium text-orange-800 mb-2">No available rooms for {guestCount} guests</h3>
          <p className="text-sm text-orange-600">Try reducing the number of guests or check different dates.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {roomMatches.slice(0, 3).map((match, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">
                    {match.matchType === 'single' ? 'Perfect Match' : 
                     match.matchType === 'double' ? 'Twin Rooms' : 'Room Combination'}
                  </h3>
                  {index === 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Accommodates {guestCount} guests • {match.totalCapacity - guestCount} extra capacity
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">₹{match.totalPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-500">total per night</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {match.rooms.map((room: any, roomIndex: number) => (
                <div key={roomIndex} className={`bg-gradient-to-r ${getRoomTypeColor(room.type)} bg-opacity-10 rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{formatRoomTypeName(room.type)}</h4>
                    {room.count > 1 && (
                      <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-sm font-medium">
                        × {room.count}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to {room.capacity} guests</span>
                    {room.count > 1 && <span className="ml-1">each</span>}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{room.price.toLocaleString()} × {room.count} = ₹{(room.price * room.count).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleBookRoom(match)}
            >
              Book This Configuration
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <button className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to search results
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
                    {hotel.verified && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        KahaTAG Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">
                      {hotel.rating} ({hotel.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Hotel
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {hotel.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`${index === 0 ? 'col-span-3 row-span-2 h-80' : 'h-[150px]'} bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
                  >
                    <div className={`${index === 0 ? 'text-8xl' : 'text-4xl'} opacity-80`}>
                      {image}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Room Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Guests:</span>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              {renderRoomMatches()}
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{amenity.name}</span>
                      {amenity.available && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
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

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Quick Booking</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <Input type="number" min="1" max="10" defaultValue="2" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Check Availability
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Starting from</h4>
                <div className="text-3xl font-bold text-blue-600">₹2,000</div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
          </DialogHeader>
          {selectedRoomMatch && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Hotel:</span>
                    <span>{hotel.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{guestCount} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total per night:</span>
                    <span className="font-medium">₹{selectedRoomMatch.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input placeholder="Enter your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm & Pay ₹{selectedRoomMatch.totalPrice.toLocaleString()}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default HotelDetail;
