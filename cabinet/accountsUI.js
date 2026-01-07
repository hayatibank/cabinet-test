/* /webapp/cabinet/accountsUI.js v2.2.2 */
// CHANGELOG v2.2.2:
// - REMOVED: waitForI18n() - no longer needed
// - ASSUMED: i18n is always ready (guaranteed by app.js)

import { getUserAccounts, deleteAccount } from './accounts.js';
import { showCreateAccountForm } from './createAccount.js';

/**
 * Render accounts list in cabinet
 */
export async function renderAccountsList() {
  // ✅ i18n is guaranteed to be ready (no need to wait)
  const t = window.i18n.t.bind(window.i18n);
  
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
          <p data-i18n="cabinet.noAccounts">${t('cabinet.noAccounts')}</p>
          <p class="subtitle" data-i18n="cabinet.noAccountsSubtitle">${t('cabinet.noAccountsSubtitle')}</p>
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
    
    const t = window.i18n.t.bind(window.i18n);
    const container = document.querySelector('.cabinet-content');
    
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p data-i18n="cabinet.errorLoadingAccounts">${t('cabinet.errorLoadingAccounts')}</p>
          <button onclick="location.reload()" class="btn btn-secondary">
            <span data-i18n="cabinet.refresh">${t('cabinet.refresh')}</span>
          </button>
        </div>
      `;
    }
  }
}

// ... rest of the file stays the same ...

/**
 * Render single account card
 */
function renderAccountCard(account) {
  const t = window.i18n.t.bind(window.i18n);
  
  const { accountId, type, profile } = account;
  
  const typeLabels = {
    individual: t('cabinet.accountType.individual'),
    business: t('cabinet.accountType.business'),
    government: t('cabinet.accountType.government')
  };
  
  const typeLabel = typeLabels[type] || t('cabinet.accounts');
  
  let profileName = t('cabinet.account.noName');
  if (type === 'individual' && profile) {
    profileName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
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
              <span data-i18n="cabinet.account.edit">${t('cabinet.account.edit')}</span>
            </button>
            <button class="dropdown-item dropdown-item-danger" data-action="delete" data-account-id="${accountId}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
              </svg>
              <span data-i18n="cabinet.account.delete">${t('cabinet.account.delete')}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="account-body">
        <h3 class="account-name">${profileName}</h3>
      </div>
      
      <div class="account-actions">
        <button class="btn btn-enter" data-action="enter" data-account-id="${accountId}">
          <span class="btn-text" data-i18n="cabinet.account.enter">${t('cabinet.account.enter')}</span>
          <svg class="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// ... rest stays the same (attachAccountListeners, etc) ...

function attachAccountListeners() {
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
  
  document.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => handleEditAccount(btn.dataset.accountId));
  });
  
  document.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteAccount(btn.dataset.accountId));
  });
  
  document.querySelectorAll('[data-action="enter"]').forEach(btn => {
    btn.addEventListener('click', () => handleEnterAccount(btn.dataset.accountId));
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.account-menu')) {
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('show');
      });
    }
  });
}

function handleEditAccount(accountId) {
  const t = window.i18n.t.bind(window.i18n);
  alert(t('cabinet.account.editPlaceholder'));
}

async function handleDeleteAccount(accountId) {
  const t = window.i18n.t.bind(window.i18n);
  
  try {
    const confirmed = confirm(t('cabinet.account.deleteConfirm'));
    if (!confirmed) return;
    
    console.log(`🗑️ Deleting account: ${accountId}`);
    await deleteAccount(accountId);
    alert(t('cabinet.accountDeleted'));
    await renderAccountsList();
  } catch (err) {
    console.error('❌ Error deleting account:', err);
    alert(t('cabinet.createAccount.error'));
  }
}

function handleEnterAccount(accountId) {
  console.log(`🚀 Entering account: ${accountId}`);
  
  import('../accountDashboard/accountNavigation.js').then(module => {
    module.showAccountDashboard(accountId);
  }).catch(err => {
    const t = window.i18n.t.bind(window.i18n);
    console.error('❌ Error loading account navigation:', err);
    alert(t('cabinet.errorLoadingAccounts'));
  });
}

export async function showCreateAccountButton() {
  const t = window.i18n.t.bind(window.i18n);
  const actionsContainer = document.querySelector('.cabinet-actions');
  
  if (!actionsContainer || actionsContainer.querySelector('.btn-create-account')) {
    return;
  }
  
  actionsContainer.innerHTML = `
    <button class="btn btn-primary btn-create-account">
      <span data-i18n="cabinet.createAccount">${t('cabinet.createAccount')}</span>
    </button>
    <button onclick="showProfileMenu()" class="btn btn-secondary">
      <span data-i18n="cabinet.settings">${t('cabinet.settings')}</span>
    </button>
    <button onclick="logout()" class="btn btn-ghost">
      <span data-i18n="auth.logout.button">${t('auth.logout.button')}</span>
    </button>
  `;
  
  const createBtn = actionsContainer.querySelector('.btn-create-account');
  if (createBtn) {
    createBtn.onclick = showCreateAccountForm;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('cabinetReady', async (event) => {
    console.log('📋 Cabinet ready:', event.detail);
    showCreateAccountButton();
    await renderAccountsList();
  });
}
