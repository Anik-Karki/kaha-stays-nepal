import React, { useState } from 'react';
import { Upload, X, Camera, Plus, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface RoomImageGalleryProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const RoomImageGallery: React.FC<RoomImageGalleryProps> = ({
  images,
  onImagesChange,
  maxImages = 10
}) => {
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Sample images for demo purposes
  const sampleImages = [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
  ];

  const addSampleImage = () => {
    if (images.length >= maxImages) return;
    
    const availableImages = sampleImages.filter(img => !images.includes(img));
    if (availableImages.length > 0) {
      const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
      onImagesChange([...images, randomImage]);
    }
  };

  const addCustomImage = () => {
    if (!newImageUrl.trim() || images.length >= maxImages) return;
    
    if (editingIndex !== null) {
      const updatedImages = [...images];
      updatedImages[editingIndex] = newImageUrl;
      onImagesChange(updatedImages);
      setEditingIndex(null);
    } else {
      onImagesChange([...images, newImageUrl]);
    }
    
    setNewImageUrl('');
    setIsAddImageModalOpen(false);
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const editImage = (index: number) => {
    setEditingIndex(index);
    setNewImageUrl(images[index]);
    setIsAddImageModalOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to your server
    // For demo, we'll create a local URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (editingIndex !== null) {
        const updatedImages = [...images];
        updatedImages[editingIndex] = result;
        onImagesChange(updatedImages);
        setEditingIndex(null);
      } else {
        onImagesChange([...images, result]);
      }
      setIsAddImageModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Room Photos ({images.length}/{maxImages})</h4>
        <Dialog open={isAddImageModalOpen} onOpenChange={setIsAddImageModalOpen}>
          <DialogTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              disabled={images.length >= maxImages}
              onClick={() => {
                setEditingIndex(null);
                setNewImageUrl('');
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingIndex !== null ? 'Edit Photo' : 'Add Photo'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload from Computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              
              <div className="text-center text-gray-500">or</div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddImageModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={addCustomImage}
                  disabled={!newImageUrl.trim()}
                >
                  {editingIndex !== null ? 'Update' : 'Add'} Photo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={image}
                alt={`Room photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => editImage(index)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Main
              </div>
            )}
          </div>
        ))}
        
        {/* Add Photo Button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={addSampleImage}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Camera className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add Sample</span>
          </button>
        )}
      </div>

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No photos added yet</p>
          <p className="text-sm">Add photos to showcase your room</p>
        </div>
      )}
    </div>
  );
};

export default RoomImageGallery;