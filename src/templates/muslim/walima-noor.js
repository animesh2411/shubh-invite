/**
 * Muslim – Walima Reception ("Noor Celestial")
 *
 * Midnight navy and luminous celestial gold invitation celebrating the Walima (wedding reception),
 * featuring a geometric 12-pointed Islamic star rosette, ornate Moroccan ogee arch frame, and fine arabesque lattice.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'muslim-walima-noor',
  tradition: 'muslim',
  occasion: 'wedding',
  name: 'Noor Celestial Walima',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#0A192F', // Deep Midnight Navy
    ink:     '#F5F3ED', // Moonlight Ivory
    accent:  '#D4AF37', // Radiant Celestial Gold
    accent2: '#1C3252', // Sapphire Night wash
    gold:    '#D4AF37',
    cream:   '#FDFBF7',
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
      label: 'Bismillah (optional)',
      default: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      lang: 'ar',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Imam before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Walima Reception',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'quranVerse',
      label: 'Blessing / Verse (optional)',
      default: '“And He created for you companions from among yourselves, that you might find peace.” — Surah Ar-Rum',
      lang: 'en',
      multiline: true,
      optional: true,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Farhan Tariq',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Zara Siddiqui',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 22nd February 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Reception: 7:30 PM onwards · Dinner at 8:30 PM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Grand Starlight Ballroom, Emirates Palace',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'Mr. & Mrs. Tariq Mansoor',
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

  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const svgFitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML = helpers?.escapeXML || coreEscapeXML;
    const v = values || {};

    const activePair = (this?.fontPairs || []).find((p) => p.id === v.fontPair) || (this?.fontPairs || [])[0] || {};
    const displayFont = activePair.display || this?.fonts?.display || 'Cormorant Garamond';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';
    const nativeFont = this?.fonts?.native || 'Amiri';

    // ── 1. Midnight Background ─────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Subtle Geometric Trellis Background Grid ───────────────
    function buildStarGrid() {
      const rows = 9;
      const cols = 7;
      let stars = '';
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const cx = 60 + c * 160;
          const cy = 60 + r * 160;
          stars += `<circle cx="${cx}" cy="${cy}" r="1.5" fill="${palette.gold}" opacity="0.18"/>`;
        }
      }
      return stars;
    }
    const starGrid = buildStarGrid();

    // ── 3. Ornate Double Gold Arch Frame ───────────────────────────
    const archFrame = `
      <!-- Outer hairline border -->
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
            stroke="${palette.gold}" stroke-width="1.5" rx="6" opacity="0.65"/>
      <!-- Inner pointed ogee arch border -->
      <path d="M 80 1420
               L 80 440
               C 80 320, 220 200, 360 170
               C 440 150, 500 110, 540 70
               C 580 110, 640 150, 720 170
               C 860 200, 1000 320, 1000 440
               L 1000 1420"
            fill="none" stroke="${palette.gold}" stroke-width="2.5" opacity="0.9"/>
      <!-- Inner subtle arch fill -->
      <path d="M 80 1420
               L 80 440
               C 80 320, 220 200, 360 170
               C 440 150, 500 110, 540 70
               C 580 110, 640 150, 720 170
               C 860 200, 1000 320, 1000 440
               L 1000 1420 Z"
            fill="${palette.accent2}" opacity="0.18"/>
    `;

    // ── 4. 12-Pointed Celestial Star Rosette ────────────────────────
    function buildIslamicStarRosette(cx, cy, radius) {
      const n = 12;
      let pathD = '';
      for (let i = 0; i < n * 2; i++) {
        const angle = (i * Math.PI) / n - Math.PI / 2;
        const r = i % 2 === 0 ? radius : radius * 0.55;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        pathD += (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)} ` : `L ${x.toFixed(1)} ${y.toFixed(1)} `);
      }
      pathD += 'Z';

      return `
        <g id="star-rosette" opacity="0.9">
          <circle cx="${cx}" cy="${cy}" r="${radius * 1.25}" fill="none" stroke="${palette.gold}" stroke-width="1" stroke-dasharray="3 3"/>
          <circle cx="${cx}" cy="${cy}" r="${radius * 1.15}" fill="none" stroke="${palette.gold}" stroke-width="0.8"/>
          <path d="${pathD}" fill="${palette.gold}" fill-opacity="0.15" stroke="${palette.gold}" stroke-width="1.8"/>
          <circle cx="${cx}" cy="${cy}" r="${radius * 0.32}" fill="${palette.gold}" opacity="0.75"/>
          <circle cx="${cx}" cy="${cy}" r="3.5" fill="${palette.bg}"/>
        </g>
      `;
    }

    const starRosette = buildIslamicStarRosette(W / 2, 220, 52);

    // ── 5. Text Hierarchy ──────────────────────────────────────────
    const bismillahSVG = v.bismillah ? svgFitText(v.bismillah, {
      x: W / 2,
      y: 330,
      maxWidth: 720,
      maxSize: 38,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '700',
      fill: palette.gold,
      textAnchor: 'middle',
      direction: 'rtl',
    }) : '';

    const verseSVG = v.quranVerse ? svgFitText(v.quranVerse, {
      x: W / 2,
      y: 400,
      maxWidth: 760,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic" opacity="0.85"',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Walima Reception').toUpperCase(), {
      x: W / 2,
      y: 480,
      maxWidth: 680,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="6"',
    });

    const honorific = svgFitText('CORDIALLY INVITE YOU TO CELEBRATE THE UNION OF', {
      x: W / 2,
      y: 565,
      maxWidth: 680,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.65"',
    });

    const groomSVG = svgFitText(v.groomName || 'Farhan Tariq', {
      x: W / 2,
      y: 670,
      maxWidth: 740,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="760" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="52" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Zara Siddiqui', {
      x: W / 2,
      y: 860,
      maxWidth: 740,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 920)" opacity="0.8">
        <line x1="-160" y1="0" x2="-24" y2="0" stroke="${palette.gold}" stroke-width="1.2"/>
        <line x1="24" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1.2"/>
        <polygon points="0,-7 6,0 0,7 -6,0" fill="${palette.gold}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Sunday, 22nd February 2026', {
      x: W / 2,
      y: 990,
      maxWidth: 700,
      maxSize: 36,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Reception: 7:30 PM onwards · Dinner at 8:30 PM', {
      x: W / 2,
      y: 1055,
      maxWidth: 700,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    const venueSVG = svgFitText(v.venue || 'The Grand Starlight Ballroom, Emirates Palace', {
      x: W / 2,
      y: 1130,
      maxWidth: 700,
      maxSize: 32,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1235" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.gold}" letter-spacing="4" opacity="0.85">
        HOSTED BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1275,
        maxWidth: 700,
        maxSize: 28,
        fontFamily: `${displayFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
      })}
    ` : '';

    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1375,
      maxWidth: 600,
      maxSize: 22,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75"',
    }) : '';

    return `
      ${bg}
      ${starGrid}
      ${archFrame}
      ${starRosette}
      ${bismillahSVG}
      ${verseSVG}
      ${eventSVG}
      ${honorific}
      ${groomSVG}
      ${andSVG}
      ${brideSVG}
      ${dividerSVG}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
