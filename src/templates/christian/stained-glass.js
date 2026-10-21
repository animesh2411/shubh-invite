/**
 * Christian – Stained Glass Invitation Template
 *
 * Art direction: Deep navy (#1B2A49) with a majestic rose window centerpiece
 * at (W/2, 480) with radius 360px, inspired by gothic cathedral stained glass.
 * Pure JS trigonometry is used to compute all circular arc segments and tracery.
 */

import { svgFitText as defaultSvgFitText, wrapLines as defaultWrapLines } from '../../core/textFit.js';
import { escapeXML as defaultEscapeXML } from '../../core/renderer.js';

export default {
  id: 'christian-wedding-stained-glass',
  tradition: 'christian',
  occasion: 'wedding',
  name: 'Stained Glass',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:       '#1B2A49',
    ink:      '#F8F4EC',
    accent:   '#D4A843',
    accent2:  '#C0392B',
    paper:    '#F8F4EC',
    gold:     '#D4A843',
    ruby:     '#C0392B',
    sapphire: '#2E6FAC',
    emerald:  '#2E7D52',
    amber:    '#E8A020',
    ivory:    '#F8F4EC',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Cormorant Garamond',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'bold',    label: 'Playfair + Jost',  display: 'Playfair Display',   body: 'Jost' },
  ],

  fields: [
    {
      key: 'blessingLine',
      label: 'Blessing / Scripture (optional)',
      default: 'I have found the one whom my soul loves. — Song of Solomon 3:4',
      lang: 'en',
      multiline: false,
      optional: true,
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Holy Matrimony',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Ethan Matthew James',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Grace Abigail Thomas',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 17th October 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'Four o’clock in the afternoon',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Cathedral of All Saints, Riverside Gardens',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'Together with their families',
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

  render(values, palette, helpers = {}) {
    const W = 1080;
    const H = 1500;
    const svgFitText = helpers.svgFitText || defaultSvgFitText;
    const escapeXML = helpers.escapeXML || defaultEscapeXML;
    const v = values || {};

    // Determine active typography pair
    const isBold = v.fontPair === 'bold';
    const displayFont = isBold ? 'Playfair Display' : 'Cormorant Garamond';
    const bodyFont = 'Jost';

    // ── Pure JS Trigonometry Helpers ───────────────────────────────
    const cos = Math.cos;
    const sin = Math.sin;
    const PI = Math.PI;

    function round(n) {
      return Number(n.toFixed(2));
    }

    function polarToCartesian(centerX, centerY, radius, angleInRadians) {
      return [
        round(centerX + radius * cos(angleInRadians)),
        round(centerY + radius * sin(angleInRadians)),
      ];
    }

    // Annular sector: circular arc segment between rIn and rOut
    function makeAnnularSector(cx, cy, rIn, rOut, a1, a2) {
      const p1 = polarToCartesian(cx, cy, rIn, a1);
      const p2 = polarToCartesian(cx, cy, rOut, a1);
      const p3 = polarToCartesian(cx, cy, rOut, a2);
      const p4 = polarToCartesian(cx, cy, rIn, a2);
      const largeArc = (a2 - a1) > PI ? 1 : 0;
      return `M ${p1[0]} ${p1[1]} ` +
             `L ${p2[0]} ${p2[1]} ` +
             `A ${rOut} ${rOut} 0 ${largeArc} 1 ${p3[0]} ${p3[1]} ` +
             `L ${p4[0]} ${p4[1]} ` +
             `A ${rIn} ${rIn} 0 ${largeArc} 0 ${p1[0]} ${p1[1]} Z`;
    }

    // Pointed arch segment between rIn (280) and rOut (360)
    function makePointedArchSegment(cx, cy, rIn, rOut, a1, a2) {
      const aMid = (a1 + a2) / 2;
      const p1 = polarToCartesian(cx, cy, rIn, a1);
      const pTip = polarToCartesian(cx, cy, rOut, aMid);
      const p2 = polarToCartesian(cx, cy, rIn, a2);

      const d = Math.hypot(pTip[0] - p1[0], pTip[1] - p1[1]);
      const rArch = round(d * 1.15);

      return `M ${p1[0]} ${p1[1]} ` +
             `A ${rArch} ${rArch} 0 0 1 ${pTip[0]} ${pTip[1]} ` +
             `A ${rArch} ${rArch} 0 0 1 ${p2[0]} ${p2[1]} ` +
             `A ${rIn} ${rIn} 0 0 0 ${p1[0]} ${p1[1]} Z`;
    }

    // Petal shape between rIn (65) and rOut (130)
    function makePetalShape(cx, cy, rIn, rOut, a1, a2) {
      const aMid = (a1 + a2) / 2;
      const p1 = polarToCartesian(cx, cy, rIn, a1);
      const pTip = polarToCartesian(cx, cy, rOut, aMid);
      const p2 = polarToCartesian(cx, cy, rIn, a2);

      const d = Math.hypot(pTip[0] - p1[0], pTip[1] - p1[1]);
      const rPetal = round(d * 1.08);

      return `M ${p1[0]} ${p1[1]} ` +
             `A ${rPetal} ${rPetal} 0 0 1 ${pTip[0]} ${pTip[1]} ` +
             `A ${rPetal} ${rPetal} 0 0 1 ${p2[0]} ${p2[1]} ` +
             `A ${rIn} ${rIn} 0 0 0 ${p1[0]} ${p1[1]} Z`;
    }

    // ── 1. Full Navy Background ────────────────────────────────────
    const background = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 4. Subtle 8-Point Star Grid (15 cols × 20 rows at 4% gold) ─
    // Reusable 8-point star definition
    const defs = `
      <defs>
        <polygon id="star8"
          points="5,0 1.11,0.46 2.47,2.47 0.46,1.11 0,5 -0.46,1.11 -2.47,2.47 -1.11,0.46 -5,0 -1.11,-0.46 -2.47,-2.47 -0.46,-1.11 0,-5 0.46,-1.11 2.47,-2.47 1.11,-0.46"
          fill="${palette.gold}"/>
      </defs>
    `;

    const starGrid = Array.from({ length: 20 }, (_, r) => {
      const cy = round((r + 0.5) * (H / 20));
      return Array.from({ length: 15 }, (_, c) => {
        const cx = round((c + 0.5) * (W / 15));
        return `<use href="#star8" x="${cx}" y="${cy}"/>`;
      }).join('');
    }).join('');

    const starGridLayer = `<g opacity="0.04">${starGrid}</g>`;

    // ── 3. Thin Gold Double Border ─────────────────────────────────
    // Outer: 40px inset, 3px gold stroke
    // Inner: 56px inset, 1px gold stroke, rx=4
    const doubleBorder = `
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}"
            fill="none" stroke="${palette.gold}" stroke-width="3"/>
      <rect x="56" y="56" width="${W - 112}" height="${H - 112}" rx="4"
            fill="none" stroke="${palette.gold}" stroke-width="1"/>
      <!-- Corner diamond accents -->
      <polygon points="48,44 52,48 48,52 44,48" fill="${palette.gold}"/>
      <polygon points="${W - 48},44 ${W - 44},48 ${W - 48},52 ${W - 52},48" fill="${palette.gold}"/>
      <polygon points="48,${H - 52} 52,${H - 48} 48,${H - 44} 44,${H - 48}" fill="${palette.gold}"/>
      <polygon points="${W - 48},${H - 52} ${W - 44},${H - 48} ${W - 48},${H - 44} ${W - 52},${H - 48}" fill="${palette.gold}"/>
    `;

    // ── 2. ROSE WINDOW GEOMETRIC CIRCLE centered at (W/2, 480) ────
    const rcx = W / 2; // 540
    const rcy = 480;

    // Radiating spokes from center: 24 thin gold lines at 2% opacity
    const spokes = Array.from({ length: 24 }, (_, i) => {
      const angle = (i * 2 * PI) / 24 - PI / 2;
      const [x2, y2] = polarToCartesian(rcx, rcy, 360, angle);
      return `<line x1="${rcx}" y1="${rcy}" x2="${x2}" y2="${y2}"
                    stroke="${palette.gold}" stroke-width="1" opacity="0.02"/>`;
    }).join('');

    // Outermost ring (r=360): 12 pointed arch segments, alternating ruby and sapphire at 35% opacity, stroke gold 1px
    const ring1 = Array.from({ length: 12 }, (_, i) => {
      const a1 = (i * 2 * PI) / 12 - PI / 2;
      const a2 = ((i + 1) * 2 * PI) / 12 - PI / 2;
      const pathData = makePointedArchSegment(rcx, rcy, 280, 360, a1, a2);
      const fill = i % 2 === 0 ? palette.ruby : palette.sapphire;
      return `<path d="${pathData}" fill="${fill}" fill-opacity="0.35"
                    stroke="${palette.gold}" stroke-width="1"/>`;
    }).join('');

    // Second ring (r=280): 12 trapezoidal segments, emerald and amber at 40% opacity
    const ring2 = Array.from({ length: 12 }, (_, i) => {
      const a1 = (i * 2 * PI) / 12 - PI / 2;
      const a2 = ((i + 1) * 2 * PI) / 12 - PI / 2;
      const pathData = makeAnnularSector(rcx, rcy, 200, 280, a1, a2);
      const fill = i % 2 === 0 ? palette.emerald : palette.amber;
      return `<path d="${pathData}" fill="${fill}" fill-opacity="0.4"
                    stroke="${palette.gold}" stroke-width="1"/>`;
    }).join('');

    // Third ring (r=200): 8 larger segments, alternating ruby and sapphire at 50% opacity
    const ring3 = Array.from({ length: 8 }, (_, i) => {
      const a1 = (i * 2 * PI) / 8 - PI / 2;
      const a2 = ((i + 1) * 2 * PI) / 8 - PI / 2;
      const pathData = makeAnnularSector(rcx, rcy, 130, 200, a1, a2);
      const fill = i % 2 === 0 ? palette.ruby : palette.sapphire;
      return `<path d="${pathData}" fill="${fill}" fill-opacity="0.5"
                    stroke="${palette.gold}" stroke-width="1"/>`;
    }).join('');

    // Fourth ring (r=130): 8 petal shapes, amber at 60% opacity
    const ring4 = Array.from({ length: 8 }, (_, i) => {
      const a1 = (i * 2 * PI) / 8 - PI / 2;
      const a2 = ((i + 1) * 2 * PI) / 8 - PI / 2;
      const pathData = makePetalShape(rcx, rcy, 65, 130, a1, a2);
      return `<path d="${pathData}" fill="${palette.amber}" fill-opacity="0.6"
                    stroke="${palette.gold}" stroke-width="1"/>`;
    }).join('');

    // Center circle (r=65): gold at 50% opacity with delicate cathedral rosette
    const centerCircle = `
      <circle cx="${rcx}" cy="${rcy}" r="65"
              fill="${palette.gold}" fill-opacity="0.5"
              stroke="${palette.gold}" stroke-width="1.5"/>
      <!-- Inner central rosette -->
      <circle cx="${rcx}" cy="${rcy}" r="34"
              fill="${palette.ruby}" fill-opacity="0.45"
              stroke="${palette.gold}" stroke-width="1"/>
      <circle cx="${rcx}" cy="${rcy}" r="14"
              fill="${palette.gold}" fill-opacity="0.85"
              stroke="${palette.amber}" stroke-width="1"/>
      <circle cx="${rcx}" cy="${rcy}" r="4" fill="${palette.ivory}"/>
    `;

    // All ring boundaries: 1.5px gold stroke
    const ringBoundaries = `
      <circle cx="${rcx}" cy="${rcy}" r="360" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
      <circle cx="${rcx}" cy="${rcy}" r="280" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
      <circle cx="${rcx}" cy="${rcy}" r="200" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
      <circle cx="${rcx}" cy="${rcy}" r="130" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
    `;

    const roseWindow = `
      <g id="rose-window">
        ${spokes}
        ${ring1}
        ${ring2}
        ${ring3}
        ${ring4}
        ${centerCircle}
        ${ringBoundaries}
      </g>
    `;

    // ── 5. blessingLine: Cormorant Garamond italic 28px, fill ivory 80%, y≈860
    const blessingLineText = v.blessingLine || 'I have found the one whom my soul loves. — Song of Solomon 3:4';
    const blessingLineSVG = blessingLineText ? svgFitText(blessingLineText, {
      x: W / 2,
      y: 860,
      maxWidth: 820,
      maxSize: 28,
      fontFamily: displayFont,
      fontWeight: '400',
      fill: palette.ivory,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic" opacity="0.8"',
    }) : '';

    // ── 6. eventType: JOST 22px letter-spaced, fill gold, y≈910 ───
    const eventTypeText = (v.eventType || 'Holy Matrimony').toUpperCase();
    const eventTypeSVG = svgFitText(eventTypeText, {
      x: W / 2,
      y: 910,
      maxWidth: 750,
      maxSize: 22,
      fontFamily: bodyFont,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' letter-spacing="4"',
    });

    // ── 7. groomName: Cormorant Garamond bold, fill ivory, y≈1000, auto-fit maxWidth 700
    const groomNameText = v.groomName || 'Ethan Matthew James';
    const groomSVG = svgFitText(groomNameText, {
      x: W / 2,
      y: 1000,
      maxWidth: 700,
      maxSize: 64,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: palette.ink || palette.ivory,
      textAnchor: 'middle',
    });

    // ── 8. '&' italic 52px, fill gold, y≈1080 ─────────────────────
    const ampersandSVG = `
      <text x="${W / 2}" y="1080" text-anchor="middle"
            font-family="${displayFont}, serif" font-style="italic"
            font-size="52" fill="${palette.gold}">&amp;</text>
    `;

    // ── 9. brideName: same as groomName, y≈1170 ───────────────────
    const brideNameText = v.brideName || 'Grace Abigail Thomas';
    const brideSVG = svgFitText(brideNameText, {
      x: W / 2,
      y: 1170,
      maxWidth: 700,
      maxSize: 64,
      fontFamily: displayFont,
      fontWeight: '700',
      fill: palette.ink || palette.ivory,
      textAnchor: 'middle',
    });

    // ── 10. Thin gold rule at y≈1220 ──────────────────────────────
    const goldRule = `
      <g opacity="0.75">
        <line x1="240" y1="1220" x2="510" y2="1220" stroke="${palette.gold}" stroke-width="1.2"/>
        <line x1="570" y1="1220" x2="840" y2="1220" stroke="${palette.gold}" stroke-width="1.2"/>
        <polygon points="540,1214 546,1220 540,1226 534,1220" fill="${palette.gold}"/>
        <circle cx="522" cy="1220" r="2.5" fill="${palette.gold}"/>
        <circle cx="558" cy="1220" r="2.5" fill="${palette.gold}"/>
        <circle cx="240" cy="1220" r="2" fill="${palette.gold}"/>
        <circle cx="840" cy="1220" r="2" fill="${palette.gold}"/>
      </g>
    `;

    // ── 11. date: Cormorant Garamond 34px, fill ivory, y≈1280 ─────
    const dateText = v.date || 'Saturday, 17th October 2026';
    const dateSVG = svgFitText(dateText, {
      x: W / 2,
      y: 1280,
      maxWidth: 800,
      maxSize: 34,
      fontFamily: displayFont,
      fontWeight: '600',
      fill: palette.ivory,
      textAnchor: 'middle',
    });

    // ── 12. time: Jost 26px, fill ivory at 75% opacity, y≈1325 ────
    const timeText = v.time || 'Four o’clock in the afternoon';
    const timeSVG = svgFitText(timeText, {
      x: W / 2,
      y: 1325,
      maxWidth: 750,
      maxSize: 26,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: palette.ivory,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.75"',
    });

    // ── 13. venue: Cormorant Garamond italic 30px, fill ivory, y≈1380
    const venueText = v.venue || 'Cathedral of All Saints, Riverside Gardens';
    const venueSVG = svgFitText(venueText, {
      x: W / 2,
      y: 1380,
      maxWidth: 750,
      maxSize: 30,
      fontFamily: displayFont,
      fontWeight: '400',
      fill: palette.ivory,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    });

    // ── 14. hostedBy: Cormorant Garamond 26px, fill ivory at 65% opacity, y≈1445
    const hostedByText = v.hostedBy || 'Together with their families';
    const hostedBySVG = hostedByText ? svgFitText(hostedByText, {
      x: W / 2,
      y: 1435, // centered around y≈1445 fitting cleanly inside the inner border (y=1444)
      maxWidth: 750,
      maxSize: 26,
      fontFamily: displayFont,
      fontWeight: '400',
      fill: palette.ivory,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.65"',
    }) : '';

    // Optional RSVP
    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1460,
      maxWidth: 600,
      maxSize: 18,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.8"',
    }) : '';

    return `
      ${defs}
      ${background}
      ${starGridLayer}
      ${doubleBorder}
      ${roseWindow}
      ${blessingLineSVG}
      ${eventTypeSVG}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${goldRule}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedBySVG}
      ${rsvpSVG}
    `;
  },
};
