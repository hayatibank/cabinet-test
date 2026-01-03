/* /webapp/js/session.js v2.0.0 */
// CHANGELOG v2.0.0:
// - BREAKING: Multi-session support (per chatId)
// - ADDED: getCurrentChatId() helper
// - ADDED: listAllSessions() for debugging
// - ADDED: switchSession() for account switching
// Session management with multi-account support

/**
 * Get current Telegram chatId
 * @returns {string|null}
 */
export function getCurrentChatId() {
  const tg = window.Telegram?.WebApp;
  const chatId = tg?.initDataUnsafe?.user?.id;
  return chatId ? String(chatId) : null;
}

/**
 * Get session key for specific chatId
 * @param {string} chatId - Telegram chat ID
 * @returns {string}
 */
function getSessionKey(chatId) {
  return `hayati_session_${chatId}`;
}

/**
 * Save session for specific chatId
 * @param {object} sessionData - Session data
 * @param {string} chatId - Optional chatId (defaults to current)
 * @returns {boolean}
 */
export function saveSession(sessionData, chatId = null) {
  try {
    const targetChatId = chatId || getCurrentChatId();
    
    if (!targetChatId) {
      console.warn('⚠️ No chatId for session save');
      // Fallback: save as global session
      localStorage.setItem('hayati_session', JSON.stringify(sessionData));
      console.log('💾 Session saved (global fallback)');
      return true;
    }
    
    const sessionKey = getSessionKey(targetChatId);
    localStorage.setItem(sessionKey, JSON.stringify(sessionData));
    
    console.log(`💾 Session saved for chatId: ${targetChatId}`);
    console.log(`📅 Expires: ${new Date(sessionData.tokenExpiry).toLocaleString()}`);
    
    // Also save current chatId
    localStorage.setItem('hayati_current_chat', targetChatId);
    
    return true;
  } catch (err) {
    console.error('❌ Error saving session:', err);
    return false;
  }
}

/**
 * Get session for specific chatId
 * @param {string} chatId - Optional chatId (defaults to current)
 * @returns {object|null}
 */
export function getSession(chatId = null) {
  try {
    const targetChatId = chatId || getCurrentChatId() || localStorage.getItem('hayati_current_chat');
    
    if (!targetChatId) {
      console.log('ℹ️ No chatId, checking global session');
      // Fallback: check global session
      const globalSession = localStorage.getItem('hayati_session');
      if (globalSession) {
        const session = JSON.parse(globalSession);
        if (Date.now() < session.tokenExpiry) {
          console.log('✅ Valid global session found');
          return session;
        }
      }
      return null;
    }
    
    const sessionKey = getSessionKey(targetChatId);
    const sessionStr = localStorage.getItem(sessionKey);
    
    if (!sessionStr) {
      console.log(`ℹ️ No session for chatId: ${targetChatId}`);
      return null;
    }
    
    const session = JSON.parse(sessionStr);
    
    // Check if expired
    if (Date.now() >= session.tokenExpiry) {
      console.log(`⏰ Session expired for chatId: ${targetChatId}`);
      clearSession(targetChatId);
      return null;
    }
    
    console.log(`✅ Valid session found for chatId: ${targetChatId}`);
    console.log(`👤 User: ${session.email}`);
    
    return session;
  } catch (err) {
    console.error('❌ Error reading session:', err);
    return null;
  }
}

/**
 * Clear session for specific chatId
 * @param {string} chatId - Optional chatId (defaults to current)
 * @returns {boolean}
 */
export function clearSession(chatId = null) {
  try {
    const targetChatId = chatId || getCurrentChatId() || localStorage.getItem('hayati_current_chat');
    
    if (!targetChatId) {
      console.log('ℹ️ No chatId, clearing global session');
      localStorage.removeItem('hayati_session');
      localStorage.removeItem('hayati_current_chat');
      console.log('🗑️ Global session cleared');
      return true;
    }
    
    const sessionKey = getSessionKey(targetChatId);
    localStorage.removeItem(sessionKey);
    
    console.log(`🗑️ Session cleared for chatId: ${targetChatId}`);
    
    // Clear current chat if it matches
    const currentChat = localStorage.getItem('hayati_current_chat');
    if (currentChat === targetChatId) {
      localStorage.removeItem('hayati_current_chat');
    }
    
    return true;
  } catch (err) {
    console.error('❌ Error clearing session:', err);
    return false;
  }
}

/**
 * List all saved sessions (for debugging)
 * @returns {Array<{chatId: string, email: string, expired: boolean}>}
 */
export function listAllSessions() {
  const sessions = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('hayati_session_')) {
        const chatId = key.replace('hayati_session_', '');
        const sessionStr = localStorage.getItem(key);
        
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          const expired = Date.now() >= session.tokenExpiry;
          
          sessions.push({
            chatId,
            email: session.email,
            uid: session.uid,
            expired,
            expiresAt: new Date(session.tokenExpiry)
          });
        }
      }
    }
    
    console.log(`📋 Found ${sessions.length} sessions:`, sessions);
    return sessions;
  } catch (err) {
    console.error('❌ Error listing sessions:', err);
    return [];
  }
}

/**
 * Switch to different session (for account switching UI)
 * @param {string} chatId - Target chatId
 * @returns {object|null}
 */
export function switchSession(chatId) {
  try {
    const session = getSession(chatId);
    
    if (!session) {
      console.warn(`⚠️ No valid session for chatId: ${chatId}`);
      return null;
    }
    
    // Set as current
    localStorage.setItem('hayati_current_chat', chatId);
    console.log(`🔄 Switched to session: ${chatId} (${session.email})`);
    
    return session;
  } catch (err) {
    console.error('❌ Error switching session:', err);
    return null;
  }
}

/**
 * Clean up expired sessions
 */
export function cleanupExpiredSessions() {
  try {
    let cleaned = 0;
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('hayati_session_')) {
        const sessionStr = localStorage.getItem(key);
        
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          
          if (Date.now() >= session.tokenExpiry) {
            localStorage.removeItem(key);
            cleaned++;
            console.log(`🗑️ Cleaned expired session: ${key}`);
          }
        }
      }
    }
    
    if (cleaned > 0) {
      console.log(`✅ Cleaned ${cleaned} expired sessions`);
    }
    
    return cleaned;
  } catch (err) {
    console.error('❌ Error cleaning sessions:', err);
    return 0;
  }
}

// Auto-cleanup on load
cleanupExpiredSessions();

console.log('✅ Multi-session manager initialized');