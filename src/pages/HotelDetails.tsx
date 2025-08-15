import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Wifi, Car, Coffee, Users, Calendar, Clock,
  Phone, Mail, Globe, Award, Shield, Heart, Share2, ChevronLeft,
  ChevronRight, Play, Pause, Volume2, VolumeX, Camera, Map,
  CheckCircle, XCircle, AlertCircle, ArrowRight, Bed, Bath,
  Maximize, Thermometer, Tv, UtensilsCrossed, Dumbbell, Loader2,
  CreditCard, Plus, Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiService } from '../services/api';

// Mock hotel data - in real app, this would come from API
const mockHotelDetails = {
  id: 1,
  name: 'Hotel Everest Grand',
  location: 'Thamel, Kathmandu',
  fullAddress: 'Thamel Marg, Kathmandu 44600, Nepal',
  rating: 4.8,
  reviews: 1247,
  description: 'Experience luxury in the heart of Kathmandu at Hotel Everest Grand. Our premium hotel offers stunning mountain views, world-class amenities, and exceptional service. Located in the vibrant Thamel district, you\'ll be steps away from shops, restaurants, and cultural attractions.',
  images: [
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600'
  ],
  amenities: [
    { name: 'Free WiFi', icon: Wifi, available: true },
    { name: 'Free Parking', icon: Car, available: true },
    { name: 'Restaurant', icon: Coffee, available: true },
    { name: 'Room Service', icon: UtensilsCrossed, available: true },
    { name: 'Fitness Center', icon: Dumbbell, available: true },
    { name: 'Air Conditioning', icon: Thermometer, available: true },
    { name: 'TV', icon: Tv, available: true },
    { name: '24/7 Reception', icon: Clock, available: true }
  ],
  contact: {
    phone: '+977-1-4123456',
    email: 'info@everestgrand.com',
    website: 'www.everestgrand.com'
  },
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: 'Free cancellation up to 24 hours before check-in',
    pets: 'Pets not allowed',
    smoking: 'Non-smoking property'
  },
  rooms: [
    {
      id: 1,
      name: 'Deluxe Room',
      size: '25 sqm',
      maxGuests: 2,
      beds: '1 King Bed',
      price: 8500,
      originalPrice: 12000,
      discount: 29,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      available: true,
      description: 'Spacious deluxe room with mountain views and modern amenities'
    },
    {
      id: 2,
      name: 'Premium Suite',
      size: '45 sqm',
      maxGuests: 4,
      beds: '1 King Bed + 1 Sofa Bed',
      price: 15000,
      originalPrice: 18000,
      discount: 17,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Bathtub'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      available: true,
      description: 'Luxurious suite with separate living area and panoramic city views'
    },
    {
      id: 3,
      name: 'Standard Room',
      size: '20 sqm',
      maxGuests: 2,
      beds: '2 Single Beds',
      price: 6500,
      originalPrice: 8000,
      discount: 19,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV'],
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      available: false,
      description: 'Comfortable standard room perfect for budget-conscious travelers'
    }
  ],
  nearbyAttractions: [
    { name: 'Durbar Square', distance: '0.5 km', type: 'Historical Site' },
    { name: 'Swayambhunath Temple', distance: '2.1 km', type: 'Religious Site' },
    { name: 'Garden of Dreams', distance: '0.8 km', type: 'Garden' },
    { name: 'Kathmandu Durbar Square', distance: '1.2 km', type: 'UNESCO Site' }
  ]
};

const HotelDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showAllImages, setShowAllImages] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);

  // bookingData state removed - booking now handled by BookingPage

  const hotel = mockHotelDetails; // In real app, fetch by ID

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const handleBookRoom = (roomId: number) => {
    console.log('handleBookRoom called with roomId:', roomId);

    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const room = hotel.rooms.find(r => r.id === roomId);
    if (room) {
      // Navigate to BookingPage with booking details
      const bookingParams = new URLSearchParams({
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests.toString(),
        rooms: '1',
        roomType: room.name,
        price: room.price.toString()
      });

      const bookingUrl = `/booking/${hotel.id}?${bookingParams.toString()}`;
      console.log('Navigating to:', bookingUrl);

      navigate(bookingUrl);
    }
  };

  // handleInputChange and validateBookingForm removed - booking now handled by BookingPage

  // handleBookNow removed - booking now handled by BookingPage

  // handleSendOTP removed - booking now handled by BookingPage

  // handleVerifyOTP removed - booking now handled by BookingPage

  // submitBooking removed - booking now handled by BookingPage

  // handleResendOTP removed - booking now handled by BookingPage

  // closeAllPopups removed - booking now handled by BookingPage

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Search
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span>({hotel.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Starting from</p>
                <p className="text-2xl font-bold text-gray-900">NPR 6,500</p>
                <p className="text-sm text-gray-600">per night</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 h-96">
            {/* Main Image */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-lg">
              <img
                src={hotel.images[currentImageIndex]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-2">
              {hotel.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setCurrentImageIndex(index + 1)}
                >
                  <img
                    src={image}
                    alt={`${hotel.name} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {index === 3 && hotel.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{hotel.images.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowAllImages(true)}
            className="mt-4"
          >
            <Camera className="w-4 h-4 mr-2" />
            View all {hotel.images.length} photos
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>About this hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${amenity.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        <amenity.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm ${amenity.available ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rooms */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Available Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className={`border rounded-lg p-6 ${!room.available ? 'opacity-60' : ''}`}>
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Room Image */}
                        <div className="lg:w-64">
                          <img
                            src={room.images[0]}
                            alt={room.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>

                        {/* Room Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                              <p className="text-gray-600 text-sm">{room.description}</p>
                            </div>
                            {room.discount > 0 && (
                              <Badge className="bg-green-500 text-white">
                                {room.discount}% OFF
                              </Badge>
                            )}
                          </div>

                          {/* Room Info */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Maximize className="w-4 h-4" />
                              <span>{room.size}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>Up to {room.maxGuests} guests</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bed className="w-4 h-4" />
                              <span>{room.beds}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {room.available ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              <span>{room.available ? 'Available' : 'Sold Out'}</span>
                            </div>
                          </div>

                          {/* Room Amenities */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>

                          {/* Price and Book */}
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                  NPR {room.price.toLocaleString()}
                                </span>
                                {room.originalPrice > room.price && (
                                  <span className="text-gray-500 line-through text-sm">
                                    NPR {room.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm">per night</p>
                            </div>

                            <Button
                              onClick={() => handleBookRoom(room.id)}
                              disabled={!room.available}
                              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                              {room.available ? 'Book Now' : 'Sold Out'}
                              {room.available && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Hotel Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Check-in / Check-out</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Check-in: {hotel.policies.checkIn}</p>
                      <p>Check-out: {hotel.policies.checkOut}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cancellation</h4>
                    <p className="text-sm text-gray-600">{hotel.policies.cancellation}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pets</h4>
                    <p className="text-sm text-gray-600">{hotel.policies.pets}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Smoking</h4>
                    <p className="text-sm text-gray-600">{hotel.policies.smoking}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Attractions */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Nearby Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hotel.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h4 className="font-medium text-gray-900">{attraction.name}</h4>
                        <p className="text-sm text-gray-600">{attraction.type}</p>
                      </div>
                      <Badge variant="outline">{attraction.distance}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold">Contact Hotel</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{hotel.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{hotel.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span>{hotel.contact.website}</span>
                    </div>
                  </div>
                </div>

                {/* Map Button */}
                <Button variant="outline" className="w-full">
                  <Map className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking now redirects to dedicated BookingPage */}
    </div>
  );
};

export default HotelDetails;