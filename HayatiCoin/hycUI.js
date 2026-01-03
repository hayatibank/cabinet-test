/* /webapp/HayatiCoin/hycUI.js v1.1.0 */
// CHANGELOG v1.1.0:
// - ADDED: Auto-refresh after claim/reward
// - IMPROVED: Brighter gradient styling (like in screenshot)
// - ADDED: refreshHYCBalance() for external calls
// CHANGELOG v1.0.0:
// - Initial release
// - Render HYC balance in cabinet header
// - Minimal gradient styling

import { formatHYC, getHYCBalance } from './hycService.js';
import { t } from './i18n.js';

/**
 * Render HYC balance in cabinet header
 */
export function renderHYCBalance(balance) {
  const userEmailEl = document.querySelector('.user-email');
  
  if (!userEmailEl) {
    console.warn('⚠️ [HYC] User email element not found');
    return;
  }
  
  // Check if HYC balance already exists
  let hycEl = document.querySelector('.hyc-balance');
  
  if (!hycEl) {
    // Create element
    hycEl = document.createElement('p');
    hycEl.className = 'hyc-balance';
    
    // Insert after user email
    userEmailEl.parentNode.insertBefore(hycEl, userEmailEl.nextSibling);
  }
  
  // Update balance with diamond icon
  hycEl.innerHTML = `💎 ${formatHYC(balance)} HYC`;
  
  console.log('✅ [HYC] Balance rendered:', formatHYC(balance));
}

/**
 * Refresh HYC balance from server
 * @returns {Promise<number|null>} - New balance or null
 */
export async function refreshHYCBalance() {
  try {
    console.log('🔄 [HYC] Refreshing balance...');
    
    const hycData = await getHYCBalance();
    
    if (hycData && hycData.success) {
      renderHYCBalance(hycData.balance);
      console.log('✅ [HYC] Balance refreshed:', hycData.balance);
      return hycData.balance;
    }
    
    return null;
  } catch (err) {
    console.error('❌ [HYC] Error refreshing balance:', err);
    return null;
  }
}

/**
 * Update HYC balance (silent)
 */
export async function updateHYCBalance(newBalance) {
  renderHYCBalance(newBalance);
}

// Expose refreshHYCBalance globally for easy access
if (typeof window !== 'undefined') {
  window.refreshHYCBalance = refreshHYCBalance;
}