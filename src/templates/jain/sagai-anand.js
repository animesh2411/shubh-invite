/**
 * Jain – Sagai & Prarthana Ceremony ("Sagai Anand Lotus")
 *
 * Auspicious, serene Pinterest-inspired Jain engagement invitation.
 * Features an ivory pearl tone, sacred Navkar mantra blessings,
 * a graceful blooming lotus motif cradling interlinked rings, and temple gold filigree.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'jain-engagement-sagai',
  tradition: 'jain',
  occasion: 'engagement',
  name: 'Sagai Anand Lotus',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FFFBF5', // Warm Pearl Ivory
    ink:     '#301518', // Deep Maroon Silk Ink
    accent:  '#8E2434', // Sacred Crimson
    accent2: '#DCA048', // Temple Sandalwood Gold
    gold:    '#DCA048',
    cream:   '#FFFDF9',
    peach:   '#F8D7C4',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'devanagari', label: 'Noto + Jost',   display: 'Noto Serif Devanagari', body: 'Jost' },
  ],

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred Invocation',
      default: '॥ ॐ नमो अरिहंताणं ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Auspicious Navkar invocation. Verify with family or Muni.',
    },
    {
      key: 'mottoLine',
      label: 'Ahimsa motto',
      default: '॥ परस्पर उपग्रहो जीवानाम् ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
    },
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'WITH THE DIVINE BLESSINGS OF JINENDRA DEV',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'CORDIALLY INVITE YOU TO CELEBRATE THE SAGAI CEREMONY OF',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Aarav Shah',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Meera Kothari',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'ceremonyLine',
      label: 'Ceremony subtitle',
      default: 'Ring Ceremony, Prarthana & Preeti Bhojan',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Friday, 18th December 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '10:30 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Shri Parshwanath Bhavan, Ahmedabad',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Shah & Kothari Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP: +91 98250 11111 / +91 98250 22222',
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
    const displayFont = activePair.display || this?.fonts?.display || 'Cormorant Garamond';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';
    const nativeFont = this?.fonts?.native || 'Noto Serif Devanagari';

    // ── 1. Pearl Ivory Background ──────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Delicate Temple Arched Frame ───────────────────────────
    const frame = `
      <g>
        <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
              stroke="${palette.gold}" stroke-width="2" rx="12"/>
        <rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none"
              stroke="${palette.accent}" stroke-width="0.75" stroke-dasharray="4 4" rx="8" opacity="0.4"/>
      </g>
    `;

    // ── 3. Lotus Blossom with Interlinked Rings Centerpiece ────────
    const lotusY = 240;
    const lotusArt = `
      <g transform="translate(${W / 2}, ${lotusY})">
        <!-- Fanned Lotus Petals -->
        <g fill="${palette.peach || '#F8D7C4'}" stroke="${palette.gold}" stroke-width="1" opacity="0.85">
          <!-- Outer Petals -->
          <ellipse cx="-48" cy="18" rx="28" ry="12" transform="rotate(-35, -48, 18)"/>
          <ellipse cx="48" cy="18" rx="28" ry="12" transform="rotate(35, 48, 18)"/>
          <ellipse cx="-32" cy="6" rx="26" ry="14" transform="rotate(-18, -32, 6)"/>
          <ellipse cx="32" cy="6" rx="26" ry="14" transform="rotate(18, 32, 6)"/>
          <!-- Central Petal -->
          <ellipse cx="0" cy="0" rx="20" ry="26" fill="${palette.accent}" fill-opacity="0.15"/>
        </g>
        <!-- Interlinked Engagement Rings -->
        <ellipse cx="-15" cy="20" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.4"/>
        <ellipse cx="15" cy="20" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.4"/>
        <!-- Ring Gem Highlight -->
        <circle cx="-15" cy="-2" r="4" fill="${palette.cream || '#FFFFFF'}" stroke="${palette.gold}" stroke-width="1.2"/>
      </g>
    `;

    // ── 4. Corner Auspicious Paisley Motifs ─────────────────────────
    const cornerPaisleys = `
      <g stroke="${palette.gold}" fill="none" stroke-width="1" opacity="0.6">
        <path d="M 68 70 Q 110 80 130 120 Q 140 160 170 170"/>
        <circle cx="130" cy="120" r="3" fill="${palette.accent}" stroke="none"/>
        <path d="M ${W - 68} 70 Q ${W - 110} 80 ${W - 130} 120 Q ${W - 140} 160 ${W - 170} 170"/>
        <circle cx="${W - 130}" cy="120" r="3" fill="${palette.accent}" stroke="none"/>
      </g>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 110,
      maxWidth: 550,
      maxSize: 32,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="2"',
    }) : '';

    const mottoSVG = v.mottoLine ? svgFitText(v.mottoLine, {
      x: W / 2,
      y: 155,
      maxWidth: 500,
      maxSize: 18,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '400',
      fill: palette.gold,
      textAnchor: 'middle',
    }) : '';

    const headerSVG = svgFitText((v.headerLine || 'WITH THE DIVINE BLESSINGS OF JINENDRA DEV').toUpperCase(), {
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

    const eventSVG = svgFitText((v.eventType || 'CORDIALLY INVITE YOU TO CELEBRATE THE SAGAI CEREMONY OF').toUpperCase(), {
      x: W / 2,
      y: 380,
      maxWidth: 760,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const groomSVG = svgFitText(v.groomName || 'Aarav Shah', {
      x: W / 2,
      y: 495,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="585" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="46" font-weight="300" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Meera Kothari', {
      x: W / 2,
      y: 675,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const ceremonySVG = svgFitText(v.ceremonyLine || 'Ring Ceremony, Prarthana & Preeti Bhojan', {
      x: W / 2,
      y: 745,
      maxWidth: 680,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Divider Line with Lotus Bud
    const divider = `
      <g transform="translate(${W / 2}, 800)" opacity="0.6">
        <line x1="-160" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <circle cx="0" cy="0" r="4.5" fill="${palette.accent}"/>
        <circle cx="-14" cy="0" r="2.5" fill="${palette.gold}"/>
        <circle cx="14" cy="0" r="2.5" fill="${palette.gold}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Friday, 18th December 2026', {
      x: W / 2,
      y: 870,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '10:30 AM onwards', {
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
    const venueSVG = svgFitText(v.venue || 'Shri Parshwanath Bhavan, Ahmedabad', {
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
    const hostedLabelSVG = svgFitText('CELEBRATIONS HOSTED BY', {
      x: W / 2,
      y: 1105,
      maxWidth: 500,
      maxSize: 13,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const hostedByLines = (v.hostedBy || 'The Shah & Kothari Families').split('\n');
    const hostedBySVG = hostedByLines.map((line, idx) => svgFitText(line, {
      x: W / 2,
      y: 1150 + idx * 36,
      maxWidth: 700,
      maxSize: 26,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
    })).join('\n');

    // RSVP
    const rsvpY = 1150 + hostedByLines.length * 36 + 70;
    const rsvpSVG = v.rsvp ? svgFitText(v.rsvp, {
      x: W / 2,
      y: rsvpY,
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
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Jost:wght@300;400;500;600&amp;family=Noto+Serif+Devanagari:wght@400;600&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${frame}
        ${lotusArt}
        ${cornerPaisleys}
        ${sacredSVG}
        ${mottoSVG}
        ${headerSVG}
        ${eventSVG}
        ${groomSVG}
        ${andSVG}
        ${brideSVG}
        ${ceremonySVG}
        ${divider}
        ${dateSVG}
        ${timeSVG}
        ${venueSVG}
        ${hostedLabelSVG}
        ${hostedBySVG}
        ${rsvpSVG}
      </svg>
    `.trim();
  },
};
