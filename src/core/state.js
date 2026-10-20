/**
 * state.js — localStorage wrapper.
 * Stores per-template user draft data keyed by template id.
 */

const PREFIX = 'shubh-invite:';

function key(templateId) {
  return `${PREFIX}draft:${templateId}`;
}

/**
 * Load a saved draft for a template.
 * @param {string} templateId
 * @returns {object|null}
 */
export function loadDraft(templateId) {
  try {
    const raw = localStorage.getItem(key(templateId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Save a draft for a template.
 * @param {string} templateId
 * @param {object} values
 */
export function saveDraft(templateId, values) {
  try {
    localStorage.setItem(key(templateId), JSON.stringify(values));
  } catch {
    // Storage quota exceeded — fail silently
  }
}

/**
 * Remove a draft for a template.
 * @param {string} templateId
 */
export function clearDraft(templateId) {
  try {
    localStorage.removeItem(key(templateId));
  } catch {
    // ignore
  }
}

/**
 * Load general app preferences (theme, last-used template, etc.)
 * @returns {object}
 */
export function loadPrefs() {
  try {
    const raw = localStorage.getItem(`${PREFIX}prefs`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Save general app preferences (merged with existing).
 * @param {object} patch
 */
export function savePrefs(patch) {
  try {
    const current = loadPrefs();
    localStorage.setItem(`${PREFIX}prefs`, JSON.stringify({ ...current, ...patch }));
  } catch {
    // ignore
  }
}
