/* /webapp/js/firestoreREST.js v1.0.0 */
// CHANGELOG v1.0.0:
// - Initial release
// - Firestore REST API wrapper (bypass WebSocket issues)
// - Fallback when Firestore SDK fails

import { FIREBASE_CONFIG } from './config.js';

const PROJECT_ID = FIREBASE_CONFIG.projectId;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * Create document in Firestore via REST API
 * @param {string} collection - Collection name (e.g., 'users')
 * @param {string} docId - Document ID
 * @param {object} data - Document data
 * @param {string} idToken - Firebase ID Token
 * @returns {Promise<boolean>}
 */
export async function createDocument(collection, docId, data, idToken) {
  try {
    console.log(`📡 [REST] Creating document: ${collection}/${docId}`);
    
    // Convert data to Firestore REST format
    const firestoreData = convertToFirestoreFormat(data);
    
    const url = `${BASE_URL}/${collection}?documentId=${docId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        fields: firestoreData
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('❌ [REST] Firestore error:', error);
      throw new Error(`Firestore REST API error: ${error.error?.message || response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ [REST] Document created:', result.name);
    
    return true;
    
  } catch (err) {
    console.error('❌ [REST] Error creating document:', err);
    throw err;
  }
}

/**
 * Convert JS object to Firestore REST format
 * @param {object} data - JavaScript object
 * @returns {object} - Firestore-formatted object
 */
function convertToFirestoreFormat(data) {
  const result = {};
  
  for (const [key, value] of Object.entries(data)) {
    result[key] = convertValue(value);
  }
  
  return result;
}

/**
 * Convert single value to Firestore format
 */
function convertValue(value) {
  // Null
  if (value === null || value === undefined) {
    return { nullValue: null };
  }
  
  // Boolean
  if (typeof value === 'boolean') {
    return { booleanValue: value };
  }
  
  // Number
  if (typeof value === 'number') {
    return Number.isInteger(value) 
      ? { integerValue: value.toString() }
      : { doubleValue: value };
  }
  
  // String
  if (typeof value === 'string') {
    return { stringValue: value };
  }
  
  // Array
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(v => convertValue(v))
      }
    };
  }
  
  // serverTimestamp()
  if (value && value._methodName === 'serverTimestamp') {
    return { timestampValue: new Date().toISOString() };
  }
  
  // Date
  if (value instanceof Date) {
    return { timestampValue: value.toISOString() };
  }
  
  // Object (Map)
  if (typeof value === 'object') {
    return {
      mapValue: {
        fields: convertToFirestoreFormat(value)
      }
    };
  }
  
  // Fallback: string
  return { stringValue: String(value) };
}

/**
 * Read document from Firestore via REST API
 * @param {string} collection - Collection name
 * @param {string} docId - Document ID
 * @param {string} idToken - Firebase ID Token
 * @returns {Promise<object|null>}
 */
export async function getDocument(collection, docId, idToken) {
  try {
    const url = `${BASE_URL}/${collection}/${docId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Firestore REST API error: ${error.error?.message}`);
    }
    
    const result = await response.json();
    return convertFromFirestoreFormat(result.fields);
    
  } catch (err) {
    console.error('❌ [REST] Error reading document:', err);
    throw err;
  }
}

/**
 * Convert Firestore REST format back to JS object
 */
function convertFromFirestoreFormat(fields) {
  if (!fields) return null;
  
  const result = {};
  
  for (const [key, value] of Object.entries(fields)) {
    result[key] = extractValue(value);
  }
  
  return result;
}

/**
 * Extract value from Firestore format
 */
function extractValue(value) {
  if (value.nullValue !== undefined) return null;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.timestampValue !== undefined) return new Date(value.timestampValue);
  
  if (value.arrayValue) {
    return value.arrayValue.values?.map(v => extractValue(v)) || [];
  }
  
  if (value.mapValue) {
    return convertFromFirestoreFormat(value.mapValue.fields);
  }
  
  return null;
}