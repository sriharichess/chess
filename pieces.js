/* pieces.js — shared piece art for chess.html AND piece-styles.html
   Army convention:
     WHITE  = ivory body (#fff)      + charcoal line-work (#1a1a1a)
     BLACK  = obsidian body (#1c1813) + GOLD line-work (#e3ab3c)
   Gold outlines make the black army unmistakable against both square colours. */

const GOLD_LINE  = '#e3ab3c';   /* black army outline / detail */
const GOLD_BRASS = '#f4d27a';   /* brighter gold for clockwork gears */
const BLACK_FILL = '#1c1813';   /* warm obsidian body */

const invert = svg => svg
  .replaceAll('#1a1a1a', '@@GOLD@@')
  .replaceAll('#ffffff', '@@FILL@@')
  .replaceAll('#fff', '@@FILL@@')
  .replaceAll('@@GOLD@@', GOLD_LINE)
  .replaceAll('@@FILL@@', BLACK_FILL);

function staunton(fill, line, detail) {
  const wrap = inner => `<svg viewBox="0 0 45 45"><g fill="${fill}" stroke="${line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
  const det = (d, w = 1.1) => `<path d="${d}" fill="none" stroke="${detail}" stroke-width="${w}"/>`;
  const dot = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${detail}" stroke="none"/>`;
  return {
    K: wrap(
      `<path d="M22.5 4.5 V10.5 M19.5 7.5 H25.5" fill="none" stroke="${detail}" stroke-width="1.8"/>` +
      `<path d="M17.5 18 L18.5 12.5 C20 11.4 25 11.4 26.5 12.5 L27.5 18 Z"/>` +
      `<path d="M17.5 18 C12.5 19 9.5 22 9.5 25.5 C9.5 28.7 12 30.8 15 31.6 C13.6 33.8 12.7 36.2 12.3 38.5 H32.7 C32.3 36.2 31.4 33.8 30 31.6 C33 30.8 35.5 28.7 35.5 25.5 C35.5 22 32.5 19 27.5 18 Z"/>` +
      `<path d="M9 38.5 H36 V41.5 H9 Z"/>` +
      det('M15 31.6 C20 29.9 25 29.9 30 31.6 M13.2 35.8 C19.5 33.9 25.5 33.9 31.8 35.8')
    ),
    Q: wrap(
      `<circle cx="8" cy="12" r="1.8"/><circle cx="15.5" cy="9.3" r="1.8"/><circle cx="22.5" cy="8.3" r="1.8"/><circle cx="29.5" cy="9.3" r="1.8"/><circle cx="37" cy="12" r="1.8"/>` +
      `<path d="M8 13 L11 27 H34 L37 13 L31.5 22 L29.5 10.5 L25 21.5 L22.5 9.5 L20 21.5 L15.5 10.5 L13.5 22 Z"/>` +
      `<path d="M11 27 C11 29 12 30.1 13.5 30.6 C12.1 33 11.1 35.6 10.6 38.5 H34.4 C33.9 35.6 32.9 33 31.5 30.6 C33 30.1 34 29 34 27 Z"/>` +
      `<path d="M9.5 38.5 H35.5 V41.5 H9.5 Z"/>` +
      det('M13.5 30.6 H31.5 M12.3 34.8 C19 33 26 33 32.7 34.8')
    ),
    R: wrap(
      `<path d="M11.5 7.5 H16 V10.5 H20 V7.5 H25 V10.5 H29 V7.5 H33.5 V12.5 L30.5 15.5 V29.5 L33.5 32.5 V38.5 H11.5 V32.5 L14.5 29.5 V15.5 L11.5 12.5 Z"/>` +
      `<path d="M9.5 38.5 H35.5 V41.5 H9.5 Z"/>` +
      det('M14.5 15.5 H30.5 M14.5 29.5 H30.5 M11.5 32.5 H33.5')
    ),
    B: wrap(
      `<circle cx="22.5" cy="6.6" r="2.2"/>` +
      `<path d="M22.5 9.8 C26.4 11.8 28.9 15.4 28.9 19.2 C28.9 22 27.2 24.2 24.9 25.3 L20.1 25.3 C17.8 24.2 16.1 22 16.1 19.2 C16.1 15.4 18.6 11.8 22.5 9.8 Z"/>` +
      `<path d="M17.5 25.3 H27.5 L28.7 28 H16.3 Z"/>` +
      `<path d="M19 28 C19 31.3 17.5 33.9 15 35.4 L30 35.4 C27.5 33.9 26 31.3 26 28 Z"/>` +
      `<path d="M14 35.4 H31 L33 38.5 H12 Z"/>` +
      `<path d="M10.5 38.5 H34.5 V41.5 H10.5 Z"/>` +
      det('M22.5 13.4 L25.7 18.1', 1.4)
    ),
    N: wrap(
      `<path d="M19 8.5 L20.5 11 L22.5 8.8 L23.5 11.5 C27 12.5 29.5 15 30.8 19 C31.8 22.2 32.2 28 32.2 38.5 L13.8 38.5 C13.8 33 15.6 29.6 18.2 27.2 C19.8 25.7 20.6 24.3 20.9 22.6 C18.9 23.3 17.2 24.4 15.9 25.7 C14.8 26.8 13.4 27.3 12.1 26.9 C10.5 26.4 9.6 25 9.9 23.5 C10.2 22 11.2 20.7 12.2 19.3 C13.5 17.5 14.9 15.3 15.9 13.3 C16.7 11.7 17.6 9.8 19 8.5 Z"/>` +
      `<path d="M11 38.5 H34.5 V41.5 H11 Z"/>` +
      det('M23.4 12.6 C26.6 14.4 28.8 17.6 29.9 21.6') +
      dot(15.7, 17.3, 1) + dot(11.9, 23.2, 0.8)
    ),
    P: wrap(
      `<path d="M22.5 8.5 a5.2 5.2 0 0 1 2.9 9.5 c3.1 1.1 5.1 3.4 5.1 6.2 0 1.9 -0.9 3.6 -2.4 4.8 3 1.7 3.9 5.6 3.9 9.5 h-19 c0 -3.9 0.9 -7.8 3.9 -9.5 -1.5 -1.2 -2.4 -2.9 -2.4 -4.8 0 -2.8 2 -5.1 5.1 -6.2 a5.2 5.2 0 0 1 2.9 -9.5 z"/>` +
      `<path d="M11.5 38.5 H33.5 V41.5 H11.5 Z"/>` +
      det('M19.6 18.1 H25.4')
    )
  };
}

