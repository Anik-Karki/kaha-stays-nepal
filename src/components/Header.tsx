import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Globe,
  Menu,
  X,
  MapPin,
  Star,
  LogIn,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    hotels: any[];
    places: any[];
  }>({ hotels: [], places: [] });
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Exact hotel data from your application
  const hotelData = [
    {
      id: 1,
      name: "Hotel Everest View",
      location: "Thamel, Kathmandu",
      rating: 4.8,
      reviewCount: 234,
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      verified: true,
      roomTypes: ["economy", "standarddelux", "suite"],
      amenities: ["wifi", "parking", "restaurant", "breakfast"],
      city: "kathmandu",
    },
    {
      id: 2,
      name: "Lake Palace Hotel",
      location: "Lakeside, Pokhara",
      rating: 4.6,
      reviewCount: 189,
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop",
      verified: true,
      roomTypes: ["standarddelux", "suite", "family"],
      amenities: ["wifi", "restaurant", "breakfast", "spa"],
      city: "pokhara",
    },
    {
      id: 3,
      name: "Mountain Lodge",
      location: "Nagarkot, Bhaktapur",
      rating: 4.4,
      reviewCount: 156,
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      verified: false,
      roomTypes: ["economy", "standarddelux"],
      amenities: ["wifi", "parking", "breakfast"],
      city: "bhaktapur",
    },
    {
      id: 4,
      name: "Heritage Grand",
      location: "Durbar Square, Kathmandu",
      rating: 4.9,
      reviewCount: 312,
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      verified: true,
      roomTypes: ["suite", "family"],
      amenities: ["wifi", "parking", "restaurant", "breakfast", "spa"],
      city: "kathmandu",
    },
    {
      id: 5,
      name: "Safari Resort Chitwan",
      location: "Sauraha, Chitwan",
      rating: 4.5,
      reviewCount: 178,
      price: 3800,
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop",
      verified: true,
      roomTypes: ["standarddelux", "family"],
      amenities: ["wifi", "restaurant", "breakfast"],
      city: "chitwan",
    },
    {
      id: 6,
      name: "Buddha Garden Hotel",
      location: "Lumbini Garden, Lumbini",
      rating: 4.7,
      reviewCount: 145,
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1544640344-2b89510b1fe8?w=400&h=300&fit=crop",
      verified: true,
      roomTypes: ["economy", "standarddelux", "suite"],
      amenities: ["wifi", "parking", "restaurant", "breakfast"],
      city: "lumbini",
    },
  ];

  // Extract unique places from hotel data
  const getUniqueLocations = () => {
    const cities = [...new Set(hotelData.map((hotel) => hotel.city))];
    const areas = [
      ...new Set(hotelData.map((hotel) => hotel.location.split(",")[0].trim())),
    ];
    const allPlaces = [...new Set([...cities, ...areas])];

    return allPlaces.map((place) => ({
      name: place,
      type: "location",
      hotelsCount: hotelData.filter(
        (hotel) =>
          hotel.city.toLowerCase() === place.toLowerCase() ||
          hotel.location.toLowerCase().includes(place.toLowerCase())
      ).length,
    }));
  };

  // Enhanced search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();

      // Search hotels
      const matchingHotels = hotelData.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query) ||
          hotel.city.toLowerCase().includes(query)
      );

      // Search places
      const allLocations = getUniqueLocations();
      const matchingPlaces = allLocations.filter((place) =>
        place.name.toLowerCase().includes(query)
      );

      setSearchResults({
        hotels: matchingHotels.slice(0, 4), // Show max 4 hotels
        places: matchingPlaces.slice(0, 3), // Show max 3 places
      });
      setShowResults(true);
    } else {
      setSearchResults({ hotels: [], places: [] });
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      navigate(`/hotels?location=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  const handleHotelClick = (hotel: { id: number; name: string }) => {
    navigate(`/hotels/${hotel.id}`);
    setShowResults(false);
    setSearchQuery("");
  };

  const handlePlaceClick = (place: { name: string }) => {
    navigate(`/hotels?location=${encodeURIComponent(place.name)}`);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/50 sticky top-0 z-50 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 flex-shrink-0">
            <img
              src="/kaha.jpg"
              alt="Kaha Hotel"
              className="w-14 h-14 rounded-xl object-cover shadow-lg ring-2 ring-emerald-100"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                KAHA
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ml-1">
                Hotel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Gap */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/hotels"
              className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
            >
              Hotels
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/help"
              className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
            >
              Help Center
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Simple Search Bar - No Overlay Issues */}
          <div className="hidden xl:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-300 hover:border-emerald-400 focus-within:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md">
                <Search className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <Input
                  placeholder="Search hotels by name or place..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="border-none bg-transparent p-0 text-base font-medium focus:ring-0 w-full focus:outline-none placeholder:text-gray-500"
                />
              </div>

              {/* Enhanced Search Results - Hotels and Places */}
              {showResults &&
                (searchResults.hotels?.length > 0 ||
                  searchResults.places?.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[60]">
                    <div className="max-h-96 overflow-y-auto">
                      {/* Places Section */}
                      {searchResults.places?.length > 0 && (
                        <div>
                          <div className="p-4 bg-gray-50 border-b border-gray-100">
                            <div className="text-sm font-semibold text-gray-700 flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                              Places ({searchResults.places.length})
                            </div>
                          </div>
                          {searchResults.places.map((place, index) => (
                            <div
                              key={`place-${index}`}
                              onClick={() => handlePlaceClick(place)}
                              className="flex items-center space-x-4 p-4 hover:bg-emerald-50 cursor-pointer transition-colors duration-200 border-b border-gray-50"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-emerald-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 capitalize">
                                  {place.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {place.hotelsCount} hotel
                                  {place.hotelsCount !== 1 ? "s" : ""} available
                                </p>
                              </div>
                              <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                                Location
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Hotels Section */}
                      {searchResults.hotels?.length > 0 && (
                        <div>
                          <div className="p-4 bg-gray-50 border-b border-gray-100">
                            <div className="text-sm font-semibold text-gray-700 flex items-center">
                              <Building className="w-4 h-4 mr-2 text-emerald-500" />
                              Hotels ({searchResults.hotels.length})
                            </div>
                          </div>
                          {searchResults.hotels.map((hotel) => (
                            <div
                              key={hotel.id}
                              onClick={() => handleHotelClick(hotel)}
                              className="flex items-center space-x-4 p-4 hover:bg-emerald-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                            >
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-14 h-14 rounded-lg object-cover shadow-sm"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold text-gray-900 truncate">
                                    {hotel.name}
                                  </h4>
                                  {hotel.verified && (
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-white text-xs">
                                        ✓
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-1">
                                  <MapPin className="w-4 h-4 mr-1 text-emerald-500 flex-shrink-0" />
                                  <span className="truncate">
                                    {hotel.location}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                    <span className="text-sm font-medium">
                                      {hotel.rating} ({hotel.reviewCount}{" "}
                                      reviews)
                                    </span>
                                  </div>
                                  <div className="text-base font-bold text-emerald-600">
                                    ₹{hotel.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* View All Results */}
                    {searchQuery && (
                      <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={() => handleSearch()}
                          className="w-full text-left p-3 hover:bg-white rounded-lg transition-colors duration-200 flex items-center"
                        >
                          <Search className="w-4 h-4 mr-3 text-emerald-500" />
                          <span className="text-sm font-medium text-gray-700">
                            View all results for "{searchQuery}"
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

              {/* No Results */}
              {showResults &&
                searchQuery &&
                !searchResults.hotels?.length &&
                !searchResults.places?.length && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 text-center z-[60]">
                    <div className="text-gray-500 mb-3">
                      No hotels or places found for "{searchQuery}"
                    </div>
                    <button
                      onClick={() => handleSearch()}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Search all results →
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">EN</span>
            </button>
            <Link to="/owner-login">
              <Button
                variant="outline"
                size="sm"
                className="text-xs lg:text-sm"
              >
                <LogIn className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">Owner Login</span>
                <span className="lg:hidden">Login</span>
              </Button>
            </Link>
            <Link to="/hotel-owner-register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs lg:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
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
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            {/* Simple Mobile Search - No Overlay Issues */}
            <div className="mb-6 px-4">
              <div className="relative">
                <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-300 focus-within:border-emerald-500 shadow-sm">
                  <Search className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <Input
                    placeholder="Search hotels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchQuery && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    className="border-none bg-transparent p-0 text-base font-medium focus:ring-0 w-full focus:outline-none placeholder:text-gray-500"
                  />
                </div>

                {/* Mobile Search Results - Hotels and Places */}
                {showResults &&
                  (searchResults.hotels?.length > 0 ||
                    searchResults.places?.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[60]">
                      <div className="max-h-80 overflow-y-auto">
                        {/* Mobile Places */}
                        {searchResults.places?.length > 0 && (
                          <div>
                            <div className="p-3 bg-gray-50 border-b border-gray-100">
                              <div className="text-xs font-semibold text-gray-700 flex items-center">
                                <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
                                Places
                              </div>
                            </div>
                            {searchResults.places.map((place, index) => (
                              <div
                                key={`place-${index}`}
                                onClick={() => handlePlaceClick(place)}
                                className="flex items-center space-x-3 p-3 hover:bg-emerald-50 cursor-pointer transition-colors duration-200 border-b border-gray-50"
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                                  <MapPin className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 text-sm capitalize">
                                    {place.name}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {place.hotelsCount} hotels
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Mobile Hotels */}
                        {searchResults.hotels?.length > 0 && (
                          <div>
                            <div className="p-3 bg-gray-50 border-b border-gray-100">
                              <div className="text-xs font-semibold text-gray-700 flex items-center">
                                <Building className="w-3 h-3 mr-1 text-emerald-500" />
                                Hotels
                              </div>
                            </div>
                            {searchResults.hotels.map((hotel) => (
                              <div
                                key={hotel.id}
                                onClick={() => handleHotelClick(hotel)}
                                className="flex items-center space-x-3 p-3 hover:bg-emerald-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                              >
                                <img
                                  src={hotel.image}
                                  alt={hotel.name}
                                  className="w-12 h-12 rounded-lg object-cover shadow-sm"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 text-sm truncate">
                                    {hotel.name}
                                  </div>
                                  <div className="text-xs text-gray-600 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">
                                      {hotel.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm font-bold text-emerald-600">
                                  ₹{hotel.price.toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <nav className="flex flex-col space-y-4 px-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/hotels"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hotels
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/help"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help Center
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link
                  to="/owner-login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Owner Login
                  </Button>
                </Link>
                <Link
                  to="/hotel-owner-register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 w-full shadow-lg"
                  >
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
