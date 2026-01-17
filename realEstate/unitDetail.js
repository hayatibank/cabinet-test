/* /webapp/realEstate/unitDetail.js v1.0.0 */
// Unit Detail Page - Full property information

import { t } from './i18n.js';
import { 
  fetchUnitDetails, 
  fetchProjectInfo,
  convertCurrency,
  formatPrice,
  formatNumber,
  sqftToSqm
} from './realEstateService.js';

// Exchange rates (will be fetched from API)
let exchangeRates = {
  rub: 25,
  usd: 0.272
};

/**
 * Render unit detail page
 * @param {string} projectId - Project ID (e.g. "#DXB513")
 * @param {string} unitId - Unit ID (e.g. "I-102")
 * @param {string} containerId - Container element ID
 */
export async function renderUnitDetail(projectId, unitId, containerId = 'cabinetContent') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }
  
  // Show loading
  container.innerHTML = `
    <div class="unit-detail-page">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">${t('msg.loadingUnit')}</div>
      </div>
    </div>
  `;
  
  try {
    // Fetch data
    const [unitData, projectData] = await Promise.all([
      fetchUnitDetails(projectId, unitId),
      fetchProjectInfo(projectId)
    ]);
    
    // Render page
    container.innerHTML = createDetailPage(unitData, projectData);
    
    // Attach event listeners
    attachEventListeners(unitData, projectData);
    
  } catch (err) {
    console.error('Error loading unit:', err);
    container.innerHTML = `
      <div class="unit-detail-page">
        <div class="no-results">
          <div class="no-results-icon">⚠️</div>
          <div class="no-results-text">${t('msg.unitNotFound')}</div>
          <div class="no-results-hint">${t('msg.tryAgain')}</div>
        </div>
      </div>
    `;
  }
}

/**
 * Create detail page HTML
 */
