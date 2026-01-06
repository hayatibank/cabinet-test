/* /webapp/js/utils/languageSwitcher.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Fixed top-right language switcher
// - Smooth animations
// - Cyberpunk design

import { getCurrentLanguage, toggleLanguage, updatePageTranslations } from './i18n.js';

/**
 * Create and inject language switcher into DOM
 */
export function createLanguageSwitcher() {
  // Check if already exists
  if (document.getElementById('languageSwitcher')) {
    console.log('⚠️ Language switcher already exists');
    return;
  }
  
  // Create container
  const switcher = document.createElement('div');
  switcher.id = 'languageSwitcher';
  switcher.className = 'language-switcher';
  
  // Create button
  const button = document.createElement('button');
  button.className = 'language-switcher-btn';
  button.setAttribute('aria-label', 'Switch language');
  
  // Update button text based on current language
  updateSwitcherText(button);
  
  // Click handler
  button.addEventListener('click', () => {
    const newLang = toggleLanguage();
    updateSwitcherText(button);
    updatePageTranslations();
    
    // Smooth bounce animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
    
    console.log(`🌍 Language switched to: ${newLang}`);
  });
  
  switcher.appendChild(button);
  document.body.appendChild(switcher);
  
  console.log('✅ Language switcher created');
}

/**
 * Update switcher button text
 */
function updateSwitcherText(button) {
  const currentLang = getCurrentLanguage();
  
  if (currentLang === 'ru') {
    button.innerHTML = `
      <span class="flag">🇷🇺</span>
      <span class="lang-text">RU</span>
      <span class="divider">|</span>
      <span class="lang-text inactive">EN</span>
    `;
  } else {
    button.innerHTML = `
      <span class="flag">🇬🇧</span>
      <span class="lang-text inactive">RU</span>
      <span class="divider">|</span>
      <span class="lang-text">EN</span>
    `;
  }
}

/**
 * Remove language switcher
 */
export function removeLanguageSwitcher() {
  const switcher = document.getElementById('languageSwitcher');
  if (switcher) {
    switcher.remove();
    console.log('🗑️ Language switcher removed');
  }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLanguageSwitcher);
  } else {
    createLanguageSwitcher();
  }
}