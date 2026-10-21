/**
 * Sikh – Phulkari Saffron
 *
 * Tradition: Sikh
 * Occasion: Anand Karaj
 *
 * Rich geometric Phulkari embroidery border on celebratory saffron and cream,
 * featuring repeating diamond grids, 4-petal silk flower stitches, inner sawtooth
 * edging, corner octagonal star medallions, and Ik Onkar blessing.
 */

import { svgFitText as coreSvgFitText } from '../../core/textFit.js';
import { escapeXML as coreEscapeXML } from '../../core/renderer.js';

/**
 * 4-petal cross/flower in cream silk thread stitch inside large diamonds.
 */
function renderPhulkariFlower(cx, cy, palette) {
  return `
    <polygon points="${cx.toFixed(1)},${(cy - 16).toFixed(1)} ${(cx + 4).toFixed(1)},${(cy - 8).toFixed(1)} ${cx.toFixed(1)},${(cy - 2).toFixed(1)} ${(cx - 4).toFixed(1)},${(cy - 8).toFixed(1)}" fill="${palette.cream}"/>
    <polygon points="${cx.toFixed(1)},${(cy + 2).toFixed(1)} ${(cx + 4).toFixed(1)},${(cy + 8).toFixed(1)} ${cx.toFixed(1)},${(cy + 16).toFixed(1)} ${(cx - 4).toFixed(1)},${(cy + 8).toFixed(1)}" fill="${palette.cream}"/>
    <polygon points="${(cx + 2).toFixed(1)},${cy.toFixed(1)} ${(cx + 8).toFixed(1)},${(cy - 4).toFixed(1)} ${(cx + 16).toFixed(1)},${cy.toFixed(1)} ${(cx + 8).toFixed(1)},${(cy + 4).toFixed(1)}" fill="${palette.cream}"/>
    <polygon points="${(cx - 16).toFixed(1)},${cy.toFixed(1)} ${(cx - 8).toFixed(1)},${(cy - 4).toFixed(1)} ${(cx - 2).toFixed(1)},${cy.toFixed(1)} ${(cx - 8).toFixed(1)},${(cy + 4).toFixed(1)}" fill="${palette.cream}"/>
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3" fill="${palette.gold}"/>
    <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1.5" fill="${palette.saffron}"/>
  `;
}

/**
 * Helper function generating the dense Phulkari diamond + zigzag tile pattern for a given edge.
 * @param {'top'|'bottom'|'left'|'right'} edge
 * @param {object} palette
 * @param {number} W
 * @param {number} H
 * @returns {string} SVG markup string for the edge
 */
