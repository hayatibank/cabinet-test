/* /webapp/cabinet/accountsUI.js v2.1.0 */
// CHANGELOG v2.1.0:
// - ADDED: Use centralized i18n from /js/utils/i18n.js
// - REMOVED: Hardcoded Russian strings
// - IMPROVED: All user-facing strings use t()
// CHANGELOG v2.0.0:
// - UPDATED: All buttons use new unified system
// - REMOVED: Full-width buttons
// - ADDED: Proper button hierarchy (Primary > Secondary > Ghost)
// CHANGELOG v1.5.0:
// - REMOVED: RUB balance from account cards
// - Account cards now show only name and type
// UI rendering for accounts list and management

import { getUserAccounts, deleteAccount } from './accounts.js';
import { showCreateAccountForm } from './createAccount.js';
import { t } from '../js/utils/i18n.js';

/**
 * Render accounts list in cabinet
 */
export async function renderAccountsList() {
  try {
    console.log('📋 Loading accounts...');
    
    // Get accounts
    const accounts = await getUserAccounts();
    
    // Get container
    const container = document.querySelector('.cabinet-content');
    
    if (!container) {
      console.error('❌ Cabinet content container not found');
      return;
    }
    
    // Render
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
      
      // Attach event listeners
      attachAccountListeners();
    }
    
    console.log(`✅ Rendered ${accounts.length} accounts`);
    
  } catch (err) {
    console.error('❌ Error rendering accounts:', err);
    
    const container = document.querySelector('.cabinet-content');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p data-i18n="cabinet.errorLoadingAccounts">${t('cabinet.errorLoadingAccounts')}</p>
          <div class="btn-center">
            <button onclick="location.reload()" class="btn btn-secondary">
              <span data-i18n="cabinet.refresh">${t('cabinet.refresh')}</span>
            </button>
          </div>
        </div>
      `;
    }
  }
}

/**
 * Render single account card (WITHOUT BALANCE)
 */
function renderAccountCard(account) {
  const { accountId, type, profile } = account;
  
  // Type labels
  const typeLabels = {
    individual: t('cabinet.accountType.individual'),
    business: t('cabinet.accountType.business'),
    government: t('cabinet.accountType.government')
  };
  
  const typeLabel = typeLabels[type] || t('cabinet.accounts');
  
  // Profile name
  let profileName = t('cabinet.account.noName');
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
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
              <span data-i18n="cabinet.account.edit">${t('cabinet.account.edit')}</span>
            </button>
            <button class="dropdown-item dropdown-item-danger" data-action="delete" data-account-id="${accountId}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
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
          <span class="btn-text" data-i18n="cabinet.account.enter">${t('cabinet.account.enter').toUpperCase()}</span>
          <svg class="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * Attach event listeners to account cards
 */
function attachAccountListeners() {
  // Menu toggle
  document.querySelectorAll('.btn-menu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const accountId = btn.dataset.accountId;
      const menu = document.getElementById(`menu-${accountId}`);
      
      // Close all other menus
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m.id !== `menu-${accountId}`) {
          m.classList.remove('show');
        }
      });
      
      menu.classList.toggle('show');
    });
  });
  
  // Edit account (placeholder)
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
 * Handle account edit (placeholder)
 */
function handleEditAccount(accountId) {
  alert(t('cabinet.account.editPlaceholder'));
  console.log(`📝 Edit account: ${accountId}`);
}

/**
 * Handle account deletion
 */
async function handleDeleteAccount(accountId) {
  try {
    const confirmed = confirm(t('cabinet.account.deleteConfirm'));
    
    if (!confirmed) {
      return;
    }
    
    console.log(`🗑️ Deleting account: ${accountId}`);
    
    await deleteAccount(accountId);
    
    alert(t('cabinet.accountDeleted'));
    
    // Reload accounts list
    await renderAccountsList();
    
  } catch (err) {
    console.error('❌ Error deleting account:', err);
    alert(t('cabinet.createAccount.error'));
  }
}

/**
 * Handle entering account (navigate to account dashboard)
 */
function handleEnterAccount(accountId) {
  console.log(`🚀 Entering account: ${accountId}`);
  
  // Import and show account navigation
  import('../accountDashboard/accountNavigation.js').then(module => {
    module.showAccountDashboard(accountId);
  }).catch(err => {
    console.error('❌ Error loading account navigation:', err);
    alert(t('cabinet.errorLoadingAccounts'));
  });
}

/**
 * Show create account button
 */
export function showCreateAccountButton() {
  const actionsContainer = document.querySelector('.cabinet-actions');
  
  if (!actionsContainer) {
    console.error('❌ Cabinet actions container not found');
    return;
  }
  
  // Check if already initialized
  if (actionsContainer.querySelector('.btn-create-account')) {
    return;
  }
  
  // Horizontal layout: [Создать] [Настройки] [Выйти]
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
  
  // Attach create account listener
  const createBtn = actionsContainer.querySelector('.btn-create-account');
  if (createBtn) {
    createBtn.onclick = showCreateAccountForm;
  }
}

/**
 * Initialize cabinet when ready
 * Listens to 'cabinetReady' event from ui.js
 */
if (typeof window !== 'undefined') {
  window.addEventListener('cabinetReady', async (event) => {
    console.log('📋 Cabinet ready event received:', event.detail);
    
    // Initialize cabinet UI
    showCreateAccountButton();
    await renderAccountsList();
  });
  
  console.log('✅ Cabinet event listener registered');
}