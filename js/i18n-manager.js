/* /webapp/js/i18n-manager.js v1.0.2 */
// CHANGELOG v1.0.2:
// - FIXED: updatePage() now called INSIDE init() automatically
// - FIXED: Guaranteed translations loaded before page update
// CHANGELOG v1.0.1:
// - FIXED: updatePage() now updates placeholders for inputs
// - FIXED: Better handling of different element types

/**
 * Global i18n Manager
 * 
 * Usage:
 *   await window.i18n.init();
 *   const text = window.i18n.t('auth.login.title');
 *   await window.i18n.setLanguage('en');
 */
class I18nManager {
  constructor() {
    this.currentLang = 'ru';
    this.translations = {};
    this.fallback = {}; // Russian as fallback
    this.initialized = false;
    this.supportedLanguages = ['ru', 'en', 'ar'];
  }
  
  /**
   * Initialize i18n system
   * Call this FIRST in app.js
   */
  async init() {
    console.log('🌍 [i18n] Initializing...');
    
    // Detect language
    this.currentLang = this.detectLanguage();
    console.log(`🎯 [i18n] Detected language: ${this.currentLang}`);
    
    // Load translations
    try {
      // Always load Russian as fallback
      await this.loadLanguage('ru');
      this.fallback = { ...this.translations };
      
      // Load detected language if not Russian
      if (this.currentLang !== 'ru') {
        await this.loadLanguage(this.currentLang);
      }
      
      this.initialized = true;
      console.log(`✅ [i18n] Ready (${Object.keys(this.translations).length} keys)`);
      
      // 🆕 CRITICAL: Update page INSIDE init() to guarantee translations are loaded
      this.updatePage();
      console.log('✅ [i18n] Initial page update completed');
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('i18nReady', {
        detail: { lang: this.currentLang }
      }));
      
    } catch (err) {
      console.error('❌ [i18n] Initialization failed:', err);
      this.initialized = false;
    }
  }
  
  /**
   * Detect user's preferred language
   * Priority: localStorage → Telegram → Browser → Default
   */
  detectLanguage() {
    // 1. User preference (localStorage)
    try {
      const saved = localStorage.getItem('hayati_lang');
      if (saved && this.supportedLanguages.includes(saved)) {
        console.log('💾 [i18n] Language from localStorage:', saved);
        return saved;
      }
    } catch (e) {
      console.warn('⚠️ [i18n] localStorage not available');
    }
    
    // 2. Telegram user language
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser?.language_code) {
        const lang = tgUser.language_code.toLowerCase().split('-')[0];
        if (this.supportedLanguages.includes(lang)) {
          console.log('🤖 [i18n] Language from Telegram:', lang);
          return lang;
        }
      }
    }
    
    // 3. Browser language
    if (typeof navigator !== 'undefined' && navigator.language) {
      const lang = navigator.language.toLowerCase().split('-')[0];
      if (this.supportedLanguages.includes(lang)) {
        console.log('🌐 [i18n] Language from browser:', lang);
        return lang;
      }
    }
    
    // 4. Default
    console.log('🏁 [i18n] Using default language: ru');
    return 'ru';
  }
  
  /**
   * Load translation file
   */
  async loadLanguage(lang) {
    try {
      console.log(`📦 [i18n] Loading ${lang}.json...`);
      
      const response = await fetch(`/i18n/${lang}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (lang === 'ru') {
        this.fallback = data;
      }
      
      if (lang === this.currentLang) {
        this.translations = data;
      }
      
      console.log(`✅ [i18n] Loaded ${lang}.json (${Object.keys(data).length} keys)`);
      
    } catch (err) {
      console.error(`❌ [i18n] Failed to load ${lang}.json:`, err);
      
      // If loading failed and we don't have fallback, throw
      if (Object.keys(this.fallback).length === 0) {
        throw new Error('Failed to load any translations');
      }
    }
  }
  
  /**
   * Get translation for key
   * Falls back to Russian if key not found in current language
   * Falls back to key itself if not found anywhere
   */
  t(key) {
    if (!this.initialized) {
      console.warn(`⚠️ [i18n] Not initialized, returning key: ${key}`);
      return key;
    }
    
    // Try current language
    if (this.translations[key] !== undefined) {
      return this.translations[key];
    }
    
    // Try fallback (Russian)
    if (this.fallback[key] !== undefined) {
      console.warn(`⚠️ [i18n] Key "${key}" not found in ${this.currentLang}, using fallback`);
      return this.fallback[key];
    }
    
    // Return key itself
    console.warn(`⚠️ [i18n] Key "${key}" not found in any language`);
    return key;
  }
  
  /**
   * Switch to different language
   */
  async setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error(`❌ [i18n] Language "${lang}" not supported`);
      return false;
    }
    
    if (this.currentLang === lang) {
      console.log(`ℹ️ [i18n] Already using ${lang}`);
      return true;
    }
    
    console.log(`🔄 [i18n] Switching to ${lang}...`);
    
    try {
      // Load new language
      await this.loadLanguage(lang);
      
      // Update current language
      this.currentLang = lang;
      
      // Save preference
      try {
        localStorage.setItem('hayati_lang', lang);
      } catch (e) {
        console.warn('⚠️ [i18n] Could not save language preference');
      }
      
      console.log(`✅ [i18n] Switched to ${lang}`);
      
      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang }
      }));
      
      // Update page
      this.updatePage();
      
      return true;
      
    } catch (err) {
      console.error(`❌ [i18n] Failed to switch to ${lang}:`, err);
      return false;
    }
  }
  
  /**
   * Update all translatable elements on page
   */
  updatePage() {
    console.log('🔄 [i18n] Updating page translations...');
    
    let updated = 0;
    let skipped = 0;
    
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      // Skip if translation is the same as key (not found)
      if (translation === key) {
        console.warn(`⚠️ [i18n] Missing translation key: ${key}`);
        skipped++;
        return;
      }
      
      // Update based on element type
      const tagName = element.tagName.toLowerCase();
      
      if (tagName === 'input' || tagName === 'textarea') {
        // For inputs/textareas: update placeholder
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translation;
          updated++;
        }
      } else if (tagName === 'button') {
        // For buttons: update textContent (preserves inner HTML like icons)
        // But we need to preserve SVG icons, so we find the <span> inside
        const span = element.querySelector('span');
        if (span) {
          span.textContent = translation;
        } else {
          element.textContent = translation;
        }
        updated++;
      } else {
        // For other elements: update textContent
        element.textContent = translation;
        updated++;
      }
    });
    
    // Update page title
    const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
    if (titleKey) {
      const titleTranslation = this.t(titleKey);
      if (titleTranslation !== titleKey) {
        document.title = titleTranslation;
        updated++;
      }
    }
    
    console.log(`✅ [i18n] Updated ${updated} elements, skipped ${skipped} missing keys`);
  }
  
  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
  
  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }
  
  /**
   * Check if language is supported
   */
  isSupported(lang) {
    return this.supportedLanguages.includes(lang);
  }
}

// Create global singleton
if (typeof window !== 'undefined') {
  window.i18n = new I18nManager();
  console.log('✅ [i18n] Global manager created: window.i18n');
}

// Export for Node.js/testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18nManager;
}