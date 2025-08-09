import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, LogIn, Eye, EyeOff } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple demo login - any email/password works
    setTimeout(() => {
      // Store simple auth in localStorage
      localStorage.setItem('hotelOwnerAuth', JSON.stringify({
        isLoggedIn: true,
        user: {
          name: 'Hotel Owner',
          email: formData.email,
          role: 'owner'
        }
      }));
      
      setIsLoading(false);
      navigate('/owner-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotel Owner Login</h1>
          <p className="text-gray-600">Access your hotel management dashboard</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Demo Login:</h3>
          <p className="text-sm text-blue-700 mb-2">Use any email and password to login</p>
          <button
            type="button"
            onClick={() => setFormData({ email: 'owner@hotel.com', password: 'demo123' })}
            className="text-xs bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded transition-colors"
          >
            Fill Demo Credentials
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="w-5 h-5 mr-2" />
                Login to Dashboard
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Demo mode - Use any credentials to access the dashboard
          </p>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerLogin;