
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, ChevronDown, ChevronUp, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I book a hotel through Kaha?',
      answer: 'Simply search for your destination, select your dates and number of guests, browse available hotels, choose your preferred room, and complete the booking process with your details and payment.'
    },
    {
      question: 'What is KahaTAG verification?',
      answer: 'KahaTAG is our proprietary verification system that ensures all hotel listings are authentic with accurate location data. Verified hotels display a green KahaTAG badge, guaranteeing their legitimacy and exact location.'
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking based on the hotel\'s cancellation policy. Most hotels offer free cancellation up to 24 hours before check-in. Check your booking confirmation for specific terms.'
    },
    {
      question: 'How do I contact the hotel directly?',
      answer: 'You can contact hotels directly through our in-app chat feature or call function. These options are available on the hotel detail page and in your booking confirmation.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard), mobile banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      question: 'What if I can\'t find the hotel I booked?',
      answer: 'All KahaTAG verified hotels have precise GPS coordinates. Use the in-app navigation feature to get turn-by-turn directions. If you still have trouble, contact our 24/7 support team.'
    },
    {
      question: 'How do I leave a review?',
      answer: 'After your stay, you\'ll receive an email invitation to review your experience. You can also log into your account and find your booking history to leave a review anytime.'
    },
    {
      question: 'Is it safe to book through Kaha?',
      answer: 'Absolutely. All our hotels are verified, payments are secure, and we have a dedicated customer support team. We also offer booking protection and will assist with any issues during your stay.'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      description: 'Call us anytime for immediate assistance',
      contact: '+977 9801845410',
      availability: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed queries via email',
      contact: 'support@kaha.com.np',
      availability: 'Response within 4 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team instantly',
      contact: 'Available in mobile app',
      availability: '6 AM - 10 PM'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
      <Header />
      
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 60 60">
            <pattern id="help-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#help-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            24/7 Premium Support Available
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Center</span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-emerald-100">
            Find answers to your questions or get in touch with our expert support team. 
            We're here to make your Nepal travel experience seamless and memorable.
          </p>
          
          {/* Premium Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <Input
                placeholder="Search for help articles, booking issues, or travel tips..."
                className="pl-20 pr-6 py-6 text-lg bg-white/95 backdrop-blur-xl text-gray-900 border-2 border-white/50 rounded-2xl shadow-2xl focus:border-emerald-300 focus:ring-4 focus:ring-emerald-200/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Booking Issues', 'Payment Problems', 'Hotel Verification', 'Cancellation Policy'].map((suggestion, index) => (
                <button 
                  key={index}
                  onClick={() => setSearchQuery(suggestion.toLowerCase())}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300 shadow-lg"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No matching questions found. Try a different search term or contact our support team.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{method.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                          <p className="text-sm font-medium text-blue-600 mb-1">{method.contact}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {method.availability}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Quick Tips</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Have your booking reference ready</li>
                  <li>• Check your email for booking confirmations</li>
                  <li>• Use KahaTAG navigation for directions</li>
                  <li>• Contact hotels directly for special requests</li>
                </ul>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-red-900 mb-2">Emergency Support</h3>
              <p className="text-sm text-red-700 mb-3">
                For urgent issues during your stay, contact our emergency hotline:
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: +977 9801845410
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
