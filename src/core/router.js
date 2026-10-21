/**
 * router.js — Tiny hash-based router.
 * Routes: #/ | #/gallery | #/editor/:id
 */

const routes = new Map();
let currentCleanup = null;

/**
 * Register a route handler.
 * @param {string|RegExp} pattern
 * @param {function(params: object): {el: HTMLElement, cleanup?: function}} handler
 */
export function on(pattern, handler) {
  routes.set(pattern, handler);
}

/** Navigate to a hash path. */
export function navigate(path) {
  window.location.hash = path;
}

/** Return the current hash path (without the leading #). */
export function currentPath() {
  return window.location.hash.slice(1) || '/';
}

function matchRoute(path) {
  for (const [pattern, handler] of routes) {
    if (typeof pattern === 'string') {
      if (pattern === path) return { handler, params: {} };
    } else if (pattern instanceof RegExp) {
      const m = path.match(pattern);
      if (m) return { handler, params: m.groups ?? {} };
    }
  }
  return null;
}

let container = null;

export function mount(el) {
  container = el;
}

function render() {
  const path = currentPath();
  const match = matchRoute(path)
    ?? matchRoute('/'); // fallback to home

  if (!match) return;

  // Run previous page's cleanup
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Clear container
  if (container) container.innerHTML = '';

  const result = match.handler(match.params);
  if (!result) return;

  if (container && result.el) {
    container.appendChild(result.el);
  }
  currentCleanup = result.cleanup ?? null;

  // Scroll: if navigating to /gallery, scroll down to the gallery section
  if (path === '/gallery') {
    requestAnimationFrame(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    });
  } else {
    // Scroll to top on other routes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export function init() {
  window.addEventListener('hashchange', render);
  render(); // render initial route
}
