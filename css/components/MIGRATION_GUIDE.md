/* /webapp/css/components/MIGRATION_GUIDE.md */

# 🚀 Migration Guide: Old Buttons → 3D Buttons v3.0

## 📋 Overview

This guide helps you migrate from old button styles to the new 3D button system.

---

## 🔄 Class Name Mapping

### Basic Buttons

| Old Class | New Class | Notes |
|-----------|-----------|-------|
| `.btn` | `.btn-3d` | Base 3D button |
| `.btn-primary` | `.btn-3d` | Default is now neon blue |
| `.btn-secondary` | `.btn-3d-glass` | Glassmorphism effect |
| `.btn-danger` | `.btn-3d-ferrari` | Ferrari red for destructive actions |
| `.btn-success` | `.btn-3d-success` | Neon green |

### Sizes

| Old Class | New Class |
|-----------|-----------|
| `.btn-small` | `.btn-3d-small` |
| (default) | `.btn-3d` |
| (none) | `.btn-3d-large` |

### States

| Old Class | New Class |
|-----------|-----------|
| `:disabled` | `:disabled` (no change) |
| (none) | `.btn-3d-loading` |
| (none) | `.btn-3d-state-success` |
| (none) | `.btn-3d-state-error` |

---

## 📝 Code Examples

### Example 1: Login Button

**Before:**
```html
<button class="btn btn-primary">
  Войти
</button>
```

**After:**
```html
<button class="btn-3d btn-3d-ferrari btn-3d-large">
  <svg class="btn-icon btn-icon-left" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M12 0C8.7 0 6 2.7 6 6v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-3.3-2.7-6-6-6z"/>
  </svg>
  <span>Войти в систему</span>
  <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
  </svg>
</button>
```

### Example 2: Account Actions

**Before:**
```html
<div class="account-actions">
  <button class="btn btn-enter ferrari-style">
    Войти
  </button>
</div>
```

**After:**
```html
<div class="account-actions">
  <button class="btn-3d btn-3d-ferrari btn-3d-full">
    <span>Войти</span>
    <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
    </svg>
  </button>
</div>
```

### Example 3: Button Group

**Before:**
```html
<div class="form-actions">
  <button class="btn btn-secondary">Отмена</button>
  <button class="btn btn-primary">Сохранить</button>
</div>
```

**After:**
```html
<div class="btn-3d-group">
  <button class="btn-3d btn-3d-glass">Отмена</button>
  <button class="btn-3d btn-3d-ferrari">Сохранить</button>
</div>
```

### Example 4: Loading State

**Before:**
```javascript
btn.disabled = true;
btn.textContent = 'Загрузка...';
```

**After:**
```javascript
btn.classList.add('btn-3d-loading');
btn.disabled = true;

// When done:
btn.classList.remove('btn-3d-loading');
btn.disabled = false;
```

### Example 5: Success Feedback

**New feature:**
```javascript
async function saveData() {
  const btn = document.querySelector('.btn-save');
  
  // Start loading
  btn.classList.add('btn-3d-loading');
  btn.disabled = true;
  
  try {
    await api.save();
    
    // Success
    btn.classList.remove('btn-3d-loading');
    btn.classList.add('btn-3d-state-success');
    
    setTimeout(() => {
      btn.classList.remove('btn-3d-state-success');
      btn.disabled = false;
    }, 2000);
    
  } catch (err) {
    // Error
    btn.classList.remove('btn-3d-loading');
    btn.classList.add('btn-3d-state-error');
    
    setTimeout(() => {
      btn.classList.remove('btn-3d-state-error');
      btn.disabled = false;
    }, 2000);
  }
}
```

---

## 🎨 Styling Customization

### Override Button Colors

```css
/* Custom purple variant */
.btn-3d-purple {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 85, 247, 0.4);
}

.btn-3d-purple:hover:not(:disabled) {
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(168, 85, 247, 0.6);
}
```

### Adjust Sizes for Your App

```css
/* In your custom.css */
:root {
  --btn-height-medium: 56px;  /* Bigger buttons */
  --btn-font-medium: 17px;
}
```

---

## 📱 Mobile Considerations

The new button system is **mobile-first**:
- Touch targets are automatically sized for mobile (44px+)
- Hover effects work on desktop but don't break mobile
- Full-width buttons on mobile (via `.btn-3d-full`)

---

## ✅ Migration Checklist

- [ ] Add new CSS imports to main.css
- [ ] Update login/register forms
- [ ] Update account cards (Ferrari button)
- [ ] Update form actions (cancel/save)
- [ ] Update modal buttons
- [ ] Test on mobile
- [ ] Test keyboard navigation
- [ ] Test loading states
- [ ] Update i18n (if needed)
- [ ] Remove old button CSS (optional)

---

## 🚨 Breaking Changes

1. **Old `.btn` class is not replaced** - you need to manually migrate
2. **Ferrari button structure changed** - now uses `.btn-3d-ferrari`
3. **Button groups need wrapper** - use `.btn-3d-group`
4. **Icons need SVG** - old icon fonts won't work

---

## 💡 Tips

1. **Start with high-impact buttons** (login, create account)
2. **Test on real devices** (not just browser dev tools)
3. **Use demo page** (`/demo/buttons-demo.html`) for reference
4. **Keep old styles** until migration is complete
5. **Add loading states** everywhere (users love feedback!)

---

## 📚 Resources

- Demo page: `/webapp/demo/buttons-demo.html`
- Variables: `/webapp/css/base/buttons-3d-variables.css`
- Main styles: `/webapp/css/components/buttons-3d.css`
- Design reference: See uploaded images (3D button states)

---

**Questions?** Check the demo page or ask in the team chat.