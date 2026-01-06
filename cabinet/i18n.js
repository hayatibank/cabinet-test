/* /webapp/cabinet/i18n.js v2.0.0 */
// CHANGELOG v2.0.0:
// - BREAKING: Now inherits from core i18n (no duplication)
// - ADDED: Re-exports core functions
// - Cabinet-specific translations remain in core
// CHANGELOG v1.0.0:
// - Initial release
// - Standalone i18n for Cabinet module
// - RU/EN translations for accounts management

// ==================== STRATEGY ====================
// Cabinet module uses core i18n translations.
// All cabinet.* keys are already defined in /js/utils/i18n.js
// This file simply re-exports core functions for convenience.

import { 
  t, 
  setLanguage, 
  getCurrentLanguage,
  updatePageTranslations
} from '../js/utils/i18n.js';

// Re-export for convenience
export { t, setLanguage, getCurrentLanguage, updatePageTranslations };

console.log('✅ [Cabinet] i18n inherited from core');