import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, LogIn, BarChart3 } from 'lucide-react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Hotel className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 New Owner Login System
        </h1>
        
        <p className="text-gray-600 mb-8">
          Clean, simple, and working hotel management system
        </p>

        <div className="space-y-4">
          <Link 
            to="/owner-login"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Go to Owner Login
          </Link>

          <Link 
            to="/"
            className="w-full border-2 border-emerald-600 text-emerald-600 py-3 px-4 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center"
          >
            <Hotel className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">✅ What's New:</h3>
          <ul className="text-sm text-blue-700 space-y-1 text-left">
            <li>• Simple login (any email/password works)</li>
            <li>• Clean dashboard with stats</li>
            <li>• Room management</li>
            <li>• Booking management</li>
            <li>• No complex dependencies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestPage;