
import React, { useState } from 'react';
import { Calendar, Search, Filter, Eye, CheckCircle, XCircle, Clock, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useHotelStore, Booking } from '@/stores/hotelStore';

const BookingManagement = () => {
  const { bookings, updateBookingStatus, cancelBooking, addNotification } = useHotelStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleStatusUpdate = (bookingId: string, newStatus: Booking['status']) => {
    updateBookingStatus(bookingId, newStatus);
    
    // Add notification
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      addNotification({
        type: 'booking',
        title: `Booking ${newStatus}`,
        message: `Booking for ${booking.guestName} has been ${newStatus}`,
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
      
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        addNotification({
          type: 'cancellation',
          title: 'Booking Cancelled',
          message: `Booking for ${booking.guestName} has been cancelled and refunded`,
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const BookingDetails = ({ booking }: { booking: Booking }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Guest Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{booking.guestName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{booking.guestEmail}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{booking.guestPhone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Booking ID:</span>
              <p className="font-medium">#{booking.id}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Room:</span>
              <p className="font-medium">{booking.roomName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Guests:</span>
              <p className="font-medium">{booking.guests} guests</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Source:</span>
              <Badge variant="secondary" className="capitalize">{booking.source}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stay Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Check-in:</span>
              <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Check-out:</span>
              <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Duration:</span>
              <p className="font-medium">
                {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Amount:</span>
              <p className="font-medium text-lg">₹{booking.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Payment Status:</span>
              <Badge className={getPaymentStatusColor(booking.paymentStatus)} variant="secondary">
                {booking.paymentStatus}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-gray-600">Booking Status:</span>
              <Badge className={getStatusColor(booking.status)} variant="secondary">
                {booking.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {booking.specialRequests && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Special Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{booking.specialRequests}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        {booking.status === 'pending' && (
          <>
            <Button
              variant="outline"
              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
              className="text-green-600 hover:text-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCancelBooking(booking.id)}
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </>
        )}
        {booking.status === 'confirmed' && (
          <Button
            onClick={() => handleStatusUpdate(booking.id, 'checked-in')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Clock className="w-4 h-4 mr-2" />
            Check In
          </Button>
        )}
        {booking.status === 'checked-in' && (
          <Button
            onClick={() => handleStatusUpdate(booking.id, 'completed')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Stay
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {filteredBookings.length} bookings found
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
              <p className="text-sm text-gray-600">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'checked-in').length}
              </p>
              <p className="text-sm text-gray-600">Checked In</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {bookings.filter(b => b.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by guest name, room, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">#{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.guestName}</p>
                      <p className="text-sm text-gray-600">{booking.guestEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.roomName}</TableCell>
                  <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">₹{booking.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)} variant="secondary">
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)} variant="secondary">
                      {booking.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Booking Details - #{booking.id}</DialogTitle>
                        </DialogHeader>
                        {selectedBooking && <BookingDetails booking={selectedBooking} />}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Bookings will appear here once guests start making reservations.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingManagement;
