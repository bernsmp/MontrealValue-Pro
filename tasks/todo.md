# Project Tasks

## Current Tasks - Step 2: Municipal Value Capture (Montreal.ca PDF)

### Phase 1: Basic Setup ✅
- [x] Create MunicipalValueStep component for Step 2
- [x] Add lotSize and yearBuilt fields to propertyData state
- [x] Update Step 2 in the application flow to use new component

### Phase 2: PDF Upload (Primary Method)
- [ ] Create PDFUploadMethod component with drag-and-drop area
- [ ] Add file input that accepts only PDF files
- [ ] Show upload progress and file name when uploaded
- [ ] Create placeholder parser function that extracts mock data
- [ ] Display extracted values: Valeur totale, Superficie, Année de construction

### Phase 3: Manual Entry (Secondary Method)
- [ ] Create ManualEntryMethod component with three input fields
- [ ] Add visual guide showing where to find values on montreal.ca PDF
- [ ] Include example values as placeholders
- [ ] Add simple tooltips for each field

### Phase 4: Copy/Paste Method (Tertiary Method)
- [ ] Create CopyPasteMethod component with textarea
- [ ] Add regex to extract "Valeur totale", "Superficie", "Année de construction"
- [ ] Show extracted values below the textarea
- [ ] Handle common paste formats

### Phase 5: Validation & Integration
- [ ] Validate Municipal Value is numeric and reasonable (100k-10M)
- [ ] Validate Lot Size is numeric (100-50000 sq ft)
- [ ] Validate Year Built is between 1800-current year
- [ ] Add error messages for invalid inputs
- [ ] Enable "Continue" button only when all fields valid

### Phase 6: UI Polish
- [ ] Style method selection tabs/buttons
- [ ] Add icons for each method (FileUp, Edit, Copy)
- [ ] Ensure smooth transitions between methods
- [ ] Keep extracted data when switching methods

## Completed Tasks
(None yet)

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