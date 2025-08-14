
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
            
            {!formData.isVerified ? (
              <OTPVerification
                contactNumber={formData.contactNumber}
                onContactNumberChange={(number) => handleInputChange('contactNumber', number)}
                onVerificationComplete={handleVerificationComplete}
              />
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Phone number verified successfully!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Contact: {formData.contactNumber}
                    {formData.fullName && ` | Name: ${formData.fullName}`}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Registration Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hotel Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kaha Tag:</span>
                      <span className="font-medium">{formData.suggestedTag}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">
                        {formData.municipality}, Ward {formData.wardNo}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{formData.contactNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We'll review your application within 24-48 hours</li>
                    <li>• Our team may contact you for additional information</li>
                    <li>• Once approved, you'll receive login credentials</li>
                    <li>• You can then start managing your hotel listings</li>
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
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.isVerified}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
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
