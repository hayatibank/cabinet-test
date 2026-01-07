/* /webapp/investments/level1.js v1.1.0 */
// CHANGELOG v1.1.0:
// - ADDED: Modular i18n support
// - REPLACED: All hardcoded strings with t() calls
// - IMPORTS: investments/i18n.js module
// CHANGELOG v1.0.0:
// - Initial release
// - Level 1 investment dashboard

// import { t } from './i18n.js';

/**
 * Render Level 1 Investment Dashboard
 * @param {string} accountId - Account ID
 */
export async function renderLevel1(accountId) {

  const t = window.i18n.t.bind(window.i18n);

  try {
    console.log(`📊 [Investments] Rendering Level 1 dashboard for: ${accountId}`);
    
    const container = document.getElementById('dashboardContent');
    
    if (!container) {
      console.error('❌ Dashboard content container not found');
      return;
    }
    
    // Render dashboard structure
    container.innerHTML = `
      <div class="investment-dashboard">
        <div class="dashboard-header-inv">
          <h2 data-i18n="investment.level1.title">${t('investment.level1.title')}</h2>
          <p class="subtitle" data-i18n="investment.level1.subtitle">${t('investment.level1.subtitle')}</p>
        </div>
        
        <!-- Summary Cards -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="summary-icon">💰</div>
            <div class="summary-content">
              <p class="summary-label" data-i18n="investment.summary.totalInvested">${t('investment.summary.totalInvested')}</p>
              <p class="summary-value">0 ₽</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">📈</div>
            <div class="summary-content">
              <p class="summary-label" data-i18n="investment.summary.currentValue">${t('investment.summary.currentValue')}</p>
              <p class="summary-value">0 ₽</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">🎯</div>
            <div class="summary-content">
              <p class="summary-label" data-i18n="investment.summary.totalReturn">${t('investment.summary.totalReturn')}</p>
              <p class="summary-value">0%</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">📊</div>
            <div class="summary-content">
              <p class="summary-label" data-i18n="investment.summary.activePositions">${t('investment.summary.activePositions')}</p>
              <p class="summary-value">0</p>
            </div>
          </div>
        </div>
        
        <!-- My Portfolio Section -->
        <div class="portfolio-section">
          <h3 data-i18n="investment.portfolio.title">${t('investment.portfolio.title')}</h3>
          <div class="portfolio-content">
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <p data-i18n="investment.portfolio.empty">${t('investment.portfolio.empty')}</p>
              <p class="subtitle" data-i18n="investment.portfolio.emptyDesc">${t('investment.portfolio.emptyDesc')}</p>
            </div>
          </div>
        </div>
        
        <!-- Available Assets Section -->
        <div class="assets-section">
          <div class="section-header">
            <div>
              <h3 data-i18n="investment.available.title">${t('investment.available.title')}</h3>
              <p class="subtitle" data-i18n="investment.available.subtitle">${t('investment.available.subtitle')}</p>
            </div>
          </div>
          
          <div class="assets-grid">
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3;">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
              <p data-i18n="investment.available.empty">${t('investment.available.empty')}</p>
              <p class="subtitle" data-i18n="investment.available.emptyDesc">${t('investment.available.emptyDesc')}</p>
            </div>
          </div>
        </div>
        
        <!-- Transaction History Section -->
        <div class="history-section">
          <h3 data-i18n="investment.history.title">${t('investment.history.title')}</h3>
          <div class="history-content">
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3;">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
              <p data-i18n="investment.history.empty">${t('investment.history.empty')}</p>
              <p class="subtitle" data-i18n="investment.history.emptyDesc">${t('investment.history.emptyDesc')}</p>
            </div>
          </div>
        </div>
        
        <!-- Coming Soon Notice -->
        <div class="coming-soon-notice">
          <p data-i18n="investment.comingSoon">${t('investment.comingSoon')}</p>
          <p class="subtitle" data-i18n="investment.comingSoonDesc">${t('investment.comingSoonDesc')}</p>
        </div>
      </div>
    `;
    
    console.log('✅ [Investments] Level 1 dashboard rendered');
    
  } catch (err) {
    console.error('❌ [Investments] Error rendering Level 1:', err);
    
    const container = document.getElementById('dashboardContent');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p data-i18n="investment.error">${t('investment.error')}</p>
          <p data-i18n="investment.error.loadFailed">${t('investment.error.loadFailed')}</p>
        </div>
      `;
    }
  }
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (RUB, USD, etc.)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'RUB') {
  const formatters = {
    RUB: new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }),
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }),
    AED: new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' })
  };
  
  return formatters[currency]?.format(amount) || `${amount} ${currency}`;
}

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

console.log('✅ [Investments] level1.js loaded with i18n support');