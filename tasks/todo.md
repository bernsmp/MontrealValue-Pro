# Project Tasks

## Current Tasks - Step 2: Municipal Value Capture (Montreal.ca PDF)

### Phase 1: Basic Setup ✅
- [x] Create MunicipalValueStep component for Step 2
- [x] Add lotSize and yearBuilt fields to propertyData state
- [x] Update Step 2 in the application flow to use new component

### Phase 2: PDF Upload (Primary Method) ✅
- [x] Create PDFUploadMethod component with drag-and-drop area
- [x] Add file input that accepts only PDF files
- [x] Show upload progress and file name when uploaded
- [x] Create placeholder parser function that extracts mock data
- [x] Display extracted values: Valeur totale, Superficie, Année de construction
- [x] Add "Open Montreal.ca" button with step-by-step guide
- [x] Include address copy functionality with visual feedback
- [x] Show detailed instructions for Montreal.ca navigation

### Phase 3: Manual Entry (Secondary Method) ✅
- [x] Create ManualEntryMethod component with four input fields
- [x] Add visual guide showing where to find values on montreal.ca PDF
- [x] Include example values as placeholders with proper formatting
- [x] Add simple tooltips for each field
- [x] Add landValue field to propertyData state
- [x] Implement currency formatting for value inputs
- [x] Add required/optional field indicators

### Phase 4: Copy/Paste Method (Tertiary Method) ✅
- [x] Create CopyPasteMethod component with textarea
- [x] Add regex to extract "Valeur de l'immeuble", "Valeur du terrain", "Superficie", "Année de construction"
- [x] Show extracted values below the textarea with status indicators
- [x] Handle common paste formats and French text
- [x] Auto-convert square meters to square feet
- [x] Real-time extraction as user types/pastes
- [x] Visual feedback for success, partial, or error states

### Phase 5: Validation & Integration ✅
- [x] Validate Municipal Value is numeric and reasonable (100k-10M)
- [x] Validate Lot Size is numeric (100-50000 sq ft)
- [x] Validate Year Built is between 1800-current year
- [x] Add error messages for invalid inputs
- [x] Enable "Continue" button only when all fields valid
- [x] Add visual feedback (red borders) for invalid fields
- [x] Show validation errors in MunicipalValueStep component
- [x] Disable "Next Step" button until required fields are valid

### Phase 6: UI Polish
- [ ] Style method selection tabs/buttons
- [ ] Add icons for each method (FileUp, Edit, Copy)
- [ ] Ensure smooth transitions between methods
- [ ] Keep extracted data when switching methods

## Future Enhancements
- [ ] Integrate real Montreal assessment roll PDFs for comparable properties
  - Parse multiple assessment PDFs from same neighborhood
  - Extract real property addresses and values
  - Store in database for accurate comparables
  - Replace simulated data with actual assessment data

## Completed Tasks
✅ All Phase 1-5 tasks completed
✅ Step 3: Property Condition Assessment with valuation logic
✅ Step 4: Comparable Market Analysis with simulated data

## Task Planning Details

### Files to Create/Modify:
1. `/src/app/application/page.tsx` - Add lotSize, yearBuilt to state
2. `/src/components/MunicipalValueStep.tsx` - Main Step 2 component
3. `/src/components/value-capture/PDFUploadMethod.tsx` - PDF upload
4. `/src/components/value-capture/ManualEntryMethod.tsx` - Manual input
5. `/src/components/value-capture/CopyPasteMethod.tsx` - Copy/paste

### Dependencies:
- No new packages for now (PDF parsing will use placeholder)
- Using existing shadcn/ui components
- Lucide icons for UI

### Expected Outcome:
- PDF upload as the prominent first option
- Three working methods to capture municipal data
- Extracted values properly validated
- Data saved to state for Step 3

## Review Section
### Summary of Changes
- (To be filled after changes are made)

### New Dependencies Added
- (To be filled after changes are made)

### Environment Variables Needed
- (To be filled after changes are made)

### Known Limitations/Future Improvements
- PDF parsing is placeholder (real implementation needs pdf.js or similar)
- No OCR for scanned PDFs yet
- French/English language detection not implemented