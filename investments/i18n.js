/* /webapp/investments/i18n.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Modular i18n for Investments module
// - Registers with core i18n system
// - RU/EN translations for Level 1 dashboard

import { registerModuleTranslations } from '../js/utils/i18n.js';

const investmentsTranslations = {
  ru: {
    // ==================== INVESTMENT LEVEL 1 ====================
    
    // Main Dashboard
    'investment.level1.title': '📊 Инвестиции: Уровень №1',
    'investment.level1.subtitle': 'Цифровые финансовые активы (ЦФА)',
    'investment.level1.description': 'Управление вашим инвестиционным портфелем',
    
    // Summary Cards
    'investment.summary.totalInvested': 'Всего инвестировано',
    'investment.summary.currentValue': 'Текущая стоимость',
    'investment.summary.totalReturn': 'Общая доходность',
    'investment.summary.activePositions': 'Активные позиции',
    
    // Portfolio Section
    'investment.portfolio.title': '💼 Мой портфель',
    'investment.portfolio.empty': 'Портфель пуст',
    'investment.portfolio.emptyDesc': 'Начните инвестировать в ЦФА',
    'investment.portfolio.loading': 'Загрузка портфеля...',
    
    // Position Card
    'investment.position.amount': 'Количество',
    'investment.position.avgPrice': 'Средняя цена',
    'investment.position.currentPrice': 'Текущая цена',
    'investment.position.totalValue': 'Общая стоимость',
    'investment.position.return': 'Доходность',
    'investment.position.profit': 'Прибыль',
    'investment.position.loss': 'Убыток',
    
    // Available Assets Section
    'investment.available.title': '📈 Доступные активы',
    'investment.available.subtitle': 'Цифровые финансовые активы для инвестиций',
    'investment.available.loading': 'Загрузка активов...',
    'investment.available.empty': 'Нет доступных активов',
    'investment.available.emptyDesc': 'Активы появятся позже',
    
    // Asset Card
    'investment.asset.price': 'Цена',
    'investment.asset.change24h': 'Изменение (24ч)',
    'investment.asset.marketCap': 'Капитализация',
    'investment.asset.volume': 'Объем',
    'investment.asset.buy': 'Купить',
    'investment.asset.sell': 'Продать',
    'investment.asset.details': 'Детали',
    
    // Transaction Actions
    'investment.action.buy': '💰 Купить',
    'investment.action.sell': '💸 Продать',
    'investment.action.swap': '🔄 Обменять',
    'investment.action.transfer': '📤 Перевести',
    
    // Transaction Modal
    'investment.modal.buy.title': 'Купить актив',
    'investment.modal.sell.title': 'Продать актив',
    'investment.modal.amount': 'Количество',
    'investment.modal.price': 'Цена',
    'investment.modal.total': 'Итого',
    'investment.modal.balance': 'Баланс',
    'investment.modal.insufficient': 'Недостаточно средств',
    'investment.modal.confirm': 'Подтвердить',
    'investment.modal.cancel': 'Отмена',
    
    // History Section
    'investment.history.title': '📋 История операций',
    'investment.history.empty': 'История пуста',
    'investment.history.emptyDesc': 'Здесь будут ваши транзакции',
    'investment.history.loading': 'Загрузка истории...',
    
    // Transaction Types
    'investment.tx.buy': 'Покупка',
    'investment.tx.sell': 'Продажа',
    'investment.tx.swap': 'Обмен',
    'investment.tx.transfer': 'Перевод',
    'investment.tx.deposit': 'Пополнение',
    'investment.tx.withdrawal': 'Вывод',
    
    // Transaction Status
    'investment.status.pending': 'В обработке',
    'investment.status.completed': 'Завершено',
    'investment.status.failed': 'Ошибка',
    'investment.status.cancelled': 'Отменено',
    
    // Filters
    'investment.filter.all': 'Все',
    'investment.filter.buy': 'Покупки',
    'investment.filter.sell': 'Продажи',
    'investment.filter.today': 'Сегодня',
    'investment.filter.week': 'Неделя',
    'investment.filter.month': 'Месяц',
    'investment.filter.year': 'Год',
    
    // Common
    'investment.comingSoon': '🚧 Скоро',
    'investment.comingSoonDesc': 'Эта функция будет доступна в следующих версиях',
    'investment.error': 'Ошибка',
    'investment.success': 'Успешно',
    'investment.loading': 'Загрузка...',
    
    // Units
    'investment.units.pieces': 'шт.',
    'investment.units.rub': '₽',
    'investment.units.usd': '$',
    'investment.units.eur': '€',
    'investment.units.aed': 'AED',
    
    // Time periods
    'investment.time.hour': 'час',
    'investment.time.day': 'день',
    'investment.time.week': 'неделя',
    'investment.time.month': 'месяц',
    'investment.time.year': 'год',
    
    // Errors
    'investment.error.loadFailed': 'Ошибка загрузки данных',
    'investment.error.txFailed': 'Ошибка выполнения транзакции',
    'investment.error.insufficientFunds': 'Недостаточно средств',
    'investment.error.invalidAmount': 'Неверное количество',
    'investment.error.minAmount': 'Минимальная сумма',
    'investment.error.maxAmount': 'Максимальная сумма'
  },
  
  en: {
    // ==================== INVESTMENT LEVEL 1 ====================
    
    // Main Dashboard
    'investment.level1.title': '📊 Investments: Level #1',
    'investment.level1.subtitle': 'Digital Financial Assets (DFA)',
    'investment.level1.description': 'Manage your investment portfolio',
    
    // Summary Cards
    'investment.summary.totalInvested': 'Total Invested',
    'investment.summary.currentValue': 'Current Value',
    'investment.summary.totalReturn': 'Total Return',
    'investment.summary.activePositions': 'Active Positions',
    
    // Portfolio Section
    'investment.portfolio.title': '💼 My Portfolio',
    'investment.portfolio.empty': 'Portfolio is empty',
    'investment.portfolio.emptyDesc': 'Start investing in DFA',
    'investment.portfolio.loading': 'Loading portfolio...',
    
    // Position Card
    'investment.position.amount': 'Amount',
    'investment.position.avgPrice': 'Avg Price',
    'investment.position.currentPrice': 'Current Price',
    'investment.position.totalValue': 'Total Value',
    'investment.position.return': 'Return',
    'investment.position.profit': 'Profit',
    'investment.position.loss': 'Loss',
    
    // Available Assets Section
    'investment.available.title': '📈 Available Assets',
    'investment.available.subtitle': 'Digital financial assets for investment',
    'investment.available.loading': 'Loading assets...',
    'investment.available.empty': 'No available assets',
    'investment.available.emptyDesc': 'Assets will appear later',
    
    // Asset Card
    'investment.asset.price': 'Price',
    'investment.asset.change24h': 'Change (24h)',
    'investment.asset.marketCap': 'Market Cap',
    'investment.asset.volume': 'Volume',
    'investment.asset.buy': 'Buy',
    'investment.asset.sell': 'Sell',
    'investment.asset.details': 'Details',
    
    // Transaction Actions
    'investment.action.buy': '💰 Buy',
    'investment.action.sell': '💸 Sell',
    'investment.action.swap': '🔄 Swap',
    'investment.action.transfer': '📤 Transfer',
    
    // Transaction Modal
    'investment.modal.buy.title': 'Buy Asset',
    'investment.modal.sell.title': 'Sell Asset',
    'investment.modal.amount': 'Amount',
    'investment.modal.price': 'Price',
    'investment.modal.total': 'Total',
    'investment.modal.balance': 'Balance',
    'investment.modal.insufficient': 'Insufficient funds',
    'investment.modal.confirm': 'Confirm',
    'investment.modal.cancel': 'Cancel',
    
    // History Section
    'investment.history.title': '📋 Transaction History',
    'investment.history.empty': 'History is empty',
    'investment.history.emptyDesc': 'Your transactions will appear here',
    'investment.history.loading': 'Loading history...',
    
    // Transaction Types
    'investment.tx.buy': 'Buy',
    'investment.tx.sell': 'Sell',
    'investment.tx.swap': 'Swap',
    'investment.tx.transfer': 'Transfer',
    'investment.tx.deposit': 'Deposit',
    'investment.tx.withdrawal': 'Withdrawal',
    
    // Transaction Status
    'investment.status.pending': 'Pending',
    'investment.status.completed': 'Completed',
    'investment.status.failed': 'Failed',
    'investment.status.cancelled': 'Cancelled',
    
    // Filters
    'investment.filter.all': 'All',
    'investment.filter.buy': 'Purchases',
    'investment.filter.sell': 'Sales',
    'investment.filter.today': 'Today',
    'investment.filter.week': 'Week',
    'investment.filter.month': 'Month',
    'investment.filter.year': 'Year',
    
    // Common
    'investment.comingSoon': '🚧 Coming Soon',
    'investment.comingSoonDesc': 'This feature will be available in future versions',
    'investment.error': 'Error',
    'investment.success': 'Success',
    'investment.loading': 'Loading...',
    
    // Units
    'investment.units.pieces': 'pcs',
    'investment.units.rub': '₽',
    'investment.units.usd': '$',
    'investment.units.eur': '€',
    'investment.units.aed': 'AED',
    
    // Time periods
    'investment.time.hour': 'hour',
    'investment.time.day': 'day',
    'investment.time.week': 'week',
    'investment.time.month': 'month',
    'investment.time.year': 'year',
    
    // Errors
    'investment.error.loadFailed': 'Failed to load data',
    'investment.error.txFailed': 'Transaction failed',
    'investment.error.insufficientFunds': 'Insufficient funds',
    'investment.error.invalidAmount': 'Invalid amount',
    'investment.error.minAmount': 'Minimum amount',
    'investment.error.maxAmount': 'Maximum amount'
  }
};

// Register module translations with core i18n
registerModuleTranslations('investments', investmentsTranslations);

console.log('✅ [Investments] i18n module registered');

// Re-export core i18n functions for convenience
export { t, setLanguage, getCurrentLanguage } from '../js/utils/i18n.js';