/**
 * Hindu – Griha Pravesh & Housewarming ("Griha Pravesh Mangal")
 *
 * Warm, auspicious Pinterest-inspired Indian housewarming invitation.
 * Features a golden haldi-cream canvas, an ornate doorway toran of mango leaves and marigolds,
 * an auspicious sacred Kalash centerpiece with coconut and mango leaves, and Vedic blessings.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'hindu-griha-pravesh',
  tradition: 'hindu',
  occasion: 'housewarming',
  name: 'Griha Pravesh Mangal',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FCF8F0', // Haldi Cream Canvas
    ink:     '#2F1A12', // Deep Teak Ink
    accent:  '#8A2B1A', // Auspicious Kumkum Red
    accent2: '#D99632', // Marigold Gold
    gold:    '#D99632',
    saffron: '#E26824',
    green:   '#3B6E3E', // Mango Leaf Green
    cream:   '#FFFDF7',
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
      default: '॥ श्री गणेशाय नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Auspicious invocation. Verify with family or priest.',
    },
    {
      key: 'headerLine',
      label: 'Blessing Header',
      default: 'WITH THE BLESSINGS OF GOD AND OUR ELDERS',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'CORDIALLY INVITE YOU TO THE GRIHA PRAVESH CEREMONY OF OUR NEW HOME',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'homeName',
      label: 'House / Residence Name',
      default: '“Shree Nivas”',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Family / Host names',
      default: 'Sunita & Rajesh Verma',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'programLine',
      label: 'Puja Schedule',
      default: 'Vastu Puja & Havan at 8:30 AM · Mahaprasad Lunch at 12:30 PM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 15th November 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '8:30 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'New Address',
      default: 'Villa 42, Palm Meadows, Whitefield, Bengaluru',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP: +91 98450 12345 / +91 98450 67890',
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

    // ── 1. Haldi Cream Canvas ─────────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Decorative Double Border Frame ─────────────────────────
    const frame = `
      <g>
        <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
              stroke="${palette.gold}" stroke-width="2.5" rx="8"/>
        <rect x="58" y="58" width="${W - 116}" height="${H - 116}" fill="none"
              stroke="${palette.accent}" stroke-width="1" stroke-dasharray="4 4" rx="6" opacity="0.5"/>
      </g>
    `;

    // ── 3. Doorway Toran with Mango Leaves & Marigold Garlands ────
    const toranY = 70;
    const toranArt = `
      <g transform="translate(0, ${toranY})">
        <!-- Main Hanging String -->
        <path d="M 60 0 Q ${W / 2} 45 ${W - 60} 0" fill="none"
              stroke="${palette.gold}" stroke-width="2"/>
        
        <!-- Marigold Flowers along String -->
        <g fill="${palette.saffron}">
          <circle cx="140" cy="12" r="10"/>
          <circle cx="260" cy="24" r="10"/>
          <circle cx="390" cy="33" r="10"/>
          <circle cx="${W / 2}" cy="36" r="12" fill="${palette.gold}"/>
          <circle cx="${W - 390}" cy="33" r="10"/>
          <circle cx="${W - 260}" cy="24" r="10"/>
          <circle cx="${W - 140}" cy="12" r="10"/>
        </g>
        
        <!-- Hanging Mango Leaves -->
        <g fill="${palette.green}" fill-opacity="0.85" stroke="${palette.gold}" stroke-width="0.5">
          <path d="M 200 18 Q 190 55 200 70 Q 210 55 200 18 Z"/>
          <path d="M 325 29 Q 315 65 325 80 Q 335 65 325 29 Z"/>
          <path d="M 465 35 Q 455 75 465 90 Q 475 75 465 35 Z"/>
          <path d="M ${W - 465} 35 Q ${W - 475} 75 ${W - 465} 90 Q ${W - 455} 75 ${W - 465} 35 Z"/>
          <path d="M ${W - 325} 29 Q ${W - 335} 65 ${W - 325} 80 Q ${W - 315} 65 ${W - 325} 29 Z"/>
          <path d="M ${W - 200} 18 Q ${W - 210} 55 ${W - 200} 70 Q ${W - 190} 55 ${W - 200} 18 Z"/>
        </g>
      </g>
    `;

    // ── 4. Sacred Kalash Centerpiece Motif ────────────────────────
    const kalashY = 250;
    const kalashArt = `
      <g transform="translate(${W / 2}, ${kalashY})">
        <!-- Kalash Body Base -->
        <path d="M -35 25 Q -45 5 -20 -15 L 20 -15 Q 45 5 35 25 Q 25 35 0 35 Q -25 35 -35 25 Z"
              fill="${palette.gold}" stroke="${palette.accent}" stroke-width="1.5"/>
        <!-- Kalash Rim -->
        <ellipse cx="0" cy="-15" rx="25" ry="6" fill="${palette.gold}" stroke="${palette.accent}" stroke-width="1"/>
        
        <!-- Sacred Swastika / Auspicious Mark on Kalash -->
        <g stroke="${palette.accent}" stroke-width="1.5" opacity="0.9">
          <line x1="0" y1="5" x2="0" y2="25"/>
          <line x1="-10" y1="15" x2="10" y2="15"/>
          <line x1="0" y1="5" x2="6" y2="5"/>
          <line x1="0" y1="25" x2="-6" y2="25"/>
          <line x1="-10" y1="15" x2="-10" y2="9"/>
          <line x1="10" y1="15" x2="10" y2="21"/>
        </g>
        
        <!-- Mango Leaves in Kalash -->
        <g fill="${palette.green}" fill-opacity="0.9" stroke="${palette.gold}" stroke-width="0.75">
          <path d="M 0 -16 Q -25 -45 -45 -40 Q -30 -25 0 -16 Z"/>
          <path d="M 0 -16 Q -15 -55 -25 -65 Q -10 -40 0 -16 Z"/>
          <path d="M 0 -16 Q 0 -65 0 -70 Q 5 -45 0 -16 Z"/>
          <path d="M 0 -16 Q 15 -55 25 -65 Q 10 -40 0 -16 Z"/>
          <path d="M 0 -16 Q 25 -45 45 -40 Q 30 -25 0 -16 Z"/>
        </g>
        
        <!-- Sacred Coconut on Top -->
        <ellipse cx="0" cy="-30" rx="15" ry="18" fill="#8B4513" stroke="${palette.gold}" stroke-width="1"/>
        <circle cx="0" cy="-48" r="3.5" fill="${palette.accent}"/>
      </g>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 165,
      maxWidth: 550,
      maxSize: 28,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    const headerSVG = svgFitText((v.headerLine || 'WITH THE BLESSINGS OF GOD AND OUR ELDERS').toUpperCase(), {
      x: W / 2,
      y: 350,
      maxWidth: 720,
      maxSize: 14,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5" opacity="0.75"',
    });

    const eventSVG = svgFitText((v.eventType || 'CORDIALLY INVITE YOU TO THE GRIHA PRAVESH CEREMONY OF OUR NEW HOME').toUpperCase(), {
      x: W / 2,
      y: 405,
      maxWidth: 780,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const homeSVG = svgFitText(v.homeName || '“Shree Nivas”', {
      x: W / 2,
      y: 520,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const hostedLabelSVG = svgFitText('WARMLY INVITED BY', {
      x: W / 2,
      y: 605,
      maxWidth: 450,
      maxSize: 13,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const hostedBySVG = svgFitText(v.hostedBy || 'Sunita & Rajesh Verma', {
      x: W / 2,
      y: 665,
      maxWidth: 760,
      maxSize: 42,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const programSVG = svgFitText(v.programLine || 'Vastu Puja & Havan at 8:30 AM · Mahaprasad Lunch at 12:30 PM', {
      x: W / 2,
      y: 735,
      maxWidth: 720,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // Divider Line with Diya Accent
    const divider = `
      <g transform="translate(${W / 2}, 795)" opacity="0.6">
        <line x1="-160" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <!-- Mini Diya -->
        <path d="M -8 2 Q 0 8 8 2 Q 4 -2 0 -2 Q -4 -2 -8 2 Z" fill="${palette.gold}"/>
        <circle cx="0" cy="-5" r="2" fill="${palette.accent}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Sunday, 15th November 2026', {
      x: W / 2,
      y: 865,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '8:30 AM onwards', {
      x: W / 2,
      y: 920,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue Address (Multi-line)
    const venueLabelSVG = svgFitText('NEW RESIDENCE ADDRESS', {
      x: W / 2,
      y: 1010,
      maxWidth: 500,
      maxSize: 13,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const venueLines = (v.venue || 'Villa 42, Palm Meadows, Whitefield, Bengaluru').split('\n');
    const venueSVG = venueLines.map((line, idx) => svgFitText(line, {
      x: W / 2,
      y: 1055 + idx * 36,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    })).join('\n');

    // RSVP
    const rsvpY = 1055 + venueLines.length * 36 + 65;
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
        ${kalashArt}
        ${sacredSVG}
        ${headerSVG}
        ${eventSVG}
        ${homeSVG}
        ${hostedLabelSVG}
        ${hostedBySVG}
        ${programSVG}
        ${divider}
        ${dateSVG}
        ${timeSVG}
        ${venueLabelSVG}
        ${venueSVG}
        ${rsvpSVG}
      </svg>
    `.trim();
  },
};
