/**
 * Secular – Baby Shower & Welcome Little One ("Celestial Little Star")
 *
 * Dreamy, gender-neutral Pinterest nursery celestial invitation.
 * Features a soft sage mist canvas, a golden crescent moon cradling gentle clouds,
 * hanging mobile stars and delicate botanical accents, with modern serif typography.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'secular-baby-shower',
  tradition: 'secular',
  occasion: 'baby',
  name: 'Celestial Little Star',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#F7FAF6', // Soft Sage Mist
    ink:     '#1E2E28', // Deep Botanical Slate Ink
    accent:  '#4A6B5D', // Woodland Sage
    accent2: '#D4A853', // Twinkle Star Gold
    gold:    '#D4A853',
    cream:   '#FFFDF9',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Cormorant Garamond',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'fraunces', label: 'Fraunces + Jost', display: 'Fraunces', body: 'Jost' },
  ],

  fields: [
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'A SWEET LITTLE BLESSING IS ON THE WAY',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'PLEASE JOIN US TO CELEBRATE THE BABY SHOWER FOR',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'parentName',
      label: "Honouree / Parents' Name",
      default: 'Sophia & Daniel Evans',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'celebrationLine',
      label: 'Celebration Subtitle',
      default: 'Afternoon tea, sweet treats and baby games under the garden gazebo',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 10th October 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '2:30 in the afternoon',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Botanist Glasshouse, Chelsea',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'Lovingly hosted by Eleanor & Grace',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'rsvp',
      label: 'RSVP / Registry',
      default: 'Kindly RSVP by 25th September · Registered at babylist.com/sophia-daniel',
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

    // ── 1. Soft Sage Background ────────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Delicate Arch Frame ─────────────────────────────────────
    const frame = `
      <g>
        <rect x="46" y="46" width="${W - 92}" height="${H - 92}" fill="none"
              stroke="${palette.gold}" stroke-width="1.5" rx="16" opacity="0.6"/>
        <rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none"
              stroke="${palette.accent}" stroke-width="0.75" stroke-dasharray="3 4" rx="12" opacity="0.4"/>
      </g>
    `;

    // ── 3. Celestial Moon, Clouds & Hanging Mobile Stars ───────────
    const celestialY = 220;
    const celestialArt = `
      <g transform="translate(${W / 2}, ${celestialY})">
        <!-- Hanging Strings with Stars -->
        <g stroke="${palette.gold}" stroke-width="0.75" stroke-dasharray="2 2" opacity="0.6">
          <line x1="-120" y1="-80" x2="-120" y2="10"/>
          <line x1="-60" y1="-90" x2="-60" y2="-10"/>
          <line x1="60" y1="-90" x2="60" y2="-10"/>
          <line x1="120" y1="-80" x2="120" y2="10"/>
        </g>
        <!-- Stars at End of Strings -->
        <g fill="${palette.gold}">
          <!-- 4-Point Star Left Outer -->
          <polygon points="-120,4 -117,10 -111,10 -116,14 -114,20 -120,16 -126,20 -124,14 -129,10 -123,10"
                   transform="scale(0.8) translate(-30, 0)"/>
          <!-- 4-Point Star Right Outer -->
          <polygon points="120,4 123,10 129,10 124,14 126,20 120,16 114,20 116,14 111,10 117,10"
                   transform="scale(0.8) translate(30, 0)"/>
        </g>
        
        <!-- Golden Crescent Moon -->
        <path d="M -20 -35
                 A 44 44 0 1 0 35 15
                 A 36 36 0 1 1 -20 -35 Z"
              fill="${palette.gold}" opacity="0.95"/>
        
        <!-- Soft Cloud Base -->
        <g fill="${palette.cream || '#FFFDF9'}" opacity="0.9" stroke="${palette.gold}" stroke-width="0.75">
          <ellipse cx="-25" cy="20" rx="30" ry="16"/>
          <ellipse cx="5" cy="15" rx="35" ry="20"/>
          <ellipse cx="35" cy="22" rx="28" ry="14"/>
        </g>
        
        <!-- Tiny Sparkles -->
        <g fill="${palette.gold}" opacity="0.8">
          <circle cx="-50" cy="-30" r="2"/>
          <circle cx="45" cy="-20" r="2.5"/>
          <circle cx="15" cy="-45" r="1.5"/>
        </g>
      </g>
    `;

    // ── 4. Typography Hierarchy ────────────────────────────────────
    const headerSVG = svgFitText((v.headerLine || 'A SWEET LITTLE BLESSING IS ON THE WAY').toUpperCase(), {
      x: W / 2,
      y: 330,
      maxWidth: 740,
      maxSize: 14,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const eventSVG = svgFitText((v.eventType || 'PLEASE JOIN US TO CELEBRATE THE BABY SHOWER FOR').toUpperCase(), {
      x: W / 2,
      y: 380,
      maxWidth: 780,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const parentSVG = svgFitText(v.parentName || 'Sophia & Daniel Evans', {
      x: W / 2,
      y: 500,
      maxWidth: 780,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const celebrationSVG = svgFitText(v.celebrationLine || 'Afternoon tea, sweet treats and baby games under the garden gazebo', {
      x: W / 2,
      y: 585,
      maxWidth: 720,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.9"',
    });

    // Divider Line with Cloud & Star Accent
    const divider = `
      <g transform="translate(${W / 2}, 660)" opacity="0.6">
        <line x1="-150" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="150" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="${palette.gold}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Saturday, 10th October 2026', {
      x: W / 2,
      y: 745,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '2:30 in the afternoon', {
      x: W / 2,
      y: 800,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Botanist Glasshouse, Chelsea', {
      x: W / 2,
      y: 885,
      maxWidth: 740,
      maxSize: 28,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Hosted By
    const hostedSVG = svgFitText(v.hostedBy || 'Lovingly hosted by Eleanor & Grace', {
      x: W / 2,
      y: 990,
      maxWidth: 640,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.9"',
    });

    // RSVP / Registry
    const rsvpSVG = v.rsvp ? svgFitText(v.rsvp, {
      x: W / 2,
      y: 1100,
      maxWidth: 720,
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
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,300&amp;family=Jost:wght@300;400;500;600&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${frame}
        ${celestialArt}
        ${headerSVG}
        ${eventSVG}
        ${parentSVG}
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
