/* /webapp/js/utils/i18n.js v2.0.0 */
// CHANGELOG v2.0.0:
// - BREAKING: Полная переработка для централизованного i18n
// - ADDED: Support for data-i18n attributes
// - ADDED: Language switcher integration
// - ADDED: Auto-detect from Telegram
// - ADDED: localStorage persistence
// CHANGELOG v1.1.2:
// - Added investment.* keys for Level 1 dashboard

const translations = {
  ru: {
    // ==================== AUTH ====================
    // Login
    'auth.login.title': 'Вход в систему',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'your@email.com',
    'auth.login.password': 'Пароль',
    'auth.login.passwordPlaceholder': '••••••••',
    'auth.login.submit': 'Войти',
    'auth.login.forgotPassword': 'Забыли пароль?',
    'auth.login.register': 'Регистрация',
    
    // Register
    'auth.register.title': 'Регистрация',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'your@email.com',
    'auth.register.password': 'Пароль',
    'auth.register.passwordPlaceholder': 'Минимум 6 символов',
    'auth.register.passwordConfirm': 'Подтвердите пароль',
    'auth.register.passwordConfirmPlaceholder': '••••••••',
    'auth.register.submit': 'Создать аккаунт',
    'auth.register.haveAccount': 'Уже есть аккаунт? Войти',
    
    // Reset Password
    'auth.reset.title': 'Сброс пароля',
    'auth.reset.info': 'Введите ваш email, и мы отправим ссылку для сброса пароля',
    'auth.reset.email': 'Email',
    'auth.reset.emailPlaceholder': 'your@email.com',
    'auth.reset.submit': 'Отправить ссылку',
    'auth.reset.backToLogin': 'Назад к входу',
    'auth.reset.success': 'Ссылка для сброса пароля отправлена на ваш email',
    
    // Logout
    'auth.logout.button': '🚪 Выйти',
    
    // Delete Account
    'auth.delete.button': '🗑️ Удалиться из ФД «Хаяти»',
    
    // Errors
    'auth.error.fillAllFields': 'Заполните все поля',
    'auth.error.passwordTooShort': 'Пароль должен быть минимум 6 символов',
    'auth.error.passwordsDontMatch': 'Пароли не совпадают',
    'auth.error.invalidCredentials': 'Неверный email или пароль',
    'auth.error.userNotFound': 'Пользователь не найден',
    'auth.error.wrongPassword': 'Неверный пароль',
    'auth.error.emailInUse': 'Этот email уже зарегистрирован',
    'auth.error.invalidEmail': 'Неверный формат email',
    'auth.error.weakPassword': 'Слишком простой пароль',
    'auth.error.loginFailed': 'Ошибка входа',
    'auth.error.registerFailed': 'Ошибка регистрации',
    'auth.error.resetFailed': 'Ошибка отправки',
    
    // ==================== CABINET ====================
    'cabinet.title': '💼 Личный кабинет',
    'cabinet.welcome': 'Добро пожаловать',
    'cabinet.settings': '⚙️ Настройки',
    
    // ==================== COMMON ====================
    'common.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.close': 'Закрыть',
    'common.yes': 'Да',
    'common.no': 'Нет',
    'common.previous': 'Назад',
    
    // ==================== APP ====================
    'app.title': '🏦 ФД «Хаяти» — Вход',
    'app.subtitle': 'Управление капиталом',
    'app.cabinetWelcome': '🎉 Добро пожаловать!',
    'app.cabinetDescription': 'Здесь будет ваш кабинет с балансом, платежами и управлением капиталом.',
    
    // Units
    'unit.available': 'Доступно',
    'unit.reserved': 'Зарезервировано',
    'unit.sold': 'Продано',
    
    // Errors
    'error.loadingData': 'Ошибка загрузки данных',
    'error.noSession': 'Нет активной сессии',
    'error.savingFailed': 'Ошибка сохранения',
    'error.deletingFailed': 'Ошибка удаления',
    'error.notFound': 'Не найдено',
    'error.generic': 'Произошла ошибка'
  },
  
  en: {
    // ==================== AUTH ====================
    // Login
    'auth.login.title': 'Sign In',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'your@email.com',
    'auth.login.password': 'Password',
    'auth.login.passwordPlaceholder': '••••••••',
    'auth.login.submit': 'Sign In',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.register': 'Register',
    
    // Register
    'auth.register.title': 'Register',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'your@email.com',
    'auth.register.password': 'Password',
    'auth.register.passwordPlaceholder': 'Minimum 6 characters',
    'auth.register.passwordConfirm': 'Confirm Password',
    'auth.register.passwordConfirmPlaceholder': '••••••••',
    'auth.register.submit': 'Create Account',
    'auth.register.haveAccount': 'Already have an account? Sign In',
    
    // Reset Password
    'auth.reset.title': 'Reset Password',
    'auth.reset.info': 'Enter your email and we will send you a password reset link',
    'auth.reset.email': 'Email',
    'auth.reset.emailPlaceholder': 'your@email.com',
    'auth.reset.submit': 'Send Reset Link',
    'auth.reset.backToLogin': 'Back to Sign In',
    'auth.reset.success': 'Password reset link sent to your email',
    
    // Logout
    'auth.logout.button': '🚪 Logout',
    
    // Delete Account
    'auth.delete.button': '🗑️ Delete from FD "Hayati"',
    
    // Errors
    'auth.error.fillAllFields': 'Please fill in all fields',
    'auth.error.passwordTooShort': 'Password must be at least 6 characters',
    'auth.error.passwordsDontMatch': 'Passwords do not match',
    'auth.error.invalidCredentials': 'Invalid email or password',
    'auth.error.userNotFound': 'User not found',
    'auth.error.wrongPassword': 'Wrong password',
    'auth.error.emailInUse': 'This email is already registered',
    'auth.error.invalidEmail': 'Invalid email format',
    'auth.error.weakPassword': 'Password is too weak',
    'auth.error.loginFailed': 'Login failed',
    'auth.error.registerFailed': 'Registration failed',
    'auth.error.resetFailed': 'Reset failed',
    
    // ==================== CABINET ====================
    'cabinet.title': '💼 Personal Cabinet',
    'cabinet.welcome': 'Welcome',
    'cabinet.settings': '⚙️ Settings',
    
    // ==================== COMMON ====================
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.close': 'Close',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.previous': 'Previous',
    
    // ==================== APP ====================
    'app.title': '🏦 FD "Hayati" — Sign In',
    'app.subtitle': 'Capital Management',
    'app.cabinetWelcome': '🎉 Welcome!',
    'app.cabinetDescription': 'Here will be your cabinet with balance, payments and capital management.',
    
    // Units
    'unit.available': 'Available',
    'unit.reserved': 'Reserved',
    'unit.sold': 'Sold',
    
    // Errors
    'error.loadingData': 'Error loading data',
    'error.noSession': 'No active session',
    'error.savingFailed': 'Save failed',
    'error.deletingFailed': 'Delete failed',
    'error.notFound': 'Not found',
    'error.generic': 'An error occurred'
  }
};

