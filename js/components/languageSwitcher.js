/* /webapp/js/components/languageSwitcher.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Top-right language switcher (always visible)
// - Auto-creates on page load
// - Integrates with global i18n manager

/**
 * Language Switcher Component
 * 
 * Auto-injects top-right language switcher into every screen
 * Requires: window.i18n to be initialized
 */
class LanguageSwitcher {
  constructor() {
    this.container = null;
    this.currentLang = 'ru';
  }
  
  /**
   * Create and inject switcher into DOM
   */
  create() {
    // Check if already exists
    if (document.getElementById('languageSwitcher')) {
      console.log('⚠️ [LanguageSwitcher] Already exists');
      return;
    }
    
    // Wait for i18n to be ready
    if (!window.i18n || !window.i18n.initialized) {
      console.log('⏳ [LanguageSwitcher] Waiting for i18n...');
      window.addEventListener('i18nReady', () => this.create());
      return;
    }
    
    this.currentLang = window.i18n.getCurrentLanguage();
    
    // Create container
    this.container = document.createElement('div');
    this.container.id = 'languageSwitcher';
    this.container.className = 'language-switcher';
    
    // Render buttons
    this.render();
    
    // Inject into DOM
    document.body.appendChild(this.container);
    
    // Listen for language changes
    window.addEventListener('languageChanged', (e) => {
      this.currentLang = e.detail.lang;
      this.render();
    });
    
    console.log('✅ [LanguageSwitcher] Created');
  }
  
  /**
   * Render switcher buttons
   */
  render() {
    if (!this.container) return;
    
    const languages = [
      { code: 'ru', flag: '🇷🇺', label: 'RU' },
      { code: 'en', flag: '🇬🇧', label: 'EN' }
    ];
    
    this.container.innerHTML = languages.map(lang => `
      <button 
        class="lang-btn ${lang.code === this.currentLang ? 'active' : ''}"
        onclick="window.languageSwitcher.switchLanguage('${lang.code}')"
        aria-label="Switch to ${lang.label}">
        <span class="lang-flag">${lang.flag}</span>
        <span class="lang-text">${lang.label}</span>
      </button>
    `).join('<span class="lang-divider">|</span>');
  }
  
  /**
   * Switch language
   */
  async switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    console.log(`🔄 [LanguageSwitcher] Switching to ${lang}...`);
    
    // Visual feedback
    this.container.style.opacity = '0.5';
    this.container.style.pointerEvents = 'none';
    
    try {
      await window.i18n.setLanguage(lang);
      
      // Success animation
      this.container.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.container.style.transform = 'scale(1)';
      }, 150);
      
    } catch (err) {
      console.error('❌ [LanguageSwitcher] Switch failed:', err);
    } finally {
      this.container.style.opacity = '1';
      this.container.style.pointerEvents = 'auto';
    }
  }
  
  /**
   * Remove switcher from DOM
   */
  remove() {
    if (this.container) {
      this.container.remove();
      this.container = null;
      console.log('🗑️ [LanguageSwitcher] Removed');
    }
  }
}

// Create global instance
if (typeof window !== 'undefined') {
  window.languageSwitcher = new LanguageSwitcher();
  
  // Auto-create when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.languageSwitcher.create();
    });
  } else {
    // DOM already loaded
    window.languageSwitcher.create();
  }
}