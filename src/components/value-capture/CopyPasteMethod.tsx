import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Clipboard, CheckCircle2, AlertCircle } from "lucide-react";

interface CopyPasteMethodProps {
  propertyData: {
    municipalValue: string;
    landValue: string;
    lotSize: string;
    yearBuilt: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function CopyPasteMethod({ propertyData, onInputChange }: CopyPasteMethodProps) {
  const [pastedText, setPastedText] = useState("");
  const [extractedData, setExtractedData] = useState<{
    municipalValue?: string;
    landValue?: string;
    lotSize?: string;
    yearBuilt?: string;
  }>({});
  const [extractionStatus, setExtractionStatus] = useState<"idle" | "success" | "partial" | "error">("idle");

  useEffect(() => {
    if (pastedText) {
      extractValues(pastedText);
    } else {
      setExtractedData({});
      setExtractionStatus("idle");
    }
  }, [pastedText]);

  const extractValues = (text: string) => {
    const extracted: typeof extractedData = {};
    let foundAnyValue = false;

    // Extract Municipal Value (Valeur de l'immeuble / Valeur totale)
    const municipalValueRegex = /(?:Valeur\s+de\s+l'immeuble|Valeur\s+totale)[:\s]*\$?\s*([\d\s,]+)/i;
    const municipalMatch = text.match(municipalValueRegex);
    if (municipalMatch) {
      extracted.municipalValue = municipalMatch[1].replace(/[\s,]/g, '');
      foundAnyValue = true;
    }

    // Extract Land Value (Valeur du terrain)
    const landValueRegex = /Valeur\s+du\s+terrain[:\s]*\$?\s*([\d\s,]+)/i;
    const landMatch = text.match(landValueRegex);
    if (landMatch) {
      extracted.landValue = landMatch[1].replace(/[\s,]/g, '');
      foundAnyValue = true;
    }

    // Extract Year Built (Année de construction)
    const yearBuiltRegex = /Année\s+de\s+construction[:\s]*(\d{4})/i;
    const yearMatch = text.match(yearBuiltRegex);
    if (yearMatch) {
      extracted.yearBuilt = yearMatch[1];
      foundAnyValue = true;
    }

    // Extract Lot Size (Superficie du terrain) - convert m² to sq ft
    const lotSizeRegex = /Superficie\s+du\s+terrain[:\s]*([\d\s,]+)\s*(?:m²|m2)?/i;
    const lotMatch = text.match(lotSizeRegex);
    if (lotMatch) {
      const squareMeters = parseFloat(lotMatch[1].replace(/[\s,]/g, ''));
      const squareFeet = Math.round(squareMeters * 10.764); // Convert m² to sq ft
      extracted.lotSize = squareFeet.toString();
      foundAnyValue = true;
    }

    setExtractedData(extracted);
    
    // Set extraction status
    if (!foundAnyValue) {
      setExtractionStatus("error");
    } else if (extracted.municipalValue) {
      setExtractionStatus("success");
    } else {
      setExtractionStatus("partial");
    }

    // Update the form with extracted values
    if (extracted.municipalValue) onInputChange("municipalValue", extracted.municipalValue);
    if (extracted.landValue) onInputChange("landValue", extracted.landValue);
    if (extracted.lotSize) onInputChange("lotSize", extracted.lotSize);
    if (extracted.yearBuilt) onInputChange("yearBuilt", extracted.yearBuilt);
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    return '$' + parseInt(value).toLocaleString();
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clipboard className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              Copy and paste from Montreal.ca
            </p>
            <p className="text-sm text-blue-700">
              1. Navigate to your property on Montreal.ca<br/>
              2. Select and copy the text from "Section 4: Valeurs au rôle d'évaluation"<br/>
              3. Paste it below - we'll extract the values automatically
            </p>
          </div>
        </div>
      </div>

      {/* Paste Area */}
      <div>
        <Label htmlFor="pasteArea" className="flex items-center gap-2 mb-2">
          Paste Montreal.ca Property Data
          <Clipboard className="h-4 w-4 text-gray-500" />
        </Label>
        <textarea
          id="pasteArea"
          className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg font-mono text-sm"
          placeholder={`Example format:
Section 4: Valeurs au rôle d'évaluation

Valeur de l'immeuble : 1 022 400 $
Valeur du terrain : 402 900 $

Année de construction : 1965
Superficie du terrain : 483.1 m²`}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
        />
      </div>

      {/* Extraction Status */}
      {extractionStatus !== "idle" && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          extractionStatus === "success" ? "bg-green-50 border border-green-200" :
          extractionStatus === "partial" ? "bg-yellow-50 border border-yellow-200" :
          "bg-red-50 border border-red-200"
        }`}>
          {extractionStatus === "success" ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Values extracted successfully!</p>
                <p className="text-sm text-green-700">Found municipal value and additional data.</p>
              </div>
            </>
          ) : extractionStatus === "partial" ? (
            <>
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Partial extraction</p>
                <p className="text-sm text-yellow-700">Some values found, but municipal value is missing. Please check the data.</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">No values found</p>
                <p className="text-sm text-red-700">Please make sure to copy the property values section from Montreal.ca</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Extracted Values Display */}
      {Object.keys(extractedData).length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Extracted Values:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {extractedData.municipalValue && (
              <div>
                <span className="text-gray-600">Property Value:</span>
                <span className="ml-2 font-medium">{formatCurrency(extractedData.municipalValue)}</span>
              </div>
            )}
            {extractedData.landValue && (
              <div>
                <span className="text-gray-600">Land Value:</span>
                <span className="ml-2 font-medium">{formatCurrency(extractedData.landValue)}</span>
              </div>
            )}
            {extractedData.yearBuilt && (
              <div>
                <span className="text-gray-600">Year Built:</span>
                <span className="ml-2 font-medium">{extractedData.yearBuilt}</span>
              </div>
            )}
            {extractedData.lotSize && (
              <div>
                <span className="text-gray-600">Lot Size:</span>
                <span className="ml-2 font-medium">{parseInt(extractedData.lotSize).toLocaleString()} sq ft</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}