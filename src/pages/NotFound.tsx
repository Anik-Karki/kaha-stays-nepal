import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-12">
            <div className="text-9xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              404
            </div>
            <div className="text-6xl mb-8">🏔️</div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              It looks like you've wandered off the beaten path. The page you're
              looking for doesn't exist, but don't worry - there are plenty of
              amazing hotels waiting to be discovered!
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
              <p className="text-gray-700 font-medium">
                <strong>Attempted URL:</strong>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {location.pathname}
                </code>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                <Home className="w-5 h-5 mr-3" />
                Return to Home
              </Button>
            </Link>

            <Link to="/hotels">
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 rounded-xl shadow-lg"
              >
                <Search className="w-5 h-5 mr-3" />
                Search Hotels
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Popular Destinations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Kathmandu", hotels: "180+ hotels", icon: "🏛️" },
                { name: "Pokhara", hotels: "120+ hotels", icon: "🏔️" },
                { name: "Chitwan", hotels: "45+ hotels", icon: "🐘" },
              ].map((destination, index) => (
                <Link
                  key={index}
                  to={`/hotels?location=${encodeURIComponent(
                    destination.name
                  )}`}
                  className="group bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200"
                >
                  <div className="text-4xl mb-3">{destination.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {destination.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {destination.hotels}
                  </p>
                  <div className="flex items-center text-emerald-600 group-hover:translate-x-1 transition-transform duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Explore</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-all duration-300 hover:translate-x-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go back to previous page
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
