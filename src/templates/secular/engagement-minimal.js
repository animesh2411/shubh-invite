/**
 * Secular / Modern – Minimalist Engagement & Save-the-Date ("Aura Modern Minimal")
 *
 * Contemporary Pinterest editorial engagement invitation.
 * Features an asymmetrical terracotta arch silhouette, minimalist single-line
 * interlinked rings, warm oatmeal linen paper, and sophisticated Fraunces serif typography.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'secular-engagement-minimal',
  tradition: 'secular',
  occasion: 'engagement',
  name: 'Aura Modern Minimal',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#F7F3EE', // Oatmeal Alabaster
    ink:     '#1A1715', // Warm Black Ink
    accent:  '#8E5945', // Sienna Terracotta
    accent2: '#C4A265', // Warm Champagne Bronze
    gold:    '#C4A265',
    cream:   '#FFFDFB',
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
      label: 'Invitation header',
      default: 'WE ARE EXCITED TO ANNOUNCE',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'OUR ENGAGEMENT & SAVE THE DATE',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'partner1',
      label: "First Partner's name",
      default: 'Maya Sinclair',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'partner2',
      label: "Second Partner's name",
      default: 'Liam Sterling',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'celebrationLine',
      label: 'Celebration Subtitle',
      default: 'Celebrate with us over sunset cocktails and music',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 12th September 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Six in the evening',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Rooftop Terraces, Soho House',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'Together with their families',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP at mayaandliam.com/celebrate',
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

    // ── 1. Warm Oatmeal Background ────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Architectural Minimal Arch & Sunray Silhouette ─────────
    const archArt = `
      <g opacity="0.95">
        <!-- Offset Terracotta Arch Wash -->
        <path d="M 160 880
                 L 160 520
                 A 380 380 0 0 1 920 520
                 L 920 880 Z"
              fill="${palette.accent}" fill-opacity="0.1"/>
        <!-- Fine Accent Arch Stroke -->
        <path d="M 175 870
                 L 175 530
                 A 365 365 0 0 1 905 530
                 L 905 870"
              fill="none" stroke="${palette.accent}" stroke-width="1.2" opacity="0.6"/>
        <!-- Hairline Outer Poster Frame -->
        <rect x="46" y="46" width="${W - 92}" height="${H - 92}" fill="none"
              stroke="${palette.ink}" stroke-width="0.75" opacity="0.3"/>
      </g>
    `;

    // ── 3. Line-Art Intertwined Rings & Celestial Dot Motif ────────
    const motifY = 220;
    const motifArt = `
      <g transform="translate(${W / 2}, ${motifY})">
        <!-- Interlocked Modern Rings -->
        <ellipse cx="-16" cy="0" rx="24" ry="24" fill="none"
                 stroke="${palette.gold}" stroke-width="2"/>
        <ellipse cx="16" cy="0" rx="24" ry="24" fill="none"
                 stroke="${palette.accent}" stroke-width="2"/>
        <!-- Tiny Solitaire Gem Point -->
        <circle cx="-16" cy="-24" r="3.5" fill="${palette.cream || '#FFFFFF'}" stroke="${palette.gold}" stroke-width="1.5"/>
        <circle cx="16" cy="-24" r="3" fill="${palette.accent}"/>
        <!-- Subtle Radiating Rays -->
        <g stroke="${palette.gold}" stroke-width="1" opacity="0.6">
          <line x1="0" y1="-38" x2="0" y2="-48"/>
          <line x1="-12" y1="-36" x2="-18" y2="-44"/>
          <line x1="12" y1="-36" x2="18" y2="-44"/>
        </g>
      </g>
    `;

    // ── 4. Typography Hierarchy ────────────────────────────────────
    const headerSVG = svgFitText((v.headerLine || 'WE ARE EXCITED TO ANNOUNCE').toUpperCase(), {
      x: W / 2,
      y: 330,
      maxWidth: 720,
      maxSize: 14,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5" opacity="0.75"',
    });

    const eventSVG = svgFitText((v.eventType || 'OUR ENGAGEMENT & SAVE THE DATE').toUpperCase(), {
      x: W / 2,
      y: 380,
      maxWidth: 760,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const partner1SVG = svgFitText(v.partner1 || 'Maya Sinclair', {
      x: W / 2,
      y: 495,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="585" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="44" font-weight="300" fill="${palette.accent}">&amp;</text>
    `;

    const partner2SVG = svgFitText(v.partner2 || 'Liam Sterling', {
      x: W / 2,
      y: 675,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const celebrationSVG = svgFitText(v.celebrationLine || 'Celebrate with us over sunset cocktails and music', {
      x: W / 2,
      y: 745,
      maxWidth: 700,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // Minimalist Divider Line
    const divider = `
      <g transform="translate(${W / 2}, 800)" opacity="0.5">
        <line x1="-140" y1="0" x2="-25" y2="0" stroke="${palette.ink}" stroke-width="0.75"/>
        <line x1="25" y1="0" x2="140" y2="0" stroke="${palette.ink}" stroke-width="0.75"/>
        <circle cx="0" cy="0" r="3" fill="${palette.accent}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Saturday, 12th September 2026', {
      x: W / 2,
      y: 870,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Six in the evening', {
      x: W / 2,
      y: 925,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Rooftop Terraces, Soho House', {
      x: W / 2,
      y: 1000,
      maxWidth: 740,
      maxSize: 28,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Hosted By
    const hostedSVG = svgFitText(v.hostedBy || 'Together with their families', {
      x: W / 2,
      y: 1120,
      maxWidth: 600,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    // RSVP
    const rsvpSVG = v.rsvp ? svgFitText(v.rsvp, {
      x: W / 2,
      y: 1220,
      maxWidth: 650,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75" letter-spacing="1"',
    }) : '';

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%">
        <defs>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,300&amp;family=Jost:wght@300;400;500;600&amp;family=Playfair+Display:ital,wght@0,500;0,600;1,400&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${archArt}
        ${motifArt}
        ${headerSVG}
        ${eventSVG}
        ${partner1SVG}
        ${andSVG}
        ${partner2SVG}
        ${celebrationSVG}
        ${divider}
        ${dateSVG}
        ${timeSVG}
        ${venueSVG}
        ${hostedSVG}
        ${rsvpSVG}
      </svg>
    `.trim();
  },
};
