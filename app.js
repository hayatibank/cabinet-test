/* /webapp/app.js v3.0.1 - i18n UPDATE FIX */
// CHANGELOG v3.0.1:
// - FIXED: Added window.i18n.updatePage() after init
// - Now all data-i18n attributes work on page load

// ==================== STEP 1: LOAD I18N FIRST ====================
// Import i18n manager (global singleton)
import './js/i18n-manager.js';

// Import language switcher (auto-creates UI)
import './js/components/languageSwitcher.js';

// ==================== STEP 2: INITIALIZE I18N ====================
async function initializeI18n() {
  console.log('🌍 [App] Initializing i18n system...');
  
  try {
    await window.i18n.init();
    console.log('✅ [App] i18n ready:', window.i18n.getCurrentLanguage());
    
    // 🆕 CRITICAL FIX: Update all [data-i18n] on page load
    window.i18n.updatePage();
    console.log('✅ [App] Page translations updated');
    
    return true;
  } catch (err) {
    console.error('❌ [App] i18n initialization failed:', err);
    return false;
  }
}

// ==================== STEP 3: FIREBASE & REST ====================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js';
import { getAuth, signInWithCustomToken } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js';

import { FIREBASE_CONFIG } from './js/config.js';
import { checkTelegramBinding, silentLogin, validateToken } from './js/api.js';
import { setupLoginHandler, setupRegisterHandler, setupResetHandler, setupFormSwitching } from './auth/authForms.js';
import { getSession, saveSession, getCurrentChatId, listAllSessions } from './js/session.js';
import { showLoadingScreen, showAuthScreen, showCabinet } from './js/ui.js';
import { setupTokenInterceptor, setupPeriodicTokenCheck, setupBackgroundTokenRefresh, ensureFreshToken } from './js/tokenManager.js';
import './auth/accountActions.js';
import './cabinet/accountsUI.js';
import { claimHYC } from './HayatiCoin/hycService.js';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

// Initialize Firestore with Long Polling (no WebSocket)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

console.log('✅ Firebase initialized');
console.log('🔌 Firestore: Long Polling mode (WebSocket disabled)');

// Setup token management system
setupTokenInterceptor();
setupPeriodicTokenCheck();
setupBackgroundTokenRefresh();
console.log('🔒 Token auto-refresh system enabled');

// Get Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  console.log('✅ Telegram WebApp initialized');
  console.log('📱 Telegram User:', tg.initDataUnsafe?.user);
}

// ==================== MAIN INITIALIZATION ====================

async function initMiniApp() {
  try {
    // STEP 1: Initialize i18n FIRST
    const i18nReady = await initializeI18n();
    if (!i18nReady) {
      throw new Error('i18n initialization failed');
    }
    
    // STEP 2: Now show loading screen with translated text
    showLoadingScreen(window.i18n.t('common.loading'));
    
    const chatId = getCurrentChatId();
    const initData = tg?.initData;
    
    console.log('📱 Mini App started');
    if (chatId) {
      console.log('👤 Chat ID:', chatId);
      
      // Debug: list all sessions
      const allSessions = listAllSessions();
      if (allSessions.length > 0) {
        console.log('📋 Available sessions:', allSessions.map(s => `${s.chatId} (${s.email})`).join(', '));
      }
    }
    
    // STEP 3: Check localStorage for existing session (current chatId)
    let session = getSession(chatId);
    
    if (session) {
      console.log('🔍 Found session, validating...');
      
      // Ensure token is fresh before validation
      const freshToken = await ensureFreshToken(chatId);
      
      if (freshToken) {
        session.authToken = freshToken;
      }
      
      const isValid = await validateToken(session.authToken, session.uid);
      
      if (isValid) {
        console.log('✅ Token valid, showing cabinet');
        return showCabinet({ uid: session.uid, email: session.email });
      } else {
        console.log('⚠️ Token invalid, will try silent login');
      }
    }
    
    // STEP 4: Check Telegram binding (if opened from Telegram)
    if (chatId && initData) {
      console.log('🔍 Checking Telegram binding...');
      
      const binding = await checkTelegramBinding(chatId, initData);
      
      if (binding && binding.bound && binding.uid) {
        console.log('✅ Found Telegram binding, attempting silent login...');
        
        const loginResult = await silentLogin(binding.uid, chatId, initData);
        
        if (loginResult && loginResult.success) {
          console.log('✅ Silent login successful');
          
          // Exchange Custom Token for ID Token
          try {
            console.log('🔄 Exchanging custom token for ID token...');
            
            const userCredential = await signInWithCustomToken(auth, loginResult.authToken);
            const idToken = await userCredential.user.getIdToken(true);
            
            console.log('✅ ID Token obtained');
            
            // Save session with ID Token
            saveSession({
              authToken: idToken,
              tokenExpiry: Date.now() + (60 * 60 * 1000),
              uid: loginResult.uid,
              email: loginResult.email
            }, chatId);
            
            return showCabinet({
              uid: loginResult.uid,
              email: loginResult.email
            });
          } catch (tokenError) {
            console.error('❌ Error exchanging custom token:', tokenError);
            
            // Fallback: try to use as-is
            saveSession({
              authToken: loginResult.authToken,
              tokenExpiry: loginResult.tokenExpiry,
              uid: loginResult.uid,
              email: loginResult.email
            }, chatId);
            
            return showCabinet({
              uid: loginResult.uid,
              email: loginResult.email
            });
          }
        } else {
          console.log('⚠️ Silent login failed');
        }
      } else {
        console.log('ℹ️ No Telegram binding found');
      }
    }
    
    // STEP 5: No session and no binding - show auth screen
    console.log('🔓 No session found, showing auth screen');
    showAuthScreen('login');
    
  } catch (err) {
    console.error('❌ Error initializing Mini App:', err);
    showAuthScreen('login');
  }

  await claimHYC('app_login');
}

// ==================== SETUP EVENT HANDLERS ====================

window.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Mini App DOM loaded');
  
  // Setup auth form handlers
  setupLoginHandler(auth);
  setupRegisterHandler(auth, db);
  setupResetHandler(auth);
  setupFormSwitching();
  
  // Initialize app
  initMiniApp();
});