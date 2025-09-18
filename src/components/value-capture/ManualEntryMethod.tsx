import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { validatePropertyData } from "@/lib/validation";

interface ManualEntryMethodProps {
  propertyData: {
    municipalValue: string;
    landValue: string;
    lotSize: string;
    yearBuilt: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function ManualEntryMethod({ propertyData, onInputChange }: ManualEntryMethodProps) {
  const validation = validatePropertyData(propertyData);
  
  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/[^0-9]/g, '');
    if (!numbers) return '';
    
    // Format with commas
    return '$' + parseInt(numbers).toLocaleString();
  };

  const handleCurrencyInput = (field: string, value: string) => {
    // Store raw number value
    const numbers = value.replace(/[^0-9]/g, '');
    onInputChange(field, numbers);
  };

  const handleLotSizeInput = (value: string) => {
    // Allow only numbers
    const numbers = value.replace(/[^0-9]/g, '');
    onInputChange('lotSize', numbers);
  };

  const handleYearInput = (value: string) => {
    // Allow only 4 digit numbers
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 4);
    onInputChange('yearBuilt', numbers);
  };

  return (
    <div className="space-y-4">
      {/* Header with instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              Enter values from Montreal.ca assessment
            </p>
            <p className="text-sm text-blue-700">
              Look for &quot;Section 4: Valeurs au rôle d&apos;évaluation&quot; on the webpage or PDF
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Property Value - Required */}
        <div>
          <Label htmlFor="municipalValue" className="flex items-center gap-1">
            Valeur de l&apos;immeuble / Property Value
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="municipalValue"
            placeholder="$1,022,400"
            value={propertyData.municipalValue ? formatCurrency(propertyData.municipalValue) : ''}
            onChange={(e) => handleCurrencyInput('municipalValue', e.target.value)}
            className={`mt-1 transition-all ${validation.municipalValue && propertyData.municipalValue ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-blue-500 focus:ring-blue-500/20'}`}
          />
          {validation.municipalValue && propertyData.municipalValue ? (
            <p className="text-xs text-red-500 mt-1">{validation.municipalValue}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Required - Total property value</p>
          )}
        </div>

        {/* Land Value - Optional */}
        <div>
          <Label htmlFor="landValue" className="flex items-center gap-1">
            Valeur du terrain / Land Value
            <span className="text-gray-400 text-sm">(optional)</span>
          </Label>
          <Input
            id="landValue"
            placeholder="$402,900"
            value={propertyData.landValue ? formatCurrency(propertyData.landValue) : ''}
            onChange={(e) => handleCurrencyInput('landValue', e.target.value)}
            className="mt-1 transition-all focus:border-blue-500 focus:ring-blue-500/20"
          />
          <p className="text-xs text-gray-500 mt-1">Land value only</p>
        </div>

        {/* Year Built - Optional */}
        <div>
          <Label htmlFor="yearBuilt" className="flex items-center gap-1">
            Année de construction / Year Built
            <span className="text-gray-400 text-sm">(optional)</span>
          </Label>
          <Input
            id="yearBuilt"
            placeholder="1965"
            value={propertyData.yearBuilt}
            onChange={(e) => handleYearInput(e.target.value)}
            maxLength={4}
            className={`mt-1 transition-all ${validation.yearBuilt && propertyData.yearBuilt ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-blue-500 focus:ring-blue-500/20'}`}
          />
          {validation.yearBuilt && propertyData.yearBuilt ? (
            <p className="text-xs text-red-500 mt-1">{validation.yearBuilt}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">4-digit year</p>
          )}
        </div>

        {/* Lot Size - Optional */}
        <div>
          <Label htmlFor="lotSize" className="flex items-center gap-1">
            Superficie du terrain / Lot Size
            <span className="text-gray-400 text-sm">(optional)</span>
          </Label>
          <div className="relative">
            <Input
              id="lotSize"
              placeholder="5,200"
              value={propertyData.lotSize ? parseInt(propertyData.lotSize).toLocaleString() : ''}
              onChange={(e) => handleLotSizeInput(e.target.value)}
              className={`mt-1 pr-12 transition-all ${validation.lotSize && propertyData.lotSize ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-blue-500 focus:ring-blue-500/20'}`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 mt-1">
              sq ft
            </span>
          </div>
          {validation.lotSize && propertyData.lotSize ? (
            <p className="text-xs text-red-500 mt-1">{validation.lotSize}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Square feet</p>
          )}
        </div>
      </div>

      {/* Visual guide */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">Where to find these values:</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div>• <strong>Valeur de l&apos;immeuble:</strong> Main value in Section 4</div>
          <div>• <strong>Valeur du terrain:</strong> Listed separately under property value</div>
          <div>• <strong>Année de construction:</strong> In property characteristics section</div>
          <div>• <strong>Superficie du terrain:</strong> Listed in square meters (convert to sq ft)</div>
        </div>
      </div>
    </div>
  );
}