// ==================== STATE ====================

let currentLanguage = 'ru';
const STORAGE_KEY = 'hayati_language';

// ==================== CORE FUNCTIONS ====================

/**
 * Get translation for key
 * @param {string} key - Translation key (e.g., 'auth.login.title')
 * @param {string} lang - Optional language override
 * @returns {string} Translated text
 */
export function t(key, lang = null) {
  const language = lang || currentLanguage;
  return translations[language]?.[key] || key;
}

/**
 * Set current language
 * @param {string} lang - Language code (ru/en)
 * @returns {boolean} Success
 */
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      console.warn('⚠️ Failed to save language to localStorage:', e);
    }
    
    console.log(`🌍 Language set to: ${lang}`);
    
    // Dispatch event for UI updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
      }));
    }
    
    return true;
  }
  
  console.warn(`⚠️ Language not supported: ${lang}`);
  return false;
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Get all supported languages
 * @returns {string[]} Array of language codes
 */
export function getSupportedLanguages() {
  return Object.keys(translations);
}

/**
 * Toggle between languages
 * @returns {string} New language
 */
export function toggleLanguage() {
  const languages = getSupportedLanguages();
  const currentIndex = languages.indexOf(currentLanguage);
  const nextIndex = (currentIndex + 1) % languages.length;
  const nextLang = languages[nextIndex];
  
  setLanguage(nextLang);
  return nextLang;
}

/**
 * Update all elements with data-i18n attribute
 */
export function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    // Update based on element type
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // Update placeholder
      if (element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      }
    } else {
      // Update text content
      element.textContent = translation;
    }
  });
  
  // Update title
  document.title = t('app.title');
  
  console.log(`✅ Page translations updated (${currentLanguage})`);
}

// ==================== INITIALIZATION ====================

/**
 * Initialize i18n system
 */
function initializeI18n() {
  // 1. Try to load from localStorage
  try {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && translations[savedLang]) {
      currentLanguage = savedLang;
      console.log(`💾 Loaded language from storage: ${savedLang}`);
    }
  } catch (e) {
    console.warn('⚠️ Failed to load language from localStorage:', e);
  }
  
  // 2. Auto-detect from Telegram (override if no saved preference)
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tgLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
    
    if (tgLang && !localStorage.getItem(STORAGE_KEY)) {
      // Only auto-set if user hasn't manually chosen
      if (tgLang === 'en' || tgLang.startsWith('en')) {
        setLanguage('en');
        console.log(`🤖 Auto-detected Telegram language: en`);
      }
    }
  }
  
  console.log(`🌍 i18n initialized: ${currentLanguage}`);
}

// Auto-initialize
if (typeof window !== 'undefined') {
  initializeI18n();
}

// ==================== EXPORTS ====================

export default {
  t,
  setLanguage,
  getCurrentLanguage,
  getSupportedLanguages,
  toggleLanguage,
  updatePageTranslations
};