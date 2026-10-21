/**
 * Hindu – Rajwada Arch
 *
 * An ornate Rajasthani royal palace invitation framed by a traditional
 * Jharokha window arch with stepped chhajja, apex finial, corbelled brackets,
 * pilaster niches, scalloped inner border, and bottom paisley motif band.
 */

import { svgFitText as coreSvgFitText, wrapLines as coreWrapLines } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

export default {
  id: 'hindu-wedding-rajwada',
  tradition: 'hindu',
  occasion: 'wedding',
  name: 'Rajwada Arch',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#7A1F2B',
    ink:     '#FFF4DC',
    accent:  '#F2A900',
    accent2: '#E8590C',
    paper:   '#FFF9EE',
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
      label: "Groom's name",
      default: 'Arjun Sharma',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
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

  /**
   * Render inner SVG content for Rajwada Arch invitation.
   */
  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const svgFitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML = helpers?.escapeXML || coreEscapeXML;
    const v = values || {};
    const activePair = (this?.fontPairs || []).find((p) => p.id === v.fontPair) || (this?.fontPairs || [])[0] || {};
    const fonts = {
      display: activePair.display || this?.fonts?.display || 'Playfair Display',
      body:    activePair.body    || this?.fonts?.body    || 'Jost',
      script:  activePair.script  || this?.fonts?.script  || 'Cormorant Garamond',
      native:  this?.fonts?.native || 'Noto Serif Devanagari',
    };

    // ── 1. Full Deep Maroon Background ───────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── Delicate Corner Spandrel Arabesque Accents ────────────────
    const spandrelAccents = `
      <!-- Left spandrel rosette -->
      <g transform="translate(80, 200)" opacity="0.4">
        <circle cx="0" cy="0" r="16" fill="none" stroke="${palette.gold}" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="6" fill="${palette.gold}" opacity="0.6"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return `<circle cx="${(Math.cos(a) * 12).toFixed(1)}" cy="${(Math.sin(a) * 12).toFixed(1)}" r="2.5" fill="${palette.gold}"/>`;
        }).join('')}
      </g>
      <!-- Right spandrel rosette -->
      <g transform="translate(${W - 80}, 200)" opacity="0.4">
        <circle cx="0" cy="0" r="16" fill="none" stroke="${palette.gold}" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="6" fill="${palette.gold}" opacity="0.6"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return `<circle cx="${(Math.cos(a) * 12).toFixed(1)}" cy="${(Math.sin(a) * 12).toFixed(1)}" r="2.5" fill="${palette.gold}"/>`;
        }).join('')}
      </g>
    `;

    // ── 2. Jharokha Arch Geometry ────────────────────────────────
    // Path generator with uniform scaling for inset / outset strokes
    function getArchPath(inset = 0, baseY = 1060) {
      const scale = (420 - inset) / 420;
      const tx = (x) => 540 + (x - 540) * scale;
      const ty = (y) => 500 + (y - 500) * scale;

      const lx = (120 + inset).toFixed(1);
      const rx = (960 - inset).toFixed(1);
      const apexY = (80 + inset).toFixed(1);

      // Left ogee arch control points
      const c1 = [tx(120).toFixed(1), ty(360).toFixed(1)];
      const c2 = [tx(240).toFixed(1), ty(220).toFixed(1)];
      const p1 = [tx(360).toFixed(1), ty(180).toFixed(1)];
      const c3 = [tx(440).toFixed(1), ty(155).toFixed(1)];
      const c4 = [tx(505).toFixed(1), ty(115).toFixed(1)];

      // Right ogee arch control points (mirrored)
      const c4r = [(1080 - Number(c4[0])).toFixed(1), c4[1]];
      const c3r = [(1080 - Number(c3[0])).toFixed(1), c3[1]];
      const p1r = [(1080 - Number(p1[0])).toFixed(1), p1[1]];
      const c2r = [(1080 - Number(c2[0])).toFixed(1), c2[1]];
      const c1r = [(1080 - Number(c1[0])).toFixed(1), c1[1]];

      return `M ${lx} ${baseY}
        L ${lx} 500
        C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p1[0]} ${p1[1]}
        C ${c3[0]} ${c3[1]}, ${c4[0]} ${c4[1]}, 540 ${apexY}
        C ${c4r[0]} ${c4r[1]}, ${c3r[0]} ${c3r[1]}, ${p1r[0]} ${p1r[1]}
        C ${c2r[0]} ${c2r[1]}, ${c1r[0]} ${c1r[1]}, ${rx} 500
        L ${rx} ${baseY}`;
    }

    // Frame strokes: 4px saffron, inner 1.5px gold, outer 1px cream
    const archFrame = `
      <!-- Arch interior subtle wash -->
      <path d="${getArchPath(0)} Z" fill="${palette.paper}" fill-opacity="0.03"/>
      <!-- Outer cream stroke (1px) -->
      <path d="${getArchPath(-6, 1060)}" fill="none" stroke="${palette.cream}" stroke-width="1"/>
      <!-- Main saffron stroke (4px) -->
      <path d="${getArchPath(0, 1060)}" fill="none" stroke="${palette.accent2}" stroke-width="4"/>
      <!-- Inner gold stroke (1.5px) -->
      <path d="${getArchPath(6, 1060)}" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>
    `;

    // ── 3. Scalloped Inner Border (32px inset) ───────────────────
    // 10 semicircular cusps along top arch, 6 along each side column
    function buildScallopedBorder() {
      const inset = 32;
      const scale = (420 - inset) / 420;
      const tx = (x) => 540 + (x - 540) * scale;
      const ty = (y) => 500 + (y - 500) * scale;

      function evalBezier(p0, c1, c2, p1, u) {
        const o = 1 - u;
        const x = o*o*o * p0[0] + 3*o*o*u * c1[0] + 3*o*u*u * c2[0] + u*u*u * p1[0];
        const y = o*o*o * p0[1] + 3*o*o*u * c1[1] + 3*o*u*u * c2[1] + u*u*u * p1[1];
        return [tx(x), ty(y)];
      }

      function getLeftCurvePt(t) {
        if (t <= 0.5) {
          return evalBezier([120, 500], [120, 360], [240, 220], [360, 180], t * 2);
        } else {
          return evalBezier([360, 180], [440, 155], [505, 115], [540, 80], (t - 0.5) * 2);
        }
      }

      let d = '';

      // Left column vertical: 6 semicircles from y=1060 up to y=500 at x = 120 + 32 = 152
      const segH = 560 / 6;
      const rSide = segH / 2;
      for (let i = 0; i < 6; i++) {
        const y1 = 1060 - i * segH;
        const y2 = 1060 - (i + 1) * segH;
        d += `M 152 ${y1.toFixed(1)} A ${rSide.toFixed(1)} ${rSide.toFixed(1)} 0 0 1 152 ${y2.toFixed(1)} `;
      }

      // Top arch curve: 5 cusps on left half, 5 on right half
      for (let i = 0; i < 5; i++) {
        const ptA = getLeftCurvePt(i / 5);
        const ptB = getLeftCurvePt((i + 1) / 5);
        const chord = Math.hypot(ptB[0] - ptA[0], ptB[1] - ptA[1]);
        const rTop = chord * 0.53;
        d += `M ${ptA[0].toFixed(1)} ${ptA[1].toFixed(1)} A ${rTop.toFixed(1)} ${rTop.toFixed(1)} 0 0 1 ${ptB[0].toFixed(1)} ${ptB[1].toFixed(1)} `;
      }

      for (let i = 4; i >= 0; i--) {
        const ptA = getLeftCurvePt(i / 5);
        const ptB = getLeftCurvePt((i + 1) / 5);
        const chord = Math.hypot(ptB[0] - ptA[0], ptB[1] - ptA[1]);
        const rTop = chord * 0.53;
        const ptBr = [1080 - ptB[0], ptB[1]];
        const ptAr = [1080 - ptA[0], ptA[1]];
        d += `M ${ptBr[0].toFixed(1)} ${ptBr[1].toFixed(1)} A ${rTop.toFixed(1)} ${rTop.toFixed(1)} 0 0 1 ${ptAr[0].toFixed(1)} ${ptAr[1].toFixed(1)} `;
      }

      // Right column vertical: 6 semicircles from y=500 down to y=1060 at x = 960 - 32 = 928
      for (let i = 0; i < 6; i++) {
        const y1 = 500 + i * segH;
        const y2 = 500 + (i + 1) * segH;
        d += `M 928 ${y1.toFixed(1)} A ${rSide.toFixed(1)} ${rSide.toFixed(1)} 0 0 1 928 ${y2.toFixed(1)} `;
      }

      return `<path d="${d}" fill="none" stroke="${palette.gold}" stroke-width="1.5"/>`;
    }

    const scallopedBorder = buildScallopedBorder();

    // ── 4. Stepped Chhajja & Battlements (Top) ────────────────────
    const teethCount = 38;
    const teeth = Array.from({ length: teethCount }, (_, i) => {
      const cx = 96 + i * 24;
      return `<polygon points="${cx - 7},48 ${cx - 7},38 ${cx},30 ${cx + 7},38 ${cx + 7},48"
                       fill="${palette.accent2}" stroke="${palette.gold}" stroke-width="0.8"/>
              <circle cx="${cx}" cy="42" r="1.5" fill="${palette.cream}"/>`;
    }).join('');

    const chhajjaBrackets = [120, 240, 360, 480, 600, 720, 840, 960].map((bx) =>
      `<polygon points="${bx - 6},65 ${bx + 6},65 ${bx + 2},76 ${bx - 2},76" fill="${palette.gold}"/>`
    ).join('');

    const chhajja = `
      <g id="chhajja-cornice">
        <!-- Kangura battlements row in saffron -->
        ${teeth}
        <!-- Stepped corbelled horizontal cornice layers -->
        <rect x="60" y="48" width="960" height="7" rx="2" fill="${palette.gold}"/>
        <rect x="80" y="55" width="920" height="5" fill="${palette.accent2}"/>
        <rect x="100" y="60" width="880" height="4" fill="${palette.gold}" opacity="0.85"/>
        <!-- Supporting brackets below cornice -->
        ${chhajjaBrackets}
      </g>
    `;

    // ── 5. Arch Apex Finial (Kalash) ──────────────────────────────
    const finial = `
      <g id="arch-finial">
        <!-- Base lotus moulding at apex -->
        <path d="M 522 80 Q 540 70 558 80 L 552 85 Q 540 76 528 85 Z" fill="${palette.gold}"/>
        <!-- Stacked diamonds / triangles in gold -->
        <polygon points="540,64 550,72 540,80 530,72" fill="${palette.gold}"/>
        <polygon points="540,48 547,56 540,64 533,56" fill="${palette.accent}" stroke="${palette.gold}" stroke-width="1"/>
        <polygon points="540,34 545,41 540,48 535,41" fill="${palette.gold}"/>
        <polygon points="540,18 544,34 536,34" fill="${palette.gold}"/>
        <!-- Pinnacle pearl -->
        <circle cx="540" cy="16" r="3.5" fill="${palette.cream}"/>
        <!-- Flanking gold decorative accents -->
        <circle cx="524" cy="56" r="2.5" fill="${palette.gold}"/>
        <circle cx="556" cy="56" r="2.5" fill="${palette.gold}"/>
      </g>
    `;

    // ── 6. Side Columns, Brackets & Niches ─────────────────────────
    function buildColumns() {
      const colX1 = 120;
      const colX2 = 960;
      const levels = [620, 740, 860, 980];
      const midpoints = [560, 680, 800, 920, 1020];

      // Capitals at y=500
      const capitals = `
        <g id="column-capitals">
          <polygon points="95,492 145,492 140,502 100,502" fill="${palette.gold}"/>
          <polygon points="90,484 150,484 145,492 95,492" fill="${palette.accent2}"/>
          <circle cx="${colX1}" cy="484" r="4" fill="${palette.cream}"/>
          <polygon points="${colX2 - 25},492 ${colX2 + 25},492 ${colX2 + 20},502 ${colX2 - 20},502" fill="${palette.gold}"/>
          <polygon points="${colX2 - 30},484 ${colX2 + 30},484 ${colX2 + 25},492 ${colX2 - 25},492" fill="${palette.accent2}"/>
          <circle cx="${colX2}" cy="484" r="4" fill="${palette.cream}"/>
        </g>
      `;

      // Base plinths at y=1060
      const plinths = `
        <g id="column-plinths">
          <polygon points="90,1072 150,1072 145,1060 95,1060" fill="${palette.accent2}"/>
          <rect x="85" y="1072" width="70" height="8" rx="2" fill="${palette.gold}"/>
          <polygon points="${colX2 - 30},1072 ${colX2 + 30},1072 ${colX2 + 25},1060 ${colX2 - 25},1060" fill="${palette.accent2}"/>
          <rect x="${colX2 - 35}" y="1072" width="70" height="8" rx="2" fill="${palette.gold}"/>
        </g>
      `;

      // Brackets every 120px
      const brackets = levels.map((y) => `
        <!-- Left bracket at y=${y} -->
        <path d="M ${colX1} ${y} L ${colX1 + 18} ${y} C ${colX1 + 18} ${y + 12} ${colX1 + 8} ${y + 18} ${colX1} ${y + 22} Z" fill="${palette.gold}"/>
        <path d="M ${colX1} ${y} L ${colX1 - 18} ${y} C ${colX1 - 18} ${y + 12} ${colX1 - 8} ${y + 18} ${colX1} ${y + 22} Z" fill="${palette.gold}"/>
        <circle cx="${colX1}" cy="${y}" r="3.5" fill="${palette.cream}"/>
        <!-- Right bracket at y=${y} -->
        <path d="M ${colX2} ${y} L ${colX2 + 18} ${y} C ${colX2 + 18} ${y + 12} ${colX2 + 8} ${y + 18} ${colX2} ${y + 22} Z" fill="${palette.gold}"/>
        <path d="M ${colX2} ${y} L ${colX2 - 18} ${y} C ${colX2 - 18} ${y + 12} ${colX2 - 8} ${y + 18} ${colX2} ${y + 22} Z" fill="${palette.gold}"/>
        <circle cx="${colX2}" cy="${y}" r="3.5" fill="${palette.cream}"/>
      `).join('');

      // Alternating arched niches in column bays
      const niches = midpoints.map((my, idx) => {
        const onLeft = idx % 2 === 0 || idx === 4;
        const onRight = idx % 2 === 1 || idx === 4;
        const leftNiche = onLeft ? `
          <g transform="translate(${colX1}, ${my})">
            <path d="M -9 15 L -9 -4 Q -9 -15 0 -20 Q 9 -15 9 -4 L 9 15 Z"
                  fill="${palette.bg}" stroke="${palette.gold}" stroke-width="1.2"/>
            <circle cx="0" cy="2" r="3" fill="${palette.accent}"/>
          </g>` : '';
        const rightNiche = onRight ? `
          <g transform="translate(${colX2}, ${my})">
            <path d="M -9 15 L -9 -4 Q -9 -15 0 -20 Q 9 -15 9 -4 L 9 15 Z"
                  fill="${palette.bg}" stroke="${palette.gold}" stroke-width="1.2"/>
            <circle cx="0" cy="2" r="3" fill="${palette.accent}"/>
          </g>` : '';
        return leftNiche + rightNiche;
      }).join('');

      return capitals + plinths + brackets + niches;
    }

    const columns = buildColumns();

    // ── 7. Jharokha Balcony Balustrade & Lower Frame ──────────────
    const balcony = `
      <g id="jharokha-balcony">
        <!-- Balcony sill and railing horizontal band -->
        <rect x="100" y="1060" width="880" height="7" rx="2" fill="${palette.gold}"/>
        <rect x="110" y="1067" width="860" height="5" fill="${palette.accent2}"/>
        <rect x="120" y="1072" width="840" height="3" fill="${palette.gold}" opacity="0.8"/>
        <!-- Baluster decorative diamonds -->
        ${Array.from({ length: 18 }, (_, i) => {
          const dx = 160 + i * 44;
          return `<polygon points="${dx},1067 ${dx + 4},1070 ${dx},1073 ${dx - 4},1070" fill="${palette.cream}" opacity="0.8"/>`;
        }).join('')}
        <!-- Lower frame pilasters extending down to y=1430 -->
        <line x1="120" y1="1075" x2="120" y2="1430" stroke="${palette.accent2}" stroke-width="4"/>
        <line x1="126" y1="1075" x2="126" y2="1424" stroke="${palette.gold}" stroke-width="1.5"/>
        <line x1="114" y1="1075" x2="114" y2="1436" stroke="${palette.cream}" stroke-width="1"/>
        <line x1="960" y1="1075" x2="960" y2="1430" stroke="${palette.accent2}" stroke-width="4"/>
        <line x1="954" y1="1075" x2="954" y2="1424" stroke="${palette.gold}" stroke-width="1.5"/>
        <line x1="966" y1="1075" x2="966" y2="1436" stroke="${palette.cream}" stroke-width="1"/>
        <!-- Lower enclosing plinth band -->
        <rect x="100" y="1430" width="880" height="6" rx="2" fill="${palette.gold}"/>
        <rect x="110" y="1436" width="860" height="4" fill="${palette.accent2}"/>
        <rect x="120" y="1440" width="840" height="2" fill="${palette.cream}" opacity="0.8"/>
        <!-- Corner plinth pedestals -->
        <rect x="105" y="1424" width="30" height="18" fill="${palette.gold}" rx="1"/>
        <rect x="${W - 135}" y="1424" width="30" height="18" fill="${palette.gold}" rx="1"/>
      </g>
    `;

    // ── 8. Paisley Repeat Pattern at Bottom Strip (y=1100 to H) ───
    // Row of 8 small paisleys in saffron at 20% opacity
    function renderPaisley(cx, cy, scale = 0.38) {
      return `
        <g transform="translate(${cx}, ${cy}) scale(${scale})">
          <!-- Main paisley droplet with curved hook -->
          <path d="M 0 50
                   C -35 50, -55 25, -55 -10
                   C -55 -40, -30 -70, -5 -95
                   C 15 -115, 38 -135, 34 -155
                   C 30 -175, 8 -185, -6 -175
                   C -18 -165, -15 -148, -7 -142
                   C 2 -136, 10 -138, 8 -128
                   C 4 -112, -18 -92, -28 -74
                   C -38 -56, -42 -35, -42 -15
                   C -42 12, -22 36, 0 36
                   C 22 36, 42 12, 42 -15
                   C 42 -38, 28 -62, 12 -82
                   C 28 -62, 48 -35, 48 -10
                   C 48 25, 28 50, 0 50 Z"
                fill="${palette.accent2}" opacity="0.2"/>
          <!-- Inner floral teardrop -->
          <path d="M 0 24
                   C -16 24, -26 10, -26 -8
                   C -26 -26, -10 -46, 0 -62
                   C 10 -46, 26 -26, 26 -8
                   C 26 10, 16 24, 0 24 Z"
                fill="${palette.accent2}" opacity="0.15"/>
          <circle cx="0" cy="-8" r="6" fill="${palette.accent2}" opacity="0.25"/>
          <circle cx="0" cy="12" r="3" fill="${palette.accent2}" opacity="0.2"/>
        </g>
      `;
    }

    const paisleyRow = Array.from({ length: 8 }, (_, i) => {
      const cx = (i + 0.5) * (W / 8);
      return renderPaisley(cx, 1375, 0.36);
    }).join('');

    // ── 9. Sacred Line ───────────────────────────────────────────
    // Centered at y≈310 in Noto Serif Devanagari, fill ink/cream
    const sacredLineSVG = v.sacredLine ? svgFitText(v.sacredLine, {
      x: W / 2,
      y: 310,
      maxWidth: 680,
      maxSize: 34,
      fontFamily: `${fonts.native}, serif`,
      fontWeight: 'normal',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
    }) : '';

    // ── 10. Event Type ───────────────────────────────────────────
    // JOST, fill gold, letter-spaced, y≈390
    const eventSVG = svgFitText((v.eventType || 'Wedding Invitation').toUpperCase(), {
      x: W / 2,
      y: 390,
      maxWidth: 680,
      maxSize: 26,
      fontFamily: `${fonts.body}, sans-serif`,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: 'letter-spacing="6"',
    });

    // ── 11. Groom Name ───────────────────────────────────────────
    // Playfair Display bold, fill ink/cream, y≈570, auto-fit to maxWidth 700
    const groomSVG = svgFitText(v.groomName || 'Arjun Sharma', {
      x: W / 2,
      y: 570,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: `${fonts.display}, serif`,
      fontWeight: '700',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
    });

    // ── 12. Ampersand ────────────────────────────────────────────
    // Italic, fill accent2 (saffron #E8590C), y≈660
    const ampersandSVG = `
      <text x="${W / 2}" y="660" text-anchor="middle"
            font-family="${escapeXML(fonts.script)}, serif" font-style="italic"
            font-size="52" fill="${palette.accent2}">&amp;</text>
    `;

    // ── 13. Bride Name ───────────────────────────────────────────
    // Playfair Display bold, fill ink/cream, y≈760, auto-fit to maxWidth 700
    const brideSVG = svgFitText(v.brideName || 'Priya Mehta', {
      x: W / 2,
      y: 760,
      maxWidth: 700,
      maxSize: 76,
      fontFamily: `${fonts.display}, serif`,
      fontWeight: '700',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
    });

    // ── 14. Decorative 3-dot line at y≈810 in gold ───────────────
    const dividerSVG = `
      <g transform="translate(${W / 2}, 810)" id="decorative-divider">
        <line x1="-190" y1="0" x2="-35" y2="0" stroke="${palette.gold}" stroke-width="1.5" opacity="0.65"/>
        <line x1="35" y1="0" x2="190" y2="0" stroke="${palette.gold}" stroke-width="1.5" opacity="0.65"/>
        <circle cx="-18" cy="0" r="3.5" fill="${palette.gold}"/>
        <circle cx="0" cy="0" r="5.5" fill="${palette.gold}"/>
        <circle cx="18" cy="0" r="3.5" fill="${palette.gold}"/>
        <polygon points="0,-9 6,0 0,9 -6,0" fill="${palette.gold}" opacity="0.7"/>
      </g>
    `;

    // ── 15. Date ─────────────────────────────────────────────────
    // Cormorant Garamond, fill ink/cream, y≈870
    const dateSVG = svgFitText(v.date || 'Sunday, 15th February 2026', {
      x: W / 2,
      y: 870,
      maxWidth: 680,
      maxSize: 34,
      fontFamily: `${fonts.script}, serif`,
      fontWeight: '600',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
    });

    // ── 16. Time ─────────────────────────────────────────────────
    // Jost, fill ink/cream opacity 0.85, y≈920
    const timeSVG = svgFitText(v.time || '11:00 AM onwards', {
      x: W / 2,
      y: 920,
      maxWidth: 600,
      maxSize: 26,
      fontFamily: `${fonts.body}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.85"',
    });

    // ── 17. Venue ────────────────────────────────────────────────
    // Cormorant Garamond, fill ink/cream, y≈990
    const venueSVG = svgFitText(v.venue || 'Taj Lands End, Bandra, Mumbai', {
      x: W / 2,
      y: 990,
      maxWidth: 660,
      maxSize: 32,
      fontFamily: `${fonts.script}, serif`,
      fontWeight: '400',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // ── 18. Hosted By ────────────────────────────────────────────
    // Cormorant Garamond, fill ink/cream opacity 0.8, around y≈1140
    const hostedSVG = v.hostedBy ? `
      <text x="${W / 2}" y="1108" text-anchor="middle"
            font-family="${escapeXML(fonts.body)}, sans-serif" font-size="20"
            fill="${palette.gold}" letter-spacing="4" opacity="0.85">
        HOSTED BY
      </text>
      ${svgFitText(v.hostedBy, {
        x: W / 2,
        y: 1140,
        maxWidth: 680,
        maxSize: 28,
        fontFamily: `${fonts.script}, serif`,
        fontWeight: '600',
        fill: palette.ink || palette.cream,
        textAnchor: 'middle',
        lineHeight: 1.35,
        extraAttrs: 'opacity="0.8"',
      })}
    ` : '';

    // ── 19. RSVP ─────────────────────────────────────────────────
    // If present, fill ink/cream opacity 0.7, y≈1300
    const rsvpText = v.rsvp ? (v.rsvp.toUpperCase().startsWith('RSVP') ? v.rsvp : `RSVP: ${v.rsvp}`) : '';
    const rsvpSVG = rsvpText ? svgFitText(rsvpText, {
      x: W / 2,
      y: 1300,
      maxWidth: 550,
      maxSize: 24,
      fontFamily: `${fonts.body}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink || palette.cream,
      textAnchor: 'middle',
      extraAttrs: 'opacity="0.7"',
    }) : '';

    return `
      ${bg}
      ${spandrelAccents}
      ${archFrame}
      ${scallopedBorder}
      ${chhajja}
      ${finial}
      ${columns}
      ${balcony}
      ${paisleyRow}
      ${sacredLineSVG}
      ${eventSVG}
      ${groomSVG}
      ${ampersandSVG}
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
