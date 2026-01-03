/* /webapp/investments/investmentService.js v1.1.0 */
// CHANGELOG v1.1.0:
// - Renamed getInvestments → getInvestmentProjects
// - Fixed path: investment_projects (not investments)
// CHANGELOG v1.0.1:
// - Moved to standalone investments module
// - Fixed import paths

import { getSession } from '../js/session.js';
import { API_URL } from '../js/config.js';

/**
 * Get user balance from Firestore
 */
export async function getBalance(accountId) {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log('💰 Fetching balance for account:', accountId);
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `accounts/${accountId}/balance`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      console.warn('⚠️ No balance found');
      return null;
    }
    
    const result = await response.json();
    const balances = result.documents || [];
    
    // Get 'default' balance or first one
    const balance = balances.find(b => b.status === 'active') || balances[0] || null;
    
    console.log('✅ Balance loaded:', balance);
    
    return balance;
    
  } catch (err) {
    console.error('❌ Error fetching balance:', err);
    return null;
  }
}

/**
 * Get user investment projects from Firestore
 */
export async function getInvestmentProjects(accountId) {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log('📈 Fetching investment projects for account:', accountId);
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `accounts/${accountId}/investment_projects`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      console.warn('⚠️ No investment projects found');
      return [];
    }
    
    const result = await response.json();
    const projects = result.documents || [];
    
    console.log(`✅ Loaded ${projects.length} investment projects`);
    
    return projects;
    
  } catch (err) {
    console.error('❌ Error fetching investment projects:', err);
    return [];
  }
}

/**
 * Get user payments from Firestore
 */
export async function getPayments(accountId, limit = 10) {
  try {
    const session = getSession();
    if (!session) throw new Error('No session');
    
    console.log('🧾 Fetching payments for account:', accountId);
    
    const response = await fetch(`${API_URL}/api/firestore/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        path: `accounts/${accountId}/paymentsMade`,
        authToken: session.authToken
      })
    });
    
    if (!response.ok) {
      console.warn('⚠️ No payments found');
      return [];
    }
    
    const result = await response.json();
    const payments = result.documents || [];
    
    // Sort by idx descending
    payments.sort((a, b) => (b.idx || 0) - (a.idx || 0));
    
    console.log(`✅ Loaded ${payments.length} payments`);
    
    return payments.slice(0, limit);
    
  } catch (err) {
    console.error('❌ Error fetching payments:', err);
    return [];
  }
}

/**
 * Format currency (helper)
 */
export function formatCurrency(amount, currency = '₽') {
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount || 0);
  
  return `${formatted} ${currency}`;
}

/**
 * Format crypto amount (helper)
 */
export function formatCrypto(amount, symbol = 'BTC') {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  }).format(amount || 0);
  
  return `${formatted} ${symbol}`;
}