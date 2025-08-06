
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, DollarSign, Hotel, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useHotelStore } from '@/stores/hotelStore';
import { useAuthStore } from '@/stores/authStore';

const AdminDashboard = () => {
  const { rooms, bookings, guests } = useHotelStore();
  const { user } = useAuthStore();

  // Calculate stats
  const totalBookings = bookings.length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100);
  const totalRevenue = bookings.reduce((sum, booking) => 
    booking.status === 'confirmed' || booking.status === 'completed' ? sum + booking.amount : sum, 0
  );

  // Chart data
  const weeklyBookings = [
    { name: 'Mon', bookings: 12, revenue: 45000 },
    { name: 'Tue', bookings: 8, revenue: 32000 },
    { name: 'Wed', bookings: 15, revenue: 58000 },
    { name: 'Thu', bookings: 10, revenue: 38000 },
    { name: 'Fri', bookings: 18, revenue: 72000 },
    { name: 'Sat', bookings: 22, revenue: 88000 },
    { name: 'Sun', bookings: 16, revenue: 62000 }
  ];

  const bookingSources = [
    { name: 'Mobile App', value: 45, color: '#3B82F6' },
    { name: 'Website', value: 35, color: '#10B981' },
    { name: 'Phone', value: 15, color: '#F59E0B' },
    { name: 'QR Code', value: 5, color: '#8B5CF6' }
  ];

  const StatsCard = ({ title, value, icon: Icon, trend, color = 'blue' }: any) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-100 text-blue-600',
      green: 'bg-green-50 border-green-100 text-green-600',
      orange: 'bg-orange-50 border-orange-100 text-orange-600',
      purple: 'bg-purple-50 border-purple-100 text-purple-600'
    };

    return (
      <div className={`p-6 rounded-xl border ${colorClasses[color as keyof typeof colorClasses]}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-3 rounded-lg bg-white/50">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend && (
          <div className="flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="font-medium">{trend}</span>
            <span className="opacity-75 ml-1">vs last month</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Here's what's happening at {user?.hotelName} today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value={totalBookings}
          icon={Calendar}
          trend="+12%"
          color="blue"
        />
        <StatsCard
          title="Revenue This Month"
          value={`₹${(totalRevenue / 1000).toFixed(1)}K`}
          icon={DollarSign}
          trend="+8%"
          color="green"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={Hotel}
          trend="+5%"
          color="orange"
        />
        <StatsCard
          title="Total Guests"
          value={guests.length}
          icon={Users}
          trend="+15%"
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Bookings Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Bookings</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3B82F6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Sources */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.value}%`}
                >
                  {bookingSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {bookingSources.map((source, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-gray-600">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyBookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Bookings</h3>
        <div className="space-y-4">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {booking.guestName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">{booking.roomName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">₹{booking.amount.toLocaleString()}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
