/**
 * Hindu – Marigold Mandap (Full Art Edition)
 *
 * Rich festive Indian wedding invitation featuring:
 * - 14-flower marigold (genda phool) garland with hanging mango leaf toran
 * - Center mandala with sacred diya and 5 concentric decorative rings
 * - 4 corner paisley (kalka/ambi) teardrop motifs
 * - Elegant double gold border frame with corner insets
 * - Dynamic typography with Playfair Display, Jost, Cormorant Garamond, and Noto Serif Devanagari
 */

export default {
  id: 'hindu-wedding-marigold',
  tradition: 'hindu',
  occasion: 'wedding',
  name: 'Marigold Mandap',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#FFF4DC',
    ink:     '#2A1E1A',
    accent:  '#7A1F2B',
    accent2: '#F2A900',
    paper:   '#FFF9EE',
    saffron: '#E8590C',
    gold:    '#C9962B',
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
    { id: 'elegant', label: 'Cormorant + Jost', display: 'Cormorant Garamond', body: 'Jost' },
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
      default: 'Wedding Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Arjun Sharma',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Priya Mehta',
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
      key: 'time',
      label: 'Time',
      default: '11:00 AM onwards',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Taj Lands End, Bandra, Mumbai',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Sharma & Mehta Families',
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
    const { svgFitText, escapeXML } = helpers;
    const v = values;

    const activePair = (this?.fontPairs || []).find((p) => p.id === v.fontPair) || (this?.fontPairs || [])[0] || {};
    const displayFont = activePair.display || this?.fonts?.display || 'Playfair Display';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';
    const scriptFont = activePair.script || this?.fonts?.script || 'Cormorant Garamond';

    // ── 1. Background ─────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── 2. Gold double border frame ───────────────────────────
    const frame = `
      <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
            stroke="${palette.gold}" stroke-width="3" rx="8"/>
      <rect x="56" y="56" width="${W - 112}" height="${H - 112}" fill="none"
            stroke="${palette.gold}" stroke-width="1" rx="8" stroke-dasharray="8 5"/>
    `;

    // ── 3. Corner Paisleys (inside border, ≥80px from corners) ─
    const cornerPaisleys = `
      ${paisleySVG(115, 115, 62, 135, palette.gold, palette.accent)}
      ${paisleySVG(W - 115, 115, 62, -135, palette.gold, palette.accent)}
      ${paisleySVG(115, H - 115, 62, 45, palette.gold, palette.accent)}
      ${paisleySVG(W - 115, H - 115, 62, -45, palette.gold, palette.accent)}
    `;

    // ── 4. Top garland (14 marigolds + leaf pairs at y≈0..200) ─
    const topGarland = buildGarland(W, 52, palette);

    // ── 5. Bottom garland (mirror of top at y≈H-200..H) ────────
    const bottomGarland = `
      <g transform="translate(0, ${H}) scale(1, -1)">
        ${topGarland}
      </g>
    `;

    // ── 6. Mandala / Diya centre motif at (W/2, 430) ──────────
    const mandalaDiya = buildMandalaDiya(W / 2, 430, palette);

    // ── 7. Sacred line (Noto Serif Devanagari) ────────────────
    const sacredLineSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 310,
      maxWidth: W - 200,
      maxSize: 36,
      fontFamily: 'Noto Serif Devanagari, serif',
      fontWeight: 'normal',
      fill: palette.accent,
      textAnchor: 'middle',
    }) : '';

    // ── 8. Event type (Jost uppercase letterSpaced) ───────────
    const eventSVG = svgFitText((v.eventType || 'Wedding Invitation').toUpperCase(), {
      x: W / 2,
      y: 585,
      maxWidth: W - 240,
      maxSize: 28,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="6"',
    });

    // ── 9. Groom name (Playfair Display bold 80px auto-fit) ───
    const groomSVG = svgFitText(v.groomName || 'Arjun Sharma', {
      x: W / 2,
      y: 670,
      maxWidth: W - 180,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // ── 10. Ampersand '&' (Playfair Display italic 60px) ──────
    const ampersandSVG = svgFitText('&', {
      x: W / 2,
      y: 775,
      maxWidth: 200,
      maxSize: 60,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'font-style="italic"',
    });

    // ── 11. Bride name (Playfair Display bold 80px auto-fit) ──
    const brideSVG = svgFitText(v.brideName || 'Priya Mehta', {
      x: W / 2,
      y: 880,
      maxWidth: W - 180,
      maxSize: 80,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
    });

    // ── 12. Thin decorative divider (3 dots + lines) at y≈935 ─
    const divider = `
      <line x1="220" y1="935" x2="480" y2="935" stroke="${palette.gold}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
      <line x1="600" y1="935" x2="860" y2="935" stroke="${palette.gold}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
      <circle cx="505" cy="935" r="3" fill="${palette.gold}" opacity="0.6"/>
      <circle cx="540" cy="935" r="5" fill="${palette.gold}"/>
      <circle cx="575" cy="935" r="3" fill="${palette.gold}" opacity="0.6"/>
    `;

    // ── 13. Date (Cormorant Garamond 36px) ────────────────────
    const dateSVG = svgFitText(v.date || 'Sunday, 15th February 2026', {
      x: W / 2,
      y: 990,
      maxWidth: W - 220,
      maxSize: 36,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 14. Time (Jost 28px) ──────────────────────────────────
    const timeSVG = svgFitText(v.time || '11:00 AM onwards', {
      x: W / 2,
      y: 1040,
      maxWidth: W - 220,
      maxSize: 28,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="1"',
    });

    // ── 15. Venue (Cormorant Garamond 34px) ───────────────────
    const venueSVG = svgFitText(v.venue || 'Taj Lands End, Bandra, Mumbai', {
      x: W / 2,
      y: 1100,
      maxWidth: W - 240,
      maxSize: 34,
      fontFamily: `${scriptFont}, serif`,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // ── 16. Hosted by (label 22px + names 30px at y≈1210) ─────
    const hostedSVG = v.hostedBy ? `
      ${svgFitText('HOSTED BY', {
        x: W / 2,
        y: 1195,
        maxWidth: W - 240,
        maxSize: 22,
        fontFamily: `${bodyFont}, sans-serif`,
        fontWeight: '400',
        fill: palette.ink,
        textAnchor: 'middle',
        extraAttrs: 'letter-spacing="4" opacity="0.6"',
      })}
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1235,
        maxWidth: W - 240,
        maxSize: 30,
        fontFamily: `${scriptFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.35,
      })}
    ` : '';

    // ── 17. RSVP (if present at y≈1370) ───────────────────────
    const rsvpSVG = v.rsvp ? svgFitText(`RSVP: ${v.rsvp}`, {
      x: W / 2,
      y: 1370,
      maxWidth: W - 240,
      maxSize: 24,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="1"',
    }) : '';

    return `
      ${bg}
      ${frame}
      ${cornerPaisleys}
      ${topGarland}
      ${bottomGarland}
      ${mandalaDiya}
      ${sacredLineSVG}
      ${eventSVG}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${divider}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Generate SVG for a realistic marigold flower (genda phool).
 * 12 outer petals alternating saffron and orange, an offset ruffled inner layer,
 * and a golden center circle with core accents.
 *
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {number} [petalCount=12]
 * @param {string[]|object} [colors]
 */
export function flowerSVG(cx, cy, r, petalCount = 12, colors = ['#E8590C', '#F2A900', '#C9962B']) {
  const cSaffron = Array.isArray(colors) ? (colors[0] || '#E8590C') : (colors.saffron || '#E8590C');
  const cOrange  = Array.isArray(colors) ? (colors[1] || '#F2A900') : (colors.accent2 || '#F2A900');
  const cGold    = Array.isArray(colors) ? (colors[2] || '#C9962B') : (colors.gold || '#C9962B');

  // Outer layer: 12 small petals alternating saffron & orange
  const outerPetals = [];
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * 360) / petalCount;
    const rad = (angle * Math.PI) / 180;
    const fill = i % 2 === 0 ? cSaffron : cOrange;
    const dist = r * 0.52;
    const px = (cx + Math.cos(rad) * dist).toFixed(1);
    const py = (cy + Math.sin(rad) * dist).toFixed(1);
    const rx = (r * 0.44).toFixed(1);
    const ry = (r * 0.24).toFixed(1);
    outerPetals.push(
      `<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" transform="rotate(${angle.toFixed(1)}, ${px}, ${py})" fill="${fill}" opacity="0.95"/>`
    );
  }

  // Inner ruffled layer: offset for natural marigold density
  const innerPetals = [];
  const offset = 360 / (petalCount * 2);
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * 360) / petalCount + offset;
    const rad = (angle * Math.PI) / 180;
    const fill = i % 2 === 0 ? cOrange : cSaffron;
    const dist = r * 0.30;
    const px = (cx + Math.cos(rad) * dist).toFixed(1);
    const py = (cy + Math.sin(rad) * dist).toFixed(1);
    const rx = (r * 0.32).toFixed(1);
    const ry = (r * 0.18).toFixed(1);
    innerPetals.push(
      `<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" transform="rotate(${angle.toFixed(1)}, ${px}, ${py})" fill="${fill}"/>`
    );
  }

  // Golden center circle with inner accents
  const centerCircle = `
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.28).toFixed(1)}" fill="${cGold}"/>
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.16).toFixed(1)}" fill="${cSaffron}" opacity="0.6"/>
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * 0.08).toFixed(1)}" fill="${cGold}"/>
  `;

  return `
    <g class="marigold-flower">
      ${outerPetals.join('')}
      ${innerPetals.join('')}
      ${centerCircle}
    </g>
  `;
}

