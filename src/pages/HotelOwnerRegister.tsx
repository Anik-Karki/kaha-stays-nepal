
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, MapPin, Phone, Mail, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OTPVerification from '../components/OTPVerification';
import MapLocationPicker from '../components/MapLocationPicker';
import TagAvailabilityChecker from '../components/TagAvailabilityChecker';
import ImageUpload from '../components/ImageUpload';
import { apiService, helpers } from '../services/api';

const HotelOwnerRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    suggestedTag: '',
    isTagAvailable: false,
    contactNumber: '',
    email: '',
    description: '',
    
    // Location Information
    coordinates: { lat: 27.7172, lon: 85.3240 }, // Default Kathmandu
    addressInfo: null as any,
    wardNo: '',
    municipality: '',
    additionalInfo: '',
    
    // Images
    avatarUrl: '',
    coverImageUrl: '',
    
    // OTP Verification
    otp: '',
    fullName: '',
    requiresName: false,
    isVerified: false,
    currentSubStep: 'phone-input' as 'phone-input' | 'name-input' | 'otp-verification' | 'success',
    
    // Additional fields
    tagLine: '',
    website: '',
    buildingInformation: '',
    floorNo: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Hotel name and tag' },
    { id: 2, title: 'Location', description: 'Map and address' },
    { id: 3, title: 'Images', description: 'Avatar and cover' },
    { id: 4, title: 'Verification', description: 'Phone and submit' }
  ];

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        alert('Please enter hotel name');
        return;
      }
      if (!formData.suggestedTag || !formData.isTagAvailable) {
        alert('Please choose an available Kaha tag');
        return;
      }
      if (!formData.description.trim()) {
        alert('Please enter hotel description');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.wardNo.trim() || !formData.municipality.trim()) {
        alert('Please enter ward number and municipality');
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.isVerified) {
      alert('Please complete phone verification first');
      return;
    }

    setIsLoading(true);
    
    try {
      // Compose the registration data
      const registrationData = helpers.composeDummyProfileFromFormData(
        formData,
        formData.coordinates,
        formData.addressInfo
      );

      // Submit the registration
      const result = await apiService.registerBusiness(registrationData as any);
      
      alert('Registration submitted successfully! We will review your application within 24-48 hours. You can now login with your verified phone number.');
      navigate('/hotel-owner-login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (coordinates: { lat: number; lon: number }, addressInfo: any) => {
    setFormData(prev => ({
      ...prev,
      coordinates,
      addressInfo
    }));
  };

  const handleTagChange = (tag: string, isAvailable: boolean) => {
    setFormData(prev => ({
      ...prev,
      suggestedTag: tag,
      isTagAvailable: isAvailable
    }));
  };

  const handleImageUpload = (imageUrl: string, type: 'avatar' | 'cover') => {
    if (type === 'avatar') {
      setFormData(prev => ({ ...prev, avatarUrl: imageUrl }));
    } else {
      setFormData(prev => ({ ...prev, coverImageUrl: imageUrl }));
    }
  };

  const handleSubmitPhoneNumber = async () => {
    if (!formData.contactNumber || formData.contactNumber.length < 10) {
      alert('Please enter a valid contact number');
      return;
    }

    setIsLoading(true);
    try {
      // Check if the number is registered with KAHA
      const response = await apiService.triggerOTP(formData.contactNumber);
      
      if (response.requiresName) {
        // Number is not registered, ask for name
        setFormData(prev => ({
          ...prev,
          currentSubStep: 'name-input',
          requiresName: true
        }));
      } else {
        // Number is registered, go directly to OTP
        setFormData(prev => ({
          ...prev,
          currentSubStep: 'otp-verification',
          requiresName: false
        }));
      }
    } catch (error) {
      console.error('Failed to check number:', error);
      alert('Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTPWithName = async () => {
    if (!formData.fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    setIsLoading(true);
    try {
      await apiService.triggerOTP(formData.contactNumber);
      setFormData(prev => ({
        ...prev,
        currentSubStep: 'otp-verification'
      }));
    } catch (error) {
      console.error('Failed to send OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await apiService.verifyOTP(formData.contactNumber, formData.otp);
      
      setFormData(prev => ({
        ...prev,
        isVerified: true,
        currentSubStep: 'success'
      }));
      
      // Show success message for a moment, then allow final submission
      setTimeout(() => {
        alert('Phone verification successful! You can now submit your hotel registration.');
      }, 1000);
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await apiService.triggerOTP(formData.contactNumber);
      alert('OTP resent successfully');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = (data: { otp: string; fullName?: string; contactNumber: string; requiresName: boolean }) => {
    setFormData(prev => ({
      ...prev,
      otp: data.otp,
      fullName: data.fullName || '',
      contactNumber: data.contactNumber,
      requiresName: data.requiresName,
      isVerified: true
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your hotel name"
                required
              />
            </div>

            <TagAvailabilityChecker
              businessName={formData.name}
              onTagChange={handleTagChange}
              initialTag={formData.suggestedTag}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your hotel, amenities, and what makes it special..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="hotel@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourhotel.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tag Line (Optional)</label>
              <Input
                value={formData.tagLine}
                onChange={(e) => handleInputChange('tagLine', e.target.value)}
                placeholder="A short catchy phrase about your hotel"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Location Information</h3>
            
            <MapLocationPicker
              onLocationSelect={handleLocationSelect}
              initialCoordinates={formData.coordinates}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ward Number *</label>
                <Input
                  value={formData.wardNo}
                  onChange={(e) => handleInputChange('wardNo', e.target.value)}
                  placeholder="Enter ward number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Municipality *</label>
                <Input
                  value={formData.municipality}
                  onChange={(e) => handleInputChange('municipality', e.target.value)}
                  placeholder="Enter municipality"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Building Information (Optional)</label>
                <Input
                  value={formData.buildingInformation}
                  onChange={(e) => handleInputChange('buildingInformation', e.target.value)}
                  placeholder="Building name or complex"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor Number (Optional)</label>
                <Input
                  value={formData.floorNo}
                  onChange={(e) => handleInputChange('floorNo', e.target.value)}
                  placeholder="Floor number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information (Optional)</label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Any additional location details..."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hotel Images</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ImageUpload
                type="avatar"
                label="Hotel Avatar"
                description="Square image that represents your hotel (recommended: 400x400px)"
                onImageUpload={handleImageUpload}
                currentImageUrl={formData.avatarUrl}
              />
              
              <ImageUpload
                type="cover"
                label="Cover Image"
                description="Wide image showcasing your hotel (recommended: 1200x600px)"
                onImageUpload={handleImageUpload}
                currentImageUrl={formData.coverImageUrl}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Image Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use high-quality images that showcase your hotel's best features</li>
                <li>• Avatar image will be used as your hotel's profile picture</li>
                <li>• Cover image will be displayed prominently on your hotel page</li>
                <li>• Supported formats: JPG, PNG (max 10MB each)</li>
                <li>• Images can be updated later from your dashboard</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Phone Verification & Submit</h3>
            
            {formData.currentSubStep === 'phone-input' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Phone Number</h4>
                  <p className="text-gray-600">We'll check if you're already a KAHA user</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +977
                    </span>
                    <Input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="rounded-l-none"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter your 10-digit mobile number</p>
                </div>

                <Button
                  onClick={handleSubmitPhoneNumber}
                  disabled={isLoading || !formData.contactNumber}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Checking...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What happens when you submit?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We'll check if your number is already registered with KAHA</li>
                    <li>• If registered: Direct OTP verification</li>
                    <li>• If new: We'll ask for your name, then send OTP</li>
                    <li>• After verification, your hotel registration will be complete</li>
                  </ul>
                </div>
              </div>
            )}

            {formData.currentSubStep === 'name-input' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Welcome to KAHA!</h4>
                  <p className="text-gray-600">Your number isn't registered yet. Let's get you set up.</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 font-medium">Phone Number: {formData.contactNumber}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Full Name *</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be used for your KAHA account</p>
                </div>

                <Button
                  onClick={handleRequestOTPWithName}
                  disabled={isLoading || !formData.fullName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending OTP...
                    </div>
                  ) : (
                    'Request OTP'
                  )}
                </Button>
              </div>
            )}

            {formData.currentSubStep === 'otp-verification' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Enter Verification Code</h4>
                  <p className="text-gray-600">We've sent a 6-digit code to {formData.contactNumber}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP *</label>
                  <Input
                    type="text"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || !formData.otp || formData.otp.length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Didn't receive the code?</span>
                  <button 
                    type="button"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Resending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            {formData.currentSubStep === 'success' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-green-900 mb-2">Registration Successful! 🎉</h4>
                  <p className="text-gray-600 text-lg">Welcome to KAHA, {formData.fullName || 'Hotel Owner'}!</p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Your Registration Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Hotel Name:</span>
                      <span className="font-medium text-green-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">KAHA Tag:</span>
                      <span className="font-medium text-green-900">@{formData.suggestedTag}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Contact:</span>
                      <span className="font-medium text-green-900">{formData.contactNumber}</span>
                    </div>
                    {formData.fullName && (
                      <div className="flex justify-between">
                        <span className="text-green-700">Owner Name:</span>
                        <span className="font-medium text-green-900">{formData.fullName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your application is under review (24-48 hours)</li>
                    <li>• You can now login with your verified phone number</li>
                    <li>• Check your email for further instructions</li>
                    <li>• Start preparing your hotel photos and room details</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step.id <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.id < currentStep ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              {steps.map(step => (
                <div key={step.id} className="text-center">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Register Your Hotel</h1>
              <p className="text-gray-600">Join the KahaTAG verified hotel network</p>
            </div>

            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Next Step
                </Button>
              ) : formData.currentSubStep === 'success' ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </div>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>
              ) : (
                <div className="text-sm text-gray-500">
                  Complete phone verification to continue
                </div>
              )}
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/hotel-owner-login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelOwnerRegister;