function automaton(fill, line, detail, brass) {
  const wrap = inner => `<svg viewBox="0 0 45 45"><g fill="${fill}" stroke="${line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
  const det = (d, w = 1.1) => `<path d="${d}" fill="none" stroke="${detail}" stroke-width="${w}"/>`;
  const rivet = (x, y, r = 0.9) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${detail}" stroke="none"/>`;
  const leg = (s, px, py, inner, amp = 10) => `<g class="leg" data-leg="${s}" data-px="${px}" data-py="${py}" data-amp="${amp}">${inner}</g>`;
  const gear = (cx, cy, r) => {
    let t = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, c = Math.cos(a), s = Math.sin(a);
      t += 'M' + (cx + c * r).toFixed(1) + ' ' + (cy + s * r).toFixed(1) + ' L' + (cx + c * (r + 1.7)).toFixed(1) + ' ' + (cy + s * (r + 1.7)).toFixed(1) + ' ';
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${brass}" stroke-width="1.2"/>` +
      `<path d="${t}" fill="none" stroke="${brass}" stroke-width="1.2"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.35).toFixed(1)}" fill="${brass}" stroke="none"/>`;
  };
  const base = `<path d="M11 38.5 H34 V41.5 H11 Z"/>`;
  return {
    K: wrap(
      `<circle cx="19.3" cy="5.2" r="2.1"/><circle cx="25.7" cy="5.2" r="2.1"/><path d="M22.5 7.3 V10" fill="none"/>` +
      `<path d="M16.5 16 a6 6 0 0 1 12 0 Z"/>` + det('M18.5 13.2 H26.5') +
      `<path d="M20.5 16 h4 v2 h-4 Z"/>` +
      `<path d="M15 18 H30 L31.5 30 H13.5 Z"/>` +
      rivet(16.5, 20) + rivet(28.5, 20) + rivet(15.5, 28) + rivet(29.5, 28) +
      `<circle cx="22.5" cy="23.5" r="3.4" fill="none" stroke="${brass}" stroke-width="1.2"/>` + det('M22.5 23.5 L24.6 21.6') +
      gear(22.5, 28.6, 1.6) +
      leg('l', 18.2, 30, `<path d="M16 30 h4.4 v8 H16 Z"/>` + det('M16 33.5 h4.4')) +
      leg('r', 26.8, 30, `<path d="M24.6 30 h4.4 v8 h-4.4 Z"/>` + det('M24.6 33.5 h4.4')) +
      base
    ),
    Q: wrap(
      gear(22.5, 6.5, 3.2) +
      `<circle cx="22.5" cy="13" r="3.4"/>` + det('M20.6 12.4 H24.4') +
      `<path d="M20.8 16.4 h3.4 v1.6 h-3.4 Z"/>` +
      `<path d="M17 18 H28 L29 26 H16 Z"/>` +
      `<circle cx="22.5" cy="22" r="2.4" fill="none" stroke="${brass}" stroke-width="1.1"/>` + det('M22.5 22 L23.9 20.7') +
      leg('l', 19, 26, `<path d="M16 26 L13 38.5 H22.6 V26 Z"/>` + det('M18.5 27 L16.5 37.5'), 6) +
      leg('r', 26, 26, `<path d="M22.4 26 V38.5 H32 L29 26 Z"/>` + det('M26.5 27 L28.5 37.5'), 6) +
      rivet(17.8, 19.5) + rivet(27.2, 19.5) +
      base
    ),
    R: wrap(
      `<path d="M15 6 H19 V9 H21 V6 H24 V9 H26 V6 H30 V12 H15 Z"/>` +
      `<path d="M15 12 h15 v6 H15 Z"/>` + det('M17.5 15 H27.5') +
      rivet(16.5, 13.4) + rivet(28.5, 13.4) +
      `<path d="M14 18 H31 L32 30 H13 Z"/>` + gear(22.5, 24, 3) +
      rivet(15.5, 20) + rivet(29.5, 20) +
      leg('l', 18, 30, `<path d="M15.5 30 h5 v8 h-5 Z"/>` + det('M15.5 34 h5')) +
      leg('r', 27, 30, `<path d="M24.5 30 h5 v8 h-5 Z"/>` + det('M24.5 34 h5')) +
      base
    ),
    B: wrap(
      `<path d="M22.5 3 L27 10 L22.5 12.5 L18 10 Z"/>` + det('M22.5 5.2 V10') +
      `<circle cx="22.5" cy="15" r="3"/>` +
      leg('l', 20, 18, `<path d="M17.5 18 H22.6 V38.5 H15 Z"/>` + det('M16.5 35 H22.5'), 6) +
      leg('r', 25, 18, `<path d="M22.4 18 H27.5 L30 38.5 H22.4 Z"/>` + det('M22.5 35 H28.5'), 6) +
      det('M22.5 18 V38') +
      gear(22.5, 25, 2.4) + rivet(19, 20) + rivet(26, 20) +
      base
    ),
    N: wrap(
      `<path d="M19 8 L21 11 L23 8.5 L24 12 C27.5 13 30 16 31 20 C31.8 24 32 30 32 38.5 L14 38.5 C14 32 15.5 28.5 18 26 C19.5 24.5 20.5 23 20.8 21.5 C18.8 22.2 17 23.3 15.7 24.6 C14 26 12 25.5 11.5 23.8 C11 22 12.5 20 14 18 C15.5 15.5 17.5 11 19 8 Z"/>` +
      rivet(16.2, 17.5, 1.1) +
      `<path d="M24 13 L27.5 11 M25 16 L29 14" fill="none" stroke="${brass}" stroke-width="1.2"/>` +
      gear(26, 25, 2) + det('M23.5 13.5 C26.5 15.5 28.5 18.5 29.5 22') +
      base
    ),
    P: wrap(
      `<path d="M22.5 6 L27 8.5 V13.5 L22.5 16 L18 13.5 V8.5 Z"/>` +
      `<circle cx="22.5" cy="11" r="1.6" fill="none" stroke="${brass}" stroke-width="1.1"/>` +
      `<path d="M17.5 16 H27.5 L28.5 26 H16.5 Z"/>` +
      `<circle cx="22.5" cy="21" r="1.8" fill="none" stroke="${brass}" stroke-width="1.1"/>` +
      rivet(18.5, 18) + rivet(26.5, 18) +
      leg('l', 19.5, 26, `<path d="M16.5 26 L15 38.5 H22.6 V26 Z"/>` + det('M20 27 L19 37.5'), 6) +
      leg('r', 25.5, 26, `<path d="M22.4 26 V38.5 H30 L28.5 26 Z"/>` + det('M25 27 L26 37.5'), 6) +
      base
    )
  };
}

