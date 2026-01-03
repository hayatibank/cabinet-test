/* /webapp/auth/accountActions.js v2.0.0 */
// CHANGELOG v2.0.0:
// - BREAKING: Multi-session support (per chatId)
// - FIXED: Logout clears only current session
// - ADDED: getCurrentChatId() usage
// Account management (Logout, Delete Account)

import { getAuth } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js';
import { clearSession, getSession, getCurrentChatId } from '../js/session.js';
import { showAuthScreen, showLoadingScreen } from '../js/ui.js';
import { deleteUserAccount, deleteTelegramSession } from '../js/api.js';
import { t } from './i18n.js';

/**
 * Logout user (clear current chatId session only)
 */
export async function logout() {
  try {
    console.log('👋 Logging out...');
    
    const chatId = getCurrentChatId();
    
    // Get current session before clearing
    const session = getSession(chatId);
    
    // Clear session from localStorage (only for current chatId)
    clearSession(chatId);
    
    // Sign out from Firebase Auth
    const auth = getAuth();
    await auth.signOut();
    
    // Delete telegram_sessions from backend
    if (session && session.uid && chatId) {
      console.log('🗑️ Deleting telegram_sessions from backend...');
      
      try {
        await deleteTelegramSession(chatId, session.uid, session.authToken);
        console.log('✅ telegram_sessions deleted');
      } catch (err) {
        console.warn('⚠️ Failed to delete telegram_sessions:', err);
      }
    }
    
    console.log('✅ Logged out successfully');
    console.log(`🔍 Remaining sessions: ${localStorage.length} keys`);
    
    // Show auth screen
    showAuthScreen('login');
    
  } catch (err) {
    console.error('❌ Error during logout:', err);
    // Force clear current session
    const chatId = getCurrentChatId();
    clearSession(chatId);
    location.reload();
  }
}

/**
 * Delete user account (Auth + Firestore + Sessions)
 * 
 * ⚠️ Backend handles:
 * - Firestore user document deletion
 * - Telegram sessions cleanup
 * - Firebase Auth account deletion
 * 
 * Frontend clears ALL sessions for this user.
 */
export async function deleteAccount() {
  try {
    // Confirm with user
    const confirmed = confirm(
      `${t('auth.delete.confirm.title')}\n\n` +
      `${t('auth.delete.confirm.question')}\n\n` +
      `${t('auth.delete.confirm.warning')}\n` +
      `${t('auth.delete.confirm.point1')}\n` +
      `${t('auth.delete.confirm.point2')}\n` +
      `${t('auth.delete.confirm.point3')}\n\n` +
      `${t('auth.delete.confirm.continue')}`
    );
    
    if (!confirmed) {
      console.log(t('auth.delete.cancelled'));
      return false;
    }
    
    showLoadingScreen(t('auth.delete.loading'));
    
    const chatId = getCurrentChatId();
    
    // Get current session
    const session = getSession(chatId);
    if (!session) {
      alert(t('auth.error.noSession'));
      showAuthScreen('login');
      return false;
    }
    
    const { uid, authToken } = session;
    
    // Backend deletes EVERYTHING (Firestore + telegram_sessions + Firebase Auth)
    console.log('🗑️ Deleting account from backend...');
    const backendDeleted = await deleteUserAccount(uid, authToken);
    
    if (!backendDeleted) {
      alert(t('auth.error.deleteFailed'));
      showAuthScreen('login');
      return false;
    }
    
    console.log('✅ Account deleted successfully');
    
    // Clear ALL sessions for this user (loop through localStorage)
    console.log('🗑️ Clearing all sessions for this user...');
    
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('hayati_session_')) {
        const sessionStr = localStorage.getItem(key);
        if (sessionStr) {
          const sess = JSON.parse(sessionStr);
          if (sess.uid === uid) {
            keysToRemove.push(key);
          }
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`✅ Cleared ${keysToRemove.length} sessions`);
    
    // Also clear global session and current chat
    localStorage.removeItem('hayati_session');
    localStorage.removeItem('hayati_current_chat');
    
    // Success
    alert(t('auth.delete.success'));
    
    // Show auth screen
    showAuthScreen('login');
    
    return true;
    
  } catch (err) {
    console.error('❌ Error deleting account:', err);
    
    // Show error
    alert(t('auth.error.deleteFailed'));
    
    // Clear all sessions and show login
    localStorage.clear();
    showAuthScreen('login');
    
    return false;
  }
}

// Expose functions to window for button onclick
window.logout = logout;
window.deleteAccount = deleteAccount;