/**
 * main.js — App entry point.
 * Initialises navigation, registers routes, mounts the router.
 */

// ── Self-hosted variable fonts (Fontsource → Vite bundles WOFF2) ──
import '@fontsource-variable/fraunces/wght.css';
import '@fontsource-variable/fraunces/wght-italic.css';
import '@fontsource-variable/jost/wght.css';
import '@fontsource-variable/jost/wght-italic.css';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource-variable/noto-sans-gurmukhi/wght.css';

// Static-weight fonts
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/pinyon-script/400.css';
import '@fontsource/amiri/400.css';
import '@fontsource/amiri/700.css';
import '@fontsource/amiri/400-italic.css';
// Noto Serif Devanagari uses devanagari-{weight}.css subset files
import '@fontsource/noto-serif-devanagari/devanagari-400.css';
import '@fontsource/noto-serif-devanagari/devanagari-700.css';

// ── Styles ────────────────────────────────────────────────────────
import './src/styles/base.css';
import './src/styles/hero.css';
import './src/styles/gallery.css';

// ── Core ──────────────────────────────────────────────────────────
import { on, mount, init } from './src/core/router.js';
import { createGalleryPage } from './src/ui/gallery.js';
import { createEditorPage } from './src/ui/editor.js';

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

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('#nav-gallery');
    if (link) {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        e.preventDefault();
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  return nav;
}

// ── About page ────────────────────────────────────────────────────
function buildAboutPage() {
  const el = document.createElement('div');
  el.className = 'page';
  el.style.cssText = `
    display:flex;flex-direction:column;align-items:center;
    justify-content:center;min-height:60vh;gap:1rem;
    text-align:center;padding:2rem;
  `;
  el.innerHTML = `
    <h1 style="font-family:var(--ff-heading);font-size:var(--fs-h2);font-style:italic;">
      About Shubh Invite
    </h1>
    <p style="color:var(--c-ink-muted);max-width:52ch;line-height:1.65;">
      A free, open-source invitation builder for every celebration — designed with
      cultural care and built entirely in the browser. No login. No data collected.
    </p>
    <br>
    <p>Built with 💕 by <a href="https://github.com/animesh2411">Animesh Gupta</a></p>
    <p>Follow us on <a href="https://instagram.com/snaps.ind/">Instagram</a></p>
    <a href="#/" class="btn btn--ghost" style="margin-top:1rem;">← Back to designs</a>
  `;
  return { el };
}

// ── App shell ─────────────────────────────────────────────────────
function init$() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const nav = buildNav();
  appEl.appendChild(nav);

  const main = document.createElement('main');
  main.id = 'main-content';
  main.setAttribute('tabindex', '-1');
  appEl.appendChild(main);

  mount(main);

  // ── Routes ────────────────────────────────────────────────────
  on('/', () => createGalleryPage());
  on('/gallery', () => createGalleryPage());
  on(/^\/editor\/(?<id>.+)$/, (params) => createEditorPage(params));
  on('/about', () => buildAboutPage());

  init();

  // Skip link
  document.getElementById('skip-link')?.addEventListener('click', () => main.focus());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init$);
} else {
  init$();
}