function createDetailPage(unit, project) {
  const prices = convertCurrency(unit.unitPriceAed, exchangeRates);
  const areaSqm = sqftToSqm(unit.unitAreaTotalSqFt);
  const pricePerSqft = unit.unitPriceAed / unit.unitAreaTotalSqFt;
  const pricePerSqm = unit.unitPriceAed / areaSqm;
  
  return `
    <div class="unit-detail-page">
      <!-- Back Button -->
      <div class="detail-back">
        <button class="btn-back" onclick="window.history.back()">
          <span>←</span>
          <span>${t('cta.backToBrowse')}</span>
        </button>
      </div>
      
      <!-- Hero Section -->
      <div class="detail-hero">
        <img 
          class="hero-image" 
          src="${project.projectIntroImgLink || '/assets/placeholder-unit.jpg'}" 
          alt="${project.projectName}"
        >
        <div class="hero-overlay">
          <h1 class="hero-title">${project.projectName}</h1>
          <p class="hero-subtitle">${unit.unitType} • ${unit.buildingCode || ''} • ${t('specs.unitNumber')}: ${unit.unitNumber}</p>
          
          <div class="hero-price">
            <div class="hero-price-main">${formatPrice(prices.aed, 'AED')}</div>
            <div class="hero-price-alt">
              ${formatPrice(prices.rub, 'RUB')} • ${formatPrice(prices.usd, 'USD')}
            </div>
          </div>
          
          <div class="hero-badges">
            <div class="badge badge-available">${t('unit.available')}</div>
            ${unit.unitCashOnCashROI ? `
              <div class="badge badge-roi">
                ${t('unit.roi')}: ${(unit.unitCashOnCashROI * 100).toFixed(1)}%
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="detail-content">
        <!-- Main Column -->
        <div class="detail-main">
          ${createSpecsSection(unit, prices, areaSqm, pricePerSqft, pricePerSqm)}
          ${createPaymentSection(unit, project)}
          ${createProjectSection(project)}
          ${createAmenitiesSection(project)}
          ${createLocationSection(project)}
        </div>
        
        <!-- Sidebar -->
        <div class="detail-sidebar">
          ${createCTACard(unit, project)}
        </div>
      </div>
    </div>
  `;
}

/**
 * Create specifications section
 */
function createSpecsSection(unit, prices, areaSqm, pricePerSqft, pricePerSqm) {
  return `
    <div class="detail-section">
      <div class="section-header">
        <span class="section-icon">📋</span>
        <h2 class="section-title">${t('detail.specs')}</h2>
      </div>
      
      <div class="specs-grid">
        <div class="spec-row">
          <div class="spec-label">${t('specs.bedrooms')}</div>
          <div class="spec-value spec-value-highlight">${unit.unitBedrooms}</div>
        </div>
        
        <div class="spec-row">
          <div class="spec-label">${t('specs.totalArea')}</div>
          <div class="spec-value">${formatNumber(areaSqm)} ${t('unit.sqm')} (${formatNumber(unit.unitAreaTotalSqFt)} ${t('unit.sqft')})</div>
        </div>
        
        ${unit.unitAreaInternalSqFt ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.internalArea')}</div>
            <div class="spec-value">${formatNumber(sqftToSqm(unit.unitAreaInternalSqFt))} ${t('unit.sqm')}</div>
          </div>
        ` : ''}
        
        ${unit.unitAreaExternalSqFt ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.externalArea')}</div>
            <div class="spec-value">${formatNumber(sqftToSqm(unit.unitAreaExternalSqFt))} ${t('unit.sqm')}</div>
          </div>
        ` : ''}
        
        <div class="spec-row">
          <div class="spec-label">${t('specs.pricePerSqm')}</div>
          <div class="spec-value">${formatPrice(pricePerSqm, 'AED')}/${t('unit.sqm')}</div>
        </div>
        
        <div class="spec-row">
          <div class="spec-label">${t('specs.pricePerSqft')}</div>
          <div class="spec-value">${formatPrice(pricePerSqft, 'AED')}/${t('unit.sqft')}</div>
        </div>
        
        <div class="spec-row">
          <div class="spec-label">${t('specs.type')}</div>
          <div class="spec-value">${unit.unitType}</div>
        </div>
        
        ${unit.buildingCode ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.building')}</div>
            <div class="spec-value">${unit.buildingCode}</div>
          </div>
        ` : ''}
      </div>
      
      ${unit.unitFloorplanLink ? `
        <a href="${unit.unitFloorplanLink}" target="_blank" class="btn-view-floorplan">
          📐 ${t('cta.downloadFloorPlan')}
        </a>
      ` : ''}
    </div>
  `;
}

/**
 * Create payment plan section
 */
function createPaymentSection(unit, project) {
  if (!project.paymentPlan) return '';
  
  return `
    <div class="detail-section">
      <div class="section-header">
        <span class="section-icon">💰</span>
        <h2 class="section-title">${t('detail.payment')}</h2>
      </div>
      
      <div class="payment-summary">
        <div class="payment-item">
          <span class="payment-label">${t('payment.plan')}</span>
          <span class="payment-value">${project.paymentPlan}</span>
        </div>
        
        <div class="payment-item payment-total">
          <span class="payment-label">${t('payment.total')}</span>
          <span class="payment-value">${formatPrice(unit.unitPriceAed, 'AED')}</span>
        </div>
      </div>
      
      ${project.paymentPlanSummary ? `
        <div class="payment-breakdown">
          <strong>${t('payment.breakdown')}:</strong>
          ${formatPaymentPlan(project.paymentPlanSummary)}
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Format payment plan text
 */
function formatPaymentPlan(text) {
  return text.split('.').map(line => {
    line = line.trim();
    return line ? `<p>• ${line}</p>` : '';
  }).join('');
}

/**
 * Create project section
 */
function createProjectSection(project) {
  return `
    <div class="detail-section">
      <div class="section-header">
        <span class="section-icon">🏗️</span>
        <h2 class="section-title">${t('detail.developer')}</h2>
      </div>
      
      <div class="specs-grid">
        <div class="spec-row">
          <div class="spec-label">${t('project.developer')}</div>
          <div class="spec-value">${project.developerName || '-'}</div>
        </div>
        
        <div class="spec-row">
          <div class="spec-label">${t('project.location')}</div>
          <div class="spec-value">${project.districtName}, ${project.cityName}</div>
        </div>
        
        <div class="spec-row">
          <div class="spec-label">${t('project.completion')}</div>
          <div class="spec-value">${project.dateHandover || '-'}</div>
        </div>
        
        ${project.buildingServiceChargeAEDsqf ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.serviceCharge')}</div>
            <div class="spec-value">${project.buildingServiceChargeAEDsqf} AED/${t('unit.sqft')}</div>
          </div>
        ` : ''}
        
        ${project.ownership ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.ownership')}</div>
            <div class="spec-value">${project.ownership}</div>
          </div>
        ` : ''}
        
        ${project.furnished ? `
          <div class="spec-row">
            <div class="spec-label">${t('specs.furnished')}</div>
            <div class="spec-value">${project.furnished}</div>
          </div>
        ` : ''}
      </div>
      
      ${project.projectLinkOfficial?.hyperlink ? `
        <a href="${project.projectLinkOfficial.hyperlink}" target="_blank" class="btn-view-floorplan">
          🔗 ${t('project.officialLink')}
        </a>
      ` : ''}
    </div>
  `;
}

/**
 * Create amenities section
 */
function createAmenitiesSection(project) {
  // Parse amenities from project description or use defaults
  const amenities = [
    { icon: '🏋️', name: t('amenities.gym') },
    { icon: '🏊', name: t('amenities.pool') },
    { icon: '💆', name: t('amenities.spa') },
    { icon: '🎬', name: t('amenities.cinema') },
    { icon: '👶', name: t('amenities.kids') },
    { icon: '🚗', name: t('amenities.parking') },
    { icon: '🔒', name: t('amenities.security') },
    { icon: '🎩', name: t('amenities.concierge') }
  ];
  
  return `
    <div class="detail-section">
      <div class="section-header">
        <span class="section-icon">✨</span>
        <h2 class="section-title">${t('detail.amenities')}</h2>
      </div>
      
      <div class="amenities-grid">
        ${amenities.map(a => `
          <div class="amenity-item">
            <span class="amenity-icon">${a.icon}</span>
            <span class="amenity-name">${a.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Create location section
 */
function createLocationSection(project) {
  return `
    <div class="detail-section">
      <div class="section-header">
        <span class="section-icon">📍</span>
        <h2 class="section-title">${t('detail.location')}</h2>
      </div>
      
      <div class="location-map">
        <div class="map-placeholder">🗺️</div>
      </div>
      
      <div class="location-details">
        <p><strong>${project.districtName}</strong>, ${project.cityName}</p>
        ${project.location ? `
          <a href="${project.location}" target="_blank" class="btn-view-floorplan" style="margin-top: 12px;">
            🗺️ ${t('cta.viewOnMap')}
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Create CTA card
 */
function createCTACard(unit, project) {
  return `
    <div class="cta-card">
      <h3 class="cta-title">${t('cta.scheduleViewing')}</h3>
      
      <div class="cta-buttons">
        <button class="btn-cta-primary" onclick="window.scheduleViewing()">
          📅 ${t('cta.scheduleViewing')}
        </button>
        
        <button class="btn-cta-secondary" onclick="window.requestCallback()">
          📞 ${t('cta.requestCallback')}
        </button>
        
        <button class="btn-cta-secondary" onclick="window.shareWhatsApp()">
          💬 ${t('cta.shareWhatsApp')}
        </button>
      </div>
      
      ${project.developerContact ? `
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">👤</span>
            <span>${project.developerContact}</span>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Attach event listeners
 */
function attachEventListeners(unit, project) {
  // Schedule viewing
  window.scheduleViewing = function() {
    console.log('Schedule viewing:', unit);
    // TODO: Open modal or redirect to booking form
    alert('Viewing scheduling coming soon! 🏗️');
  };
  
  // Request callback
  window.requestCallback = function() {
    console.log('Request callback:', unit);
    // TODO: Open callback form
    alert('Callback form coming soon! 📞');
  };
  
  // Share WhatsApp
  window.shareWhatsApp = function() {
    const message = encodeURIComponent(
      `Check out this property!\n\n` +
      `${project.projectName}\n` +
      `${unit.unitType} • ${unit.unitBedrooms} beds\n` +
      `${formatPrice(unit.unitPriceAed, 'AED')}\n\n` +
      `${window.location.href}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };
}

// Make function globally accessible
window.renderUnitDetail = renderUnitDetail;
