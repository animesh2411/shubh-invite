/**
 * Muslim – Mihrab Emerald (Placeholder for Phase 1)
 *
 * Phase 1: Establishes the full data contract (fields, palette, fonts).
 * Art is a respectful colour-block placeholder with mihrab arch shape;
 * full artwork (8-point stars, arabesque, lanterns) in Phase 3.
 */

export default {
  id: 'muslim-nikah-mihrab',
  tradition: 'muslim',
  occasion: 'nikah',
  name: 'Mihrab Emerald',
  size: { w: 1080, h: 1500 },

  palette: {
    bg:      '#0F4C3A',
    ink:     '#F8F3E6',
    accent:  '#C8A24A',
    accent2: '#0B2B2E',
    paper:   '#F8F3E6',
    teal:    '#0B2B2E',
    gold:    '#C8A24A',
  },

  fonts: {
    display: 'Cormorant Garamond',
    body:    'Jost',
    script:  'Cormorant Garamond',
    native:  'Amiri',
  },

  fields: [
    {
      key: 'bismillah',
      label: 'Bismillah (optional)',
      default: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      lang: 'ar',
      multiline: false,
      optional: true,
      note: 'Please verify with your family or Imam before printing.',
    },
    {
      key: 'eventType',
      label: 'Event',
      default: 'Nikah Invitation',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'groomName',
      label: 'Groom\'s name',
      default: 'Zaid Al-Rashid',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'brideName',
      label: 'Bride\'s name',
      default: 'Aisha Khalid',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'date',
      label: 'Date',
      default: 'Friday, 20th March 2026',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'time',
      label: 'Time',
      default: 'After Jumu\'ah Prayer',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'venue',
      label: 'Venue',
      default: 'Al-Noor Grand Hall, Hyderabad',
      lang: 'en',
      multiline: false,
    },
    {
      key: 'hostedBy',
      label: 'Hosted by',
      default: 'The Al-Rashid & Khalid Families',
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

  /** Phase 1 placeholder render — emerald + gold mihrab arch with typography. */
  render(values, palette, helpers) {
    const W = 1080, H = 1500;
    const { svgText, escapeXML } = helpers;
    const v = values;

    const activePair = (this?.fontPairs || []).find((p) => p.id === v.fontPair) || (this?.fontPairs || [])[0] || {};
    const displayFont = activePair.display || this?.fonts?.display || 'Cormorant Garamond';
    const bodyFont = activePair.body || this?.fonts?.body || 'Jost';

    // ── Background ────────────────────────────────────────────
    const bg = `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`;

    // ── Subtle star tessellation (low-opacity 8-pt star grid) ─
    // Phase 1: lightweight placeholder dots suggesting the pattern
    const starBg = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => {
        const cx = col * 180 + 90;
        const cy = row * 190 + 95;
        return `<polygon points="${starPoints(cx, cy, 22, 8)}"
                         fill="${palette.gold}" opacity="0.06"/>`;
      }).join('')
    ).join('');

    // ── Outer double gold border ──────────────────────────────
    const outerBorder = `
      <rect x="36" y="36" width="${W-72}" height="${H-72}" fill="none"
            stroke="${palette.gold}" stroke-width="3" rx="2"/>
      <rect x="48" y="48" width="${W-96}" height="${H-96}" fill="none"
            stroke="${palette.gold}" stroke-width="1" rx="2"/>
    `;

    // ── Mihrab arch ───────────────────────────────────────────
    // Pointed arch centred at (W/2, ~Y), spanning from archX to archX+archW
    const archX = 120, archW = W - 240;
    const archTop = 120, archBottom = 980;
    const archMid = archTop + archW / 2; // apex y
    const archCx = W / 2;

    // Pointed arch path: bottom-left → straight up → pointed apex → straight down → bottom-right
    // Using two quarter-circle arcs from each side to the apex point
    const archPath = `
      M ${archX} ${archBottom}
      L ${archX} ${archTop + archW / 2}
      Q ${archX} ${archTop} ${archCx} ${archTop}
      Q ${archX + archW} ${archTop} ${archX + archW} ${archTop + archW / 2}
      L ${archX + archW} ${archBottom}
      Z
    `;

    const arch = `
      <!-- Mihrab fill -->
      <path d="${archPath}" fill="${palette.teal}" opacity="0.6"/>
      <!-- Mihrab double outline -->
      <path d="${archPath}" fill="none" stroke="${palette.gold}" stroke-width="4"/>
      <path d="${scaledArchPath(archX + 18, archW - 36, archTop + 18, archBottom - 18, archCx)}"
            fill="none" stroke="${palette.gold}" stroke-width="1.5" opacity="0.6"/>
    `;

    // ── Crescent + star at apex ───────────────────────────────
    const crescent = `
      <g transform="translate(${W/2}, ${archTop + 55})">
        <!-- Outer crescent circle -->
        <circle cx="0" cy="0" r="30" fill="${palette.gold}"/>
        <!-- Inner circle to cut crescent shape -->
        <circle cx="12" cy="-6" r="24" fill="${palette.teal}"/>
        <!-- Small star -->
        <polygon points="${starPoints(22, -18, 8, 5)}" fill="${palette.gold}"/>
      </g>
    `;

    // ── Hanging lanterns ──────────────────────────────────────
    const lantern = (x, y, scale = 1) => `
      <g transform="translate(${x}, ${y}) scale(${scale})">
        <line x1="0" y1="-60" x2="0" y2="0" stroke="${palette.gold}" stroke-width="2"/>
        <ellipse cx="0" cy="40" rx="20" ry="50" fill="${palette.gold}" opacity="0.8"/>
        <ellipse cx="0" cy="40" rx="14" ry="44" fill="${palette.bg}" opacity="0.5"/>
        <rect x="-20" y="0" width="40" height="8" rx="4" fill="${palette.gold}"/>
        <rect x="-14" y="80" width="28" height="8" rx="4" fill="${palette.gold}"/>
        <circle cx="0" cy="94" r="6" fill="${palette.gold}"/>
      </g>`;

    const lanterns = `
      ${lantern(archX + 60, archTop + 120, 0.8)}
      ${lantern(archX + archW - 60, archTop + 120, 0.8)}
    `;

    // ── Bismillah (RTL) ───────────────────────────────────────
    const bismillahSVG = v.bismillah ? svgText(v.bismillah, {
      x: W / 2, y: 310,
      maxWidth: W - 300, fontSize: 42,
      fontFamily: 'Amiri, serif',
      fontWeight: '700',
      fill: palette.accent,
      textAnchor: 'middle',
      direction: 'rtl',
    }) : '';

    // ── Event type ────────────────────────────────────────────
    const eventSVG = svgText(v.eventType || 'Nikah Invitation', {
      x: W / 2, y: 380,
      maxWidth: W - 300, fontSize: 30,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      letterSpacing: 6,
    });

    // ── Names ─────────────────────────────────────────────────
    const groomSVG = svgText(v.groomName || 'Zaid Al-Rashid', {
      x: W / 2, y: 560,
      maxWidth: W - 280, fontSize: 74,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const andSVG = `
      <text x="${W/2}" y="648" text-anchor="middle"
            font-family="${escapeXML(displayFont)}, serif" font-style="italic"
            font-size="48" fill="${palette.gold}">&amp;</text>
    `;

    const brideSVG = svgText(v.brideName || 'Aisha Khalid', {
      x: W / 2, y: 740,
      maxWidth: W - 280, fontSize: 74,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '700',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    // ── Gold divider ──────────────────────────────────────────
    const divider = `
      <line x1="220" y1="795" x2="${W-220}" y2="795"
            stroke="${palette.gold}" stroke-width="1"/>
      <circle cx="${W/2}" cy="795" r="4" fill="${palette.gold}"/>
    `;

    // ── Date, time, venue ─────────────────────────────────────
    const dateSVG = svgText(v.date || 'Friday, 20th March 2026', {
      x: W / 2, y: 850,
      maxWidth: W - 280, fontSize: 34,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '600',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const timeSVG = svgText(v.time || "After Jumu'ah Prayer", {
      x: W / 2, y: 900,
      maxWidth: W - 280, fontSize: 28,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    });

    const venueSVG = svgText(v.venue || 'Al-Noor Grand Hall, Hyderabad', {
      x: W / 2, y: 960,
      maxWidth: W - 280, fontSize: 32,
      fontFamily: `${displayFont}, serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
      lineHeight: 1.4,
    });

    // ── Hosted by ─────────────────────────────────────────────
    const hostedSVG = v.hostedBy ? `
      <text x="${W/2}" y="1080" text-anchor="middle"
            font-family="${escapeXML(bodyFont)}, sans-serif" font-size="22" fill="${palette.ink}" opacity="0.55">
        hosted by
      </text>
      ${svgText(v.hostedBy, {
        x: W / 2, y: 1120,
        maxWidth: W - 280, fontSize: 30,
        fontFamily: `${displayFont}, serif`,
        fontWeight: '600',
        fill: palette.ink,
        textAnchor: 'middle',
        lineHeight: 1.4,
      })}
    ` : '';

    // ── RSVP ──────────────────────────────────────────────────
    const rsvpSVG = v.rsvp ? svgText(`RSVP: ${v.rsvp}`, {
      x: W / 2, y: 1250,
      maxWidth: W - 280, fontSize: 26,
      fontFamily: `${bodyFont}, sans-serif`,
      fontWeight: '400',
      fill: palette.ink,
      textAnchor: 'middle',
    }) : '';

    // ── Bottom arabesque band ─────────────────────────────────
    const bottomBand = `
      <rect x="0" y="${H-120}" width="${W}" height="120" fill="${palette.teal}" opacity="0.6"/>
      <rect x="0" y="${H-122}" width="${W}" height="3" fill="${palette.gold}"/>
      <!-- Arabesque dots row -->
      ${Array.from({ length: 10 }, (_, i) => {
        const cx = 54 + i * 108;
        return `<polygon points="${starPoints(cx, H - 60, 20, 8)}" fill="${palette.gold}" opacity="0.5"/>`;
      }).join('')}
    `;

    return `
      ${bg}
      ${starBg}
      ${arch}
      ${crescent}
      ${lanterns}
      ${outerBorder}
      ${bismillahSVG}
      ${eventSVG}
      ${groomSVG}
      ${andSVG}
      ${brideSVG}
      ${divider}
      ${dateSVG}
      ${timeSVG}
      ${venueSVG}
      ${hostedSVG}
      ${rsvpSVG}
      ${bottomBand}
    `;
  },
};

// ── Helpers ───────────────────────────────────────────────────────

/** Generate points string for an n-pointed star centred at (cx, cy). */
function starPoints(cx, cy, r, n = 8) {
  const inner = r * 0.42;
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI / n) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : inner;
    pts.push(`${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Build a scaled-down version of the arch path for the inner stroke. */
function scaledArchPath(ax, aw, at, ab, acx) {
  return `M ${ax} ${ab}
    L ${ax} ${at + aw / 2}
    Q ${ax} ${at} ${acx} ${at}
    Q ${ax + aw} ${at} ${ax + aw} ${at + aw / 2}
    L ${ax + aw} ${ab} Z`;
}
