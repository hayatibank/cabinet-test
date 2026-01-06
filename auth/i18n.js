/* /webapp/auth/i18n.js v2.0.0 */
// CHANGELOG v2.0.0:
// - BREAKING: Now inherits from core i18n (no duplication)
// - ADDED: Re-exports core functions
// - Auth-specific translations remain in core
// CHANGELOG v1.0.0:
// - Initial release
// - Standalone i18n for Auth module
// - RU/EN translations for login, register, reset, logout, delete account

// ==================== STRATEGY ====================
// Auth module uses core i18n translations.
// All auth.* keys are already defined in /js/utils/i18n.js
// This file simply re-exports core functions for convenience.

import { 
  t, 
  setLanguage, 
  getCurrentLanguage,
  updatePageTranslations
} from '../js/utils/i18n.js';

// Re-export for convenience
export { t, setLanguage, getCurrentLanguage, updatePageTranslations };

console.log('✅ [Auth] i18n inherited from core');