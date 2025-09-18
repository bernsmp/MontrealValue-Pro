import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Parse PDF
    const data = await pdf(buffer);
    
    // Extract text
    const text = data.text;
    
    // Parse Montreal assessment values
    const extractedData = {
      municipalValue: '',
      landValue: '',
      yearBuilt: '',
      lotSize: ''
    };
    
    // Extract Property Value (Valeur de l'immeuble)
    const propertyValueMatch = text.match(/Valeur\s+de\s+l['']immeuble\s*:\s*\$?\s*([\d\s,]+)/i);
    if (propertyValueMatch) {
      extractedData.municipalValue = propertyValueMatch[1].replace(/[\s,]/g, '');
    }
    
    // Extract Land Value (Valeur du terrain)
    const landValueMatch = text.match(/Valeur\s+du\s+terrain\s*:\s*\$?\s*([\d\s,]+)/i);
    if (landValueMatch) {
      extractedData.landValue = landValueMatch[1].replace(/[\s,]/g, '');
    }
    
    // Extract Year Built (Année de construction)
    const yearBuiltMatch = text.match(/Année\s+de\s+construction\s*:\s*(\d{4})/i);
    if (yearBuiltMatch) {
      extractedData.yearBuilt = yearBuiltMatch[1];
    }
    
    // Extract Lot Size (Superficie)
    // Look for m² and convert to sq ft (1 m² = 10.764 sq ft)
    const lotSizeMatch = text.match(/Superficie\s*:\s*([\d\s,]+(?:\.\d+)?)\s*m²/i);
    if (lotSizeMatch) {
      const squareMeters = parseFloat(lotSizeMatch[1].replace(/[\s,]/g, ''));
      const squareFeet = Math.round(squareMeters * 10.764);
      extractedData.lotSize = squareFeet.toString();
    }
    
    // Also try alternate format for lot size
    if (!extractedData.lotSize) {
      const altLotSizeMatch = text.match(/Superficie\s+du\s+terrain\s*:\s*([\d\s,]+(?:\.\d+)?)\s*m²/i);
      if (altLotSizeMatch) {
        const squareMeters = parseFloat(altLotSizeMatch[1].replace(/[\s,]/g, ''));
        const squareFeet = Math.round(squareMeters * 10.764);
        extractedData.lotSize = squareFeet.toString();
      }
    }
    
    return NextResponse.json({
      success: true,
      data: extractedData,
      // Include raw text for debugging (remove in production)
      rawText: text.substring(0, 500) + '...'
    });
    
  } catch (error) {
    console.error('PDF parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}