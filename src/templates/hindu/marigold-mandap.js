/**
 * Hindu – Marigold Mandap (Placeholder for Phase 1)
 *
 * Phase 1: Establishes the full data contract (fields, palette, fonts).
 * Art is a respectful colour-block placeholder; full artwork in Phase 3.
 */

import { svgText, escapeXML } from '../../core/renderer.js';

export default {
  id: 'hindu-wedding-marigold',
  tradition: 'hindu',
  occasion: 'wedding',
  name: 'Marigold Mandap',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FFF4DC',
    ink:     '#2A1E1A',
    accent:  '#7A1F2B',
    accent2: '#F2A900',
    paper:   '#FFF9EE',
    saffron: '#E8590C',
    gold:    '#C9962B',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Tiro Devanagari Hindi',
  },

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred line (optional)',
      default: '॥ श्री गणेशाय नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or priest before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Wedding Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Arjun Sharma',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Priya Mehta',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 15th February 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '11:00 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Taj Lands End, Bandra, Mumbai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Sharma & Mehta Families',
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

  /** Phase 1 placeholder render — colour-blocked structure with typography. */
  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const { svgText, escapeXML } = helpers;
    const v = values;

    // ── Marigold colour band at top ───────────────────────────
    const topBand = `
      <rect x="0" y="0" width="${W}" height="240" fill="${palette.accent2}"/>
      <!-- Marigold garland placeholder: scalloped arcs -->
      ${Array.from({ length: 12 }, (_, i) => {
        const cx = 45 + i * 90;
        return `<circle cx="${cx}" cy="200" r="38" fill="${palette.saffron}" opacity="0.85"/>
                <circle cx="${cx}" cy="200" r="25" fill="${palette.accent2}"/>
                <circle cx="${cx}" cy="200" r="12" fill="${palette.gold}"/>`;
      }).join('')}
      <!-- Stem / leaf row -->
      <rect x="0" y="235" width="${W}" height="18" fill="${palette.gold}"/>
    `;

    // ── Paper background ──────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── Corner paisley placeholders (simple diamonds) ─────────
    const corners = `
      <polygon points="0,258 60,258 0,318" fill="${palette.gold}" opacity="0.5"/>
      <polygon points="${W},258 ${W-60},258 ${W},318" fill="${palette.gold}" opacity="0.5"/>
      <polygon points="0,${H-258} 60,${H-258} 0,${H-318}" fill="${palette.gold}" opacity="0.5"/>
      <polygon points="${W},${H-258} ${W-60},${H-258} ${W},${H-318}" fill="${palette.gold}" opacity="0.5"/>
    `;

    // ── Gold border frame ─────────────────────────────────────
    const frame = `
      <rect x="40" y="258" width="${W-80}" height="${H-296}" fill="none"
            stroke="${palette.gold}" stroke-width="3" rx="8"/>
      <rect x="52" y="270" width="${W-104}" height="${H-320}" fill="none"
            stroke="${palette.gold}" stroke-width="1" rx="6" stroke-dasharray="8 4"/>
    `;

    // ── Kalash / diya placeholder (centred circle motif) ─────
    const motif = `
      <g transform="translate(${W/2}, 420)">
        <!-- Outer ring -->
        <circle r="80" fill="none" stroke="${palette.gold}" stroke-width="3"/>
        <circle r="68" fill="none" stroke="${palette.accent2}" stroke-width="2"/>
        <!-- Diya body -->
        <ellipse cx="0" cy="20" rx="50" ry="28" fill="${palette.saffron}" opacity="0.9"/>
        <!-- Flame -->
        <ellipse cx="0" cy="-28" rx="14" ry="24" fill="${palette.accent2}"/>
        <ellipse cx="0" cy="-38" rx="8" ry="16" fill="#FFF0A0" opacity="0.9"/>
        <!-- Spout -->
        <path d="M 38 10 Q 60 -5 70 8" fill="none" stroke="${palette.saffron}" stroke-width="5" stroke-linecap="round"/>
        <!-- Petals around diya -->
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 - 90) * Math.PI / 180;
          const px = Math.cos(angle) * 92;
          const py = Math.sin(angle) * 92;
          return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="10" fill="${palette.accent2}" opacity="0.7"/>`;
        }).join('')}
      </g>
    `;

    // ── Sacred line ───────────────────────────────────────────
    const sacredLineSVG = v.sacredLine ? svgText(v.sacredLine, {
      x: W / 2, y: 310,
      maxWidth: W - 160, fontSize: 36,
      fontFamily: 'Tiro Devanagari Hindi, serif',
      fontWeight: 'normal',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    // ── Event type ────────────────────────────────────────────
    const eventSVG = svgText(v.eventType || 'Wedding Invitation', {
      x: W / 2, y: 568,
      maxWidth: W - 160, fontSize: 32,
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fill: palette.gold,
      textAnchor: 'middle',
      letterSpacing: 6,
    });

    // ── Names ─────────────────────────────────────────────────
    const groomSVG = svgText(v.groomName || 'Arjun Sharma', {
      x: W / 2, y: 660,
      maxWidth: W - 160, fontSize: 80,
      fontFamily: 'Playfair Display, serif',
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const ampersandSVG = `
      <text x="${W/2}" y="760" text-anchor="middle"
            font-family="Playfair Display, serif" font-style="italic"
            font-size="60" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgText(v.brideName || 'Priya Mehta', {
      x: W / 2, y: 860,
      maxWidth: W - 160, fontSize: 80,
      fontFamily: 'Playfair Display, serif',
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // ── Divider ───────────────────────────────────────────────
    const divider = `
      <line x1="180" y1="910" x2="${W-180}" y2="910"
            stroke="${palette.gold}" stroke-width="1.5"/>
      <circle cx="${W/2}" cy="910" r="5" fill="${palette.gold}"/>
      <circle cx="${W/2 - 40}" cy="910" r="3" fill="${palette.gold}" opacity="0.5"/>
      <circle cx="${W/2 + 40}" cy="910" r="3" fill="${palette.gold}" opacity="0.5"/>
    `;

    // ── Date, time, venue ─────────────────────────────────────
    const dateSVG = svgText(v.date || 'Sunday, 15th February 2026', {
      x: W / 2, y: 970,
      maxWidth: W - 200, fontSize: 36,
      fontFamily: 'Cormorant Garamond, serif',
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgText(v.time || '11:00 AM onwards', {
      x: W / 2, y: 1022,
      maxWidth: W - 200, fontSize: 30,
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const venueSVG = svgText(v.venue || 'Taj Lands End, Bandra, Mumbai', {
      x: W / 2, y: 1090,
      maxWidth: W - 200, fontSize: 34,
      fontFamily: 'Cormorant Garamond, serif',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.4,
    });

    // ── Hosted by ─────────────────────────────────────────────
    const hostedSVG = v.hostedBy ? `
      <text x="${W/2}" y="1200" text-anchor="middle"
            font-family="Jost, sans-serif" font-size="24" fill="${palette.ink}" opacity="0.6">
        hosted by
      </text>
      ${svgText(v.hostedBy, {
        x: W / 2, y: 1244,
        maxWidth: W - 200, fontSize: 30,
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.4,
      })}
    ` : '';

    // ── RSVP ──────────────────────────────────────────────────
    const rsvpSVG = v.rsvp ? svgText(`RSVP: ${v.rsvp}`, {
      x: W / 2, y: 1360,
      maxWidth: W - 200, fontSize: 26,
      fontFamily: 'Jost, sans-serif',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    }) : '';

    // ── Bottom band ───────────────────────────────────────────
    const bottomBand = `
      <rect x="0" y="${H-80}" width="${W}" height="80" fill="${palette.accent2}"/>
      <rect x="0" y="${H-82}" width="${W}" height="4" fill="${palette.gold}"/>
      ${Array.from({ length: 12 }, (_, i) => {
        const cx = 45 + i * 90;
        return `<circle cx="${cx}" cy="${H-45}" r="28" fill="${palette.saffron}" opacity="0.75"/>
                <circle cx="${cx}" cy="${H-45}" r="16" fill="${palette.accent2}"/>`;
      }).join('')}
    `;

    return `
      ${bg}
      ${topBand}
      ${corners}
      ${frame}
      ${motif}
      ${sacredLineSVG}
      ${eventSVG}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${divider}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
      ${bottomBand}
    `;
  },
};
