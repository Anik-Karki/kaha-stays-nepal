
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, MapPin, Users, Award, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    { name: 'Rajesh Hamal', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Priya Sharma', role: 'Head of Operations', image: '👩‍💼' },
    { name: 'Amit Thapa', role: 'Technology Lead', image: '👨‍💻' },
    { name: 'Sita Rai', role: 'Customer Experience', image: '👩‍🎓' }
  ];

  const achievements = [
    { number: '500+', label: 'Verified Hotels' },
    { number: '50,000+', label: 'Happy Guests' },
    { number: '25+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />
      
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 60 60">
            <pattern id="about-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 50,000+ travelers since 2020
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">KAHA Hotel</span>
            </h1>
            <p className="text-xl mb-12 leading-relaxed text-emerald-100 max-w-4xl mx-auto">
              Nepal's most trusted hotel booking platform, powered by verified location technology and 
              dedicated to connecting travelers with authentic Nepalese hospitality experiences.
            </p>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-emerald-400 via-teal-500 to-green-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 rounded-full opacity-20 animate-pulse delay-1000 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Premium Mission Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Award className="w-4 h-4 mr-2" />
              Our Mission & Vision
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
              Revolutionizing Travel in Nepal
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              At KAHA Hotel, we believe that every traveler deserves a trustworthy and seamless booking experience. 
              We leverage cutting-edge location verification technology through our KahaTAG system to ensure that 
              every hotel listing is authentic, accurate, and reliable. Our mission is to connect the world with 
              Nepal's incredible hospitality while supporting local communities.
            </p>
          </div>

          {/* Premium Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">KahaTAG Verified</h3>
              <p className="text-gray-600 leading-relaxed">Every hotel is verified through our proprietary KahaTAG location system for authenticity</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Precise Locations</h3>
              <p className="text-gray-600 leading-relaxed">GPS-accurate location data with turn-by-turn navigation to your destination</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Local Expertise</h3>
              <p className="text-gray-600 leading-relaxed">Built by Nepalese locals who understand the culture and hospitality landscape</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">Rigorous quality checks and continuous monitoring of all hotel listings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Trusted by thousands of travelers across Nepal
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600">
            Passionate individuals working to revolutionize travel in Nepal
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">{member.image}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions about our platform or want to list your hotel? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-4 h-4 mr-2" />
              Call Us: +977 9801845410
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Email: info@kaha.com.np
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
