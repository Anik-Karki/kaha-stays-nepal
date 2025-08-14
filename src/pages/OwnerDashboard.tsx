import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hotel, Users, Calendar, DollarSign, Plus, Edit, Trash2, LogOut, BarChart3,
  Star, MapPin, Wifi, Car, Coffee, CheckCircle, Clock, Eye,
  Settings, Camera, Phone, Mail, Search, Check, X, Save, Globe,
  Bell, Menu, Home, TrendingUp, Upload, Image as ImageIcon, Shield,
  Bath, AirVent, Tv, Dumbbell, Waves, Crown, MessageSquare, Copy, ExternalLink,
  Activity, Zap, Target, Award, Sparkles, ChevronRight, Filter, MoreHorizontal,
  PieChart, LineChart, ArrowUp, ArrowDown, Percent, CreditCard, Wallet,
  UserCheck, MapPin as Location, Calendar as CalendarIcon, Clock as TimeIcon,
  Smartphone, Laptop, Globe2, Facebook, Instagram, Twitter, Youtube,
  Briefcase, GraduationCap, Heart, Gift, Flame, ThumbsUp, MessageCircle,
  Share2, Bookmark, Download, FileText, Printer, RefreshCw, AlertTriangle,
  Info, HelpCircle, ChevronDown, ChevronUp, ArrowRight, ArrowLeft,
  Maximize2, Minimize2, RotateCcw, Palette, Layout, Grid, List
} from 'lucide-react';

// Types
interface Room {
  id: number;
  name: string;
  type: 'standard' | 'deluxe' | 'suite' | 'premium';
  price: number;
  capacity: number;
  quantity: number;
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  description: string;
  size: string;
  bedType: string;
  published: boolean;
  bookings: number;
  features: string[];
  photos: string[];
}

