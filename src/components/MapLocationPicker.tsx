import React, { useState, useCallback, useEffect, useRef } from 'react';
import { MapPin, Loader2, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiService } from '@/services/api';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocationPickerProps {
  onLocationSelect: (coordinates: { lat: number; lon: number }, addressInfo: any) => void;
  initialCoordinates?: { lat: number; lon: number };
}

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map clicks
const MapClickHandler: React.FC<{
  onLocationSelect: (lat: number, lon: number) => void;
}> = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to update map view when coordinates change
const MapUpdater: React.FC<{
  coordinates: { lat: number; lon: number };
}> = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([coordinates.lat, coordinates.lon], map.getZoom());
  }, [coordinates, map]);
  
  return null;
};

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  onLocationSelect,
  initialCoordinates = { lat: 27.7172, lon: 85.3240 } // Default to Kathmandu
}) => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(initialCoordinates);
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedAddress, setResolvedAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Handle location selection from map click or search
  const handleLocationSelect = useCallback(async (lat: number, lon: number) => {
    const coordinates = { lat, lon };
    setSelectedCoordinates(coordinates);
    
    // Resolve address from coordinates
    setIsResolving(true);
    try {
      const addressInfo = await apiService.resolveAddressFromCoordinate(lat, lon);
      const bestResult = addressInfo.results.find(r => r.municipality && r.district) || addressInfo.results[0];
      setResolvedAddress(bestResult?.formatted || 'Unknown location');
      onLocationSelect(coordinates, addressInfo);
    } catch (error) {
      console.error('Failed to resolve address:', error);
      setResolvedAddress('Failed to resolve address');
    } finally {
      setIsResolving(false);
    }
  }, [onLocationSelect]);

  // Handle current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your current location. Please click on the map to select a location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Search for locations using Nominatim (OpenStreetMap's geocoding service)
  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // Using Nominatim API for geocoding (free alternative to Google Places)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=np&limit=5&addressdetails=1`
      );
      const results = await response.json();
      
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchLocation(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search result selection
  const handleSearchResultSelect = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    handleLocationSelect(lat, lon);
    setSearchQuery(result.display_name);
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Select Location on Map *
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          Use Current Location
        </Button>
      </div>

      {/* Search Box */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location in Nepal..."
            className="pl-10 pr-10"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
          )}
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => handleSearchResultSelect(result)}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {result.display_name.split(',')[0]}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {result.display_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Interactive Map */}
      <div className="relative w-full h-80 border-2 border-gray-300 rounded-lg overflow-hidden">
        <MapContainer
          center={[selectedCoordinates.lat, selectedCoordinates.lon]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapClickHandler onLocationSelect={handleLocationSelect} />
          <MapUpdater coordinates={selectedCoordinates} />
          
          <Marker 
            position={[selectedCoordinates.lat, selectedCoordinates.lon]} 
            icon={customIcon}
          />
        </MapContainer>
      </div>

      {/* Coordinates Display */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Latitude:</span>
          <span className="ml-2 text-gray-600">{selectedCoordinates.lat.toFixed(6)}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Longitude:</span>
          <span className="ml-2 text-gray-600">{selectedCoordinates.lon.toFixed(6)}</span>
        </div>
      </div>

      {/* Resolved Address */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Resolved Address:</span>
          {isResolving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="text-gray-600">{resolvedAddress || 'Click on map to resolve address'}</span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Click anywhere on the map to pin your hotel location</p>
        <p>• Use the search box to find specific locations in Nepal</p>
        <p>• Drag the map to explore different areas</p>
      </div>
    </div>
  );
};

export default MapLocationPicker;