const PIECE_SETS = {
  set1: {
    name: 'Set 1 - Classic Chess',
    desc: 'Traditional Staunton-style pieces: ivory against gold-inlaid obsidian',
    pieces: (() => {
      const w = staunton('#ffffff', '#1a1a1a', '#1a1a1a');
      const b = staunton('#332e26', GOLD_LINE, GOLD_LINE);
      const o = {};
      ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(p => { o['w' + p] = w[p]; o['b' + p] = b[p]; });
      return o;
    })()
  },

  set2: {
    name: 'Set 2 - The Royal Court',
    desc: 'Marble champions — the Monarch, the Battlemage, the Mystic, the Lancer, the Fortress and the Vanguard',
    pieces: ((o = {}) => {
      const W = o.weight ?? 0.7;
      const SH = o.shade !== false;
      const dw = w => +(w * W / 0.7).toFixed(3);
      const ln = (d, w = 0.45) => `<path d="${d}" fill="none" stroke="#1a1a1a" stroke-width="${dw(w)}"/>`;
      const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1a1a1a" stroke="none"/>`;
      const ring = (x, y, r, w = 0.45) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#1a1a1a" stroke-width="${dw(w)}"/>`;
      const sh = (d, a = 0.09) => SH ? `<path d="${d}" fill="#1a1a1a" fill-opacity="${a}" stroke="none"/>` : '';
      const neck = (a, b) => `<path d="M15.1 ${a} h1.8 v${+(b - a).toFixed(2)} h-1.8 Z"/>`;
      const wpn = (kind, px, py, inner) => `<g class="wpn" data-wpn="${kind}" data-px="${px}" data-py="${py}">${inner}</g>`;
      const leg = (s, px, py, inner, amp = 16) => `<g class="leg" data-leg="${s}" data-px="${px}" data-py="${py}" data-amp="${amp}">${inner}</g>`;
      /* no podium: figures stand on the square itself, re-framed to fill it */
      const fig = inner => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34"><g fill="#fff" stroke="#1a1a1a" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(16 0) scale(1.16) translate(-16 0)">${inner}</g></g></svg>`;
      return {
        wK: fig(
          neck(8.7, 10.0) +
          `<circle cx="23.1" cy="13.9" r="1.6"/>` + ln('M21.5 13.9 H24.7', 0.35) + ln('M23.1 11.5 V12.3 M22.65 11.9 H23.55', 0.4) +
          leg('l', 14.2, 19.4, `<path d="M13.2 19.4 L15.2 19.4 L15.0 26.4 L13.4 26.4 Z"/><circle cx="14.2" cy="22.6" r="0.7"/><path d="M13.4 26.4 L15.0 26.4 L15.0 27.0 L12.6 27.0 Q12.6 26.6 13.4 26.4 Z"/>`) +
          leg('r', 17.8, 19.4, `<path d="M16.8 19.4 L18.8 19.4 L18.6 26.4 L17.0 26.4 Z"/><circle cx="17.8" cy="22.6" r="0.7"/><path d="M17.0 26.4 L18.6 26.4 Q19.4 26.6 19.4 27.0 L17.0 27.0 Z"/>`) +
          `<path d="M13.0 16.6 L19.0 16.6 L19.6 19.4 L12.4 19.4 Z"/>` + ln('M14 17.2 v0.6 M16 17.2 v0.6 M18 17.2 v0.6 M15 18.2 v0.6 M17 18.2 v0.6', 0.3) +
          `<path d="M12.2 9.6 L19.8 9.6 L19.2 15.6 L12.8 15.6 Z"/>` + ln('M16 10.1 V15.3', 0.35) + ln('M13.4 11.2 L16 12.4 L18.6 11.2', 0.4) +
          `<rect x="12.8" y="15.6" width="6.4" height="1.0"/>` + dot(16, 16.1, 0.32) +
          `<circle cx="11.7" cy="10.3" r="1.7"/><circle cx="20.3" cy="10.3" r="1.7"/>` + ln('M10.4 10.9 Q11.7 11.6 13.0 10.9 M19.0 10.9 Q20.3 11.6 21.6 10.9', 0.3) +
          `<path d="M12.6 10.4 Q10.8 10.9 9.9 12.0 L10.9 13.1 Q11.9 12.3 13.0 12.1 Z"/><path d="M19.4 10.4 Q21.6 11.0 22.6 12.6 L21.6 13.5 Q20.6 12.4 19.0 12.1 Z"/>` +
          `<circle cx="22.3" cy="12.9" r="0.8"/>` +
          wpn('sword', 9.8, 12.5,
            `<path d="M9.8 0.4 L10.7 2.1 L10.7 10.4 L8.9 10.4 L8.9 2.1 Z"/>` + ln('M9.8 2.6 V10.1', 0.3) +
            `<rect x="7.7" y="10.4" width="4.2" height="0.9" rx="0.3"/><rect x="9.35" y="11.3" width="0.9" height="2.1"/><circle cx="9.8" cy="13.8" r="0.6"/>` +
            `<circle cx="10.0" cy="12.5" r="0.8"/>`) +
          `<circle cx="16" cy="6.5" r="2.5"/>` +
          `<path d="M13.5 4.6 L13.9 2.9 L15.0 4.1 L16 2.6 L17.0 4.1 L18.1 2.9 L18.5 4.6 Z"/><rect x="13.5" y="4.6" width="5.0" height="0.8"/>` +
          ln('M16 1.0 V2.4 M15.3 1.7 H16.7', 0.45) + dot(16, 5.0, 0.28) + dot(14.3, 5.0, 0.2) + dot(17.7, 5.0, 0.2) +
          dot(15.15, 6.4, 0.26) + dot(16.85, 6.4, 0.26) + ln('M15.4 7.7 Q16 8.0 16.6 7.7', 0.3) +
          sh('M17.6 9.6 L19.8 9.6 L19.2 15.6 L17.2 15.6 Z') + sh('M16 4.0 A2.5 2.5 0 0 1 16 9.0 Q17.7 6.5 16 4.0 Z', 0.06)
        ),
        wQ: fig(
          neck(8.6, 10.1) +
          `<path d="M13.7 5.8 Q13.1 8.6 13.9 10.8 L14.7 10.3 Q14.1 8.4 14.4 6.3 Z"/><path d="M18.3 5.8 Q18.9 8.6 18.1 10.8 L17.3 10.3 Q17.9 8.4 17.6 6.3 Z"/>` +
          leg('l', 14.9, 14.2, `<path d="M13.8 14.2 L16.05 14.2 L16.05 26.6 L11.4 26.6 Z"/>` + ln('M14.7 15.2 L13.3 26.0 M11.9 25.7 L16 25.7', 0.35), 7) +
          leg('r', 17.1, 14.2, `<path d="M15.95 14.2 L18.2 14.2 L20.6 26.6 L15.95 26.6 Z"/>` + ln('M17.3 15.2 L18.7 26.0 M16 25.7 L20.1 25.7', 0.35), 7) +
          `<path d="M13.2 9.9 L18.8 9.9 L18.2 14.2 L13.8 14.2 Z"/>` + ln('M13.9 11.2 Q15.0 12.2 16 11.4 Q17.0 12.2 18.1 11.2', 0.35) + dot(16, 13.9, 0.28) +
          `<path d="M10.6 10.6 Q11.9 9.0 13.4 9.7 L13.0 11.4 Q11.8 11.0 10.9 11.6 Z"/><path d="M21.4 10.6 Q20.1 9.0 18.6 9.7 L19.0 11.4 Q20.2 11.0 21.1 11.6 Z"/>` + ln('M10.8 11.9 Q11.9 11.3 12.9 11.7 M21.2 11.9 Q20.1 11.3 19.1 11.7', 0.3) +
          `<path d="M12.9 10.4 Q13.4 11.9 14.9 12.0 L15.1 10.9 Q14.0 10.8 13.7 9.9 Z"/><path d="M19.1 10.4 Q18.6 11.9 17.1 12.0 L16.9 10.9 Q18.0 10.8 18.3 9.9 Z"/>` +
          wpn('gsword', 16, 11.6,
            `<circle cx="16" cy="10.7" r="0.75"/><rect x="15.55" y="11.4" width="0.9" height="2.0"/><rect x="13.7" y="13.4" width="4.6" height="0.9" rx="0.3"/><path d="M15.35 14.3 L16.65 14.3 L16.35 25.4 L16 26.7 L15.65 25.4 Z"/>` + ln('M16 14.7 V25.0', 0.3) +
            `<ellipse cx="15.5" cy="11.5" rx="0.75" ry="0.6"/><ellipse cx="16.5" cy="11.9" rx="0.75" ry="0.6"/>`) +
          `<circle cx="16" cy="6.6" r="2.3"/>` +
          `<path d="M13.9 4.9 L14.3 3.1 L15.2 4.4 L16 2.7 L16.8 4.4 L17.7 3.1 L18.1 4.9 Z"/><rect x="13.9" y="4.9" width="4.2" height="0.7"/>` +
          dot(14.3, 3.0, 0.28) + dot(16, 2.6, 0.3) + dot(17.7, 3.0, 0.28) + dot(16, 5.25, 0.24) +
          dot(15.25, 6.5, 0.24) + dot(16.75, 6.5, 0.24) + ln('M15.5 7.8 Q16 8.05 16.5 7.8', 0.28) +
          sh('M17.0 9.9 L18.8 9.9 L18.2 14.2 L16.8 14.2 Z', 0.06)
        ),
        wR: fig(
          neck(9.3, 10.6) +
          leg('l', 13.85, 19.8, `<path d="M12.9 19.8 L14.8 19.8 L14.5 26.4 L13.0 26.4 Z"/><circle cx="13.8" cy="22.8" r="0.6"/><path d="M13.0 26.4 L14.5 26.4 L14.5 27.0 L12.1 27.0 Q12.1 26.6 13.0 26.4 Z"/>`) +
          leg('r', 18.15, 19.8, `<path d="M17.2 19.8 L19.1 19.8 L19.0 26.4 L17.5 26.4 Z"/><circle cx="18.2" cy="22.8" r="0.6"/><path d="M17.5 26.4 L19.0 26.4 Q19.9 26.6 19.9 27.0 L17.5 27.0 Z"/>`) +
          `<path d="M13.0 17.3 L19.0 17.3 L19.5 19.8 L12.5 19.8 Z"/>` + ln('M14 17.9 v0.5 M16 17.9 v0.5 M18 17.9 v0.5 M15 18.8 v0.5 M17 18.8 v0.5', 0.28) +
          `<path d="M12.4 10.4 L19.6 10.4 L19.2 16.4 L12.8 16.4 Z"/>` + ln('M13.4 11.6 Q16 12.6 18.6 11.6', 0.35) + ln('M16 10.8 V12.9', 0.3) +
          `<rect x="12.8" y="16.4" width="6.4" height="0.9"/>` + dot(16, 16.85, 0.3) +
          `<path d="M9.9 11.3 Q10.6 9.2 13.0 9.8 L12.7 11.6 Q11.2 11.2 10.4 12.4 Z"/><path d="M22.1 11.3 Q21.4 9.2 19.0 9.8 L19.3 11.6 Q20.8 11.2 21.6 12.4 Z"/><path d="M10.2 12.6 Q11.0 11.6 12.6 11.9 L12.4 13.2 Q11.3 13.0 10.7 13.7 Z"/><path d="M21.8 12.6 Q21.0 11.6 19.4 11.9 L19.6 13.2 Q20.7 13.0 21.3 13.7 Z"/>` +
          `<path d="M12.6 11.2 Q13.4 12.6 15.2 12.9 L15.4 11.6 Q14.0 11.4 13.4 10.6 Z"/><path d="M19.4 11.2 Q18.6 12.6 16.8 12.9 L16.6 11.6 Q18.0 11.4 18.6 10.6 Z"/>` +
          wpn('hammer', 16, 12.4,
            `<rect x="15.6" y="12.9" width="0.8" height="11.5"/>` + ln('M15.6 14.3 h0.8 M15.6 15.7 h0.8', 0.28) +
            `<path d="M12.7 24.3 L19.3 24.3 L19.7 24.9 L19.7 26.9 L12.3 26.9 L12.3 24.9 Z"/>` + ln('M12.3 25.2 H19.7', 0.3) + ln('M13.4 24.3 V26.9 M18.6 24.3 V26.9', 0.3) +
            `<ellipse cx="15.3" cy="12.4" rx="0.8" ry="0.65"/><ellipse cx="16.7" cy="12.4" rx="0.8" ry="0.65"/>`) +
          `<path d="M13.3 9.0 L13.3 3.0 L14.5 3.0 L14.5 4.1 L15.4 4.1 L15.4 3.0 L16.6 3.0 L16.6 4.1 L17.5 4.1 L17.5 3.0 L18.7 3.0 L18.7 9.0 Q16 10.0 13.3 9.0 Z"/>` +
          ln('M14.1 6.0 H17.9', 0.45) + ln('M13.9 7.0 H18.1 M13.9 7.9 H18.1 M14.7 7.0 V7.9 M16 7.0 V7.9 M17.3 7.0 V7.9', 0.28) +
          sh('M17.4 10.4 L19.6 10.4 L19.2 16.4 L17.1 16.4 Z') + sh('M16 3.0 L18.7 3.0 L18.7 9.0 Q17.4 9.6 16 9.7 Z', 0.06) + sh('M16.4 24.3 L19.3 24.3 L19.7 24.9 L19.7 26.9 L16.4 26.9 Z', 0.08)
        ),
        wB: fig(
          neck(9.6, 11.4) +
          leg('l', 14.3, 11.2, `<path d="M12.6 11.2 L16.05 11.2 L16.05 26.6 L11.0 26.6 Z"/>` + ln('M11.5 25.8 L16 25.8 M14.9 12.8 L14.5 26.1', 0.35), 7) +
          leg('r', 17.7, 11.2, `<path d="M15.95 11.2 L19.4 11.2 L21.0 26.6 L15.95 26.6 Z"/>` + ln('M16 25.8 L20.5 25.8 M17.1 12.8 L17.5 26.1', 0.35), 7) +
          ln('M16 14.6 l0.55 0.75 l-0.55 0.75 l-0.55 -0.75 Z M16 18.1 l0.55 0.75 l-0.55 0.75 l-0.55 -0.75 Z M16 21.6 l0.55 0.75 l-0.55 0.75 l-0.55 -0.75 Z', 0.3) + ln('M16 24.2 v1.5 M15.35 24.85 h1.3', 0.35) +
          `<path d="M12.0 11.0 Q16 9.6 20.0 11.0 L20.6 14.2 Q16 13.0 11.4 14.2 Z"/>` + ln('M11.7 13.4 Q16 12.3 20.3 13.4', 0.3) +
          `<circle cx="13.4" cy="11.9" r="0.65"/><circle cx="18.6" cy="11.9" r="0.65"/>` + dot(13.4, 11.9, 0.2) + dot(18.6, 11.9, 0.2) +
          `<path d="M12.8 11.4 Q11.4 11.8 10.7 12.6 L11.5 13.6 Q12.3 12.8 13.2 12.6 Z"/><path d="M19.2 11.6 Q20.4 13.0 20.5 15.2 L19.4 15.4 Q19.2 13.6 18.6 12.6 Z"/>` +
          `<circle cx="19.9" cy="15.9" r="0.7"/>` +
          wpn('staff', 10.4, 13.1,
            `<rect x="10.05" y="4.5" width="0.7" height="22.1"/>` + ln('M10.05 8 l0.7 0.6 M10.05 12 l0.7 0.6 M10.05 16 l0.7 0.6 M10.05 20 l0.7 0.6 M10.05 24 l0.7 0.6', 0.28) +
            `<path d="M10.4 0.9 L11.7 2.7 L10.4 4.5 L9.1 2.7 Z"/>` + ln('M9.1 2.7 H11.7 M10.4 0.9 V4.5', 0.28) + ln('M9.4 4.9 Q8.5 3.5 9.2 2.1 M11.4 4.9 Q12.3 3.5 11.6 2.1', 0.4) + ln('M12.7 1.1 v0.8 M12.3 1.5 h0.8', 0.3) +
            `<circle cx="10.4" cy="13.1" r="0.8"/>`) +
          `<circle cx="16" cy="8.0" r="2.1"/>` +
          `<path d="M13.8 6.0 Q14.3 2.7 16 0.9 Q17.7 2.7 18.2 6.0 Z"/><path d="M13.8 5.6 H18.2 V6.4 H13.8 Z"/>` + ln('M16 2.6 L16.7 3.6 L16 4.6 L15.3 3.6 Z', 0.32) + ln('M16 4.6 V5.6', 0.3) +
          dot(15.3, 7.9, 0.24) + dot(16.7, 7.9, 0.24) + ln('M15.55 9.0 Q16 9.2 16.45 9.0', 0.28) +
          sh('M16 10.0 Q18.4 10.2 20.0 11.0 L20.6 14.2 Q18.4 13.5 16 13.4 Z', 0.06)
        ),
        wN: fig(
          neck(9.2, 10.4) +
          `<path d="M20.9 16.2 L21.9 16.0 L22.9 21.6 L22.1 21.9 Z"/><path d="M20.9 14.9 L21.7 14.75 L21.95 16.0 L21.15 16.15 Z"/>` + ln('M20.4 16.35 L22.5 15.95', 0.45) + dot(21.3, 14.6, 0.26) +
          leg('l', 14.35, 19.2, `<path d="M13.4 19.2 L15.3 19.2 L15.1 26.4 L13.6 26.4 Z"/><circle cx="14.35" cy="22.5" r="0.65"/><path d="M13.6 26.4 L15.1 26.4 L15.1 27.0 L12.8 27.0 Q12.8 26.6 13.6 26.4 Z"/>`) +
          leg('r', 17.65, 19.2, `<path d="M16.7 19.2 L18.6 19.2 L18.4 26.4 L16.9 26.4 Z"/><circle cx="17.65" cy="22.5" r="0.65"/><path d="M16.9 26.4 L18.4 26.4 Q19.2 26.6 19.2 27.0 L16.9 27.0 Z"/>`) +
          `<path d="M13.2 16.7 L18.8 16.7 L19.3 19.2 L12.7 19.2 Z"/>` + ln('M13.0 17.6 H19.0 M12.9 18.4 H19.1', 0.3) +
          `<path d="M12.6 10.2 L19.4 10.2 L18.9 15.8 L13.1 15.8 Z"/>` + ln('M16 10.6 V15.4', 0.32) + ln('M13.4 12.0 Q16 13.2 18.6 12.0', 0.35) +
          `<rect x="13.1" y="15.8" width="5.8" height="0.9"/>` + dot(16, 16.25, 0.28) +
          `<circle cx="12.0" cy="10.8" r="1.6"/><circle cx="20.0" cy="10.8" r="1.6"/>` +
          `<path d="M12.8 10.9 Q11.2 11.6 10.3 13.0 L11.2 14.0 Q12.0 12.9 13.2 12.5 Z"/><path d="M19.2 10.9 Q20.6 12.2 20.9 14.4 L19.8 14.8 Q19.5 13.0 18.7 12.3 Z"/>` +
          `<circle cx="20.3" cy="15.2" r="0.75"/>` +
          wpn('lance', 10, 14.4,
            `<path d="M10.0 0.3 L10.7 2.3 L9.3 2.3 Z"/><rect x="9.7" y="2.3" width="0.6" height="24.3"/><path d="M10.0 9.8 L12.2 13.4 L7.8 13.4 Z"/>` + ln('M8.5 12.5 L11.5 12.5', 0.28) + ln('M9.7 15.4 h0.6 M9.7 16.6 h0.6', 0.28) +
            `<circle cx="10.0" cy="14.4" r="0.8"/>`) +
          `<path d="M13.7 4.6 Q16 2.9 18.3 4.6 L18.3 8.9 Q16 9.9 13.7 8.9 Z"/>` + ln('M14.2 5.7 H17.8', 0.42) + ln('M14.8 6.3 V7.9 M16 6.3 V8.1 M17.2 6.3 V7.9', 0.35) + dot(14.15, 5.0, 0.18) + dot(17.85, 5.0, 0.18) + ln('M16 3.2 V4.3', 0.3) +
          sh('M17.2 10.2 L19.4 10.2 L18.9 15.8 L16.9 15.8 Z') + sh('M16 3.3 Q17.6 3.6 18.3 4.6 L18.3 8.9 Q17.2 9.4 16 9.5 Z', 0.06)
        ),
        wP: fig(
          neck(9.3, 10.2) +
          leg('l', 14.55, 15.4, `<path d="M13.7 15.4 L15.4 15.4 L15.2 26.4 L13.9 26.4 Z"/>` + ln('M14.2 21.5 h0.9', 0.28) + `<path d="M13.9 26.4 L15.2 26.4 L15.2 27.0 L13.0 27.0 Q13.0 26.6 13.9 26.4 Z"/>`) +
          leg('r', 17.45, 15.4, `<path d="M16.6 15.4 L18.3 15.4 L18.1 26.4 L16.8 26.4 Z"/>` + ln('M17.0 21.5 h0.9', 0.28) + `<path d="M16.8 26.4 L18.1 26.4 Q19.0 26.6 19.0 27.0 L16.8 27.0 Z"/>`) +
          `<path d="M13.2 10.0 L18.8 10.0 L18.5 15.4 L13.5 15.4 Z"/>` + ln('M14.4 10.5 V14.9 M16 10.5 V14.9 M17.6 10.5 V14.9', 0.26) + ln('M14.6 10.0 Q16 10.8 17.4 10.0', 0.3) +
          `<rect x="13.5" y="14.4" width="5.0" height="0.8"/>` + dot(16, 14.8, 0.26) +
          `<rect x="18.2" y="15.2" width="1.7" height="1.9" rx="0.3"/>` + ln('M18.2 15.9 h1.7', 0.26) +
          `<path d="M13.4 10.6 Q12.0 12.4 11.6 14.8 L12.7 15.1 Q13.1 13.0 14.0 11.9 Z"/><path d="M18.6 10.6 Q20.2 11.2 21.0 12.4 L20.0 13.2 Q19.3 12.2 18.2 11.9 Z"/>` +
          wpn('dagger', 11.6, 15.5,
            `<path d="M11.3 16.2 L12.2 16.7 L8.9 20.6 L7.7 21.0 L8.1 19.8 Z"/>` + ln('M10.7 15.9 L12.6 17.0', 0.45) + `<circle cx="11.6" cy="15.5" r="0.75"/>`) +
          wpn('shield', 21.7, 14.2,
            `<circle cx="21.7" cy="14.2" r="3.5"/>` + ring(21.7, 14.2, 2.9, 0.35) + `<circle cx="21.7" cy="14.2" r="1.05"/>` + dot(21.7, 14.2, 0.3) +
            dot(21.7, 11.7, 0.18) + dot(21.7, 16.7, 0.18) + dot(19.2, 14.2, 0.18) + dot(24.2, 14.2, 0.18)) +
          `<circle cx="16" cy="7.6" r="2.0"/>` +
          `<path d="M13.6 5.5 Q13.8 3.2 16 3.0 Q18.2 3.2 18.4 5.5 Z"/><path d="M11.9 5.5 Q16 4.7 20.1 5.5 L20.1 6.1 Q16 5.3 11.9 6.1 Z"/>` + ln('M16 3.0 V2.3', 0.4) + dot(16, 2.15, 0.24) +
          dot(15.3, 7.5, 0.24) + dot(16.7, 7.5, 0.24) + ln('M15.55 8.6 Q16 8.85 16.45 8.6', 0.28) +
          sh('M17.2 10.0 L18.8 10.0 L18.5 15.4 L17.0 15.4 Z') + sh('M21.7 10.7 A3.5 3.5 0 0 1 21.7 17.7 Q24.0 14.2 21.7 10.7 Z', 0.07)
        )
      };
    })()
  },

  set3: {
    name: 'Set 3 - Clockwork Automata',
    desc: 'Brass-geared machine pieces: wind-up king, gear-crowned queen, chimney rook, piston bishop, iron horse and bolt pawn',
    pieces: (() => {
      const w = automaton('#fff', '#1a1a1a', '#1a1a1a', '#c9971f');
      const b = automaton('#332e26', GOLD_LINE, GOLD_LINE, GOLD_BRASS);
      const o = {};
      ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(p => { o['w' + p] = w[p]; o['b' + p] = b[p]; });
      return o;
    })()
  },

  set4: {
    name: 'Set 4 - Modern Humanoid',
    desc: 'Sleek contemporary figures with geometric symbols',
    pieces: {
      wK: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M14 4 L14 2 M18 4 L18 2 M16 3 L16 1" stroke="#1a1a1a" stroke-width="1.5"/><rect x="14" y="1" width="4" height="2" fill="#1a1a1a"/></svg>`,
      wQ: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 4 L14 6 L16 3 L18 6 L19 4" fill="none" stroke="#1a1a1a" stroke-width="1"/><circle cx="16" cy="2" r="1" fill="#1a1a1a"/><circle cx="16" cy="15" r="2" fill="none" stroke="#1a1a1a" stroke-width="1"/></svg>`,
      wR: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><rect x="14" y="3" width="4" height="3" fill="none" stroke="#1a1a1a" stroke-width="1"/><path d="M14 3 L14 1 M18 3 L18 1 M15 3 L15 1 M17 3 L17 1" stroke="#1a1a1a" stroke-width="1"/><rect x="14" y="13" width="4" height="4" fill="none" stroke="#1a1a1a" stroke-width="1"/></svg>`,
      wB: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 4 L16 1 L19 4 L16 5 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><line x1="16" y1="1" x2="16" y2="5" stroke="#1a1a1a" stroke-width="0.5"/><path d="M14 12 L18 16 M18 12 L14 16" stroke="#1a1a1a" stroke-width="1"/></svg>`,
      wN: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M14 12 L18 12 L18 16 L16 17 L14 16 Z" fill="none" stroke="#1a1a1a" stroke-width="1"/><circle cx="16" cy="13.5" r="0.8" fill="#1a1a1a"/></svg>`,
      wP: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="1"/><circle cx="16" cy="14" r="2" fill="none" stroke="#1a1a1a" stroke-width="1"/></svg>`
    }
  },

  set5: {
    name: 'Set 5 - Norse Gods',
    desc: 'Odin, Freya, Thor, Loki, Sleipnir-rider, Einherjar warriors',
    pieces: {
      wK: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 4 L14 2 M18 4 L18 2 M16 3 L16 1" stroke="#1a1a1a" stroke-width="1"/><rect x="14" y="1" width="4" height="2" fill="#1a1a1a"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 12 L8 10 L9 13 Z" fill="#1a1a1a"/><path d="M22 12 L24 10 L23 13 Z" fill="#1a1a1a"/><path d="M14 12 L18 12 L18 16 L16 17 L14 16 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="15" cy="6" r="0.5" fill="#1a1a1a"/><line x1="17" y1="5" x2="17" y2="7" stroke="#1a1a1a" stroke-width="0.5"/></svg>`,
      wQ: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 4 L14 6 L16 3 L18 6 L19 4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="2" r="1" fill="#1a1a1a"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 12 L6 9 L8 14 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M22 12 L26 9 L24 14 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="1.5" fill="#1a1a1a"/></svg>`,
      wR: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 11 L18 11 L19 14 L17 14 L17 16 L15 16 L15 14 L13 14 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 4 L14 2 M18 4 L18 2 M15 4 L15 2 M17 4 L17 2" stroke="#1a1a1a" stroke-width="0.8"/><rect x="14" y="1" width="4" height="2" fill="#1a1a1a"/></svg>`,
      wB: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 4 L16 1 L19 4 L16 5 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 14 Q8 16 10 18 Q12 16 10 14" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><path d="M22 14 Q24 16 22 18 Q20 16 22 14" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="1" fill="#1a1a1a"/><path d="M15 13 L17 13 L16 15 Z" fill="#1a1a1a"/></svg>`,
      wN: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 11 L18 11 L19 15 L17 16 L15 16 L13 15 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="13" r="0.8" fill="#1a1a1a"/><path d="M15 12 L17 12" stroke="#1a1a1a" stroke-width="0.5"/><path d="M14 4 L16 2 L18 4" fill="none" stroke="#1a1a1a" stroke-width="0.8"/></svg>`,
      wP: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="2" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><line x1="16" y1="12" x2="16" y2="16" stroke="#1a1a1a" stroke-width="0.5"/><line x1="14" y1="14" x2="14" y2="16" stroke="#1a1a1a" stroke-width="0.5"/></svg>`
    }
  }
};

