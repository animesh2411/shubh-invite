/**
 * South Indian – Nischayathartham Engagement ("Nischayathartham Gold")
 *
 * Traditional yet Pinterest-modern South Indian betrothal invitation.
 * Features Kanjeevaram raw-silk ivory, a temple gopuram arch with mango-leaf toran,
 * twin kuthu vilakku brass lamps flanking interlinked rings, and auspicious blessings.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'south-indian-nischayathartham',
  tradition: 'south-indian',
  occasion: 'engagement',
  name: 'Nischayathartham Gold',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FFF9EE', // Kanjeevaram Raw Silk Cream
    ink:     '#2D1318', // Deep Temple Maroon Ink
    accent:  '#8A1B28', // Rich Temple Crimson
    accent2: '#C28E2E', // Gopuram Temple Gold
    gold:    '#C28E2E',
    green:   '#2D5E37', // Mango Leaf Green
    cream:   '#FFFDF6',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'cormorant', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
  ],

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred invocation',
      default: '॥ ॐ श्री गणेशाय नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Auspicious invocation. Verify with family or priest.',
    },
    {
      key: 'shubhamLine',
      label: 'Auspicious blessing',
      default: '॥ शुभम् भवतु ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
    },
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'WITH THE DIVINE GRACE OF THE ALMIGHTY',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'INVITE YOU TO THE AUSPICIOUS NISCHAYATHARTHAM OF',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Karthik Subramanian',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Deepika Ramanathan',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'ceremonyLine',
      label: 'Ceremony subtitle',
      default: 'Engagement, Lagna Patrika Vachanam & Traditional Virundhu',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 6th December 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Muhurtham / Time',
      default: 'Muhurtham: 9:00 AM – 10:30 AM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Leela Palace Grand Ballroom, Chennai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Subramanian & Ramanathan Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP: +91 98400 12345 / +91 98400 67890',
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

    // ── 1. Raw Silk Cream Background ──────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Temple Gopuram Arch Frame ──────────────────────────────
    const frame = `
      <g>
        <!-- Outer Temple Gold Border -->
        <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
              stroke="${palette.gold}" stroke-width="2.5" rx="10"/>
        <!-- Inner Crimson Border with Dashed Accent -->
        <rect x="58" y="58" width="${W - 116}" height="${H - 116}" fill="none"
              stroke="${palette.accent}" stroke-width="1" stroke-dasharray="4 4" rx="6" opacity="0.6"/>
      </g>
    `;

    // ── 3. Mango Leaf Toran & Temple Bell Motif ───────────────────
    const toranY = 160;
    const toranArt = `
      <g transform="translate(${W / 2}, ${toranY})">
        <!-- Hanging Brass Temple Bell in Center -->
        <path d="M -12 0 C -12 18, -20 28, -24 34 L 24 34 C 20 28, 12 18, 12 0 Z"
              fill="${palette.gold}"/>
        <circle cx="0" cy="36" r="4" fill="${palette.accent}"/>
        <line x1="0" y1="-25" x2="0" y2="0" stroke="${palette.gold}" stroke-width="2"/>
        
        <!-- Fanned Mango Leaves -->
        <g fill="${palette.green}" fill-opacity="0.85" stroke="${palette.gold}" stroke-width="0.75">
          <path d="M -40 -10 C -90 -15, -120 5, -140 25 C -115 15, -80 5, -40 -10 Z"/>
          <path d="M -30 -10 C -60 -15, -80 15, -95 38 C -75 22, -50 8, -30 -10 Z"/>
          <path d="M 40 -10 C 90 -15, 120 5, 140 25 C 115 15, 80 5, 40 -10 Z"/>
          <path d="M 30 -10 C 60 -15, 80 15, 95 38 C 75 22, 50 8, 30 -10 Z"/>
        </g>
      </g>
    `;

    // ── 4. Twin Vilakku Lamps Flanking Interlinked Rings ───────────
    const centerMotifY = 250;
    const centerMotif = `
      <g transform="translate(${W / 2}, ${centerMotifY})">
        <!-- Intertwined Engagement Rings -->
        <ellipse cx="-15" cy="0" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.5"/>
        <ellipse cx="15" cy="0" rx="22" ry="22" fill="none"
                 stroke="${palette.gold}" stroke-width="2.5"/>
        <circle cx="-15" cy="-22" r="4" fill="${palette.cream || '#FFFFFF'}" stroke="${palette.gold}" stroke-width="1.2"/>
        
        <!-- Left Deepam Lamp Flame -->
        <g transform="translate(-100, 0)">
          <path d="M -10 10 Q 0 16 10 10 Q 8 2 0 -10 Q -8 2 -10 10 Z" fill="${palette.gold}"/>
          <path d="M -4 2 Q 0 -6 4 2 Q 0 8 -4 2 Z" fill="${palette.accent}"/>
        </g>
        <!-- Right Deepam Lamp Flame -->
        <g transform="translate(100, 0)">
          <path d="M -10 10 Q 0 16 10 10 Q 8 2 0 -10 Q -8 2 -10 10 Z" fill="${palette.gold}"/>
          <path d="M -4 2 Q 0 -6 4 2 Q 0 8 -4 2 Z" fill="${palette.accent}"/>
        </g>
      </g>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 95,
      maxWidth: 550,
      maxSize: 28,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    const headerSVG = svgFitText((v.headerLine || 'WITH THE DIVINE GRACE OF THE ALMIGHTY').toUpperCase(), {
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

    const eventSVG = svgFitText((v.eventType || 'INVITE YOU TO THE AUSPICIOUS NISCHAYATHARTHAM OF').toUpperCase(), {
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

    const groomSVG = svgFitText(v.groomName || 'Karthik Subramanian', {
      x: W / 2,
      y: 495,
      maxWidth: 760,
      maxSize: 74,
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

    const brideSVG = svgFitText(v.brideName || 'Deepika Ramanathan', {
      x: W / 2,
      y: 675,
      maxWidth: 760,
      maxSize: 74,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const ceremonySVG = svgFitText(v.ceremonyLine || 'Engagement, Lagna Patrika Vachanam & Traditional Virundhu', {
      x: W / 2,
      y: 745,
      maxWidth: 700,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Divider Line with Auspicious Shubham
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
    const dateSVG = svgFitText(v.date || 'Sunday, 6th December 2026', {
      x: W / 2,
      y: 870,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Muhurtham: 9:00 AM – 10:30 AM', {
      x: W / 2,
      y: 925,
      maxWidth: 640,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="1"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Leela Palace Grand Ballroom, Chennai', {
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
    const hostedLabelSVG = svgFitText('WITH HUMBLE INVITATION FROM', {
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

    const hostedByLines = (v.hostedBy || 'The Subramanian & Ramanathan Families').split('\n');
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
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Jost:wght@300;400;500;600&amp;family=Noto+Serif+Devanagari:wght@400;600&amp;family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${frame}
        ${toranArt}
        ${centerMotif}
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
