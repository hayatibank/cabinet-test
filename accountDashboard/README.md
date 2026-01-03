# 📊 Account Dashboard Module

**Version:** 1.0.0  
**Description:** 7-step navigation system for working inside a selected account

---

## 📁 Structure

```
/webapp/accountDashboard/
├── i18n.js              # RU/EN translations
├── dashboard.css        # Navigation styles (7 steps)
├── accountNavigation.js # Main navigation logic
└── README.md            # This file
```

---

## 🎯 Purpose

**Account Dashboard** ≠ **Cabinet**

- **Cabinet** (`/cabinet/`) = CRUD для списка аккаунтов
- **Account Dashboard** (`/accountDashboard/`) = Работа внутри выбранного аккаунта

---

## 📊 7-Step Navigation

When user enters an account, they see 7 steps:

| # | Name | Module | Status |
|---|------|--------|--------|
| 1 | Фин. отчёт | finStatement | ✅ Working |
| 2 | Цели | — | 🚧 Coming soon |
| 3 | Ден. поток | — | 🚧 Coming soon |
| 4 | Инвестиции | investments | ✅ Working |
| 5 | Бизнес | — | 🚧 Coming soon |
| 6 | Биз. управление | businessTriangle → 20L | ✅ Working |
| 7 | IPO | — | 🚧 Coming soon |

---

## 🌍 i18n Usage

```javascript
import { t } from './i18n.js';

// Step labels
t('dashboard.step1');        // "Фин. отчёт"
t('dashboard.step4');        // "Инвестиции"
t('dashboard.step6');        // "Биз. управление"

// Step titles
t('dashboard.step1.title');  // "📊 Финансовый отчёт"
t('dashboard.step4.title');  // "📈 Инвестиции"

// Step descriptions
t('dashboard.step1.desc');   // "Отчёт о доходах, расходах..."

// Common
t('dashboard.backToList');   // "Назад к списку"
t('dashboard.comingSoon');   // "Раздел в разработке"
```

---

## 🎨 CSS Components

### Navigation Bar
```css
.dashboard-nav         /* Horizontal scrollable nav */
.nav-step              /* Single step button */
.nav-step.active       /* Active step (gradient + glow) */
.step-number           /* Circle with step number */
.step-label            /* Step name */
```

### Dashboard Structure
```css
.account-dashboard     /* Main container */
.dashboard-header      /* Header with back button + account badge */
.dashboard-content     /* Content area (changes per step) */
.account-type-badge    /* Badge: 👤/🏢/🏛️ */
```

### Coming Soon
```css
.coming-soon           /* Placeholder for future steps */
```

---

## 🔌 Integration

### Opening Dashboard
```javascript
import { showAccountDashboard } from './accountDashboard/accountNavigation.js';

// From account list
await showAccountDashboard('acc_xyz123');
```

### Step 1: Financial Statement
```javascript
import { renderFinancialReport } from '../js/cabinet/reports/financialReport.js';
await renderFinancialReport(accountId);
```

### Step 4: Investments
```javascript
import { renderLevel1 } from '../investments/level1.js';
await renderLevel1(accountId);
```

### Step 6: Business Management
```javascript
import { showBusinessManagement } from '../businessTriangle/businessTriangle.js';
await showBusinessManagement(accountId);
```

---

## 🚀 Usage Flow

```
1. User sees account list (Cabinet)
   ↓
2. User clicks Ferrari "Войти" button
   ↓
3. accountsUI.js → handleEnterAccount()
   ↓
4. Dynamic import: accountDashboard/accountNavigation.js
   ↓
5. showAccountDashboard(accountId) renders 7-step nav
   ↓
6. User clicks step → renderStepContent()
   ↓
7. Corresponding module loads (finStatement, investments, etc.)
```

---

## 📊 Account Data Structure

```javascript
{
  accountId: "acc_123",
  type: "individual",     // individual | business | government
  profile: {
    firstName: "Иван",
    lastName: "Петров"
  },
  balance: { rub: 150000 }
}
```

---

## 🎯 Step Implementation Status

### ✅ Implemented
- **Step 1:** Financial Statement + Offering Zone
- **Step 4:** Investment Level 1 dashboard
- **Step 6:** Business Triangle → 20L system

### 🚧 Coming Soon
- **Step 2:** Goals & Planning
- **Step 3:** Cash Flow Analysis
- **Step 5:** Business Management
- **Step 7:** IPO Preparation

---

## 🔄 Import Paths

```javascript
// From accountNavigation.js:
import { getAccountById } from '../cabinet/accounts.js';
import { showBusinessManagement } from '../businessTriangle/businessTriangle.js';
import { renderFinancialReport } from '../js/cabinet/reports/financialReport.js';
import { renderLevel1 } from '../investments/level1.js';

// From accountsUI.js (cabinet):
import('../accountDashboard/accountNavigation.js')
```

---

## 🎨 Design Features

- **Gradient active state:** Neon blue → Neon pink
- **Glow effect:** Box-shadow on active step
- **Responsive:** Horizontal scroll on mobile
- **Smooth transitions:** translateY(-2px) on hover
- **Ferrari aesthetic:** Consistent with app design

---

## 📝 Notes

- **Модульная изоляция:** Вынесено из `/cabinet/` для чистоты
- **Standalone i18n:** Не зависит от core `/js/utils/i18n.js`
- **7-шаговая структура:** Готова к расширению (2, 3, 5, 7)
- **Динамический импорт:** Модули загружаются только при переходе на шаг

---

## 🐛 Known Issues

None currently reported. Navigation works as expected.

---

**Last updated:** 2024-12-27  
**Maintainer:** HayatiBank Team