import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, X, MapPin, Users, Calendar, LogIn, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchDetail, setShowSearchDetail] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchLocation.trim()) {
      navigate(`/hotels?location=${encodeURIComponent(searchLocation.trim())}`);
      setShowSearchDetail(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-900">KAHA</span>
              <span className="text-sm text-blue-600 ml-1">Hotel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors">Hotels</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors">Help Center</Link>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden xl:flex items-center relative flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div 
                className="flex items-center bg-gray-50 rounded-lg px-3 py-2 cursor-pointer border border-gray-200 hover:border-blue-300 transition-colors w-full"
                onClick={() => setShowSearchDetail(!showSearchDetail)}
              >
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <Input
                  placeholder="Search hotels, locations..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-none bg-transparent p-0 text-sm focus:ring-0 w-full"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              {showSearchDetail && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 right-0">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          placeholder="Where are you going?" 
                          className="pl-10" 
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input type="date" className="pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input type="date" className="pl-10" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Number of guests" type="number" className="pl-10" />
                      </div>
                    </div>
                    <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                      Search Hotels
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">EN</span>
            </button>
            <Link to="/hotel-owner-login">
              <Button variant="outline" size="sm" className="text-xs lg:text-sm">
                <LogIn className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">Owner Login</span>
                <span className="lg:hidden">Login</span>
              </Button>
            </Link>
            <Link to="/hotel-owner-register">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs lg:text-sm">
                <Building className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">List Your Hotel</span>
                <span className="lg:hidden">List Hotel</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            {/* Mobile Search */}
            <div className="mb-4 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search hotels, locations..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
            </div>

            <nav className="flex flex-col space-y-4 px-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Hotels</Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/help" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Help Center</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link to="/hotel-owner-login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Owner Login
                  </Button>
                </Link>
                <Link to="/hotel-owner-register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full">
                    <Building className="w-4 h-4 mr-2" />
                    List Your Hotel
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
