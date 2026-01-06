# 🌍 Modular i18n System v3.0.0

## 📋 Overview

HayatiBank uses a **modular i18n system** where:
- **Core translations** are in `/webapp/js/utils/i18n.js` (SSOT)
- **Modules can extend** with their own translations
- **No duplication** - modules inherit from core when possible

---

## 🏗️ Architecture

```
/webapp/
├── js/utils/i18n.js              # ✅ Core i18n (SSOT)
│   ├── Core translations (auth, cabinet, common)
│   ├── registerModuleTranslations()
│   └── Language management
│
├── auth/i18n.js                  # ✅ Re-exports core (no duplication)
├── cabinet/i18n.js               # ✅ Re-exports core (no duplication)
│
├── investments/i18n.js           # ✅ Registers module translations
├── offeringZone/i18n.js          # ✅ Registers module translations
└── accountDashboard/i18n.js     # ✅ Registers module translations
```

---

## 🎯 Two Strategies

### **Strategy A: Inherit from Core**
For modules whose translations are already in core.

**Example:** `auth/i18n.js`, `cabinet/i18n.js`

```javascript
/* /webapp/auth/i18n.js */
import { t, setLanguage, getCurrentLanguage } from '../js/utils/i18n.js';

// Just re-export
export { t, setLanguage, getCurrentLanguage };
```

**When to use:**
- ✅ Module translations already in core
- ✅ No module-specific keys needed
- ✅ Simplest approach

---

### **Strategy B: Register Module Translations**
For modules with their own translation keys.

**Example:** `investments/i18n.js`, `offeringZone/i18n.js`

```javascript
/* /webapp/investments/i18n.js */
import { registerModuleTranslations, t } from '../js/utils/i18n.js';

const investmentsTranslations = {
  ru: {
    'investment.level1.title': '📊 Инвестиции: Уровень №1',
    // ... more keys
  },
  en: {
    'investment.level1.title': '📊 Investments: Level #1',
    // ... more keys
  }
};

// Register with core
registerModuleTranslations('investments', investmentsTranslations);

// Re-export
export { t, setLanguage, getCurrentLanguage };
```

**When to use:**
- ✅ Module has unique translation keys
- ✅ Module can be enabled/disabled
- ✅ Module is self-contained

---

## 🔧 How to Add a New Module

### **Step 1: Create module i18n file**

```javascript
/* /webapp/myModule/i18n.js */
import { registerModuleTranslations, t } from '../js/utils/i18n.js';

const myModuleTranslations = {
  ru: {
    'myModule.title': 'Заголовок',
    'myModule.subtitle': 'Подзаголовок'
  },
  en: {
    'myModule.title': 'Title',
    'myModule.subtitle': 'Subtitle'
  }
};

registerModuleTranslations('myModule', myModuleTranslations);

export { t, setLanguage, getCurrentLanguage };
```

### **Step 2: Import in module file**

```javascript
/* /webapp/myModule/myModule.js */
import { t } from './i18n.js';

function renderMyModule() {
  const title = t('myModule.title');
  console.log(title); // "Заголовок" or "Title"
}
```

### **Step 3: Done!**

No need to touch core i18n file. Module translations are automatically merged.

---

## 📚 Usage Examples

### **In HTML (data-i18n attribute)**

```html
<h2 data-i18n="investment.level1.title">Инвестиции: Уровень №1</h2>
```

**Auto-updates** when language changes via `updatePageTranslations()`.

---

### **In JavaScript**

```javascript
import { t } from './i18n.js';

const title = t('investment.level1.title');
const error = t('investment.error.loadFailed');
```

---

### **Language Switching**

```javascript
import { setLanguage, updatePageTranslations } from '../js/utils/i18n.js';

// Switch to English
setLanguage('en');
updatePageTranslations(); // Updates all [data-i18n] elements
```

---

## 🔍 Debugging

### **List registered modules**