/**
 * Generate a classic Indian paisley (kalka / ambi) teardrop motif.
 * Outer shape filled gold with a smaller inner shape in accent.
 *
 * @param {number} cx
 * @param {number} cy
 * @param {number} size
 * @param {number} rotation
 * @param {string} [goldColor='#C9962B']
 * @param {string} [accentColor='#7A1F2B']
 */
export function paisleySVG(cx, cy, size, rotation, goldColor = '#C9962B', accentColor = '#7A1F2B') {
  const s = size / 100;
  // Normalized classic teardrop arc
  const outerPath = `
    M 0 45
    C -36 45 -46 12 -36 -18
    C -28 -40 -12 -54 10 -54
    C 30 -54 36 -36 22 -28
    C 12 -22 4 -30 10 -38
    C 4 -26 0 -4 12 12
    C 22 28 25 45 0 45 Z
  `;

  return `
    <g transform="translate(${cx}, ${cy}) rotate(${rotation}) scale(${s})">
      <path d="${outerPath}" fill="${goldColor}" stroke="${goldColor}" stroke-width="1.5"/>
      <g transform="scale(0.58) translate(0, 4)">
        <path d="${outerPath}" fill="${accentColor}"/>
        <circle cx="0" cy="8" r="6" fill="${goldColor}"/>
      </g>
      <circle cx="-16" cy="10" r="3" fill="${accentColor}" opacity="0.6"/>
      <circle cx="-18" cy="-5" r="2.5" fill="${accentColor}" opacity="0.6"/>
      <circle cx="16" cy="-42" r="2" fill="${goldColor}"/>
    </g>
  `;
}

