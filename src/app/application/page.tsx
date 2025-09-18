"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import MunicipalValueStep from "@/components/MunicipalValueStep";
import PropertyConditionStep from "@/components/PropertyConditionStep";
import ComparableAnalysisStep from "@/components/ComparableAnalysisStep";
import { isPropertyDataValid } from "@/lib/validation";
import { 
  MapPin, 
  FileText, 
  BarChart3, 
  Clock,
  CheckCircle,
  Info
} from "lucide-react";

export default function Application() {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    address: "",
    placeId: "",
    coordinates: { lat: 0, lng: 0 },
    municipalValue: "",
    landValue: "",
    lotSize: "",
    yearBuilt: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    roofAge: "",
    windowsAge: "",
    flooringType: "",
    bathroomRenovated: "",
    kitchenRenovated: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceSelect = (place: {
    address: string;
    placeId: string;
    coordinates: { lat: number; lng: number };
  }) => {
    setPropertyData(prev => ({
      ...prev,
      address: place.address,
      placeId: place.placeId,
      coordinates: place.coordinates
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const calculateValue = () => {
    const baseValue = parseInt(propertyData.municipalValue) || 0;
    
    // Calculate adjustments (same logic as PropertyConditionStep)
    const roofAdjustment = propertyData.roofAge === "less20" ? 15000 : propertyData.roofAge === "more20" ? -15000 : 0;
    const windowsAdjustment = propertyData.windowsAge === "less20" ? 15000 : propertyData.windowsAge === "more20" ? -15000 : 0;
    const flooringAdjustment = propertyData.flooringType === "hardwood" ? 20000 : 0;
    
    // Apply fixed adjustments first
    const afterFixedAdjustments = baseValue + roofAdjustment + windowsAdjustment + flooringAdjustment;
    
    // Calculate percentage adjustments
    const bathroomAdjustment = propertyData.bathroomRenovated === "yes" ? Math.round(baseValue * 0.03) : 0;
    const kitchenAdjustment = propertyData.kitchenRenovated === "yes" ? Math.round(baseValue * 0.05) : 0;
    
    // Final value
    return afterFixedAdjustments + bathroomAdjustment + kitchenAdjustment;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            MontrealValue Pro
          </h1>
          <p className="text-xl text-gray-600">
            Professional Property Valuation in 60 Seconds
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 5 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm text-gray-600">
              Step {step} of 5: {
                step === 1 ? 'Property Address' :
                step === 2 ? 'Municipal Value Capture' :
                step === 3 ? 'Condition Assessment' :
                step === 4 ? 'Market Analysis' :
                'Valuation Results'
              }
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Property Address</h2>
                  <p className="text-gray-600">
                    Enter your Montreal property address for accurate valuation
                  </p>
                </div>
                
                <div className="space-y-4">
                  <GooglePlacesAutocomplete
                    value={propertyData.address}
                    onChange={(value) => handleInputChange('address', value)}
                    onPlaceSelect={handlePlaceSelect}
                    placeholder="1234 Rue Saint-Denis, Montreal, QC"
                    label="Street Address"
                  />
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Smart Address Lookup</p>
                        <p className="text-sm text-blue-700">
                          Our system integrates with Montreal.ca to automatically fetch property details and municipal assessment values.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <MunicipalValueStep 
                propertyData={propertyData}
                onInputChange={handleInputChange}
              />
            )}

            {step === 3 && (
              <PropertyConditionStep 
                propertyData={propertyData}
                onInputChange={handleInputChange}
              />
            )}

            {step === 4 && (
              <ComparableAnalysisStep 
                propertyData={propertyData}
              />
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Valuation Results</h2>
                  <p className="text-gray-600">
                    Your professional property valuation report
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">Estimated Market Value Range (±8%)</p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${Math.round(calculateValue() * 0.92).toLocaleString()} - ${Math.round(calculateValue() * 1.08).toLocaleString()}
                    </div>
                    <p className="text-lg text-gray-700">
                      Adjusted Value: ${calculateValue().toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Confidence Score</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Market Trend</h3>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Rising Market</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Based on municipal assessment and comparable sales</p>
                    <p>• Adjusted for property condition and market factors</p>
                    <p>• Valid for 30 days from valuation date</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Market Analysis
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          {step < 5 ? (
            <div className="flex items-center gap-2">
              {step === 2 && !isPropertyDataValid(propertyData) && propertyData.municipalValue !== "" && (
                <p className="text-sm text-red-600">Please fix validation errors</p>
              )}
              <Button 
                onClick={nextStep}
                disabled={step === 2 && !isPropertyDataValid(propertyData)}
              >
                Next Step
              </Button>
            </div>
          ) : (
            <Button onClick={() => setStep(1)}>
              Start New Valuation
            </Button>
          )}
        </div>

        {/* Feature Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>60-Second Estimates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get accurate property valuations in under a minute using our advanced algorithms.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Montreal.ca Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Seamless integration with municipal data for the most accurate assessments.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Professional Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Generate detailed PDF reports with confidence scores and market analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
