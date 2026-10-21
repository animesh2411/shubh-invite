/**
 * Christian – Olive & Light Wedding Invitation Template
 *
 * Soft botanical illustration with eucalyptus/olive branches, delicate gold cross,
 * and elegant typography pairing Cormorant Garamond with Pinyon Script & Jost.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

// ── Cubic Bezier Math Helpers ─────────────────────────────────────
function bezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

function bezierTangent(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    dx: 3 * mt2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x),
    dy: 3 * mt2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y),
  };
}

/**
 * Builds a natural botanical stem with elongated oval leaves and optional berries.
 *
 * @param {object} curve          { p0, p1, p2, p3 }
 * @param {object} leafOpts       { count, opacities, sideStart, spreadAngle, rxBase, ryBase, tMin, tMax }
 * @param {object} [berryOpts]    { enabled, tipOffset, count }
 * @param {object} palette
 * @returns {string} SVG snippet
 */
function buildBotanicalBranch(curve, leafOpts, berryOpts, palette) {
  const { p0, p1, p2, p3 } = curve;
  const {
    count = 10,
    opacities = [0.80, 0.40, 0.85, 0.65, 0.75, 0.40, 0.70, 0.60, 0.85, 0.45],
    sideStart = 1,
    spreadAngle = 0.72, // ~41 degrees
    rxBase = 11,
    ryBase = 5.2,
    tMin = 0.14,
    tMax = 0.94,
    stemWidth = 1.7,
  } = leafOpts;

  // 1. Curved Stem
  const stemPath = `
    <path d="M ${p0.x.toFixed(1)} ${p0.y.toFixed(1)} C ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}, ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}"
          fill="none" stroke="${palette.sage}" stroke-width="${stemWidth}" stroke-linecap="round" opacity="0.85"/>
  `;

  // 2. Alternating Leaves along the stem
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? (tMin + tMax) / 2 : tMin + (i / (count - 1)) * (tMax - tMin);
    const pt = bezierPoint(p0, p1, p2, p3, t);
    const tan = bezierTangent(p0, p1, p2, p3, t);
    const baseTheta = Math.atan2(tan.dy, tan.dx);

    const side = (i % 2 === 0 ? 1 : -1) * sideStart;
    const leafAngle = baseTheta + side * (spreadAngle + ((i % 3) - 1) * 0.08);

    // Subtle size variation along stem (smaller near tips)
    const sizeScale = 0.85 + 0.35 * Math.sin(t * Math.PI);
    const rx = (rxBase + ((i % 3) - 1) * 1.2) * sizeScale;
    const ry = (ryBase + ((i % 2) - 0.5) * 0.8) * sizeScale;

    // Small stem attachment (petiole)
    const petioleLen = 6 + (i % 3) * 1.5;
    const lx = pt.x + petioleLen * Math.cos(leafAngle);
    const ly = pt.y + petioleLen * Math.sin(leafAngle);

    // Leaf center positioned so base attaches near petiole
    const cx = lx + rx * Math.cos(leafAngle);
    const cy = ly + rx * Math.sin(leafAngle);
    const deg = (leafAngle * 180) / Math.PI;

    const op = opacities[i % opacities.length];

    // Petiole line + Leaf ellipse + delicate midrib line
    leaves.push(`
      <line x1="${pt.x.toFixed(1)}" y1="${pt.y.toFixed(1)}"
            x2="${lx.toFixed(1)}" y2="${ly.toFixed(1)}"
            stroke="${palette.sage}" stroke-width="0.9" opacity="${(op * 0.8).toFixed(2)}" stroke-linecap="round"/>
      <ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}"
               rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}"
               transform="rotate(${deg.toFixed(1)}, ${cx.toFixed(1)}, ${cy.toFixed(1)})"
               fill="${palette.sage}" opacity="${op.toFixed(2)}"/>
      <line x1="${(cx - rx * 0.72 * Math.cos(leafAngle)).toFixed(1)}"
            y1="${(cy - rx * 0.72 * Math.sin(leafAngle)).toFixed(1)}"
            x2="${(cx + rx * 0.72 * Math.cos(leafAngle)).toFixed(1)}"
            y2="${(cy + rx * 0.72 * Math.sin(leafAngle)).toFixed(1)}"
            stroke="${palette.ink}" stroke-width="0.5" opacity="${(op * 0.28).toFixed(2)}"/>
    `);
  }

  // 3. Delicate Berries at the stem tip
  const berries = [];
  if (berryOpts && berryOpts.enabled) {
    const tipTan = bezierTangent(p0, p1, p2, p3, 1.0);
    const tipAngle = Math.atan2(tipTan.dy, tipTan.dx);
    const bCount = berryOpts.count || 3;

    const berryConfigs = [
      { dist: 8, angleOffset: 0.05, r: 5.0, op: 0.75 },
      { dist: 12, angleOffset: 0.48, r: 4.4, op: 0.70 },
      { dist: 11, angleOffset: -0.42, r: 4.8, op: 0.68 },
    ];

    for (let b = 0; b < Math.min(bCount, berryConfigs.length); b++) {
      const cfg = berryConfigs[b];
      const ang = tipAngle + cfg.angleOffset;
      const bx = p3.x + cfg.dist * Math.cos(ang);
      const by = p3.y + cfg.dist * Math.sin(ang);

      berries.push(`
        <line x1="${p3.x.toFixed(1)}" y1="${p3.y.toFixed(1)}"
              x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}"
              stroke="${palette.sage}" stroke-width="0.8" opacity="0.65"/>
        <circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${cfg.r}"
                fill="${palette.dustyBlue}" opacity="${cfg.op}"/>
        <circle cx="${(bx - 1.2).toFixed(1)}" cy="${(by - 1.2).toFixed(1)}" r="1.4"
                fill="#FFFFFF" opacity="0.55"/>
      `);
    }
  }

  return `
    <g class="botanical-branch">
      ${stemPath}
      ${leaves.join('')}
      ${berries.join('')}
    </g>
  `;
}

