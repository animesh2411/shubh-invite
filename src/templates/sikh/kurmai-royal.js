/**
 * Sikh – Royal Kurmai & Engagement ("Kurmai Sona")
 *
 * Rich royal plum and gold invitation for a traditional Sikh Kurmai & Chunni ceremony,
 * featuring an auspicious central ੴ medallion with radiating sunburst, floral jaali lace frame, and Gurmukhi blessings.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'sikh-kurmai-royal',
  tradition: 'sikh',
  occasion: 'engagement',
  name: 'Kurmai Sona Royal',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#3B1124', // Royal Deep Plum
    ink:     '#FFF7E6', // Warm Cream
    accent:  '#D8A23E', // Shimmering Gold
    accent2: '#C25E1A', // Amber Rust
    gold:    '#D8A23E',
    cream:   '#FFF7E6',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Sans Gurmukhi',
  },

  fontPairs: [
    { id: 'classic',  label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'gurmukhi', label: 'Noto Gurmukhi',   display: 'Noto Sans Gurmukhi', body: 'Jost' },
  ],

  fields: [
    {
      key: 'waheguruLine',
      label: 'Sacred Gurmukhi line (optional)',
      default: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      lang: 'pa',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Granthi before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Kurmai & Ring Ceremony',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'gurbaniVerse',
      label: 'Gurbani blessing (optional)',
      default: '“ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ ॥”',
      lang: 'pa',
      multiline: false,
      optional: true,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Jaspreet Singh',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Navneet Kaur',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 1st March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '11:00 AM onwards followed by Guru ka Langar',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Heritage Grand Hall, GT Road, Ludhiana',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Ahluwalia and Grewal Families',
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
    const scriptFont = this?.fonts?.script || 'Cormorant Garamond';
    const nativeFont = this?.fonts?.native || 'Noto Sans Gurmukhi';

    // ── 1. Background ──────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Intricate Royal Jaali Lace Border ────────────────────────
    function buildJaaliCorners() {
      const corners = [
        [50, 50, 0],
        [W - 50, 50, 90],
        [W - 50, H - 50, 180],
        [50, H - 50, 270],
      ];
      return corners.map(([x, y, rot]) => `
        <g transform="translate(${x}, ${y}) rotate(${rot})" opacity="0.8">
          <path d="M 0 0 L 70 0 C 70 35, 35 70, 0 70 Z" fill="${palette.accent2}" opacity="0.25"/>
          <path d="M 0 0 L 60 0 C 60 30, 30 60, 0 60 Z" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
          <circle cx="22" cy="22" r="5" fill="${palette.gold}"/>
        </g>
      `).join('');
    }

    const jaaliCorners = buildJaaliCorners();

    const borders = `
      <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
            stroke="${palette.gold}" stroke-width="2.5" rx="4"/>
      <rect x="54" y="54" width="${W - 108}" height="${H - 108}" fill="none"
            stroke="${palette.gold}" stroke-width="1" stroke-dasharray="5 3" rx="2" opacity="0.75"/>
    `;

    // ── 3. Auspicious Ik Onkar (ੴ) Radiant Gold Medallion ──────────
    const ikOnkarMedallion = `
      <g transform="translate(${W / 2}, 230)">
        <circle r="60" fill="${palette.gold}" fill-opacity="0.12" stroke="${palette.gold}" stroke-width="1.8"/>
        <circle r="52" fill="none" stroke="${palette.gold}" stroke-width="1" stroke-dasharray="4 2.5" opacity="0.75"/>
        <!-- Radiating sunburst points -->
        ${Array.from({ length: 16 }, (_, i) => {
          const a = (i * 22.5) * Math.PI / 180;
          const x1 = Math.cos(a) * 60;
          const y1 = Math.sin(a) * 60;
          const x2 = Math.cos(a) * 70;
          const y2 = Math.sin(a) * 70;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${palette.gold}" stroke-width="1.5" opacity="0.6"/>`;
        }).join('')}
        <!-- ੴ Character -->
        <text x="0" y="24" text-anchor="middle"
              font-family="${escapeXML(nativeFont)}, serif" font-size="64"
              font-weight="700" fill="${palette.gold}">ੴ</text>
      </g>
    `;

    // ── 4. Text Elements ───────────────────────────────────────────
    const waheguruSVG = v.waheguruLine ? svgFitText(v.waheguruLine, {
      x: W / 2,
      y: 350,
      maxWidth: 680,
      maxSize: 32,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    }) : '';

    const gurbaniSVG = v.gurbaniVerse ? svgFitText(v.gurbaniVerse, {
      x: W / 2,
      y: 410,
      maxWidth: 760,
      maxSize: 22,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: 'normal',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.9"',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Kurmai & Ring Ceremony').toUpperCase(), {
      x: W / 2,
      y: 485,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const honorific = svgFitText('TOGETHER WITH THEIR RESPECTED FAMILIES INVITE YOU TO', {
      x: W / 2,
      y: 565,
      maxWidth: 700,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.75"',
    });

    const groomSVG = svgFitText(v.groomName || 'Jaspreet Singh', {
      x: W / 2,
      y: 670,
      maxWidth: 760,
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

    const brideSVG = svgFitText(v.brideName || 'Navneet Kaur', {
      x: W / 2,
      y: 860,
      maxWidth: 760,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 920)" opacity="0.8">
        <line x1="-160" y1="0" x2="-28" y2="0" stroke="${palette.gold}" stroke-width="1.4"/>
        <line x1="28" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1.4"/>
        <polygon points="0,-8 7,0 0,8 -7,0" fill="${palette.gold}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Sunday, 1st March 2026', {
      x: W / 2,
      y: 995,
      maxWidth: 720,
      maxSize: 36,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || '11:00 AM onwards followed by Guru ka Langar', {
      x: W / 2,
      y: 1060,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    const venueSVG = svgFitText(v.venue || 'Heritage Grand Hall, GT Road, Ludhiana', {
      x: W / 2,
      y: 1135,
      maxWidth: 720,
      maxSize: 32,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1245" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.gold}" letter-spacing="4" opacity="0.85">
        HOSTED BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1285,
        maxWidth: 700,
        maxSize: 28,
        fontFamily: `${scriptFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
      })}
    ` : '';

    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1380,
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
      ${borders}
      ${jaaliCorners}
      ${ikOnkarMedallion}
      ${waheguruSVG}
      ${gurbaniSVG}
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
