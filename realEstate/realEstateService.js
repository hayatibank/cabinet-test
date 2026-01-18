/* /webapp/realEstate/realEstateService.js v1.1.0 */
// CHANGELOG v1.1.0:
// - CRITICAL FIX: Use HBD_AVAILABLE_UNITS for unit details (avoid Firestore path issues with # symbol)
// - OPTIMIZED: No additional Firestore requests for unit details
// - Project info still fetched separately when needed
// Real Estate data service - Firestore operations

import { getSession } from '../js/session.js';
import { API_URL } from '../js/config.js';

// Cache for available units
let cachedUnits = null;
let cacheTimestamp = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all available units from market pool
 * @returns {Promise<Array>} Array of available units
 */
export async function fetchAllUnits() {
  try {
    // Check cache first
    if (cachedUnits && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_TTL)) {
      console.log(`✅ Using cached units (${cachedUnits.length} units)`);
      return cachedUnits;
    }
    
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
    
    // Update cache
    cachedUnits = units;
    cacheTimestamp = Date.now();
    
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
 * @param {string} unitNumber - Unit number (e.g. "I-102" or "1124")
 * @returns {Promise<Object>} Unit details
 */
export async function fetchUnitDetails(projectId, unitNumber) {
  try {
    console.log(`🏢 Fetching unit details: ${projectId}/${unitNumber}`);
    
    // Get all units from cache/market pool
    const allUnits = await fetchAllUnits();
    
    // Find unit by projectId AND unitNumber
    const unit = allUnits.find(u => 
      u.projectId === projectId && 
      (u.unitNumber === unitNumber || u.id === unitNumber)
    );
    
    if (!unit) {
      console.error(`❌ Unit not found: ${projectId}/${unitNumber}`);
      throw new Error('Unit not found');
    }
    
    console.log('✅ Unit details found:', unit.unitNumber);
    
    return unit;
    
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
    console.log(`📋 Fetching project info: ${projectId}`);
    
    // ⚠️ URL-encode the # symbol to avoid Firestore path issues
    const encodedProjectId = encodeURIComponent(projectId);
    
    const session = getSession();
    if (!session) throw new Error('No session');
    
    // Get all docs from info collection and find 'main'
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `HBD/${encodedProjectId}/info`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch project info from Firestore, using unit data as fallback`);
      // Fallback: get project data from any unit with matching projectId
      const units = await fetchAllUnits();
      const anyUnitFromProject = units.find(u => u.projectId === projectId);
      
      if (anyUnitFromProject) {
        // Extract project-level data from unit
        return {
          projectId: anyUnitFromProject.projectId,
          projectName: anyUnitFromProject.projectName,
          developerName: anyUnitFromProject.developerName,
          districtName: anyUnitFromProject.districtName,
          cityName: anyUnitFromProject.cityName,
          dateHandover: anyUnitFromProject.dateHandover,
          projectIntroImgLink: anyUnitFromProject.projectIntroImgLink,
          // Other fields may not be available
          paymentPlan: anyUnitFromProject.paymentPlan || 'N/A',
          ownership: anyUnitFromProject.ownership || 'freehold',
          location: anyUnitFromProject.location || ''
        };
      }
      
      throw new Error('Project info not found');
    }
    
    const result = await response.json();
    
    // Find 'main' document
    const mainInfo = result.documents?.find(doc => doc.id === 'main');
    
    if (!mainInfo) {
      console.warn(`⚠️ 'main' document not found in project info`);
      // Fallback same as above
      const units = await fetchAllUnits();
      const anyUnitFromProject = units.find(u => u.projectId === projectId);
      
      if (anyUnitFromProject) {
        return {
          projectId: anyUnitFromProject.projectId,
          projectName: anyUnitFromProject.projectName,
          developerName: anyUnitFromProject.developerName,
          districtName: anyUnitFromProject.districtName,
          cityName: anyUnitFromProject.cityName,
          dateHandover: anyUnitFromProject.dateHandover,
          projectIntroImgLink: anyUnitFromProject.projectIntroImgLink,
          paymentPlan: anyUnitFromProject.paymentPlan || 'N/A',
          ownership: anyUnitFromProject.ownership || 'freehold',
          location: anyUnitFromProject.location || ''
        };
      }
      
      throw new Error('Project info not found');
    }
    
    console.log('✅ Project info fetched');
    
    return mainInfo;
    
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
