/**
 * gallery.js — Gallery page component.
 * Renders: hero fan section + filter controls + card grid.
 */

import { templates, filterTemplates } from '../templates/index.js';
import { render as renderTemplate } from '../core/renderer.js';
import { navigate } from '../core/router.js';

// Tradition display config
const TRADITIONS = [
  { id: 'hindu',        label: 'Hindu',        emoji: '🪔' },
  { id: 'muslim',       label: 'Muslim',       emoji: '☪️' },
  { id: 'christian',    label: 'Christian',    emoji: '✝️' },
  { id: 'sikh',         label: 'Sikh',         emoji: '☬' },
  { id: 'jain',         label: 'Jain',         emoji: '🕊️' },
  { id: 'south-indian', label: 'South Indian', emoji: '🌸' },
  { id: 'bengali',      label: 'Bengali',      emoji: '🪷' },
  { id: 'secular',      label: 'Modern',       emoji: '✨' },
];

const OCCASIONS = [
  { id: 'wedding',      label: 'Wedding' },
  { id: 'engagement',   label: 'Engagement' },
  { id: 'anand-karaj',  label: 'Anand Karaj' },
  { id: 'nikah',        label: 'Nikah' },
  { id: 'housewarming', label: 'Housewarming' },
  { id: 'baby',         label: 'Baby Shower' },
  { id: 'ceremony',     label: 'Ceremony' },
  { id: 'festival',     label: 'Festival' },
];

/** Build the hero section with a fan of 5 tradition-representative cards. */
function buildHero() {
  // Pick one card per tradition (first available template per tradition)
  const traditionMap = new Map();
  for (const t of templates) {
    if (!traditionMap.has(t.tradition)) traditionMap.set(t.tradition, t);
  }

  // Always show all 5 tradition slots — placeholder cards for Phase 1 if no template yet
  const fanTemplates = TRADITIONS.map(({ id, label, emoji }) => ({
    tradition: id,
    label,
    emoji,
    template: traditionMap.get(id) ?? null,
  }));

  const fanCards = fanTemplates.map(({ tradition, label, emoji, template }, i) => {
    let previewContent;
    if (template) {
      const defaultValues = Object.fromEntries(
        template.fields.map((f) => [f.key, f.default])
      );
      const svgStr = renderTemplate(template, defaultValues);
      previewContent = svgStr;
    } else {
      // Coming-soon placeholder card
      previewContent = buildPlaceholderCard(tradition, emoji);
    }

    return `
      <div class="hero__card" data-tradition="${tradition}"
           role="button" tabindex="${i + 1}"
           aria-label="View ${label} invitation designs"
           data-action="go-tradition" data-val="${tradition}">
        ${previewContent}
        <div class="hero__card-label">${label}</div>
      </div>
    `;
  }).join('');

  return `
    <section class="hero" aria-labelledby="hero-heading">
      <div class="container">
        <p class="hero__eyebrow">Celebrate beautifully</p>
        <h1 class="hero__heading" id="hero-heading">
          Make every<br>celebration<br><em>unforgettable</em>
        </h1>
        <p class="hero__sub">
          Choose a template, personalise the text and colours,
          and download a stunning invitation in minutes.
        </p>
        <div class="hero__cta">
          <a href="#gallery" class="btn btn--primary btn--lg" id="cta-choose-design" data-action="scroll-to-gallery">
            Choose a design
          </a>
        </div>
      </div>

      <div class="hero__fan" aria-hidden="true" role="presentation">
        ${fanCards}
      </div>

      <!-- SVG vine divider motif -->
      <div class="divider" aria-hidden="true">
        ${vineDividerSVG()}
      </div>
    </section>
  `;
}

