
import React, { useState } from 'react';
import { 
  BarChart3, Hotel, Users, Calendar, DollarSign, Star, 
  Bell, Settings, LogOut, Plus, Edit, Eye, Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const HotelAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const mockBookings = [
    { id: 1, guest: 'John Doe', room: 'Deluxe Suite', checkIn: '2024-01-15', checkOut: '2024-01-18', status: 'confirmed', amount: 12000 },
    { id: 2, guest: 'Jane Smith', room: 'Economy Room', checkIn: '2024-01-16', checkOut: '2024-01-17', status: 'pending', amount: 3500 },
    { id: 3, guest: 'Mike Johnson', room: 'Family Room', checkIn: '2024-01-20', checkOut: '2024-01-23', status: 'cancelled', amount: 15000 }
  ];

  const mockRooms = [
    { id: 1, name: 'Deluxe Suite', type: 'suite', capacity: 3, price: 4000, status: 'available', bookings: 12 },
    { id: 2, name: 'Economy Room', type: 'economy', capacity: 2, price: 1800, status: 'occupied', bookings: 25 },
    { id: 3, name: 'Family Room', type: 'family', capacity: 5, price: 5000, status: 'maintenance', bookings: 8 }
  ];

  const handleLogout = () => {
    navigate('/hotel-owner-login');
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-900">156</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold text-green-900">₹4,25,000</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Occupancy</p>
              <p className="text-2xl font-bold text-orange-900">78%</p>
            </div>
            <Hotel className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Rating</p>
              <p className="text-2xl font-bold text-purple-900">4.8</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-sm font-medium text-gray-600">Guest</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Room</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Check-in</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Check-out</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Amount</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">{booking.guest}</td>
                  <td className="py-3 text-sm text-gray-900">{booking.room}</td>
                  <td className="py-3 text-sm text-gray-600">{booking.checkIn}</td>
                  <td className="py-3 text-sm text-gray-600">{booking.checkOut}</td>
                  <td className="py-3 text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Room Management</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Room
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{room.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{room.type} • {room.capacity} guests</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                room.status === 'available' ? 'bg-green-100 text-green-800' :
                room.status === 'occupied' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {room.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-2xl font-bold text-blue-600">₹{room.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per night</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">{room.bookings} bookings this month</p>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">All Bookings</h3>
        <div className="flex space-x-4">
          <Input placeholder="Search bookings..." className="w-64" />
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{booking.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.guest}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.room}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.checkIn} to {booking.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hotel Everest View</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'rooms', label: 'Room Management', icon: Hotel },
              { id: 'guests', label: 'Guests', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'rooms' && renderRooms()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'guests' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guest Management</h3>
              <p className="text-gray-600">Guest management features coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics & Reports</h3>
              <p className="text-gray-600">Advanced analytics features coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelAdmin;
