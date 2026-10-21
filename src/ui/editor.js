/**
 * editor.js — Live invitation editor page.
 *
 * Layout:
 *   Desktop: two-column (form left, sticky preview right)
 *   Mobile:  preview top, scrollable form below
 *
 * Features:
 *   • Auto-generated form from template.fields
 *   • Live SVG preview (debounced 150ms)
 *   • Colour pickers for bg / accent / ink
 *   • Font pair selector
 *   • Optional field toggles (sacred lines, RSVP)
 *   • PNG download via exporter.js
 *   • Draft save/load/reset via state.js
 */

import '../styles/editor.css';

import { getTemplate }       from '../templates/index.js';
import { render as renderSVG } from '../core/renderer.js';
import { loadDraft, saveDraft, clearDraft } from '../core/state.js';
import { downloadPNG, copyToClipboard }     from '../core/exporter.js';
import {
  buildTextPanel,
  buildColoursPanel,
  buildFontsPanel,
  buildTabBar,
} from './controls.js';

// ── Toast helper ──────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 2400) {
  let toast = document.getElementById('si-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'si-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), duration);
}

// ── Tradition label map ───────────────────────────────────────────
const TRADITION_LABELS = {
  hindu: 'Hindu', muslim: 'Muslim', christian: 'Christian',
  sikh: 'Sikh', jain: 'Jain',
};

/**
 * Create the editor page for a given template ID.
 * @param {{ id: string }} params
 * @returns {{ el: HTMLElement, cleanup: function }}
 */
