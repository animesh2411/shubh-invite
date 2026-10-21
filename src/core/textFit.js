/**
 * textFit.js — Canvas-based text measurement utilities.
 *
 * Provides auto-shrink (binary search font-size) and line-wrapping
 * so that names / headings never overflow the invite canvas.
 */

// ── Shared canvas singleton ───────────────────────────────────────
let _canvas, _ctx;
function ctx() {
  if (!_ctx) {
    _canvas = document.createElement('canvas');
    _ctx = _canvas.getContext('2d');
  }
  return _ctx;
}

/**
 * Measure pixel width of `text` at a given CSS font spec string.
 * @param {string} text
 * @param {string} fontSpec  e.g. "bold 60px 'Playfair Display'"
 */
export function measureWidth(text, fontSpec) {
  const c = ctx();
  c.font = fontSpec;
  return c.measureText(text).width;
}

/**
 * Binary-search the largest integer font-size ≤ maxSize that keeps
 * `text` within `maxWidth` pixels.
 *
 * @param {string} text
 * @param {number} maxWidth    — in SVG user-units (same scale as font sizes)
 * @param {number} maxSize     — starting / maximum font size
 * @param {string} fontFamily
 * @param {string} [fontWeight='normal']
 * @param {number} [minSize=10]
 * @returns {number}           — best-fit font size
 */
export function fitFontSize(text, maxWidth, maxSize, fontFamily, fontWeight = 'normal', minSize = 10) {
  if (!text) return maxSize;
  let lo = minSize, hi = maxSize, best = minSize;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const spec = `${fontWeight} ${mid}px ${fontFamily}`;
    if (measureWidth(text, spec) <= maxWidth) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return best;
}

/**
 * Wrap text into lines that each fit within `maxWidth` at `fontSize`.
 *
 * @param {string} text
 * @param {number} maxWidth
 * @param {number} fontSize
 * @param {string} fontFamily
 * @param {string} [fontWeight='normal']
 * @returns {string[]}  array of line strings
 */
export function wrapLines(text, maxWidth, fontSize, fontFamily, fontWeight = 'normal') {
  const spec = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureWidth(candidate, spec) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [''];
}

/**
 * Combine wrap + fit: find the largest font-size so that ALL wrapped
 * lines fit within maxWidth, then wrap at that size.
 *
 * @param {string} text
 * @param {object} opts
 * @param {number} opts.maxWidth
 * @param {number} opts.maxSize
 * @param {string} opts.fontFamily
 * @param {string} [opts.fontWeight='normal']
 * @param {number} [opts.minSize=10]
 * @param {number} [opts.maxLines=4]   — if text wraps beyond this, keep shrinking
 * @returns {{ fontSize: number, lines: string[] }}
 */
export function fitText(text, opts) {
  const {
    maxWidth, maxSize, fontFamily,
    fontWeight = 'normal',
    minSize = 10,
    maxLines = 4,
  } = opts;

  let size = maxSize;
  // Shrink until the longest line fits AND line count ≤ maxLines
  while (size >= minSize) {
    const lines = wrapLines(text, maxWidth, size, fontFamily, fontWeight);
    const longest = Math.max(...lines.map((l) =>
      measureWidth(l, `${fontWeight} ${size}px ${fontFamily}`)
    ));
    if (longest <= maxWidth && lines.length <= maxLines) {
      return { fontSize: size, lines };
    }
    size -= 2;
  }
  // Fallback: use minSize and truncate
  const lines = wrapLines(text, maxWidth, minSize, fontFamily, fontWeight);
  return { fontSize: minSize, lines: lines.slice(0, maxLines) };
}

/**
 * Build SVG <text> + <tspan> markup for a fitted, wrapped string.
 *
 * @param {string} text
 * @param {object} opts
 * @param {number} opts.x
 * @param {number} opts.y           — y of first baseline
 * @param {number} opts.maxWidth
 * @param {number} opts.maxSize
 * @param {string} opts.fontFamily
 * @param {string} [opts.fontWeight='normal']
 * @param {string} [opts.fill='#000']
 * @param {string} [opts.textAnchor='middle']
 * @param {number} [opts.lineHeight=1.25]  — multiplier of fontSize
 * @param {string} [opts.direction='ltr']
 * @param {string} [opts.extraAttrs='']
 * @param {number} [opts.minSize=10]
 * @returns {string}  SVG element string
 */
export function svgFitText(text, opts) {
  const {
    x, y, maxWidth, maxSize, fontFamily,
    fontWeight = 'normal',
    fill = '#000',
    textAnchor = 'middle',
    lineHeight: lhMult = 1.25,
    direction = 'ltr',
    extraAttrs = '',
    minSize = 10,
  } = opts;

  if (!text) return '';

  const { fontSize, lines } = fitText(text, { maxWidth, maxSize, fontFamily, fontWeight, minSize });
  const lh = fontSize * lhMult;
  const dirAttr = direction === 'rtl' ? ' direction="rtl" unicode-bidi="bidi-override"' : '';
  const extra = extraAttrs ? (extraAttrs.trim().startsWith(' ') ? extraAttrs : ' ' + extraAttrs.trim()) : '';

  const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const tspans = lines.map((line, i) =>
    `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(line)}</tspan>`
  ).join('');

  return `<text x="${x}" y="${y}" text-anchor="${textAnchor}" font-family="${esc(fontFamily)}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}"${dirAttr}${extra}>${tspans}</text>`;
}
