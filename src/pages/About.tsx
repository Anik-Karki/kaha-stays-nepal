
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Kaha Hotel</h1>
            <p className="text-xl mb-8">
              Nepal's most trusted hotel booking platform, powered by verified location technology
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Kaha Hotel, we believe that every traveler deserves a trustworthy and seamless booking experience. 
              We leverage cutting-edge location verification technology through our KahaTAG system to ensure that 
              every hotel listing is authentic, accurate, and reliable.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Verified Hotels</h3>
              <p className="text-sm text-gray-600">Every hotel is verified through our KahaTAG system</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Accurate Locations</h3>
              <p className="text-sm text-gray-600">Precise location data with in-app navigation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-sm text-gray-600">Built by locals for travelers to Nepal</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Rigorous quality checks for all listings</p>
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
