
import React from 'react';
import { Search, MousePointer, CreditCard, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: '01',
      title: 'Explore Nepal',
      description: 'Search destinations across Nepal - from mountain lodges to city hotels',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: MousePointer,
      step: '02',
      title: 'Choose Your Stay',
      description: 'Browse authentic accommodations, read reviews, and select your perfect Nepal experience',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      icon: CreditCard,
      step: '03',
      title: 'Book & Experience',
      description: 'Secure booking with local hosts and start your authentic Nepal adventure',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book your perfect stay in just three simple steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines - Desktop Only */}
            <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300"></div>
            <div className="hidden md:block absolute top-20 left-2/3 right-0 h-0.5 bg-gradient-to-r from-teal-300 to-green-300 transform translate-x-4"></div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-4 border-gray-200 rounded-full mb-6 group-hover:border-emerald-300 transition-colors duration-300 relative z-10">
                    <span className="text-xl font-bold text-gray-600 group-hover:text-emerald-600 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-8 mb-8">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 transform scale-110"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
