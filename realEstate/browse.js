/* /webapp/realEstate/browse.js v1.0.0 */
// Browse all available units with filters

import { t } from './i18n.js';
import { renderUnitDetail } from './unitDetail.js';
import { 
  fetchAllUnits, 
  filterUnits, 
  convertCurrency,
  formatPrice,
  formatNumber,
  sqftToSqm,
  getPriceRange,
  getAreaRange
} from './realEstateService.js';

let allUnits = [];
let filteredUnits = [];
let currentFilters = {
  minPrice: null,
  maxPrice: null,
  minArea: null,
  maxArea: null,
  bedrooms: [],
  type: [],
  sortBy: 'priceAsc'
};

// Exchange rates (will be fetched from API)
let exchangeRates = {
  rub: 25,
  usd: 0.272
};

/**
 * Render browse page
 * @param {string} containerId - Container element ID
 */
export async function renderBrowsePage(containerId = 'cabinetContent') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }
  
  // Create browse container
  container.innerHTML = `
    <div class="real-estate-browse">
      <div class="browse-header">
        <h1>${t('realEstate.browse.title')}</h1>
        <p>${t('realEstate.browse.subtitle')}</p>
      </div>
      
      <div class="browse-stats" id="browseStats">
        <div class="stat-item">
          <div class="stat-value">-</div>
          <div class="stat-label">${t('realEstate.browse.totalUnits')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">-</div>
          <div class="stat-label">${t('realEstate.browse.showingUnits')}</div>
        </div>
      </div>
      
      <div class="filters-container" id="filtersContainer">
        <!-- Filters will be rendered here -->
      </div>
      
      <div id="unitsContainer">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-text">${t('realEstate.browse.loading')}</div>
        </div>
      </div>
    </div>
  `;
  
  // Load data
  try {
    allUnits = await fetchAllUnits();
    filteredUnits = [...allUnits];
    
    // Render filters
    renderFilters();
    
    // Render units
    renderUnits();
    
    // Update stats
    updateStats();
    
  } catch (err) {
    console.error('Error loading units:', err);
    document.getElementById('unitsContainer').innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">⚠️</div>
        <div class="no-results-text">${t('msg.error')}</div>
        <div class="no-results-hint">${t('msg.tryAgain')}</div>
      </div>
    `;
  }
}

/**
 * Render filters panel
 */
function renderFilters() {
  const container = document.getElementById('filtersContainer');
  if (!container) return;
  
  const priceRange = getPriceRange(allUnits);
  const areaRange = getAreaRange(allUnits);
  
  container.innerHTML = `
    <div class="filters-header">
      <h3>${t('filters.title')}</h3>
      <button class="btn-reset-filters" onclick="window.resetFilters()">
        ${t('filters.reset')}
      </button>
    </div>
    
    <div class="filters-grid">
      <!-- Price Range -->
      <div class="filter-group">
        <div class="filter-label">${t('filters.priceRange')}</div>
        <div class="range-inputs">
          <input 
            type="number" 
            id="minPrice" 
            placeholder="${formatNumber(priceRange.min)}"
            value="${currentFilters.minPrice || ''}"
          >
          <span class="range-separator">—</span>
          <input 
            type="number" 
            id="maxPrice" 
            placeholder="${formatNumber(priceRange.max)}"
            value="${currentFilters.maxPrice || ''}"
          >
        </div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          ${t('unit.aed')}
        </div>
      </div>
      
      <!-- Area Range -->
      <div class="filter-group">
        <div class="filter-label">${t('filters.areaRange')}</div>
        <div class="range-inputs">
          <input 
            type="number" 
            id="minArea" 
            placeholder="${formatNumber(areaRange.min)}"
            value="${currentFilters.minArea || ''}"
          >
          <span class="range-separator">—</span>
          <input 
            type="number" 
            id="maxArea" 
            placeholder="${formatNumber(areaRange.max)}"
            value="${currentFilters.maxArea || ''}"
          >
        </div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
          ${t('unit.sqft')}
        </div>
      </div>
      
      <!-- Bedrooms -->
      <div class="filter-group">
        <div class="filter-label">${t('filters.bedrooms')}</div>
        <div class="filter-checkboxes" id="bedroomsFilter">
          ${renderCheckbox('bedrooms', 'studio', t('bedrooms.studio'))}
          ${renderCheckbox('bedrooms', 1, t('bedrooms.1br'))}
          ${renderCheckbox('bedrooms', 2, t('bedrooms.2br'))}
          ${renderCheckbox('bedrooms', 3, t('bedrooms.3br'))}
          ${renderCheckbox('bedrooms', '3+', t('bedrooms.3br_plus'))}
        </div>
      </div>
      
      <!-- Property Type -->
      <div class="filter-group">
        <div class="filter-label">${t('filters.type')}</div>
        <div class="filter-checkboxes" id="typeFilter">
          ${renderCheckbox('type', 'apartment', t('type.apartment'))}
          ${renderCheckbox('type', 'retail', t('type.retail'))}
          ${renderCheckbox('type', 'office', t('type.office'))}
          ${renderCheckbox('type', 'fnb', t('type.fnb'))}
        </div>
      </div>
      
      <!-- Sort -->
      <div class="filter-group">
        <div class="filter-label">${t('filters.sortBy')}</div>
        <select class="filter-select" id="sortBy">
          <option value="priceAsc">${t('sort.priceAsc')}</option>
          <option value="priceDesc">${t('sort.priceDesc')}</option>
          <option value="areaAsc">${t('sort.areaAsc')}</option>
          <option value="areaDesc">${t('sort.areaDesc')}</option>
          <option value="roiDesc">${t('sort.roiDesc')}</option>
        </select>
      </div>
    </div>
  `;
  
  // Attach event listeners
  attachFilterListeners();
}

/**
 * Render checkbox
 */
function renderCheckbox(filterType, value, label) {
  const isChecked = currentFilters[filterType]?.includes(value) ? 'checked' : '';
  return `
    <label class="checkbox-label ${isChecked}" data-filter="${filterType}" data-value="${value}">
      <input type="checkbox" ${isChecked} onchange="window.toggleFilter('${filterType}', '${value}')">
      ${label}
    </label>
  `;
}

/**
 * Attach filter listeners
 */
function attachFilterListeners() {
  // Price inputs
  ['minPrice', 'maxPrice', 'minArea', 'maxArea'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('change', applyFilters);
    }
  });
  
  // Sort select
  const sortSelect = document.getElementById('sortBy');
  if (sortSelect) {
    sortSelect.value = currentFilters.sortBy;
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      applyFilters();
    });
  }
}

/**
 * Toggle filter checkbox
 */
window.toggleFilter = function(filterType, value) {
  // Convert value to correct type
  const convertedValue = (value === 'studio' || value === '3+') ? value : Number(value);
  
  if (!currentFilters[filterType]) {
    currentFilters[filterType] = [];
  }
  
  const index = currentFilters[filterType].indexOf(convertedValue);
  
  if (index > -1) {
    currentFilters[filterType].splice(index, 1);
  } else {
    currentFilters[filterType].push(convertedValue);
  }
  
  // Update checkbox visual state
  const label = document.querySelector(`[data-filter="${filterType}"][data-value="${value}"]`);
  if (label) {
    label.classList.toggle('checked');
  }
  
  applyFilters();
};

/**
 * Reset all filters
 */
window.resetFilters = function() {
  currentFilters = {
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    bedrooms: [],
    type: [],
    sortBy: 'priceAsc'
  };
  
  renderFilters();
  applyFilters();
};

/**
 * Apply current filters
 */
function applyFilters() {
  // Get input values
  currentFilters.minPrice = Number(document.getElementById('minPrice')?.value) || null;
  currentFilters.maxPrice = Number(document.getElementById('maxPrice')?.value) || null;
  currentFilters.minArea = Number(document.getElementById('minArea')?.value) || null;
  currentFilters.maxArea = Number(document.getElementById('maxArea')?.value) || null;
  
  // Filter units
  filteredUnits = filterUnits(allUnits, currentFilters);
  
  // Re-render units
  renderUnits();
  
  // Update stats
  updateStats();
}

/**
 * Render units grid
 */
function renderUnits() {
  const container = document.getElementById('unitsContainer');
  if (!container) return;
  
  if (filteredUnits.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">${t('realEstate.browse.noResults')}</div>
        <div class="no-results-hint">${t('filters.reset')}</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="units-grid">
      ${filteredUnits.map(unit => createUnitCard(unit)).join('')}
    </div>
  `;
  
  // Attach click handlers
  filteredUnits.forEach((unit, index) => {
    const card = container.querySelector(`[data-unit-index="${index}"]`);
    if (card) {
      card.addEventListener('click', () => {
        window.openUnitDetail(unit.projectId, unit.unitNumber);
      });
    }
  });
}

