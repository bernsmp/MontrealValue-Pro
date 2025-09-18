export interface ValidationError {
  field: string;
  message: string;
}

export interface PropertyValidation {
  municipalValue: string | null;
  landValue: string | null;
  lotSize: string | null;
  yearBuilt: string | null;
}

export const validateMunicipalValue = (value: string): string | null => {
  if (!value || value === "") {
    return "Property value is required";
  }
  
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return "Property value must be a number";
  }
  
  if (numValue < 100000) {
    return "Property value must be at least $100,000";
  }
  
  if (numValue > 10000000) {
    return "Property value cannot exceed $10,000,000";
  }
  
  return null;
};

export const validateLotSize = (value: string): string | null => {
  if (!value || value === "") {
    return null; // Optional field
  }
  
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return "Lot size must be a number";
  }
  
  if (numValue < 100) {
    return "Lot size must be at least 100 sq ft";
  }
  
  if (numValue > 50000) {
    return "Lot size cannot exceed 50,000 sq ft";
  }
  
  return null;
};

export const validateYearBuilt = (value: string): string | null => {
  if (!value || value === "") {
    return null; // Optional field
  }
  
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return "Year must be a number";
  }
  
  const currentYear = new Date().getFullYear();
  
  if (numValue < 1800) {
    return "Year built cannot be before 1800";
  }
  
  if (numValue > currentYear) {
    return `Year built cannot be after ${currentYear}`;
  }
  
  return null;
};

export const validatePropertyData = (data: {
  municipalValue: string;
  landValue?: string;
  lotSize?: string;
  yearBuilt?: string;
}): PropertyValidation => {
  return {
    municipalValue: validateMunicipalValue(data.municipalValue || ""),
    landValue: null, // No validation for land value
    lotSize: data.lotSize ? validateLotSize(data.lotSize) : null,
    yearBuilt: data.yearBuilt ? validateYearBuilt(data.yearBuilt) : null
  };
};

export const isPropertyDataValid = (data: {
  municipalValue: string;
  lotSize?: string;
  yearBuilt?: string;
}): boolean => {
  // If municipal value is empty, consider it invalid but don't show errors
  if (!data.municipalValue || data.municipalValue === "") {
    return false;
  }
  
  const validation = validatePropertyData(data);
  // Only municipal value is required
  return validation.municipalValue === null && 
         validation.lotSize === null && 
         validation.yearBuilt === null;
};