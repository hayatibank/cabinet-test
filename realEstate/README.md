# 🏢 Real Estate Module v1.0.0

**UAE Real Estate Investment Platform** — полноценная система для просмотра и инвестирования в недвижимость Дубая.

---

## 📁 Структура

```
/webapp/realEstate/
├── i18n.js                    # RU/EN translations
├── realEstate.css             # Browse page styles (Ferrari design)
├── unitDetail.css             # Unit detail page styles
├── browse.js                  # All units grid + filters
├── unitDetail.js              # Full unit detail page
├── realEstateService.js       # Firestore API calls
└── README.md                  # This file
```

---

## 🎯 Функционал

### 1️⃣ **Browse All Units** (`browse.js`)
**660+ доступных объектов из HBD_AVAILABLE_UNITS**

**Фильтры:**
- 💰 Price range (AED)
- 📐 Area range (sqft / sqm)
- 🛏️ Bedrooms (Studio, 1BR, 2BR, 2BR+Maid, 3BR, 3BR+, Penthouse)
- 🏢 Property type (Apartment, Retail, Office, F&B)
- 📊 Sort by (Price, Area, ROI, Appreciation)

**Карточки:**
- Project image
- Project name + unit type
- Bedrooms + area
- ROI (if available)
- Price in AED/RUB/USD
- "View Details" button

---

### 2️⃣ **Unit Detail Page** (`unitDetail.js`)
**Полная информация об объекте**

**Sections:**
1. **Hero** — large image, price, badges
2. **Specifications** — bedrooms, area, price per sqm/sqft
3. **Payment Plan** — 70/30, detailed breakdown
4. **Project Info** — developer, location, completion date
5. **Amenities** — gym, pool, spa, etc.
6. **Location** — map + Google Maps link
7. **CTA Sidebar** — Schedule Viewing, Request Callback, Share WhatsApp

---

### 3️⃣ **Integration with Offering Zone**
**Клик на карточку в Offering Zone → Unit Detail Page**

```javascript
import { renderUnitDetail } from '../realEstate/unitDetail.js';

// Offering Zone button:
onclick="window.openUnitDetailFromOffering('${unit.projectId}', '${unit.unitNumber}')"

// Opens full detail page
await renderUnitDetail(projectId, unitNumber, 'cabinetContent');
```

---

## 🌍 i18n Usage

```javascript
import { t } from './i18n.js';

// Browse page
t('realEstate.browse.title');        // "🏢 Недвижимость в ОАЭ"
t('filters.priceRange');             // "Цена"
t('unit.viewDetails');               // "Смотреть детали"

// Unit detail
t('detail.specs');                   // "Характеристики"
t('cta.scheduleViewing');            // "Записаться на просмотр"
t('payment.plan');                   // "План оплаты"
```

---

## 📊 Data Flow

```
HBD Collection (Firebase)
    ↓
HBD_AVAILABLE_UNITS (aggregated pool, updated daily at 15:00)
    ↓
fetchAllUnits() → 660+ units
    ↓
filterUnits(criteria) → filtered
    ↓
Browse Page Grid (cards)
    ↓ User clicks "View Details"
Unit Detail Page (full info)
    ↓
fetchUnitDetails(projectId, unitId)
fetchProjectInfo(projectId)
    ↓
Display hero, specs, payment, amenities, CTA
```

---

## 🎨 CSS Design

**Ferrari-style cyberpunk cards:**
- Gradient borders (neon blue/pink)
- Hover effects (lift + glow)
- Responsive grid (3 → 2 → 1 columns)
- Premium glassmorphism

**Color scheme:**
- Neon blue: `#00f0ff` (primary)
- Neon green: `#00ff9f` (prices, ROI)
- Neon pink: `#ff006e` (accents)
- Dark bg: `#0f172a`

---

## 🔌 Integration Points

### **From Offering Zone:**
```javascript
// offeringZone.js
import { renderUnitDetail } from '../realEstate/unitDetail.js';

window.openUnitDetailFromOffering = async function(projectId, unitNumber) {
  await renderUnitDetail(projectId, unitNumber, 'cabinetContent');
};
```

### **From Account Dashboard (future):**
```javascript
// accountDashboard/accountNavigation.js
import { renderBrowsePage } from '../realEstate/browse.js';

// Step 4 → Real Estate Browse
await renderBrowsePage('cabinetContent');
```

---

## 🚀 Usage Examples

### **Example 1: Render Browse Page**
```javascript
import { renderBrowsePage } from '../realEstate/browse.js';

// Show all 660+ units with filters
await renderBrowsePage('cabinetContent');
```

### **Example 2: Render Unit Detail**
```javascript
import { renderUnitDetail } from '../realEstate/unitDetail.js';

// Show specific unit
await renderUnitDetail('#DXB513', 'I-102', 'cabinetContent');
```

