/* /webapp/cabinet/i18n.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Standalone i18n for Cabinet module
// - RU/EN translations for accounts management

const translations = {
  ru: {
    // Cabinet Main
    'cabinet.title': '💼 Личный кабинет',
    'cabinet.welcome': 'Добро пожаловать',
    'cabinet.userEmail': 'Email пользователя',
    
    // Account List
    'cabinet.accounts': 'Аккаунты',
    'cabinet.noAccounts': 'У вас пока нет аккаунтов',
    'cabinet.noAccountsSubtitle': 'Создайте первый аккаунт для начала работы',
    'cabinet.createAccount': '➕ Создать аккаунт',
    'cabinet.accountCreated': '✅ Аккаунт успешно создан!',
    'cabinet.accountDeleted': '✅ Аккаунт успешно удалён',
    'cabinet.loadingAccounts': 'Загрузка аккаунтов...',
    'cabinet.errorLoadingAccounts': '❌ Ошибка загрузки аккаунтов',
    'cabinet.backToList': 'Назад к списку',
    
    // Account Types
    'cabinet.accountType.individual': '👤 Физическое лицо',
    'cabinet.accountType.business': '🏢 Юридическое лицо',
    'cabinet.accountType.government': '🏛️ Госорганизация',
    'cabinet.accountType.selectType': 'Выберите тип аккаунта',
    
    // Create Account Form
    'cabinet.createAccount.title': '➕ Создание аккаунта',
    'cabinet.createAccount.individual': '👤 Физическое лицо',
    'cabinet.createAccount.individualDesc': 'Для личных финансов',
    'cabinet.createAccount.business': '🏢 ЮЛ / ИП',
    'cabinet.createAccount.businessDesc': 'Скоро...',
    'cabinet.createAccount.government': '🏛️ Госорганы',
    'cabinet.createAccount.governmentDesc': 'Скоро...',
    'cabinet.createAccount.firstName': 'Имя',
    'cabinet.createAccount.firstNamePlaceholder': 'Иван',
    'cabinet.createAccount.lastName': 'Фамилия',
    'cabinet.createAccount.lastNamePlaceholder': 'Петров',
    'cabinet.createAccount.birthDate': 'Дата рождения',
    'cabinet.createAccount.required': '*',
    'cabinet.createAccount.submit': 'Создать аккаунт',
    'cabinet.createAccount.cancel': 'Отмена',
    'cabinet.createAccount.creating': 'Создание...',
    'cabinet.createAccount.fillRequired': 'Заполните имя и фамилию',
    'cabinet.createAccount.error': 'Ошибка создания аккаунта',
    'cabinet.createAccount.inDevelopment': 'В разработке...',
    
    // Account Card
    'cabinet.account.balance': 'Баланс',
    'cabinet.account.enter': 'Войти',
    'cabinet.account.edit': 'Редактировать',
    'cabinet.account.delete': 'Удалить',
    'cabinet.account.deleteConfirm': '⚠️ ВНИМАНИЕ!\n\nВы действительно хотите удалить этот аккаунт?\n\nЭто действие нельзя отменить.',
    'cabinet.account.noName': 'Без имени',
    
    // Account Navigation (7 steps)
    'cabinet.nav.step1': 'Фин. отчёт',
    'cabinet.nav.step2': 'Цели',
    'cabinet.nav.step3': 'Ден. поток',
    'cabinet.nav.step4': 'Инвестиции',
    'cabinet.nav.step5': 'Бизнес',
    'cabinet.nav.step6': 'Биз. управление',
    'cabinet.nav.step7': 'IPO',
    'cabinet.nav.comingSoon': 'Раздел в разработке',
    'cabinet.nav.accountNotFound': '❌ Аккаунт не найден',
    'cabinet.nav.errorLoading': '❌ Ошибка загрузки кабинета',
    
    // Actions
    'cabinet.actions.logout': '🚪 Выйти',
    'cabinet.actions.settings': '⚙️ Настройки',
    'cabinet.actions.profile': 'Профиль',
    'cabinet.actions.notifications': 'Уведомления',
    'cabinet.actions.deleteAccount': '🗑️ Удалиться из ФД «Хаяти»',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.back': 'Назад',
    'common.close': 'Закрыть',
    'common.refresh': 'Обновить'
  },
  
  en: {
    // Cabinet Main
    'cabinet.title': '💼 Cabinet',
    'cabinet.welcome': 'Welcome',
    'cabinet.userEmail': 'User email',
    
    // Account List
    'cabinet.accounts': 'Accounts',
    'cabinet.noAccounts': 'You have no accounts yet',
    'cabinet.noAccountsSubtitle': 'Create your first account to get started',
    'cabinet.createAccount': '➕ Create Account',
    'cabinet.accountCreated': '✅ Account created successfully!',
    'cabinet.accountDeleted': '✅ Account deleted successfully',
    'cabinet.loadingAccounts': 'Loading accounts...',
    'cabinet.errorLoadingAccounts': '❌ Error loading accounts',
    'cabinet.backToList': 'Back to list',
    
    // Account Types
    'cabinet.accountType.individual': '👤 Individual',
    'cabinet.accountType.business': '🏢 Business',
    'cabinet.accountType.government': '🏛️ Government',
    'cabinet.accountType.selectType': 'Select account type',
    
    // Create Account Form
    'cabinet.createAccount.title': '➕ Create Account',
    'cabinet.createAccount.individual': '👤 Individual',
    'cabinet.createAccount.individualDesc': 'For personal finances',
    'cabinet.createAccount.business': '🏢 Business',
    'cabinet.createAccount.businessDesc': 'Coming soon...',
    'cabinet.createAccount.government': '🏛️ Government',
    'cabinet.createAccount.governmentDesc': 'Coming soon...',
    'cabinet.createAccount.firstName': 'First Name',
    'cabinet.createAccount.firstNamePlaceholder': 'John',
    'cabinet.createAccount.lastName': 'Last Name',
    'cabinet.createAccount.lastNamePlaceholder': 'Smith',
    'cabinet.createAccount.birthDate': 'Birth Date',
    'cabinet.createAccount.required': '*',
    'cabinet.createAccount.submit': 'Create Account',
    'cabinet.createAccount.cancel': 'Cancel',
    'cabinet.createAccount.creating': 'Creating...',
    'cabinet.createAccount.fillRequired': 'Please fill in first and last name',
    'cabinet.createAccount.error': 'Error creating account',
    'cabinet.createAccount.inDevelopment': 'In development...',
    
    // Account Card
    'cabinet.account.balance': 'Balance',
    'cabinet.account.enter': 'Enter',
    'cabinet.account.edit': 'Edit',
    'cabinet.account.delete': 'Delete',
    'cabinet.account.deleteConfirm': '⚠️ WARNING!\n\nAre you sure you want to delete this account?\n\nThis action cannot be undone.',
    'cabinet.account.noName': 'No name',
    
    // Account Navigation (7 steps)
    'cabinet.nav.step1': 'Fin. Report',
    'cabinet.nav.step2': 'Goals',
    'cabinet.nav.step3': 'Cash Flow',
    'cabinet.nav.step4': 'Investments',
    'cabinet.nav.step5': 'Business',
    'cabinet.nav.step6': 'Bus. Management',
    'cabinet.nav.step7': 'IPO',
    'cabinet.nav.comingSoon': 'Section in development',
    'cabinet.nav.accountNotFound': '❌ Account not found',
    'cabinet.nav.errorLoading': '❌ Error loading cabinet',
    
    // Actions
    'cabinet.actions.logout': '🚪 Logout',
    'cabinet.actions.settings': '⚙️ Settings',
    'cabinet.actions.profile': 'Profile',
    'cabinet.actions.notifications': 'Notifications',
    'cabinet.actions.deleteAccount': '🗑️ Delete from FD "Hayati"',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.refresh': 'Refresh'
  }
};

// Current language (default: ru)
let currentLanguage = 'ru';

/**
 * Get translation for key
 */
export function t(key, lang = null) {
  const language = lang || currentLanguage;
  return translations[language]?.[key] || key;
}

/**
 * Set current language
 */
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    console.log(`🌍 [Cabinet] Language set to: ${lang}`);
    return true;
  }
  console.warn(`⚠️ [Cabinet] Language not supported: ${lang}`);
  return false;
}

/**
 * Get current language
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

// Auto-detect language from Telegram
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  const tgLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
  if (tgLang === 'en') {
    setLanguage('en');
  }
}

console.log('🌍 [Cabinet] i18n initialized:', currentLanguage);