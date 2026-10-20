/**
 * main.js — App entry point.
 * Initialises navigation, registers routes, mounts the router.
 */

// Self-hosted variable fonts via Fontsource (Vite bundles the WOFF2 files)
import '@fontsource-variable/fraunces/wght.css';
import '@fontsource-variable/fraunces/wght-italic.css';
import '@fontsource-variable/jost/wght.css';
import '@fontsource-variable/jost/wght-italic.css';

import './src/styles/base.css';
import './src/styles/hero.css';
import './src/styles/gallery.css';

import { on, mount, init, navigate } from './src/core/router.js';
import { createGalleryPage } from './src/ui/gallery.js';

// ── Navigation bar ────────────────────────────────────────────────
function buildNav() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-label', 'Site navigation');
  nav.innerHTML = `
    <a href="#/" class="nav__logo" aria-label="Shubh Invite home">
      Shubh<span>·</span>Invite
    </a>
    <div class="nav__spacer"></div>
    <a href="#/gallery" class="nav__link" id="nav-gallery">Designs</a>
    <a href="#/about"   class="nav__link" id="nav-about">About</a>
  `;
  return nav;
}

// ── Placeholder: Coming in Phase 2 ───────────────────────────────
function buildEditorPlaceholder(params) {
  const el = document.createElement('div');
  el.className = 'page';
  el.style.cssText = `
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 60vh; gap: 1rem; text-align: center;
    padding: 2rem;
  `;
  el.innerHTML = `
    <p style="font-size: 3rem;">🎨</p>
    <h1 style="font-family: var(--ff-heading); font-size: var(--fs-h2); font-style: italic;">
      Editor — Coming in Phase 2
    </h1>
    <p style="color: var(--c-ink-muted); max-width: 40ch;">
      Template ID: <code>${params.id ?? 'unknown'}</code><br>
      The live editor with field controls, colour pickers and export will be built next.
    </p>
    <a href="#/" class="btn btn--ghost">← Back to gallery</a>
  `;
  return { el };
}

function buildAboutPage() {
  const el = document.createElement('div');
  el.className = 'page';
  el.style.cssText = `
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; min-height: 60vh; gap: 1rem; text-align: center;
    padding: 2rem;
  `;
  el.innerHTML = `
    <h1 style="font-family: var(--ff-heading); font-size: var(--fs-h2); font-style: italic;">
      About Shubh Invite
    </h1>
    <p style="color: var(--c-ink-muted); max-width: 52ch; line-height: 1.65;">
      A free, open-source invitation builder for every celebration — designed with
      cultural care and built entirely in the browser. No login. No data collected.
    </p>
    <a href="#/" class="btn btn--ghost" style="margin-top: 1rem;">← Back to designs</a>
  `;
  return { el };
}

// ── App shell ─────────────────────────────────────────────────────
function init$() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  // Build persistent nav
  const nav = buildNav();
  appEl.appendChild(nav);

  // Mount point for page content
  const main = document.createElement('main');
  main.id = 'main-content';
  main.setAttribute('tabindex', '-1');
  appEl.appendChild(main);

  mount(main);

  // ── Route definitions ─────────────────────────────────────────
  on('/',         () => createGalleryPage());
  on('/gallery',  () => createGalleryPage());
  on(/^\/editor\/(?<id>.+)$/, (params) => buildEditorPlaceholder(params));
  on('/about',    () => buildAboutPage());

  // Start router
  init();

  // Skip link for accessibility
  const skipLink = document.getElementById('skip-link');
  skipLink?.addEventListener('click', () => {
    main.focus();
  });
}

document.addEventListener('DOMContentLoaded', init$);
