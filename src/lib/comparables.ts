interface ComparableProperty {
  address: string;
  price: number;
  status: 'Listed' | 'Sold';
  daysOnMarket?: number;
  soldDate?: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
}

export function generateComparables(
  baseAddress: string,
  calculatedValue: number,
  bedrooms: number = 3,
  bathrooms: number = 2
): ComparableProperty[] {
  const comparables: ComparableProperty[] = [];
  
  // Extract street number and name from address
  const addressMatch = baseAddress.match(/^(\d+)\s+(.+?)(?:,|$)/);
  if (!addressMatch) {
    return [];
  }
  
  const baseStreetNumber = parseInt(addressMatch[1]);
  const streetName = addressMatch[2];
  
  // Generate 4 comparables with varying street numbers
  const offsets = [
    { offset: -150, priceVariation: 0.92 },
    { offset: -75, priceVariation: 1.05 },
    { offset: 100, priceVariation: 0.97 },
    { offset: 200, priceVariation: 1.08 }
  ];
  
  offsets.forEach((item) => {
    const newStreetNumber = Math.max(1, baseStreetNumber + item.offset);
    const price = Math.round(calculatedValue * item.priceVariation);
    
    // Randomly decide if it's listed or sold
    const isSold = Math.random() > 0.5;
    
    comparables.push({
      address: `${newStreetNumber} ${streetName}`,
      price: price,
      status: isSold ? 'Sold' : 'Listed',
      daysOnMarket: isSold ? undefined : Math.floor(Math.random() * 60) + 5,
      soldDate: isSold ? generateRecentDate() : undefined,
      bedrooms: bedrooms + (Math.random() > 0.7 ? 1 : 0),
      bathrooms: bathrooms + (Math.random() > 0.8 ? 0.5 : 0),
      squareFeet: Math.round(1200 + Math.random() * 800)
    });
  });
  
  return comparables;
}

function generateRecentDate(): string {
  const daysAgo = Math.floor(Math.random() * 90) + 1;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function calculateMarketMetrics(comparables: ComparableProperty[], estimatedValue: number) {
  const avgPrice = Math.round(comparables.reduce((sum, comp) => sum + comp.price, 0) / comparables.length);
  const avgPricePerSqFt = Math.round(comparables.reduce((sum, comp) => sum + (comp.price / comp.squareFeet), 0) / comparables.length);
  
  // Determine market trend based on listed vs sold ratio and days on market
  const listedProps = comparables.filter(c => c.status === 'Listed');
  const avgDaysOnMarket = listedProps.length > 0 
    ? listedProps.reduce((sum, c) => sum + (c.daysOnMarket || 0), 0) / listedProps.length
    : 0;
  
  let marketTrend: 'Hot' | 'Stable' | 'Cool';
  if (avgDaysOnMarket < 20 && listedProps.length <= 1) {
    marketTrend = 'Hot';
  } else if (avgDaysOnMarket > 40 || listedProps.length >= 3) {
    marketTrend = 'Cool';
  } else {
    marketTrend = 'Stable';
  }
  
  // Calculate confidence based on how close estimate is to market average
  const difference = Math.abs(estimatedValue - avgPrice) / avgPrice;
  let confidence: 'High' | 'Medium' | 'Low';
  if (difference < 0.05) {
    confidence = 'High';
  } else if (difference < 0.10) {
    confidence = 'Medium';
  } else {
    confidence = 'Low';
  }
  
  return {
    avgPrice,
    avgPricePerSqFt,
    marketTrend,
    confidence
  };
}