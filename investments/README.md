# 📊 Investments Module

Standalone module for Investment Level 1 dashboard.

## Structure

```
/webapp/investments/
├── i18n.js              # Translations (RU/EN)
├── investments.css      # Cyberpunk styles
├── investmentService.js # Firestore API calls
├── level1.js            # Main dashboard component
└── README.md            # This file
```

## Usage

Import in account navigation:

```javascript
import { renderLevel1 } from '../../investments/level1.js';

// Render dashboard
await renderLevel1(accountId);
```

## Features

✅ Balance display (Bot, HODL, Projects, Liquidity)
✅ Investment list with status tracking
✅ Crypto portfolio (placeholder)
✅ Standalone i18n module
✅ Centralized Firestore access

## i18n Keys

All keys use flat structure with dot notation:
- `level1.*` - Main dashboard
- `balance.*` - Balance section
- `list.*` - Investment list
- `common.*` - Common terms
- `error.*` - Error messages

## Integration

1. CSS imported in `/webapp/css/main.css`:
   ```css
   @import "../investments/investments.css";
   ```

2. Called from Step 4 in account navigation

## Next Steps

- [ ] Currency conversion (RUB/USD/USDT)
- [ ] Real crypto portfolio integration
- [ ] Investment CRUD operations
- [ ] Charts and analytics

## Version

v1.0.1 - Standalone module