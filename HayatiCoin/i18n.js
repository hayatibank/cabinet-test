/* /HayatiCoin/i18n.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - RU/EN translations for HYC

const translations = {
  ru: {
    'hyc.balance': 'Баланс HYC',
    'hyc.claimed': 'Получено',
    'hyc.supply.exhausted': 'Лимит HYC исчерпан',
  },
  en: {
    'hyc.balance': 'HYC Balance',
    'hyc.claimed': 'Claimed',
    'hyc.supply.exhausted': 'HYC supply exhausted',
  }
};

let currentLanguage = 'ru';

export function t(key, lang = null) {
  const language = lang || currentLanguage;
  return translations[language]?.[key] || key;
}

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    console.log(`🌍 [HYC] Language set to: ${lang}`);
    return true;
  }
  return false;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

// Auto-detect from Telegram
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  const tgLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
  if (tgLang === 'en') {
    setLanguage('en');
  }
}

console.log('🌍 [HYC] i18n initialized:', currentLanguage);