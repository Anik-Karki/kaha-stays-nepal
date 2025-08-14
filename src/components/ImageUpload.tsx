import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, type: 'avatar' | 'cover') => void;
  type: 'avatar' | 'cover';
  currentImageUrl?: string;
  label: string;
  description?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  type,
  currentImageUrl,
  label,
  description
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const imageUrl = await apiService.uploadImage(file);
      onImageUpload(imageUrl, type);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload('', type);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="relative">
        {previewUrl ? (
          <div className="relative group">
            <div className={`relative overflow-hidden rounded-lg border-2 border-gray-200 ${
              type === 'avatar' ? 'w-32 h-32' : 'w-full h-48'
            }`}>
              <img
                src={previewUrl}
                alt={`${type} preview`}
                className="w-full h-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isUploading}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className={`border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors ${
              type === 'avatar' ? 'w-32 h-32' : 'w-full h-48'
            } flex flex-col items-center justify-center text-gray-500 hover:text-blue-500`}
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Upload {type}</span>
                <span className="text-xs">JPG, PNG up to 10MB</span>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {!previewUrl && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Choose {type === 'avatar' ? 'Avatar' : 'Cover Image'}
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;