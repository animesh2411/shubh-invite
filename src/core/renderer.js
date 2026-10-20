/**
 * renderer.js — SVG template renderer.
 *
 * Calls template.render(values, palette, helpers) and returns a full SVG string.
 * Also provides helpers used inside template render functions.
 */

// ── XML escaping ─────────────────────────────────────────────────
export function escapeXML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ── Canvas singleton for text measurement ─────────────────────────
let _canvas = null;
let _ctx = null;

function getCtx() {
  if (!_ctx) {
    _canvas = document.createElement('canvas');
    _ctx = _canvas.getContext('2d');
  }
  return _ctx;
}

/**
 * Measure the width of a string at a given font spec.
 * @param {string} text
 * @param {string} fontSpec  e.g. "bold 48px 'Playfair Display'"
 * @returns {number} width in px
 */
export function measureText(text, fontSpec) {
  const ctx = getCtx();
  ctx.font = fontSpec;
  return ctx.measureText(text).width;
}

/**
 * Wrap text into tspan lines that fit within maxWidth.
 * Returns an array of { text, x, dy } objects for SVG rendering.
 *
 * @param {string} text
 * @param {number} maxWidth     in SVG user units (same coordinate space as fontSize)
 * @param {number} fontSize     in SVG user units
 * @param {string} fontFamily
 * @param {string} fontWeight   e.g. "bold"
 * @param {object} [opts]
 * @param {number} [opts.lineHeight=1.3]   multiplier of fontSize
 * @param {string} [opts.textAnchor='middle']
 * @param {number} [opts.x=0]             x position for each tspan
 * @returns {{ lines: string[], lineHeight: number }}
 */
export function wrapText(text, maxWidth, fontSize, fontFamily, fontWeight = 'normal', opts = {}) {
  const { lineHeight: lhMult = 1.3, x = 0 } = opts;
  const fontSpec = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (measureText(test, fontSpec) <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      // If a single word is wider than maxWidth, still push it
      current = word;
    }
  }
  if (current) lines.push(current);

  return {
    lines,
    lineHeight: fontSize * lhMult,
  };
}

/**
 * Render wrapped text as SVG <tspan> elements.
 * @param {string} text
 * @param {object} opts
 * @param {number} opts.x
 * @param {number} opts.y         y of the FIRST line's baseline
 * @param {number} opts.maxWidth
 * @param {number} opts.fontSize
 * @param {string} opts.fontFamily
 * @param {string} [opts.fontWeight='normal']
 * @param {string} [opts.fill]
 * @param {string} [opts.textAnchor='middle']
 * @param {number} [opts.lineHeight=1.3]
 * @param {string} [opts.direction='ltr']
 * @returns {string}  SVG <text> element string
 */
export function svgText(text, opts) {
  const {
    x, y, maxWidth, fontSize, fontFamily,
    fontWeight = 'normal',
    fill = '#000',
    textAnchor = 'middle',
    lineHeight: lhMult = 1.3,
    direction = 'ltr',
    letterSpacing = 0,
    extraAttrs = '',
  } = opts;

  const { lines, lineHeight } = wrapText(text, maxWidth, fontSize, fontFamily, fontWeight, { lineHeight: lhMult, x });

  const tspans = lines.map((line, i) => {
    const dy = i === 0 ? 0 : lineHeight;
    return `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${escapeXML(line)}</tspan>`;
  }).join('');

  const dirAttr = direction === 'rtl' ? ' direction="rtl" unicode-bidi="bidi-override"' : '';
  const lsAttr = letterSpacing ? ` letter-spacing="${letterSpacing}"` : '';

  return `<text x="${x}" y="${y}" text-anchor="${textAnchor}" font-family="${escapeXML(fontFamily)}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}"${dirAttr}${lsAttr}${extraAttrs}>${tspans}</text>`;
}

/**
 * Build the helpers object passed into every template render function.
 */
export function buildHelpers() {
  return {
    escapeXML,
    measureText,
    wrapText,
    svgText,
  };
}

/**
 * Main render function.
 * @param {object} template   — a full template module object
 * @param {object} values     — user-edited field values { [field.key]: string }
 * @returns {string}          — complete SVG markup string
 */
export function render(template, values) {
  const helpers = buildHelpers();

  let svgContent;
  try {
    svgContent = template.render(values, template.palette, helpers);
  } catch (err) {
    console.error(`[renderer] Error rendering "${template.id}":`, err);
    // Return a simple error placeholder SVG
    svgContent = `
      <rect width="${template.size.w}" height="${template.size.h}" fill="#ffeaea"/>
      <text x="${template.size.w / 2}" y="${template.size.h / 2}"
            text-anchor="middle" fill="#c00" font-size="32" font-family="sans-serif">
        Render error — see console
      </text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 ${template.size.w} ${template.size.h}"
    width="${template.size.w}"
    height="${template.size.h}"
    role="img"
    aria-label="${escapeXML(template.name)} invitation preview">
  <title>${escapeXML(template.name)}</title>
  ${svgContent}
</svg>`;
}
