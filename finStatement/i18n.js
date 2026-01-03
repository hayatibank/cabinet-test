/* /webapp/finStatement/i18n.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Standalone i18n for Financial Statement module
// - RU/EN translations for reports, categories, analysis

const translations = {
  ru: {
    // Main
    'report.title': '📊 Финансовый отчёт',
    'report.year': 'Год',
    'report.loading': 'Загрузка финансового отчёта...',
    'report.error': '❌ Ошибка загрузки финансового отчёта',
    'report.refresh': 'Обновить',
    
    // Sections
    'report.income': '💰 Доходы',
    'report.expenses': '💸 Расходы',
    'report.assets': '📊 Активы',
    'report.liabilities': '📉 Пассивы',
    'report.analysis': '📈 Анализ',
    
    // Totals
    'report.total.income': 'G. ДОХОДЫ ИТОГО',
    'report.total.expenses': 'L. РАСХОДЫ ИТОГО',
    'report.total.assets.banker': 'R. АКТИВЫ ИТОГО по банкиру',
    'report.total.assets.factual': 'S. АКТИВЫ ИТОГО факт',
    'report.total.liabilities': 'U. ПАССИВЫ ИТОГО',
    'report.cashFlow': 'M. ЧИСТЫЙ ДЕНЕЖНЫЙ ПОТОК',
    'report.netWorth.banker': 'V. СОСТОЯНИЕ по банкиру (R - U)',
    'report.netWorth.factual': 'W. СОСТОЯНИЕ факт (S - U)',
    
    // Income Categories
    'income.A': 'A. Найм',
    'income.A.1': 'Зарплата #1',
    'income.A.2': 'Зарплата #2',
    'income.A.3': 'Прочее зарплата',
    'income.B': 'B. Найм итого',
    'income.C': 'C. Активы',
    'income.C.1': 'Бизнес (NET)',
    'income.C.2': 'Недвижимость (NET)',
    'income.C.3': 'Прочее активы',
    'income.D': 'D. Активы итого',
    'income.E': 'E. Портфолио',
    'income.E.1': 'Банковские продукты',
    'income.E.2': 'Дивиденды',
    'income.E.3': 'Роялти',
    'income.E.4': 'Прочее роялти',
    'income.F': 'F. Портфолио итого',
    
    // Expense Categories
    'expenses.0': 'Предварительные',
    'expenses.H': 'H. Предварительные',
    'expenses.0.1': 'Инвестиции',
    'expenses.0.2': 'Сбережения',
    'expenses.0.3': 'Благотворительность',
    'expenses.0.4': 'Карман',
    'expenses.0.5': 'Развлечения',
    'expenses.0.6': 'Налоги',
    'expenses.I': 'I. Предварительные итого',
    'expenses.1': 'Основные',
    'expenses.J': 'J. Основные',
    'expenses.1.1': 'Питание',
    'expenses.1.2': 'Супружество',
    'expenses.1.3': 'Жилье (рассрочка/рент + КУ)',
    'expenses.1.4': 'Гардероб',
    'expenses.1.5': 'Транспорт',
    'expenses.1.6': 'Коммуникации',
    'expenses.1.7': 'Фитнес',
    'expenses.1.8': 'Хобби',
    'expenses.1.9': 'Здоровье',
    'expenses.1.10': 'Дети',
    'expenses.1.11': 'Банковские услуги',
    'expenses.1.12': 'Транспортные рассрочки',
    'expenses.1.13': 'Образовательные рассрочки',
    'expenses.1.14': 'Персональные займы',
    'expenses.1.15': 'Прочее задолженности',
    'expenses.1.16': 'Прочее расходы',
    'expenses.K': 'K. Основные итого',
    
    // Asset Categories
    'assets.N': 'N. Активы',
    'assets.N.1': 'Банковские счета',
    'assets.N.2': 'Цифровые активы',
    'assets.N.3': 'Инвестиционный сертификаты',
    'assets.N.4': 'Дебиторская задолженность',
    'assets.N.5': 'Бизнес (оценка, NET)',
    'assets.N.6': 'Недвижимость (минус рассрочка)',
    'assets.N.7': 'Прочее активы',
    'assets.O': 'O. Активы подытог',
    'assets.P': 'P. Роскошь',
    'assets.P.1': 'Дом',
    'assets.P.2': 'Автомобиль(и)',
    'assets.P.3': 'Прочее роскошь',
    'assets.Q': 'Q. Роскошь итого',
    
    // Liability Categories
    'liabilities.T': 'T. Пассивы',
    'liabilities.T.1': 'Жилищная рассрочка',
    'liabilities.T.2': 'Банковские услуги',
    'liabilities.T.3': 'Транспортные рассрочки',
    'liabilities.T.4': 'Образовательные рассрочки',
    'liabilities.T.5': 'Персональные займы',
    'liabilities.T.6': 'Прочее пассивы',
    
    // Analysis Metrics
    'analysis.saving': 'Сколько вы сохраняете?',
    'analysis.moneyWorking': 'Работают ли ваши деньги на вас?',
    'analysis.taxes': 'Сколько вы платите налогов?',
    'analysis.housing': 'Сколько уходит на жильё?',
    'analysis.luxury': 'Сколько вы тратите на роскошь?',
    'analysis.assetYield': 'Какова ваша доходность от активов?',
    'analysis.security': 'Насколько вы обеспечены?',
    'analysis.expensesCovered': 'Насколько ваши расходы покрыты пассивным доходом?',
    
    // Analysis Formulas
    'analysis.formula.saving': 'Денежный поток / Общий доход',
    'analysis.formula.moneyWorking': 'Активы итого + портфолио итого / Общий доход',
    'analysis.formula.taxes': 'Налоги / Общий доход',
    'analysis.formula.housing': 'Расходы на жильё / Доход',
    'analysis.formula.luxury': 'Роскошь итого / Активы по банкиру',
    'analysis.formula.assetYield': 'Активы итого + портфолио итого / Активы итого факт',
    'analysis.formula.security': 'Активы итого факт / Расходы',
    'analysis.formula.expensesCovered': 'Активы итого + портфолио итого / Расходы итого',
    
    // Analysis Notes
    'analysis.note.shouldGrow': '***должен расти',
    'analysis.note.max33': '***не более 33%',
    'analysis.note.months': '***измеряется в месяцах',
    'analysis.note.target200': '***должен расти к 200%',
    
    // Edit Modal
    'edit.title': 'Редактирование',
    'edit.amount': 'Сумма (₽)',
    'edit.save': '💾 Сохранить',
    'edit.delete': '🗑️ Обнулить',
    'edit.cancel': '✖️ Отмена',
    'edit.saving': '💾 Сохранение...',
    'edit.saved': '✅ Сохранено!',
    'edit.error': '❌ Ошибка сохранения',
    'edit.confirmDelete': 'Обнулить эту запись?',
    'edit.negativeError': 'Сумма не может быть отрицательной',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.currency': '₽',
    'common.months': 'мес.',
    'common.clickToEdit': 'Нажмите для редактирования'
  },
  
  en: {
    // Main
    'report.title': '📊 Financial Statement',
    'report.year': 'Year',
    'report.loading': 'Loading financial report...',
    'report.error': '❌ Error loading financial report',
    'report.refresh': 'Refresh',
    
    // Sections
    'report.income': '💰 Income',
    'report.expenses': '💸 Expenses',
    'report.assets': '📊 Assets',
    'report.liabilities': '📉 Liabilities',
    'report.analysis': '📈 Analysis',
    
    // Totals
    'report.total.income': 'G. TOTAL INCOME',
    'report.total.expenses': 'L. TOTAL EXPENSES',
    'report.total.assets.banker': 'R. TOTAL ASSETS (banker)',
    'report.total.assets.factual': 'S. TOTAL ASSETS (factual)',
    'report.total.liabilities': 'U. TOTAL LIABILITIES',
    'report.cashFlow': 'M. NET CASH FLOW',
    'report.netWorth.banker': 'V. NET WORTH (banker) (R - U)',
    'report.netWorth.factual': 'W. NET WORTH (factual) (S - U)',
    
    // Income Categories
    'income.A': 'A. Employment',
    'income.A.1': 'Salary #1',
    'income.A.2': 'Salary #2',
    'income.A.3': 'Other salary',
    'income.B': 'B. Employment total',
    'income.C': 'C. Assets',
    'income.C.1': 'Business (NET)',
    'income.C.2': 'Real Estate (NET)',
    'income.C.3': 'Other assets',
    'income.D': 'D. Assets total',
    'income.E': 'E. Portfolio',
    'income.E.1': 'Banking products',
    'income.E.2': 'Dividends',
    'income.E.3': 'Royalties',
    'income.E.4': 'Other royalties',
    'income.F': 'F. Portfolio total',
    
    // Expense Categories
    'expenses.0': 'Preliminary',
    'expenses.H': 'H. Preliminary',
    'expenses.0.1': 'Investments',
    'expenses.0.2': 'Savings',
    'expenses.0.3': 'Charity',
    'expenses.0.4': 'Pocket money',
    'expenses.0.5': 'Entertainment',
    'expenses.0.6': 'Taxes',
    'expenses.I': 'I. Preliminary total',
    'expenses.1': 'Main',
    'expenses.J': 'J. Main',
    'expenses.1.1': 'Food',
    'expenses.1.2': 'Marriage',
    'expenses.1.3': 'Housing (rent/mortgage + utilities)',
    'expenses.1.4': 'Wardrobe',
    'expenses.1.5': 'Transportation',
    'expenses.1.6': 'Communications',
    'expenses.1.7': 'Fitness',
    'expenses.1.8': 'Hobbies',
    'expenses.1.9': 'Health',
    'expenses.1.10': 'Children',
    'expenses.1.11': 'Banking services',
    'expenses.1.12': 'Transport installments',
    'expenses.1.13': 'Education installments',
    'expenses.1.14': 'Personal loans',
    'expenses.1.15': 'Other debts',
    'expenses.1.16': 'Other expenses',
    'expenses.K': 'K. Main total',
    
    // Asset Categories
    'assets.N': 'N. Assets',
    'assets.N.1': 'Bank accounts',
    'assets.N.2': 'Digital assets',
    'assets.N.3': 'Investment certificates',
    'assets.N.4': 'Accounts receivable',
    'assets.N.5': 'Business (valuation, NET)',
    'assets.N.6': 'Real estate (minus mortgage)',
    'assets.N.7': 'Other assets',
    'assets.O': 'O. Assets subtotal',
    'assets.P': 'P. Luxury',
    'assets.P.1': 'House',
    'assets.P.2': 'Car(s)',
    'assets.P.3': 'Other luxury',
    'assets.Q': 'Q. Luxury total',
    
    // Liability Categories
    'liabilities.T': 'T. Liabilities',
    'liabilities.T.1': 'Mortgage',
    'liabilities.T.2': 'Banking services',
    'liabilities.T.3': 'Transport installments',
    'liabilities.T.4': 'Education installments',
    'liabilities.T.5': 'Personal loans',
    'liabilities.T.6': 'Other liabilities',
    
    // Analysis Metrics
    'analysis.saving': 'How much are you saving?',
    'analysis.moneyWorking': 'Is your money working for you?',
    'analysis.taxes': 'How much do you pay in taxes?',
    'analysis.housing': 'How much goes to housing?',
    'analysis.luxury': 'How much do you spend on luxury?',
    'analysis.assetYield': 'What is your asset yield?',
    'analysis.security': 'How secure are you?',
    'analysis.expensesCovered': 'Are your expenses covered by passive income?',
    
    // Analysis Formulas
    'analysis.formula.saving': 'Cash flow / Total income',
    'analysis.formula.moneyWorking': 'Total assets + portfolio / Total income',
    'analysis.formula.taxes': 'Taxes / Total income',
    'analysis.formula.housing': 'Housing expenses / Income',
    'analysis.formula.luxury': 'Luxury total / Assets (banker)',
    'analysis.formula.assetYield': 'Total assets + portfolio / Factual assets',
    'analysis.formula.security': 'Factual assets / Expenses',
    'analysis.formula.expensesCovered': 'Total assets + portfolio / Total expenses',
    
    // Analysis Notes
    'analysis.note.shouldGrow': '***should grow',
    'analysis.note.max33': '***max 33%',
    'analysis.note.months': '***measured in months',
    'analysis.note.target200': '***should grow to 200%',
    
    // Edit Modal
    'edit.title': 'Edit',
    'edit.amount': 'Amount (₽)',
    'edit.save': '💾 Save',
    'edit.delete': '🗑️ Reset',
    'edit.cancel': '✖️ Cancel',
    'edit.saving': '💾 Saving...',
    'edit.saved': '✅ Saved!',
    'edit.error': '❌ Save failed',
    'edit.confirmDelete': 'Reset this entry?',
    'edit.negativeError': 'Amount cannot be negative',
    
    // Common
    'common.loading': 'Loading...',
    'common.currency': '₽',
    'common.months': 'mo.',
    'common.clickToEdit': 'Click to edit'
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
    console.log(`🌍 [FinStatement] Language set to: ${lang}`);
    return true;
  }
  console.warn(`⚠️ [FinStatement] Language not supported: ${lang}`);
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

console.log('🌍 [FinStatement] i18n initialized:', currentLanguage);