import { useState } from "react";
import { FileText, FileUp, Edit, Copy, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Card className="shadow-lg border-gray-200">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Municipal Property Assessment</h2>
        <p className="text-gray-600">
          Upload your Montreal.ca assessment PDF or enter values manually
        </p>
      </CardHeader>
      <CardContent className="space-y-6">

        <Tabs value={captureMethod} onValueChange={(value) => setCaptureMethod(value as "pdf" | "manual" | "paste")} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              PDF Upload
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="paste" className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy & Paste
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-0 data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=active]:fade-in-0 data-[state=inactive]:fade-out-0">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <PDFUploadMethod 
                propertyAddress={propertyData.address}
                propertyData={propertyData}
                onDataExtracted={(data) => {
                  onInputChange("municipalValue", data.municipalValue);
                  onInputChange("landValue", data.landValue);
                  onInputChange("lotSize", data.lotSize);
                  onInputChange("yearBuilt", data.yearBuilt);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-0 data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=active]:fade-in-0 data-[state=inactive]:fade-out-0">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <ManualEntryMethod 
                propertyData={propertyData}
                onInputChange={onInputChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="paste" className="mt-0 data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=active]:fade-in-0 data-[state=inactive]:fade-out-0">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <CopyPasteMethod 
                propertyData={propertyData}
                onInputChange={onInputChange}
              />
            </div>
          </TabsContent>
        </Tabs>

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

      </CardContent>
    </Card>
  );
}