import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, MapPin, Home, Bed, Bath } from "lucide-react";
import { generateComparables, calculateMarketMetrics } from "@/lib/comparables";

interface ComparableAnalysisStepProps {
  propertyData: {
    address: string;
    municipalValue: string;
    bedrooms: string;
    bathrooms: string;
    roofAge: string;
    windowsAge: string;
    flooringType: string;
    bathroomRenovated: string;
    kitchenRenovated: string;
  };
}

export default function ComparableAnalysisStep({ propertyData }: ComparableAnalysisStepProps) {
  const [comparables, setComparables] = useState<ReturnType<typeof generateComparables>>([]);
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateMarketMetrics> | null>(null);
  
  // Calculate the adjusted value (same logic as main app)
  const calculateAdjustedValue = () => {
    const baseValue = parseInt(propertyData.municipalValue) || 0;
    const roofAdjustment = propertyData.roofAge === "less20" ? 15000 : propertyData.roofAge === "more20" ? -15000 : 0;
    const windowsAdjustment = propertyData.windowsAge === "less20" ? 15000 : propertyData.windowsAge === "more20" ? -15000 : 0;
    const flooringAdjustment = propertyData.flooringType === "hardwood" ? 20000 : 0;
    const afterFixedAdjustments = baseValue + roofAdjustment + windowsAdjustment + flooringAdjustment;
    const bathroomAdjustment = propertyData.bathroomRenovated === "yes" ? Math.round(baseValue * 0.03) : 0;
    const kitchenAdjustment = propertyData.kitchenRenovated === "yes" ? Math.round(baseValue * 0.05) : 0;
    return afterFixedAdjustments + bathroomAdjustment + kitchenAdjustment;
  };
  
  useEffect(() => {
    const adjustedValue = calculateAdjustedValue();
    const bedrooms = parseInt(propertyData.bedrooms) || 3;
    const bathrooms = parseInt(propertyData.bathrooms) || 2;
    
    const generatedComps = generateComparables(
      propertyData.address,
      adjustedValue,
      bedrooms,
      bathrooms
    );
    
    setComparables(generatedComps);
    setMetrics(calculateMarketMetrics(generatedComps, adjustedValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyData]);
  
  const adjustedValue = calculateAdjustedValue();
  
  return (
    <Card className="shadow-lg border-gray-200">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="h-8 w-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Comparable Market Analysis</h2>
        <p className="text-gray-600">
          Recent sales and listings in your neighborhood
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
      
      {/* Comparable Properties */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Home className="h-5 w-5" />
          Comparable Properties
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Note:</span> Comparable properties shown are estimates based on typical market ranges. Actual sales data may vary.
          </p>
        </div>
        
        {comparables.map((comp, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900">{comp.address}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${comp.price.toLocaleString()}</p>
                <p className={`text-sm ${comp.status === 'Sold' ? 'text-green-600' : 'text-blue-600'}`}>
                  {comp.status === 'Sold' ? (
                    <>Sold • {comp.soldDate}</>
                  ) : (
                    <>Listed • {comp.daysOnMarket} days</>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Bed className="h-3 w-3" />
                {comp.bedrooms} bed
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3 w-3" />
                {comp.bathrooms} bath
              </span>
              <span>{comp.squareFeet.toLocaleString()} sq ft</span>
              <span className="ml-auto text-gray-500">
                ${Math.round(comp.price / comp.squareFeet)}/sq ft
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Market Metrics */}
      {metrics && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">Market Analysis</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Comparable Price</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.avgPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Price per Sq Ft</p>
              <p className="text-2xl font-bold text-gray-900">${metrics.avgPricePerSqFt}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm text-gray-600">Market Trend:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              metrics.marketTrend === 'Hot' ? 'bg-red-100 text-red-800' :
              metrics.marketTrend === 'Stable' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {metrics.marketTrend} Market
            </span>
          </div>
        </div>
      )}
      
      {/* Value Comparison */}
      {metrics && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Value Comparison</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Estimate</span>
              <span className="text-xl font-bold text-blue-600">
                ${adjustedValue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Market Average</span>
              <span className="text-xl font-bold text-gray-900">
                ${metrics.avgPrice.toLocaleString()}
              </span>
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Analysis Confidence</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  metrics.confidence === 'High' ? 'bg-green-100 text-green-800' :
                  metrics.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metrics.confidence} Confidence
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Based on proximity to market average
              </p>
            </div>
          </div>
        </div>
      )}
      </CardContent>
    </Card>
  );
}