/* /webapp/js/utils/buttonHelpers.js v3.0.0 */
// CHANGELOG v3.0.0:
// - Initial release
// - Helper functions for 3D button states
// - Loading/Success/Error animations
// - i18n support

import { t } from './i18n.js';

/**
 * Set button to loading state
 * @param {HTMLElement} button - Button element
 * @param {string} loadingText - Optional loading text (default: from i18n)
 */
export function setButtonLoading(button, loadingText = null) {
  if (!button) return;
  
  // Store original state
  button.dataset.originalText = button.textContent;
  button.dataset.originalDisabled = button.disabled;
  
  // Add loading class
  button.classList.add('btn-3d-loading');
  button.disabled = true;
  
  // Update text if provided
  if (loadingText) {
    const textSpan = button.querySelector('span') || button;
    textSpan.textContent = loadingText;
  }
  
  console.log('🔄 Button loading:', button.textContent);
}

/**
 * Set button to success state
 * @param {HTMLElement} button - Button element
 * @param {number} duration - Duration in ms (default: 2000)
 */
export function setButtonSuccess(button, duration = 2000) {
  if (!button) return;
  
  // Remove loading
  button.classList.remove('btn-3d-loading');
  
  // Add success
  button.classList.add('btn-3d-state-success');
  
  console.log('✅ Button success');
  
  // Auto-reset after duration
  setTimeout(() => {
    resetButton(button);
  }, duration);
}

/**
 * Set button to error state
 * @param {HTMLElement} button - Button element
 * @param {number} duration - Duration in ms (default: 2000)
 */
export function setButtonError(button, duration = 2000) {
  if (!button) return;
  
  // Remove loading
  button.classList.remove('btn-3d-loading');
  
  // Add error
  button.classList.add('btn-3d-state-error');
  
  console.log('❌ Button error');
  
  // Auto-reset after duration
  setTimeout(() => {
    resetButton(button);
  }, duration);
}

/**
 * Reset button to original state
 * @param {HTMLElement} button - Button element
 */
export function resetButton(button) {
  if (!button) return;
  
  // Remove all state classes
  button.classList.remove('btn-3d-loading', 'btn-3d-state-success', 'btn-3d-state-error');
  
  // Restore original text
  if (button.dataset.originalText) {
    const textSpan = button.querySelector('span') || button;
    textSpan.textContent = button.dataset.originalText;
    delete button.dataset.originalText;
  }
  
  // Restore disabled state
  if (button.dataset.originalDisabled !== undefined) {
    button.disabled = button.dataset.originalDisabled === 'true';
    delete button.dataset.originalDisabled;
  } else {
    button.disabled = false;
  }
  
  console.log('🔄 Button reset');
}

/**
 * Handle async action with button states
 * @param {HTMLElement} button - Button element
 * @param {Function} asyncFn - Async function to execute
 * @param {Object} options - Options
 * @param {string} options.loadingText - Loading text
 * @param {number} options.successDuration - Success state duration (ms)
 * @param {number} options.errorDuration - Error state duration (ms)
 * @returns {Promise<any>} Result of asyncFn
 */
export async function handleButtonAction(button, asyncFn, options = {}) {
  const {
    loadingText = null,
    successDuration = 2000,
    errorDuration = 2000
  } = options;
  
  try {
    // Set loading
    setButtonLoading(button, loadingText);
    
    // Execute action
    const result = await asyncFn();
    
    // Show success
    setButtonSuccess(button, successDuration);
    
    return result;
    
  } catch (err) {
    // Show error
    setButtonError(button, errorDuration);
    
    throw err;
  }
}

/**
 * Create button with icon
 * @param {Object} options - Button options
 * @param {string} options.text - Button text
 * @param {string} options.iconSvg - SVG path for icon
 * @param {string} options.variant - Button variant (ferrari, success, glass)
 * @param {string} options.size - Button size (small, medium, large)
 * @param {Function} options.onClick - Click handler
 * @param {boolean} options.iconLeft - Icon on left side
 * @returns {HTMLElement} Button element
 */
export function createButton3D(options = {}) {
  const {
    text = 'Button',
    iconSvg = null,
    variant = null,
    size = null,
    onClick = null,
    iconLeft = false,
    fullWidth = false
  } = options;
  
  const button = document.createElement('button');
  
  // Base class
  button.className = 'btn-3d';
  
  // Variant
  if (variant) {
    button.classList.add(`btn-3d-${variant}`);
  }
  
  // Size
  if (size) {
    button.classList.add(`btn-3d-${size}`);
  }
  
  // Full width
  if (fullWidth) {
    button.classList.add('btn-3d-full');
  }
  
  // Icon (left)
  if (iconSvg && iconLeft) {
    const icon = document.createElement('svg');
    icon.className = 'btn-icon btn-icon-left';
    icon.setAttribute('width', '20');
    icon.setAttribute('height', '20');
    icon.setAttribute('viewBox', '0 0 20 20');
    icon.setAttribute('fill', 'currentColor');
    icon.innerHTML = `<path d="${iconSvg}"/>`;
    button.appendChild(icon);
  }
  
  // Text
  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  button.appendChild(textSpan);
  
  // Icon (right)
  if (iconSvg && !iconLeft) {
    const icon = document.createElement('svg');
    icon.className = 'btn-icon';
    icon.setAttribute('width', '20');
    icon.setAttribute('height', '20');
    icon.setAttribute('viewBox', '0 0 20 20');
    icon.setAttribute('fill', 'currentColor');
    icon.innerHTML = `<path d="${iconSvg}"/>`;
    button.appendChild(icon);
  }
  
  // Click handler
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

/**
 * Common icon SVG paths
 */
export const ICONS = {
  ARROW_RIGHT: 'M10 0l10 10-10 10-2-2 6-6H0V8h14l-6-6 2-2z',
  ARROW_LEFT: 'M10 0L0 10l10 10 2-2-6-6h14V8H6l6-6-2-2z',
  CHECK: 'M0 11l2-2 5 5L18 3l2 2L7 18z',
  CLOSE: 'M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm5 13.6L13.6 15 10 11.4 6.4 15 5 13.6 8.6 10 5 6.4 6.4 5 10 8.6 13.6 5 15 6.4 11.4 10 15 13.6z',
  LOCK: 'M12 0C8.7 0 6 2.7 6 6v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v2H8V6c0-2.2 1.8-4 4-4zm0 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z',
  EDIT: 'M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10z',
  DELETE: 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z'
};

console.log('✅ Button helpers v3.0.0 loaded');