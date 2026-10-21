/**
 * Sikh – Navy Anand (Anand Karaj Invitation Template)
 *
 * Clean, elegant deep navy invitation featuring:
 * - Geometric 6-pointed star field (3% opacity)
 * - Khanda watermark (8% opacity) with central double-edged sword, chakkar quoit,
 *   and flanking curved kirpans
 * - Thin double gold frame (outer 3px, inner 1px at 36px and 52px insets)
 * - ੴ sacred emblem in Gurmukhi (72px, gold)
 * - Waheguru blessing line in Gurmukhi (30px, cream 80% opacity)
 * - Event type, names with italic ampersand, rules, date, time, venue, and host details
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'sikh-anand-karaj-navy',
  tradition: 'sikh',
  occasion: 'anand-karaj',
  name: 'Navy Anand',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#0B2447',
    ink:     '#FFF7E6',
    accent:  '#C9A227',
    accent2: '#F28C28',
    paper:   '#FFF7E6',
    gold:    '#C9A227',
    navy:    '#0B2447',
    cream:   '#FFF7E6',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Sans Gurmukhi',
  },

  fontPairs: [
    { id: 'classic', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'elegant', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
  ],

  fields: [
    {
      key: 'waheguruLine',
      label: 'Sacred line (optional)',
      default: 'ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ',
      lang: 'pa',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Granthi before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Anand Karaj',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Harpreet Singh',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Jasleen Kaur',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 18th October 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '10:00 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Gurdwara Sri Guru Singh Sabha, Greater Kailash, New Delhi',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'S. Gurmukh Singh & Family',
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

  render(values, palette, helpers) {
    const W = 1080;
    const H = 1500;
    const v = values || {};

    const fitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML = helpers?.escapeXML || coreEscapeXML;

    // Palette resolution
    const pal = { ...this.palette, ...palette };
    const bg = pal.bg || '#0B2447';
    const gold = pal.gold || pal.accent || '#C9A227';
    const cream = pal.cream || pal.paper || pal.ink || '#FFF7E6';

    // Font resolution based on fontPair
    const activePair = this.fontPairs.find((p) => p.id === v.fontPair) || this.fontPairs[0];
    const displayFont = activePair.display;
    const bodyFont    = activePair.body;
    const scriptFont  = this.fonts.script || 'Cormorant Garamond';
    const nativeFont  = this.fonts.native || 'Noto Sans Gurmukhi';

    // ── 1. Full Background ──────────────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${bg}"/>`;

    // ── 2. Small gold 6-pointed star grid (25×32 grid, r=8, 3% opacity) ──
    const starGrid = generateStarGrid(W, H, gold);

    // ── 3. Thin double gold frame ───────────────────────────────────
    // Outer at 36px inset (3px stroke), inner at 52px inset (1px stroke), both rx=4
    const frame = `
      <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none"
            stroke="${gold}" stroke-width="3" rx="4"/>
      <rect x="52" y="52" width="${W - 104}" height="${H - 104}" fill="none"
            stroke="${gold}" stroke-width="1" rx="4"/>
    `;

    // ── 4. Khanda Watermark (centered at W/2, H*0.55 = 540, 825) ─────
    // Height ≈ 400px, fill cream #FFF7E6 at 8% opacity
    const khandaWatermark = renderKhandaWatermark(W / 2, H * 0.55, cream, bg);

    // ── 5. ੴ Emblem (72px gold, centered at y ≈ 220) ───────────────
    const ikOnkarSVG = fitText('ੴ', {
      x: W / 2,
      y: 220,
      maxWidth: 240,
      maxSize: 72,
      fontFamily: nativeFont,
      fontWeight: 'normal',
      fill: gold,
      textAnchor: 'middle',
    });

    // ── 6. Waheguru Line (30px cream at 80% opacity, centered at y ≈ 320)
    const waheguruEnabled = v.waheguruLine__enabled !== false && v.sacredLine__enabled !== false;
    const waheguruRaw = v.waheguruLine !== undefined ? v.waheguruLine : v.sacredLine;
    const waheguruText = waheguruRaw !== undefined ? waheguruRaw : 'ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ';
    const waheguruSVG = (waheguruEnabled && waheguruText && waheguruText.trim()) ? fitText(waheguruText.trim(), {
      x: W / 2,
      y: 320,
      maxWidth: 860,
      maxSize: 30,
      fontFamily: nativeFont,
      fontWeight: 'normal',
      fill: cream,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.8"',
    }) : '';

    // ── 7. Event Type (Jost 22px letter-spaced, gold, y ≈ 390) ──────
    const eventTypeStr = String(v.eventType || 'Anand Karaj').toUpperCase();
    const eventTypeSVG = fitText(eventTypeStr, {
      x: W / 2,
      y: 390,
      maxWidth: 800,
      maxSize: 22,
      fontFamily: bodyFont,
      fontWeight: '500',
      fill: gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    // ── 8. Thin gold rule at y ≈ 420 ────────────────────────────────
    const thinRule = `
      <line x1="${W / 2 - 180}" y1="420" x2="${W / 2 + 180}" y2="420"
            stroke="${gold}" stroke-width="1.5" stroke-linecap="round"/>
      <polygon points="${W / 2},416 ${W / 2 + 4},420 ${W / 2},424 ${W / 2 - 4},420" fill="${gold}"/>
      <circle cx="${W / 2 - 180}" cy="420" r="2.5" fill="${gold}"/>
      <circle cx="${W / 2 + 180}" cy="420" r="2.5" fill="${gold}"/>
    `;

    // ── 9. Groom's Name (Playfair Display bold, cream, y ≈ 530, maxWidth 700) ──
    const groomSVG = fitText(v.groomName || 'Harpreet Singh', {
      x: W / 2,
      y: 530,
      maxWidth: 700,
      maxSize: 64,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: cream,
      textAnchor: 'middle',
    });

    // ── 10. '&' Ampersand (Playfair italic 54px, gold, y ≈ 630) ────
    const ampersandSVG = fitText('&', {
      x: W / 2,
      y: 630,
      maxWidth: 160,
      maxSize: 54,
      fontFamily: displayFont,
      fontWeight: 'normal',
      fill: gold,
      textAnchor: 'middle',
      extraAttrs: 'font-style="italic"',
    });

    // ── 11. Bride's Name (Playfair Display bold, cream, y ≈ 730, maxWidth 700) ──
    const brideSVG = fitText(v.brideName || 'Jasleen Kaur', {
      x: W / 2,
      y: 730,
      maxWidth: 700,
      maxSize: 64,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: cream,
      textAnchor: 'middle',
    });

    // ── 12. Double gold rule at y ≈ 790 ─────────────────────────────
    const doubleRule = `
      <line x1="${W / 2 - 200}" y1="788" x2="${W / 2 + 200}" y2="788"
            stroke="${gold}" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="${W / 2 - 160}" y1="793" x2="${W / 2 + 160}" y2="793"
            stroke="${gold}" stroke-width="1" stroke-linecap="round"/>
      <polygon points="${W / 2},786 ${W / 2 + 5},790.5 ${W / 2},795 ${W / 2 - 5},790.5" fill="${gold}"/>
      <circle cx="${W / 2 - 200}" cy="788" r="2" fill="${gold}"/>
      <circle cx="${W / 2 + 200}" cy="788" r="2" fill="${gold}"/>
    `;

    // ── 13. Date (Cormorant Garamond 36px, cream, y ≈ 870) ─────────
    const dateSVG = fitText(v.date || 'Sunday, 18th October 2026', {
      x: W / 2,
      y: 870,
      maxWidth: 800,
      maxSize: 36,
      fontFamily: scriptFont,
      fontWeight: '600',
      fill: cream,
      textAnchor: 'middle',
    });

    // ── 14. Time (Jost 28px, cream opacity 0.75, y ≈ 925) ──────────
    const timeSVG = fitText(v.time || '10:00 AM onwards', {
      x: W / 2,
      y: 925,
      maxWidth: 800,
      maxSize: 28,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: cream,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75"',
    });

    // ── 15. Venue (Cormorant Garamond 34px, cream, y ≈ 1000) ───────
    const venueSVG = fitText(v.venue || 'Gurdwara Sri Guru Singh Sabha, Greater Kailash, New Delhi', {
      x: W / 2,
      y: 1000,
      maxWidth: 800,
      maxSize: 34,
      fontFamily: scriptFont,
      fontWeight: '500',
      fill: cream,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // ── 16. Hosted By (Cormorant Garamond 28px, cream opacity 0.7, y ≈ 1150) ──
    const hostedByEnabled = v.hostedBy__enabled !== false;
    const hostedByText = v.hostedBy || 'S. Gurmukh Singh & Family';
    const hostedBySVG = (hostedByEnabled && hostedByText && hostedByText.trim()) ? fitText(hostedByText.trim(), {
      x: W / 2,
      y: 1150,
      maxWidth: 760,
      maxSize: 28,
      fontFamily: scriptFont,
      fontWeight: '500',
      fill: cream,
      textAnchor: 'middle',
      lineHeight: 1.35,
      extraAttrs: 'opacity="0.7"',
    }) : '';

    // ── 17. RSVP (if present, cream opacity 0.6, y ≈ 1340) ─────────
    const rsvpEnabled = v.rsvp__enabled !== false;
    const rsvpText = v.rsvp ? v.rsvp.trim() : '';
    const rsvpSVG = (rsvpEnabled && rsvpText) ? fitText(rsvpText, {
      x: W / 2,
      y: 1340,
      maxWidth: 760,
      maxSize: 24,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: cream,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.6"',
    }) : '';

    return `
      <!-- Background -->
      ${bgRect}

      <!-- Star Grid Texture -->
      ${starGrid}

      <!-- Double Gold Frame -->
      ${frame}

      <!-- Khanda Watermark -->
      ${khandaWatermark}

      <!-- Header: Ik Onkar -->
      ${ikOnkarSVG}

      <!-- Sacred Blessing -->
      ${waheguruSVG}

      <!-- Event Type -->
      ${eventTypeSVG}

      <!-- Thin Gold Rule -->
      ${thinRule}

      <!-- Groom's Name -->
      ${groomSVG}

      <!-- Ampersand -->
      ${ampersandSVG}

      <!-- Bride's Name -->
      ${brideSVG}

      <!-- Double Gold Rule -->
      ${doubleRule}

      <!-- Date, Time, Venue -->
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}

      <!-- Hosted By -->
      ${hostedBySVG}

      <!-- RSVP -->
      ${rsvpSVG}
    `;
  },
};

/**
 * Generates a 25×32 regular hexagram (6-pointed star) grid across the canvas.
 * Outer radius R=8, at 3% opacity.
 */
