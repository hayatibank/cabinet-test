# 📊 Financial Statement Module

**Version:** 1.0.0 (IN PROGRESS)  
**Description:** Complete financial reporting system with income, expenses, assets, liabilities analysis

---

## 🚧 MIGRATION STATUS

**⚠️ Module isolation in progress**

### ✅ Completed:
- i18n.js (standalone, RU/EN, 200+ keys)
- financial-report.css (moved from /css/screens/)

### 🔄 TODO:
- Copy & update: financialReport.js
- Copy & update: reportService.js
- Copy & update: reportManager.js
- Copy & update: reportFormatters.js

---

## 📁 Target Structure

```
/webapp/finStatement/
├── i18n.js                ✅ DONE
├── financial-report.css   ✅ DONE
├── financialReport.js     ❌ TODO
├── reportService.js       ❌ TODO
├── reportManager.js       ❌ TODO
├── reportFormatters.js    ❌ TODO
└── README.md              ✅ THIS FILE
```

---

## 🔧 Import Updates Needed

When copying JS files from `/js/cabinet/reports/`, update:

```javascript
// OLD:
import { t } from '../../utils/i18n.js';
import { API_URL } from '../../config.js';
import { getSession } from '../../session.js';

// NEW:
import { t } from './i18n.js';
import { API_URL } from '../js/config.js';
import { getSession } from '../js/session.js';
```

---

## 🌍 i18n Usage

### Report Sections
```javascript
import { t } from './i18n.js';

t('report.title');        // "📊 Финансовый отчёт"
t('report.income');       // "💰 Доходы"
t('report.expenses');     // "💸 Расходы"
t('report.assets');       // "📊 Активы"
t('report.liabilities');  // "📉 Пассивы"
```

### Categories
```javascript
// Income
t('income.A.1');          // "Зарплата #1"
t('income.C.1');          // "Бизнес (NET)"
t('income.E.2');          // "Дивиденды"

// Expenses
t('expenses.0.1');        // "Инвестиции"
t('expenses.1.3');        // "Жилье (рассрочка/рент + КУ)"

// Assets
t('assets.N.1');          // "Банковские счета"
t('assets.P.2');          // "Автомобиль(и)"

// Liabilities
t('liabilities.T.1');     // "Жилищная рассрочка"
```

### Analysis
```javascript
t('analysis.saving');              // "Сколько вы сохраняете?"
t('analysis.formula.saving');      // "Денежный поток / Общий доход"
t('analysis.note.shouldGrow');     // "***должен расти"
```

---

## 🎯 Financial Categories Structure

### Income (A-G)
- **A.** Employment (salary, etc.)
- **B.** Employment total
- **C.** Assets (business, real estate)
- **D.** Assets total
- **E.** Portfolio (bank products, dividends, royalties)
- **F.** Portfolio total
- **G.** TOTAL INCOME

### Expenses (H-M)
- **H.** Preliminary (investments, savings, charity, taxes)
- **I.** Preliminary total
- **J.** Main (food, housing, transport, health, debts)
- **K.** Main total
- **L.** TOTAL EXPENSES
- **M.** NET CASH FLOW

### Assets (N-S)
- **N.** Assets (bank accounts, digital, certificates, business, real estate)
- **O.** Assets subtotal
- **P.** Luxury (house, cars)
- **Q.** Luxury total
- **R.** TOTAL ASSETS (banker)
- **S.** TOTAL ASSETS (factual)

### Liabilities (T-U)
- **T.** Liabilities (mortgage, loans, installments)
- **U.** TOTAL LIABILITIES

### Net Worth (V-W)
- **V.** NET WORTH (banker) = R - U
- **W.** NET WORTH (factual) = S - U

---

## 📈 Analysis Metrics

1. **Savings Rate:** Cash flow / Income
2. **Money Working:** (Assets + Portfolio) / Income
3. **Tax Rate:** Taxes / Income
4. **Housing Rate:** Housing / Income (max 33%)
5. **Luxury Rate:** Luxury / Assets (max 33%)
6. **Asset Yield:** (Assets + Portfolio) / Factual assets
7. **Security:** Factual assets / Expenses (in months)
8. **Expenses Covered:** (Assets + Portfolio) / Expenses (target: 200%)

---

## 🔌 Integration

### From accountDashboard
```javascript
import { renderFinancialReport } from '../finStatement/financialReport.js';
await renderFinancialReport(accountId, year);
```

---

## 🎨 CSS Components

### Main Structure
- `.financial-report` - Main container
- `.year-selector` - Year selection buttons
- `.report-grid` - 2-column grid (1 column on mobile)

### Report Sections
- `.report-section` - Income/Expenses/Assets/Liabilities container
- `.report-table` - Table layout
- `.report-row` - Single row

### Row Types
- `.group-header-row` - Category header (A., C., H., etc.)
- `.subcategory-row` - Individual item (A.1, A.2, etc.)
- `.group-total-row` - Category total (B., D., I., etc.)
- `.grand-total-row` - Section total (G., L., R., etc.)

### Special Rows
- `.cash-flow-row` - Net cash flow (M.)
- `.net-worth-row` - Net worth (V., W.)
- `.editable-row` - Clickable row for editing

### Color Coding
- Income: Green (`--neon-green`)
- Expenses: Red (`--error`)
- Assets: Cyan (`--neon-blue`)
- Liabilities: Yellow (`--ferrari-yellow`)

---

## 📝 TODO

### High Priority
- [ ] Copy and update JS files
- [ ] Test all imports
- [ ] Update main.css
- [ ] Update accountNavigation.js imports

### Medium Priority
- [ ] Add i18n to all UI strings
- [ ] Create unit tests
- [ ] Performance optimization

### Low Priority
- [ ] Multi-currency support
- [ ] Export to PDF/Excel
- [ ] Historical trends graph

---

**Last updated:** 2024-12-27  
**Maintainer:** HayatiBank Team  
**Status:** 🚧 Migration in progress