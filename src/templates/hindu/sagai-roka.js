/**
 * Hindu – Sagai & Ring Ceremony ("Sagai Blush & Gold")
 *
 * Romantic, Pinterest-inspired luxury Indian engagement invitation.
 * Features a soft dusty-rose paper tone, champagne gold architectural arch,
 * intertwined eternity rings with radiant starburst, and delicate floral jasmine vine motifs.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'hindu-engagement-sagai',
  tradition: 'hindu',
  occasion: 'engagement',
  name: 'Sagai Blush & Gold',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FDF7F4', // Dusty Rose Blush
    ink:     '#3D1E24', // Deep Rose Plum Ink
    accent:  '#9E2A3B', // Rich Maroon Rose
    accent2: '#D4A359', // Champagne Gold
    gold:    '#D4A359',
    cream:   '#FFF9F6',
    rose:    '#EBB9BD',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'elegant', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
  ],

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred invocation',
      default: '॥ श्री गणेशाय नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Auspicious invocation. Verify with family or priest.',
    },
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'TOGETHER WITH THEIR CHERISHED FAMILIES',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'CORDIALLY INVITE YOU TO CELEBRATE THE ENGAGEMENT OF',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Rohan Kapoor',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Ananya Singhania',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'ceremonyLine',
      label: 'Sub-ceremony note',
      default: 'Ring Ceremony & Sangeet Celebrations',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 28th November 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '6:30 PM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Roseate Grand Ballroom, New Delhi',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Kapoor & Singhania Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP: +91 98110 00000 / +91 98220 00000',
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
    const displayFont = activePair.display || this?.fonts?.display || 'Playfair Display';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';
    const nativeFont = this?.fonts?.native || 'Noto Serif Devanagari';

    // ── 1. Luxury Blush Background & Texture Tone ──────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Delicate Architectural Arch with Soft Shading ───────────
    const archArt = `
      <g>
        <!-- Soft Tinted Arch Glow -->
        <path d="M 120 1380
                 L 120 480
                 A 420 420 0 0 1 960 480
                 L 960 1380 Z"
              fill="${palette.cream || '#FFF9F6'}" opacity="0.6"/>
        <!-- Outer Gold Fine Arch Line -->
        <path d="M 100 1400
                 L 100 460
                 A 440 440 0 0 1 980 460
                 L 980 1400"
              fill="none" stroke="${palette.gold}" stroke-width="2" opacity="0.75"/>
        <!-- Inner Dashed Arch Line -->
        <path d="M 120 1380
                 L 120 480
                 A 420 420 0 0 1 960 480
                 L 960 1380"
              fill="none" stroke="${palette.gold}" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>
        <!-- Corner Inset Borders -->
        <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
              stroke="${palette.accent}" stroke-width="0.75" opacity="0.3"/>
      </g>
    `;

    // ── 3. Intertwined Rings with Radiance Starburst Motif ──────────
    const ringsCenterY = 220;
    const ringsArt = `
      <g transform="translate(${W / 2}, ${ringsCenterY})">
        <!-- Subtle Radiance Rings -->
        <circle r="46" fill="none" stroke="${palette.gold}" stroke-width="0.75" stroke-dasharray="2 3" opacity="0.45"/>
        <!-- Left Ring -->
        <ellipse cx="-16" cy="0" rx="24" ry="24" fill="none"
                 stroke="${palette.gold}" stroke-width="2.5"/>
        <!-- Right Ring (Interlinked) -->
        <ellipse cx="16" cy="0" rx="24" ry="24" fill="none"
                 stroke="${palette.gold}" stroke-width="2.5"/>
        <!-- Diamond Solitaire Motif on Top of Left Ring -->
        <polygon points="-16,-28 -12,-34 -20,-34" fill="${palette.gold}"/>
        <circle cx="-16" cy="-35" r="4" fill="${palette.cream || '#FFFFFF'}" stroke="${palette.gold}" stroke-width="1.5"/>
        <!-- Sparkle Starburst -->
        <g stroke="${palette.gold}" stroke-width="1.2" opacity="0.8">
          <line x1="-16" y1="-46" x2="-16" y2="-40"/>
          <line x1="-22" y1="-35" x2="-28" y2="-35"/>
          <line x1="-10" y1="-35" x2="-4" y2="-35"/>
          <line x1="28" y1="-14" x2="34" y2="-20"/>
        </g>
      </g>
    `;

    // ── 4. Floral Jasmine & Rose Vine Accents ──────────────────────
    const floralMotifs = `
      <g stroke="${palette.gold}" fill="none" stroke-width="1" opacity="0.65">
        <!-- Top Left Branch -->
        <path d="M 60 70 Q 110 60 160 90 Q 210 120 260 85"/>
        <circle cx="110" cy="65" r="4" fill="${palette.accent}" stroke="none"/>
        <circle cx="160" cy="90" r="5" fill="${palette.gold}" stroke="none"/>
        <circle cx="210" cy="115" r="4" fill="${palette.accent}" stroke="none"/>
        <!-- Top Right Branch (Mirrored) -->
        <path d="M ${W - 60} 70 Q ${W - 110} 60 ${W - 160} 90 Q ${W - 210} 120 ${W - 260} 85"/>
        <circle cx="${W - 110}" cy="65" r="4" fill="${palette.accent}" stroke="none"/>
        <circle cx="${W - 160}" cy="90" r="5" fill="${palette.gold}" stroke="none"/>
        <circle cx="${W - 210}" cy="115" r="4" fill="${palette.accent}" stroke="none"/>
      </g>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 135,
      maxWidth: 500,
      maxSize: 26,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '500',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="2"',
    }) : '';

    const headerSVG = svgFitText((v.headerLine || 'TOGETHER WITH THEIR CHERISHED FAMILIES').toUpperCase(), {
      x: W / 2,
      y: 310,
      maxWidth: 720,
      maxSize: 15,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5" opacity="0.75"',
    });

    const eventSVG = svgFitText((v.eventType || 'INVITE YOU TO CELEBRATE THE ENGAGEMENT OF').toUpperCase(), {
      x: W / 2,
      y: 360,
      maxWidth: 780,
      maxSize: 17,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const groomSVG = svgFitText(v.groomName || 'Rohan Kapoor', {
      x: W / 2,
      y: 475,
      maxWidth: 760,
      maxSize: 74,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="560" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="44" font-weight="300" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Ananya Singhania', {
      x: W / 2,
      y: 650,
      maxWidth: 760,
      maxSize: 74,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // Sub-ceremony banner
    const ceremonySVG = svgFitText(v.ceremonyLine || 'Ring Ceremony & Sangeet Celebrations', {
      x: W / 2,
      y: 725,
      maxWidth: 680,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Divider Line with Centered Flower
    const divider = `
      <g transform="translate(${W / 2}, 780)" opacity="0.6">
        <line x1="-160" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <circle cx="0" cy="0" r="4" fill="${palette.accent}"/>
        <circle cx="-12" cy="0" r="2.5" fill="${palette.gold}"/>
        <circle cx="12" cy="0" r="2.5" fill="${palette.gold}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Saturday, 28th November 2026', {
      x: W / 2,
      y: 850,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '6:30 PM onwards', {
      x: W / 2,
      y: 905,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Roseate Grand Ballroom, New Delhi', {
      x: W / 2,
      y: 980,
      maxWidth: 720,
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
      y: 1090,
      maxWidth: 500,
      maxSize: 13,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const hostedByLines = (v.hostedBy || 'The Kapoor & Singhania Families').split('\n');
    const hostedBySVG = hostedByLines.map((line, idx) => svgFitText(line, {
      x: W / 2,
      y: 1135 + idx * 36,
      maxWidth: 700,
      maxSize: 26,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
    })).join('\n');

    // RSVP
    const rsvpY = 1135 + hostedByLines.length * 36 + 70;
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
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Jost:wght@300;400;500;600&amp;family=Noto+Serif+Devanagari:wght@400;600&amp;family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${archArt}
        ${ringsArt}
        ${floralMotifs}
        ${sacredSVG}
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