function renderPhulkariBorderEdge(edge, palette, W, H) {
  const parts = [];

  if (edge === 'top' || edge === 'bottom') {
    const isTop = edge === 'top';
    const y0 = isTop ? 0 : H - 100;
    const cy = isTop ? 50 : H - 50;

    // 1. Saffron base rectangle
    parts.push(`<rect x="0" y="${y0}" width="${W}" height="100" fill="${palette.saffron}"/>`);

    // 2. Outer decorative rim lines
    const lineY1 = isTop ? 3 : H - 3;
    const lineY2 = isTop ? 8 : H - 8;
    parts.push(`<line x1="0" y1="${lineY1}" x2="${W}" y2="${lineY1}" stroke="${palette.gold}" stroke-width="2"/>`);
    parts.push(`<line x1="0" y1="${lineY2}" x2="${W}" y2="${lineY2}" stroke="${palette.navy}" stroke-width="1.5" stroke-dasharray="5 4"/>`);

    // 3. Repeating diamond grid across the full width
    const tileCount = 22;
    const step = W / tileCount;

    for (let i = 0; i < tileCount; i++) {
      const cx = (i + 0.5) * step;
      const jx = (i + 1) * step;

      // Large 50x50 diamond in magenta with gold outline
      const dTop = cy - 25;
      const dBottom = cy + 25;
      const dLeft = cx - step / 2;
      const dRight = cx + step / 2;

      parts.push(`
        <polygon points="${cx.toFixed(1)},${dTop.toFixed(1)} ${dRight.toFixed(1)},${cy.toFixed(1)} ${cx.toFixed(1)},${dBottom.toFixed(1)} ${dLeft.toFixed(1)},${cy.toFixed(1)}"
                 fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="2.5"/>
      `);

      // 4-petal flower in cream inside each large diamond
      parts.push(renderPhulkariFlower(cx, cy, palette));

      // Between diamonds: junction diamond point in gold with navy center
      parts.push(`
        <polygon points="${jx.toFixed(1)},${(cy - 9).toFixed(1)} ${(jx + 9).toFixed(1)},${cy.toFixed(1)} ${jx.toFixed(1)},${(cy + 9).toFixed(1)} ${(jx - 9).toFixed(1)},${cy.toFixed(1)}"
                 fill="${palette.gold}"/>
        <circle cx="${jx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" fill="${palette.navy}"/>
      `);

      // Flanking gold+navy diamond points in top and bottom notches
      const notch1Y = cy - 31;
      const notch2Y = cy + 31;
      parts.push(`
        <polygon points="${jx.toFixed(1)},${(notch1Y - 9).toFixed(1)} ${(jx + 9).toFixed(1)},${notch1Y.toFixed(1)} ${jx.toFixed(1)},${(notch1Y + 9).toFixed(1)} ${(jx - 9).toFixed(1)},${notch1Y.toFixed(1)}" fill="${palette.gold}"/>
        <polygon points="${jx.toFixed(1)},${(notch1Y - 5).toFixed(1)} ${(jx + 5).toFixed(1)},${notch1Y.toFixed(1)} ${jx.toFixed(1)},${(notch1Y + 5).toFixed(1)} ${(jx - 5).toFixed(1)},${notch1Y.toFixed(1)}" fill="${palette.navy}"/>
        <polygon points="${jx.toFixed(1)},${(notch2Y - 9).toFixed(1)} ${(jx + 9).toFixed(1)},${notch2Y.toFixed(1)} ${jx.toFixed(1)},${(notch2Y + 9).toFixed(1)} ${(jx - 9).toFixed(1)},${notch2Y.toFixed(1)}" fill="${palette.gold}"/>
        <polygon points="${jx.toFixed(1)},${(notch2Y - 5).toFixed(1)} ${(jx + 5).toFixed(1)},${notch2Y.toFixed(1)} ${jx.toFixed(1)},${(notch2Y + 5).toFixed(1)} ${(jx - 5).toFixed(1)},${notch2Y.toFixed(1)}" fill="${palette.navy}"/>
      `);
    }

    // 4. Zigzag sawtooth inner edge (gold triangles pointing inward)
    const innerY = isTop ? 100 : H - 100;
    const apexY = isTop ? 108 : H - 108;
    const sawtoothCount = 44;
    const sawStep = 880 / sawtoothCount; // 20px step between x=100 and x=980
    for (let j = 0; j < sawtoothCount; j++) {
      const x1 = 100 + j * sawStep;
      const x2 = x1 + sawStep;
      const xm = x1 + sawStep / 2;
      parts.push(`<polygon points="${x1.toFixed(1)},${innerY} ${x2.toFixed(1)},${innerY} ${xm.toFixed(1)},${apexY}" fill="${palette.gold}"/>`);
    }

  } else {
    // Vertical edge ('left' or 'right')
    const isLeft = edge === 'left';
    const x0 = isLeft ? 0 : W - 100;
    const cx = isLeft ? 50 : W - 50;

    // 1. Saffron base rectangle
    parts.push(`<rect x="${x0}" y="0" width="100" height="${H}" fill="${palette.saffron}"/>`);

    // 2. Outer decorative rim lines
    const lineX1 = isLeft ? 3 : W - 3;
    const lineX2 = isLeft ? 8 : W - 8;
    parts.push(`<line x1="${lineX1}" y1="0" x2="${lineX1}" y2="${H}" stroke="${palette.gold}" stroke-width="2"/>`);
    parts.push(`<line x1="${lineX2}" y1="0" x2="${lineX2}" y2="${H}" stroke="${palette.navy}" stroke-width="1.5" stroke-dasharray="5 4"/>`);

    // 3. Repeating diamond grid vertically
    const tileCount = 30;
    const step = H / tileCount; // 50px exactly

    for (let i = 0; i < tileCount; i++) {
      const cy = (i + 0.5) * step;
      const jy = (i + 1) * step;

      // Large 50x50 diamond in magenta with gold outline
      const dTop = cy - step / 2;
      const dBottom = cy + step / 2;
      const dLeft = cx - 25;
      const dRight = cx + 25;

      parts.push(`
        <polygon points="${cx.toFixed(1)},${dTop.toFixed(1)} ${dRight.toFixed(1)},${cy.toFixed(1)} ${cx.toFixed(1)},${dBottom.toFixed(1)} ${dLeft.toFixed(1)},${cy.toFixed(1)}"
                 fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="2.5"/>
      `);

      // 4-petal flower in cream inside each large diamond
      parts.push(renderPhulkariFlower(cx, cy, palette));

      // Between diamonds: junction diamond point in gold with navy center
      parts.push(`
        <polygon points="${cx.toFixed(1)},${(jy - 9).toFixed(1)} ${(cx + 9).toFixed(1)},${jy.toFixed(1)} ${cx.toFixed(1)},${(jy + 9).toFixed(1)} ${(cx - 9).toFixed(1)},${jy.toFixed(1)}"
                 fill="${palette.gold}"/>
        <circle cx="${cx.toFixed(1)}" cy="${jy.toFixed(1)}" r="2" fill="${palette.navy}"/>
      `);

      // Flanking gold+navy diamond points in left and right notches
      const notch1X = cx - 31;
      const notch2X = cx + 31;
      parts.push(`
        <polygon points="${notch1X.toFixed(1)},${(jy - 9).toFixed(1)} ${(notch1X + 9).toFixed(1)},${jy.toFixed(1)} ${notch1X.toFixed(1)},${(jy + 9).toFixed(1)} ${(notch1X - 9).toFixed(1)},${jy.toFixed(1)}" fill="${palette.gold}"/>
        <polygon points="${notch1X.toFixed(1)},${(jy - 5).toFixed(1)} ${(notch1X + 5).toFixed(1)},${jy.toFixed(1)} ${notch1X.toFixed(1)},${(jy + 5).toFixed(1)} ${(notch1X - 5).toFixed(1)},${jy.toFixed(1)}" fill="${palette.navy}"/>
        <polygon points="${notch2X.toFixed(1)},${(jy - 9).toFixed(1)} ${(notch2X + 9).toFixed(1)},${jy.toFixed(1)} ${notch2X.toFixed(1)},${(jy + 9).toFixed(1)} ${(notch2X - 9).toFixed(1)},${jy.toFixed(1)}" fill="${palette.gold}"/>
        <polygon points="${notch2X.toFixed(1)},${(jy - 5).toFixed(1)} ${(notch2X + 5).toFixed(1)},${jy.toFixed(1)} ${notch2X.toFixed(1)},${(jy + 5).toFixed(1)} ${(notch2X - 5).toFixed(1)},${jy.toFixed(1)}" fill="${palette.navy}"/>
      `);
    }

    // 4. Zigzag sawtooth inner edge (gold triangles pointing inward)
    const innerX = isLeft ? 100 : W - 100;
    const apexX = isLeft ? 108 : W - 108;
    const sawtoothCount = 65;
    const sawStep = 1300 / sawtoothCount; // 20px step between y=100 and y=1400
    for (let j = 0; j < sawtoothCount; j++) {
      const y1 = 100 + j * sawStep;
      const y2 = y1 + sawStep;
      const ym = y1 + sawStep / 2;
      parts.push(`<polygon points="${innerX},${y1.toFixed(1)} ${innerX},${y2.toFixed(1)} ${apexX},${ym.toFixed(1)}" fill="${palette.gold}"/>`);
    }
  }

  return parts.join('');
}

