# Google Maps API Setup Instructions

## 🔑 Adding Your Google API Key

1. **Open the `.env.local` file** in your project root
2. **Replace `your_google_maps_api_key_here`** with your actual Google Maps API key
3. **Save the file**

## 📋 Required Google APIs

Make sure your Google Cloud Console project has these APIs enabled:

- ✅ **Places API** - For address autocomplete
- ✅ **Maps JavaScript API** - For map functionality
- ✅ **Geocoding API** - For address to coordinates conversion

## 🔒 API Key Restrictions (Recommended)

For security, restrict your API key to:
- **HTTP referrers**: `localhost:3000/*`, `your-domain.com/*`
- **APIs**: Places API, Maps JavaScript API, Geocoding API

## 🧪 Testing

After adding your API key:
1. Restart the development server: `npm run dev`
2. Go to http://localhost:3000/application
3. Try typing an address in the first step
4. You should see Google Places autocomplete suggestions

## 🚨 Important Notes

- Never commit your `.env.local` file to git
- The `.env.local` file is already in `.gitignore`
- Your API key will be visible in the browser (this is normal for client-side Google Maps)

## 📍 Example Usage

Once set up, the Google Places Autocomplete will:
- Show address suggestions as you type
- Restrict results to Canadian addresses
- Provide coordinates and place ID for selected addresses
- Integrate seamlessly with the property valuation flow
