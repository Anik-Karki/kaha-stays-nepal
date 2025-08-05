
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How It Works', href: '/help' },
        { name: 'Careers', href: '#' },
        { name: 'Contact Us', href: '/help' }
      ]
    },
    {
      title: 'For Hotels',
      links: [
        { name: 'List Your Hotel', href: '/hotel-owner-register' },
        { name: 'Owner Login', href: '/hotel-owner-login' },
        { name: 'Partner Dashboard', href: '/hotel-admin' },
        { name: 'Success Stories', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Categories', href: '/categories' },
        { name: 'Safety Guidelines', href: '#' },
        { name: 'Terms & Privacy', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <span className="font-bold text-2xl">KAHA</span>
                  <span className="text-blue-400 ml-1">Hotel</span>
                </div>
              </Link>
              
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Nepal's trusted hotel booking platform. Discover verified hotels with our KahaTAG system.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Anamnagar, Kathmandu</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+977 9801845410</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@kaha.com.np</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 KAHA Hotel. All rights reserved. Made with ❤️ in Nepal
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
