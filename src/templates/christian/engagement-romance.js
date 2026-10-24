/**
 * Christian – Romance & Laurel Engagement ("Romance & Laurel")
 *
 * Pinterest-inspired modern editorial romance invitation & Save-the-Date.
 * Features an organic linen texture tone, delicate botanical laurel wreath,
 * interlinked engagement rings with fine stippling, and timeless serif typography.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'christian-engagement-romance',
  tradition: 'christian',
  occasion: 'engagement',
  name: 'Romance & Laurel',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FAF7F2', // Warm Linen Cream
    ink:     '#241E1A', // Deep Espresso Ink
    accent:  '#875D48', // Warm Mocha Clay
    accent2: '#C29B38', // Burnished Gold
    gold:    '#C29B38',
    olive:   '#74826D',
    cream:   '#FFFDF9',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Pinyon Script',
    native:  'Cormorant Garamond',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'script',  label: 'Pinyon + Jost',    display: 'Pinyon Script',      body: 'Jost' },
  ],

  fields: [
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'SHE SAID YES · TOGETHER WITH THEIR FAMILIES',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'ARE OVERJOYED TO ANNOUNCE THEIR ENGAGEMENT',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Alexander Brooks',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Evangeline Harper',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'celebrationLine',
      label: 'Celebration Subtitle',
      default: 'Join us for drinks, dinner and dancing under the fairy lights',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 17th October 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '5:30 in the evening',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Secret Garden Estate, Cotswolds',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Brooks & Harper Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'Kindly RSVP by 15th September at alexandeva.com',
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

    // ── 1. Linen Canvas Background ────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Editorial Double Hairline Frame ─────────────────────────
    const frame = `
      <g>
        <rect x="52" y="52" width="${W - 104}" height="${H - 104}" fill="none"
              stroke="${palette.accent2}" stroke-width="1.2" opacity="0.6"/>
        <rect x="66" y="66" width="${W - 132}" height="${H - 132}" fill="none"
              stroke="${palette.accent}" stroke-width="0.75" stroke-dasharray="3 4" opacity="0.4"/>
      </g>
    `;

    // ── 3. Botanical Laurel Wreath & Rings Centerpiece ─────────────
    const wreathY = 200;
    const wreathArt = `
      <g transform="translate(${W / 2}, ${wreathY})">
        <!-- Interlinked Rings with Solitaire Diamond -->
        <ellipse cx="-15" cy="0" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.2"/>
        <ellipse cx="15" cy="0" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.2"/>
        <polygon points="-15,-26 -11,-32 -19,-32" fill="${palette.gold}"/>
        <circle cx="-15" cy="-33" r="3.5" fill="${palette.cream || '#FFFFFF'}" stroke="${palette.gold}" stroke-width="1.2"/>
        
        <!-- Laurel Leaf Sprigs fanning around the rings -->
        <g stroke="${palette.olive}" fill="none" stroke-width="1.2" opacity="0.75">
          <!-- Left Branch -->
          <path d="M -25 35 C -55 35, -75 10, -75 -15 C -75 -40, -55 -60, -25 -65"/>
          <ellipse cx="-72" cy="8" rx="6" ry="3" transform="rotate(-30, -72, 8)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="-74" cy="-15" rx="6" ry="3" transform="rotate(10, -74, -15)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="-60" cy="-40" rx="6" ry="3" transform="rotate(45, -60, -40)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="-35" cy="-60" rx="6" ry="3" transform="rotate(70, -35, -60)" fill="${palette.olive}" fill-opacity="0.25"/>
          
          <!-- Right Branch -->
          <path d="M 25 35 C 55 35, 75 10, 75 -15 C 75 -40, 55 -60, 25 -65"/>
          <ellipse cx="72" cy="8" rx="6" ry="3" transform="rotate(30, 72, 8)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="74" cy="-15" rx="6" ry="3" transform="rotate(-10, 74, -15)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="60" cy="-40" rx="6" ry="3" transform="rotate(-45, 60, -40)" fill="${palette.olive}" fill-opacity="0.25"/>
          <ellipse cx="35" cy="-60" rx="6" ry="3" transform="rotate(-70, 35, -60)" fill="${palette.olive}" fill-opacity="0.25"/>
        </g>
      </g>
    `;

    // ── 4. Typography Hierarchy ────────────────────────────────────
    const headerSVG = svgFitText((v.headerLine || 'SHE SAID YES · TOGETHER WITH THEIR FAMILIES').toUpperCase(), {
      x: W / 2,
      y: 310,
      maxWidth: 740,
      maxSize: 14,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.olive,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const eventSVG = svgFitText((v.eventType || 'ARE OVERJOYED TO ANNOUNCE THEIR ENGAGEMENT').toUpperCase(), {
      x: W / 2,
      y: 360,
      maxWidth: 780,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const groomSVG = svgFitText(v.groomName || 'Alexander Brooks', {
      x: W / 2,
      y: 475,
      maxWidth: 780,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="565" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="46" font-weight="300" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Evangeline Harper', {
      x: W / 2,
      y: 655,
      maxWidth: 780,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const celebrationSVG = svgFitText(v.celebrationLine || 'Join us for drinks, dinner and dancing under the fairy lights', {
      x: W / 2,
      y: 725,
      maxWidth: 720,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // Divider Line with Olive Leaves
    const divider = `
      <g transform="translate(${W / 2}, 780)" opacity="0.6">
        <line x1="-160" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <ellipse cx="0" cy="0" rx="4" ry="2" fill="${palette.olive}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Saturday, 17th October 2026', {
      x: W / 2,
      y: 855,
      maxWidth: 720,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '5:30 in the evening', {
      x: W / 2,
      y: 910,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Secret Garden Estate, Cotswolds', {
      x: W / 2,
      y: 985,
      maxWidth: 740,
      maxSize: 28,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Hosted By
    const hostedLabelSVG = svgFitText('WITH LOVE FROM', {
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

    const hostedByLines = (v.hostedBy || 'The Brooks & Harper Families').split('\n');
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
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Jost:wght@300;400;500;600&amp;family=Pinyon+Script&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${frame}
        ${wreathArt}
        ${headerSVG}
        ${eventSVG}
        ${groomSVG}
        ${andSVG}
        ${brideSVG}
        ${celebrationSVG}
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
