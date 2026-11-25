/* pieces.js — shared piece art for chess.html AND piece-styles.html */

const invert = svg => svg
  .replaceAll('#fff', '__INV__')
  .replaceAll('#1a1a1a', '#fff')
  .replaceAll('__INV__', '#1a1a1a');

function staunton(fill, line, detail) {
  const wrap = inner =>
    `<svg viewBox="0 0 45 45"><g fill="${fill}" stroke="${line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
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

const PIECE_SETS = {
  set1: {
    name: 'Set 1 - Classic Chess',
    desc: 'Traditional Staunton-style pieces: white and charcoal, just like a classic board',
    pieces: (() => {
      const w = staunton('#ffffff', '#1a1a1a', '#1a1a1a');
      const b = staunton('#575757', '#161616', '#f5f5f5');
      const o = {};
      ['K', 'Q', 'R', 'B', 'N', 'P'].forEach(p => { o['w' + p] = w[p]; o['b' + p] = b[p]; });
      return o;
    })()
  },
  set2: {
    name: 'Set 2 - Mythical Creatures',
    desc: 'Mythological beings: dragons, phoenixes, golems, serpents, centaurs, goblins',
    pieces: {
      wK: `<svg viewBox="-1 -1 34 34"><path d="M13 5 Q16 2 19 5 Q21 7 20 9 L18 10 L16 8 L14 10 L12 9 Q11 7 13 5 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 3 L14 1 M18 3 L18 1 M16 2 L16 0" stroke="#1a1a1a" stroke-width="1"/><circle cx="15" cy="6" r="0.8" fill="#1a1a1a"/><circle cx="17" cy="6" r="0.8" fill="#1a1a1a"/><path d="M13 10 L19 10 L21 20 L11 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M11 20 L9 30 L13 30 L14 22 L18 22 L19 30 L23 30 L21 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 14 L8 12 M22 14 L24 12" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 14 L18 14 L18 18 L16 19 L14 18 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><path d="M15 15 L17 15 M15 17 L17 17" stroke="#1a1a1a" stroke-width="0.5"/></svg>`,
      wQ: `<svg viewBox="-1 -1 34 34"><circle cx="16" cy="5" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 3 L14 5 L16 2 L18 5 L19 3" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="1" r="1" fill="#1a1a1a"/><path d="M13 8 L19 8 L20 18 L12 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 18 L10 28 L14 28 L15 20 L17 20 L18 28 L22 28 L20 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 12 L6 8 L8 14 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M22 12 L26 8 L24 14 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="1.5" fill="#1a1a1a"/></svg>`,
      wR: `<svg viewBox="-1 -1 34 34"><rect x="13" y="3" width="6" height="5" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 3 L13 1 M19 3 L19 1 M15 3 L15 1 M17 3 L17 1" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="15" cy="5" r="0.6" fill="#1a1a1a"/><circle cx="17" cy="5" r="0.6" fill="#1a1a1a"/><path d="M12 8 L20 8 L22 20 L10 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 20 L8 30 L14 30 L15 22 L17 22 L18 30 L24 30 L22 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><rect x="13" y="12" width="6" height="5" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><line x1="16" y1="12" x2="16" y2="17" stroke="#1a1a1a" stroke-width="0.5"/><line x1="13" y1="14" x2="19" y2="14" stroke="#1a1a1a" stroke-width="0.5"/></svg>`,
      wB: `<svg viewBox="-1 -1 34 34"><circle cx="16" cy="5" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 3 L16 0 L19 3 L16 4 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 8 L19 8 L20 18 L12 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 18 L10 28 L14 28 L15 20 L17 20 L18 28 L22 28 L20 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M10 14 Q8 16 10 18 Q12 16 10 14" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><path d="M22 14 Q24 16 22 18 Q20 16 22 14" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="1" fill="#1a1a1a"/><path d="M15 13 L17 13 L16 15 Z" fill="#1a1a1a"/></svg>`,
      wN: `<svg viewBox="-1 -1 34 34"><circle cx="16" cy="5" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 8 L19 8 L20 18 L12 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 18 L10 28 L14 28 L15 20 L17 20 L18 28 L22 28 L20 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M14 11 L18 11 L19 15 L17 16 L15 16 L13 15 Z" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="13" r="0.8" fill="#1a1a1a"/><path d="M15 12 L17 12" stroke="#1a1a1a" stroke-width="0.5"/></svg>`,
      wP: `<svg viewBox="-1 -1 34 34"><circle cx="16" cy="5" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 8 L19 8 L20 18 L12 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 18 L10 28 L14 28 L15 20 L17 20 L18 28 L22 28 L20 18 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="2" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><line x1="16" y1="12" x2="16" y2="16" stroke="#1a1a1a" stroke-width="0.5"/><line x1="14" y1="14" x2="18" y2="14" stroke="#1a1a1a" stroke-width="0.5"/></svg>`
    }
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
      wP: `<svg viewBox="0 0 32 32"><circle cx="16" cy="6" r="3" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M13 9 L19 9 L20 20 L12 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><path d="M12 20 L10 30 L14 30 L15 22 L17 22 L18 30 L22 30 L20 20 Z" fill="#fff" stroke="#1a1a1a" stroke-width="0.8"/><circle cx="16" cy="14" r="2" fill="none" stroke="#1a1a1a" stroke-width="0.8"/><line x1="16" y1="12" x2="16" y2="16" stroke="#1a1a1a" stroke-width="0.5"/><line x1="14" y1="14" x2="18" y2="14" stroke="#1a1a1a" stroke-width="0.5"/></svg>`
    }
  }
};

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