### **Example 3: Filter Units**
```javascript
import { fetchAllUnits, filterUnits } from '../realEstate/realEstateService.js';

const allUnits = await fetchAllUnits();

const filtered = filterUnits(allUnits, {
  minPrice: 2000000,
  maxPrice: 5000000,
  bedrooms: [1, 2],
  type: ['apartment'],
  sortBy: 'roiDesc'
});

console.log(`Found ${filtered.length} units`);
```

---

## 📋 HBD Data Structure

### **Unit Document:**
```javascript
/HBD/{projectId}/units/{unitId}
{
  projectId: "#DXB513",
  projectName: "Eltiera Views",
  unitNumber: "I-102",
  unitType: "1-BEDROOM TYPE A",
  unitBedrooms: 1,
  unitPriceAed: 2236828,
  unitAreaTotalSqFt: 796.85,
  unitAreaInternalSqFt: 712.25,
  unitAreaExternalSqFt: 84.6,
  unitCashOnCashROI: 0.065,
  unitFloorplanLink: "https://...",
  buildingCode: "Tower 1",
  status: "Available",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### **Project Info:**
```javascript
/HBD/{projectId}/info/main
{
  projectName: "Eltiera Views",
  developerName: "Ellington Properties",
  districtName: "Jumeirah Islands",
  cityName: "Dubai",
  dateHandover: "Q4 2029",
  paymentPlan: "70/30",
  paymentPlanSummary: "20% при бронировании...",
  buildingServiceChargeAEDsqf: 21,
  ownership: "freehold",
  furnished: "kitchen appliances",
  location: "https://maps.app.goo.gl/...",
  projectIntroImgLink: "https://..."
}
```

---

## 🔧 API Endpoints (Firestore REST)

### **Fetch all units:**
```javascript
POST /api/firestore/get
{
  "path": "HBD_AVAILABLE_UNITS",
  "authToken": "..."
}
```

### **Fetch unit details:**
```javascript
POST /api/firestore/get
{
  "path": "HBD/#DXB513/units/I-102",
  "authToken": "..."
}
```

### **Fetch project info:**
```javascript
POST /api/firestore/get
{
  "path": "HBD/#DXB513/info/main",
  "authToken": "..."
}
```

---

## 🎯 Features Status

### ✅ **v1.0.0 (Current)**
- Browse all units (660+)
- Advanced filtering (price, area, beds, type)
- Sorting (price, area, ROI)
- Unit detail page
- Integration with Offering Zone
- Responsive design
- RU/EN translations

### 🚧 **v1.1.0 (Next)**
- [ ] Lead capture forms (Schedule Viewing, Request Callback)
- [ ] WhatsApp share (implemented, needs testing)
- [ ] Favorites system
- [ ] Image gallery modal
- [ ] Google Maps integration

### 🔮 **v2.0.0 (Future)**
- [ ] Islamic finance calculator (Murabaha, Ijara)
- [ ] Post-purchase financial impact
- [ ] RE Portfolio management (Level #2)
- [ ] Comparison tool (side-by-side)
- [ ] Virtual tours
- [ ] Agent chat
- [ ] Email notifications

---

## 💡 Islamic Finance (Coming Soon)

### **Shariah-Compliant Financing:**
- **Murabaha** — cost-plus financing (no riba)
- **Ijara** — lease-to-own
- **Musharaka** — partnership/co-ownership

**Calculator will show:**
- Down payment
- Profit margin (not interest rate)
- Monthly payment
- Total cost
- Halal certification

---

## 📝 Notes

### **Data Source:**
- **HBD_AVAILABLE_UNITS** — aggregated collection, updated daily at 15:00
- Only "Available" status units shown
- Real-time data from Firestore

### **Currency Conversion:**
- AED → RUB (live rate from ЦБ РФ API)
- AED → USD (fixed 0.272)

### **Performance:**
- Uses aggregated pool (single collection read)
- Client-side filtering (instant)
- Lazy image loading

### **Design Philosophy:**
- Ferrari-style premium cards
- Cyberpunk aesthetic
- Halal-first approach
- User-centric UX

---

## 🐛 Troubleshooting

### **Issue: Units not loading**
**Solution:** Check if `HBD_AVAILABLE_UNITS` collection exists and is updated.

### **Issue: Unit detail not found**
**Solution:** Verify `projectId` and `unitNumber` are correct. Check Firestore path.

### **Issue: Images not showing**
**Solution:** Verify Firebase Storage URLs are public. Check `projectIntroImgLink` and `unitFloorplanLink`.

### **Issue: Filters not working**
**Solution:** Check console for errors. Verify filter criteria in `filterUnits()`.

---

## 📞 Support

**Module:** Real Estate  
**Version:** 1.0.0  
**Status:** ✅ Production ready  
**Last updated:** 2025-01-17

---

**Developed with ❤️ by HayatiBank Team**
