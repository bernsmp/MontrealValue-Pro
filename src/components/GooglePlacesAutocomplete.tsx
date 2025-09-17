"use client";

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';
import { getPlacesAutocomplete, geocodeAddress } from '@/lib/google-maps';

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: {
    address: string;
    placeId: string;
    coordinates: { lat: number; lng: number };
  }) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function GooglePlacesAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter Montreal address...",
  label = "Property Address",
  className = ""
}: GooglePlacesAutocompleteProps) {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (value.length > 2) {
        setIsLoading(true);
        setError(null);
        
        try {
          const results = await getPlacesAutocomplete(value) as PlacePrediction[];
          setPredictions(results);
          setShowPredictions(true);
        } catch (err) {
          setError('Failed to load address suggestions');
          console.error('Places API error:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setPredictions([]);
        setShowPredictions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowPredictions(true);
  };

  // Handle place selection
  const handlePlaceSelect = async (prediction: PlacePrediction) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get coordinates for the selected place
      const geocodeResult = await geocodeAddress(prediction.description);
      
      onPlaceSelect({
        address: prediction.description,
        placeId: prediction.place_id,
        coordinates: {
          lat: geocodeResult.lat,
          lng: geocodeResult.lng
        }
      });
      
      onChange(prediction.description);
      setShowPredictions(false);
    } catch (err) {
      setError('Failed to get location details');
      console.error('Geocoding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Close predictions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        predictionsRef.current &&
        !predictionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowPredictions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Label htmlFor="address">{label}</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          id="address"
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}

      {/* Predictions dropdown */}
      {showPredictions && predictions.length > 0 && (
        <div
          ref={predictionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handlePlaceSelect(prediction)}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {prediction.structured_formatting.main_text}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {prediction.structured_formatting.secondary_text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showPredictions && !isLoading && predictions.length === 0 && value.length > 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3">
          <p className="text-sm text-gray-500">No addresses found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
