import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, CreditCard, Shield, CheckCircle, Phone, 
  User, Award, Loader2, MapPin, Calendar, Users, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { apiService } from '../services/api';

interface BookingData {
  // Guest Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Booking Details
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  
  // Room Information
  roomType: string;
  roomPrice: number;
  totalNights: number;
  subtotal: number;
  taxes: number;
  totalAmount: number;
  
  // Special Requests
  specialRequests: string;
  
  // Payment
  paymentMethod: 'pay-at-property';
  
  // Terms & Conditions
  agreeToTerms: boolean;
  
  // OTP Verification
  otp: string;
  isVerified: boolean;
}

const BookingPage = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Debug logging
  console.log('BookingPage loaded with hotelId:', hotelId);
  console.log('Search params:', Object.fromEntries(searchParams.entries()));
  
  const [currentStep, setCurrentStep] = useState<'booking-form' | 'confirm-popup' | 'otp-verification' | 'success'>('booking-form');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hotelData, setHotelData] = useState<any>(null);
  const [bookingId, setBookingId] = useState<string>('');
  
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkInDate: searchParams.get('checkIn') || new Date().toISOString().split('T')[0],
    checkOutDate: searchParams.get('checkOut') || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: parseInt(searchParams.get('guests') || '2'),
    rooms: parseInt(searchParams.get('rooms') || '1'),
    roomType: searchParams.get('roomType') || 'Hotel Everest View',
    roomPrice: parseInt(searchParams.get('price') || '2500'),
    totalNights: 1,
    subtotal: 0,
    taxes: 0,
    totalAmount: 0,
    specialRequests: '',
    paymentMethod: 'pay-at-property',
    agreeToTerms: false,
    otp: '',
    isVerified: false
  });

  // Calculate total nights and amount
  useEffect(() => {
    if (bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const subtotal = nights * bookingData.roomPrice * bookingData.rooms;
      const taxes = Math.round(subtotal * 0.12); // 12% taxes & service fees
      const total = subtotal + taxes;
      
      setBookingData(prev => ({
        ...prev,
        totalNights: nights,
        subtotal: subtotal,
        taxes: taxes,
        totalAmount: total
      }));
    }
  }, [bookingData.checkInDate, bookingData.checkOutDate, bookingData.roomPrice, bookingData.rooms]);

  // Load hotel data
  useEffect(() => {
    const loadHotelData = async () => {
      if (hotelId) {
        try {
          const hotel = await apiService.getHotelDetails(hotelId);
          setHotelData(hotel);
        } catch (error) {
          console.error('Failed to load hotel data:', error);
          // Fallback to mock data
          setHotelData({
            id: hotelId,
            name: 'Hotel Everest View',
            address: 'Thamel, Kathmandu',
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
          });
        }
      }
    };

    loadHotelData();
  }, [hotelId]);

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const validateBookingForm = () => {
    if (!bookingData.firstName.trim()) {
      alert('Please enter your first name');
      return false;
    }
    if (!bookingData.lastName.trim()) {
      alert('Please enter your last name');
      return false;
    }
    if (!bookingData.email.trim() || !bookingData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!bookingData.phone.trim() || bookingData.phone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      alert('Please select check-in and check-out dates');
      return false;
    }
    if (new Date(bookingData.checkInDate) >= new Date(bookingData.checkOutDate)) {
      alert('Check-out date must be after check-in date');
      return false;
    }
    if (!bookingData.agreeToTerms) {
      alert('Please agree to the Terms & Conditions and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleBookNow = () => {
    if (!validateBookingForm()) {
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate sending OTP (bypass actual API call for now)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setShowConfirmPopup(false);
      setCurrentStep('otp-verification');
      alert('OTP sent to your phone number: +977 ' + bookingData.phone + '\nFor testing, use OTP: 1111');
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  const handleVerifyOTP = async () => {
    if (!bookingData.otp || bookingData.otp.length !== 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }

    if (bookingData.otp !== '1111') {
      alert('Invalid OTP. Please use 1111 for testing.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Submit booking after OTP verification
      const bookingResult = await submitBooking();
      
      setBookingData(prev => ({ ...prev, isVerified: true }));
      setBookingId(bookingResult.bookingId || 'BK' + Date.now());
      setCurrentStep('success');
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Booking submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitBooking = async () => {
    try {
      const bookingPayload = {
        hotelId: hotelId || '',
        guestName: `${bookingData.firstName} ${bookingData.lastName}`,
        guestPhone: bookingData.phone,
        guestEmail: bookingData.email,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests,
        rooms: bookingData.rooms,
        roomType: bookingData.roomType,
        roomPrice: bookingData.roomPrice,
        totalAmount: bookingData.totalAmount,
        specialRequests: bookingData.specialRequests,
        paymentMethod: bookingData.paymentMethod
      };

      // Simulate booking submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock success result
      return {
        success: true,
        bookingId: 'BK' + Date.now(),
        message: 'Booking confirmed successfully'
      };
    } catch (error) {
      console.error('Booking submission failed:', error);
      throw error;
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('OTP resent successfully to +977 ' + bookingData.phone + '\nFor testing, use OTP: 1111');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingForm = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Booking Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
          
          <div className="flex items-start space-x-4 mb-6">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop" 
              alt="Hotel" 
              className="w-20 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{hotelData?.name || 'Hotel Everest View'}</h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotelData?.address || 'Thamel, Kathmandu'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">Check-in</p>
                <p className="text-gray-600">
                  {bookingData.checkInDate === new Date().toISOString().split('T')[0] ? 'Today' : 
                   new Date(bookingData.checkInDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">Check-out</p>
                <p className="text-gray-600">
                  {bookingData.checkOutDate === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? 'Tomorrow' : 
                   new Date(bookingData.checkOutDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <p className="font-medium">Guests</p>
                <p className="text-gray-600">{bookingData.guests} people</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 text-gray-400 flex items-center justify-center">
                <div className="w-3 h-3 border border-gray-400 rounded"></div>
              </div>
              <div>
                <p className="font-medium">Rooms</p>
                <p className="text-gray-600">{bookingData.rooms} room</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <Input
                value={bookingData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <Input
                value={bookingData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={bookingData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +977
                </span>
                <Input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <Textarea
              value={bookingData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requests or preferences..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
          
          <div className="space-y-4">
            <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pay-at-property"
                  checked={true}
                  readOnly
                  className="mr-3 text-blue-600"
                />
                <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <span className="font-medium text-blue-900">Pay at Property</span>
                  <p className="text-sm text-blue-700 mt-1">You can pay when you arrive at the hotel</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center text-gray-600">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm">Secure booking - No payment required now</span>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={bookingData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
              className="mt-1"
            />
            <div className="text-sm text-gray-600">
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the <span className="text-blue-600 hover:underline">Terms & Conditions</span> and{' '}
                <span className="text-blue-600 hover:underline">Privacy Policy</span>. I understand the cancellation policy and booking terms.
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleBookNow}
            disabled={!bookingData.agreeToTerms}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-3"
          >
            Confirm Booking ₹{bookingData.totalAmount.toLocaleString()}
          </Button>
        </div>
      </div>

      {/* Price Breakdown Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Price Breakdown</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">{bookingData.rooms} room × {bookingData.totalNights} night</span>
              <span className="font-medium">₹{bookingData.subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & service fees</span>
              <span className="font-medium">₹{bookingData.taxes.toLocaleString()}</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-blue-600">₹{bookingData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center text-green-800">
              <Lock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">🔒 Your booking is secured with 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



  const renderOTPVerification = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone Number</h2>
          <p className="text-gray-600">We've sent a 4-digit OTP to +977 {bookingData.phone}</p>
          <p className="text-sm text-blue-600 mt-2">For testing, use OTP: <strong>1111</strong></p>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter 4-digit OTP *
          </label>
          <Input
            type="text"
            value={bookingData.otp}
            onChange={(e) => handleInputChange('otp', e.target.value)}
            placeholder="1111"
            maxLength={4}
            className="text-center text-lg tracking-widest"
            required
          />
        </div>

        <div className="flex space-x-4 mt-6">
          <Button
            onClick={() => setCurrentStep('booking-form')}
            variant="outline"
            className="flex-1"
          >
            Back to Form
          </Button>
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading || !bookingData.otp || bookingData.otp.length !== 4}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </div>
            ) : (
              'Verify & Complete Booking'
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm mt-4">
          <span className="text-gray-600">Didn't receive the code?</span>
          <button 
            type="button"
            className="text-green-600 hover:text-green-700 font-medium"
            onClick={handleResendOTP}
            disabled={isLoading}
          >
            {isLoading ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-green-900 mb-4">Booking Successful! 🎉</h2>
        <p className="text-gray-600 text-lg mb-6">
          Your booking has been confirmed. You will receive a confirmation message shortly.
        </p>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
          <h3 className="font-semibold text-green-900 mb-4">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Booking ID:</span>
              <span className="font-medium text-green-900">{bookingId || 'BK' + Date.now()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Guest Name:</span>
              <span className="font-medium text-green-900">{bookingData.firstName} {bookingData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Hotel:</span>
              <span className="font-medium text-green-900">{hotelData?.name || 'Hotel Everest View'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Check-in:</span>
              <span className="font-medium text-green-900">{new Date(bookingData.checkInDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Check-out:</span>
              <span className="font-medium text-green-900">{new Date(bookingData.checkOutDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Total Amount:</span>
              <span className="font-medium text-green-900">₹{bookingData.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-blue-700 space-y-1 text-left">
            <li>• You will receive a confirmation SMS/Email</li>
            <li>• Please arrive at the hotel on your check-in date</li>
            <li>• Payment will be collected at the property</li>
            <li>• Contact the hotel directly for any changes</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={() => navigate('/hotels')}
            variant="outline"
            className="flex-1"
          >
            Browse More Hotels
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );

  const renderConfirmPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Booking</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Guest:</span>
            <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">+977 {bookingData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hotel:</span>
            <span className="font-medium">{hotelData?.name || 'Hotel Everest View'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dates:</span>
            <span className="font-medium">
              {new Date(bookingData.checkInDate).toLocaleDateString()} - {new Date(bookingData.checkOutDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-blue-600">₹{bookingData.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 mb-6">
          <p className="text-sm text-yellow-800">
            We'll send an OTP to your phone number to confirm this booking.
          </p>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={() => setShowConfirmPopup(false)}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendOTP}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </div>
            ) : (
              'Send OTP'
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'booking-form':
        return renderBookingForm();
      case 'otp-verification':
        return renderOTPVerification();
      case 'success':
        return renderSuccess();
      default:
        return renderBookingForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="sm"
              className="mr-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Premium Booking</h1>
              {currentStep === 'booking-form' && hotelData && (
                <p className="text-gray-600 mt-1">{hotelData.name} • {hotelData.address}</p>
              )}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { id: 'booking-form', title: 'Booking Details', icon: User },
                { id: 'otp-verification', title: 'Verification', icon: Phone },
                { id: 'success', title: 'Success', icon: Award }
              ].map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const stepOrder = ['booking-form', 'otp-verification', 'success'];
                const currentIndex = stepOrder.indexOf(currentStep);
                const stepIndex = stepOrder.indexOf(step.id);
                const isCompleted = currentIndex > stepIndex;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      isCompleted 
                        ? 'bg-green-600 text-white' 
                        : isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index < 2 && (
                      <div className={`flex-1 h-1 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Booking Details</span>
              <span>OTP Verification</span>
              <span>Success</span>
            </div>
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && renderConfirmPopup()}

      <Footer />
    </div>
  );
};

export default BookingPage;