interface Booking {
  id: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  roomId: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  amount: number;
  guests: number;
  nights: number;
  createdAt: string;
  specialRequests: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  source: string;
}

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalStays: number;
  totalSpent: number;
  lastStay: string;
  vip: boolean;
  nationality: string;
  tags: string[];
}

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hotel Information State
  const [hotelInfo, setHotelInfo] = useState({
    id: 1,
    name: 'Hotel Everest View',
    kahaTag: 'everest-view-thamel',
    description: 'Experience luxury with breathtaking views of the Himalayas in the heart of Thamel. Our premium hotel offers world-class amenities and exceptional service for both leisure and business travelers.',
    shortDescription: 'Luxury hotel with Himalayan views in Thamel',
    address: 'Thamel, Kathmandu, Nepal',
    city: 'Kathmandu',
    state: 'Bagmati Province',
    country: 'Nepal',
    zipCode: '44600',
    coordinates: { lat: 27.7172, lng: 85.3240 },
    phone: '+977-1-4567890',
    email: 'info@hoteleverestview.com',
    website: 'www.hoteleverestview.com',
    socialMedia: {
      facebook: 'https://facebook.com/hoteleverestview',
      instagram: 'https://instagram.com/hoteleverestview',
      twitter: 'https://twitter.com/hoteleverestview'
    },
    rating: 4.8,
    totalReviews: 1247,
    priceRange: { min: 3500, max: 12000 },
    checkInTime: '14:00',
    checkOutTime: '12:00',
    languages: ['English', 'Nepali', 'Hindi', 'Chinese'],
    currency: 'NPR',
    taxRate: 13, // VAT percentage
    serviceCharge: 10, // Service charge percentage
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in. After that, the first night will be charged.',
    childPolicy: 'Children under 12 stay free when using existing bedding. Extra bed charges apply for children above 12.',
    petPolicy: 'Pets are not allowed',
    smokingPolicy: 'Non-smoking property. Designated smoking areas available.',
    photos: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop'
    ],
    amenities: ['wifi', 'parking', 'restaurant', 'breakfast', 'spa', 'gym', 'pool', 'concierge', 'room_service', 'laundry', 'airport_shuttle', 'business_center'],
    nearbyAttractions: [
      { name: 'Durbar Square', distance: '1.2 km', type: 'Historical Site' },
      { name: 'Garden of Dreams', distance: '0.8 km', type: 'Garden' },
      { name: 'Swayambhunath Temple', distance: '2.5 km', type: 'Temple' },
      { name: 'Tribhuvan International Airport', distance: '6.8 km', type: 'Airport' }
    ],
    established: '2018',
    totalFloors: 6,
    totalRooms: 45,
    starRating: 4,
    awards: ['TripAdvisor Certificate of Excellence 2023', 'Best Heritage Hotel Nepal 2022'],
    sustainability: {
      solarPower: true,
      rainwaterHarvesting: true,
      wasteRecycling: true,
      organicGarden: true
    }
  });

  // Rooms State
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: 'Deluxe Suite',
      type: 'suite',
      price: 8500,
      capacity: 4,
      quantity: 2,
      status: 'available',
      amenities: ['wifi', 'ac', 'minibar', 'balcony', 'room_service'],
      description: 'Luxurious suite with panoramic mountain views and premium amenities',
      size: '45 sqm',
      bedType: 'King Size',
      published: true,
      bookings: 15,
      features: ['Balcony', 'Mountain View', 'King Bed', 'Sitting Area'],
      photos: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      ],
    },
    {
      id: 2,
      name: 'Everest Deluxe',
      type: 'deluxe',
      price: 6500,
      capacity: 2,
      quantity: 5,
      status: 'occupied',
      amenities: ['wifi', 'ac', 'tv', 'room_service'],
      description: 'Premium room with Everest views and modern amenities',
      size: '35 sqm',
      bedType: 'Queen Size',
      published: true,
      bookings: 22,
      features: ['Mountain View', 'Queen Bed', 'Work Desk'],
      photos: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      ],
    },
  ]);

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      guestName: 'John Doe',
      guestEmail: 'john@email.com',
      guestPhone: '+977-9841234567',
      roomName: 'Deluxe Suite',
      roomId: '1',
      roomNumber: '301',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'pending',
      amount: 25500,
      guests: 2,
      nights: 3,
      createdAt: '2024-01-10T10:00:00Z',
      specialRequests: 'Late check-in requested',
      paymentStatus: 'pending',
      source: 'website',
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      guestEmail: 'jane@email.com',
      guestPhone: '+977-9851234567',
      roomName: 'Everest Deluxe',
      roomId: '2',
      roomNumber: '201',
      checkIn: '2024-01-16',
      checkOut: '2024-01-17',
      status: 'confirmed',
      amount: 6500,
      guests: 1,
      nights: 1,
      createdAt: '2024-01-12T14:30:00Z',
      specialRequests: 'Ground floor preferred',
      paymentStatus: 'paid',
      source: 'mobile',
    },
  ]);

  // Guests State
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@email.com',
      phone: '+977-9841234567',
      totalStays: 3,
      totalSpent: 45000,
      lastStay: '2024-01-15',
      vip: true,
      nationality: 'American',
      tags: ['VIP', 'Frequent Guest'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@email.com',
      phone: '+977-9851234567',
      totalStays: 1,
      totalSpent: 6500,
      lastStay: '2024-01-16',
      vip: false,
      nationality: 'British',
      tags: ['New Guest'],
    },
  ]);

  // Modal States
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Room form state
  const [roomFormData, setRoomFormData] = useState({
    name: '',
    type: 'standard' as const,
    capacity: 2,
    quantity: 1,
    price: 0,
    description: '',
    amenities: [] as string[],
    features: [] as string[],
    status: 'available' as const,
    published: true,
    size: '',
    bedType: '',
    photos: [] as string[],
  });

  // Available amenities with icons
  const availableAmenities = [
    { id: 'wifi', name: 'Free WiFi', icon: Wifi },
    { id: 'ac', name: 'Air Conditioning', icon: AirVent },
    { id: 'tv', name: 'Television', icon: Tv },
    { id: 'parking', name: 'Free Parking', icon: Car },
    { id: 'restaurant', name: 'Restaurant', icon: Coffee },
    { id: 'breakfast', name: 'Complimentary Breakfast', icon: Coffee },
    { id: 'gym', name: 'Fitness Center', icon: Dumbbell },
    { id: 'pool', name: 'Swimming Pool', icon: Waves },
    { id: 'spa', name: 'Spa & Wellness', icon: Shield },
    { id: 'room_service', name: '24/7 Room Service', icon: Bell },
    { id: 'balcony', name: 'Balcony/Terrace', icon: Eye },
    { id: 'minibar', name: 'Mini Bar', icon: Coffee },
    { id: 'bathtub', name: 'Bathtub', icon: Bath },
    { id: 'concierge', name: 'Concierge Service', icon: Users },
    { id: 'laundry', name: 'Laundry Service', icon: Settings },
    { id: 'airport_shuttle', name: 'Airport Shuttle', icon: Car },
    { id: 'business_center', name: 'Business Center', icon: Settings },
    { id: 'conference_room', name: 'Conference Room', icon: Users },
    { id: 'elevator', name: 'Elevator', icon: TrendingUp },
    { id: 'safe', name: 'Safety Deposit Box', icon: Shield },
    { id: 'currency_exchange', name: 'Currency Exchange', icon: DollarSign },
    { id: 'tour_desk', name: 'Tour Desk', icon: MapPin },
    { id: 'garden', name: 'Garden', icon: Eye },
    { id: 'terrace', name: 'Rooftop Terrace', icon: Home },
    { id: 'library', name: 'Library', icon: Settings },
  ];

  // Check authentication
  useEffect(() => {
    const authStore = localStorage.getItem('auth-storage');
    const legacyAuth = localStorage.getItem('hotelOwnerAuth');

    if (authStore) {
      try {
        const parsedAuth = JSON.parse(authStore);
        if (parsedAuth.state?.isLoggedIn && parsedAuth.state?.user) {
          setUser(parsedAuth.state.user);
          return;
        }
      } catch (error) {
        console.error('Error parsing auth store:', error);
      }
    }

    if (legacyAuth) {
      try {
        setUser(JSON.parse(legacyAuth).user);
        return;
      } catch (error) {
        console.error('Error parsing legacy auth:', error);
      }
    }

    navigate('/hotel-owner-login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hotelOwnerAuth');
    localStorage.removeItem('auth-storage');
    navigate('/hotel-owner-login');
  };

  // Calculate stats
  const totalRooms = rooms.reduce((sum, room) => sum + room.quantity, 0);
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').reduce((sum, room) => sum + room.quantity, 0);
  const availableRooms = rooms.filter(room => room.status === 'available').reduce((sum, room) => sum + room.quantity, 0);
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  // Filter functions
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper functions
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'confirmed': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'completed': 'bg-blue-100 text-blue-800 border-blue-200',
      'available': 'bg-green-100 text-green-800 border-green-200',
      'occupied': 'bg-red-100 text-red-800 border-red-200',
      'maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAmenityIcon = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity ? amenity.icon : Shield;
  };

  const getAmenityName = (amenityId: string) => {
    const amenity = availableAmenities.find(a => a.id === amenityId);
    return amenity ? amenity.name : amenityId;
  };

  // Room CRUD Functions
  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const roomData = {
      ...roomFormData,
      bookings: 0,
      photos: [] as string[]
    };

    try {
      if (editingRoom) {
        setRooms(rooms.map(room =>
          room.id === editingRoom.id ? { ...room, ...roomData } : room
        ));
        setEditingRoom(null);
      } else {
        const newRoom: Room = {
          ...roomData,
          id: Math.max(...rooms.map(r => r.id), 0) + 1,
        };
        setRooms([...rooms, newRoom]);
      }
      resetRoomForm();
    } catch (error) {
      console.error('Error saving room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetRoomForm = () => {
    setRoomFormData({
      name: '',
      type: 'standard',
      capacity: 2,
      quantity: 1,
      price: 0,
      description: '',
      amenities: [],
      features: [],
      status: 'available',
      published: true,
      size: '',
      bedType: '',
      photos: [],
    });
    setShowRoomModal(false);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity,
      quantity: room.quantity,
      price: room.price,
      description: room.description,
      amenities: room.amenities,
      features: room.features || [],
      status: room.status,
      published: room.published,
      size: room.size,
      bedType: room.bedType,
      photos: room.photos || [],
    });
    setShowRoomModal(true);
  };

  const handleDeleteRoom = (roomId: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== roomId));
    }
  };

  // Photo management functions
  const handlePhotoUpload = (file: File, type: 'hotel' | 'room', roomId?: number) => {
    const photoUrl = URL.createObjectURL(file);

    if (type === 'hotel') {
      setHotelInfo(prev => ({
        ...prev,
        photos: [...prev.photos, photoUrl]
      }));
    } else if (type === 'room' && roomId) {
      setRooms(rooms.map(room =>
        room.id === roomId
          ? { ...room, photos: [...room.photos, photoUrl] }
          : room
      ));
    }
  };

  const handleDeletePhoto = (photoUrl: string, type: 'hotel' | 'room', roomId?: number) => {
    if (type === 'hotel') {
      setHotelInfo(prev => ({
        ...prev,
        photos: prev.photos.filter(photo => photo !== photoUrl)
      }));
    } else if (type === 'room' && roomId) {
      setRooms(rooms.map(room =>
        room.id === roomId
          ? { ...room, photos: room.photos.filter(photo => photo !== photoUrl) }
          : room
      ));
    }
  };

  // Room form photo management
  const handleRoomFormPhotoUpload = (file: File) => {
    const photoUrl = URL.createObjectURL(file);
    setRoomFormData(prev => ({
      ...prev,
      photos: [...prev.photos, photoUrl]
    }));
  };

  const handleRoomFormPhotoDelete = (photoUrl: string) => {
    setRoomFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo !== photoUrl)
    }));
  };



  // Booking management functions
  const handleBookingStatusChange = (bookingId: number, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const handleDeleteBooking = (bookingId: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    }
  };

  // Hotel info update
  const handleUpdateHotel = (updatedInfo: any) => {
    setHotelInfo({ ...hotelInfo, ...updatedInfo });
    setShowHotelModal(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-3 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 lg:hidden transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <div className="flex-shrink-0 flex items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur opacity-75"></div>
                    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      KAHA Owner
                    </span>
                    <p className="text-xs text-gray-500 font-medium">Premium Dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 w-80 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 backdrop-blur-sm"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <button className="relative p-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    3
                  </span>
                </button>
                
                <button className="p-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'Hotel Owner'}</p>
                  <p className="text-xs text-gray-500">{hotelInfo.name}</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {(user?.name || 'H').charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl border-r border-white/20 transition-transform duration-300 ease-in-out lg:transition-none shadow-xl`}>
          <div className="flex flex-col h-full pt-8 pb-4 overflow-y-auto">
            {/* Hotel Quick Info */}
            <div className="px-6 mb-8">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Hotel className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{hotelInfo.name}</h3>
                    <p className="text-xs text-white/80">@{hotelInfo.kahaTag}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-white/80">Occupancy</p>
                    <p className="font-bold text-lg">{occupancyRate}%</p>
                  </div>
                  <div>
                    <p className="text-white/80">Revenue</p>
                    <p className="font-bold text-lg">₹{(totalRevenue/1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3, badge: null },
                { id: 'hotel-info', label: 'Hotel Info', icon: Hotel, badge: null },
                { id: 'rooms', label: 'Rooms', icon: Home, badge: rooms.length.toString() },
                { id: 'bookings', label: 'Bookings', icon: Calendar, badge: pendingBookings > 0 ? pendingBookings.toString() : null },
                { id: 'guests', label: 'Guests', icon: Users, badge: guests.length.toString() },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, badge: 'New' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl w-full transition-all duration-200 hover:scale-105`}
                  >
                    <div className="flex items-center">
                      <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className={`${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-emerald-100 text-emerald-700'
                      } px-2 py-1 rounded-lg text-xs font-semibold`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="px-4 pt-4 border-t border-gray-200">
              <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Welcome Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                          Welcome back, {user?.name?.split(' ')[0] || 'Owner'}! 👋
                        </h1>
                      </div>
                      <p className="text-gray-600 text-lg">Here's what's happening at {hotelInfo.name} today.</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center text-sm text-emerald-600 font-medium">
                          <Activity className="h-4 w-4 mr-1" />
                          All systems operational
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowRoomModal(true)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Room
                      </button>
                      <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </button>
                    </div>
                  </div>

                  {/* Premium Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <Hotel className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +12%
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Total Rooms</p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">{totalRooms}</p>
                          <p className="text-gray-500 text-xs">{availableRooms} available • {occupiedRooms} occupied</p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-emerald-100 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +8%
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Occupancy Rate</p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">{occupancyRate}%</p>
                          <p className="text-gray-500 text-xs">Target: 85% • Last month: {occupancyRate - 8}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-orange-100 rounded-xl">
                            <Calendar className="h-6 w-6 text-orange-600" />
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +15%
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">{bookings.length}</p>
                          <p className="text-gray-500 text-xs">{confirmedBookings} confirmed • {pendingBookings} pending</p>
                        </div>
                      </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-purple-100 rounded-xl">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            +23%
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
                          <p className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(totalRevenue)}</p>
                          <p className="text-gray-500 text-xs">Target: ₹75K • Last month: ₹{(totalRevenue * 0.77 / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Activity Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-xl mr-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                            <p className="text-sm text-gray-500">Latest guest reservations</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center">
                          View All
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {bookings.slice(0, 4).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl hover:from-emerald-50 hover:to-emerald-50/50 transition-all duration-200">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                                {booking.guestName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{booking.guestName}</p>
                                <p className="text-sm text-gray-600">{booking.roomName} • {booking.nights} nights</p>
                                <p className="text-xs text-gray-500">{formatDate(booking.checkIn)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <p className="text-sm font-bold text-gray-900 mt-1">{formatCurrency(booking.amount)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions & Insights */}
                    <div className="space-y-6">
                      {/* Quick Actions */}
                      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-purple-100 rounded-xl mr-3">
                            <Zap className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={() => setShowRoomModal(true)}
                            className="w-full flex items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl transition-all duration-200 group"
                          >
                            <Plus className="h-5 w-5 mr-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                            <span className="text-emerald-700 font-medium">Add New Room</span>
                          </button>
                          <button
                            onClick={() => setShowHotelModal(true)}
                            className="w-full flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 group"
                          >
                            <Edit className="h-5 w-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                            <span className="text-blue-700 font-medium">Edit Hotel Info</span>
                          </button>
                          <button className="w-full flex items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl transition-all duration-200 group">
                            <BarChart3 className="h-5 w-5 mr-3 text-orange-600 group-hover:scale-110 transition-transform" />
                            <span className="text-orange-700 font-medium">View Analytics</span>
                          </button>
                        </div>
                      </div>

                      {/* Performance Insights */}
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center mb-4">
                          <Target className="h-6 w-6 mr-3" />
                          <h3 className="text-lg font-semibold">Today's Goals</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-white/80">Occupancy Target</span>
                              <span className="text-sm font-semibold">{occupancyRate}% / 85%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-white rounded-full h-2 transition-all duration-500" 
                                style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-white/80">Revenue Target</span>
                              <span className="text-sm font-semibold">₹{(totalRevenue/1000).toFixed(0)}K / ₹75K</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-white rounded-full h-2 transition-all duration-500" 
                                style={{ width: `${Math.min((totalRevenue/75000) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hotel-info' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Hotel Information</h1>
                      <p className="text-gray-600">Manage your hotel details and settings</p>
                    </div>
                    <button
                      onClick={() => setShowHotelModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Hotel Info
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="space-y-6">
                          {/* Basic Information */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Hotel Name</label>
                                <p className="mt-1 text-gray-900 font-semibold">{hotelInfo.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">KAHA Tag</label>
                                <p className="mt-1 text-emerald-600 font-mono">@{hotelInfo.kahaTag}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Star Rating</label>
                                <div className="flex items-center mt-1">
                                  {[...Array(hotelInfo.starRating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                  <span className="ml-2 text-gray-600">({hotelInfo.starRating} Star)</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Guest Rating</label>
                                <div className="flex items-center mt-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-gray-900 font-semibold">{hotelInfo.rating}</span>
                                  <span className="ml-1 text-gray-600">({hotelInfo.totalReviews} reviews)</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Established</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.established}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Total Rooms</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.totalRooms} rooms • {hotelInfo.totalFloors} floors</p>
                              </div>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Website</label>
                                <a href={`https://${hotelInfo.website}`} target="_blank" rel="noopener noreferrer"
                                  className="mt-1 text-emerald-600 hover:text-emerald-700 flex items-center">
                                  {hotelInfo.website}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Languages</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.languages.join(', ')}</p>
                              </div>
                            </div>
                          </div>

                          {/* Location */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                                <div>
                                  <p className="text-gray-900">{hotelInfo.address}</p>
                                  <p className="text-gray-600 text-sm">{hotelInfo.city}, {hotelInfo.state}, {hotelInfo.country} - {hotelInfo.zipCode}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policies */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Policies</h3>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Check-in / Check-out</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.checkInTime} / {hotelInfo.checkOutTime}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Cancellation Policy</label>
                                <p className="mt-1 text-gray-900 text-sm">{hotelInfo.cancellationPolicy}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Child Policy</label>
                                <p className="mt-1 text-gray-900 text-sm">{hotelInfo.childPolicy}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Pet Policy</label>
                                <p className="mt-1 text-gray-900 text-sm">{hotelInfo.petPolicy}</p>
                              </div>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700">Price Range</label>
                                <p className="mt-1 text-gray-900">₹{hotelInfo.priceRange.min.toLocaleString()} - ₹{hotelInfo.priceRange.max.toLocaleString()}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Tax Rate</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.taxRate}% VAT</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Service Charge</label>
                                <p className="mt-1 text-gray-900">{hotelInfo.serviceCharge}%</p>
                              </div>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {hotelInfo.amenities.map((amenity) => {
                                const Icon = getAmenityIcon(amenity);
                                return (
                                  <div key={amenity} className="flex items-center p-2 bg-emerald-50 rounded-lg">
                                    <Icon className="h-4 w-4 text-emerald-600 mr-2" />
                                    <span className="text-sm text-emerald-800">{getAmenityName(amenity)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Nearby Attractions */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Attractions</h3>
                            <div className="space-y-2">
                              {hotelInfo.nearbyAttractions.map((attraction, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                  <div>
                                    <p className="font-medium text-gray-900">{attraction.name}</p>
                                    <p className="text-sm text-gray-600">{attraction.type}</p>
                                  </div>
                                  <span className="text-sm text-emerald-600 font-medium">{attraction.distance}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Awards & Sustainability */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Awards & Recognition</h3>
                              <div className="space-y-2">
                                {hotelInfo.awards.map((award, index) => (
                                  <div key={index} className="flex items-center p-2 bg-yellow-50 rounded-lg">
                                    <Crown className="h-4 w-4 text-yellow-600 mr-2" />
                                    <span className="text-sm text-yellow-800">{award}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability</h3>
                              <div className="space-y-2">
                                {Object.entries(hotelInfo.sustainability).map(([key, value]) => (
                                  value && (
                                    <div key={key} className="flex items-center p-2 bg-green-50 rounded-lg">
                                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                      <span className="text-sm text-green-800 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </span>
                                    </div>
                                  )
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Photos</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            {hotelInfo.photos.map((photo, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={photo}
                                  alt={`Hotel photo ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => handleDeletePhoto(photo, 'hotel')}
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-6 h-6 mb-2 text-gray-400" />
                              <p className="text-xs text-gray-500">Upload Photo</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePhotoUpload(file, 'hotel');
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
                      <p className="text-gray-600">Manage your hotel rooms and availability</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingRoom(null);
                        resetRoomForm();
                        setShowRoomModal(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Room
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                      <div key={room.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                        <div className="relative h-48">
                          {room.photos && room.photos.length > 0 ? (
                            <img
                              src={room.photos[0]}
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <ImageIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                              {room.status}
                            </span>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white">
                              {room.quantity} rooms
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{room.name}</h3>
                              <p className="text-sm text-gray-600 capitalize">{room.type} Room</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-emerald-600">{formatCurrency(room.price)}</p>
                              <p className="text-xs text-gray-500">per night</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2" />
                              Up to {room.capacity} guests
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Home className="h-4 w-4 mr-2" />
                              {room.size} • {room.bedType}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {room.amenities.slice(0, 3).map((amenity) => {
                              const Icon = getAmenityIcon(amenity);
                              return (
                                <span key={amenity} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border">
                                  <Icon className="h-3 w-3 mr-1" />
                                  {getAmenityName(amenity)}
                                </span>
                              );
                            })}
                            {room.amenities.length > 3 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border">
                                +{room.amenities.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditRoom(room)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                      <p className="text-gray-600">Manage hotel bookings and reservations</p>
                    </div>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search bookings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
                        />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Booking Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-700 text-sm font-medium">Pending</p>
                          <p className="text-2xl font-bold text-yellow-900">{pendingBookings}</p>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-700 text-sm font-medium">Confirmed</p>
                          <p className="text-2xl font-bold text-green-900">{confirmedBookings}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-700 text-sm font-medium">Total</p>
                          <p className="text-2xl font-bold text-blue-900">{bookings.length}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Bookings Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Guest Details</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Room & Guests</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Stay Details</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status & Payment</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Special Requests</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Admin Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="border-b hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-medium text-gray-900">{booking.guestName}</p>
                                  <p className="text-sm text-gray-600">{booking.guestEmail}</p>
                                  <p className="text-sm text-gray-600">{booking.guestPhone}</p>
                                  <div className="flex items-center mt-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                      {booking.source}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-medium">{booking.roomName}</p>
                                  <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
                                  <div className="flex items-center mt-1">
                                    <Users className="h-3 w-3 mr-1 text-gray-400" />
                                    <span className="text-sm text-gray-600">{booking.guests} guests</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="text-sm"><strong>Check-in:</strong> {formatDate(booking.checkIn)}</p>
                                  <p className="text-sm"><strong>Check-out:</strong> {formatDate(booking.checkOut)}</p>
                                  <p className="text-sm text-gray-600">{booking.nights} nights</p>
                                  <p className="text-xs text-gray-500 mt-1">Booked: {formatDate(booking.createdAt)}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="space-y-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                  </span>
                                  <div>
                                    <p className="font-semibold">{formatCurrency(booking.amount)}</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.paymentStatus === 'pending'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-red-100 text-red-800'
                                      }`}>
                                      {booking.paymentStatus}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="max-w-xs">
                                  {booking.specialRequests ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                                      <div className="flex items-start">
                                        <MessageSquare className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                                        <p className="text-sm text-yellow-800">{booking.specialRequests}</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 italic">No special requests</p>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col space-y-2">
                                  {booking.status === 'pending' && (
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => {
                                          if (window.confirm(`Confirm booking for ${booking.guestName}?`)) {
                                            handleBookingStatusChange(booking.id, 'confirmed');
                                          }
                                        }}
                                        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                                        title="Confirm Booking"
                                      >
                                        <Check className="h-3 w-3 mr-1" />
                                        Confirm
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (window.confirm(`Reject booking for ${booking.guestName}?`)) {
                                            handleBookingStatusChange(booking.id, 'cancelled');
                                          }
                                        }}
                                        className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                                        title="Reject Booking"
                                      >
                                        <X className="h-3 w-3 mr-1" />
                                        Reject
                                      </button>
                                    </div>
                                  )}

                                  {booking.status === 'confirmed' && (
                                    <button
                                      onClick={() => {
                                        if (window.confirm(`Mark booking as completed for ${booking.guestName}?`)) {
                                          handleBookingStatusChange(booking.id, 'completed');
                                        }
                                      }}
                                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                                      title="Mark as Completed"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Complete
                                    </button>
                                  )}

                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(`${booking.guestName} - ${booking.guestEmail} - ${booking.guestPhone}`);
                                        alert('Guest details copied to clipboard!');
                                      }}
                                      className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                                      title="Copy Guest Details"
                                    >
                                      <Copy className="h-3 w-3 mr-1" />
                                      Copy
                                    </button>
                                    <button
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-xs"
                                      title="Delete Booking"
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guests' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Guest Management</h1>
                      <p className="text-gray-600">Manage guest profiles and preferences</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guests.map((guest) => (
                      <div key={guest.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {guest.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{guest.name}</h3>
                              <p className="text-sm text-gray-600">{guest.nationality}</p>
                            </div>
                          </div>
                          {guest.vip && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                              <Crown className="h-3 w-3 mr-1" />
                              VIP
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {guest.email}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {guest.phone}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Total Stays</p>
                              <p className="font-semibold">{guest.totalStays}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Total Spent</p>
                              <p className="font-semibold">{formatCurrency(guest.totalSpent)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex flex-wrap gap-1">
                            {guest.tags.map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                    <p className="text-gray-600">Track your hotel's performance and insights</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                      <div className="text-center py-8">
                        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Revenue analytics coming soon</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Occupancy Trends</h3>
                      <div className="text-center py-8">
                        <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Occupancy trends coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button
                  onClick={() => setShowRoomModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleRoomSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                  <input
                    id="name"
                    type="text"
                    value={roomFormData.name}
                    onChange={(e) => setRoomFormData({ ...roomFormData, name: e.target.value })}
                    placeholder="e.g., Deluxe Suite"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    id="type"
                    value={roomFormData.type}
                    onChange={(e) => setRoomFormData({ ...roomFormData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price per Night (₹)</label>
                  <input
                    id="price"
                    type="number"
                    value={roomFormData.price}
                    onChange={(e) => setRoomFormData({ ...roomFormData, price: parseInt(e.target.value) || 0 })}
                    placeholder="5000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">Guest Capacity</label>
                  <input
                    id="capacity"
                    type="number"
                    value={roomFormData.capacity}
                    onChange={(e) => setRoomFormData({ ...roomFormData, capacity: parseInt(e.target.value) || 1 })}
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
                  <input
                    id="quantity"
                    type="number"
                    value={roomFormData.quantity}
                    onChange={(e) => setRoomFormData({ ...roomFormData, quantity: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">Room Size</label>
                  <input
                    id="size"
                    type="text"
                    value={roomFormData.size}
                    onChange={(e) => setRoomFormData({ ...roomFormData, size: e.target.value })}
                    placeholder="e.g., 45 sqm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="bedType" className="block text-sm font-medium text-gray-700 mb-2">Bed Type</label>
                  <input
                    id="bedType"
                    type="text"
                    value={roomFormData.bedType}
                    onChange={(e) => setRoomFormData({ ...roomFormData, bedType: e.target.value })}
                    placeholder="e.g., King Size"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  id="description"
                  value={roomFormData.description}
                  onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                  placeholder="Describe the room features and amenities..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableAmenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={amenity.id}
                          checked={roomFormData.amenities.includes(amenity.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoomFormData({
                                ...roomFormData,
                                amenities: [...roomFormData.amenities, amenity.id]
                              });
                            } else {
                              setRoomFormData({
                                ...roomFormData,
                                amenities: roomFormData.amenities.filter(a => a !== amenity.id)
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor={amenity.id} className="flex items-center cursor-pointer text-sm">
                          <Icon className="h-4 w-4 mr-1" />
                          {amenity.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Room Photos Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Photos</label>
                <div className="space-y-4">
                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {roomFormData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Room photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRoomFormPhotoDelete(photo)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {/* Upload Button */}
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2">
                        <Upload className="w-6 h-6 mb-1 text-gray-400" />
                        <p className="text-xs text-gray-500">Add Photo</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleRoomFormPhotoUpload(file);
                        }}
                      />
                    </label>
                  </div>

                  {roomFormData.photos.length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No photos uploaded yet</p>
                      <p className="text-xs">Add photos to showcase your room</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Room Status</label>
                  <select
                    id="status"
                    value={roomFormData.status}
                    onChange={(e) => setRoomFormData({ ...roomFormData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="published"
                    checked={roomFormData.published}
                    onChange={(e) => setRoomFormData({ ...roomFormData, published: e.target.checked })}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">Published (visible to guests)</label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  {isLoading ? 'Saving...' : editingRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hotel Info Modal */}
      {showHotelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Edit Hotel Information</h2>
                <button
                  onClick={() => setShowHotelModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updatedInfo = {
                name: formData.get('name'),
                kahaTag: formData.get('kahaTag'),
                description: formData.get('description'),
                shortDescription: formData.get('shortDescription'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                country: formData.get('country'),
                zipCode: formData.get('zipCode'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                website: formData.get('website'),
                rating: parseFloat(formData.get('rating') as string),
                starRating: parseInt(formData.get('starRating') as string),
                totalRooms: parseInt(formData.get('totalRooms') as string),
                totalFloors: parseInt(formData.get('totalFloors') as string),
                established: formData.get('established'),
                checkInTime: formData.get('checkInTime'),
                checkOutTime: formData.get('checkOutTime'),
                cancellationPolicy: formData.get('cancellationPolicy'),
                childPolicy: formData.get('childPolicy'),
                petPolicy: formData.get('petPolicy'),
                smokingPolicy: formData.get('smokingPolicy'),
                taxRate: parseFloat(formData.get('taxRate') as string),
                serviceCharge: parseFloat(formData.get('serviceCharge') as string),
                priceRange: {
                  min: parseInt(formData.get('priceMin') as string),
                  max: parseInt(formData.get('priceMax') as string)
                }
              };
              handleUpdateHotel(updatedInfo);
            }} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={hotelInfo.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="kahaTag" className="block text-sm font-medium text-gray-700 mb-2">KAHA Tag</label>
                    <input
                      id="kahaTag"
                      name="kahaTag"
                      type="text"
                      defaultValue={hotelInfo.kahaTag}
                      placeholder="unique-hotel-tag"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="starRating" className="block text-sm font-medium text-gray-700 mb-2">Star Rating</label>
                    <select
                      id="starRating"
                      name="starRating"
                      defaultValue={hotelInfo.starRating}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="1">1 Star</option>
                      <option value="2">2 Star</option>
                      <option value="3">3 Star</option>
                      <option value="4">4 Star</option>
                      <option value="5">5 Star</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="established" className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                    <input
                      id="established"
                      name="established"
                      type="text"
                      defaultValue={hotelInfo.established}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700 mb-2">Total Rooms</label>
                    <input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      defaultValue={hotelInfo.totalRooms}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="totalFloors" className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
                    <input
                      id="totalFloors"
                      name="totalFloors"
                      type="number"
                      defaultValue={hotelInfo.totalFloors}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                  <textarea
                    id="description"
                    name="description"
                    defaultValue={hotelInfo.description}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <input
                    id="shortDescription"
                    name="shortDescription"
                    type="text"
                    defaultValue={hotelInfo.shortDescription}
                    placeholder="Brief description for listings"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      defaultValue={hotelInfo.address}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        defaultValue={hotelInfo.city}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        defaultValue={hotelInfo.state}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        defaultValue={hotelInfo.country}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        defaultValue={hotelInfo.zipCode}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={hotelInfo.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={hotelInfo.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      defaultValue={hotelInfo.website}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Policies */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-2">Minimum Price (₹)</label>
                    <input
                      id="priceMin"
                      name="priceMin"
                      type="number"
                      defaultValue={hotelInfo.priceRange.min}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-2">Maximum Price (₹)</label>
                    <input
                      id="priceMax"
                      name="priceMax"
                      type="number"
                      defaultValue={hotelInfo.priceRange.max}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input
                      id="taxRate"
                      name="taxRate"
                      type="number"
                      step="0.1"
                      defaultValue={hotelInfo.taxRate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
                    <input
                      id="serviceCharge"
                      name="serviceCharge"
                      type="number"
                      step="0.1"
                      defaultValue={hotelInfo.serviceCharge}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700 mb-2">Check-in Time</label>
                    <input
                      id="checkInTime"
                      name="checkInTime"
                      type="time"
                      defaultValue={hotelInfo.checkInTime}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700 mb-2">Check-out Time</label>
                    <input
                      id="checkOutTime"
                      name="checkOutTime"
                      type="time"
                      defaultValue={hotelInfo.checkOutTime}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy</label>
                    <textarea
                      id="cancellationPolicy"
                      name="cancellationPolicy"
                      defaultValue={hotelInfo.cancellationPolicy}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="childPolicy" className="block text-sm font-medium text-gray-700 mb-2">Child Policy</label>
                    <textarea
                      id="childPolicy"
                      name="childPolicy"
                      defaultValue={hotelInfo.childPolicy}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="petPolicy" className="block text-sm font-medium text-gray-700 mb-2">Pet Policy</label>
                    <input
                      id="petPolicy"
                      name="petPolicy"
                      type="text"
                      defaultValue={hotelInfo.petPolicy}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="smokingPolicy" className="block text-sm font-medium text-gray-700 mb-2">Smoking Policy</label>
                    <input
                      id="smokingPolicy"
                      name="smokingPolicy"
                      type="text"
                      defaultValue={hotelInfo.smokingPolicy}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowHotelModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;