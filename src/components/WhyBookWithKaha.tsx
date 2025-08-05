
import React from 'react';
import { Shield, Navigation, Hotel, Camera, MessageCircle } from 'lucide-react';

const WhyBookWithKaha = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Hotels & KahaTAG Identity',
      description: 'Every hotel is verified through our KahaTAG system, ensuring authenticity and quality standards.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Navigation,
      title: 'In-App Navigation to Hotel',
      description: 'Get precise directions to your hotel with our integrated navigation system.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Hotel,
      title: 'Trusted Room Categories & Transparent Pricing',
      description: 'Clear room categories with honest pricing. No hidden fees or surprises.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Camera,
      title: '360° Photos & Immersive Visuals',
      description: 'Explore hotels virtually with high-quality 360° photos and virtual tours.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: MessageCircle,
      title: 'In-App Chat & Call with Hosts',
      description: 'Connect directly with hotel hosts through our secure communication platform.',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Book with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Kaha Hotel?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with Nepal's most trusted hotel booking platform, powered by cutting-edge verification technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-8 py-4">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-semibold text-gray-900">
              Trusted by 50,000+ travelers across Nepal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithKaha;