export function createEditorPage(params) {
  const template = getTemplate(params.id);

  // ── Not found ─────────────────────────────────────────────────
  if (!template) {
    const el = document.createElement('div');
    el.className = 'page';
    el.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:1rem;text-align:center;padding:2rem;';
    el.innerHTML = `
      <p style="font-size:3rem">🔍</p>
      <h1 style="font-family:var(--ff-heading);font-style:italic;font-size:var(--fs-h2)">
        Template not found
      </h1>
      <p style="color:var(--c-ink-muted)">ID: <code>${params.id ?? ''}</code></p>
      <a href="#/gallery" class="btn btn--ghost">← Back to gallery</a>
    `;
    return { el, cleanup: () => {} };
  }

  // ── State ─────────────────────────────────────────────────────
  const savedDraft  = loadDraft(template.id) ?? {};
  const defaultVals = Object.fromEntries(template.fields.map((f) => [f.key, f.default ?? '']));
  // Optional fields default to enabled
  for (const f of template.fields) {
    if (f.optional) defaultVals[`${f.key}__enabled`] = true;
  }

  const state = {
    values:      { ...defaultVals, ...savedDraft },
    palette:     { ...template.palette, ...(savedDraft.__palette ?? {}) },
    fontPairId:  savedDraft.__fontPairId ?? (template.fontPairs?.[0]?.id ?? 'classic'),
  };

  let saveTimer, renderTimer;

  // ── Build SVG ─────────────────────────────────────────────────
  function buildSVG() {
    // Inject enabled flags into values before rendering
    const renderVals = { ...state.values };
    for (const f of template.fields) {
      if (f.optional && renderVals[`${f.key}__enabled`] === false) {
        renderVals[f.key] = '';
      }
    }
    renderVals.fontPair = state.fontPairId;
    return renderSVG(template, renderVals, state.palette, state.fontPairId);
  }

  // ── Page root ─────────────────────────────────────────────────
  const page = document.createElement('div');
  page.className = 'editor-page';
  page.id = `editor-${template.id}`;

  // ── Top bar ───────────────────────────────────────────────────
  const topbar = document.createElement('div');
  topbar.className = 'editor-topbar';
  topbar.innerHTML = `
    <a href="#/gallery" class="editor-topbar__back" aria-label="Back to gallery">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      Back
    </a>
    <span class="editor-topbar__title">${escHTML(template.name)}</span>
    <span class="editor-topbar__tradition">${TRADITION_LABELS[template.tradition] ?? template.tradition}</span>
  `;
  page.appendChild(topbar);

  // ── Two-col layout ────────────────────────────────────────────
  const layout = document.createElement('div');
  layout.className = 'editor-layout';

  // ── Preview panel ─────────────────────────────────────────────
  const previewPanel = document.createElement('div');
  previewPanel.className = 'editor-preview-panel';

  const previewWrap = document.createElement('div');
  previewWrap.className = 'editor-preview';

  const previewFrame = document.createElement('div');
  previewFrame.className = 'editor-preview__frame';
  previewFrame.id = 'preview-frame';

  const sizeNote = document.createElement('p');
  sizeNote.className = 'editor-preview__size-note';
  sizeNote.textContent = `${template.size.w} × ${template.size.h} px · Export at 2× (${template.size.w * 2} × ${template.size.h * 2})`;

  // Download bar
  const downloadBar = document.createElement('div');
  downloadBar.className = 'editor-download-bar';
  downloadBar.innerHTML = `
    <button class="btn btn--primary" id="btn-download-png" aria-label="Download as PNG">
      ↓ Download PNG
    </button>
    <button class="btn btn--ghost btn--sm" id="btn-copy-image" aria-label="Copy image to clipboard">
      Copy image
    </button>
    <button class="btn btn--ghost btn--sm" id="btn-reset-draft" aria-label="Reset to defaults">
      Reset
    </button>
  `;

  previewWrap.appendChild(previewFrame);
  previewWrap.appendChild(sizeNote);
  previewWrap.appendChild(downloadBar);
  previewPanel.appendChild(previewWrap);

  // ── Form panel ────────────────────────────────────────────────
  const formPanel = document.createElement('div');
  formPanel.className = 'editor-form-panel';

  // Tab bar
  const tabs = ['text', 'colours', 'fonts'];
  const tabBar = buildTabBar(tabs, switchTab);
  formPanel.appendChild(tabBar);

  // Form body container
  const formBody = document.createElement('div');
  formBody.className = 'editor-form-body';
  formPanel.appendChild(formBody);

  // Build panels
  let textPanel, coloursPanel, fontsPanel;

  function rebuildForm() {
    formBody.innerHTML = '';
    textPanel = buildTextPanel(template.fields, state.values, onFieldChange);
    coloursPanel = buildColoursPanel(state.palette, onPaletteChange);
    fontsPanel = buildFontsPanel(
      template.fontPairs ?? [],
      state.fontPairId,
      onFontPairChange
    );

    formBody.appendChild(textPanel);
    formBody.appendChild(coloursPanel);
    formBody.appendChild(fontsPanel);

    const activeTabBtn = tabBar.querySelector('.editor-tab.active');
    const activeTab = activeTabBtn?.dataset.tab ?? 'text';
    switchTab(activeTab);
  }

  rebuildForm();

  // Assemble
  layout.appendChild(formPanel);
  layout.appendChild(previewPanel);
  page.appendChild(layout);

  // ── Initial render ────────────────────────────────────────────
  updatePreview();

  // ── Event handlers ─────────────────────────────────────────────

  function onFieldChange(key, value) {
    state.values[key] = value;
    scheduleRender();
    scheduleSave();
  }

  function onPaletteChange(key, hex) {
    state.palette[key] = hex;
    updatePreview();
    scheduleSave();
  }

  function onFontPairChange(pairId) {
    state.fontPairId = pairId;
    updatePreview();
    scheduleSave();
  }

  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(updatePreview, 150);
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveDraft(template.id, {
        ...state.values,
        __palette:    state.palette,
        __fontPairId: state.fontPairId,
      });
    }, 800);
  }

  function updatePreview() {
    const svgStr = buildSVG();
    previewFrame.innerHTML = svgStr;
  }

  function switchTab(tabId) {
    [textPanel, coloursPanel, fontsPanel].forEach((p) => p.classList.remove('active'));
    document.getElementById(`tab-panel-${tabId}`)?.classList.add('active');
  }

  // ── Button handlers ───────────────────────────────────────────
  downloadBar.querySelector('#btn-download-png')?.addEventListener('click', async () => {
    const btn = downloadBar.querySelector('#btn-download-png');
    btn.disabled = true;
    btn.innerHTML = `<span class="export-spinner"></span> Exporting…`;
    try {
      await downloadPNG(template, buildSVG());
      showToast('✓ PNG downloaded');
    } catch (err) {
      console.error('[editor] PNG export failed:', err);
      showToast('Export failed — see console');
    } finally {
      btn.disabled = false;
      btn.textContent = '↓ Download PNG';
    }
  });

  downloadBar.querySelector('#btn-copy-image')?.addEventListener('click', async () => {
    const btn = downloadBar.querySelector('#btn-copy-image');
    btn.disabled = true;
    btn.textContent = 'Copying…';
    const ok = await copyToClipboard(template, buildSVG());
    showToast(ok ? '✓ Copied to clipboard' : '✗ Clipboard not supported');
    btn.disabled = false;
    btn.textContent = 'Copy image';
  });

  downloadBar.querySelector('#btn-reset-draft')?.addEventListener('click', () => {
    if (!confirm('Reset all changes to defaults?')) return;
    clearTimeout(saveTimer);
    clearTimeout(renderTimer);
    clearDraft(template.id);

    // Re-init state to clean defaults
    for (const k in state.values) delete state.values[k];
    Object.assign(state.values, defaultVals);

    for (const k in state.palette) delete state.palette[k];
    Object.assign(state.palette, template.palette);

    state.fontPairId = template.fontPairs?.[0]?.id ?? 'classic';

    // Rebuild form DOM inputs to reflect default values
    rebuildForm();

    // Re-render SVG preview immediately
    updatePreview();
    showToast('✓ Reset to defaults');
  });

  // ── Cleanup ───────────────────────────────────────────────────
  function cleanup() {
    clearTimeout(renderTimer);
    clearTimeout(saveTimer);
    // Remove toast if still showing
    document.getElementById('si-toast')?.remove();
  }

  return { el: page, cleanup };
}

// ── Escape helper ─────────────────────────────────────────────────
function escHTML(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
