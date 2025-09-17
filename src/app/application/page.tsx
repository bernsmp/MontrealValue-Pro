"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Home, 
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
    municipalValue: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    condition: "good"
  });

  const handleInputChange = (field: string, value: string) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const calculateValue = () => {
    // Mock calculation - in real app this would use actual algorithms
    const baseValue = parseInt(propertyData.municipalValue) || 0;
    const multiplier = propertyData.condition === "excellent" ? 1.2 : 
                     propertyData.condition === "good" ? 1.0 : 0.8;
    return Math.round(baseValue * multiplier);
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
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm text-gray-600">
              Step {step} of 4: {
                step === 1 ? 'Property Address' :
                step === 2 ? 'Property Details' :
                step === 3 ? 'Condition Assessment' :
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
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="1234 Rue Saint-Denis, Montreal, QC"
                      value={propertyData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  </div>
                  
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
              <div className="space-y-6">
                <div className="text-center">
                  <Home className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Property Details</h2>
                  <p className="text-gray-600">
                    Provide basic property information for accurate valuation
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="municipalValue">Municipal Assessment Value</Label>
                    <Input
                      id="municipalValue"
                      type="number"
                      placeholder="450000"
                      value={propertyData.municipalValue}
                      onChange={(e) => handleInputChange('municipalValue', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="3"
                      value={propertyData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="2"
                      value={propertyData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="squareFeet">Square Feet</Label>
                    <Input
                      id="squareFeet"
                      type="number"
                      placeholder="1200"
                      value={propertyData.squareFeet}
                      onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="1995"
                      value={propertyData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Condition Assessment</h2>
                  <p className="text-gray-600">
                    Rate the condition of key property features
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Roof', description: 'Age and condition of roofing materials' },
                    { name: 'Windows', description: 'Energy efficiency and overall condition' },
                    { name: 'Kitchen', description: 'Appliances, cabinets, and finishes' },
                    { name: 'Bathrooms', description: 'Fixtures, tiles, and overall condition' }
                  ].map((feature) => (
                    <div key={feature.name} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{feature.name}</h3>
                        <span className="text-sm text-gray-600">{feature.description}</span>
                      </div>
                      <div className="flex gap-2">
                        {['poor', 'fair', 'good', 'excellent'].map((condition) => (
                          <Button
                            key={condition}
                            variant={propertyData.condition === condition ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleInputChange('condition', condition)}
                          >
                            {condition.charAt(0).toUpperCase() + condition.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
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
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${calculateValue().toLocaleString()}
                    </div>
                    <p className="text-gray-600">Estimated Property Value</p>
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
          
          {step < 4 ? (
            <Button onClick={nextStep}>
              Next Step
            </Button>
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