export default {
  id: 'christian-wedding-olive',
  tradition: 'christian',
  occasion: 'wedding',
  name: 'Olive & Light',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:        '#FBF8F1',
    ink:       '#2C2416',
    accent:    '#8A9A7B',
    accent2:   '#B8975A',
    paper:     '#FFFDF8',
    gold:      '#B8975A',
    sage:      '#8A9A7B',
    dustyBlue: '#9DB4C0',
    cream:     '#FBF8F1',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Pinyon Script',
    native:  'Cormorant Garamond',
  },

  fontPairs: [
    {
      id: 'classic',
      label: 'Cormorant + Pinyon',
      display: 'Cormorant Garamond',
      body: 'Jost',
      script: 'Pinyon Script',
    },
    {
      id: 'modern',
      label: 'Cormorant + Jost',
      display: 'Cormorant Garamond',
      body: 'Jost',
    },
  ],

  fields: [
    {
      key: 'blessingLine',
      label: 'Blessing line (optional)',
      default: "Join us as we celebrate in God's love",
      lang: 'en',
      multiline: false,
      optional: true,
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
      default: 'James Anderson',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Grace Williams',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Saturday, 7th June 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '3:00 PM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: "St. Mary's Chapel, London",
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Anderson & Williams Families',
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
   * Render the inner SVG markup for Olive & Light template.
   */
  render(values, palette, helpers) {
    const W = 1080;
    const H = 1500;
    const v = values || {};

    const svgFitText = helpers?.svgFitText || coreSvgFitText;
    const escapeXML = helpers?.escapeXML || coreEscapeXML;

    // Active font pair selection support
    const activePairId = v.fontPair || 'classic';
    const pair = (this.fontPairs || []).find((p) => p.id === activePairId) || this.fontPairs[0];
    const scriptFont = pair.script || pair.display;
    const displayFont = pair.display;
    const bodyFont = pair.body;

    // ── 1. Soft Ivory Background & Elegant Subtle Frame ──────
    const bg = `
      <!-- Background -->
      <rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>

      <!-- Delicate double border inset -->
      <rect x="36" y="36" width="${W - 72}" height="${H - 72}"
            fill="none" stroke="${palette.gold}" stroke-width="0.8" opacity="0.32" rx="3"/>
      <rect x="44" y="44" width="${W - 88}" height="${H - 88}"
            fill="none" stroke="${palette.sage}" stroke-width="0.5" opacity="0.22" rx="2"/>

      <!-- Corner accent marks -->
      <line x1="28" y1="36" x2="48" y2="36" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>
      <line x1="36" y1="28" x2="36" y2="48" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>

      <line x1="${W - 48}" y1="36" x2="${W - 28}" y2="36" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>
      <line x1="${W - 36}" y1="28" x2="${W - 36}" y2="48" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>

      <line x1="28" y1="${H - 36}" x2="48" y2="${H - 36}" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>
      <line x1="36" y1="${H - 48}" x2="36" y2="${H - 28}" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>

      <line x1="${W - 48}" y1="${H - 36}" x2="${W - 28}" y2="${H - 36}" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>
      <line x1="${W - 36}" y1="${H - 48}" x2="${W - 36}" y2="${H - 28}" stroke="${palette.gold}" stroke-width="0.8" opacity="0.4"/>
    `;

    // ── 2. Top-Left Botanical Cluster (x: -20 to 400, y: -20 to 380) ──
    const topLeftCluster = `
      <g id="top-left-botanical">
        <!-- Stem 1: Primary center-arching branch -->
        ${buildBotanicalBranch(
          {
            p0: { x: -15, y: 50 },
            p1: { x: 70,  y: 75 },
            p2: { x: 195, y: 145 },
            p3: { x: 350, y: 265 },
          },
          {
            count: 11,
            opacities: [0.80, 0.40, 0.85, 0.65, 0.70, 0.40, 0.75, 0.60, 0.80, 0.45, 0.70],
            sideStart: 1,
            spreadAngle: 0.72,
            rxBase: 11.5,
            ryBase: 5.4,
            tMin: 0.12,
            tMax: 0.94,
            stemWidth: 1.8,
          },
          { enabled: true, count: 3 },
          palette
        )}

        <!-- Stem 2: Upper branch sweeping across top -->
        ${buildBotanicalBranch(
          {
            p0: { x: 35,  y: -20 },
            p1: { x: 135, y: 15 },
            p2: { x: 245, y: 65 },
            p3: { x: 375, y: 150 },
          },
          {
            count: 10,
            opacities: [0.75, 0.40, 0.80, 0.60, 0.70, 0.40, 0.85, 0.65, 0.75, 0.45],
            sideStart: -1,
            spreadAngle: 0.68,
            rxBase: 10.8,
            ryBase: 5.0,
            tMin: 0.15,
            tMax: 0.93,
            stemWidth: 1.6,
          },
          { enabled: true, count: 3 },
          palette
        )}

        <!-- Stem 3: Lower cascading branch -->
        ${buildBotanicalBranch(
          {
            p0: { x: -18, y: 155 },
            p1: { x: 45,  y: 220 },
            p2: { x: 130, y: 295 },
            p3: { x: 245, y: 360 },
          },
          {
            count: 9,
            opacities: [0.80, 0.45, 0.85, 0.40, 0.70, 0.60, 0.75, 0.40, 0.65],
            sideStart: 1,
            spreadAngle: 0.70,
            rxBase: 10.5,
            ryBase: 4.8,
            tMin: 0.14,
            tMax: 0.92,
            stemWidth: 1.5,
          },
          { enabled: true, count: 2 },
          palette
        )}

        <!-- Gentle floating accent leaf for depth -->
        <ellipse cx="295" cy="100" rx="9.5" ry="4.5"
                 transform="rotate(28, 295, 100)" fill="${palette.sage}" opacity="0.35"/>
      </g>
    `;

    // ── 3. Bottom-Right Botanical Cluster (x: 680 to 1100, y: 1120 to 1520) ──
    const bottomRightCluster = `
      <g id="bottom-right-botanical">
        <!-- Stem 1: Primary upward-arching branch -->
        ${buildBotanicalBranch(
          {
            p0: { x: 1095, y: 1450 },
            p1: { x: 1005, y: 1405 },
            p2: { x: 890,  y: 1325 },
            p3: { x: 725,  y: 1235 },
          },
          {
            count: 11,
            opacities: [0.85, 0.40, 0.75, 0.65, 0.80, 0.40, 0.70, 0.60, 0.85, 0.45, 0.75],
            sideStart: -1,
            spreadAngle: 0.72,
            rxBase: 11.5,
            ryBase: 5.3,
            tMin: 0.12,
            tMax: 0.94,
            stemWidth: 1.8,
          },
          { enabled: true, count: 3 },
          palette
        )}

        <!-- Stem 2: Lower sweeping branch toward bottom-center -->
        ${buildBotanicalBranch(
          {
            p0: { x: 1055, y: 1520 },
            p1: { x: 955,  y: 1475 },
            p2: { x: 840,  y: 1430 },
            p3: { x: 695,  y: 1370 },
          },
          {
            count: 10,
            opacities: [0.70, 0.40, 0.85, 0.60, 0.75, 0.40, 0.80, 0.65, 0.70, 0.45],
            sideStart: 1,
            spreadAngle: 0.68,
            rxBase: 10.8,
            ryBase: 5.0,
            tMin: 0.15,
            tMax: 0.93,
            stemWidth: 1.6,
          },
          { enabled: true, count: 3 },
          palette
        )}

        <!-- Stem 3: Side branch reaching upward -->
        ${buildBotanicalBranch(
          {
            p0: { x: 1098, y: 1335 },
            p1: { x: 1015, y: 1265 },
            p2: { x: 920,  y: 1195 },
            p3: { x: 805,  y: 1130 },
          },
          {
            count: 9,
            opacities: [0.80, 0.40, 0.70, 0.60, 0.85, 0.45, 0.75, 0.40, 0.65],
            sideStart: -1,
            spreadAngle: 0.70,
            rxBase: 10.5,
            ryBase: 4.8,
            tMin: 0.14,
            tMax: 0.92,
            stemWidth: 1.5,
          },
          { enabled: true, count: 2 },
          palette
        )}

        <!-- Gentle floating accent leaf for depth -->
        <ellipse cx="785" cy="1395" rx="9" ry="4.2"
                 transform="rotate(-34, 785, 1395)" fill="${palette.sage}" opacity="0.35"/>
      </g>
    `;

    // ── 4. Thin Gold Cross centered at (W/2, 340) ─────────────
    // Vertical: 80px tall, 3px wide (centered at y=340 => top 300 to bottom 380)
    // Horizontal: 50px wide, 3px tall (at 1/3 from top => y = 300 + 80/3 ≈ 326.7)
    // Small circle r=6 at intersection
    const crossCx = W / 2;
    const crossCy = 340;
    const vertTop = crossCy - 40;     // 300
    const horizY = vertTop + 80 / 3;  // ~326.67
    const cross = `
      <g id="gold-cross">
        <!-- Vertical beam: 80px tall, 3px wide -->
        <rect x="${crossCx - 1.5}" y="${vertTop}" width="3" height="80" rx="1.2"
              fill="${palette.gold}"/>
        <!-- Horizontal beam: 50px wide, 3px tall -->
        <rect x="${crossCx - 25}" y="${(horizY - 1.5).toFixed(2)}" width="50" height="3" rx="1.2"
              fill="${palette.gold}"/>
        <!-- Center circle at intersection -->
        <circle cx="${crossCx}" cy="${horizY.toFixed(2)}" r="6" fill="${palette.gold}"/>
      </g>
    `;

    // ── 5. Gold Horizontal Rules at y=400 and y=412 ───────────
    const ruleW = 400;
    const ruleX1 = crossCx - ruleW / 2; // 340
    const ruleX2 = crossCx + ruleW / 2; // 740
    const goldRules = `
      <g id="gold-rules">
        <line x1="${ruleX1}" y1="400" x2="${ruleX2}" y2="400"
              stroke="${palette.gold}" stroke-width="1.2" opacity="0.85"/>
        <line x1="${ruleX1}" y1="412" x2="${ruleX2}" y2="412"
              stroke="${palette.gold}" stroke-width="0.75" opacity="0.6"/>
        <circle cx="${crossCx}" cy="406" r="2" fill="${palette.gold}" opacity="0.8"/>
      </g>
    `;

    // ── 6. Blessing Line (Cormorant Garamond italic 28px, fill sage, y≈460) ──
    const blessingSVG = v.blessingLine ? svgFitText(v.blessingLine, {
      x: crossCx,
      y: 460,
      maxWidth: 840,
      maxSize: 28,
      fontFamily: displayFont,
      fontWeight: 'normal',
      fill: palette.sage,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    }) : '';

    // ── 7. Event Type (Jost letter-spaced 24px, fill gold, y≈510) ──
    const rawEventType = v.eventType || 'Wedding Invitation';
    const eventTypeSVG = rawEventType ? svgFitText(rawEventType.toUpperCase(), {
      x: crossCx,
      y: 510,
      maxWidth: 820,
      maxSize: 24,
      fontFamily: bodyFont,
      fontWeight: '500',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' letter-spacing="4px"',
    }) : '';

    // ── 8. Groom's Name (Pinyon Script 88px, fill ink, y≈630) ─
    const groomSVG = svgFitText(v.groomName || 'James Anderson', {
      x: crossCx,
      y: 630,
      maxWidth: 880,
      maxSize: 88,
      fontFamily: scriptFont,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 9. Ampersand (Cormorant Garamond italic 52px, fill gold, y≈720) ──
    const ampersandSVG = svgFitText('&', {
      x: crossCx,
      y: 720,
      maxWidth: 100,
      maxSize: 52,
      fontFamily: displayFont,
      fontWeight: 'normal',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    });

    // ── 10. Bride's Name (Pinyon Script 88px, fill ink, y≈820) ─
    const brideSVG = svgFitText(v.brideName || 'Grace Williams', {
      x: crossCx,
      y: 820,
      maxWidth: 880,
      maxSize: 88,
      fontFamily: scriptFont,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 11. Decorative thin sage line + small cross motif at y≈880 ──
    const dividerCross = `
      <g id="divider-cross" opacity="0.85">
        <line x1="360" y1="880" x2="510" y2="880" stroke="${palette.sage}" stroke-width="1"/>
        <line x1="570" y1="880" x2="720" y2="880" stroke="${palette.sage}" stroke-width="1"/>
        <circle cx="360" cy="880" r="2.5" fill="${palette.sage}"/>
        <circle cx="720" cy="880" r="2.5" fill="${palette.sage}"/>

        <!-- Small delicate center cross motif -->
        <rect x="539.25" y="868" width="1.5" height="24" rx="0.5" fill="${palette.gold}"/>
        <rect x="532" y="874" width="16" height="1.5" rx="0.5" fill="${palette.gold}"/>
        <circle cx="${crossCx}" cy="874.75" r="2.5" fill="${palette.gold}"/>
      </g>
    `;

    // ── 12. Date (Cormorant Garamond 34px, fill ink, y≈950) ───
    const dateSVG = svgFitText(v.date || 'Saturday, 7th June 2026', {
      x: crossCx,
      y: 950,
      maxWidth: 840,
      maxSize: 34,
      fontFamily: displayFont,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── 13. Time (Jost 26px, fill ink muted, y≈1000) ───────────
    const timeSVG = svgFitText(v.time || '3:00 PM', {
      x: crossCx,
      y: 1000,
      maxWidth: 800,
      maxSize: 26,
      fontFamily: bodyFont,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.8"',
    });

    // ── 14. Venue (Cormorant Garamond italic 32px, fill ink, y≈1060) ──
    const venueSVG = svgFitText(v.venue || "St. Mary's Chapel, London", {
      x: crossCx,
      y: 1060,
      maxWidth: 840,
      maxSize: 32,
      fontFamily: displayFont,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
      lineHeight: 1.35,
    });

    // ── 15. Hosted By (Cormorant Garamond 28px, fill ink muted, y≈1160) ──
    const hostedBySVG = v.hostedBy ? svgFitText(v.hostedBy, {
      x: crossCx,
      y: 1160,
      maxWidth: 800,
      maxSize: 28,
      fontFamily: displayFont,
      fontWeight: 'normal',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.85"',
      lineHeight: 1.35,
    }) : '';

    // ── 16. RSVP (if present, Jost 24px, fill accent2, y≈1330) ─
    const rsvpSVG = v.rsvp ? `
      <g id="rsvp-section">
        <line x1="470" y1="1290" x2="610" y2="1290"
              stroke="${palette.gold}" stroke-width="0.75" opacity="0.6"/>
        <circle cx="${crossCx}" cy="1290" r="2" fill="${palette.gold}" opacity="0.8"/>
        ${svgFitText(v.rsvp, {
          x: crossCx,
          y: 1330,
          maxWidth: 720,
          maxSize: 24,
          fontFamily: bodyFont,
          fontWeight: '400',
          fill: palette.accent2,
          textAnchor: 'middle',
          extraAttrs: ' letter-spacing="1.5px"',
        })}
      </g>
    ` : '';

    // ── Return complete inner SVG string ──────────────────────
    return `
      ${bg}
      ${topLeftCluster}
      ${bottomRightCluster}
      ${cross}
      ${goldRules}
      ${blessingSVG}
      ${eventTypeSVG}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${dividerCross}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedBySVG}
      ${rsvpSVG}
    `;
  },
};
