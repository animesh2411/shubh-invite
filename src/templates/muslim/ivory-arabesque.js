/**
 * Muslim – Ivory Arabesque
 *
 * An exquisite Islamic invitation featuring an ivory parchment background,
 * continuous flowing arabesque vine borders generated with mathematical cubic
 * bezier curves, alternating 5-petal rosettes and palmette leaf pairs,
 * 8-pointed star corner medallions, a gentle ogee arch, refined typography,
 * and an emerald plinth with gold star rosettes at the base.
 */

import { svgFitText as _svgFitText } from '../../core/textFit.js';
import { escapeXML as _escapeXML } from '../../core/renderer.js';

export const fontPairs = [
  { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
  { id: 'amiri',   label: 'Amiri + Jost',     display: 'Amiri',              body: 'Jost' },
];

export default {
  id: 'muslim-nikah-arabesque',
  tradition: 'muslim',
  occasion: 'nikah',
  name: 'Ivory Arabesque',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#F8F3E6',
    ink:     '#1A1008',
    accent:  '#0F4C3A',
    accent2: '#C8A24A',
    paper:   '#FFFDF5',
    gold:    '#C8A24A',
    emerald: '#0F4C3A',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Amiri',
  },

  fontPairs,

  fields: [
    {
      key: 'bismillah',
      label: 'Bismillah (optional)',
      default: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      lang: 'ar',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Imam before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Nikah Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Zaid Al-Rashid',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Aisha Khalid',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Friday, 20th March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'After Jumu\'ah Prayer',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Al-Noor Grand Hall, Hyderabad',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Al-Rashid & Khalid Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: '',
      lang: 'en',
      multiline: false,
      optional: true,
    },
  ],

  render(values, palette, helpers = {}) {
    const W = 1080, H = 1500;
    const svgFitText = helpers.svgFitText || _svgFitText;
    const escapeXML = helpers.escapeXML || _escapeXML;
    const v = values || {};

    // Font pairing selection (default Cormorant + Jost)
    const selectedPair = fontPairs.find((p) => p.id === v.fontPair) || fontPairs[0];
    const displayFont = `'${selectedPair.display}', serif`;
    const bodyFont = `'${selectedPair.body}', sans-serif`;

    // ── 1. Background ────────────────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Decorative Outer & Inner Frame Lines ──────────────────────────────
    // The arabesque vine runs within an 80px border zone (between line x=16 and x=82)
    const framingLines = `
      <!-- Outer gold framing rule -->
      <rect x="14" y="14" width="${W - 28}" height="${H - 84}" fill="none"
            stroke="${palette.gold}" stroke-width="1.5" stroke-opacity="0.7"/>
      <rect x="18" y="18" width="${W - 36}" height="${H - 92}" fill="none"
            stroke="${palette.gold}" stroke-width="0.5" stroke-opacity="0.35"/>
      <!-- Inner framing rule -->
      <rect x="80" y="80" width="${W - 160}" height="${H - 216}" fill="none"
            stroke="${palette.gold}" stroke-width="1.5" stroke-opacity="0.7"/>
      <rect x="84" y="84" width="${W - 168}" height="${H - 224}" fill="none"
            stroke="${palette.emerald}" stroke-width="0.75" stroke-opacity="0.3"/>
    `;

    // ── 3. Arabesque Vine Border (Continuous Cubic Bezier Curves) ─────────────
    const vineBorder = renderArabesqueVineBorder(palette);

    // ── 4. Corner Medallions (8-Pointed Star Rosettes) ────────────────────────
    // Centered at the four corners of the 80px border strip
    const cornerMedallions = `
      ${renderCornerMedallion(48, 48, palette)}
      ${renderCornerMedallion(W - 48, 48, palette)}
      ${renderCornerMedallion(48, 1398, palette)}
      ${renderCornerMedallion(W - 48, 1398, palette)}
    `;

    // ── 5. Central Golden Ogee Arch Behind Names ──────────────────────────────
    // Gentle pointed ogee arch centered at W/2, spanning y≈350 to y≈950, width 640px
    const archLeft = 220;
    const archRight = 860;
    const archApexX = 540;
    const archApexY = 350;
    const archBottomY = 950;
    const archSpringY = 620;

    const ogeeArchPath = `
      M ${archLeft} ${archBottomY}
      L ${archLeft} ${archSpringY}
      C ${archLeft} 535, 265 475, 340 475
      C 415 475, 510 395, ${archApexX} ${archApexY}
      C 570 395, 665 475, 740 475
      C 815 475, ${archRight} 535, ${archRight} ${archSpringY}
      L ${archRight} ${archBottomY}
      Z
    `;

    // Inner subtle concentric line for depth
    const innerOgeeArchPath = `
      M ${archLeft + 10} ${archBottomY - 6}
      L ${archLeft + 10} ${archSpringY}
      C ${archLeft + 10} 538, 270 481, 342 481
      C 414 481, 508 403, ${archApexX} ${archApexY + 10}
      C 572 403, 666 481, 738 481
      C 810 481, ${archRight - 10} 538, ${archRight - 10} ${archSpringY}
      L ${archRight - 10} ${archBottomY - 6}
    `;

    const centralArch = `
      <!-- Gentle Golden Ogee Arch -->
      <path d="${ogeeArchPath}" fill="${palette.gold}" fill-opacity="0.08"
            stroke="${palette.gold}" stroke-width="2" stroke-opacity="0.30"/>
      <path d="${innerOgeeArchPath}" fill="none"
            stroke="${palette.gold}" stroke-width="0.75" stroke-opacity="0.18"
            stroke-dasharray="3 3"/>
      <!-- Small Star Finial at Apex -->
      <g transform="translate(${archApexX}, ${archApexY - 4})">
        <polygon points="${starPoints(0, 0, 7, 8)}" fill="${palette.gold}" fill-opacity="0.8"/>
        <circle cx="0" cy="0" r="1.8" fill="${palette.emerald}"/>
      </g>
    `;

    // ── 6. Bismillah (in Amiri Arabic, direction rtl, fill emerald, centered at y≈240)
    const bismillahText = v.bismillah !== undefined ? v.bismillah : 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
    const bismillahSVG = bismillahText ? svgFitText(bismillahText, {
      x: W / 2,
      y: 240,
      maxWidth: 720,
      maxSize: 44,
      fontFamily: 'Amiri, serif',
      fontWeight: '700',
      fill: palette.emerald,
      textAnchor: 'middle',
      direction: 'rtl',
    }) : '';

    // ── 7. Event Type (JOST letter-spaced, fill gold, y≈330) ──────────────────
    const eventText = v.eventType || 'Nikah Invitation';
    const eventSVG = svgFitText(eventText.toUpperCase(), {
      x: W / 2,
      y: 330,
      maxWidth: 620,
      maxSize: 22,
      fontFamily: bodyFont,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' letter-spacing="6"',
    });

    // ── 8. Thin Double Gold Rule at y≈360 and y≈370 ────────────────────────────
    const goldRules = `
      <line x1="330" y1="360" x2="750" y2="360" stroke="${palette.gold}" stroke-width="1.2" stroke-opacity="0.6"/>
      <line x1="370" y1="370" x2="710" y2="370" stroke="${palette.gold}" stroke-width="0.75" stroke-opacity="0.4"/>
      <circle cx="${W / 2}" cy="365" r="2.5" fill="${palette.gold}"/>
    `;

    // ── 9. Groom Name (Cormorant Garamond bold, fill ink #1A1008, y≈530, auto-fit maxWidth 700)
    const groomSVG = svgFitText(v.groomName || 'Zaid Al-Rashid', {
      x: W / 2,
      y: 530,
      maxWidth: 700,
      maxSize: 72,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 10. '&' Italic 56px, fill gold, y≈630 ─────────────────────────────────
    const andSVG = `
      <text x="${W / 2}" y="630" text-anchor="middle"
            font-family="Cormorant Garamond, serif" font-style="italic"
            font-size="56" fill="${palette.gold}">&amp;</text>
    `;

    // ── 11. Bride Name (same styling, y≈730) ──────────────────────────────────
    const brideSVG = svgFitText(v.brideName || 'Aisha Khalid', {
      x: W / 2,
      y: 730,
      maxWidth: 700,
      maxSize: 72,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 12. Ornamental Divider (small star + lines) at y≈790 ──────────────────
    const dividerSVG = `
      <g transform="translate(${W / 2}, 790)">
        <line x1="-180" y1="0" x2="-26" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="-140" y1="-2" x2="-26" y2="-2" stroke="${palette.gold}" stroke-width="0.5" stroke-opacity="0.4"/>
        <circle cx="-180" cy="0" r="2" fill="${palette.gold}"/>
        <polygon points="${starPoints(0, 0, 9, 8)}" fill="${palette.gold}"/>
        <circle cx="0" cy="0" r="2.5" fill="${palette.emerald}"/>
        <line x1="26" y1="0" x2="180" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="26" y1="-2" x2="140" y2="-2" stroke="${palette.gold}" stroke-width="0.5" stroke-opacity="0.4"/>
        <circle cx="180" cy="0" r="2" fill="${palette.gold}"/>
      </g>
    `;

    // ── 13. Date (Cormorant Garamond 36px, fill ink, y≈860) ───────────────────
    const dateSVG = svgFitText(v.date || 'Friday, 20th March 2026', {
      x: W / 2,
      y: 860,
      maxWidth: 660,
      maxSize: 36,
      fontFamily: displayFont,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 14. Time (Jost 28px, fill ink muted, y≈915) ───────────────────────────
    const timeSVG = svgFitText(v.time || "After Jumu'ah Prayer", {
      x: W / 2,
      y: 915,
      maxWidth: 660,
      maxSize: 28,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.75"',
    });

    // ── 15. Venue (Cormorant Garamond 34px, fill ink, y≈975) ──────────────────
    const venueSVG = svgFitText(v.venue || 'Al-Noor Grand Hall, Hyderabad', {
      x: W / 2,
      y: 975,
      maxWidth: 660,
      maxSize: 34,
      fontFamily: displayFont,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // ── 16. Hosted By (Cormorant Garamond 30px, fill ink muted, around y≈1110)
    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1075" text-anchor="middle"
            font-family="${bodyFont}" font-size="18" font-weight="500"
            fill="${palette.gold}" letter-spacing="4">
        HOSTED BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1110,
        maxWidth: 660,
        maxSize: 30,
        fontFamily: displayFont,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
        extraAttrs: ' opacity="0.85"',
      })}
    ` : '';

    // ── 17. RSVP (if present, fill ink muted, y≈1280) ─────────────────────────
    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1280,
      maxWidth: 660,
      maxSize: 26,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.75"',
    }) : '';

    // ── 18. Bottom Band (thin emerald rect at bottom 60px, 8 gold star medallions)
    const bottomBand = `
      <g>
        <!-- Emerald Plinth Rect -->
        <rect x="0" y="${H - 60}" width="${W}" height="60" fill="${palette.emerald}"/>
        <line x1="0" y1="${H - 60}" x2="${W}" y2="${H - 60}" stroke="${palette.gold}" stroke-width="2"/>
        <line x1="0" y1="${H - 57}" x2="${W}" y2="${H - 57}" stroke="${palette.gold}" stroke-width="0.5" stroke-opacity="0.5"/>
        <!-- Row of 8 Small Gold Star Medallions -->
        ${Array.from({ length: 8 }, (_, i) => {
          const cx = (W / 8) * (i + 0.5);
          const cy = H - 30;
          return `
            <g transform="translate(${cx}, ${cy})">
              <circle cx="0" cy="0" r="16" fill="none" stroke="${palette.gold}" stroke-width="0.75" stroke-opacity="0.6"/>
              <polygon points="${starPoints(0, 0, 11, 8)}" fill="${palette.gold}"/>
              <circle cx="0" cy="0" r="3" fill="${palette.emerald}"/>
              <circle cx="0" cy="0" r="1" fill="${palette.paper}"/>
            </g>
          `;
        }).join('')}
      </g>
    `;

    return `
      ${bg}
      ${framingLines}
      ${vineBorder}
      ${cornerMedallions}
      ${centralArch}
      ${bismillahSVG}
      ${eventSVG}
      ${goldRules}
      ${groomSVG}
      ${andSVG}
      ${brideSVG}
      ${dividerSVG}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
      ${bottomBand}
    `;
  },
};

// ── Pure Geometry & Arabesque Math Helpers ─────────────────────────────────────

/**
 * Generate polygon points string for an n-pointed star.
 * Uses the classic Islamic octagram ratio innerRadius = r * 0.4142.
 */
function starPoints(cx, cy, r, n = 8, innerRatio = 0.4142) {
  const inner = r * innerRatio;
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI / n) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : inner;
    pts.push(`${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`);
  }
  return pts.join(' ');
}

/**
 * Render a corner medallion with an 8-pointed star rosette, concentric rings, and jewel center.
 */
function renderCornerMedallion(cx, cy, palette) {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    const px = (cx + Math.cos(angle) * 35).toFixed(2);
    const py = (cy + Math.sin(angle) * 35).toFixed(2);
    return `<circle cx="${px}" cy="${py}" r="1.8" fill="${palette.gold}"/>`;
  }).join('');

  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="31" fill="${palette.paper}" stroke="${palette.gold}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="25" fill="none" stroke="${palette.gold}" stroke-width="0.75" stroke-dasharray="2 2"/>
      ${dots}
      <polygon points="${starPoints(cx, cy, 21, 8)}" fill="${palette.gold}"/>
      <polygon points="${starPoints(cx, cy, 13, 8)}" fill="${palette.emerald}"/>
      <circle cx="${cx}" cy="${cy}" r="3.5" fill="${palette.gold}"/>
      <circle cx="${cx}" cy="${cy}" r="1.5" fill="${palette.paper}"/>
    </g>
  `;
}

/**
 * Render a delicate 5-petal Islamic floral rosette.
 */
function renderFivePetalFlower(cx, cy, radius, petalColor, centerColor, rot = 0) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = i * 72;
    return `<ellipse cx="0" cy="${(-radius * 0.55).toFixed(2)}" rx="${(radius * 0.36).toFixed(2)}" ry="${(radius * 0.52).toFixed(2)}"
                     fill="${petalColor}" transform="rotate(${angle})"/>`;
  }).join('');

  return `
    <g transform="translate(${cx.toFixed(2)}, ${cy.toFixed(2)}) rotate(${rot})">
      ${petals}
      <circle cx="0" cy="0" r="${(radius * 0.34).toFixed(2)}" fill="${centerColor}"/>
      <circle cx="0" cy="0" r="${(radius * 0.14).toFixed(2)}" fill="${petalColor}"/>
    </g>
  `;
}

/**
 * Render a pair of graceful curved Islamic palmette leaves sprouting from the vine.
 */
function renderLeafPair(cx, cy, angleDeg, scale, leafColor, budColor) {
  return `
    <g transform="translate(${cx.toFixed(2)}, ${cy.toFixed(2)}) rotate(${angleDeg.toFixed(1)}) scale(${scale})">
      <!-- Left Leaf -->
      <path d="M 0 0 C -4 -5, -8 -13, -3 -19 C 1 -13, 1 -6, 0 0 Z" fill="${leafColor}"/>
      <!-- Right Leaf -->
      <path d="M 0 0 C 4 -5, 8 -13, 3 -19 C -1 -13, -1 -6, 0 0 Z" fill="${leafColor}"/>
      <!-- Tiny Core Bud -->
      <circle cx="0" cy="-5" r="1.5" fill="${budColor}"/>
    </g>
  `;
}

/**
 * Render a continuous horizontal arabesque vine segment with dual interlocking cubic bezier stems,
 * alternating 5-petal rosettes and leaf pairs.
 */
function renderHorizontalArabesque(x1, x2, yMid, count, palette) {
  const dx = (x2 - x1) / count;
  const amp = 14;

  let primaryD = `M ${x1} ${yMid}`;
  let secondaryD = `M ${x1} ${yMid}`;
  const florals = [];

  for (let k = 0; k < count; k++) {
    const sx = x1 + k * dx;
    const mx = sx + dx * 0.5;
    const ex = sx + dx;

    // Cubic bezier S-curve 1 (crest at yMid - amp)
    // Cubic bezier S-curve 2 (trough at yMid + amp)
    primaryD += ` C ${(sx + dx * 0.18).toFixed(2)} ${(yMid - amp * 1.35).toFixed(2)}, ${(sx + dx * 0.35).toFixed(2)} ${(yMid - amp * 1.35).toFixed(2)}, ${mx.toFixed(2)} ${yMid}`;
    primaryD += ` C ${(mx + dx * 0.18).toFixed(2)} ${(yMid + amp * 1.35).toFixed(2)}, ${(mx + dx * 0.35).toFixed(2)} ${(yMid + amp * 1.35).toFixed(2)}, ${ex.toFixed(2)} ${yMid}`;

    // Interlocking secondary vine with inverse phase
    secondaryD += ` C ${(sx + dx * 0.18).toFixed(2)} ${(yMid + amp * 1.35).toFixed(2)}, ${(sx + dx * 0.35).toFixed(2)} ${(yMid + amp * 1.35).toFixed(2)}, ${mx.toFixed(2)} ${yMid}`;
    secondaryD += ` C ${(mx + dx * 0.18).toFixed(2)} ${(yMid - amp * 1.35).toFixed(2)}, ${(mx + dx * 0.35).toFixed(2)} ${(yMid - amp * 1.35).toFixed(2)}, ${ex.toFixed(2)} ${yMid}`;

    const crest1X = sx + dx * 0.25;
    const crest1Y = yMid - amp;
    const crest2X = sx + dx * 0.75;
    const crest2Y = yMid + amp;

    // Alternating floral motifs along the wave
    if (k % 2 === 0) {
      // 5-petal flower: emerald petals with gold center
      florals.push(renderFivePetalFlower(crest1X, crest1Y, 8.5, palette.emerald, palette.gold, 18));
      // Leaf pair in gold
      florals.push(renderLeafPair(crest2X, crest2Y, 180, 0.85, palette.gold, palette.emerald));
    } else {
      // 5-petal flower: gold petals with emerald center
      florals.push(renderFivePetalFlower(crest1X, crest1Y, 8.5, palette.gold, palette.emerald, 0));
      // Leaf pair in emerald
      florals.push(renderLeafPair(crest2X, crest2Y, 180, 0.85, palette.emerald, palette.gold));
    }

    // Midpoint accent bead
    florals.push(`<circle cx="${mx.toFixed(2)}" cy="${yMid}" r="2" fill="${palette.gold}" opacity="0.85"/>`);
  }

  return `
    <g>
      <path d="${primaryD}" fill="none" stroke="${palette.emerald}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="${secondaryD}" fill="none" stroke="${palette.gold}" stroke-width="1.3" stroke-opacity="0.85" stroke-linecap="round"/>
      ${florals.join('\n')}
    </g>
  `;
}

/**
 * Render a continuous vertical arabesque vine segment with dual interlocking cubic bezier stems,
 * alternating 5-petal rosettes and leaf pairs.
 */
function renderVerticalArabesque(y1, y2, xMid, count, palette) {
  const dy = (y2 - y1) / count;
  const amp = 14;

  let primaryD = `M ${xMid} ${y1}`;
  let secondaryD = `M ${xMid} ${y1}`;
  const florals = [];

  for (let k = 0; k < count; k++) {
    const sy = y1 + k * dy;
    const my = sy + dy * 0.5;
    const ey = sy + dy;

    // Cubic bezier S-curve along vertical axis
    primaryD += ` C ${(xMid - amp * 1.35).toFixed(2)} ${(sy + dy * 0.18).toFixed(2)}, ${(xMid - amp * 1.35).toFixed(2)} ${(sy + dy * 0.35).toFixed(2)}, ${xMid} ${my.toFixed(2)}`;
    primaryD += ` C ${(xMid + amp * 1.35).toFixed(2)} ${(my + dy * 0.18).toFixed(2)}, ${(xMid + amp * 1.35).toFixed(2)} ${(my + dy * 0.35).toFixed(2)}, ${xMid} ${ey.toFixed(2)}`;

    // Interlocking secondary vine with inverse phase
    secondaryD += ` C ${(xMid + amp * 1.35).toFixed(2)} ${(sy + dy * 0.18).toFixed(2)}, ${(xMid + amp * 1.35).toFixed(2)} ${(sy + dy * 0.35).toFixed(2)}, ${xMid} ${my.toFixed(2)}`;
    secondaryD += ` C ${(xMid - amp * 1.35).toFixed(2)} ${(my + dy * 0.18).toFixed(2)}, ${(xMid - amp * 1.35).toFixed(2)} ${(my + dy * 0.35).toFixed(2)}, ${xMid} ${ey.toFixed(2)}`;

    const crest1X = xMid - amp;
    const crest1Y = sy + dy * 0.25;
    const crest2X = xMid + amp;
    const crest2Y = sy + dy * 0.75;

    // Alternating floral motifs along the wave
    if (k % 2 === 0) {
      // 5-petal flower: emerald petals with gold center
      florals.push(renderFivePetalFlower(crest1X, crest1Y, 8.5, palette.emerald, palette.gold, 36));
      // Leaf pair in gold
      florals.push(renderLeafPair(crest2X, crest2Y, 90, 0.85, palette.gold, palette.emerald));
    } else {
      // 5-petal flower: gold petals with emerald center
      florals.push(renderFivePetalFlower(crest1X, crest1Y, 8.5, palette.gold, palette.emerald, 0));
      // Leaf pair in emerald
      florals.push(renderLeafPair(crest2X, crest2Y, 90, 0.85, palette.emerald, palette.gold));
    }

    // Midpoint accent bead
    florals.push(`<circle cx="${xMid}" cy="${my.toFixed(2)}" r="2" fill="${palette.gold}" opacity="0.85"/>`);
  }

  return `
    <g>
      <path d="${primaryD}" fill="none" stroke="${palette.emerald}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="${secondaryD}" fill="none" stroke="${palette.gold}" stroke-width="1.3" stroke-opacity="0.85" stroke-linecap="round"/>
      ${florals.join('\n')}
    </g>
  `;
}

/**
 * Render the complete 4-edge continuous arabesque vine border.
 */
function renderArabesqueVineBorder(palette) {
  // Top: x from 80 to 1000 at y = 48
  const topEdge = renderHorizontalArabesque(80, 1000, 48, 10, palette);
  // Bottom: x from 80 to 1000 at y = 1398
  const bottomEdge = renderHorizontalArabesque(80, 1000, 1398, 10, palette);
  // Left: y from 80 to 1366 at x = 48
  const leftEdge = renderVerticalArabesque(80, 1366, 48, 14, palette);
  // Right: y from 80 to 1366 at x = 1032
  const rightEdge = renderVerticalArabesque(80, 1366, 1032, 14, palette);

  return `
    <!-- Arabesque Vine Border (Top, Bottom, Left, Right) -->
    ${topEdge}
    ${bottomEdge}
    ${leftEdge}
    ${rightEdge}
  `;
}