/**
 * Build the full 14-flower marigold garland with hanging mango leaf toran pairs.
 *
 * @param {number} W
 * @param {number} garlandY
 * @param {object} palette
 */
function buildGarland(W, garlandY, palette) {
  const flowerCount = 14;
  const flowerX = Array.from({ length: flowerCount }, (_, i) => 40 + i * ((W - 80) / (flowerCount - 1)));
  const garlandColors = [palette.saffron, palette.accent2, palette.gold];

  // Scalloped gold drape cords connecting flowers
  const cords = [];
  for (let i = 0; i < flowerCount - 1; i++) {
    const x1 = flowerX[i];
    const x2 = flowerX[i + 1];
    const mx = (x1 + x2) / 2;
    cords.push(
      `<path d="M ${x1.toFixed(1)} ${garlandY} Q ${mx.toFixed(1)} ${garlandY + 12} ${x2.toFixed(1)} ${garlandY}" fill="none" stroke="${palette.gold}" stroke-width="1.8" opacity="0.85"/>`
    );
  }

  // Hanging leaf-pairs between flowers (2 pairs per gap)
  const leaves = [];
  for (let i = 0; i < flowerCount - 1; i++) {
    const x1 = flowerX[i];
    const x2 = flowerX[i + 1];
    const dx = x2 - x1;
    const lx1 = x1 + dx * 0.35;
    const lx2 = x1 + dx * 0.65;
    leaves.push(leafPairSVG(lx1, garlandY, 32, 0.95));
    leaves.push(leafPairSVG(lx2, garlandY, 44, 1.05));
  }

  // 14 Marigold flowers
  const flowers = flowerX.map((x) =>
    flowerSVG(x, garlandY, 28, 12, garlandColors)
  ).join('');

  return `
    <g class="marigold-garland">
      ${cords.join('')}
      ${leaves.join('')}
      ${flowers}
    </g>
  `;
}

