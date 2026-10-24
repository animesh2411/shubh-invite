/**
 * Secular / Modern – Minimal Arch ("Modern Duotone")
 *
 * Contemporary, editorial invitation featuring an architectural arch colour block,
 * refined dual-tone terracotta and warm oatmeal paper, elegant Fraunces serif headlines,
 * and clean Swiss-influenced modernist typography.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'secular-modern-arch',
  tradition: 'secular',
  occasion: 'wedding',
  name: 'Modern Minimal Arch',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#F5EFEB', // Oatmeal Linen
    ink:     '#1F2022', // Charcoal Ink
    accent:  '#A25844', // Terracotta Clay
    accent2: '#C9A86A', // Champagne Gold
    gold:    '#C9A86A',
    cream:   '#FFFDF8',
  },

  fonts: {
    display: 'Fraunces',
    body:    'Jost',
    script:  'Fraunces',
    native:  'Fraunces',
  },

  fontPairs: [
    { id: 'fraunces', label: 'Fraunces + Jost', display: 'Fraunces', body: 'Jost' },
    { id: 'classic',  label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
  ],

  fields: [
    {
      key: 'headerLine',
      label: 'Invitation line',
      default: 'TOGETHER WITH THEIR CHERISHED FAMILIES',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'INVITE YOU TO CELEBRATE THEIR WEDDING',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'partner1',
      label: "First Partner's name",
      default: 'Aria Montgomery',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'partner2',
      label: "Second Partner's name",
      default: 'Julian Vance',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 19th September 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Four in the afternoon',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Glasshouse & Botanical Terraces, Brooklyn',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'receptionLine',
      label: 'Reception Note',
      default: 'Dinner, drinks & dancing under the stars to follow',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'Kindly RSVP by 1st August at ariaandjulian.com',
      lang: 'en',
      multiline: false,
      optional: true,
    },
  ],

  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const svgFitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML = helpers?.escapeXML || coreEscapeXML;
    const v = values || {};

    const activePair = (this?.fontPairs || []).find((p) => p.id === v.fontPair) || (this?.fontPairs || [])[0] || {};
    const displayFont = activePair.display || this?.fonts?.display || 'Fraunces';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';

    // ── 1. Oatmeal Linen Background ────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Architectural Terracotta Arch Color-Block ───────────────
    // An elegant rounded arch rising in the top-center
    const archBlock = `
      <g opacity="0.95">
        <!-- Outer Deboss Arch Line -->
        <path d="M 160 880
                 L 160 520
                 A 380 380 0 0 1 920 520
                 L 920 880 Z"
              fill="none" stroke="${palette.accent}" stroke-width="1.5" opacity="0.5"/>
        <!-- Inner Terracotta Solid Arch -->
        <path d="M 180 860
                 L 180 520
                 A 360 360 0 0 1 900 520
                 L 900 860 Z"
              fill="${palette.accent}" fill-opacity="0.12"/>
      </g>
    `;

    // ── 3. Subtle Hairline Frame ───────────────────────────────────
    const frame = `
      <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="none"
            stroke="${palette.ink}" stroke-width="0.75" opacity="0.25"/>
    `;

    // ── 4. Sun & Moon Minimal Celestial Orbit at Apex ──────────────
    const orbitMotif = `
      <g transform="translate(${W / 2}, 240)" opacity="0.85">
        <!-- Orbital ring -->
        <circle r="48" fill="none" stroke="${palette.gold}" stroke-width="1" stroke-dasharray="3 3"/>
        <!-- Radiant central sphere -->
        <circle r="14" fill="${palette.accent}"/>
        <!-- Orbiting gold satellite -->
        <circle cx="34" cy="-34" r="5" fill="${palette.gold}"/>
      </g>
    `;

    // ── 5. Clean Editorial Typography Hierarchy ────────────────────
    const headerSVG = svgFitText((v.headerLine || 'TOGETHER WITH THEIR CHERISHED FAMILIES').toUpperCase(), {
      x: W / 2,
      y: 350,
      maxWidth: 700,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5" opacity="0.7"',
    });

    const eventSVG = svgFitText((v.eventType || 'INVITE YOU TO CELEBRATE THEIR WEDDING').toUpperCase(), {
      x: W / 2,
      y: 405,
      maxWidth: 720,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const partner1SVG = svgFitText(v.partner1 || 'Aria Montgomery', {
      x: W / 2,
      y: 540,
      maxWidth: 740,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="635" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="44" font-weight="300" fill="${palette.accent}">&amp;</text>
    `;

    const partner2SVG = svgFitText(v.partner2 || 'Julian Vance', {
      x: W / 2,
      y: 730,
      maxWidth: 740,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 830)" opacity="0.6">
        <line x1="-120" y1="0" x2="120" y2="0" stroke="${palette.ink}" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="3" fill="${palette.accent}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Saturday, 19th September 2026', {
      x: W / 2,
      y: 920,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Four in the afternoon', {
      x: W / 2,
      y: 980,
      maxWidth: 700,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    const venueSVG = svgFitText(v.venue || 'The Glasshouse & Botanical Terraces, Brooklyn', {
      x: W / 2,
      y: 1055,
      maxWidth: 720,
      maxSize: 30,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const receptionSVG = v.receptionLine ? svgFitText(v.receptionLine, {
      x: W / 2,
      y: 1170,
      maxWidth: 680,
      maxSize: 22,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    }) : '';

    const rsvpSVG = v.rsvp ? svgFitText(v.rsvp, {
      x: W / 2,
      y: 1330,
      maxWidth: 640,
      maxSize: 20,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75" letter-spacing="1"',
    }) : '';

    return `
      ${bg}
      ${frame}
      ${archBlock}
      ${orbitMotif}
      ${headerSVG}
      ${eventSVG}
      ${partner1SVG}
      ${andSVG}
      ${partner2SVG}
      ${dividerSVG}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${receptionSVG}
      ${rsvpSVG}
    `;
  },
};