function generateStarGrid(W, H, gold) {
  const cols = 25;
  const rows = 32;
  const colStep = W / cols; // 43.2
  const rowStep = H / rows; // 46.875
  const R = 8;
  const w = 6.928; // R * cos(30°)
  const h = 4.0;   // R * sin(30°)

  const paths = [];
  for (let r = 0; r < rows; r++) {
    const cy = ((r + 0.5) * rowStep).toFixed(2);
    for (let c = 0; c < cols; c++) {
      const cx = ((c + 0.5) * colStep).toFixed(2);
      paths.push(
        `M ${cx} ${(cy - R).toFixed(2)} L ${(Number(cx) + w).toFixed(2)} ${(Number(cy) + h).toFixed(2)} L ${(Number(cx) - w).toFixed(2)} ${(Number(cy) + h).toFixed(2)} Z ` +
        `M ${cx} ${(Number(cy) + R).toFixed(2)} L ${(Number(cx) + w).toFixed(2)} ${(Number(cy) - h).toFixed(2)} L ${(Number(cx) - w).toFixed(2)} ${(Number(cy) - h).toFixed(2)} Z`
      );
    }
  }
  return `<path d="${paths.join(' ')}" fill="${gold}" opacity="0.03"/>`;
}

/**
 * Renders the Sikh Khanda emblem as a subtle watermark:
 * - Double-edged straight central sword (khanda)
 * - Chakkar (circular quoit / ring) encircling center
 * - Two flanking curved kirpans (swords) with S-curves meeting at base
 * Rendered at ~400px height with 8% opacity.
 */