/**
 * Generate a hanging pair of elongated mango leaves (toran).
 *
 * @param {number} lx
 * @param {number} ly
 * @param {number} stemLen
 * @param {number} [leafScale=1]
 */
function leafPairSVG(lx, ly, stemLen, leafScale = 1) {
  const tipY = ly + stemLen;
  return `
    <g class="toran-leaf-pair">
      <line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${lx.toFixed(1)}" y2="${tipY.toFixed(1)}"
            stroke="#5A7A2B" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="${lx.toFixed(1)}" cy="${tipY.toFixed(1)}" r="2.5" fill="#C9962B"/>
      <!-- Left leaf -->
      <g transform="translate(${(lx - 4).toFixed(1)}, ${(tipY + 11).toFixed(1)}) rotate(-24) scale(${leafScale})">
        <ellipse cx="0" cy="0" rx="5" ry="14" fill="#5A7A2B"/>
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#7B9E3A" stroke-width="0.8"/>
      </g>
      <!-- Right leaf -->
      <g transform="translate(${(lx + 4).toFixed(1)}, ${(tipY + 11).toFixed(1)}) rotate(24) scale(${leafScale})">
        <ellipse cx="0" cy="0" rx="5" ry="14" fill="#5A7A2B"/>
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#7B9E3A" stroke-width="0.8"/>
      </g>
    </g>
  `;
}

/**
 * Build the sacred center mandala motif with 5 concentric decorative rings,
 * 8 petal diamonds in the outer ring, and an innermost diya with flame.
 *
 * @param {number} cx
 * @param {number} cy
 * @param {object} palette
 */