/* articulate the humanoid sets' legs (runs before invert so black armies walk too) */
const LEGS45 = w =>
  `<g class="leg" data-leg="l" data-px="13.5" data-py="20" data-amp="14"><path d="M12 20 L10 30 L14 30 L15 22 Z" fill="#fff" stroke="#1a1a1a" stroke-width="${w}"/></g>` +
  `<g class="leg" data-leg="r" data-px="18.5" data-py="20" data-amp="14"><path d="M17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="${w}"/></g>`;
['set4', 'set5'].forEach(id => {
  const ps = PIECE_SETS[id].pieces;
  ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(p => {
    ps['w' + p] = ps['w' + p].replace(
      /<path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="([\d.]+)"\/>/,
      (m, w) => LEGS45(w));
  });
});

/* black armies: obsidian bodies, gold line-work */
['set2', 'set4', 'set5'].forEach(id => {
  const ps = PIECE_SETS[id].pieces;
  ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(p => { ps['b' + p] = invert(ps['w' + p]); });
});

const STORAGE_KEY = 'selectedChessTheme';
function getSavedSetId() {
  try { const v = localStorage.getItem(STORAGE_KEY); return PIECE_SETS[v] ? v : 'set1'; }
  catch (e) { return 'set1'; }
}
function saveSetId(id) {
  try { localStorage.setItem(STORAGE_KEY, id); } catch (e) { /* storage blocked */ }
}
function getPieceSVGs(id) { return PIECE_SETS[id || getSavedSetId()].pieces; }