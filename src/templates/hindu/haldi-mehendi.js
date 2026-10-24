/**
 * Hindu – Haldi & Mehendi Celebration ("Genda Phool & Henna")
 *
 * Vibrant celebratory template featuring dangling marigold and jasmine garlands,
 * intricate henna vine borders, festive turmeric yellow and deep marigold tones.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'hindu-haldi-mehendi',
  tradition: 'hindu',
  occasion: 'ceremony',
  name: 'Genda Phool & Henna',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FFF3C4', // Radiant Haldi yellow
    ink:     '#3A2010', // Deep Henna brown
    accent:  '#E8590C', // Saffron / Marigold orange
    accent2: '#557A2B', // Henna leaf green
    gold:    '#C9962B', // Warm gold
    cream:   '#FFFDE8',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'festive', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
  ],

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred line (optional)',
      default: '॥ श्री गणेशाय नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or priest before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Haldi & Mehendi Celebration',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride / Celebrant",
      default: 'Priya Sharma',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 14th February 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Haldi: 10:00 AM · Mehendi: 4:00 PM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Courtyard Pavilion, Taj Lands End, Mumbai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'dressCode',
      label: 'Dress code',
      default: 'Dress code: Festive Yellows & Olive Greens',
      lang: 'en',
      multiline: false,
      optional: true,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Sharma and Mehta Families',
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
    const displayFont = activePair.display || this?.fonts?.display || 'Playfair Display';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';
    const scriptFont = activePair.script || this?.fonts?.script || 'Cormorant Garamond';
    const nativeFont = this?.fonts?.native || 'Noto Serif Devanagari';

    // ── 1. Background ──────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Decorative Double Border Frame ──────────────────────────
    const frame = `
      <rect x="36" y="36" width="${W - 72}" height="${H - 72}" fill="none"
            stroke="${palette.gold}" stroke-width="2.5" rx="8"/>
      <rect x="48" y="48" width="${W - 96}" height="${H - 96}" fill="none"
            stroke="${palette.accent}" stroke-width="1.2" stroke-dasharray="6 4" rx="6" opacity="0.8"/>
    `;

    // ── 3. Marigold & Jasmine Dangling Garlands across Top ───────────
    function buildGarlandStrand(x, length, dropY) {
      let garland = '';
      const flowerCount = Math.floor(length / 28);
      for (let i = 0; i < flowerCount; i++) {
        const fy = dropY + i * 28;
        const isJasmine = i % 3 === 2;
        const color = isJasmine ? palette.cream : (i % 2 === 0 ? palette.accent : palette.gold);
        const r = isJasmine ? 6 : 10;
        garland += `<circle cx="${x}" cy="${fy}" r="${r}" fill="${color}" stroke="${palette.gold}" stroke-width="0.8"/>`;
        if (!isJasmine) {
          garland += `<circle cx="${x}" cy="${fy}" r="3" fill="${palette.ink}" opacity="0.3"/>`;
        }
      }
      return garland;
    }

    const garlandStrands = [
      buildGarlandStrand(90, 160, 48),
      buildGarlandStrand(160, 220, 48),
      buildGarlandStrand(240, 140, 48),
      buildGarlandStrand(W - 240, 140, 48),
      buildGarlandStrand(W - 160, 220, 48),
      buildGarlandStrand(W - 90, 160, 48),
    ].join('');

    // ── 4. Henna Vine Curving Border along Left and Right ───────────
    function buildHennaBranch(isRight = false) {
      const sign = isRight ? -1 : 1;
      const baseX = isRight ? W - 64 : 64;
      let leaves = '';
      const startY = 320;
      const endY = 1200;
      const step = 64;

      for (let y = startY; y <= endY; y += step) {
        const leafAngle = (y % (step * 2) === 0 ? 35 : -35) * sign;
        leaves += `
          <g transform="translate(${baseX}, ${y}) rotate(${leafAngle})">
            <!-- Henna paisley leaf -->
            <path d="M 0 0 C 14 -8, 28 -4, 34 8 C 26 14, 12 12, 0 0 Z"
                  fill="${palette.accent2}" opacity="0.45"/>
            <circle cx="16" cy="4" r="2" fill="${palette.gold}" opacity="0.6"/>
          </g>
        `;
      }
      return leaves;
    }

    const hennaVines = buildHennaBranch(false) + buildHennaBranch(true);

    // ── 5. Auspicious Sun / Mandala Medallion in Center-Top ──────────
    const sunMedallion = `
      <g transform="translate(${W / 2}, 250)" opacity="0.85">
        <circle r="46" fill="none" stroke="${palette.gold}" stroke-width="1.8"/>
        <circle r="38" fill="${palette.accent}" opacity="0.12"/>
        <circle r="38" fill="none" stroke="${palette.accent}" stroke-width="1" stroke-dasharray="3 3"/>
        <circle r="6" fill="${palette.accent}"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30) * Math.PI / 180;
          const x1 = Math.cos(a) * 46;
          const y1 = Math.sin(a) * 46;
          const x2 = Math.cos(a) * 56;
          const y2 = Math.sin(a) * 56;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${palette.gold}" stroke-width="1.5"/>`;
        }).join('')}
      </g>
    `;

    // ── 6. Text Elements ─────────────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 350,
      maxWidth: 680,
      maxSize: 32,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: 'normal',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Haldi & Mehendi Celebration').toUpperCase(), {
      x: W / 2,
      y: 430,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const celebrantLabel = svgFitText('CELEBRATING OUR DEAR', {
      x: W / 2,
      y: 520,
      maxWidth: 600,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.65"',
    });

    const brideSVG = svgFitText(v.brideName || 'Priya Sharma', {
      x: W / 2,
      y: 620,
      maxWidth: 760,
      maxSize: 84,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // Decorative divider with marigold dot
    const divider = `
      <g transform="translate(${W / 2}, 710)">
        <line x1="-160" y1="0" x2="-28" y2="0" stroke="${palette.gold}" stroke-width="1.5" opacity="0.7"/>
        <line x1="28" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1.5" opacity="0.7"/>
        <circle cx="0" cy="0" r="7" fill="${palette.accent}"/>
        <circle cx="0" cy="0" r="3" fill="${palette.cream}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Saturday, 14th February 2026', {
      x: W / 2,
      y: 790,
      maxWidth: 700,
      maxSize: 36,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Haldi: 10:00 AM · Mehendi: 4:00 PM', {
      x: W / 2,
      y: 860,
      maxWidth: 720,
      maxSize: 28,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const venueSVG = svgFitText(v.venue || 'The Courtyard Pavilion, Taj Lands End, Mumbai', {
      x: W / 2,
      y: 940,
      maxWidth: 720,
      maxSize: 32,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const dressCodeSVG = v.dressCode ? svgFitText(v.dressCode, {
      x: W / 2,
      y: 1050,
      maxWidth: 680,
      maxSize: 22,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.accent2,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="1"',
    }) : '';

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1150" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.ink}" letter-spacing="4" opacity="0.6">
        WITH LOVE FROM
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1195,
        maxWidth: 700,
        maxSize: 30,
        fontFamily: `${scriptFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
      })}
    ` : '';

    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1350,
      maxWidth: 600,
      maxSize: 22,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.8"',
    }) : '';

    return `
      ${bg}
      ${frame}
      ${garlandStrands}
      ${hennaVines}
      ${sunMedallion}
      ${sacredSVG}
      ${eventSVG}
      ${celebrantLabel}
      ${brideSVG}
      ${divider}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${dressCodeSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
