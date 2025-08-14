import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building, Phone, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OTPVerification from '../components/OTPVerification';
import { useAuthStore } from '@/stores/authStore';

const HotelOwnerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    contactNumber: '',
    password: '',
    rememberMe: false
  });

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/owner-dashboard';

  const handlePhoneLogin = async () => {
    if (!loginData.contactNumber || loginData.contactNumber.length < 10) {
      alert('Please enter a valid contact number');
      return;
    }

    setIsLoading(true);
    try {
      // Try login with auth store (for demo, use owner@hotel.com)
      const success = await login('owner@hotel.com', loginData.password || 'demo123');

      if (success) {
        // Also set legacy auth for OwnerDashboard compatibility
        localStorage.setItem("hotelOwnerAuth", JSON.stringify({
          user: {
            name: 'Hotel Owner',
            email: 'owner@hotel.com',
            phone: loginData.contactNumber
          }
        }));

        alert('Login successful!');
        navigate(from, { replace: true });
      } else {
        alert('Invalid credentials. Try password: demo123');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = () => {
    setContactNumber(loginData.contactNumber);
    setLoginStep('otp');
  };

  const handleOTPVerificationComplete = async (data: { otp: string; fullName?: string; contactNumber: string; requiresName: boolean }) => {
    try {
      // For demo, login with owner credentials after OTP verification
      const success = await login('owner@hotel.com', 'demo123');

      if (success) {
        // Also set legacy auth for OwnerDashboard compatibility
        localStorage.setItem("hotelOwnerAuth", JSON.stringify({
          user: {
            name: 'Hotel Owner',
            email: 'owner@hotel.com',
            phone: data.contactNumber
          }
        }));

        alert('Login successful!');
        navigate(from, { replace: true });
      } else {
        alert('Login failed after OTP verification');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  if (loginStep === 'otp') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotel Owner Login</h1>
                <p className="text-gray-600">Verify your phone number to continue</p>
              </div>

              <OTPVerification
                contactNumber={contactNumber}
                onContactNumberChange={setContactNumber}
                onVerificationComplete={handleOTPVerificationComplete}
              />

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setLoginStep('phone')}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  ← Back to login options
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotel Owner Login</h1>
              <p className="text-gray-600">Access your hotel management dashboard</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    value={loginData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your registered 10-digit mobile number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password (Optional)
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to login with OTP verification
                </p>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="space-y-3">
                {loginData.password ? (
                  <Button
                    onClick={handlePhoneLogin}
                    disabled={isLoading || !loginData.contactNumber}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Logging in...
                      </div>
                    ) : (
                      'Login with Password'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleOTPLogin}
                    disabled={!loginData.contactNumber}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Login with OTP
                  </Button>
                )}
              </div>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Don't have an account?
                </p>
                <Link to="/hotel-owner-register">
                  <Button variant="outline" className="w-full">
                    Register Your Hotel
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Demo Login</h4>
                <p className="text-sm text-blue-700">
                  For testing purposes, enter any 10-digit number to login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelOwnerLogin;