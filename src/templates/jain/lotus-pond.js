/**
 * Jain – Lotus Pond (Wedding Invitation)
 *
 * A serene, airy aesthetic inspired by sacred lotus motifs in Jain art.
 * Features an intricately layered 3-ring blooming lotus, tranquil water-lily
 * pads and buds, and refined typography.
 */

import { svgFitText as coreSvgFitText, wrapLines as coreWrapLines } from '../../core/textFit.js';

export default {
  id: 'jain-wedding-lotus',
  tradition: 'jain',
  occasion: 'wedding',
  name: 'Lotus Pond',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:        '#FFFDF5',
    ink:       '#2A1010',
    accent:    '#9B2226',
    accent2:   '#E9A9BC',
    paper:     '#FFFDF5',
    gold:      '#E0A030',
    pink:      '#E9A9BC',
    deepPink:  '#C06080',
    leafGreen: '#5C8A5A',
    cream:     '#FFFDF5',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Noto Serif Devanagari',
  },

  fontPairs: [
    { id: 'classic', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
    { id: 'elegant', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
  ],

  fields: [
    {
      key: 'namokar',
      label: 'Namokar Mantra (optional)',
      default: 'णमो अरिहंताणं',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Muni before printing.',
    },
    {
      key: 'ahimsa',
      label: 'Ahimsa Paramo Dharma (optional)',
      default: 'अहिंसा परमो धर्मः',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Please verify before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Wedding Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Rajesh Shah',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Pooja Jain',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Friday, 13th March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '11:00 AM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Jain Bhavan, Palitana',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Shah & Jain Families',
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

  /**
   * Renders the inner SVG content for the Lotus Pond template.
   */
  render(values, palette, helpers) {
    const W = 1080;
    const H = 1500;
    const svgFitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML  = helpers?.escapeXML  || ((s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'));
    const v = values || {};

    // Dynamic font family selection based on fontPair option
    const isElegant = v.fontPair === 'elegant';
    const fontDisplay = isElegant ? 'Playfair Display, serif' : 'Cormorant Garamond, serif';
    const fontBody = 'Jost, sans-serif';
    const fontNative = 'Noto Serif Devanagari, serif';

    // ── 1. Ivory Background ──────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Frames & Borders ───────────────────────────────────────
    // Thin outer gold frame (inset 40px, 2px stroke, rx=6)
    // Thin inner dotted frame (inset 56px, 1px dashed stroke)
    const frames = `
      <!-- Outer gold frame -->
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
            stroke="${palette.gold}" stroke-width="2" rx="6"/>
      <!-- Inner dashed gold frame -->
      <rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none"
            stroke="${palette.gold}" stroke-width="1" stroke-dasharray="5 5" rx="4" opacity="0.75"/>
      <!-- Four subtle corner ornaments -->
      <g stroke="${palette.gold}" stroke-width="1" fill="none" opacity="0.65">
        <path d="M 62 76 L 76 76 L 76 62"/>
        <path d="M ${W - 62} 76 L ${W - 76} 76 L ${W - 76} 62"/>
        <path d="M 62 ${H - 76} L 76 ${H - 76} L 76 ${H - 62}"/>
        <path d="M ${W - 62} ${H - 76} L ${W - 76} ${H - 76} L ${W - 76} ${H - 62}"/>
        <circle cx="76" cy="76" r="2" fill="${palette.gold}"/>
        <circle cx="${W - 76}" cy="76" r="2" fill="${palette.gold}"/>
        <circle cx="76" cy="${H - 76}" r="2" fill="${palette.gold}"/>
        <circle cx="${W - 76}" cy="${H - 76}" r="2" fill="${palette.gold}"/>
      </g>
    `;

    // ── 3. LARGE LAYERED LOTUS at Top Center ──────────────────────
    // Center: (cx = W / 2 = 540, cy = 320), petal_length ≈ 200
    const lotusCx = W / 2;
    const lotusCy = 320;

    // Helper: generate a ring of petals radiating outward using trigonometry
    function buildPetalRing(count, offsetDeg, dist, rx, ry, fill, opacity, tipDotR, tipDotColor) {
      const petals = [];
      const tips = [];
      const veins = [];

      for (let i = 0; i < count; i++) {
        const angleDeg = offsetDeg + i * (360 / count);
        const rad = (angleDeg - 90) * (Math.PI / 180);

        // Center of the petal ellipse
        const px = lotusCx + Math.cos(rad) * dist;
        const py = lotusCy + Math.sin(rad) * dist;

        // Outer tip of the petal
        const tipX = lotusCx + Math.cos(rad) * (dist + ry);
        const tipY = lotusCy + Math.sin(rad) * (dist + ry);

        // Petal ellipse rotated around its own center
        petals.push(
          `<ellipse cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" rx="${rx}" ry="${ry}" ` +
          `fill="${fill}" opacity="${opacity}" ` +
          `transform="rotate(${angleDeg.toFixed(2)}, ${px.toFixed(2)}, ${py.toFixed(2)})"/>`
        );

        // Subtle radiating central vein line for botanical realism
        const veinBaseX = lotusCx + Math.cos(rad) * (dist - ry * 0.5);
        const veinBaseY = lotusCy + Math.sin(rad) * (dist - ry * 0.5);
        const veinTipX = lotusCx + Math.cos(rad) * (dist + ry * 0.85);
        const veinTipY = lotusCy + Math.sin(rad) * (dist + ry * 0.85);
        veins.push(
          `<line x1="${veinBaseX.toFixed(2)}" y1="${veinBaseY.toFixed(2)}" ` +
          `x2="${veinTipX.toFixed(2)}" y2="${veinTipY.toFixed(2)}" ` +
          `stroke="${palette.deepPink}" stroke-width="0.8" opacity="0.3"/>`
        );

        // Tiny darker dot at the petal tip
        if (tipDotR > 0 && tipDotColor) {
          tips.push(
            `<circle cx="${tipX.toFixed(2)}" cy="${tipY.toFixed(2)}" r="${tipDotR}" ` +
            `fill="${tipDotColor}" opacity="0.95"/>`
          );
        }
      }

      return { petals: petals.join(''), veins: veins.join(''), tips: tips.join('') };
    }

    // Outer ring: 12 large petals, elongated ellipses rotated evenly, pink #E9A9BC at 75% opacity
    // Total petal length: 2 * ry = 190px (petal_length ≈ 200px)
    const outerRing = buildPetalRing(12, 0, 85, 36, 95, palette.pink, 0.75, 3.5, palette.deepPink);

    // Middle ring: 10 petals, slightly smaller, deeper pink #C06080 at 65% opacity, rotated 18° offset
    const middleRing = buildPetalRing(10, 18, 70, 29, 76, palette.deepPink, 0.65, 2.8, palette.deepPink);

    // Inner ring: 8 smaller petals, gold #E0A030 at 80% opacity, rotated 22.5° offset
    const innerRing = buildPetalRing(8, 22.5, 52, 22, 54, palette.gold, 0.80, 2.2, palette.deepPink);

    // Center stamens radiating around pericarp
    const stamenDots = Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 22.5 - 90) * (Math.PI / 180);
      const sx = lotusCx + Math.cos(angle) * 26;
      const sy = lotusCy + Math.sin(angle) * 26;
      return `<circle cx="${sx.toFixed(2)}" cy="${sy.toFixed(2)}" r="2" fill="${palette.accent}" opacity="0.7"/>`;
    }).join('');

    const lotusAura = `
      <!-- Delicate spiritual halo rings behind lotus -->
      <circle cx="${lotusCx}" cy="${lotusCy}" r="208" fill="none"
              stroke="${palette.gold}" stroke-width="0.75" stroke-dasharray="3 6" opacity="0.35"/>
      <circle cx="${lotusCx}" cy="${lotusCy}" r="226" fill="none"
              stroke="${palette.pink}" stroke-width="0.75" opacity="0.25"/>
    `;

    const lotusFlower = `
      <g id="lotus-motif" role="presentation">
        ${lotusAura}
        <!-- Outer ring petals -->
        ${outerRing.petals}
        ${outerRing.veins}
        ${outerRing.tips}
        <!-- Middle ring petals -->
        ${middleRing.petals}
        ${middleRing.veins}
        ${middleRing.tips}
        <!-- Inner ring petals -->
        ${innerRing.petals}
        ${innerRing.tips}
        <!-- Center: yellow/gold circle r=45, fill #F2C050 -->
        <circle cx="${lotusCx}" cy="${lotusCy}" r="45" fill="#F2C050"/>
        <!-- Fine dotted ring on seed head -->
        <circle cx="${lotusCx}" cy="${lotusCy}" r="36" fill="none"
                stroke="${palette.gold}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8"/>
        <!-- Seed pod stamens -->
        ${stamenDots}
        <!-- Central pistil node -->
        <circle cx="${lotusCx}" cy="${lotusCy}" r="7" fill="${palette.gold}"/>
        <circle cx="${lotusCx}" cy="${lotusCy}" r="3" fill="#FFFDF5"/>
      </g>
    `;

    // ── 4. LOTUS LEAVES & BUDS at Bottom (y: 1250–1450) ───────────
    // Helper: render a rounded lily pad with characteristic gentle notch and radiating veins
    function renderLilyPad(cx, cy, rx, ry, rotDeg, opacity) {
      const veinLines = Array.from({ length: 8 }, (_, i) => {
        const rad = (rotDeg + i * 45) * (Math.PI / 180);
        const vx = cx + Math.cos(rad) * (rx * 0.78);
        const vy = cy + Math.sin(rad) * (ry * 0.78);
        return `<line x1="${cx}" y1="${cy}" x2="${vx.toFixed(1)}" y2="${vy.toFixed(1)}" ` +
               `stroke="${palette.leafGreen}" stroke-width="1" opacity="0.22"/>`;
      }).join('');

      return `
        <g>
          <!-- Broad lily pad ellipse -->
          <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"
                   fill="${palette.leafGreen}" opacity="${opacity}"
                   transform="rotate(${rotDeg}, ${cx}, ${cy})"/>
          <!-- Leaf veins -->
          ${veinLines}
          <!-- Central notch slit -->
          <polygon points="${cx},${cy} ${(cx - 6).toFixed(1)},${(cy - ry * 0.95).toFixed(1)} ${(cx + 6).toFixed(1)},${(cy - ry * 0.95).toFixed(1)}"
                   fill="${palette.bg}" opacity="0.75"
                   transform="rotate(${rotDeg}, ${cx}, ${cy})"/>
          <!-- Stem attachment point -->
          <circle cx="${cx}" cy="${cy}" r="3" fill="${palette.leafGreen}" opacity="0.55"/>
        </g>
      `;
    }

    // 3–4 large rounded lily-pad shapes (broad ellipses, ~180×140px, leafGreen #5C8A5A at 40% opacity)
    const largeLeaves = [
      renderLilyPad(260, 1360, 92, 70, -10, 0.40),
      renderLilyPad(540, 1420, 98, 72, 4, 0.40),
      renderLilyPad(810, 1365, 92, 70, -6, 0.40),
      renderLilyPad(410, 1335, 86, 62, 12, 0.35),
    ].join('');

    // 2–3 smaller half-visible leaves at edges
    const edgeLeaves = [
      renderLilyPad(45, 1410, 80, 56, 20, 0.35),
      renderLilyPad(1035, 1400, 80, 56, -20, 0.35),
      renderLilyPad(20, 1300, 65, 46, -14, 0.30),
      renderLilyPad(1060, 1310, 65, 46, 14, 0.30),
    ].join('');

    // Water ripple arcs
    const ripples = `
      <ellipse cx="260" cy="1395" rx="120" ry="12" fill="none" stroke="${palette.gold}" stroke-width="0.8" opacity="0.22"/>
      <ellipse cx="810" cy="1400" rx="115" ry="11" fill="none" stroke="${palette.gold}" stroke-width="0.8" opacity="0.22"/>
      <ellipse cx="540" cy="1445" rx="135" ry="13" fill="none" stroke="${palette.gold}" stroke-width="0.8" opacity="0.18"/>
    `;

    // 2 small lotus buds on thin stems rising from leaves
    // Left bud: rising from ~ (210, 1370) to (185, 1260)
    // Right bud: rising from ~ (870, 1370) to (895, 1260)
    const lotusBuds = `
      <!-- Left lotus bud stem and flower -->
      <path d="M 210 1370 Q 182 1315 185 1260" fill="none"
            stroke="${palette.leafGreen}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
      <g transform="translate(185, 1260)">
        <!-- Outer pink petal -->
        <path d="M 0 -42 C -16 -24 -18 -8 0 0 C 18 -8 16 -24 0 -42 Z"
              fill="${palette.pink}" opacity="0.95"/>
        <!-- Inner deep pink petal overlap -->
        <path d="M 0 -38 C -10 -22 -11 -6 0 0 C 11 -6 10 -22 0 -38 Z"
              fill="${palette.deepPink}" opacity="0.75"/>
        <!-- Base sepals in leaf green -->
        <path d="M -11 -4 Q 0 4 11 -4" fill="none"
              stroke="${palette.leafGreen}" stroke-width="2" stroke-linecap="round"/>
        <!-- Delicate bud tip dot -->
        <circle cx="0" cy="-44" r="2.2" fill="${palette.deepPink}"/>
      </g>

      <!-- Right lotus bud stem and flower -->
      <path d="M 870 1370 Q 898 1315 895 1260" fill="none"
            stroke="${palette.leafGreen}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
      <g transform="translate(895, 1260)">
        <!-- Outer pink petal -->
        <path d="M 0 -42 C -16 -24 -18 -8 0 0 C 18 -8 16 -24 0 -42 Z"
              fill="${palette.pink}" opacity="0.95"/>
        <!-- Inner deep pink petal overlap -->
        <path d="M 0 -38 C -10 -22 -11 -6 0 0 C 11 -6 10 -22 0 -38 Z"
              fill="${palette.deepPink}" opacity="0.75"/>
        <!-- Base sepals in leaf green -->
        <path d="M -11 -4 Q 0 4 11 -4" fill="none"
              stroke="${palette.leafGreen}" stroke-width="2" stroke-linecap="round"/>
        <!-- Delicate bud tip dot -->
        <circle cx="0" cy="-44" r="2.2" fill="${palette.deepPink}"/>
      </g>
    `;

    const pondBase = `
      <g id="lotus-pond-bottom" role="presentation">
        ${ripples}
        ${largeLeaves}
        ${edgeLeaves}
        ${lotusBuds}
      </g>
    `;

    // ── 5. Typography & Text Elements ─────────────────────────────

    // 6. Namokar Mantra (if enabled): Noto Serif Devanagari 32px, fill accent #9B2226, centered at y≈500
    const namokarSVG = v.namokar ? svgFitText(v.namokar, {
      x: W / 2,
      y: 505,
      maxWidth: 820,
      maxSize: 32,
      fontFamily: fontNative,
      fontWeight: 'normal',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    // 7. Ahimsa Paramo Dharma (if enabled): Noto Serif Devanagari 28px, fill gold #E0A030, centered at y≈550
    const ahimsaSVG = v.ahimsa ? svgFitText(v.ahimsa, {
      x: W / 2,
      y: 550,
      maxWidth: 820,
      maxSize: 28,
      fontFamily: fontNative,
      fontWeight: 'normal',
      fill: palette.gold,
      textAnchor: 'middle',
    }) : '';

    // 8. eventType: JOST 24px letter-spaced, fill gold, y≈610
    const eventTypeStr = String(v.eventType || 'Wedding Invitation').toUpperCase();
    const eventTypeSVG = svgFitText(eventTypeStr, {
      x: W / 2,
      y: 610,
      maxWidth: 720,
      maxSize: 24,
      fontFamily: fontBody,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' letter-spacing="5"',
    });

    // 9. Thin gold rule at y≈640
    const goldRuleSVG = `
      <g stroke="${palette.gold}" stroke-width="1.2" opacity="0.8">
        <line x1="${W / 2 - 130}" y1="640" x2="${W / 2 + 130}" y2="640"/>
        <circle cx="${W / 2}" cy="640" r="3.5" fill="${palette.gold}"/>
        <circle cx="${W / 2 - 42}" cy="640" r="2" fill="${palette.gold}" opacity="0.6"/>
        <circle cx="${W / 2 + 42}" cy="640" r="2" fill="${palette.gold}" opacity="0.6"/>
      </g>
    `;

    // 10. groomName: Cormorant Garamond bold, fill accent #9B2226, y≈740, auto-fit maxWidth 700
    const groomSVG = svgFitText(v.groomName || 'Rajesh Shah', {
      x: W / 2,
      y: 740,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: fontDisplay,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // 11. '&' italic 52px, fill gold, y≈830
    const ampersandSVG = `
      <text x="${W / 2}" y="830" text-anchor="middle"
            font-family="${escapeXML(fontDisplay)}" font-style="italic"
            font-size="52" fill="${palette.gold}">&amp;</text>
    `;

    // 12. brideName: Cormorant Garamond bold, fill accent #9B2226, y≈930, auto-fit maxWidth 700
    const brideSVG = svgFitText(v.brideName || 'Pooja Jain', {
      x: W / 2,
      y: 930,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: fontDisplay,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // 13. Lotus bud decorative element at y≈990 (3 small pink ellipses)
    const lotusBudDecorativeSVG = `
      <g transform="translate(${W / 2}, 990)">
        <!-- Center petal -->
        <ellipse cx="0" cy="0" rx="5.5" ry="13" fill="${palette.pink}"/>
        <!-- Left tilted petal -->
        <ellipse cx="-7" cy="2" rx="4.5" ry="11" fill="${palette.deepPink}" opacity="0.85"
                 transform="rotate(-22, -7, 2)"/>
        <!-- Right tilted petal -->
        <ellipse cx="7" cy="2" rx="4.5" ry="11" fill="${palette.deepPink}" opacity="0.85"
                 transform="rotate(22, 7, 2)"/>
        <!-- Calyx line -->
        <path d="M -9 8 Q 0 13 9 8" fill="none" stroke="${palette.gold}" stroke-width="1.4" stroke-linecap="round"/>
        <!-- Flanking gold flourish lines and dots -->
        <circle cx="0" cy="15" r="2.5" fill="${palette.gold}"/>
        <line x1="-70" y1="15" x2="-14" y2="15" stroke="${palette.gold}" stroke-width="0.8" opacity="0.6"/>
        <line x1="14" y1="15" x2="70" y2="15" stroke="${palette.gold}" stroke-width="0.8" opacity="0.6"/>
        <circle cx="-70" cy="15" r="1.5" fill="${palette.gold}" opacity="0.5"/>
        <circle cx="70" cy="15" r="1.5" fill="${palette.gold}" opacity="0.5"/>
      </g>
    `;

    // 14. date: Cormorant Garamond 36px, fill ink, y≈1060
    const dateSVG = svgFitText(v.date || 'Friday, 13th March 2026', {
      x: W / 2,
      y: 1060,
      maxWidth: 760,
      maxSize: 36,
      fontFamily: fontDisplay,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // 15. time: Jost 28px, fill ink muted, y≈1110
    const timeSVG = svgFitText(v.time || '11:00 AM', {
      x: W / 2,
      y: 1110,
      maxWidth: 760,
      maxSize: 28,
      fontFamily: fontBody,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.78"',
    });

    // 16. venue: Cormorant Garamond 34px, fill ink, y≈1170
    const venueSVG = svgFitText(v.venue || 'Jain Bhavan, Palitana', {
      x: W / 2,
      y: 1170,
      maxWidth: 760,
      maxSize: 34,
      fontFamily: fontDisplay,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // 17. hostedBy: Cormorant Garamond 28px, fill ink muted, y≈1290
    const hostedSVG = v.hostedBy ? svgFitText(v.hostedBy, {
      x: W / 2,
      y: 1290,
      maxWidth: 700,
      maxSize: 28,
      fontFamily: fontDisplay,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.4,
      extraAttrs: ' opacity="0.85"',
    }) : '';

    // 18. rsvp if present, y≈1410
    const rsvpSVG = v.rsvp ? svgFitText(v.rsvp, {
      x: W / 2,
      y: 1410,
      maxWidth: 650,
      maxSize: 22,
      fontFamily: fontBody,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.75"',
    }) : '';

    // Assemble the complete inner SVG markup
    return `
      ${bg}
      ${frames}
      ${lotusFlower}
      ${pondBase}
      <!-- Text content (layered above art) -->
      ${namokarSVG}
      ${ahimsaSVG}
      ${eventTypeSVG}
      ${goldRuleSVG}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${lotusBudDecorativeSVG}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
