import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, FileUp, CheckCircle, ChevronRight } from "lucide-react";

interface PDFUploadMethodProps {
  propertyAddress: string;
  onFileUpload?: (file: File) => void;
  onDataExtracted?: (data: { municipalValue: string; landValue: string; lotSize: string; yearBuilt: string }) => void;
}

export default function PDFUploadMethod({ propertyAddress, onFileUpload, onDataExtracted }: PDFUploadMethodProps) {
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(propertyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === "application/pdf") {
      setUploadedFile(file);
      if (onFileUpload) onFileUpload(file);
      
      // Simulate data extraction (placeholder)
      setTimeout(() => {
        if (onDataExtracted) {
          onDataExtracted({
            municipalValue: "525000",
            landValue: "185000",
            lotSize: "4500",
            yearBuilt: "1998"
          });
        }
      }, 1500);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Copy Address */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            1
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">Copy Your Property Address</h3>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-3">
              <span className="flex-1 text-sm">{propertyAddress || "No address entered"}</span>
              <Button
                onClick={handleCopyAddress}
                size="sm"
                variant="outline"
                disabled={!propertyAddress}
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Montreal.ca Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            2
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-3">How to Find Your Property Values:</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span>Select <strong>"Par adresse"</strong> option</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span>Click <strong>"Suivant"</strong> button</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span>Paste your copied address in the search field</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm font-medium text-gray-900 mb-2">You have TWO options:</p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Option A:</strong> Copy values directly from the webpage
                  <div className="text-gray-600 ml-4">
                    • Look for <strong>"Section 4: Valeurs au rôle d'évaluation"</strong><br/>
                    • Find <strong>"Valeur de l'immeuble"</strong> (Property Value)
                  </div>
                </div>
                <div>
                  <strong>Option B:</strong> Download PDF
                  <div className="text-gray-600 ml-4">
                    • Click <strong>"Version imprimable"</strong> button for PDF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Open Montreal.ca */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            3
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-2">Open Montreal.ca Property Assessment</h3>
            <Button
              onClick={() => window.open("https://montreal.ca/role-evaluation-fonciere", "_blank")}
              className="bg-green-600 hover:bg-green-700"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Montreal.ca
            </Button>
          </div>
        </div>
      </div>

      {/* Optional: Upload PDF */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="text-gray-400 text-sm font-medium">
            Optional
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-3">Upload Assessment PDF (if downloaded)</h3>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
              } ${uploadedFile ? "border-green-400 bg-green-50" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {uploadedFile ? (
                <div className="space-y-2">
                  <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">PDF Uploaded Successfully!</p>
                  <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">Extracting property values...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <FileUp className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">
                    Drag and drop your PDF here
                  </p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}