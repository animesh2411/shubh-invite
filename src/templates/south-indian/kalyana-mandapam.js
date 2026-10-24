/**
 * South Indian – Kalyana Mandapam ("Temple Kolam & Jasmine")
 *
 * Grand traditional South Indian wedding invitation inspired by Kanjeevaram silk sarees,
 * temple gopuram borders, geometric rice-flour Sikku Kolam art, and fragrant jasmine garlands.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'south-indian-kalyanam',
  tradition: 'south-indian',
  occasion: 'wedding',
  name: 'Kalyana Mandapam Kolam',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#851A1D', // Temple Vermillion / Kumkum Red
    ink:     '#FFF7E0', // Turmeric Silk Cream
    accent:  '#D4A017', // Kanjeevaram Zari Gold
    accent2: '#335C3D', // Jasmine Leaf Green
    gold:    '#D4A017',
    cream:   '#FFF7E0',
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
      label: 'Sacred Inscription (optional)',
      default: '॥ ॐ श्री गणेशाय नमः · शुभमस्तु ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or temple priest before printing.',
    },
    {
      key: 'eventType',
      label: 'Ceremony Type',
      default: 'Kalyana Mahotsavam',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Karthik Ramanathan',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Meenakshi Sundaram',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Thursday, 12th March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'muhurtham',
      label: 'Muhurtham / Auspicious Time',
      default: 'Shubha Muhurtham: 6:15 AM – 7:30 AM (Meena Lagnam)',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Mandapam / Venue',
      default: 'Sri Meenakshi Sundareswarar Thirumana Mandapam, Chennai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Invited by',
      default: 'Ramanathan & Sundaram Families',
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

    // ── 1. Background ──────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Temple Gopuram Triangle Borders along Top & Bottom ───────
    function buildTempleBorder(y, isTop = true) {
      const triangleCount = 27;
      const w = W / triangleCount; // 40px each
      const h = 24;
      let d = '';
      for (let i = 0; i < triangleCount; i++) {
        const x1 = i * w;
        const x2 = x1 + w / 2;
        const x3 = x1 + w;
        if (isTop) {
          d += `M ${x1} ${y} L ${x2} ${y + h} L ${x3} ${y} Z `;
        } else {
          d += `M ${x1} ${y} L ${x2} ${y - h} L ${x3} ${y} Z `;
        }
      }
      return `
        <path d="${d}" fill="${palette.gold}" opacity="0.9"/>
        <line x1="0" y1="${isTop ? y + h + 4 : y - h - 4}" x2="${W}" y2="${isTop ? y + h + 4 : y - h - 4}"
              stroke="${palette.gold}" stroke-width="2"/>
      `;
    }

    const topTempleBorder = buildTempleBorder(36, true);
    const bottomTempleBorder = buildTempleBorder(H - 36, false);

    // ── 3. Geometric Rice-Flour Sikku Kolam (Star Mandala) ──────────
    function buildKolamStar(cx, cy, r) {
      let loops = '';
      const points = 8;
      for (let i = 0; i < points; i++) {
        const a1 = (i * 45) * Math.PI / 180;
        const a2 = ((i + 1) * 45) * Math.PI / 180;
        const x1 = cx + Math.cos(a1) * (r * 0.45);
        const y1 = cy + Math.sin(a1) * (r * 0.45);
        const xTip = cx + Math.cos(a1 + 22.5 * Math.PI / 180) * r;
        const yTip = cy + Math.sin(a1 + 22.5 * Math.PI / 180) * r;
        const x2 = cx + Math.cos(a2) * (r * 0.45);
        const y2 = cy + Math.sin(a2) * (r * 0.45);

        loops += `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${xTip.toFixed(1)} ${yTip.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
      }

      return `
        <g id="kolam-star" opacity="0.95">
          <circle cx="${cx}" cy="${cy}" r="${r * 1.15}" fill="none" stroke="${palette.gold}" stroke-width="1.2" stroke-dasharray="3 3"/>
          <path d="${loops}" fill="none" stroke="${palette.cream}" stroke-width="2" stroke-linecap="round"/>
          <circle cx="${cx}" cy="${cy}" r="6" fill="${palette.gold}"/>
          ${Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45) * Math.PI / 180;
            return `<circle cx="${(cx + Math.cos(a) * (r * 0.72)).toFixed(1)}" cy="${(cy + Math.sin(a) * (r * 0.72)).toFixed(1)}" r="3" fill="${palette.cream}"/>`;
          }).join('')}
        </g>
      `;
    }

    const kolamSVG = buildKolamStar(W / 2, 230, 68);

    // ── 4. Hanging Jasmine Garlands (Malli Poo) at Top Corners ──────
    function buildJasmineStrand(startX, length) {
      let garland = '';
      const buds = Math.floor(length / 22);
      for (let i = 0; i < buds; i++) {
        const by = 80 + i * 22;
        garland += `<ellipse cx="${startX}" cy="${by}" rx="5" ry="8" fill="${palette.cream}" stroke="${palette.accent2}" stroke-width="0.5"/>`;
      }
      return garland;
    }

    const jasmineGarlands = [
      buildJasmineStrand(80, 200),
      buildJasmineStrand(120, 150),
      buildJasmineStrand(W - 120, 150),
      buildJasmineStrand(W - 80, 200),
    ].join('');

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

    const eventSVG = svgFitText((v.eventType || 'Kalyana Mahotsavam').toUpperCase(), {
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

    const honorific = svgFitText('SEEKING YOUR BLESSINGS FOR THE SACRED UNION OF', {
      x: W / 2,
      y: 520,
      maxWidth: 700,
      maxSize: 18,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="4" opacity="0.8"',
    });

    const groomSVG = svgFitText(v.groomName || 'Karthik Ramanathan', {
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

    const brideSVG = svgFitText(v.brideName || 'Meenakshi Sundaram', {
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

    const dateSVG = svgFitText(v.date || 'Thursday, 12th March 2026', {
      x: W / 2,
      y: 955,
      maxWidth: 720,
      maxSize: 36,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const muhurthamSVG = v.muhurtham ? svgFitText(v.muhurtham, {
      x: W / 2,
      y: 1025,
      maxWidth: 740,
      maxSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.95"',
    }) : '';

    const venueSVG = svgFitText(v.venue || 'Sri Meenakshi Sundareswarar Thirumana Mandapam, Chennai', {
      x: W / 2,
      y: 1105,
      maxWidth: 740,
      maxSize: 32,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1215" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="18"
            fill="${palette.gold}" letter-spacing="4" opacity="0.85">
        SOLICITED BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1255,
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
      y: 1355,
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
      ${topTempleBorder}
      ${bottomTempleBorder}
      ${kolamSVG}
      ${jasmineGarlands}
      ${sacredSVG}
      ${eventSVG}
      ${honorific}
      ${groomSVG}
      ${andSVG}
      ${brideSVG}
      ${dividerSVG}
      ${dateSVG}
      ${muhurthamSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
