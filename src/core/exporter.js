/**
 * exporter.js — SVG → Canvas → PNG export + clipboard copy.
 *
 * Why data URI instead of Blob URL:
 *   Blob URLs live at a synthetic origin so @font-face url() paths
 *   are cross-origin → img.onerror fires immediately.
 *   A data URI is origin-less, so unresolvable font urls are silently
 *   ignored and the browser uses its already-cached Fontsource fonts.
 *
 * Why we sanitize before encoding:
 *   Browsers render SVG as innerHTML leniently (HTML5 parser), but
 *   <img src="data:image/svg+xml…"> uses a strict XML parser.
 *   Unescaped & in any text node (e.g. "Sharma & Mehta") makes the
 *   entire SVG fail to load.  We normalize those before building the URI.
 *
 * Pipeline:
 *   1. document.fonts.ready  (Fontsource fonts are usable on canvas)
 *   2. sanitize SVG XML       (escape stray & etc.)
 *   3. SVG → data URI         (encodeURIComponent)
 *   4. img.onload → ctx.drawImage at 2×
 *   5. canvas.toBlob('image/png') → download / clipboard
 */

// ── Public API ────────────────────────────────────────────────────

/** Trigger a browser file-download for a Blob. */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/**
 * Convert an SVG string to a PNG Blob at `scale`× resolution.
 *
 * @param {string} svgString   — full <svg …>…</svg> markup
 * @param {number} width       — SVG logical width  (viewBox units)
 * @param {number} height      — SVG logical height
 * @param {number} [scale=2]   — output resolution multiplier (2 = 2×)
 * @returns {Promise<Blob>}
 */
export async function svgToPngBlob(svgString, width, height, scale = 2) {
  // 1. Wait for all Fontsource fonts to be available in the browser
  await document.fonts.ready;

  // 2. Fix common XML validity issues so strict SVG parser succeeds
  const cleanSVG = sanitizeSVG(svgString);

  // 3. Validate with DOMParser so we surface real errors quickly
  validateSVG(cleanSVG); // throws with a useful message if broken

  // 4. Build data URI (origin-less, avoids blob cross-origin font issues)
  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleanSVG)}`;

  // 5. Draw onto off-screen canvas
  const canvas  = document.createElement('canvas');
  canvas.width   = width  * scale;
  canvas.height  = height * scale;
  const ctx = canvas.getContext('2d');

  await new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, width, height);
      resolve();
    };

    img.onerror = () => {
      // If we reach here after sanitization the SVG has issues we missed.
      // Log the first 2 KB to help debug.
      console.error('[exporter] SVG data URI rejected by browser. First 2000 chars:\n', cleanSVG.slice(0, 2000));
      reject(new Error(
        'SVG failed to render even after sanitization. ' +
        'See console for the first 2000 characters of the SVG.'
      ));
    };

    img.src = dataUri;
  });

  // 6. Export as PNG blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob
        ? resolve(blob)
        : reject(new Error('canvas.toBlob() returned null — canvas may be tainted')),
      'image/png'
    );
  });
}

/**
 * Download a rendered SVG as a 2× PNG.
 *
 * @param {object} template   — template module object (needs .id, .size)
 * @param {string} svgString  — full SVG string from renderer.render()
 */
export async function downloadPNG(template, svgString) {
  const blob = await svgToPngBlob(svgString, template.size.w, template.size.h, 2);
  downloadBlob(blob, `${template.id}-invite.png`);
}

/**
 * Copy a rendered SVG as PNG to the system clipboard.
 *
 * @param {object} template
 * @param {string} svgString
 * @returns {Promise<boolean>}  true if successful
 */
export async function copyToClipboard(template, svgString) {
  try {
    const blob = await svgToPngBlob(svgString, template.size.w, template.size.h, 2);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  } catch (err) {
    console.warn('[exporter] Clipboard write failed:', err);
    return false;
  }
}

// ── Internal helpers ──────────────────────────────────────────────

/**
 * Fix common XML validity problems so the strict SVG-as-image parser accepts the markup.
 *
 * Problems addressed:
 *  • Unescaped & in text nodes / attribute values  →  &amp;
 *    (Only & that are NOT already part of a valid entity reference.)
 *  • Trailing NaN / undefined in coordinate attributes  →  0
 *  • Missing xmlns on the root element
 *
 * @param {string} svg
 * @returns {string}  sanitized SVG
 */
export function sanitizeSVG(svg) {
  let s = svg.trim();

  // Strip all XML comments to eliminate forbidden double hyphens, stray & inside comments, and reduce size
  s = s.replace(/<!--[\s\S]*?-->/g, '');

  // Ensure root element has the SVG namespace
  if (!s.includes('xmlns=')) {
    s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Fix missing space between concatenated attributes (e.g. fill="..."opacity="...")
  s = s.replace(/(["'])([a-zA-Z_:][\w:.-]*=)/g, '$1 $2');

  // Fix stray & that are not already part of a named/numeric XML entity.
  // Regex: & NOT followed by  amp; | lt; | gt; | quot; | apos; | #digits; | #xHex;
  s = s.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/g, '&amp;');

  // Replace NaN coordinates (produced when JS math goes wrong) with 0
  s = s.replace(/\bNaN\b/g, '0');

  // Replace "undefined" that might have leaked into an attribute
  s = s.replace(/"undefined"/g, '"0"');

  return s;
}

/**
 * Parse the SVG with DOMParser and throw a descriptive Error if it fails.
 * This surfaces real XML errors before we hit the opaque img.onerror.
 *
 * @param {string} svg
 * @throws {Error}
 */
function validateSVG(svg) {
  const doc  = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const err  = doc.querySelector('parsererror');
  if (err) {
    // parsererror text is browser-specific but always useful
    const msg = err.textContent?.replace(/\s+/g, ' ').slice(0, 300) ?? 'Unknown parse error';
    console.error('[exporter] SVG XML parse error:', msg);
    console.error('[exporter] Near (first 3000 chars):', svg.slice(0, 3000));
    throw new Error(`SVG XML error: ${msg}`);
  }
}
