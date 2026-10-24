/**
 * Bengali – Shubho Bibaho ("Alpona & Mukut")
 *
 * Rich Bengali wedding invitation celebrating Shubho Bibaho with circular rice-paste
 * Alpona floral motifs, Topor/Mukut filigree crown arches, and sacred conch (Shankha) flourishes.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'bengali-shubho-bibaho',
  tradition: 'bengali',
  occasion: 'wedding',
  name: 'Shubho Bibaho Alpona',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#961C24', // Alta Crimson Red
    ink:     '#FFF8EE', // Kash-phool Ivory
    accent:  '#D4A838', // Zari Gold
    accent2: '#C44040', // Coral Vermillion
    gold:    '#D4A838',
    cream:   '#FFF8EE',
  },

  fonts: {
    display: 'Playfair Display',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic',  label: 'Playfair + Jost',   display: 'Playfair Display', body: 'Jost' },
    { id: 'heritage', label: 'Cormorant + Jost',  display: 'Cormorant Garamond', body: 'Jost' },
  ],

  fields: [
    {
      key: 'sacredLine',
      label: 'Sacred Invocation (optional)',
      default: '॥ ॐ श्री श्री प्रजापतये नमः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Purohit before printing.',
    },
    {
      key: 'eventType',
      label: 'Ceremony',
      default: 'Shubho Bibaho',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom (Boro)",
      default: 'Sourav Mukherjee',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride (Kone)",
      default: 'Ananya Banerjee',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 15th February 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'bengaliDate',
      label: 'Bengali Calender Date (optional)',
      default: '২রা ফাল্গুন, ১৪৩২ বঙ্গাব্দ',
      lang: 'hi',
      multiline: false,
      optional: true,
    },
    {
      key: 'time',
      label: 'Lagna & Reception Time',
      default: 'Lagna: 7:30 PM onwards · Preeti Bhoj: 8:00 PM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Sovabazar Rajbari Courtyard, North Kolkata',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Nimontron (Invited by)',
      default: 'The Mukherjee & Banerjee Families',
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
    const nativeFont = this?.fonts?.native || 'Noto Serif Devanagari';

    // ── 1. Crimson Background ──────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Top Mukut / Topor Filigree Crest ────────────────────────
    function buildToporCrest(cx, y) {
      return `
        <g transform="translate(${cx}, ${y})" opacity="0.9">
          <!-- Central crown peak -->
          <polygon points="0,-36 12,-16 0,-24 -12,-16" fill="${palette.gold}"/>
          <circle cx="0" cy="-42" r="3.5" fill="${palette.cream}"/>
          <!-- Tiered arched filigree wings -->
          <path d="M 0 -18
                   C -40 -18, -80 5, -120 20
                   C -70 12, -35 5, 0 10
                   C 35 5, 70 12, 120 20
                   C 80 5, 40 -18, 0 -18 Z"
                fill="${palette.gold}" opacity="0.8"/>
          <line x1="-160" y1="24" x2="160" y2="24" stroke="${palette.gold}" stroke-width="1.5"/>
        </g>
      `;
    }

    const toporCrest = buildToporCrest(W / 2, 70);

    // ── 3. Circular Alpona Floor Art (Symmetric Paisley Mandala) ────
    function buildAlponaMandala(cx, cy, r) {
      const petalCount = 12;
      let petals = '';
      for (let i = 0; i < petalCount; i++) {
        const a = (i * 30) * Math.PI / 180;
        const xTip = cx + Math.cos(a) * r;
        const yTip = cy + Math.sin(a) * r;
        const xCtrl1 = cx + Math.cos(a - 0.22) * (r * 0.65);
        const yCtrl1 = cy + Math.sin(a - 0.22) * (r * 0.65);
        const xCtrl2 = cx + Math.cos(a + 0.22) * (r * 0.65);
        const yCtrl2 = cy + Math.sin(a + 0.22) * (r * 0.65);

        petals += `M ${cx} ${cy} C ${xCtrl1.toFixed(1)} ${yCtrl1.toFixed(1)}, ${xTip.toFixed(1)} ${yTip.toFixed(1)}, ${xTip.toFixed(1)} ${yTip.toFixed(1)} C ${xTip.toFixed(1)} ${yTip.toFixed(1)}, ${xCtrl2.toFixed(1)} ${yCtrl2.toFixed(1)}, ${cx} ${cy} `;
      }

      return `
        <g id="alpona-mandala" opacity="0.95">
          <circle cx="${cx}" cy="${cy}" r="${r * 1.15}" fill="none" stroke="${palette.cream}" stroke-width="1.2" stroke-dasharray="3 3"/>
          <circle cx="${cx}" cy="${cy}" r="${r * 1.05}" fill="none" stroke="${palette.gold}" stroke-width="1.8"/>
          <!-- Alpona petals in ivory -->
          <path d="${petals}" fill="${palette.cream}" fill-opacity="0.18" stroke="${palette.cream}" stroke-width="1.4"/>
          <!-- Inner concentric ring -->
          <circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
          <circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="${palette.gold}"/>
          <circle cx="${cx}" cy="${cy}" r="3" fill="${palette.bg}"/>
        </g>
      `;
    }

    const alponaMandala = buildAlponaMandala(W / 2, 230, 68);

    // ── 4. Frame with Paisley Corners ──────────────────────────────
    const border = `
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
            stroke="${palette.gold}" stroke-width="2" rx="6"/>
      <rect x="52" y="52" width="${W - 104}" height="${H - 104}" fill="none"
            stroke="${palette.cream}" stroke-width="0.8" stroke-dasharray="6 4" rx="4" opacity="0.6"/>
    `;

    // ── 5. Text Hierarchy ──────────────────────────────────────────
    const sacredSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 355,
      maxWidth: 720,
      maxSize: 32,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
    }) : '';

    const eventSVG = svgFitText((v.eventType || 'Shubho Bibaho').toUpperCase(), {
      x: W / 2,
      y: 435,
      maxWidth: 740,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="6"',
    });

    const honorific = svgFitText('CORDIALLY INVITE YOU TO CELEBRATE THE AUSPICIOUS WEDDING OF', {
      x: W / 2,
      y: 520,
      maxWidth: 720,
      maxSize: 17,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.8"',
    });

    const groomSVG = svgFitText(v.groomName || 'Sourav Mukherjee', {
      x: W / 2,
      y: 630,
      maxWidth: 780,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W / 2}" y="720" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="52" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgFitText(v.brideName || 'Ananya Banerjee', {
      x: W / 2,
      y: 815,
      maxWidth: 780,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const dividerSVG = `
      <g transform="translate(${W / 2}, 880)" opacity="0.85">
        <line x1="-160" y1="0" x2="-26" y2="0" stroke="${palette.gold}" stroke-width="1.5"/>
        <line x1="26" y1="0" x2="160" y2="0" stroke="${palette.gold}" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6" fill="${palette.gold}"/>
        <circle cx="0" cy="0" r="2.5" fill="${palette.bg}"/>
      </g>
    `;

    const dateSVG = svgFitText(v.date || 'Sunday, 15th February 2026', {
      x: W / 2,
      y: 955,
      maxWidth: 720,
      maxSize: 36,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const bengaliDateSVG = v.bengaliDate ? svgFitText(v.bengaliDate, {
      x: W / 2,
      y: 1020,
      maxWidth: 700,
      maxSize: 26,
      fontFamily: `${nativeFont}, serif`,
      fontWeight: 'normal',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.95"',
    }) : '';

    const timeSVG = svgFitText(v.time || 'Lagna: 7:30 PM onwards · Preeti Bhoj: 8:00 PM', {
      x: W / 2,
      y: 1085,
      maxWidth: 720,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    const venueSVG = svgFitText(v.venue || 'Sovabazar Rajbari Courtyard, North Kolkata', {
      x: W / 2,
      y: 1155,
      maxWidth: 740,
      maxSize: 32,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1255" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.gold}" letter-spacing="4" opacity="0.85">
        NIMONTRON BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1295,
        maxWidth: 720,
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
      y: 1385,
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
      ${toporCrest}
      ${alponaMandala}
      ${sacredSVG}
      ${eventSVG}
      ${honorific}
      ${groomSVG}
      ${andSVG}
      ${brideSVG}
      ${dividerSVG}
      ${dateSVG}
      ${bengaliDateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
