import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, FileUp, CheckCircle, ChevronRight } from "lucide-react";
import * as pdfjsLib from 'pdfjs-dist';

interface PDFUploadMethodProps {
  propertyAddress: string;
  propertyData?: {
    municipalValue: string;
    landValue: string;
    lotSize: string;
    yearBuilt: string;
  };
  onFileUpload?: (file: File) => void;
  onDataExtracted?: (data: { municipalValue: string; landValue: string; lotSize: string; yearBuilt: string }) => void;
}

export default function PDFUploadMethod({ propertyAddress, propertyData, onFileUpload, onDataExtracted }: PDFUploadMethodProps) {
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  
  const hasExistingData = propertyData?.municipalValue || propertyData?.landValue || 
                         propertyData?.lotSize || propertyData?.yearBuilt;
  
  // Set up PDF.js worker
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

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

  const handleFile = async (file: File) => {
    if (file.type === "application/pdf") {
      setUploadedFile(file);
      if (onFileUpload) onFileUpload(file);
      
      // Parse the PDF client-side
      setIsParsing(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        // Extract text from all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + ' ';
        }
        
        // Extract values from text
        const extractedData = {
          municipalValue: '',
          landValue: '',
          yearBuilt: '',
          lotSize: ''
        };
        
        // Extract Property Value (Valeur de l'immeuble)
        const propertyValueMatch = fullText.match(/Valeur\s+de\s+l['']immeuble\s*:\s*\$?\s*([\d\s,]+)/i);
        if (propertyValueMatch) {
          extractedData.municipalValue = propertyValueMatch[1].replace(/[\s,]/g, '');
        }
        
        // Extract Land Value (Valeur du terrain)
        const landValueMatch = fullText.match(/Valeur\s+du\s+terrain\s*:\s*\$?\s*([\d\s,]+)/i);
        if (landValueMatch) {
          extractedData.landValue = landValueMatch[1].replace(/[\s,]/g, '');
        }
        
        // Extract Year Built (Année de construction)
        const yearBuiltMatch = fullText.match(/Année\s+de\s+construction\s*:\s*(\d{4})/i);
        if (yearBuiltMatch) {
          extractedData.yearBuilt = yearBuiltMatch[1];
        }
        
        // Extract Lot Size (Superficie) - handle line breaks
        let lotSizeMatch = fullText.match(/Superficie\s*:\s*([\d\s,]+(?:\.\d+)?)\s*m²/i);
        if (!lotSizeMatch) {
          lotSizeMatch = fullText.match(/Superficie\s*:\s*([\d\s,]+(?:\.\d+)?)\s*m\s*2/i);
        }
        if (lotSizeMatch) {
          const squareMeters = parseFloat(lotSizeMatch[1].replace(/\s/g, '').replace(',', '.'));
          const squareFeet = Math.round(squareMeters * 10.764);
          extractedData.lotSize = squareFeet.toString();
        }
        
        if (onDataExtracted) {
          onDataExtracted(extractedData);
        }
        
        console.log('Extracted PDF data:', extractedData);
        console.log('PDF text preview:', fullText.substring(0, 500));
        
      } catch (error) {
        console.error('Error parsing PDF:', error);
        alert('Error processing PDF. Please try manual entry.');
      } finally {
        setIsParsing(false);
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Show existing data banner if available */}
      {hasExistingData && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm text-green-800 font-medium mb-1">
                Data already captured
              </p>
              <p className="text-sm text-green-700">
                You&apos;ve already entered property data. Upload a new PDF to update.
              </p>
            </div>
          </div>
        </div>
      )}
      
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
                <span>Select <strong>&quot;Par adresse&quot;</strong> option</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span>Click <strong>&quot;Suivant&quot;</strong> button</span>
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
                    • Look for <strong>&quot;Section 4: Valeurs au rôle d&apos;évaluation&quot;</strong><br/>
                    • Find <strong>&quot;Valeur de l&apos;immeuble&quot;</strong> (Property Value)
                  </div>
                </div>
                <div>
                  <strong>Option B:</strong> Download PDF
                  <div className="text-gray-600 ml-4">
                    • Click <strong>&quot;Version imprimable&quot;</strong> button for PDF
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
              
              {isParsing ? (
                <div className="space-y-2">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
                  <p className="text-sm font-medium text-gray-900">Processing PDF...</p>
                  <p className="text-xs text-gray-500">Extracting property values from Montreal.ca assessment</p>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-2">
                  <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">PDF Processed Successfully!</p>
                  <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">Values extracted and populated in form</p>
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