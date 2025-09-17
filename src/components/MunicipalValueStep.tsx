import { useState } from "react";
import { FileText, FileUp, Edit, Copy } from "lucide-react";

interface MunicipalValueStepProps {
  propertyData: {
    municipalValue: string;
    lotSize: string;
    yearBuilt: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function MunicipalValueStep({ propertyData, onInputChange }: MunicipalValueStepProps) {
  const [captureMethod, setCaptureMethod] = useState<"pdf" | "manual" | "paste">("pdf");

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
          <div className="text-center">
            <p className="text-gray-600 mb-4">PDF Upload feature coming in Phase 2</p>
            <p className="text-sm text-gray-500">Drag and drop your Montreal.ca assessment PDF here</p>
          </div>
        )}

        {captureMethod === "manual" && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Manual Entry feature coming in Phase 3</p>
            <p className="text-sm text-gray-500">Enter values from your assessment document</p>
          </div>
        )}

        {captureMethod === "paste" && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Copy/Paste feature coming in Phase 4</p>
            <p className="text-sm text-gray-500">Paste text from Montreal.ca to extract values</p>
          </div>
        )}
      </div>

      {/* Temporary display of current values */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800 mb-2">Current Values (for testing):</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Municipal Value:</span>
            <span className="ml-2 font-medium">{propertyData.municipalValue || "Not set"}</span>
          </div>
          <div>
            <span className="text-blue-700">Lot Size:</span>
            <span className="ml-2 font-medium">{propertyData.lotSize || "Not set"}</span>
          </div>
          <div>
            <span className="text-blue-700">Year Built:</span>
            <span className="ml-2 font-medium">{propertyData.yearBuilt || "Not set"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}