/**
 * Renders the octagonal star corner motif at (cx, cy).
 */
function renderCornerMotif(cx, cy, palette) {
  // 16-point outer star (8-pointed star)
  const outerStarPoints = Array.from({ length: 16 }, (_, k) => {
    const angle = (k * 22.5 - 90) * Math.PI / 180;
    const r = k % 2 === 0 ? 42 : 26;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

  // 16-point inner star
  const innerStarPoints = Array.from({ length: 16 }, (_, k) => {
    const angle = (k * 22.5 - 90) * Math.PI / 180;
    const r = k % 2 === 0 ? 25 : 15;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

  // 4 corner accent diamond coordinates
  const cornerAccents = [
    [cx - 36, cy - 36],
    [cx + 36, cy - 36],
    [cx - 36, cy + 36],
    [cx + 36, cy + 36],
  ].map(([px, py]) => `
    <polygon points="${px.toFixed(1)},${(py - 6).toFixed(1)} ${(px + 6).toFixed(1)},${py.toFixed(1)} ${px.toFixed(1)},${(py + 6).toFixed(1)} ${(px - 6).toFixed(1)},${py.toFixed(1)}" fill="${palette.gold}"/>
    <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="1.5" fill="${palette.navy}"/>
  `).join('');

  return `
    <!-- Corner square frame -->
    <rect x="${cx - 50}" y="${cy - 50}" width="100" height="100" fill="${palette.saffron}"/>
    <rect x="${cx - 48}" y="${cy - 48}" width="96" height="96" fill="none" stroke="${palette.gold}" stroke-width="2"/>
    ${cornerAccents}
    <!-- Outer octagonal star in magenta with gold stroke -->
    <polygon points="${outerStarPoints}" fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="2.5"/>
    <!-- Inner octagonal star in navy with gold stroke -->
    <polygon points="${innerStarPoints}" fill="${palette.navy}" stroke="${palette.gold}" stroke-width="1.5"/>
    <!-- Center rosette jewel -->
    <circle cx="${cx}" cy="${cy}" r="9" fill="${palette.gold}"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="${palette.saffron}"/>
    <circle cx="${cx}" cy="${cy}" r="3" fill="${palette.cream}"/>
  `;
}

export default {
  id: 'sikh-anand-karaj-phulkari',
  tradition: 'sikh',
  occasion: 'anand-karaj',
  name: 'Phulkari Saffron',
  size: { w: 1080, h: 1500 },

  palette: {
    bg: '#FFF7E6',
    ink: '#1A0A00',
    accent: '#F28C28',
    accent2: '#C9A227',
    paper: '#FFFDF5',
    gold: '#C9A227',
    saffron: '#F28C28',
    navy: '#0B2447',
    magenta: '#C2185B',
    cream: '#FFF7E6',
  },

  fonts: {
    display: 'Playfair Display',
    body: 'Jost',
    script: 'Cormorant Garamond',
    native: 'Noto Sans Gurmukhi',
  },

  fontPairs: [
    { id: 'classic', label: 'Playfair + Jost', display: 'Playfair Display', body: 'Jost' },
    { id: 'gurmukhi', label: 'Noto Gurmukhi + Jost', display: 'Noto Sans Gurmukhi', body: 'Jost' },
  ],

  fields: [
    {
      key: 'waheguruLine',
      label: 'Waheguru line (optional)',
      default: 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
      lang: 'pa',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Granthi before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Anand Karaj Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: "Groom's name",
      default: 'Harpreet Singh',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: "Bride's name",
      default: 'Simran Kaur',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Sunday, 22nd March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: '10:00 AM',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Gurdwara Sahib, Amritsar',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Singh & Kaur Families',
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
    const svgFitText = helpers.svgFitText || coreSvgFitText;
    const escapeXML = helpers.escapeXML || coreEscapeXML;
    const v = values || {};

    // Font selection based on active fontPair
    const pair = (v.fontPair === 'gurmukhi')
      ? { display: 'Noto Sans Gurmukhi', body: 'Jost' }
      : { display: 'Playfair Display', body: 'Jost' };

    // 1. Full canvas cream background
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // 2. Inner cream panel inset 100px each side
    const innerPanel = `<rect x="100" y="100" width="${W - 200}" height="${H - 200}" fill="${palette.cream}"/>`;

    // 3. Phulkari embroidery border on all 4 sides (with inward-pointing zigzag sawtooth edging)
    const borderTop = renderPhulkariBorderEdge('top', palette, W, H);
    const borderBottom = renderPhulkariBorderEdge('bottom', palette, W, H);
    const borderLeft = renderPhulkariBorderEdge('left', palette, W, H);
    const borderRight = renderPhulkariBorderEdge('right', palette, W, H);

    // 4. Corner octagonal star medallions (at the 4 border junctions)
    const corners = `
      ${renderCornerMotif(50, 50, palette)}
      ${renderCornerMotif(W - 50, 50, palette)}
      ${renderCornerMotif(50, H - 50, palette)}
      ${renderCornerMotif(W - 50, H - 50, palette)}
    `;

    // 5. Thin gold inner frame at 108px inset + subtle inner hairline
    const innerFrame = `
      <rect x="108" y="108" width="${W - 216}" height="${H - 216}" fill="none"
            stroke="${palette.gold}" stroke-width="1.5"/>
      <rect x="114" y="114" width="${W - 228}" height="${H - 228}" fill="none"
            stroke="${palette.gold}" stroke-width="0.75" opacity="0.6"/>
    `;

    // 6. ੴ (Ik Onkar) centered at (W/2, 310) in saffron
    const ikOnkarSVG = svgFitText('ੴ', {
      x: W / 2,
      y: 310,
      maxWidth: 240,
      maxSize: 90,
      fontFamily: 'Noto Sans Gurmukhi',
      fontWeight: 'normal',
      fill: palette.saffron,
      textAnchor: 'middle',
    });

    // 7. waheguruLine centered at y≈400 in navy
    const waheguruText = (v.waheguruLine !== undefined && v.waheguruLine !== null)
      ? String(v.waheguruLine).trim()
      : 'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥';

    const waheguruSVG = waheguruText ? svgFitText(waheguruText, {
      x: W / 2,
      y: 400,
      maxWidth: 800,
      maxSize: 32,
      fontFamily: 'Noto Sans Gurmukhi',
      fontWeight: 'normal',
      fill: palette.navy,
      textAnchor: 'middle',
    }) : '';

    // 8. eventType at y≈460 in gold
    const eventSVG = svgFitText(v.eventType || 'Anand Karaj Invitation', {
      x: W / 2,
      y: 460,
      maxWidth: 750,
      maxSize: 24,
      fontFamily: pair.body,
      fontWeight: '600',
      fill: palette.gold,
      textAnchor: 'middle',
      extraAttrs: ' letter-spacing="4"',
    });

    // 9. Thin saffron rule at y≈490 with decorative gold center
    const saffronRule = `
      <line x1="340" y1="490" x2="740" y2="490" stroke="${palette.saffron}" stroke-width="1.5" stroke-linecap="round"/>
      <polygon points="${W / 2},485 ${(W / 2) + 5},490 ${W / 2},495 ${(W / 2) - 5},490" fill="${palette.gold}"/>
      <circle cx="${(W / 2) - 25}" cy="490" r="2.5" fill="${palette.gold}"/>
      <circle cx="${(W / 2) + 25}" cy="490" r="2.5" fill="${palette.gold}"/>
    `;

    // 10. groomName: Playfair Display bold, fill ink, y≈590, auto-fit maxWidth 700
    const groomSVG = svgFitText(v.groomName || 'Harpreet Singh', {
      x: W / 2,
      y: 590,
      maxWidth: 700,
      maxSize: 74,
      fontFamily: pair.display,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // 11. '&' italic 54px, fill saffron, y≈680
    const ampersandSVG = svgFitText('&', {
      x: W / 2,
      y: 680,
      maxWidth: 200,
      maxSize: 54,
      fontFamily: pair.display,
      fontWeight: 'normal',
      fill: palette.saffron,
      textAnchor: 'middle',
      extraAttrs: ' font-style="italic"',
    });

    // 12. brideName: same, y≈780
    const brideSVG = svgFitText(v.brideName || 'Simran Kaur', {
      x: W / 2,
      y: 780,
      maxWidth: 700,
      maxSize: 74,
      fontFamily: pair.display,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // 13. Decorative row of 5 small diamonds at y≈840 in gold+magenta
    const diamondRow = `
      <!-- Outer flourish accent lines -->
      <line x1="330" y1="840" x2="445" y2="840" stroke="${palette.gold}" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="325" cy="840" r="2.5" fill="${palette.gold}"/>
      <line x1="635" y1="840" x2="750" y2="840" stroke="${palette.gold}" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="755" cy="840" r="2.5" fill="${palette.gold}"/>

      <!-- 5 Diamonds -->
      <!-- Diamond 1 (far-left) -->
      <polygon points="466,833 473,840 466,847 459,840" fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="1.5"/>
      <!-- Diamond 2 (mid-left) -->
      <polygon points="502,831 511,840 502,849 493,840" fill="${palette.gold}"/>
      <polygon points="502,834 508,840 502,846 496,840" fill="${palette.magenta}"/>
      <!-- Diamond 3 (center) -->
      <polygon points="540,827 553,840 540,853 527,840" fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="2"/>
      <circle cx="540" cy="840" r="3" fill="${palette.cream}"/>
      <!-- Diamond 4 (mid-right) -->
      <polygon points="578,831 587,840 578,849 569,840" fill="${palette.gold}"/>
      <polygon points="578,834 584,840 578,846 572,840" fill="${palette.magenta}"/>
      <!-- Diamond 5 (far-right) -->
      <polygon points="614,833 621,840 614,847 607,840" fill="${palette.magenta}" stroke="${palette.gold}" stroke-width="1.5"/>
    `;

    // 14. date: Cormorant Garamond 36px, fill ink, y≈910
    const dateSVG = svgFitText(v.date || 'Sunday, 22nd March 2026', {
      x: W / 2,
      y: 910,
      maxWidth: 700,
      maxSize: 36,
      fontFamily: 'Cormorant Garamond',
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // 15. time: Jost 28px, fill ink muted, y≈960
    const timeSVG = svgFitText(v.time || '10:00 AM', {
      x: W / 2,
      y: 960,
      maxWidth: 700,
      maxSize: 28,
      fontFamily: pair.body,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.8"',
    });

    // 16. venue: Cormorant Garamond 34px, fill ink, y≈1030
    const venueSVG = svgFitText(v.venue || 'Gurdwara Sahib, Amritsar', {
      x: W / 2,
      y: 1030,
      maxWidth: 680,
      maxSize: 34,
      fontFamily: 'Cormorant Garamond',
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.35,
    });

    // 17. hostedBy: Cormorant Garamond 30px, fill ink muted, y≈1160
    const hostedText = (v.hostedBy !== undefined && v.hostedBy !== null)
      ? String(v.hostedBy).trim()
      : 'The Singh & Kaur Families';

    const hostedSVG = hostedText ? `
      <g>
        <line x1="460" y1="1105" x2="510" y2="1105" stroke="${palette.gold}" stroke-width="1" opacity="0.6"/>
        <circle cx="${W / 2}" cy="1105" r="3" fill="${palette.gold}" opacity="0.6"/>
        <line x1="570" y1="1105" x2="620" y2="1105" stroke="${palette.gold}" stroke-width="1" opacity="0.6"/>
        ${svgFitText('HOSTED BY', {
          x: W / 2,
          y: 1128,
          maxWidth: 300,
          maxSize: 18,
          fontFamily: pair.body,
          fontWeight: '500',
          fill: palette.gold,
          textAnchor: 'middle',
          extraAttrs: ' letter-spacing="3"',
        })}
        ${svgFitText(hostedText, {
          x: W / 2,
          y: 1165,
          maxWidth: 700,
          maxSize: 30,
          fontFamily: 'Cormorant Garamond',
          fontWeight: '600',
          fill: palette.ink,
          textAnchor: 'middle',
          lineHeight: 1.35,
          extraAttrs: ' opacity="0.85"',
        })}
      </g>
    ` : '';

    // 18. rsvp if present, y≈1350
    const rsvpRaw = (v.rsvp !== undefined && v.rsvp !== null) ? String(v.rsvp).trim() : '';
    const rsvpFormatted = rsvpRaw ? (rsvpRaw.toUpperCase().startsWith('RSVP') ? rsvpRaw : `RSVP: ${rsvpRaw}`) : '';

    const rsvpSVG = rsvpFormatted ? svgFitText(rsvpFormatted, {
      x: W / 2,
      y: 1350,
      maxWidth: 650,
      maxSize: 24,
      fontFamily: pair.body,
      fontWeight: '500',
      fill: palette.ink,
      textAnchor: 'middle',
      extraAttrs: ' opacity="0.8" letter-spacing="1"',
    }) : '';

    return `
      ${bg}
      ${innerPanel}
      ${borderTop}
      ${borderBottom}
      ${borderLeft}
      ${borderRight}
      ${corners}
      ${innerFrame}
      ${ikOnkarSVG}
      ${waheguruSVG}
      ${eventSVG}
      ${saffronRule}
      ${groomSVG}
      ${ampersandSVG}
      ${brideSVG}
      ${diamondRow}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
    `;
  },
};
