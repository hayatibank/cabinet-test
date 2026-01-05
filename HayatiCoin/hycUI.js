/* /webapp/HayatiCoin/hycUI.js v2.0.0 */
// CHANGELOG v2.0.0:
// - CHANGED: Diamond icon → HYC official logo (logo2.png)
// CHANGELOG v1.0.0:
// - Initial release
// - Render HYC balance in cabinet header

/**
 * Render HYC balance in cabinet header
 * @param {number} balance - HYC balance
 */
export function renderHYCBalance(balance) {
  try {
    const header = document.querySelector('.cabinet-header');
    
    if (!header) {
      console.warn('⚠️ [HYC UI] Cabinet header not found');
      return;
    }
    
    // Check if already rendered
    let balanceEl = header.querySelector('.hyc-balance');
    
    if (!balanceEl) {
      // Create balance element
      balanceEl = document.createElement('div');
      balanceEl.className = 'hyc-balance';
      header.appendChild(balanceEl);
    }
    
    // Format balance (max 4 decimals)
    const formatted = Number(balance).toFixed(4).replace(/\.?0+$/, '');
    
    // 🆕 CHANGED: Use official HYC logo instead of diamond
    balanceEl.innerHTML = `
      <img 
        src="https://hayati-coin.github.io/website/logo3.png" 
        alt="HYC" 
        class="hyc-logo"
        onerror="this.style.display='none'"
      />
      <span class="hyc-amount">${formatted} HYC</span>
    `;
    
    console.log('✅ [HYC] Balance rendered:', formatted);
    
  } catch (err) {
    console.error('❌ [HYC UI] Error rendering balance:', err);
  }
}

/**
 * Refresh HYC balance display
 */
export async function refreshHYCBalance() {
  try {
    const { getHYCBalance } = await import('./hycService.js');
    
    const result = await getHYCBalance();
    
    if (result && result.success) {
      renderHYCBalance(result.balance);
      console.log('✅ [HYC] Balance refreshed:', result.balance);
    } else {
      console.warn('⚠️ [HYC] Failed to refresh balance');
    }
    
  } catch (err) {
    console.error('❌ [HYC UI] Error refreshing balance:', err);
  }
}