
import React from 'react';
import { Smartphone, Download, Star } from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <pattern id="app-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#app-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">4.8 stars on both app stores</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Explore Nepal 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                On The Go
              </span>
            </h2>
            
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Download our mobile app for seamless booking, real-time updates, and discover authentic Nepal experiences wherever you are.
            </p>

            {/* App Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">✓</span>
                </div>
                <span className="font-medium">Offline Access</span>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">🔔</span>
                </div>
                <span className="font-medium">Push Notifications</span>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">📍</span>
                </div>
                <span className="font-medium">GPS Navigation</span>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">💰</span>
                </div>
                <span className="font-medium">Exclusive Deals</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#" className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold transition-colors duration-300 transform hover:scale-105">
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </a>

              <a href="#" className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl font-semibold transition-colors duration-300 transform hover:scale-105">
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[640px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-emerald-600 h-12 flex items-center justify-between px-6 text-white text-sm">
                    <span>9:41</span>
                    <span>Kaha Stays Nepal</span>
                    <span>100%</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 space-y-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                      <h3 className="font-bold text-gray-900 mb-2">Discover Nepal Stays</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Smartphone className="w-4 h-4 mr-2" />
                        <span>12 authentic stays found nearby</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Nepal Stay {i}</div>
                            <div className="text-sm text-gray-600">⭐ 4.{i + 5} • ₹{2000 + i * 500}/night</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/3 -left-8 w-6 h-6 bg-green-400 rounded-full opacity-70 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