```javascript
import { getRegisteredModules } from '../js/utils/i18n.js';

console.log(getRegisteredModules());
// Output: ['investments', 'offeringZone', 'accountDashboard']
```

### **Get module translations**

```javascript
import { getModuleTranslations } from '../js/utils/i18n.js';

const translations = getModuleTranslations('investments');
console.log(translations.ru['investment.level1.title']);
// Output: "📊 Инвестиции: Уровень №1"
```

---

## 🎨 Translation Key Naming Convention

```
module.section.item

Examples:
- investment.level1.title
- offering.budget.cashFlow
- dashboard.step1.desc
- cabinet.account.delete
```

**Rules:**
- ✅ Use lowercase
- ✅ Use dots (.) for hierarchy
- ✅ Be descriptive
- ❌ Don't use underscores
- ❌ Don't mix languages

---

## 🚀 Benefits

### **1. No Duplication**
- Core translations defined once
- Modules extend when needed

### **2. Module Independence**
- Each module can be enabled/disabled
- Easy to move modules between projects

### **3. Central Management**
- One place to add new languages
- Easy to sync translations

### **4. Type Safety (future)**
- Can add TypeScript definitions
- Auto-complete in IDE

---

## 📝 Migration Guide

### **From Old System:**

```javascript
// OLD: Hardcoded strings
const title = "Инвестиции: Уровень №1";
```

```javascript
// NEW: i18n
import { t } from './i18n.js';
const title = t('investment.level1.title');
```

### **From Standalone i18n:**

```javascript
// OLD: Standalone translations
const translations = { ru: {...}, en: {...} };
function t(key) { return translations[lang][key]; }
```

```javascript
// NEW: Modular registration
import { registerModuleTranslations, t } from '../js/utils/i18n.js';
registerModuleTranslations('myModule', { ru: {...}, en: {...} });
export { t };
```

---

## 🌐 Supported Languages

Currently:
- 🇷🇺 **Russian** (ru) - default
- 🇬🇧 **English** (en)

**To add a new language:**

1. Add to core i18n:
```javascript
// /webapp/js/utils/i18n.js
const coreTranslations = {
  ru: { ... },
  en: { ... },
  ar: { ... } // ✅ NEW
};
```

2. Add to modules:
```javascript
// /webapp/investments/i18n.js
const investmentsTranslations = {
  ru: { ... },
  en: { ... },
  ar: { ... } // ✅ NEW
};
```

3. Done!

---

## 🐛 Common Issues

### **Issue 1: Translation not found**

**Symptom:** `t('some.key')` returns `'some.key'`

**Solution:**
1. Check key exists in translations
2. Check module is registered
3. Check language is supported

---

### **Issue 2: Module not registered**

**Symptom:** Console shows: `getRegisteredModules()` doesn't include module

**Solution:**
1. Check `registerModuleTranslations()` is called
2. Check import order (module i18n must load before usage)

---

### **Issue 3: HTML not updating**

**Symptom:** Language changes but HTML stays same

**Solution:**
Call `updatePageTranslations()` after `setLanguage()`:

```javascript
setLanguage('en');
updatePageTranslations(); // ✅ Don't forget this!
```

---

## 📦 Files Modified in v3.0.0

### **Created:**
- ✅ `/webapp/js/utils/i18n.js` v3.0.0 (modular system)
- ✅ `/webapp/investments/i18n.js` v1.0.0 (new module)

### **Updated:**
- ✅ `/webapp/investments/level1.js` v1.1.0 (uses i18n)
- ✅ `/webapp/auth/i18n.js` v2.0.0 (inherits from core)
- ✅ `/webapp/cabinet/i18n.js` v2.0.0 (inherits from core)
- ✅ `/webapp/offeringZone/i18n.js` v2.0.0 (registers module)
- ✅ `/webapp/accountDashboard/i18n.js` v2.0.0 (registers module)

---

**Last updated:** 2025-01-07  
**Version:** 3.0.0  
**Status:** ✅ Production ready