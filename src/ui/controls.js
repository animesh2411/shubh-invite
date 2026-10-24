/**
 * controls.js — Reusable form control builder.
 * Maps template field definitions to HTML form elements.
 */

import { savePrefs } from '../core/state.js';

// ── Escape helpers ────────────────────────────────────────────────
function escHTML(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escAttr(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

/**
 * Build an auto-generated Text tab panel from template.fields.
 * @param {object[]} fields
 * @param {object}   values      current field values
 * @param {function} onChange    called with (key, value) on every change
 * @returns {HTMLElement}
 */
export function buildTextPanel(fields, values, onChange) {
  const panel = document.createElement('div');
  panel.className = 'editor-tab-panel active';
  panel.id = 'tab-panel-text';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', 'tab-text');

  for (const field of fields) {
    if (field.optional) {
      panel.appendChild(buildOptionalField(field, values, onChange));
    } else {
      panel.appendChild(buildTextField(field, values, onChange));
    }
  }

  return panel;
}

/**
 * Build a mandatory text field.
 */
function buildTextField(field, values, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'field-group';

  const labelEl = document.createElement('label');
  labelEl.className = 'field-label';
  labelEl.htmlFor = `field-${field.key}`;
  labelEl.textContent = field.label;

  const isRTL = ['ar', 'ur'].includes(field.lang);
  const isNative = ['hi', 'pa', 'gu', 'ar', 'ur'].includes(field.lang);

  let inputEl;
  if (field.multiline) {
    inputEl = document.createElement('textarea');
    inputEl.className = 'field-textarea';
    inputEl.rows = 3;
  } else {
    inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.className = 'field-input';
  }

  inputEl.id = `field-${field.key}`;
  inputEl.value = values[field.key] ?? field.default ?? '';
  if (isRTL) inputEl.setAttribute('dir', 'rtl');
  if (isNative) inputEl.setAttribute('lang', field.lang);
  inputEl.setAttribute('autocomplete', 'off');
  inputEl.setAttribute('spellcheck', 'false');

  inputEl.addEventListener('input', () => {
    onChange(field.key, inputEl.value);
  });

  wrap.appendChild(labelEl);
  wrap.appendChild(inputEl);

  if (field.note) {
    const note = document.createElement('p');
    note.className = 'field-note';
    note.textContent = field.note;
    wrap.appendChild(note);
  }

  return wrap;
}

/**
 * Build an optional toggleable field.
 */
function buildOptionalField(field, values, onChange) {
  const enabled = values[`${field.key}__enabled`] !== false;

  const wrap = document.createElement('div');
  wrap.className = 'field-group optional-field';

  // Toggle row
  const toggleRow = document.createElement('div');
  toggleRow.className = 'optional-toggle';

  const labelSpan = document.createElement('span');
  labelSpan.className = 'optional-toggle__label';
  labelSpan.textContent = field.label;

  const switchWrap = document.createElement('label');
  switchWrap.className = 'toggle-switch';
  switchWrap.setAttribute('aria-label', `Enable ${field.label}`);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = enabled;
  checkbox.id = `toggle-${field.key}`;

  const track = document.createElement('span');
  track.className = 'toggle-track';

  switchWrap.appendChild(checkbox);
  switchWrap.appendChild(track);

  toggleRow.appendChild(labelSpan);
  toggleRow.appendChild(switchWrap);

  // Body (the actual input — hidden when toggled off)
  const body = document.createElement('div');
  body.className = 'optional-field__body';
  if (!enabled) body.hidden = true;

  // Inner text field
  const innerField = buildTextField({ ...field, optional: false }, values, onChange);
  body.appendChild(innerField);

  checkbox.addEventListener('change', () => {
    body.hidden = !checkbox.checked;
    onChange(`${field.key}__enabled`, checkbox.checked);
  });

  wrap.appendChild(toggleRow);
  wrap.appendChild(body);

  return wrap;
}

/**
 * Build the Colours tab panel.
 * Exposes 3 colour slots: background, accent, ink.
 *
 * @param {object}   palette     current palette
 * @param {function} onPalette   called with (key, hexColour)
 * @returns {HTMLElement}
 */
// ── Helper to normalize hex color to 7-char #rrggbb for input[type="color"] ──
function toHex7(c, fallback = '#888888') {
  if (!c) return fallback;
  const s = String(c).trim();
  if (/^#[0-9a-fA-F]{3}$/.test(s)) {
    return '#' + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  }
  if (/^#[0-9a-fA-F]{6}$/.test(s)) {
    return s;
  }
  return fallback;
}

export function buildColoursPanel(palette, onPalette) {
  const panel = document.createElement('div');
  panel.className = 'editor-tab-panel';
  panel.id = 'tab-panel-colours';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', 'tab-colours');

  const heading = document.createElement('p');
  heading.className = 'form-section-heading';
  heading.textContent = 'Palette';
  panel.appendChild(heading);

  // Editable colour slots
  const slots = [
    { key: 'bg',     label: 'Background' },
    { key: 'accent', label: 'Accent' },
    { key: 'ink',    label: 'Text' },
  ];

  const grid = document.createElement('div');
  grid.className = 'colour-grid';

  for (const slot of slots) {
    const lbl = document.createElement('label');
    lbl.className = 'colour-swatch-label';
    lbl.htmlFor = `colour-${slot.key}`;

    const swatchWrap = document.createElement('div');
    swatchWrap.className = 'colour-swatch';

    const hexVal = toHex7(palette[slot.key], slot.key === 'bg' ? '#FFF4DC' : slot.key === 'accent' ? '#C9962B' : '#2A1E1A');

    // Coloured background div
    const bg = document.createElement('div');
    bg.className = 'colour-swatch__bg';
    bg.style.background = hexVal;

    // Native colour input
    const input = document.createElement('input');
    input.type = 'color';
    input.id = `colour-${slot.key}`;
    input.value = hexVal;
    input.setAttribute('aria-label', `${slot.label} colour`);

    const handleColor = () => {
      bg.style.background = input.value;
      onPalette(slot.key, input.value);
    };

    input.addEventListener('input', handleColor);
    input.addEventListener('change', handleColor);

    swatchWrap.appendChild(bg);
    swatchWrap.appendChild(input);

    const span = document.createElement('span');
    span.textContent = slot.label;

    lbl.appendChild(swatchWrap);
    lbl.appendChild(span);
    grid.appendChild(lbl);
  }

  panel.appendChild(grid);

  // Reset palette note
  const note = document.createElement('p');
  note.className = 'field-note';
  note.style.marginTop = 'var(--sp-4)';
  note.textContent = 'Changes apply instantly to the preview. Reset to restore defaults.';
  panel.appendChild(note);

  return panel;
}

/**
 * Build the Fonts tab panel.
 * Renders font pair radio options.
 *
 * @param {object[]} fontPairs       [{id, label, display, body}]
 * @param {string}   activePairId
 * @param {function} onFontPair      called with pairId string
 * @returns {HTMLElement}
 */
export function buildFontsPanel(fontPairs, activePairId, onFontPair) {
  const panel = document.createElement('div');
  panel.className = 'editor-tab-panel';
  panel.id = 'tab-panel-fonts';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', 'tab-fonts');

  const heading = document.createElement('p');
  heading.className = 'form-section-heading';
  heading.textContent = 'Font pairing';
  panel.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'font-pair-grid';

  for (const pair of fontPairs) {
    const option = document.createElement('label');
    option.className = `font-pair-option${pair.id === activePairId ? ' selected' : ''}`;
    option.htmlFor = `font-pair-${pair.id}`;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'font-pair';
    radio.id = `font-pair-${pair.id}`;
    radio.value = pair.id;
    radio.checked = pair.id === activePairId;

    const preview = document.createElement('div');
    preview.className = 'font-pair-preview';

    const name = document.createElement('div');
    name.className = 'font-pair-name';
    name.style.fontFamily = `'${pair.display}', serif`;
    name.textContent = 'Aa Rr';

    const sub = document.createElement('div');
    sub.className = 'font-pair-sub';
    sub.textContent = pair.label;

    preview.appendChild(name);
    preview.appendChild(sub);
    option.appendChild(radio);
    option.appendChild(preview);

    const selectPair = () => {
      radio.checked = true;
      grid.querySelectorAll('.font-pair-option').forEach((o) => o.classList.remove('selected'));
      option.classList.add('selected');
      onFontPair(pair.id);
    };

    radio.addEventListener('change', selectPair);
    option.addEventListener('click', (e) => {
      if (e.target !== radio) selectPair();
    });

    grid.appendChild(option);
  }

  panel.appendChild(grid);
  return panel;
}

/**
 * Build the tab bar element.
 * @param {string[]} tabs   e.g. ['text', 'colours', 'fonts']
 * @param {function} onTab  called with tab id string
 * @returns {HTMLElement}
 */
export function buildTabBar(tabs, onTab) {
  const bar = document.createElement('div');
  bar.className = 'editor-tabs';
  bar.setAttribute('role', 'tablist');

  tabs.forEach((tabId, i) => {
    const btn = document.createElement('button');
    btn.className = `editor-tab${i === 0 ? ' active' : ''}`;
    btn.id = `tab-${tabId}`;
    btn.dataset.tab = tabId;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('aria-controls', `tab-panel-${tabId}`);
    btn.textContent = tabId.charAt(0).toUpperCase() + tabId.slice(1);

    btn.addEventListener('click', () => {
      bar.querySelectorAll('.editor-tab').forEach((b) => {
        b.setAttribute('aria-selected', 'false');
        b.classList.remove('active');
      });
      btn.setAttribute('aria-selected', 'true');
      btn.classList.add('active');
      onTab(tabId);
    });

    bar.appendChild(btn);
  });

  return bar;
}
