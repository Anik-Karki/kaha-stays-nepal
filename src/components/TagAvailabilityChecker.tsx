import React, { useState, useEffect, useCallback } from 'react';
import { Check, X, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { helpers } from '@/services/api';
// Simple debounce implementation
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

interface TagAvailabilityCheckerProps {
  businessName: string;
  onTagChange: (tag: string, isAvailable: boolean) => void;
  initialTag?: string;
}

const TagAvailabilityChecker: React.FC<TagAvailabilityCheckerProps> = ({
  businessName,
  onTagChange,
  initialTag
}) => {
  const [tag, setTag] = useState(initialTag || '');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestedTag, setSuggestedTag] = useState('');

  // Generate suggested tag when business name changes
  useEffect(() => {
    if (businessName) {
      const suggested = helpers.generateKahaTag(businessName);
      setSuggestedTag(suggested);
      if (!tag) {
        setTag(suggested);
      }
    }
  }, [businessName, tag]);

  // Debounced tag availability check
  const checkTagAvailability = useCallback(
    debounce(async (tagToCheck: string) => {
      if (!tagToCheck || tagToCheck.length < 3) {
        setIsAvailable(null);
        return;
      }

      setIsChecking(true);
      try {
        const available = await helpers.isSuggestedTagAvailable(tagToCheck);
        setIsAvailable(available);
        onTagChange(tagToCheck, available);
      } catch (error) {
        console.error('Error checking tag availability:', error);
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    }, 500),
    [onTagChange]
  );

  // Check availability when tag changes
  useEffect(() => {
    checkTagAvailability(tag);
  }, [tag, checkTagAvailability]);

  const handleTagChange = (value: string) => {
    // Clean the tag (remove special characters, spaces, etc.)
    const cleanedTag = value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);
    
    setTag(cleanedTag);
  };

  const useSuggestedTag = () => {
    setTag(suggestedTag);
  };

  const getStatusIcon = () => {
    if (isChecking) {
      return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    }
    
    if (isAvailable === true) {
      return <Check className="w-4 h-4 text-green-500" />;
    }
    
    if (isAvailable === false) {
      return <X className="w-4 h-4 text-red-500" />;
    }
    
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  const getStatusMessage = () => {
    if (isChecking) {
      return 'Checking availability...';
    }
    
    if (isAvailable === true) {
      return 'Tag is available!';
    }
    
    if (isAvailable === false) {
      return 'Tag is already taken';
    }
    
    if (tag.length < 3) {
      return 'Tag must be at least 3 characters';
    }
    
    return 'Enter a tag to check availability';
  };

  const getStatusColor = () => {
    if (isAvailable === true) return 'text-green-600';
    if (isAvailable === false) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kaha Tag *
        </label>
        <div className="relative">
          <Input
            value={tag}
            onChange={(e) => handleTagChange(e.target.value)}
            placeholder="Enter your unique kaha tag"
            className={`pr-10 ${
              isAvailable === true ? 'border-green-500' : 
              isAvailable === false ? 'border-red-500' : ''
            }`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getStatusIcon()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`text-sm ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>
        
        {suggestedTag && suggestedTag !== tag && (
          <button
            type="button"
            onClick={useSuggestedTag}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Use suggested: {suggestedTag}
          </button>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Your Kaha tag will be your unique identifier (e.g., kaha.com.np/yourtag)</p>
        <p>• Only lowercase letters and numbers allowed</p>
        <p>• Must be 3-20 characters long</p>
      </div>
    </div>
  );
};

export default TagAvailabilityChecker;