/** Build the gallery section with filters and card grid. */
function buildGallery(state) {
  const { tradition, occasion, query } = state;
  const filtered = filterTemplates({ tradition, occasion, query });

  const traditionPills = TRADITIONS.map(({ id, label }) => `
    <button class="pill" role="button" aria-pressed="${tradition === id}"
            data-tradition="${id}" data-action="filter-tradition" data-val="${id}">
      ${label}
    </button>
  `).join('');

  const occasionPills = OCCASIONS.map(({ id, label }) => `
    <button class="pill" role="button" aria-pressed="${occasion === id}"
            data-action="filter-occasion" data-val="${id}">
      ${label}
    </button>
  `).join('');

  const cards = filtered.length
    ? filtered.map((t) => buildTemplateCard(t)).join('')
    : `
      <div class="gallery-empty" role="status">
        <div class="gallery-empty__icon">🔍</div>
        <p class="gallery-empty__msg">No templates match your filters.</p>
        <p>Try clearing a filter or searching for something else.</p>
      </div>
    `;

  return `
    <section class="gallery-section" id="gallery" aria-labelledby="gallery-heading">
      <div class="container">
        <header class="gallery-section__header">
          <h2 class="gallery-section__heading" id="gallery-heading">
            Find your perfect design
          </h2>
          <p class="gallery-section__sub">
            ${templates.length} templates across ${TRADITIONS.length} traditions — more coming soon.
          </p>
        </header>

        <div class="gallery-controls">
          <div class="filter-group">
            <div class="filter-row" role="group" aria-label="Filter by tradition">
              <span class="filter-label" aria-hidden="true">Tradition</span>
              <div class="pill-group">
                <button class="pill" role="button" aria-pressed="${!tradition}"
                        data-action="filter-tradition" data-val="">
                  All
                </button>
                ${traditionPills}
              </div>
            </div>
            <div class="filter-row" role="group" aria-label="Filter by occasion">
              <span class="filter-label" aria-hidden="true">Occasion</span>
              <div class="pill-group">
                <button class="pill" role="button" aria-pressed="${!occasion}"
                        data-action="filter-occasion" data-val="">
                  All
                </button>
                ${occasionPills}
              </div>
            </div>
          </div>

          <div class="search-wrap">
            <svg class="search-wrap__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="search" class="search-input" id="gallery-search"
                   placeholder="Search templates…"
                   aria-label="Search invitation templates"
                   value="${escapeAttr(query)}"/>
          </div>
        </div>

        <p class="gallery-count" role="status" aria-live="polite" aria-atomic="true">
          ${filtered.length === templates.length
            ? `${templates.length} designs`
            : `${filtered.length} of ${templates.length} designs`}
        </p>

        <div class="gallery-grid" id="gallery-grid" aria-label="Invitation templates">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

/** Build a single template card HTML string. */
function buildTemplateCard(template) {
  const defaultValues = Object.fromEntries(
    template.fields.map((f) => [f.key, f.default])
  );
  const svgStr = renderTemplate(template, defaultValues);

  const traditionLabel = TRADITIONS.find((t) => t.id === template.tradition)?.label
    ?? template.tradition;
  const occasionLabel = OCCASIONS.find((o) => o.id === template.occasion)?.label
    ?? template.occasion;

  return `
    <article class="template-card"
             data-id="${template.id}"
             data-tradition="${template.tradition}"
             tabindex="0"
             role="article"
             aria-label="${escapeAttr(template.name)}, ${traditionLabel} ${occasionLabel} invitation">
      <div class="template-card__preview">
        ${svgStr}
        <div class="template-card__overlay">
          <button class="btn btn--gold btn--sm" data-action="open-editor" data-val="${template.id}"
                  aria-label="Customise ${escapeAttr(template.name)}">
            Customise
          </button>
        </div>
      </div>
      <div class="template-card__meta">
        <span class="tradition-badge" data-tradition="${template.tradition}">
          ${traditionLabel}
        </span>
        <span class="template-card__name">${escapeHTML(template.name)}</span>
        <span class="template-card__occasion">${occasionLabel}</span>
      </div>
    </article>
  `;
}

/** Simple SVG vine divider motif. */
function vineDividerSVG() {
  return `
    <svg width="80" height="20" viewBox="0 0 80 20" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 10 Q10 2 20 10 Q30 18 40 10 Q50 2 60 10 Q70 18 80 10"
            stroke="currentColor" stroke-width="1.5" fill="none"/>
      <circle cx="40" cy="10" r="3" fill="currentColor"/>
      <circle cx="20" cy="10" r="2" fill="currentColor"/>
      <circle cx="60" cy="10" r="2" fill="currentColor"/>
    </svg>
  `;
}

/** Placeholder SVG card for traditions without a template yet. */
function buildPlaceholderCard(tradition, emoji) {
  const colors = {
    christian: { bg: '#9DB4C0', fg: '#FBF8F1' },
    sikh:      { bg: '#F28C28', fg: '#FFF7E6' },
    jain:      { bg: '#E0A030', fg: '#FFFDF5' },
  };
  const c = colors[tradition] ?? { bg: '#8FA58B', fg: '#F8F8F0' };
  return `
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" width="200" height="300">
      <rect width="200" height="300" fill="${c.bg}"/>
      <text x="100" y="140" font-size="48" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
      <text x="100" y="196" font-size="16" text-anchor="middle" fill="${c.fg}" opacity="0.7"
            font-family="sans-serif">Coming soon</text>
    </svg>
  `;
}

// ── Escape helpers ────────────────────────────────────────────────
function escapeHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

// ── Main exported factory ─────────────────────────────────────────
/**
 * Create the gallery page DOM element with event delegation.
 * @returns {{ el: HTMLElement, cleanup: function }}
 */
export function createGalleryPage() {
  const state = { tradition: '', occasion: '', query: '' };

  const el = document.createElement('div');
  el.className = 'page';
  el.id = 'page-gallery';

  function rerender() {
    el.innerHTML = buildHero() + buildGallery(state);
    attachListeners();
  }

  function attachListeners() {
    // Search input
    const searchInput = el.querySelector('#gallery-search');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.query = e.target.value.trim();
          rerenderGalleryOnly();
        }, 200);
      });
    }

    // Event delegation for pills and cards
    el.addEventListener('click', handleClick);
    el.addEventListener('keydown', handleKeydown);
  }

  function rerenderGalleryOnly() {
    const gallerySection = el.querySelector('.gallery-section');
    if (gallerySection) {
      const newSection = document.createElement('div');
      newSection.innerHTML = buildGallery(state);
      gallerySection.replaceWith(newSection.firstElementChild);
      // Re-attach (only section portion)
      const searchInput = el.querySelector('#gallery-search');
      if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            state.query = e.target.value.trim();
            rerenderGalleryOnly();
          }, 200);
        });
      }
    }
  }

  function handleClick(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const val    = target.dataset.val ?? '';

    if (action === 'scroll-to-gallery') {
      e.preventDefault();
      const galleryEl = document.getElementById('gallery') || el.querySelector('#gallery');
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'filter-tradition') {
      state.tradition = state.tradition === val ? '' : val;
      rerenderGalleryOnly();
    } else if (action === 'filter-occasion') {
      state.occasion = state.occasion === val ? '' : val;
      rerenderGalleryOnly();
    } else if (action === 'open-editor') {
      navigate(`/editor/${val}`);
    } else if (action === 'go-tradition') {
      // Set tradition filter and scroll to gallery
      state.tradition = val;
      rerenderGalleryOnly();
      const galleryEl = document.getElementById('gallery') || el.querySelector('#gallery');
      if (galleryEl) {
        galleryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.template-card');
      if (card) {
        e.preventDefault();
        const id = card.dataset.id;
        if (id) navigate(`/editor/${id}`);
      }
    }
  }

  rerender();

  return {
    el,
    cleanup() {
      el.removeEventListener('click', handleClick);
      el.removeEventListener('keydown', handleKeydown);
    },
  };
}
