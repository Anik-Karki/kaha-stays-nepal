import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "How It Works", href: "/help" },
        { name: "Careers", href: "#" },
        { name: "Contact Us", href: "/help" },
      ],
    },
    {
      title: "For Hotels",
      links: [
        { name: "List Your Hotel", href: "/hotel-owner-register" },
        { name: "Owner Login", href: "/hotel-owner-login" },
        { name: "Partner Dashboard", href: "/hotel-admin" },
        { name: "Success Stories", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Categories", href: "/categories" },
        { name: "Safety Guidelines", href: "#" },
        { name: "Terms & Privacy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 60 60">
          <pattern
            id="footer-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <img
                  src="/kaha.jpg"
                  alt="Kaha Hotel"
                  className="w-14 h-14 rounded-xl object-cover shadow-lg ring-2 ring-emerald-500/20"
                />
                <div>
                  <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    KAHA
                  </span>
                  <span className="text-emerald-400 ml-1 font-semibold">
                    Hotel
                  </span>
                </div>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Nepal's premier hotel booking platform. Discover luxury stays
                and experience the beauty of Nepal with unmatched service.
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
                <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Download App Section */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Download App
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the best deals on your mobile
              </p>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-8 h-8 mr-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-white">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-xl p-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-8 h-8 mr-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-white">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
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
                    className={`w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl flex items-center justify-center hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110 shadow-lg ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
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
