/**
 * Jain – Kalash Gold
 *
 * Traditional Jain wedding invitation featuring the sacred Mangal Kalash (sacred urn),
 * five fanned mango leaves (amra pallav), coconut (shriphal) with sacred tilak,
 * mauli string, and the auspicious Jain emblem with Ratnatraya & Siddhashila.
 */

import { svgFitText } from '../../core/textFit.js';

export default {
  id: 'jain-wedding-kalash',
  tradition: 'jain',
  occasion: 'wedding',
  name: 'Kalash Gold',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:        '#FFFDF5',
    ink:       '#2A1010',
    accent:    '#9B2226',
    accent2:   '#E0A030',
    paper:     '#FFFDF5',
    gold:      '#E0A030',
    saffron:   '#E0A030',
    deepRed:   '#9B2226',
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
      default: '॥ ॐ णमो अरिहंताणं ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Sacred Jain invocation. Verify with family or elders before printing.',
    },
    {
      key: 'ahimsa',
      label: 'Ahimsa motto (optional)',
      default: '॥ अहिंसा परमो धर्मः ॥',
      lang: 'hi',
      multiline: false,
      optional: true,
      note: 'Core Jain philosophy motto.',
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
      label: "Groom's name",
      default: 'Aarav Shah',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Ananya Mehta',
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
      default: '10:30 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'The Grand Pavilion, Vile Parle, Mumbai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Shah & Mehta Families',
      lang: 'en',
      multiline: true,
    },
    {
      key: 'rsvp',
      label: 'RSVP',
      default: '+91 98765 43210',
      lang: 'en',
      multiline: false,
      optional: true,
    },
  ],

  /**
   * Render SVG inner content for the Kalash Gold template.
   * @param {object} values   Field values
   * @param {object} palette  Template colour palette
   * @param {object} helpers  { svgFitText, escapeXML, wrapLines }
   * @returns {string} SVG inner markup
   */
  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const fitText = helpers?.svgFitText || svgFitText;
    const esc = helpers?.escapeXML || ((s) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'));
    const v = values || {};

    // Active font pairing
    const pair = (this.fontPairs || []).find((p) => p.id === v.fontPair) || this.fontPairs[0];
    const displayFont = pair?.display || 'Cormorant Garamond';
    const bodyFont = pair?.body || 'Jost';
    const nativeFont = 'Noto Serif Devanagari';

    // Gradients & Defs
    const defs = `
      <defs>
        <!-- Pot body highlight gradient (light on left, rich gold in middle, shaded right) -->
        <linearGradient id="kalashPotGrad" x1="12%" y1="20%" x2="90%" y2="80%">
          <stop offset="0%" stop-color="#FFF5C0" />
          <stop offset="22%" stop-color="#F6CE6A" />
          <stop offset="60%" stop-color="${palette.gold}" />
          <stop offset="100%" stop-color="#A56E1A" />
        </linearGradient>

        <!-- Pedestal highlight gradient -->
        <linearGradient id="kalashBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFF0A8" />
          <stop offset="45%" stop-color="${palette.gold}" />
          <stop offset="100%" stop-color="#996316" />
        </linearGradient>

        <!-- Mango leaf gradient -->
        <linearGradient id="kalashLeafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#41663F" />
          <stop offset="65%" stop-color="${palette.leafGreen}" />
          <stop offset="100%" stop-color="#7CA878" />
        </linearGradient>

        <!-- Coconut gradient (radial light from top-left) -->
        <radialGradient id="kalashCoconutGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stop-color="#9C6639" />
          <stop offset="55%" stop-color="#6F3F19" />
          <stop offset="100%" stop-color="#46240D" />
        </radialGradient>
      </defs>
    `;

    // 1. Background
    const bg = `<rect width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // 2. Gold Border Frame
    // Outer 2.5px gold stroke rect at 36px inset, inner 1px gold stroke at 52px inset, both rx=6
    const frame = `
      <rect x="36" y="36" width="${W - 72}" height="${H - 72}" rx="6" fill="none"
            stroke="${palette.gold}" stroke-width="2.5"/>
      <rect x="52" y="52" width="${W - 104}" height="${H - 104}" rx="6" fill="none"
            stroke="${palette.gold}" stroke-width="1"/>
    `;

    // 3. Corner Paisley Accents
    // 4 corners inside the frame, each a classical teardrop/paisley in muted saffron at 50% opacity, ~80x120px
    const paisleySVG = renderPaisleySilhouette(palette);
    const cornerPaisleys = `
      <g transform="translate(68, 68)">${paisleySVG}</g>
      <g transform="translate(${W - 68}, 68) scale(-1, 1)">${paisleySVG}</g>
      <g transform="translate(68, ${H - 68}) scale(1, -1)">${paisleySVG}</g>
      <g transform="translate(${W - 68}, ${H - 68}) scale(-1, -1)">${paisleySVG}</g>
    `;

    // 4. Centred Kalash Centerpiece at (W/2, 480)
    const kalash = renderKalashCenterpiece(W / 2, 480, palette);

    // 5. namokar if enabled: Noto Serif Devanagari 34px, fill deepRed #9B2226, y≈780
    const showNamokar = v.namokar__enabled !== false && Boolean(v.namokar);
    const namokarSVG = showNamokar ? fitText(v.namokar || '॥ ॐ णमो अरिहंताणं ॥', {
      x: W / 2,
      y: 780,
      maxWidth: 880,
      maxSize: 34,
      fontFamily: `'${nativeFont}', serif`,
      fontWeight: '600',
      fill: palette.deepRed,
      textAnchor: 'middle',
    }) : '';

    // 6. ahimsa if enabled: Noto Serif Devanagari 28px, fill gold #E0A030, y≈830
    const showAhimsa = v.ahimsa__enabled !== false && Boolean(v.ahimsa);
    const ahimsaSVG = showAhimsa ? fitText(v.ahimsa || '॥ अहिंसा परमो धर्मः ॥', {
      x: W / 2,
      y: 830,
      maxWidth: 880,
      maxSize: 28,
      fontFamily: `'${nativeFont}', serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
    }) : '';

    // 7. eventType: JOST 24px letter-spaced, fill gold, y≈880
    const eventSVG = fitText((v.eventType || 'Wedding Invitation').toUpperCase(), {
      x: W / 2,
      y: 880,
      maxWidth: 800,
      maxSize: 24,
      fontFamily: `'${bodyFont}', sans-serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="5"',
    });

    // 8. Thin double gold rule at y≈910
    const doubleRule = `
      <g transform="translate(0, 910)">
        <line x1="220" y1="-2" x2="${W - 220}" y2="-2" stroke="${palette.gold}" stroke-width="1.2"/>
        <line x1="260" y1="2" x2="${W - 260}" y2="2" stroke="${palette.gold}" stroke-width="0.8" opacity="0.75"/>
        <polygon points="${W / 2}, -7 ${W / 2 + 7}, 0 ${W / 2}, 7 ${W / 2 - 7}, 0" fill="${palette.gold}"/>
        <circle cx="${W / 2 - 24}" cy="0" r="2.5" fill="${palette.gold}" opacity="0.7"/>
        <circle cx="${W / 2 + 24}" cy="0" r="2.5" fill="${palette.gold}" opacity="0.7"/>
      </g>
    `;

    // 9. groomName: Cormorant Garamond bold, fill deepRed, y≈980, auto-fit maxWidth 700
    const groomSVG = fitText(v.groomName || 'Aarav Shah', {
      x: W / 2,
      y: 980,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: `'${displayFont}', serif`,
      fontWeight: '700',
      fill: palette.deepRed,
      textAnchor: 'middle',
    });

    // 10. '&' italic 52px, fill gold, y≈1070
    const ampersandSVG = `
      <text x="${W / 2}" y="1070" text-anchor="middle"
            font-family="'${displayFont}', serif" font-style="italic"
            font-size="52" fill="${palette.gold}">&amp;</text>
    `;

    // 11. brideName: same, y≈1170
    const brideSVG = fitText(v.brideName || 'Ananya Mehta', {
      x: W / 2,
      y: 1165,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: `'${displayFont}', serif`,
      fontWeight: '700',
      fill: palette.deepRed,
      textAnchor: 'middle',
    });

    // 12. Small decorative element (3 small circles) at y≈1230
    const decor12 = `
      <g transform="translate(${W / 2}, 1226)">
        <line x1="-80" y1="0" x2="-28" y2="0" stroke="${palette.gold}" stroke-width="1" opacity="0.5"/>
        <circle cx="-16" cy="0" r="3" fill="${palette.gold}" opacity="0.6"/>
        <circle cx="0" cy="0" r="4.5" fill="${palette.gold}"/>
        <circle cx="16" cy="0" r="3" fill="${palette.gold}" opacity="0.6"/>
        <line x1="28" y1="0" x2="80" y2="0" stroke="${palette.gold}" stroke-width="1" opacity="0.5"/>
      </g>
    `;

    // 13. date: Cormorant Garamond 34px, fill ink, y≈1290
    const dateSVG = fitText(v.date || 'Sunday, 22nd February 2026', {
      x: W / 2,
      y: 1285,
      maxWidth: 800,
      maxSize: 34,
      fontFamily: `'${displayFont}', serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // 14. time: Jost 26px, fill ink muted, y≈1340
    const timeSVG = fitText(v.time || '10:30 AM onwards', {
      x: W / 2,
      y: 1334,
      maxWidth: 800,
      maxSize: 26,
      fontFamily: `'${bodyFont}', sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75"',
    });

    // 15. venue: Cormorant Garamond 32px, fill ink, y≈1390
    const venueSVG = fitText(v.venue || 'The Grand Pavilion, Vile Parle, Mumbai', {
      x: W / 2,
      y: 1380,
      maxWidth: 800,
      maxSize: 32,
      fontFamily: `'${displayFont}', serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // 16. hostedBy: Cormorant Garamond 26px, fill ink muted, y≈1450 & optional RSVP
    const showRsvp = v.rsvp__enabled !== false && Boolean(v.rsvp);
    const hostedY = showRsvp ? 1420 : 1435;

    const hostedSVG = v.hostedBy ? fitText(v.hostedBy, {
      x: W / 2,
      y: hostedY,
      maxWidth: 800,
      maxSize: 26,
      fontFamily: `'${displayFont}', serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.75"',
    }) : '';

    const rsvpSVG = showRsvp ? fitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1445,
      maxWidth: 600,
      maxSize: 21,
      fontFamily: `'${bodyFont}', sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.7"',
    }) : '';

    return `
      ${defs}
      ${bg}
      ${frame}
      ${cornerPaisleys}
      ${kalash}
      ${namokarSVG}
      ${ahimsaSVG}
      ${eventSVG}
      ${doubleRule}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${decor12}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};

// ── Geometry & Component Builders ──────────────────────────────────

/**
 * Classical Indian paisley (ambi/buta) motif scaled to ~80×120px.
 */
function renderPaisleySilhouette(palette) {
  return `
    <g class="corner-paisley" opacity="0.5">
      <!-- Outer elegant paisley contour -->
      <path d="M 40 120
               C 15 120 4 95 4 70
               C 4 42 20 20 45 6
               C 60 -2 78 8 76 26
               C 74 40 60 42 52 32
               C 46 24 52 16 58 18
               C 42 24 38 46 52 68
               C 68 90 65 120 40 120 Z"
            fill="${palette.saffron}" stroke="${palette.deepRed}" stroke-width="1" stroke-opacity="0.35"/>
      <!-- Inner accent teardrop curve -->
      <path d="M 38 100
               C 22 100 16 82 16 64
               C 16 44 26 28 42 18
               C 46 16 52 20 50 26
               C 46 34 38 42 34 56
               C 30 70 32 84 44 94
               C 48 98 44 100 38 100 Z"
            fill="${palette.gold}" opacity="0.55"/>
      <!-- Delicate micro dots -->
      <circle cx="34" cy="66" r="4.5" fill="${palette.deepRed}" opacity="0.6"/>
      <circle cx="34" cy="66" r="2" fill="${palette.paper}"/>
      <circle cx="10" cy="62" r="1.8" fill="${palette.saffron}"/>
      <circle cx="12" cy="48" r="1.8" fill="${palette.saffron}"/>
      <circle cx="18" cy="34" r="1.8" fill="${palette.saffron}"/>
      <circle cx="28" cy="22" r="1.8" fill="${palette.saffron}"/>
    </g>
  `;
}

/**
 * Centered ceremonial Mangal Kalash (sacred pot) centerpiece.
 * Origin (cx, cy) is translated to (W/2, 480).
 */
function renderKalashCenterpiece(cx, cy, palette) {
  // 5 Mango leaves fanned out at pivot (0, -145) below the coconut
  // Angles: -48°, -24°, 0°, +24°, +48°
  const leafAngles = [-48, -24, 0, 24, 48];
  const mangoLeavesSVG = leafAngles.map((angle) => {
    // Center leaf is slightly taller, flanking leaves taper symmetrically
    const len = angle === 0 ? 142 : (Math.abs(angle) === 24 ? 134 : 124);
    const halfW = angle === 0 ? 19 : 17;

    return `
      <g transform="rotate(${angle}, 0, -145)">
        <!-- Mango leaf silhouette with pointed apex -->
        <path d="M 0 -145
                 C ${-halfW} ${-145 - len * 0.28}, ${-halfW * 1.15} ${-145 - len * 0.68}, 0 ${-145 - len}
                 C ${halfW * 1.15} ${-145 - len * 0.68}, ${halfW} ${-145 - len * 0.28}, 0 -145 Z"
              fill="url(#kalashLeafGrad)" stroke="#385B36" stroke-width="1.2"/>
        <!-- Central leaf vein -->
        <line x1="0" y1="-145" x2="0" y2="${-145 - len + 5}"
              stroke="#82B37E" stroke-width="1.4" opacity="0.8"/>
        <!-- Delicate lateral veins -->
        <path d="M 0 ${-145 - len * 0.28} Q ${-halfW * 0.55} ${-145 - len * 0.38} ${-halfW * 0.85} ${-145 - len * 0.44}
                 M 0 ${-145 - len * 0.28} Q ${halfW * 0.55} ${-145 - len * 0.38} ${halfW * 0.85} ${-145 - len * 0.44}
                 M 0 ${-145 - len * 0.52} Q ${-halfW * 0.55} ${-145 - len * 0.62} ${-halfW * 0.8} ${-145 - len * 0.68}
                 M 0 ${-145 - len * 0.52} Q ${halfW * 0.55} ${-145 - len * 0.62} ${halfW * 0.8} ${-145 - len * 0.68}"
              fill="none" stroke="#82B37E" stroke-width="0.8" opacity="0.6"/>
      </g>
    `;
  }).join('');

  // Neck pattern: 7 small triangles / notches in deep red
  const triangleNotches = [-30, -20, -10, 0, 10, 20, 30].map((x) =>
    `<polygon points="${x - 3.5},-102 ${x + 3.5},-102 ${x},-110" fill="${palette.gold}"/>`
  ).join('');

  return `
    <g transform="translate(${cx}, ${cy})">
      <!-- ── Layer 1: Mango leaves fanned behind coconut ── -->
      ${mangoLeavesSVG}

      <!-- ── Layer 2: Coconut (circle r=50 + husk texture lines) ── -->
      <g>
        <!-- Coconut body -->
        <circle cx="0" cy="-190" r="50" fill="url(#kalashCoconutGrad)"
                stroke="#3E200B" stroke-width="2"/>

        <!-- Coconut fiber/husk curved lines -->
        <path d="M -32 -160 C -40 -182, -34 -212, -10 -235"
              fill="none" stroke="#2B1405" stroke-width="1.3" opacity="0.55"/>
        <path d="M -16 -144 C -24 -176, -20 -208, 0 -240"
              fill="none" stroke="#2B1405" stroke-width="1.5" opacity="0.6"/>
        <path d="M 0 -140 C -4 -175, -2 -212, 0 -240"
              fill="none" stroke="#2B1405" stroke-width="1.4" opacity="0.45"/>
        <path d="M 16 -144 C 24 -176, 20 -208, 0 -240"
              fill="none" stroke="#2B1405" stroke-width="1.5" opacity="0.6"/>
        <path d="M 32 -160 C 40 -182, 34 -212, 10 -235"
              fill="none" stroke="#2B1405" stroke-width="1.3" opacity="0.55"/>

        <!-- Small fiber tuft at apex -->
        <path d="M -8 -238 Q 0 -252 8 -238 Z" fill="#3E200B"/>

        <!-- Sacred red/gold dot at top of coconut -->
        <circle cx="0" cy="-242" r="6" fill="${palette.gold}"/>
        <circle cx="0" cy="-242" r="3.5" fill="${palette.deepRed}"/>
        <circle cx="0" cy="-242" r="1.5" fill="#FFEAA0"/>
      </g>

      <!-- ── Layer 3: Pedestal / Base 80×20 rounded gold ── -->
      <!-- Lower pedestal step -->
      <rect x="-54" y="156" width="108" height="10" rx="4"
            fill="url(#kalashBaseGrad)" stroke="#B8802A" stroke-width="1.5"/>
      <!-- Main pedestal block 80×20 -->
      <rect x="-40" y="140" width="80" height="20" rx="5"
            fill="url(#kalashBaseGrad)" stroke="#B8802A" stroke-width="2"/>
      <!-- Pedestal decorative dots -->
      <circle cx="-24" cy="150" r="2.5" fill="${palette.deepRed}"/>
      <circle cx="0" cy="150" r="3" fill="${palette.deepRed}"/>
      <circle cx="24" cy="150" r="2.5" fill="${palette.deepRed}"/>

      <!-- ── Layer 4: Pot body silhouette (symmetric cubic bezier) ── -->
      <!--
        Symmetric pot silhouette:
        - Flared rim width: 120px (x = -60 to +60) at y = -140
        - Neck width: 80px (x = -40 to +40) at y = -100
        - Belly width: 250px (x = -125 to +125) at y = +40
        - Base width: 80px (x = -40 to +40) at y = +140
        - Total height: 280px (-140 to +140)
      -->
      <path d="M -60 -140
               C -56 -125, -42 -116, -40 -100
               C -38 -36, -125 -16, -125 40
               C -125 96, -95 140, -40 140
               L 40 140
               C 95 140, 125 96, 125 40
               C 125 -16, 38 -36, 40 -100
               C 42 -116, 56 -125, 60 -140
               Z"
            fill="url(#kalashPotGrad)" stroke="#B8802A" stroke-width="2"/>

      <!-- Specular highlight arc on left belly -->
      <path d="M -85 5
               C -102 30, -100 62, -78 92
               C -90 66, -90 32, -74 12 Z"
            fill="#FFFFFF" opacity="0.3"/>

      <!-- Rim lip ellipse and inner shadow -->
      <ellipse cx="0" cy="-140" rx="60" ry="12"
               fill="url(#kalashPotGrad)" stroke="#B8802A" stroke-width="2"/>
      <ellipse cx="0" cy="-140" rx="52" ry="7"
               fill="#7E470E" opacity="0.6"/>
      <path d="M -56 -135 Q 0 -126 56 -135"
            fill="none" stroke="#B8802A" stroke-width="1.8"/>

      <!-- Layer 5: Neck Decoration and Mauli String -->
      <!-- Red neck band -->
      <rect x="-40" y="-112" width="80" height="12" rx="2" fill="${palette.deepRed}"/>
      <line x1="-40" y1="-112" x2="40" y2="-112" stroke="${palette.gold}" stroke-width="1.4"/>
      <line x1="-40" y1="-100" x2="40" y2="-100" stroke="${palette.gold}" stroke-width="1.4"/>
      <!-- Gold triangle notches across neck band -->
      ${triangleNotches}

      <!-- Gold string / thread wrapped around neck (zigzag line) -->
      <polyline points="-39,-92 -33,-95 -27,-92 -21,-95 -15,-92 -9,-95 -3,-92 3,-95 9,-92 15,-95 21,-92 27,-95 33,-92 39,-95"
                fill="none" stroke="${palette.gold}" stroke-width="2.4"
                stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Intertwined deep red thread -->
      <polyline points="-39,-88 -33,-85 -27,-88 -21,-85 -15,-88 -9,-85 -3,-88 3,-85 9,-88 15,-85 21,-88 27,-85 33,-88 39,-85"
                fill="none" stroke="${palette.deepRed}" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Layer 6: Authentic Jain Centerpiece Emblem on Pot Belly -->
      <g transform="translate(0, 36)">
        <!-- Outer ornate medallion ring -->
        <circle r="46" fill="none" stroke="${palette.deepRed}" stroke-width="1.5"
                opacity="0.55" stroke-dasharray="4 2.5"/>
        <circle r="41" fill="none" stroke="${palette.gold}" stroke-width="1" opacity="0.5"/>

        <!-- Jain Swastika (4 arms) -->
        <g stroke="${palette.deepRed}" stroke-width="2.4" stroke-linecap="round">
          <!-- Horizontal and Vertical cross -->
          <line x1="-14" y1="2" x2="14" y2="2"/>
          <line x1="0" y1="-12" x2="0" y2="16"/>
          <!-- 4 directional arms -->
          <line x1="14" y1="2" x2="14" y2="-8"/>
          <line x1="0" y1="-12" x2="-10" y2="-12"/>
          <line x1="-14" y1="2" x2="-14" y2="12"/>
          <line x1="0" y1="16" x2="10" y2="16"/>
        </g>

        <!-- Ratnatraya (3 dots: Right Faith, Knowledge, Conduct) -->
        <circle cx="-8" cy="-18" r="1.8" fill="${palette.deepRed}"/>
        <circle cx="0"  cy="-18" r="1.8" fill="${palette.deepRed}"/>
        <circle cx="8"  cy="-18" r="1.8" fill="${palette.deepRed}"/>

        <!-- Siddhashila (crescent and dot of liberated souls) -->
        <path d="M -9 -25 Q 0 -21 9 -25 Q 0 -23 -9 -25 Z" fill="${palette.deepRed}"/>
        <circle cx="0" cy="-28" r="1.8" fill="${palette.deepRed}"/>
      </g>
    </g>
  `;
}
