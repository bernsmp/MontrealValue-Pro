import { Loader } from '@googlemaps/js-api-loader';

// Google Maps API configuration
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  version: 'weekly',
  libraries: ['places', 'geometry']
});

// Initialize Google Maps
export const initializeGoogleMaps = async () => {
  try {
    const google = await loader.load();
    return google;
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    throw error;
  }
};

// Places Autocomplete service
export const getPlacesAutocomplete = async (input: string) => {
  try {
    const google = await initializeGoogleMaps();
    const service = new google.maps.places.AutocompleteService();
    
    return new Promise((resolve, reject) => {
      service.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'ca' }, // Restrict to Canada
          types: ['address'] // Only return addresses
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            resolve(predictions);
          } else {
            reject(new Error('Places API error: ' + status));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error getting place predictions:', error);
    throw error;
  }
};

// Geocoding service to get coordinates from address
export const geocodeAddress = async (address: string) => {
  try {
    const google = await initializeGoogleMaps();
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            formatted_address: results[0].formatted_address,
            place_id: results[0].place_id
          });
        } else {
          reject(new Error('Geocoding failed: ' + status));
        }
      });
    });
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

// Get place details by place ID
export const getPlaceDetails = async (placeId: string) => {
  try {
    const google = await initializeGoogleMaps();
    const service = new google.maps.places.PlacesService(
      document.createElement('div') // Dummy div for service
    );
    
    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId,
          fields: ['name', 'formatted_address', 'geometry', 'address_components']
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            resolve(place);
          } else {
            reject(new Error('Place details error: ' + status));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
};
