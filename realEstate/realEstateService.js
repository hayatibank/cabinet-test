/* /webapp/realEstate/realEstateService.js v1.0.0 */
// Real Estate data service - Firestore operations

import { getSession } from '../js/session.js';
import { API_URL } from '../js/config.js';

/**
 * Fetch all available units from market pool
 * @returns {Promise<Array>} Array of available units
 */
export async function fetchAllUnits() {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log('🏢 Fetching all available units from market pool...');
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: 'HBD_AVAILABLE_UNITS',
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }
    
    const result = await response.json();
    const units = result.documents || [];
    
    console.log(`✅ Fetched ${units.length} available units`);
    
    return units;
    
  } catch (err) {
    console.error('❌ Error fetching units:', err);
    throw err;
  }
}

/**
 * Fetch single unit details
 * @param {string} projectId - Project ID (e.g. "#DXB513")
 * @param {string} unitId - Unit ID (e.g. "I-102")
 * @returns {Promise<Object>} Unit details
 */
export async function fetchUnitDetails(projectId, unitId) {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log(`🏢 Fetching unit details: ${projectId}/units/${unitId}`);
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `HBD/${projectId}/units/${unitId}`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      throw new Error('Unit not found');
    }
    
    const result = await response.json();
    console.log('✅ Unit details fetched');
    
    return result;
    
  } catch (err) {
    console.error('❌ Error fetching unit details:', err);
    throw err;
  }
}

/**
 * Fetch project info
 * @param {string} projectId - Project ID (e.g. "#DXB513")
 * @returns {Promise<Object>} Project info
 */
export async function fetchProjectInfo(projectId) {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log(`📋 Fetching project info: ${projectId}`);
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `HBD/${projectId}/info/main`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      throw new Error('Project info not found');
    }
    
    const result = await response.json();
    console.log('✅ Project info fetched');
    
    return result;
    
  } catch (err) {
    console.error('❌ Error fetching project info:', err);
    throw err;
  }
}

/**
 * Filter units by criteria
 * @param {Array} units - Array of units
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered units
 */
export function filterUnits(units, filters = {}) {
  let filtered = [...units];
  
  // Price range (AED)
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(u => u.unitPriceAed >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(u => u.unitPriceAed <= filters.maxPrice);
  }
  
  // Area range (sqft)
  if (filters.minArea !== undefined) {
    filtered = filtered.filter(u => u.unitAreaTotalSqFt >= filters.minArea);
  }
  if (filters.maxArea !== undefined) {
    filtered = filtered.filter(u => u.unitAreaTotalSqFt <= filters.maxArea);
  }
  
  // Bedrooms
  if (filters.bedrooms && filters.bedrooms.length > 0) {
    filtered = filtered.filter(u => {
      const beds = u.unitBedrooms;
      return filters.bedrooms.includes(beds) || 
             (filters.bedrooms.includes('3+') && beds >= 3) ||
             (filters.bedrooms.includes('studio') && beds === 0);
    });
  }
  
  // Property type
  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter(u => {
      const type = u.unitPropertyType?.toLowerCase() || '';
      return filters.type.some(t => {
        if (t === 'apartment') return type.includes('apartment') || type.includes('bedroom');
        if (t === 'retail') return type.includes('retail');
        if (t === 'office') return type.includes('office');
        if (t === 'fnb') return type.includes('f&b') || type.includes('restaurant');
        return false;
      });
    });
  }
  
  // Sort
  if (filters.sortBy) {
    filtered = sortUnits(filtered, filters.sortBy);
  }
  
  console.log(`🔍 Filtered: ${units.length} → ${filtered.length} units`);
  
  return filtered;
}

/**
 * Sort units by criteria
 * @param {Array} units - Array of units
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted units
 */
function sortUnits(units, sortBy) {
  const sorted = [...units];
  
  switch (sortBy) {
    case 'priceAsc':
      sorted.sort((a, b) => a.unitPriceAed - b.unitPriceAed);
      break;
    case 'priceDesc':
      sorted.sort((a, b) => b.unitPriceAed - a.unitPriceAed);
      break;
    case 'areaAsc':
      sorted.sort((a, b) => a.unitAreaTotalSqFt - b.unitAreaTotalSqFt);
      break;
    case 'areaDesc':
      sorted.sort((a, b) => b.unitAreaTotalSqFt - a.unitAreaTotalSqFt);
      break;
    case 'roiDesc':
      sorted.sort((a, b) => (b.unitCashOnCashROI || 0) - (a.unitCashOnCashROI || 0));
      break;
    case 'appreciationDesc':
      // TODO: Add when field is available
      sorted.sort((a, b) => (b.capitalAppreciation || 0) - (a.capitalAppreciation || 0));
      break;
    default:
      // Default: price ascending
      sorted.sort((a, b) => a.unitPriceAed - b.unitPriceAed);
  }
  
  return sorted;
}

/**
 * Convert currency
 * @param {number} amountAED - Amount in AED
 * @param {Object} rates - Exchange rates
 * @returns {Object} Converted amounts
 */
export function convertCurrency(amountAED, rates) {
  return {
    aed: amountAED,
    rub: amountAED * (rates?.rub || 25),
    usd: amountAED * (rates?.usd || 0.272)
  };
}

/**
 * Convert sqft to sqm
 * @param {number} sqft - Area in square feet
 * @returns {number} Area in square meters
 */
export function sqftToSqm(sqft) {
  return sqft * 0.092903;
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

/**
 * Format price
 * @param {number} price - Price amount
 * @param {string} currency - Currency code (AED/RUB/USD)
 * @returns {string} Formatted price
 */
export function formatPrice(price, currency = 'AED') {
  const symbols = {
    AED: 'AED',
    RUB: '₽',
    USD: '$'
  };
  
  const formatted = formatNumber(price);
  
  if (currency === 'AED' || currency === 'USD') {
    return `${symbols[currency]} ${formatted}`;
  } else {
    return `${formatted} ${symbols[currency]}`;
  }
}

/**
 * Get price range from units
 * @param {Array} units - Array of units
 * @returns {Object} Min and max prices
 */
export function getPriceRange(units) {
  if (!units || units.length === 0) {
    return { min: 0, max: 0 };
  }
  
  const prices = units.map(u => u.unitPriceAed).filter(p => p > 0);
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Get area range from units
 * @param {Array} units - Array of units
 * @returns {Object} Min and max areas
 */
export function getAreaRange(units) {
  if (!units || units.length === 0) {
    return { min: 0, max: 0 };
  }
  
  const areas = units.map(u => u.unitAreaTotalSqFt).filter(a => a > 0);
  
  return {
    min: Math.min(...areas),
    max: Math.max(...areas)
  };
}
