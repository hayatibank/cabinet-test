/* /webapp/cabinet/accountsUI.js v1.6.0 */
// CHANGELOG v1.6.0:
// - UPGRADED: All buttons to 3D system
// - Ferrari "Войти" button on account cards
// - Glass "Создать аккаунт" button
// CHANGELOG v1.5.0:
// - REMOVED: RUB balance from account cards

import { getUserAccounts, deleteAccount } from './accounts.js';
import { showCreateAccountForm } from './createAccount.js';

/**
 * Render accounts list in cabinet
 */
export async function renderAccountsList() {
  try {
    console.log('📋 Loading accounts...');
    
    const accounts = await getUserAccounts();
    const container = document.querySelector('.cabinet-content');
    
    if (!container) {
      console.error('❌ Cabinet content container not found');
      return;
    }
    
    if (accounts.length === 0) {
      container.innerHTML = `
        <div class="no-accounts">
          <p>📋 У вас пока нет аккаунтов</p>
          <p class="subtitle">Создайте первый аккаунт для начала работы</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="accounts-list">
          ${accounts.map(acc => renderAccountCard(acc)).join('')}
        </div>
      `;
      
      attachAccountListeners();
    }
    
    console.log(`✅ Rendered ${accounts.length} accounts`);
    
  } catch (err) {
    console.error('❌ Error rendering accounts:', err);
    
    const container = document.querySelector('.cabinet-content');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p>❌ Ошибка загрузки аккаунтов</p>
          <button onclick="location.reload()" class="btn-3d btn-3d-small">
            <svg class="btn-icon btn-icon-left" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8h2c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6V0L4 5l6 5V6z"/>
            </svg>
            <span>Обновить</span>
          </button>
        </div>
      `;
    }
  }
}

/**
 * Render single account card (3D Ferrari button)
 */
function renderAccountCard(account) {
  const { accountId, type, profile } = account;
  
  const typeLabels = {
    individual: '👤 Физическое лицо',
    business: '🏢 Юридическое лицо',
    government: '🏛️ Госорганизация'
  };
  
  const typeLabel = typeLabels[type] || 'Аккаунт';
  
  let profileName = 'Без имени';
  if (type === 'individual' && profile) {
    profileName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  } else if (type === 'business' && profile?.companyName) {
    profileName = profile.companyName;
  } else if (type === 'government' && profile?.organizationName) {
    profileName = profile.organizationName;
  }
  
  return `
    <div class="account-card" data-account-id="${accountId}">
      <div class="account-header">
        <div class="account-type">${typeLabel}</div>
        <div class="account-menu">
          <button class="btn-icon btn-menu-toggle" data-action="menu" data-account-id="${accountId}">
            <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
              <circle cx="2" cy="2" r="2"/>
              <circle cx="2" cy="8" r="2"/>
              <circle cx="2" cy="14" r="2"/>
            </svg>
          </button>
          <div class="dropdown-menu" id="menu-${accountId}">
            <button class="dropdown-item" data-action="edit" data-account-id="${accountId}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z"/>
              </svg>
              Редактировать
            </button>
            <button class="dropdown-item dropdown-item-danger" data-action="delete" data-account-id="${accountId}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
              </svg>
              Удалить
            </button>
          </div>
        </div>
      </div>
      
      <div class="account-body">
        <h3 class="account-name">${profileName}</h3>
      </div>
      
      <div class="account-actions">
        <!-- 🆕 NEW: 3D Ferrari Button -->
        <button class="btn-3d btn-3d-ferrari btn-3d-full" data-action="enter" data-account-id="${accountId}">
          <svg class="btn-icon btn-icon-left" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
          </svg>
          <span>Войти</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Attach event listeners
 */
function attachAccountListeners() {
  // Menu toggle
  document.querySelectorAll('.btn-menu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const accountId = btn.dataset.accountId;
      const menu = document.getElementById(`menu-${accountId}`);
      
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m.id !== `menu-${accountId}`) {
          m.classList.remove('show');
        }
      });
      
      menu.classList.toggle('show');
    });
  });
  
  // Edit account
  document.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const accountId = btn.dataset.accountId;
      handleEditAccount(accountId);
    });
  });
  
  // Delete account
  document.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const accountId = btn.dataset.accountId;
      await handleDeleteAccount(accountId);
    });
  });
  
  // Enter account
  document.querySelectorAll('[data-action="enter"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const accountId = btn.dataset.accountId;
      handleEnterAccount(accountId);
    });
  });
  
  // Close menus on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.account-menu')) {
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('show');
      });
    }
  });
}

/**
 * Handle account edit
 */
function handleEditAccount(accountId) {
  alert('🚧 Редактирование аккаунта будет доступно в следующей версии');
  console.log(`📝 Edit account: ${accountId}`);
}

/**
 * Handle account deletion
 */
async function handleDeleteAccount(accountId) {
  try {
    const confirmed = confirm(
      '⚠️ ВНИМАНИЕ!\n\n' +
      'Вы действительно хотите удалить этот аккаунт?\n\n' +
      'Это действие нельзя отменить.'
    );
    
    if (!confirmed) return;
    
    console.log(`🗑️ Deleting account: ${accountId}`);
    
    await deleteAccount(accountId);
    
    alert('✅ Аккаунт успешно удалён');
    await renderAccountsList();
    
  } catch (err) {
    console.error('❌ Error deleting account:', err);
    alert('❌ Ошибка удаления аккаунта');
  }
}

/**
 * Handle entering account
 */
function handleEnterAccount(accountId) {
  console.log(`🚀 Entering account: ${accountId}`);
  
  import('../accountDashboard/accountNavigation.js').then(module => {
    module.showAccountDashboard(accountId);
  }).catch(err => {
    console.error('❌ Error loading account navigation:', err);
    alert('❌ Ошибка загрузки кабинета');
  });
}

/**
 * Show create account button (3D Glass)
 */
export function showCreateAccountButton() {
  const actionsContainer = document.querySelector('.cabinet-actions');
  
  if (!actionsContainer) {
    console.error('❌ Cabinet actions container not found');
    return;
  }
  
  if (actionsContainer.querySelector('.btn-create-account')) {
    return;
  }
  
  // 🆕 NEW: 3D Glass Button
  const createBtn = document.createElement('button');
  createBtn.className = 'btn-3d btn-3d-glass btn-3d-full btn-create-account';
  createBtn.onclick = showCreateAccountForm;
  createBtn.innerHTML = `
    <svg class="btn-icon btn-icon-left" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 0c5.5 0 10 4.5 10 10s-4.5 10-10 10S0 15.5 0 10 4.5 0 10 0zm1 5H9v4H5v2h4v4h2v-4h4V9h-4V5z"/>
    </svg>
    <span>Создать аккаунт</span>
  `;
  
  const logoutBtn = actionsContainer.querySelector('[onclick="logout()"]');
  if (logoutBtn) {
    actionsContainer.insertBefore(createBtn, logoutBtn);
  } else {
    actionsContainer.prepend(createBtn);
  }
}

/**
 * Initialize cabinet when ready
 */
if (typeof window !== 'undefined') {
  window.addEventListener('cabinetReady', async (event) => {
    console.log('📋 Cabinet ready event received:', event.detail);
    
    showCreateAccountButton();
    await renderAccountsList();
  });
  
  console.log('✅ Cabinet event listener registered');
}