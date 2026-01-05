// webapp/cabinet/createAccount.js v1.5.0
// CHANGELOG v1.5.0:
// - UPGRADED: All buttons to 3D system
// - Ferrari "Создать аккаунт" button
// - Glass "Отмена" button
// CHANGELOG v1.4.1:
// - Silent HYC rewards

import { createAccount } from './accounts.js';
import { renderAccountsList } from './accountsUI.js';
import { refreshHYCBalance } from '../HayatiCoin/hycUI.js';
import { formatHYC } from '../HayatiCoin/hycService.js';

/**
 * Show create account form
 */
export function showCreateAccountForm() {
  console.log('📝 Showing create account form');
  
  const container = document.querySelector('.cabinet-content');
  
  if (!container) {
    console.error('❌ Cabinet content container not found');
    return;
  }
  
  container.innerHTML = `
    <div class="create-account-form">
      <h2>➕ Создание аккаунта</h2>
      
      <div class="account-type-selector">
        <p class="form-label">Выберите тип аккаунта:</p>
        
        <div class="type-cards">
          <div class="type-card active" data-type="individual">
            <div class="type-icon">👤</div>
            <h3>Физическое лицо</h3>
            <p>Для личных финансов</p>
          </div>
          
          <div class="type-card disabled" data-type="business">
            <div class="type-icon">🏢</div>
            <h3>ЮЛ / ИП</h3>
            <p>Скоро...</p>
          </div>
          
          <div class="type-card disabled" data-type="government">
            <div class="type-icon">🏛️</div>
            <h3>Госорганы</h3>
            <p>Скоро...</p>
          </div>
        </div>
      </div>
      
      <div id="individualForm" class="account-form">
        <h3>👤 Физическое лицо</h3>
        
        <div class="input-group">
          <label for="firstName">Имя *</label>
          <input type="text" id="firstName" placeholder="Иван" required>
        </div>
        
        <div class="input-group">
          <label for="lastName">Фамилия *</label>
          <input type="text" id="lastName" placeholder="Петров" required>
        </div>
        
        <div class="input-group">
          <label for="birthDate">Дата рождения</label>
          <input type="date" id="birthDate">
        </div>
        
        <div class="form-actions">
          <!-- 🆕 NEW: 3D Ferrari Button -->
          <button id="createIndividualBtn" class="btn-3d btn-3d-ferrari btn-3d-large">
            <svg class="btn-icon btn-icon-left" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0c5.5 0 10 4.5 10 10s-4.5 10-10 10S0 15.5 0 10 4.5 0 10 0zm1 5H9v4H5v2h4v4h2v-4h4V9h-4V5z"/>
            </svg>
            <span>Создать аккаунт</span>
          </button>
          
          <!-- 🆕 NEW: 3D Glass Button -->
          <button id="cancelBtn" class="btn-3d btn-3d-glass">
            <svg class="btn-icon btn-icon-left" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
            </svg>
            <span>Отмена</span>
          </button>
        </div>
        
        <div id="createError" class="error hidden"></div>
      </div>
      
      <div id="businessForm" class="account-form hidden">
        <h3>🏢 Юридическое лицо / ИП</h3>
        <p class="info-text">В разработке...</p>
      </div>
      
      <div id="governmentForm" class="account-form hidden">
        <h3>🏛️ Государственная организация</h3>
        <p class="info-text">В разработке...</p>
      </div>
    </div>
  `;
  
  attachFormListeners();
}

/**
 * Attach form event listeners
 */
function attachFormListeners() {
  // Type selector
  document.querySelectorAll('.type-card:not(.disabled)').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      selectAccountType(type);
    });
  });
  
  // Create individual account
  document.getElementById('createIndividualBtn')?.addEventListener('click', handleCreateIndividual);
  
  // Cancel button
  document.getElementById('cancelBtn')?.addEventListener('click', async () => {
    await renderAccountsList();
  });
}

/**
 * Select account type
 */
function selectAccountType(type) {
  document.querySelectorAll('.type-card').forEach(card => {
    card.classList.remove('active');
  });
  document.querySelector(`[data-type="${type}"]`)?.classList.add('active');
  
  document.querySelectorAll('.account-form').forEach(form => {
    form.classList.add('hidden');
  });
  document.getElementById(`${type}Form`)?.classList.remove('hidden');
}

/**
 * Handle create individual account (with 3D loading state)
 */
async function handleCreateIndividual() {
  try {
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName = document.getElementById('lastName')?.value.trim();
    const birthDate = document.getElementById('birthDate')?.value;
    
    document.getElementById('createError')?.classList.add('hidden');
    
    if (!firstName || !lastName) {
      showError('Заполните имя и фамилию');
      return;
    }
    
    const btn = document.getElementById('createIndividualBtn');
    
    // 🆕 NEW: 3D Loading State
    btn.disabled = true;
    btn.classList.add('loading');
    
    const account = await createAccount('individual', {
      firstName,
      lastName,
      birthDate: birthDate || null
    });
    
    console.log('✅ Individual account created:', account.accountId);
    
    // 🆕 NEW: 3D Success State
    btn.classList.remove('loading');
    btn.classList.add('success');
    
    // Silent HYC reward
    if (account.hycReward) {
      await refreshHYCBalance();
      console.log(`🔇 Silent reward: ${formatHYC(account.hycReward.amount)} HYC`);
    }
    
    setTimeout(async () => {
      alert('✅ Аккаунт успешно создан!');
      await renderAccountsList();
    }, 500);
    
  } catch (err) {
    console.error('❌ Error creating individual account:', err);
    
    const btn = document.getElementById('createIndividualBtn');
    
    // 🆕 NEW: 3D Error State
    btn.classList.remove('loading');
    btn.classList.add('error');
    
    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove('error');
    }, 400);
    
    showError(err.message || 'Ошибка создания аккаунта');
  }
}

/**
 * Show error message
 */
function showError(message) {
  const errorEl = document.getElementById('createError');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}