
import React from 'react';
import { Building, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JoinAsPartner = () => {
  const benefits = [
    'Reach 50,000+ active travelers',
    'Zero commission for first 3 months',
    'Free KahaTAG verification',
    'Professional photography support',
    ' 24/7 booking management',
    'Analytics and insights dashboard'
  ];

  const stats = [
    { icon: Building, value: '1000+', label: 'Partner Hotels' },
    { icon: Users, value: '50K+', label: 'Monthly Travelers' },
    { icon: TrendingUp, value: '₹50L+', label: 'Monthly Revenue' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 60 60">
          <pattern id="partner-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 5 L45 25 L30 45 L15 25 Z" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#partner-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4 mr-2" />
              Partner with KAHA Hotel
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Join Nepal's Leading
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Hotel Platform
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Grow your hotel business with KAHA's trusted platform. Reach more guests, increase bookings, and build your digital presence with our comprehensive hotel management solution.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg">
                List My Hotel
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-orange-50">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Partner Success Story */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Hotel Success Story</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      "Since joining KAHA Hotel, our bookings increased by 150% and we gained access to travelers we never reached before."
                    </p>
                    <div className="flex items-center text-sm">
                      <div className="font-medium text-orange-600">Raj Kumar</div>
                      <div className="text-gray-500 mx-2">•</div>
                      <div className="text-gray-600">Hotel Mountain View, Pokhara</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partnership Benefits */}
              <div className="mt-6">
                <h4 className="font-bold text-gray-900 mb-4">Why Hotels Choose KAHA:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Verified guest reviews increase trust</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time booking management</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">Marketing support & promotion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsPartner;