function buildMandalaDiya(cx, cy, palette) {
  // 8 small petal diamonds in outer ring (r = 82)
  const outerDiamonds = [];
  for (let i = 0; i < 8; i++) {
    const ang = (i * 45 * Math.PI) / 180;
    const dx = cx + Math.cos(ang) * 82;
    const dy = cy + Math.sin(ang) * 82;
    outerDiamonds.push(
      `<polygon points="${diamondPoints(dx, dy, 7, 4.5, ang)}" fill="${palette.gold}"/>`
    );
  }

  // 16 golden bead dots around Ring 4 (r = 44)
  const beadDots = [];
  for (let j = 0; j < 16; j++) {
    const ang = (j * 22.5 * Math.PI) / 180;
    const bx = cx + Math.cos(ang) * 44;
    const by = cy + Math.sin(ang) * 44;
    beadDots.push(
      `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="1.8" fill="${palette.gold}"/>`
    );
  }

  return `
    <g class="mandala-diya">
      <!-- 5 Concentric Decorative Rings -->
      <!-- Ring 1 (outermost, r=82) with 8 diamonds -->
      <circle cx="${cx}" cy="${cy}" r="82" fill="none" stroke="${palette.gold}" stroke-width="2.5"/>
      ${outerDiamonds.join('')}

      <!-- Ring 2 (r=70): accent fill + dashed gold stroke -->
      <circle cx="${cx}" cy="${cy}" r="70" fill="${palette.accent}" fill-opacity="0.12"
              stroke="${palette.gold}" stroke-width="1.2" stroke-dasharray="4 3"/>

      <!-- Ring 3 (r=58): dual decorative gold/accent ring -->
      <circle cx="${cx}" cy="${cy}" r="58" fill="none" stroke="${palette.accent}" stroke-width="2"/>
      <circle cx="${cx}" cy="${cy}" r="54" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>

      <!-- Ring 4 (r=44): accent fill + golden beads -->
      <circle cx="${cx}" cy="${cy}" r="44" fill="${palette.accent}" fill-opacity="0.25"
              stroke="${palette.gold}" stroke-width="1.5"/>
      ${beadDots.join('')}

      <!-- Ring 5 (r=30): inner cream medallion -->
      <circle cx="${cx}" cy="${cy}" r="30" fill="${palette.cream}" stroke="${palette.gold}" stroke-width="2"/>

      <!-- Innermost: Diya Shape -->
      <g transform="translate(${cx}, ${cy})">
        <!-- Diya pedestal stand -->
        <path d="M -7 16 L 7 16 L 5 21 L -5 21 Z" fill="${palette.gold}"/>
        <line x1="-11" y1="21" x2="11" y2="21" stroke="${palette.gold}" stroke-width="2" stroke-linecap="round"/>

        <!-- Diya oil lamp bowl -->
        <ellipse cx="0" cy="8" rx="20" ry="9" fill="${palette.gold}"/>
        <ellipse cx="0" cy="6" rx="17" ry="6.5" fill="${palette.saffron}"/>
        <ellipse cx="0" cy="5" rx="14" ry="4" fill="${palette.accent}"/>

        <!-- Diya flame: outer triangular flame + inner bright flame -->
        <path d="M 0 -22 C -8 -13 -9 1 0 3 C 9 1 8 -13 0 -22 Z" fill="${palette.accent2}"/>
        <path d="M 0 -16 C -5 -9 -5 1 0 2 C 5 1 5 -9 0 -16 Z" fill="${palette.cream}"/>
        <circle cx="0" cy="-3" r="2" fill="#FFFFFF"/>
      </g>
    </g>
  `;
}

/**
 * Generate 4 points for a radially-oriented diamond polygon.
 *
 * @param {number} cx
 * @param {number} cy
 * @param {number} lenR
 * @param {number} widT
 * @param {number} ang
 */
function diamondPoints(cx, cy, lenR, widT, ang) {
  const cos = Math.cos(ang);
  const sin = Math.sin(ang);
  const p1x = (cx + cos * lenR).toFixed(1);
  const p1y = (cy + sin * lenR).toFixed(1);
  const p2x = (cx - sin * widT).toFixed(1);
  const p2y = (cy + cos * widT).toFixed(1);
  const p3x = (cx - cos * lenR).toFixed(1);
  const p3y = (cy - sin * lenR).toFixed(1);
  const p4x = (cx + sin * widT).toFixed(1);
  const p4y = (cy - cos * widT).toFixed(1);
  return `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`;
}
