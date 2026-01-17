/* /webapp/realEstate/i18n.js v1.0.0 */
// Real Estate module translations (RU/EN/AR)

const translations = {
  ru: {
    // Browse page
    'realEstate.browse.title': '🏢 Недвижимость в ОАЭ',
    'realEstate.browse.subtitle': 'Инвестиции в недвижимость Дубая',
    'realEstate.browse.loading': 'Загрузка объектов...',
    'realEstate.browse.noResults': 'Объекты не найдены',
    'realEstate.browse.totalUnits': 'объектов доступно',
    'realEstate.browse.showingUnits': 'Показано объектов',
    
    // Filters
    'filters.title': 'Фильтры',
    'filters.reset': 'Сбросить',
    'filters.apply': 'Применить',
    'filters.priceRange': 'Цена',
    'filters.areaRange': 'Площадь',
    'filters.bedrooms': 'Спальни',
    'filters.type': 'Тип',
    'filters.sortBy': 'Сортировка',
    
    // Property types
    'type.apartment': 'Апартаменты',
    'type.retail': 'Торговые помещения',
    'type.office': 'Офисы',
    'type.fnb': 'F&B',
    
    // Bedrooms
    'bedrooms.studio': 'Студия',
    'bedrooms.1br': '1 спальня',
    'bedrooms.2br': '2 спальни',
    'bedrooms.2br_maid': '2 + горничная',
    'bedrooms.3br': '3 спальни',
    'bedrooms.3br_plus': '3+ спальни',
    'bedrooms.penthouse': 'Пентхаус',
    
    // Sort options
    'sort.priceAsc': 'Цена: низ → выс',
    'sort.priceDesc': 'Цена: выс → низ',
    'sort.areaAsc': 'Площадь: мал → бол',
    'sort.areaDesc': 'Площадь: бол → мал',
    'sort.roiDesc': 'Доходность: выс → низ',
    'sort.appreciationDesc': 'Рост капитала: выс → низ',
    
    // Unit card
    'unit.from': 'от',
    'unit.aed': 'AED',
    'unit.rub': '₽',
    'unit.usd': '$',
    'unit.sqm': 'м²',
    'unit.sqft': 'кв. фут',
    'unit.bedrooms': 'спален',
    'unit.roi': 'Доходность',
    'unit.appreciation': 'Рост капитала',
    'unit.available': 'Доступно',
    'unit.learnMore': 'Подробнее',
    'unit.viewDetails': 'Смотреть детали',
    
    // Unit detail page
    'detail.title': 'Детали объекта',
    'detail.overview': 'Обзор',
    'detail.specs': 'Характеристики',
    'detail.payment': 'План оплаты',
    'detail.location': 'Расположение',
    'detail.amenities': 'Удобства',
    'detail.developer': 'Застройщик',
    'detail.gallery': 'Галерея',
    'detail.floorPlan': 'Планировка',
    
    // Specs
    'specs.unitNumber': 'Номер юнита',
    'specs.building': 'Здание',
    'specs.type': 'Тип',
    'specs.bedrooms': 'Спальни',
    'specs.totalArea': 'Общая площадь',
    'specs.internalArea': 'Внутренняя площадь',
    'specs.externalArea': 'Внешняя площадь',
    'specs.price': 'Цена',
    'specs.pricePerSqft': 'Цена за кв. фут',
    'specs.pricePerSqm': 'Цена за м²',
    'specs.serviceCharge': 'Сервисный сбор',
    'specs.handover': 'Сдача',
    'specs.ownership': 'Право собственности',
    'specs.furnished': 'Меблировка',
    
    // Project info
    'project.name': 'Проект',
    'project.developer': 'Застройщик',
    'project.location': 'Локация',
    'project.completion': 'Завершение',
    'project.status': 'Статус',
    'project.website': 'Сайт проекта',
    'project.officialLink': 'Официальная страница',
    
    // Payment plan
    'payment.plan': 'План оплаты',
    'payment.summary': 'Краткая информация',
    'payment.breakdown': 'Детальный график',
    'payment.downPayment': 'Первый взнос',
    'payment.duringConstruction': 'Во время строительства',
    'payment.onHandover': 'При сдаче',
    'payment.total': 'Итого',
    
    // CTA buttons
    'cta.scheduleViewing': 'Записаться на просмотр',
    'cta.requestCallback': 'Заказать звонок',
    'cta.downloadFloorPlan': 'Скачать планировку',
    'cta.shareWhatsApp': 'Поделиться в WhatsApp',
    'cta.addToFavorites': 'В избранное',
    'cta.backToBrowse': 'Назад к списку',
    'cta.viewOnMap': 'Посмотреть на карте',
    
    // Gallery
    'gallery.photos': 'Фотографии',
    'gallery.floorPlans': 'Планировки',
    'gallery.previous': 'Назад',
    'gallery.next': 'Вперёд',
    'gallery.close': 'Закрыть',
    'gallery.of': 'из',
    
    // Amenities (common)
    'amenities.gym': 'Тренажёрный зал',
    'amenities.pool': 'Бассейн',
    'amenities.spa': 'СПА',
    'amenities.cinema': 'Кинозал',
    'amenities.kids': 'Детская площадка',
    'amenities.parking': 'Парковка',
    'amenities.security': 'Охрана 24/7',
    'amenities.concierge': 'Консьерж',
    
    // Messages
    'msg.loadingUnit': 'Загрузка объекта...',
    'msg.unitNotFound': 'Объект не найден',
    'msg.error': 'Произошла ошибка',
    'msg.tryAgain': 'Попробуйте снова'
  },
  
  en: {
    // Browse page
    'realEstate.browse.title': '🏢 UAE Real Estate',
    'realEstate.browse.subtitle': 'Dubai Property Investments',
    'realEstate.browse.loading': 'Loading properties...',
    'realEstate.browse.noResults': 'No properties found',
    'realEstate.browse.totalUnits': 'units available',
    'realEstate.browse.showingUnits': 'Showing units',
    
    // Filters
    'filters.title': 'Filters',
    'filters.reset': 'Reset',
    'filters.apply': 'Apply',
    'filters.priceRange': 'Price',
    'filters.areaRange': 'Area',
    'filters.bedrooms': 'Bedrooms',
    'filters.type': 'Type',
    'filters.sortBy': 'Sort by',
    
    // Property types
    'type.apartment': 'Apartments',
    'type.retail': 'Retail',
    'type.office': 'Offices',
    'type.fnb': 'F&B',
    
    // Bedrooms
    'bedrooms.studio': 'Studio',
    'bedrooms.1br': '1 Bedroom',
    'bedrooms.2br': '2 Bedrooms',
    'bedrooms.2br_maid': '2BR + Maid',
    'bedrooms.3br': '3 Bedrooms',
    'bedrooms.3br_plus': '3+ Bedrooms',
    'bedrooms.penthouse': 'Penthouse',
    
    // Sort options
    'sort.priceAsc': 'Price: Low → High',
    'sort.priceDesc': 'Price: High → Low',
    'sort.areaAsc': 'Area: Small → Large',
    'sort.areaDesc': 'Area: Large → Small',
    'sort.roiDesc': 'ROI: High → Low',
    'sort.appreciationDesc': 'Appreciation: High → Low',
    
    // Unit card
    'unit.from': 'from',
    'unit.aed': 'AED',
    'unit.rub': '₽',
    'unit.usd': '$',
    'unit.sqm': 'm²',
    'unit.sqft': 'sq ft',
    'unit.bedrooms': 'beds',
    'unit.roi': 'ROI',
    'unit.appreciation': 'Appreciation',
    'unit.available': 'Available',
    'unit.learnMore': 'Learn More',
    'unit.viewDetails': 'View Details',
    
    // Unit detail page
    'detail.title': 'Property Details',
    'detail.overview': 'Overview',
    'detail.specs': 'Specifications',
    'detail.payment': 'Payment Plan',
    'detail.location': 'Location',
    'detail.amenities': 'Amenities',
    'detail.developer': 'Developer',
    'detail.gallery': 'Gallery',
    'detail.floorPlan': 'Floor Plan',
    
    // Specs
    'specs.unitNumber': 'Unit Number',
    'specs.building': 'Building',
    'specs.type': 'Type',
    'specs.bedrooms': 'Bedrooms',
    'specs.totalArea': 'Total Area',
    'specs.internalArea': 'Internal Area',
    'specs.externalArea': 'External Area',
    'specs.price': 'Price',
    'specs.pricePerSqft': 'Price per sq ft',
    'specs.pricePerSqm': 'Price per m²',
    'specs.serviceCharge': 'Service Charge',
    'specs.handover': 'Handover',
    'specs.ownership': 'Ownership',
    'specs.furnished': 'Furnished',
    
    // Project info
    'project.name': 'Project',
    'project.developer': 'Developer',
    'project.location': 'Location',
    'project.completion': 'Completion',
    'project.status': 'Status',
    'project.website': 'Project Website',
    'project.officialLink': 'Official Page',
    
    // Payment plan
    'payment.plan': 'Payment Plan',
    'payment.summary': 'Summary',
    'payment.breakdown': 'Breakdown',
    'payment.downPayment': 'Down Payment',
    'payment.duringConstruction': 'During Construction',
    'payment.onHandover': 'On Handover',
    'payment.total': 'Total',
    
    // CTA buttons
    'cta.scheduleViewing': 'Schedule Viewing',
    'cta.requestCallback': 'Request Callback',
    'cta.downloadFloorPlan': 'Download Floor Plan',
    'cta.shareWhatsApp': 'Share on WhatsApp',
    'cta.addToFavorites': 'Add to Favorites',
    'cta.backToBrowse': 'Back to Browse',
    'cta.viewOnMap': 'View on Map',
    
    // Gallery
    'gallery.photos': 'Photos',
    'gallery.floorPlans': 'Floor Plans',
    'gallery.previous': 'Previous',
    'gallery.next': 'Next',
    'gallery.close': 'Close',
    'gallery.of': 'of',
    
    // Amenities (common)
    'amenities.gym': 'Gym',
    'amenities.pool': 'Pool',
    'amenities.spa': 'Spa',
    'amenities.cinema': 'Cinema',
    'amenities.kids': 'Kids Area',
    'amenities.parking': 'Parking',
    'amenities.security': '24/7 Security',
    'amenities.concierge': 'Concierge',
    
    // Messages
    'msg.loadingUnit': 'Loading property...',
    'msg.unitNotFound': 'Property not found',
    'msg.error': 'An error occurred',
    'msg.tryAgain': 'Try again'
  }
};

// Get current language from i18n manager
function getCurrentLanguage() {
  return window.i18n?.getCurrentLanguage() || 'ru';
}

// Translation function
export function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || translations.ru[key] || key;
}

export default { t };
