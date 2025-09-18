import { useState } from "react";
import { FileText, FileUp, Edit, Copy, AlertCircle } from "lucide-react";
import PDFUploadMethod from "@/components/value-capture/PDFUploadMethod";
import ManualEntryMethod from "@/components/value-capture/ManualEntryMethod";
import CopyPasteMethod from "@/components/value-capture/CopyPasteMethod";
import { validatePropertyData, isPropertyDataValid } from "@/lib/validation";

interface MunicipalValueStepProps {
  propertyData: {
    address: string;
    municipalValue: string;
    landValue: string;
    lotSize: string;
    yearBuilt: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function MunicipalValueStep({ propertyData, onInputChange }: MunicipalValueStepProps) {
  const [captureMethod, setCaptureMethod] = useState<"pdf" | "manual" | "paste">("pdf");
  
  const validation = validatePropertyData(propertyData);
  const isValid = isPropertyDataValid(propertyData);
  const hasErrors = !isValid && propertyData.municipalValue !== "";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Municipal Property Assessment</h2>
        <p className="text-gray-600">
          Upload your Montreal.ca assessment PDF or enter values manually
        </p>
      </div>

      {/* Method Selection */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCaptureMethod("pdf")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            captureMethod === "pdf" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FileUp className="h-4 w-4" />
          PDF Upload
        </button>
        <button
          onClick={() => setCaptureMethod("manual")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            captureMethod === "manual" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Edit className="h-4 w-4" />
          Manual Entry
        </button>
        <button
          onClick={() => setCaptureMethod("paste")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            captureMethod === "paste" 
              ? "bg-blue-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Copy className="h-4 w-4" />
          Copy/Paste
        </button>
      </div>

      {/* Content based on method */}
      <div className="bg-gray-50 p-6 rounded-lg">
        {captureMethod === "pdf" && (
          <PDFUploadMethod 
            propertyAddress={propertyData.address}
            onDataExtracted={(data) => {
              onInputChange("municipalValue", data.municipalValue);
              onInputChange("landValue", data.landValue);
              onInputChange("lotSize", data.lotSize);
              onInputChange("yearBuilt", data.yearBuilt);
            }}
          />
        )}

        {captureMethod === "manual" && (
          <ManualEntryMethod 
            propertyData={propertyData}
            onInputChange={onInputChange}
          />
        )}

        {captureMethod === "paste" && (
          <CopyPasteMethod 
            propertyData={propertyData}
            onInputChange={onInputChange}
          />
        )}
      </div>

      {/* Validation Errors */}
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800">Please correct the following:</p>
              {validation.municipalValue && (
                <p className="text-sm text-red-700">• {validation.municipalValue}</p>
              )}
              {validation.lotSize && (
                <p className="text-sm text-red-700">• {validation.lotSize}</p>
              )}
              {validation.yearBuilt && (
                <p className="text-sm text-red-700">• {validation.yearBuilt}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}