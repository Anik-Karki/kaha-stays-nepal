import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Hotel,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  BarChart3,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Settings,
  Camera,
  Phone,
  Mail,
  Search,
  Filter,
  Check,
  X,
  Save,
  Globe,
} from "lucide-react";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null);

  // Hotel Information State
  const [hotelInfo, setHotelInfo] = useState({
    id: 1,
    name: "Hotel Everest View",
    description:
      "Experience luxury with breathtaking views of the Himalayas in the heart of Thamel. Our premium hotel offers world-class amenities and exceptional service.",
    address: "Thamel, Kathmandu, Nepal",
    phone: "+977-1-4567890",
    email: "info@hoteleverestview.com",
    website: "www.hoteleverestview.com",
    rating: 4.8,
    photos: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    ],
    amenities: [
      "wifi",
      "parking",
      "restaurant",
      "breakfast",
      "spa",
      "gym",
      "pool",
      "concierge",
    ],
  });

  // Rooms State
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Suite",
      type: "Suite",
      price: 5000,
      capacity: 3,
      status: "available",
      amenities: ["wifi", "ac", "minibar", "balcony"],
      description:
        "Luxurious suite with panoramic mountain views and premium amenities",
      size: "45 sqm",
      bedType: "King Size",
      photos: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Standard Room",
      type: "Standard",
      price: 2500,
      capacity: 2,
      status: "occupied",
      amenities: ["wifi", "ac", "tv"],
      description: "Comfortable and well-appointed room with modern amenities",
      size: "25 sqm",
      bedType: "Double",
      photos: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      ],
    },
  ]);

  // Bookings State
  const [bookings, setBookings] = useState([
    {
      id: 1,
      guestName: "John Doe",
      email: "john@email.com",
      phone: "+977-9841234567",
      room: "Deluxe Suite",
      roomNumber: "301",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "pending",
      amount: 15000,
      guests: 2,
      nights: 3,
      bookingDate: "2024-01-10",
      specialRequests: "Late check-in requested",
      paymentStatus: "pending",
    },
    {
      id: 2,
      guestName: "Jane Smith",
      email: "jane@email.com",
      phone: "+977-9851234567",
      room: "Standard Room",
      roomNumber: "102",
      checkIn: "2024-01-16",
      checkOut: "2024-01-17",
      status: "confirmed",
      amount: 2500,
      guests: 1,
      nights: 1,
      bookingDate: "2024-01-12",
      specialRequests: "Ground floor preferred",
      paymentStatus: "paid",
    },
    {
      id: 3,
      guestName: "Mike Johnson",
      email: "mike@email.com",
      phone: "+977-9861234567",
      room: "Deluxe Suite",
      roomNumber: "302",
      checkIn: "2024-01-20",
      checkOut: "2024-01-23",
      status: "pending",
      amount: 18000,
      guests: 4,
      nights: 3,
      bookingDate: "2024-01-14",
      specialRequests: "Extra bed needed",
      paymentStatus: "pending",
    },
  ]);

  // Guests State
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      phone: "+977-9841234567",
      totalBookings: 3,
      totalSpent: 45000,
      lastVisit: "2024-01-15",
      status: "VIP",
      nationality: "American",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@email.com",
      phone: "+977-9851234567",
      totalBookings: 1,
      totalSpent: 2500,
      lastVisit: "2024-01-16",
      status: "Regular",
      nationality: "British",
    },
  ]);

  // Modal States
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [editingGuest, setEditingGuest] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Check authentication
  useEffect(() => {
    const auth = localStorage.getItem("hotelOwnerAuth");
    if (!auth) {
      navigate("/owner-login");
      return;
    }
    setUser(JSON.parse(auth).user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("hotelOwnerAuth");
    navigate("/owner-login");
  };

  // Hotel Management Functions
  const handleUpdateHotel = (hotelData: any) => {
    setHotelInfo({ ...hotelInfo, ...hotelData });
    setShowHotelModal(false);
  };

  const handlePhotoUpload = (file: File, type: "hotel" | "room", id?: number) => {
    const photoUrl = URL.createObjectURL(file);

    if (type === "hotel") {
      setHotelInfo((prev) => ({
        ...prev,
        photos: [...prev.photos, photoUrl],
      }));
    } else if (type === "room" && id) {
      setRooms(
        rooms.map((room) =>
          room.id === id
            ? { ...room, photos: [...(room.photos || []), photoUrl] }
            : room
        )
      );
    }
  };

  const handleDeletePhoto = (photoUrl: string, type: "hotel" | "room", id?: number) => {
    if (type === "hotel") {
      setHotelInfo((prev) => ({
        ...prev,
        photos: prev.photos.filter((photo) => photo !== photoUrl),
      }));
    } else if (type === "room" && id) {
      setRooms(
        rooms.map((room) =>
          room.id === id
            ? {
                ...room,
                photos: (room.photos || []).filter((photo) => photo !== photoUrl),
              }
            : room
        )
      );
    }
  };

  // Room CRUD Functions
  const handleAddRoom = (roomData: any) => {
    const newRoom = {
      ...roomData,
      id: Math.max(...rooms.map((r) => r.id)) + 1,
      photos: [],
    };
    setRooms([...rooms, newRoom]);
    setShowRoomModal(false);
    setEditingRoom(null);
  };

  const handleEditRoom = (roomData: any) => {
    setRooms(
      rooms.map((room) =>
        room.id === editingRoom?.id ? { ...room, ...roomData } : room
      )
    );
    setShowRoomModal(false);
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId: number) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== roomId));
    }
  };

  // Booking Management Functions
  const handleApproveBooking = (bookingId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "confirmed", paymentStatus: "paid" }
          : booking
      )
    );
  };

  const handleRejectBooking = (bookingId: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "rejected", paymentStatus: "refunded" }
          : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    }
  };

  // Guest CRUD Functions
  const handleAddGuest = (guestData: any) => {
    const newGuest = {
      ...guestData,
      id: Math.max(...guests.map((g) => g.id)) + 1,
    };
    setGuests([...guests, newGuest]);
    setShowGuestModal(false);
    setEditingGuest(null);
  };

  const handleEditGuest = (guestData: any) => {
    setGuests(
      guests.map((guest) =>
        guest.id === editingGuest?.id ? { ...guest, ...guestData } : guest
      )
    );
    setShowGuestModal(false);
    setEditingGuest(null);
  };

  const handleDeleteGuest = (guestId: number) => {
    if (window.confirm("Are you sure you want to delete this guest?")) {
      setGuests(guests.filter((guest) => guest.id !== guestId));
    }
  };

  // Filter functions
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRooms: rooms.length,
    occupiedRooms: rooms.filter((r) => r.status === "occupied").length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    totalRevenue: bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.amount, 0),
    occupancyRate: Math.round(
      (rooms.filter((r) => r.status === "occupied").length / rooms.length) * 100
    ),
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const renderDashboardOld = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Rooms</p>
              <p className="text-3xl font-bold">{stats.totalRooms}</p>
            </div>
            <Hotel className="w-10 h-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Occupied</p>
              <p className="text-3xl font-bold">{stats.occupiedRooms}</p>
            </div>
            <Users className="w-10 h-10 text-emerald-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Bookings</p>
              <p className="text-3xl font-bold">{stats.totalBookings}</p>
            </div>
            <Calendar className="w-10 h-10 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Revenue</p>
              <p className="text-3xl font-bold">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Guest</th>
                <th className="text-left py-2">Room</th>
                <th className="text-left py-2">Check-in</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="py-3">{booking.guestName}</td>
                  <td className="py-3">{booking.room}</td>
                  <td className="py-3">{booking.checkIn}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3">₹{booking.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHotelInfo = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Hotel Information</h2>
          <p className="text-gray-600">Manage your hotel details, photos, and amenities</p>
        </div>
        <button
          onClick={() => setShowHotelModal(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit Hotel Info
        </button>
      </div>

      {/* Hotel Overview Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-600">
          {hotelInfo.photos.length > 0 ? (
            <img
              src={hotelInfo.photos[0]}
              alt={hotelInfo.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Hotel className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold">{hotelInfo.name}</h1>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="text-lg font-semibold">{hotelInfo.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Hotel Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{hotelInfo.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{hotelInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{hotelInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{hotelInfo.website}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {hotelInfo.description}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Hotel Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {hotelInfo.amenities.map((amenity) => {
                const getAmenityIcon = (amenity: string) => {
                  switch (amenity) {
                    case "wifi":
                      return <Wifi className="w-3 h-3" />;
                    case "parking":
                      return <Car className="w-3 h-3" />;
                    case "restaurant":
                      return <Coffee className="w-3 h-3" />;
                    case "breakfast":
                      return <Coffee className="w-3 h-3" />;
                    default:
                      return <Star className="w-3 h-3" />;
                  }
                };

                return (
                  <div
                    key={amenity}
                    className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1 capitalize">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Photos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Hotel Photos</h3>
          <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center">
            <Camera className="w-4 h-4 mr-2" />
            Add Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePhotoUpload(file, "hotel");
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotelInfo.photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Hotel photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeletePhoto(photo, "hotel")}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {hotelInfo.photos.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Room Management</h2>
          <p className="text-gray-600">Manage your hotel rooms and availability</p>
        </div>
        <button
          onClick={() => {
            setEditingRoom(null);
            setShowRoomModal(true);
          }}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative">
              {room.photos && room.photos.length > 0 ? (
                <img
                  src={room.photos[0]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Hotel className="w-16 h-16 text-white opacity-50" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    room.status === "available"
                      ? "bg-green-100 text-green-800"
                      : room.status === "occupied"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {room.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-gray-600 capitalize">{room.type} Room</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    ₹{room.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-emerald-500" />
                    Up to {room.capacity} guests
                  </div>
                  {room.size && (
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-emerald-500" />
                      {room.size}
                    </div>
                  )}
                  {room.bedType && (
                    <div className="flex items-center">
                      <Hotel className="w-4 h-4 mr-2 text-emerald-500" />
                      {room.bedType} bed
                    </div>
                  )}
                </div>

                {room.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {room.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => {
                    const getAmenityIcon = (amenity: string) => {
                      switch (amenity) {
                        case "wifi":
                          return <Wifi className="w-3 h-3" />;
                        case "ac":
                          return <Settings className="w-3 h-3" />;
                        case "minibar":
                          return <Coffee className="w-3 h-3" />;
                        case "balcony":
                          return <Eye className="w-3 h-3" />;
                        default:
                          return <Star className="w-3 h-3" />;
                      }
                    };

                    return (
                      <div
                        key={amenity}
                        className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1 capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setShowRoomModal(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <Hotel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No rooms available</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Start by adding your first room to the system
          </p>
          <button
            onClick={() => {
              setEditingRoom(null);
              setShowRoomModal(true);
            }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Room
          </button>
        </div>
      )}
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="text-gray-600">Manage hotel bookings and reservations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pendingBookings}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-medium">Confirmed</p>
              <p className="text-2xl font-bold text-green-900">{stats.confirmedBookings}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalBookings}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Guest</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Room</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Dates</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{booking.guestName}</div>
                      <div className="text-sm text-gray-600">{booking.email}</div>
                      <div className="text-sm text-gray-600">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium">{booking.room}</div>
                      <div className="text-sm text-gray-600">Room {booking.roomNumber}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm">Check-in: {booking.checkIn}</div>
                      <div className="text-sm">Check-out: {booking.checkOut}</div>
                      <div className="text-sm text-gray-600">{booking.nights} nights</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold">₹{booking.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{booking.paymentStatus}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApproveBooking(booking.id)}
                            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejectBooking(booking.id)}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">No bookings found</h3>
          <p className="text-gray-500 mt-2">No bookings match your current filters</p>
        </div>
      )}
    </div>
  );

  const renderGuests = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-gray-600">Manage guest information and profiles</p>
        </div>
        <button
          onClick={() => {
            setEditingGuest(null);
            setShowGuestModal(true);
          }}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Guest
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {guests.map((guest) => (
            <div
              key={guest.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{guest.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        guest.status === "VIP"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {guest.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {guest.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {guest.phone}
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        {guest.nationality}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div>
                        Total Bookings:{" "}
                        <span className="font-medium">{guest.totalBookings}</span>
                      </div>
                      <div>
                        Total Spent:{" "}
                        <span className="font-medium">₹{guest.totalSpent.toLocaleString()}</span>
                      </div>
                      <div>
                        Last Visit: <span className="font-medium">{guest.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingGuest(guest);
                      setShowGuestModal(true);
                    }}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    title="Edit Guest"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    title="Delete Guest"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {guests.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No guests found</h3>
            <p className="text-gray-500 mt-2 mb-6">
              Start by adding your first guest to the system
            </p>
            <button
              onClick={() => {
                setEditingGuest(null);
                setShowGuestModal(true);
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Guest
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Modal Components
  const HotelModal = () => {
    const [formData, setFormData] = useState({
      name: hotelInfo.name,
      description: hotelInfo.description,
      address: hotelInfo.address,
      phone: hotelInfo.phone,
      email: hotelInfo.email,
      website: hotelInfo.website,
      rating: hotelInfo.rating,
      amenities: hotelInfo.amenities,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleUpdateHotel(formData);
    };

    const handleAmenityToggle = (amenity: string) => {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      }));
    };

    const availableAmenities = [
      "wifi",
      "parking",
      "restaurant",
      "breakfast",
      "spa",
      "gym",
      "pool",
      "concierge",
      "laundry",
      "room-service",
    ];

    if (!showHotelModal) return null;

    return (
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

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseFloat(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm capitalize">{amenity}</span>
                  </label>
                ))}
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
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("hotelOwnerAuth");
            navigate("/owner-login");
          }}
          className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Hotel className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                NPR {bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'rooms', label: 'Rooms', icon: Hotel },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'guests', label: 'Guests', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Welcome to your hotel dashboard! Use the tabs above to manage your rooms, bookings, and guests.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Room Management</h2>
                <button
                  onClick={() => setShowRoomModal(true)}
                  className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </button>
              </div>
              <div className="grid gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{room.name}</h3>
                        <p className="text-gray-600">NPR {room.price}/night</p>
                        <p className="text-sm text-gray-500">{room.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingRoom(room);
                            setShowRoomModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Booking Management</h2>
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{booking.guestName}</h3>
                        <p className="text-gray-600">{booking.room} - Room {booking.roomNumber}</p>
                        <p className="text-sm text-gray-500">
                          {booking.checkIn} to {booking.checkOut} ({booking.nights} nights)
                        </p>
                        <p className="text-sm font-medium">NPR {booking.amount}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guests' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Guest Management</h2>
              <div className="grid gap-4">
                {guests.map((guest) => (
                  <div key={guest.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{guest.name}</h3>
                        <p className="text-gray-600">{guest.email}</p>
                        <p className="text-sm text-gray-500">
                          {guest.totalBookings} bookings • NPR {guest.totalSpent.toLocaleString()} spent
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        guest.status === 'VIP' 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {guest.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Hotel Settings</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{hotelInfo.name}</h3>
                <p className="text-gray-600 mb-2">{hotelInfo.description}</p>
                <p className="text-sm text-gray-500">{hotelInfo.address}</p>
                <p className="text-sm text-gray-500">{hotelInfo.phone} • {hotelInfo.email}</p>
                <button
                  onClick={() => setShowHotelModal(true)}
                  className="mt-4 flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Hotel Info
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default OwnerDashboard;