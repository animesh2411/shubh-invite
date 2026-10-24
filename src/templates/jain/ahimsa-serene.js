/**
 * Jain – Ahimsa Vani & Paryushan ("Ahimsa Vani")
 *
 * Spiritual, tranquil invitation and greeting for Paryushan Parva, Michhami Dukkadam,
 * and Pratishtha celebrations featuring the sacred Ahimsa hand with Dharmachakra,
 * Ashta Mangala inspired borders, blooming lotuses, and Navkar Mahamantra.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'jain-ahimsa-serene',
  tradition: 'jain',
  occasion: 'festival',
  name: 'Ahimsa Vani Serene',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FAF9F2', // Pearl Ivory
    ink:     '#2A1212', // Garnet Ink
    accent:  '#9B2226', // Deep Vermillion
    accent2: '#52794C', // Serene Leaf Green
    gold:    '#CCA43B', // Temple Gold
    cream:   '#FFFDF8',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'devanagari', label: 'Noto Devanagari', display: 'Noto Serif Devanagari', body: 'Jost' },
  ],

  fields: [
    {
      key: 'namokar',
      label: 'Navkar Mahamantra (optional)',
      default: '॥ ॐ नमो अरिहंताणं · नमो सिद्धाणं · नमो आयरियाणं ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Muni before printing.',
    },
    {
      key: 'ahimsa',
      label: 'Ahimsa Sutra',
      default: '॥ अहिंसा परमो धर्मः · जीवेषु करुणा विभोः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
    },
    {
      key: 'eventType',
      label: 'Occasion / Event',
      default: 'Paryushan Mahaparva & Michhami Dukkadam',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'forgivenessVerse',
      label: 'Khamat Khamna Verse (optional)',
      default: '“खामेमि सव्वे जीवा, सव्वे जीवा खमंतु मे। मित्ती मे सव्व-भूएसु, वेरं मज्झं न केणइ॥”',
      lang: 'hi',
      multiline: true,
      optional: true,
    },
    {
      key: 'titleText',
      label: 'Greetings Headline',
      default: 'Michhami Dukkadam',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'message',
      label: 'Heartfelt Message',
      default: 'May all living beings forgive us, and may we forgive all. With a humble heart, we seek your forgiveness for any words, thoughts, or deeds that may have hurt you.',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'date',
      label: 'Date / Samvatsari',
      default: 'Samvatsari Parva · September 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Warm Wishes From',
      default: 'The Jain & Shah Family',
      lang: 'en',
      multiline: true,
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

    // ── 1. Serene Pearl Background ─────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Delicate Gold Borders with Auspicious Corners ───────────
    const borders = `
      <rect x="44" y="44" width="${W - 88}" height="${H - 88}" fill="none"
            stroke="${palette.gold}" stroke-width="2" rx="6"/>
      <rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none"
            stroke="${palette.gold}" stroke-width="0.8" stroke-dasharray="4 3" rx="4" opacity="0.7"/>
    `;

    // ── 3. Sacred Ahimsa Hand Symbol with Dharmachakra ─────────────
    // Centred upright, respectful, and botanically framed
    const ahimsaHand = `
      <g transform="translate(${W / 2}, 235)" opacity="0.9">
        <!-- Aura Ring -->
        <circle r="68" fill="${palette.gold}" fill-opacity="0.08" stroke="${palette.gold}" stroke-width="1.2"/>
        <circle r="60" fill="none" stroke="${palette.gold}" stroke-width="0.8" stroke-dasharray="3 3"/>

        <!-- Upright Ahimsa Open Palm Silhouette -->
        <path d="M -22 45
                 C -26 30, -32 5, -28 -15
                 C -25 -28, -18 -26, -16 -12
                 C -15 -35, -7 -38, -5 -15
                 C -3 -42, 5 -44, 7 -15
                 C 9 -32, 16 -30, 16 -8
                 C 26 -2, 28 14, 20 28
                 C 16 38, 8 45, -22 45 Z"
              fill="${palette.gold}" fill-opacity="0.2" stroke="${palette.gold}" stroke-width="2"/>

        <!-- 24-spoke Dharmachakra in Palm Center -->
        <circle cx="-3" cy="12" r="16" fill="none" stroke="${palette.accent}" stroke-width="1.8"/>
        <circle cx="-3" cy="12" r="4" fill="${palette.accent}"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30) * Math.PI / 180;
          const x1 = -3 + Math.cos(a) * 4;
          const y1 = 12 + Math.sin(a) * 4;
          const x2 = -3 + Math.cos(a) * 16;
          const y2 = 12 + Math.sin(a) * 16;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${palette.accent}" stroke-width="1"/>`;
        }).join('')}

        <!-- Ahimsa text in devanagari below chakra -->
        <text x="-3" y="40" text-anchor="middle"
              font-family="${escapeXML(nativeFont)}, serif" font-size="10"
              font-weight="600" fill="${palette.accent}">अहिंसा</text>
      </g>
    `;

    // ── 4. Lotus Flourishes at Bottom Left & Right ──────────────────
    function buildLotusFlower(cx, cy, scale = 0.8) {
      return `
        <g transform="translate(${cx}, ${cy}) scale(${scale})" opacity="0.75">
          <!-- Petals -->
          <ellipse cx="0" cy="-18" rx="8" ry="22" fill="${palette.accent}" opacity="0.35"/>
          <ellipse cx="-12" cy="-12" rx="7" ry="18" transform="rotate(-25, -12, -12)" fill="${palette.gold}" opacity="0.4"/>
          <ellipse cx="12" cy="-12" rx="7" ry="18" transform="rotate(25, 12, -12)" fill="${palette.gold}" opacity="0.4"/>
          <ellipse cx="-20" cy="-6" rx="6" ry="15" transform="rotate(-50, -20, -6)" fill="${palette.accent}" opacity="0.3"/>
          <ellipse cx="20" cy="-6" rx="6" ry="15" transform="rotate(50, 20, -6)" fill="${palette.accent}" opacity="0.3"/>
          <!-- Calyx base -->
          <path d="M -18 2 Q 0 8 18 2 L 14 10 Q 0 14 -14 10 Z" fill="${palette.accent2}" opacity="0.6"/>
        </g>
      `;
    }

    const bottomLotuses = `
      ${buildLotusFlower(120, H - 90, 0.7)}
      ${buildLotusFlower(W - 120, H - 90, 0.7)}
    `;

    // ── 5. Sacred Mantras & Text Elements ───────────────────────────
    const namokarSVG = v.namokar ? svgFitText(v.namokar, {
      x: W / 2,
      y: 350,
      maxWidth: 760,
      maxSize: 28,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    const ahimsaSVG = v.ahimsa ? svgFitText(v.ahimsa, {
      x: W / 2,
      y: 405,
      maxWidth: 720,
      maxSize: 24,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: 'normal',
      fill: palette.gold,
      textAnchor: 'middle',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Paryushan Mahaparva').toUpperCase(), {
      x: W / 2,
      y: 475,
      maxWidth: 740,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const verseSVG = v.forgivenessVerse ? svgFitText(v.forgivenessVerse, {
      x: W / 2,
      y: 550,
      maxWidth: 760,
      maxSize: 24,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.45,
    }) : '';

    const headlineSVG = svgFitText(v.titleText || 'Michhami Dukkadam', {
      x: W / 2,
      y: 690,
      maxWidth: 820,
      maxSize: 76,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 765)" opacity="0.8">
        <line x1="-160" y1="0" x2="-25" y2="0" stroke="${palette.gold}" stroke-width="1.4"/>
        <line x1="25" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1.4"/>
        <circle cx="0" cy="0" r="5" fill="${palette.gold}"/>
      </g>
    `;

    const messageSVG = v.message ? svgFitText(v.message, {
      x: W / 2,
      y: 840,
      maxWidth: 740,
      maxSize: 30,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.5,
    }) : '';

    const dateSVG = svgFitText(v.date || 'Samvatsari Parva · September 2026', {
      x: W / 2,
      y: 1040,
      maxWidth: 700,
      maxSize: 32,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1170" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.gold}" letter-spacing="4" opacity="0.9">
        WITH HUMBLE PRANAM
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1215,
        maxWidth: 720,
        maxSize: 30,
        fontFamily: `${displayFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
      })}
    ` : '';

    return `
      ${bg}
      ${borders}
      ${ahimsaHand}
      ${bottomLotuses}
      ${namokarSVG}
      ${ahimsaSVG}
      ${eventSVG}
      ${verseSVG}
      ${headlineSVG}
      ${dividerSVG}
      ${messageSVG}
      ${dateSVG}
      ${hostedSVG}
    `;
  },
};