/**
 * Create unit card HTML
 */
function createUnitCard(unit, index) {
  const prices = convertCurrency(unit.unitPriceAed, exchangeRates);
  const areaSqm = sqftToSqm(unit.unitAreaTotalSqFt);
  
  return `
    <div class="unit-card" data-unit-index="${index}">
      <div class="unit-image">
        <img src="${unit.projectIntroImgLink || '/assets/placeholder-unit.jpg'}" alt="${unit.projectName}">
        <div class="unit-badge">${t('unit.available')}</div>
      </div>
      
      <div class="unit-content">
        <h3 class="unit-title">${unit.projectName}</h3>
        <p class="unit-subtitle">${unit.unitType} • ${unit.buildingCode || ''}</p>
        
        <div class="unit-specs">
          <div class="spec-item">
            <span class="spec-icon">🛏️</span>
            <span>${unit.unitBedrooms} ${t('unit.bedrooms')}</span>
          </div>
          <div class="spec-item">
            <span class="spec-icon">📐</span>
            <span>${formatNumber(areaSqm)} ${t('unit.sqm')}</span>
          </div>
        </div>
        
        ${unit.unitCashOnCashROI ? `
          <div class="unit-metrics">
            <div class="metric-item">
              <div class="metric-label">${t('unit.roi')}</div>
              <div class="metric-value">${(unit.unitCashOnCashROI * 100).toFixed(1)}%</div>
            </div>
          </div>
        ` : ''}
        
        <div class="unit-price">
          <div class="price-primary">${formatPrice(prices.aed, 'AED')}</div>
          <div class="price-secondary">
            ${formatPrice(prices.rub, 'RUB')} • ${formatPrice(prices.usd, 'USD')}
          </div>
        </div>
        
        <div class="unit-cta">
          <button class="btn-view-unit">
            ${t('unit.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Update statistics
 */
function updateStats() {
  const statsContainer = document.getElementById('browseStats');
  if (!statsContainer) return;
  
  statsContainer.innerHTML = `
    <div class="stat-item">
      <div class="stat-value">${formatNumber(allUnits.length)}</div>
      <div class="stat-label">${t('realEstate.browse.totalUnits')}</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${formatNumber(filteredUnits.length)}</div>
      <div class="stat-label">${t('realEstate.browse.showingUnits')}</div>
    </div>
  `;
}

/**
 * Open unit detail page
 */
window.openUnitDetail = async function(projectId, unitNumber) {
  console.log('🏢 Opening unit detail:', projectId, unitNumber);
  await renderUnitDetail(projectId, unitNumber, 'cabinetContent');
};
