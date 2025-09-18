import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, Calculator } from "lucide-react";

interface PropertyConditionStepProps {
  propertyData: {
    municipalValue: string;
    roofAge: string;
    windowsAge: string;
    flooringType: string;
    bathroomRenovated: string;
    kitchenRenovated: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function PropertyConditionStep({ propertyData, onInputChange }: PropertyConditionStepProps) {
  const baseValue = parseInt(propertyData.municipalValue) || 0;

  // Calculate adjustments
  const roofAdjustment = propertyData.roofAge === "less20" ? 15000 : propertyData.roofAge === "more20" ? -15000 : 0;
  const windowsAdjustment = propertyData.windowsAge === "less20" ? 15000 : propertyData.windowsAge === "more20" ? -15000 : 0;
  const flooringAdjustment = propertyData.flooringType === "hardwood" ? 20000 : 0;
  
  // Apply fixed adjustments first
  const afterFixedAdjustments = baseValue + roofAdjustment + windowsAdjustment + flooringAdjustment;
  
  // Calculate percentage adjustments
  const bathroomAdjustment = propertyData.bathroomRenovated === "yes" ? Math.round(baseValue * 0.03) : 0;
  const kitchenAdjustment = propertyData.kitchenRenovated === "yes" ? Math.round(baseValue * 0.05) : 0;
  
  // Final value
  const finalValue = afterFixedAdjustments + bathroomAdjustment + kitchenAdjustment;
  const lowerRange = Math.round(finalValue * 0.92);
  const upperRange = Math.round(finalValue * 1.08);

  return (
    <Card className="shadow-lg border-gray-200">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Property Condition Assessment</h2>
        <p className="text-gray-600">
          Answer these questions to refine your property valuation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roof Age */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <Label className="text-base font-medium mb-3 block">Roof Age</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={propertyData.roofAge === "less20" ? "default" : "outline"}
              onClick={() => onInputChange("roofAge", "less20")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Less than 20 years (+$15,000)
            </Button>
            <Button
              type="button"
              variant={propertyData.roofAge === "more20" ? "default" : "outline"}
              onClick={() => onInputChange("roofAge", "more20")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              More than 20 years (-$15,000)
            </Button>
          </div>
        </div>

        {/* Windows Age */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <Label className="text-base font-medium mb-3 block">Windows Age</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={propertyData.windowsAge === "less20" ? "default" : "outline"}
              onClick={() => onInputChange("windowsAge", "less20")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Less than 20 years (+$15,000)
            </Button>
            <Button
              type="button"
              variant={propertyData.windowsAge === "more20" ? "default" : "outline"}
              onClick={() => onInputChange("windowsAge", "more20")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              More than 20 years (-$15,000)
            </Button>
          </div>
        </div>

        {/* Flooring Type */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <Label className="text-base font-medium mb-3 block">Primary Flooring Type</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={propertyData.flooringType === "hardwood" ? "default" : "outline"}
              onClick={() => onInputChange("flooringType", "hardwood")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Hardwood/Ceramic (+$20,000)
            </Button>
            <Button
              type="button"
              variant={propertyData.flooringType === "other" ? "default" : "outline"}
              onClick={() => onInputChange("flooringType", "other")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Other Types ($0)
            </Button>
          </div>
        </div>

        {/* Bathroom Renovation */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <Label className="text-base font-medium mb-3 block">
            Bathroom Renovation (last 10 years)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={propertyData.bathroomRenovated === "yes" ? "default" : "outline"}
              onClick={() => onInputChange("bathroomRenovated", "yes")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Yes (+3% of base value)
            </Button>
            <Button
              type="button"
              variant={propertyData.bathroomRenovated === "no" ? "default" : "outline"}
              onClick={() => onInputChange("bathroomRenovated", "no")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              No (No change)
            </Button>
          </div>
        </div>

        {/* Kitchen Renovation */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <Label className="text-base font-medium mb-3 block">
            Kitchen Renovation (last 10 years)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={propertyData.kitchenRenovated === "yes" ? "default" : "outline"}
              onClick={() => onInputChange("kitchenRenovated", "yes")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              Yes (+5% of base value)
            </Button>
            <Button
              type="button"
              variant={propertyData.kitchenRenovated === "no" ? "default" : "outline"}
              onClick={() => onInputChange("kitchenRenovated", "no")}
              className="justify-start transition-all hover:scale-[1.02]"
            >
              No (No change)
            </Button>
          </div>
        </div>

      {/* Valuation Breakdown */}
      {baseValue > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Valuation Breakdown</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Municipal Base Value:</span>
              <span className="font-medium">${baseValue.toLocaleString()}</span>
            </div>
            
            {roofAdjustment !== 0 && (
              <div className="flex justify-between">
                <span>Roof Adjustment:</span>
                <span className={`font-medium ${roofAdjustment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roofAdjustment > 0 ? '+' : ''}${roofAdjustment.toLocaleString()}
                </span>
              </div>
            )}
            
            {windowsAdjustment !== 0 && (
              <div className="flex justify-between">
                <span>Windows Adjustment:</span>
                <span className={`font-medium ${windowsAdjustment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {windowsAdjustment > 0 ? '+' : ''}${windowsAdjustment.toLocaleString()}
                </span>
              </div>
            )}
            
            {flooringAdjustment !== 0 && (
              <div className="flex justify-between">
                <span>Flooring Adjustment:</span>
                <span className="font-medium text-green-600">
                  +${flooringAdjustment.toLocaleString()}
                </span>
              </div>
            )}
            
            {bathroomAdjustment > 0 && (
              <div className="flex justify-between">
                <span>Bathroom Renovation (3%):</span>
                <span className="font-medium text-green-600">
                  +${bathroomAdjustment.toLocaleString()}
                </span>
              </div>
            )}
            
            {kitchenAdjustment > 0 && (
              <div className="flex justify-between">
                <span>Kitchen Renovation (5%):</span>
                <span className="font-medium text-green-600">
                  +${kitchenAdjustment.toLocaleString()}
                </span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-base font-semibold">
                <span>Adjusted Value:</span>
                <span>${finalValue.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-md mt-3">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-1">Estimated Market Value Range (±8%)</p>
                <p className="text-xl font-bold text-blue-600">
                  ${lowerRange.toLocaleString()} - ${upperRange.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      </CardContent>
    </Card>
  );
}