function renderKhandaWatermark(cx, cy, cream, bg) {
  // 1. Central double-edged straight sword (khanda)
  // Symmetrical silhouette pointed at top (y = -200) and bottom (y = 185) with crossguard
  const centralSword = `
    <path d="M 0,-200
             L 16,-110 Q 18,-40 16,30 L 10,76
             L 24,76 Q 26,76 26,80 Q 26,84 22,84
             L 6,84 L 6,142
             L 14,142 Q 16,142 16,146 Q 16,150 12,150
             L 5,150 L 0,185 L -5,150 L -12,150
             Q -16,150 -16,146 Q -16,142 -14,142
             L -6,142 L -6,84
             L -22,84 Q -26,84 -26,80 Q -26,76 -24,76
             L -10,76 L -16,30 Q -18,-40 -16,-110 Z"/>
    <line x1="0" y1="-185" x2="0" y2="70" stroke="${bg}" stroke-width="2" opacity="0.4"/>
  `;

  // 2. Chakkar (quoit/ring)
  const chakkar = `
    <path d="M 0,-92 A 92 92 0 1 0 0,92 A 92 92 0 1 0 0,-92
             M 0,-72 A 72 72 0 1 1 0,72 A 72 72 0 1 1 0,-72 Z"
          fill-rule="evenodd"/>
  `;

  // 3. Flanking curved kirpans
  // Left Kirpan path
  const kirpanLeft = `
    <path d="M -56,-108
             C -100,-75 -152,-20 -152,25
             C -152,80 -125,130 -58,168
             L -64,174 L -44,180 L -42,174
             L -30,188 L -22,180
             L -16,192 L -8,185 L -14,178
             L -32,166
             C -80,132 -118,80 -118,25
             C -118,-30 -85,-75 -56,-108 Z"/>
  `;

  // Right Kirpan (mirrored across vertical axis)
  const kirpanRight = `
    <g transform="scale(-1, 1)">
      ${kirpanLeft}
    </g>
  `;

  return `
    <g id="khanda-watermark" transform="translate(${cx}, ${cy})"
       fill="${cream}" opacity="0.08">
      ${chakkar}
      ${centralSword}
      ${kirpanLeft}
      ${kirpanRight}
    </g>
  `;
}
