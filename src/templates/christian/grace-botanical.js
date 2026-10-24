/**
 * Christian – Grace Botanical ("Eucalyptus & Gold Laurel")
 *
 * Timeless botanical engagement & wedding invitation with an intricate hand-drawn
 * SVG laurel wreath, delicate olive branches, refined Roman serifs, and soft gold accents.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'christian-grace-botanical',
  tradition: 'christian',
  occasion: 'engagement',
  name: 'Grace Botanical Laurel',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FAF7F2', // Soft bridal ivory
    ink:     '#23211E', // Warm charcoal ink
    accent:  '#B8975A', // Polished warm gold
    accent2: '#5B755D', // Eucalyptus sage
    gold:    '#B8975A',
    cream:   '#FFFDF8',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Pinyon Script',
    native:  'Cormorant Garamond',
  },

  fontPairs: [
    { id: 'script',  label: 'Cormorant + Pinyon', display: 'Cormorant Garamond', body: 'Jost', script: 'Pinyon Script' },
    { id: 'classic', label: 'Cormorant + Jost',   display: 'Cormorant Garamond', body: 'Jost', script: 'Cormorant Garamond' },
  ],

  fields: [
    {
      key: 'blessingLine',
      label: 'Blessing / Scripture (optional)',
      default: '“Love is patient, love is kind. It always protects, always trusts, always hopes.” — 1 Corinthians 13',
      lang: 'en',
      multiline: true,
      optional: true,
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Engagement Celebration',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Oliver William Hayes',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Eleanor Rose Bennett',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 18th April 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Five o’clock in the afternoon',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Conservatory Gardens, Kensington Estate',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'Together with their joyful families',
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
    const scriptFont = activePair.script || this?.fonts?.script || 'Pinyon Script';

    // ── 1. Background ──────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Delicate Border with Corner Rosettes ─────────────────────
    const border = `
      <rect x="42" y="42" width="${W - 84}" height="${H - 84}" fill="none"
            stroke="${palette.gold}" stroke-width="1.2" opacity="0.85"/>
      <rect x="52" y="52" width="${W - 104}" height="${H - 104}" fill="none"
            stroke="${palette.accent2}" stroke-width="0.75" opacity="0.45"/>
      <!-- Corner Florets -->
      <g stroke="${palette.gold}" stroke-width="1" fill="none" opacity="0.75">
        <circle cx="47" cy="47" r="4"/>
        <circle cx="${W - 47}" cy="47" r="4"/>
        <circle cx="47" cy="${H - 47}" r="4"/>
        <circle cx="${W - 47}" cy="${H - 47}" r="4"/>
      </g>
    `;

    // ── 3. Botanical Laurel Oval Wreath at Top ──────────────────────
    function buildLaurelWreath(cx, cy, rx, ry) {
      let wreath = '';
      const leafCount = 14;

      // Left branch
      for (let i = 0; i <= leafCount; i++) {
        const t = (i / leafCount) * Math.PI - Math.PI / 2;
        const x = cx - Math.cos(t) * rx;
        const y = cy + Math.sin(t) * ry;
        const angle = (t * 180) / Math.PI + 40;
        wreath += `
          <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${angle.toFixed(1)})">
            <ellipse cx="0" cy="-8" rx="4.5" ry="10" fill="${palette.accent2}" opacity="0.6"/>
            <ellipse cx="4" cy="-5" rx="3.5" ry="8" fill="${palette.gold}" opacity="0.4"/>
            <circle cx="0" cy="-16" r="2" fill="${palette.gold}" opacity="0.7"/>
          </g>
        `;
      }

      // Right branch (mirrored)
      for (let i = 0; i <= leafCount; i++) {
        const t = (i / leafCount) * Math.PI - Math.PI / 2;
        const x = cx + Math.cos(t) * rx;
        const y = cy + Math.sin(t) * ry;
        const angle = -(t * 180) / Math.PI - 40;
        wreath += `
          <g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${angle.toFixed(1)})">
            <ellipse cx="0" cy="-8" rx="4.5" ry="10" fill="${palette.accent2}" opacity="0.6"/>
            <ellipse cx="-4" cy="-5" rx="3.5" ry="8" fill="${palette.gold}" opacity="0.4"/>
            <circle cx="0" cy="-16" r="2" fill="${palette.gold}" opacity="0.7"/>
          </g>
        `;
      }

      // Central gold cross at wreath apex
      wreath += `
        <g transform="translate(${cx}, ${cy - ry - 14})" opacity="0.85">
          <line x1="0" y1="-12" x2="0" y2="12" stroke="${palette.gold}" stroke-width="1.8"/>
          <line x1="-8" y1="-4" x2="8" y2="-4" stroke="${palette.gold}" stroke-width="1.8"/>
          <circle cx="0" cy="-4" r="2.5" fill="${palette.gold}"/>
        </g>
      `;

      return wreath;
    }

    const laurelWreath = buildLaurelWreath(W / 2, 220, 110, 80);

    // ── 4. Monogram inside the Wreath ──────────────────────────────
    const gInitial = (v.groomName || 'O').trim().charAt(0);
    const bInitial = (v.brideName || 'E').trim().charAt(0);
    const monogramSVG = `
      <text x="${W / 2}" y="235" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-size="36"
            font-weight="400" fill="${palette.gold}" letter-spacing="6">
        ${escapeXML(gInitial)} &amp; ${escapeXML(bInitial)}
      </text>
    `;

    // ── 5. Typography Hierarchy ────────────────────────────────────
    const blessingSVG = v.blessingLine ? svgFitText(v.blessingLine, {
      x: W / 2,
      y: 350,
      maxWidth: 780,
      maxSize: 22,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.accent2,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Engagement Celebration').toUpperCase(), {
      x: W / 2,
      y: 430,
      maxWidth: 700,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    const honorific = svgFitText('REQUEST THE PLEASURE OF YOUR COMPANY TO CELEBRATE', {
      x: W / 2,
      y: 500,
      maxWidth: 680,
      maxSize: 17,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.65"',
    });

    const groomSVG = svgFitText(v.groomName || 'Oliver William Hayes', {
      x: W / 2,
      y: 610,
      maxWidth: 780,
      maxSize: 80,
      fontFamily: `${scriptFont}, ${displayFont}, serif`,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="700" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="48" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Eleanor Rose Bennett', {
      x: W / 2,
      y: 795,
      maxWidth: 780,
      maxSize: 80,
      fontFamily: `${scriptFont}, ${displayFont}, serif`,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 860)" opacity="0.75">
        <line x1="-140" y1="0" x2="-20" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <line x1="20" y1="0" x2="140" y2="0" stroke="${palette.gold}" stroke-width="1"/>
        <circle cx="0" cy="0" r="3.5" fill="${palette.gold}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Saturday, 18th April 2026', {
      x: W / 2,
      y: 940,
      maxWidth: 720,
      maxSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgFitText(v.time || 'Five o’clock in the afternoon', {
      x: W / 2,
      y: 1000,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    const venueSVG = svgFitText(v.venue || 'The Conservatory Gardens, Kensington Estate', {
      x: W / 2,
      y: 1080,
      maxWidth: 740,
      maxSize: 32,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const hostedSVG = v.hostedBy ? `
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1220,
        maxWidth: 700,
        maxSize: 28,
        fontFamily: `${displayFont}, serif`,
        fontWeight: '400',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
        extraAttrs: ' font-style="italic" opacity="0.8"',
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
      extraAttrs: 'opacity="0.75"',
    }) : '';

    return `
      ${bg}
      ${border}
      ${laurelWreath}
      ${monogramSVG}
      ${blessingSVG}
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
