/* /webapp/app.js v3.0.3 */
// CHANGELOG v3.0.3:
// - FIXED: Explicit updatePage() call after i18n init with 50ms delay
// - ADDED: Wait for DOM to be fully ready before first translation update

// ==================== STEP 1: LOAD I18N FIRST ====================
import './js/i18n-manager.js';
import './js/components/languageSwitcher.js';

// ==================== STEP 2: FIREBASE IMPORTS ====================
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

// ==================== INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 [app.js] DOMContentLoaded - Starting initialization...');
  
  try {
    // ==================== STEP 1: I18N (CRITICAL FIRST) ====================
    console.log('🌍 [app.js] Step 1/7: Initializing i18n...');
    
    if (!window.i18n) {
      throw new Error('i18n manager not found');
    }
    
    await window.i18n.init();
    console.log('✅ [app.js] i18n ready:', window.i18n.getCurrentLanguage());
    console.log(`📚 [app.js] Loaded ${Object.keys(window.i18n.translations).length} translation keys`);
    
    // ✅ CRITICAL FIX: Wait for DOM to be fully ready before first update
    console.log('⏳ [app.js] Waiting for DOM to be fully ready...');
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // ✅ NOW update page translations
    window.i18n.updatePage();
    console.log('✅ [app.js] Initial translations applied to page');
    
    // ==================== STEP 2: TELEGRAM SETUP ====================
    console.log('📱 [app.js] Step 2/7: Setting up Telegram...');
    
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      // Cyberpunk theme
      tg.setHeaderColor('#0f172a');
      tg.setBackgroundColor('#0f172a');
      
      console.log('✅ [app.js] Telegram WebApp initialized');
      console.log('📱 Platform:', tg.platform);
      console.log('👤 User:', tg.initDataUnsafe?.user);
    } else {
      console.log('ℹ️ Running in browser (not Telegram)');
    }
    
    // ==================== STEP 3: FIREBASE INIT ====================
    console.log('🔥 [app.js] Step 3/7: Initializing Firebase...');
    
    const app = initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);
    const db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      cacheSizeBytes: CACHE_SIZE_UNLIMITED
    });
    
    console.log('✅ Firebase initialized');
    console.log('🔌 Firestore: Long Polling mode');
    
    // ==================== STEP 4: TOKEN MANAGEMENT ====================
    console.log('🔒 [app.js] Step 4/7: Setting up token management...');
    
    setupTokenInterceptor();
    setupPeriodicTokenCheck();
    setupBackgroundTokenRefresh();
    
    console.log('✅ Token auto-refresh enabled');
    
    // ==================== STEP 5: AUTH HANDLERS ====================
    console.log('🔐 [app.js] Step 5/7: Setting up auth handlers...');
    
    setupLoginHandler(auth);
    setupRegisterHandler(auth, db);
    setupResetHandler(auth);
    setupFormSwitching();
    
    console.log('✅ Auth handlers registered');
    
    // ==================== STEP 6: SHOW LOADING SCREEN ====================
    console.log('⏳ [app.js] Step 6/7: Showing loading screen...');
    
    showLoadingScreen(window.i18n.t('common.loading'));
    
    // ==================== STEP 7: SESSION CHECK ====================
    console.log('🔍 [app.js] Step 7/7: Checking session...');
    
    const chatId = getCurrentChatId();
    console.log('📱 ChatId:', chatId || 'none (browser)');
    
    const session = getSession(chatId);
    
    if (session) {
      console.log('✅ Session found:', {
        email: session.email,
        uid: session.uid,
        expires: new Date(session.tokenExpiry).toLocaleString()
      });
      
      // Validate token
      const isValid = await validateToken(session.authToken, session.uid);
      
      if (isValid) {
        console.log('✅ Token valid, loading cabinet...');
        
        // Claim HYC for app login (silent)
        await claimHYC('app_login');
        
        // ✅ NOW show cabinet (i18n is ready)
        showCabinet({ uid: session.uid, email: session.email });
      } else {
        console.log('⚠️ Token expired');
        showAuthScreen('login');
      }
    } else {
      console.log('ℹ️ No session');
      
      // Try Telegram auto-login
      if (tg && tg.initDataUnsafe?.user) {
        const tgChatId = tg.initDataUnsafe.user.id;
        
        console.log('🔍 Checking Telegram binding:', tgChatId);
        
        const binding = await checkTelegramBinding(tgChatId, tg.initData);
        
        if (binding && binding.bound) {
          console.log('🔗 Telegram bound to:', binding.uid);
          
          const silentLoginResult = await silentLogin(binding.uid, tgChatId, tg.initData);
          
          if (silentLoginResult && silentLoginResult.success) {
            console.log('✅ Silent login successful');
            
            const userCredential = await signInWithCustomToken(auth, silentLoginResult.customToken);
            const user = userCredential.user;
            const idToken = await user.getIdToken(true);
            
            saveSession({
              authToken: idToken,
              tokenExpiry: Date.now() + (60 * 60 * 1000),
              uid: user.uid,
              email: user.email
            }, tgChatId);
            
            // Claim HYC for app login (silent)
            await claimHYC('app_login');
            
            showCabinet({ uid: user.uid, email: user.email });
          } else {
            console.log('⚠️ Silent login failed');
            showAuthScreen('login');
          }
        } else {
          console.log('ℹ️ Telegram not bound');
          showAuthScreen('login');
        }
      } else {
        console.log('ℹ️ Not in Telegram');
        showAuthScreen('login');
      }
    }
    
    console.log('✅✅✅ App initialization complete!');
    
  } catch (err) {
    console.error('❌❌❌ CRITICAL ERROR during initialization:', err);
    
    // Show error to user
    alert(`Initialization failed: ${err.message}\n\nPlease refresh the page.`);
    
    // Show login as fallback
    showAuthScreen('login');
  }
});