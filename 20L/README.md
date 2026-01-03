# 📞 20L Module

**20L Lead Management System** — модуль управления лидами и продажами.

---

## 📁 Структура

```
/webapp/20L/
├── i18n.js                    # Переводы (RU/EN)
├── 20L.css                    # Стили модуля
├── README.md                  # Документация
├── components/
│   ├── productSelector.js     # Выбор продукта
│   ├── dashboard.js           # Доска лидов
│   └── counterpartyModal.js   # Модальное окно контрагента
└── services/
    ├── productService.js      # CRUD для продуктов
    ├── counterpartyService.js # CRUD для контрагентов
    └── dashboardService.js    # Статистика
```

---

## 🎯 Функционал

### 1️⃣ **Product Selector**
- Создание продуктов
- Выбор продукта для работы
- Редактирование/удаление

### 2️⃣ **Dashboard**
Статистика по 4 метрикам:
- **Leads** (Лиды) — цель: 20 активных
- **IC** (In Contact) — в контакте
- **Counterparties** (Контрагенты) — всего в базе
- **Sales** (Продажи) — успешные сделки

### 3️⃣ **Counterparty Management**
**Статусы:**
- `0` (Серый) — начальный статус
- `IC` (Жёлтый) — в контакте
- `Lead` (Синий) — квалифицированный лид
- `Sales` (Зелёный) — продажа

**Цикл продаж (11 этапов):**
1. CRM
2. 0-й звонок
3. 1-я встреча
4. 2-я встреча
5. 3-я встреча
6. Подготовка ОП
7. Отправка ОП
8. Обсуждение ОП
9. Контракт
10. Оплата
11. Доставка

---

## 🌍 i18n

Модуль имеет **изолированный i18n.js** с поддержкой:
- `ru` (русский) — по умолчанию
- `en` (английский)

**Использование:**
```javascript
import { t } from '../i18n.js';

const title = t('20L.dashboard.title'); // "Доска лидов"
```

**Автоопределение языка:**
- Telegram: по `user.language_code`
- Fallback: `ru`

---

## 🎨 CSS

Модуль имеет **изолированный 20L.css** со стилями:

### Компоненты:
- `.product-selector` — форма выбора продукта
- `.leads-dashboard` — доска лидов
- `.stat-card` — карточки статистики
- `.counterparty-card` — карточки контрагентов
- `.filter-btn` — кнопки фильтров

### Статус-цвета:
- Gray (`#808080`) — статус 0
- Yellow (`#ffd700`) — IC
- Cyan (`#00f0ff`) — Lead
- Green (`#00ff9f`) — Sales

### Responsive:
- Desktop: `grid 4x1`
- Tablet (<768px): `grid 2x2`
- Mobile (<480px): `grid 1x4`

---

## 📊 Firestore Data Structure

### Products Collection
```
accounts/{accountId}/20L_products/{productId}
{
  name: "Недвижимость в Дубае",
  comment: "Премиум сегмент",
  status: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Counterparties Collection
```
accounts/{accountId}/20L_counterparties/{counterpartyId}
{
  name: "Иван Петров",
  productId: "prod_abc123",
  status20L: "Lead",          // 0, IC, Lead, Sales
  cycleStage: "3",            // 1-11
  classification: "Lead",
  source: "Telegram",
  comment: "Заинтересован в студии",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔗 API Endpoints

### Products
- `GET /api/20L/products` — список продуктов
- `POST /api/20L/products/create` — создать продукт
- `PUT /api/20L/products/update` — обновить продукт
- `DELETE /api/20L/products/delete` — удалить продукт

### Counterparties
- `GET /api/20L/counterparties` — список контрагентов (с фильтрами)
- `POST /api/20L/counterparties/create` — создать контрагента
- `PUT /api/20L/counterparties/update` — обновить контрагента
- `DELETE /api/20L/counterparties/delete` — удалить контрагента

### Dashboard
- `GET /api/20L/dashboard/stats` — статистика по продукту

**Фильтры для GET counterparties:**
```
?productId=prod_abc123&status20L=Lead&cycleStage=3
```

---

## 🚀 Usage

### 1. Открыть 20L систему:
```javascript
import { showBusinessManagement } from './cabinet/businessTriangle.js';

showBusinessManagement(accountId);
```

### 2. Выбрать продукт:
```javascript
import { renderProductSelector } from './20L/components/productSelector.js';

await renderProductSelector(accountId);
```

### 3. Открыть доску лидов:
```javascript
import { renderDashboard } from './20L/components/dashboard.js';

await renderDashboard(accountId, productId);
```

---

## 📝 Changelog

### v1.0.0 (2025-12-27)
- ✅ Модуль изолирован
- ✅ i18n.js создан (RU/EN)
- ✅ 20L.css создан
- ✅ README.md создан
- ✅ 6 файлов: 3 components + 3 services

---

## 🎯 Roadmap

- [ ] Добавить экспорт в Excel
- [ ] Email-уведомления
- [ ] WhatsApp интеграция
- [ ] Автоматизация переходов между этапами
- [ ] Telegram Bot для уведомлений
- [ ] Шаблоны писем/сообщений

---

## 🛠️ Maintenance

**Обновление переводов:**
```javascript
// 20L/i18n.js
'20L.newFeature.title': 'Новая функция',
```

**Обновление стилей:**
```css
/* 20L/20L.css */
.new-component {
  /* ... */
}
```

**Важно:** При добавлении новых ключей i18n обновлять **оба языка** (ru + en).

---

## 📞 Support

По вопросам работы модуля:
- GitHub: HayatiBank/webapp
- Issues: создать issue с тегом `20L`