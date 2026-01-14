/* /webapp/js/userService.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Fetch user data from Firestore
// User data service

import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js';

/**
 * Get user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User data including hayatiId
 */
export async function getUserData(uid) {
  try {
    console.log(`📋 [UserService] Fetching user data for: ${uid}`);
    
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      console.warn(`⚠️ [UserService] User document not found: ${uid}`);
      return null;
    }
    
    const userData = userSnap.data();
    console.log(`✅ [UserService] User data loaded:`, {
      uid: userData.uid,
      email: userData.email,
      hayatiId: userData.hayatiId,
      hayatiIdTier: userData.hayatiIdTier
    });
    
    return userData;
    
  } catch (err) {
    console.error(`❌ [UserService] Error fetching user data:`, err);
    throw err;
  }
}

/**
 * Get user's Hayati ID
 * @param {string} uid - User ID
 * @returns {Promise<string|null>} Hayati ID or null
 */
export async function getUserHayatiId(uid) {
  try {
    const userData = await getUserData(uid);
    return userData?.hayatiId || null;
  } catch (err) {
    console.error(`❌ [UserService] Error fetching Hayati ID:`, err);
    return null;
  }
}
