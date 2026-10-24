/**
 * Muslim – Mangni & Ring Ceremony ("Mangni Noor & Pearl")
 *
 * Exquisite Pinterest-style Islamic engagement invitation.
 * Features a soft sage mist tone, ornate Moroccan scalloped arch,
 * delicate celestial crescent & star medallion cradling interlinked engagement rings,
 * Quranic love verse, and graceful calligraphy.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'muslim-engagement-mangni',
  tradition: 'muslim',
  occasion: 'engagement',
  name: 'Mangni Noor & Pearl',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#F6F9F6', // Sage Pearl White
    ink:     '#1A332B', // Deep Emerald Charcoal
    accent:  '#285E4A', // Rich Forest Jade
    accent2: '#CBA860', // Antique Champagne Gold
    gold:    '#CBA860',
    cream:   '#FCFDFB',
    sage:    '#91B09E',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Amiri',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'amiri',   label: 'Amiri + Jost',     display: 'Amiri',              body: 'Jost' },
  ],

  fields: [
    {
      key: 'bismillah',
      label: 'Bismillah Calligraphy',
      default: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      lang: 'ar',
      multiline: false,
      optional: true,
    },
    {
      key: 'quoteLine',
      label: 'Quranic / Blessing verse',
      default: '"And He placed between you love and compassion" — Surah Ar-Rum',
      lang: 'en',
      multiline: false,
      optional: true,
    },
    {
      key: 'headerLine',
      label: 'Invitation header',
      default: 'TOGETHER WITH THEIR RESPECTED FAMILIES',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'eventType',
      label: 'Event Type',
      default: 'INVITE YOU TO CELEBRATE THE MANGNI CEREMONY OF',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Zayd Al-Mansoor',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Inaya Siddiqui',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'ceremonyLine',
      label: 'Ceremony subtitle',
      default: 'An evening of Dua, Ring Exchange & Celebrations',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 13th December 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '7:00 PM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Emerald Palace Pavilion, Dubai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Mansoor & Siddiqui Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: 'RSVP: +971 50 123 4567 / info@mansoorsiddiqui.com',
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
    const nativeFont = this?.fonts?.native || 'Amiri';

    // ── 1. Soft Sage Background ────────────────────────────────────
    const bgRect = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Moroccan Arched Jaali Silhouette ────────────────────────
    const archArt = `
      <g>
        <!-- Arched Backplate with subtle wash -->
        <path d="M 120 1380
                 L 120 440
                 C 120 280, 280 180, 540 100
                 C 800 180, 960 280, 960 440
                 L 960 1380 Z"
              fill="${palette.cream || '#FCFDFB'}" opacity="0.8"/>
        <!-- Fine Gold Outer Arch Border -->
        <path d="M 100 1400
                 L 100 440
                 C 100 270, 270 170, 540 85
                 C 810 170, 980 270, 980 440
                 L 980 1400"
              fill="none" stroke="${palette.gold}" stroke-width="2" opacity="0.8"/>
        <!-- Scalloped Inner Gold Stroke -->
        <path d="M 120 1380
                 L 120 440
                 C 120 280, 280 180, 540 100
                 C 800 180, 960 280, 960 440
                 L 960 1380"
              fill="none" stroke="${palette.accent}" stroke-width="1" stroke-dasharray="3 4" opacity="0.5"/>
        <!-- Decorative Border Corner Corners -->
        <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
              stroke="${palette.gold}" stroke-width="0.75" opacity="0.4"/>
      </g>
    `;

    // ── 3. Celestial Crescent, 8-Point Star & Engagement Rings Motif ─
    const crescentY = 220;
    const crescentArt = `
      <g transform="translate(${W / 2}, ${crescentY})">
        <!-- Delicate Crescent Moon -->
        <path d="M -30 -25
                 A 40 40 0 1 0 30 -25
                 A 32 32 0 1 1 -30 -25 Z"
              fill="${palette.gold}" opacity="0.9"/>
        <!-- 8-Pointed Star in Crescent Center -->
        <g transform="translate(0, -10)" fill="${palette.accent}">
          <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"/>
          <circle r="2.5" fill="${palette.gold}"/>
        </g>
        <!-- Intertwined Rings Symbolizing Mangni -->
        <ellipse cx="-14" cy="24" rx="20" ry="20" fill="none"
                 stroke="${palette.gold}" stroke-width="2.2"/>
        <ellipse cx="14" cy="24" rx="20" ry="20" fill="none"
                 stroke="${palette.gold}" stroke-width="2.2"/>
        <!-- Shimmer Point -->
        <circle cx="-14" cy="4" r="3" fill="${palette.accent}" stroke="${palette.gold}" stroke-width="1"/>
      </g>
    `;

    // ── 4. Arabesque Corner Flourishes ─────────────────────────────
    const arabesqueVines = `
      <g stroke="${palette.gold}" fill="none" stroke-width="1" opacity="0.55">
        <path d="M 70 80 Q 130 90 150 140 Q 160 180 200 200"/>
        <circle cx="150" cy="140" r="3.5" fill="${palette.accent}" stroke="none"/>
        <circle cx="200" cy="200" r="3" fill="${palette.gold}" stroke="none"/>
        <path d="M ${W - 70} 80 Q ${W - 130} 90 ${W - 150} 140 Q ${W - 160} 180 ${W - 200} 200"/>
        <circle cx="${W - 150}" cy="140" r="3.5" fill="${palette.accent}" stroke="none"/>
        <circle cx="${W - 200}" cy="200" r="3" fill="${palette.gold}" stroke="none"/>
      </g>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const bismillahSVG = v.bismillah ? svgFitText(v.bismillah, {
      x: W / 2,
      y: 110,
      maxWidth: 550,
      maxSize: 32,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    const quoteSVG = v.quoteLine ? svgFitText(v.quoteLine, {
      x: W / 2,
      y: 310,
      maxWidth: 680,
      maxSize: 18,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.9"',
    }) : '';

    const headerSVG = svgFitText((v.headerLine || 'TOGETHER WITH THEIR RESPECTED FAMILIES').toUpperCase(), {
      x: W / 2,
      y: 360,
      maxWidth: 720,
      maxSize: 14,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5" opacity="0.75"',
    });

    const eventSVG = svgFitText((v.eventType || 'INVITE YOU TO CELEBRATE THE MANGNI CEREMONY OF').toUpperCase(), {
      x: W / 2,
      y: 405,
      maxWidth: 760,
      maxSize: 16,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="3"',
    });

    const groomSVG = svgFitText(v.groomName || 'Zayd Al-Mansoor', {
      x: W / 2,
      y: 515,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="605" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="46" font-weight="300" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Inaya Siddiqui', {
      x: W / 2,
      y: 695,
      maxWidth: 760,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const ceremonySVG = svgFitText(v.ceremonyLine || 'An evening of Dua, Ring Exchange & Celebrations', {
      x: W / 2,
      y: 765,
      maxWidth: 680,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.9"',
    });

    // Divider Line with Islamic Rosette
    const divider = `
      <g transform="translate(${W / 2}, 820)" opacity="0.7">
        <line x1="-150" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="25" y1="0" x2="150" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <!-- Small Rosette -->
        <circle cx="0" cy="0" r="5" fill="${palette.gold}"/>
        <circle cx="0" cy="0" r="2.5" fill="${palette.cream || '#FFFFFF'}"/>
      </g>
    `;

    // Date & Time
    const dateSVG = svgFitText(v.date || 'Sunday, 13th December 2026', {
      x: W / 2,
      y: 890,
      maxWidth: 700,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '7:00 PM onwards', {
      x: W / 2,
      y: 945,
      maxWidth: 600,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85" letter-spacing="1.5"',
    });

    // Venue
    const venueSVG = svgFitText(v.venue || 'The Emerald Palace Pavilion, Dubai', {
      x: W / 2,
      y: 1020,
      maxWidth: 740,
      maxSize: 28,
      fontFamily: `${displayFont}, serif`,
      fontStyle: 'italic',
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // Hosted By
    const hostedLabelSVG = svgFitText('WITH BEST COMPLIMENTS FROM', {
      x: W / 2,
      y: 1125,
      maxWidth: 500,
      maxSize: 13,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4"',
    });

    const hostedByLines = (v.hostedBy || 'The Mansoor & Siddiqui Families').split('\n');
    const hostedBySVG = hostedByLines.map((line, idx) => svgFitText(line, {
      x: W / 2,
      y: 1170 + idx * 36,
      maxWidth: 700,
      maxSize: 26,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
    })).join('\n');

    // RSVP
    const rsvpY = 1170 + hostedByLines.length * 36 + 70;
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
            @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&amp;family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&amp;family=Jost:wght@300;400;500;600&amp;display=swap');
          </style>
        </defs>
        ${bgRect}
        ${archArt}
        ${crescentArt}
        ${arabesqueVines}
        ${bismillahSVG}
        ${quoteSVG}
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
