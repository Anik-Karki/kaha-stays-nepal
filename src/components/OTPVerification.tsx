import React, { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { apiService } from '@/services/api';

interface OTPVerificationProps {
  onVerificationComplete: (data: { otp: string; fullName?: string; contactNumber: string; requiresName: boolean }) => void;
  contactNumber: string;
  onContactNumberChange: (number: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onVerificationComplete,
  contactNumber,
  onContactNumberChange
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requiresName, setRequiresName] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');

  const handleTriggerOTP = async () => {
    if (!contactNumber || contactNumber.length < 10) {
      alert('Please enter a valid contact number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.triggerOTP(contactNumber);
      setOtpMessage(response.message);
      setRequiresName(response.requiresName);
      setStep('otp');
    } catch (error) {
      console.error('Failed to trigger OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }

    if (requiresName && !fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    onVerificationComplete({
      otp,
      fullName: requiresName ? fullName : undefined,
      contactNumber,
      requiresName
    });
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await apiService.triggerOTP(contactNumber);
      alert('OTP resent successfully');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'phone') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Your Phone Number</h3>
          <p className="text-gray-600">
            We'll send you an OTP to verify your phone number
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="tel"
              value={contactNumber}
              onChange={(e) => onContactNumberChange(e.target.value)}
              placeholder="98XXXXXXXX"
              className="pl-10"
              maxLength={10}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter your 10-digit mobile number without country code
          </p>
        </div>

        <Button
          onClick={handleTriggerOTP}
          disabled={isLoading || !contactNumber}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending OTP...
            </div>
          ) : (
            'Send OTP'
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enter OTP</h3>
        <p className="text-gray-600">
          {otpMessage || `We've sent a 4-digit OTP to ${contactNumber}`}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter 4-digit OTP *
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {requiresName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be used to create your new account
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleVerifyOTP}
          disabled={!otp || (requiresName && !fullName)}
          className="w-full"
        >
          Verify & Continue
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="text-sm text-gray-600 hover:text-gray-700"
          >
            Change phone number
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;