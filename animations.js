/* animations.js — presentation layer with graceful stride-locked walking and weapon combat.
   Rules stay 100% untouched in chess.html.
   HTML: <script src="animations.js"></script> after pieces.js. */
(function () {
'use strict';
let animBusy = false;
let pendingEndShow = false;
const actors = new Map();
const wait = ms => new Promise(r => setTimeout(r, ms));
const easeOut = k => 1 - Math.pow(1 - k, 3);
const easeIn = k => k * k * k;
const easeInOut = k => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const travelMs = len => Math.round(Math.min(1900, 420 + 300 * len));
function tween(ms, step) {
  return new Promise(res => {
    const t0 = performance.now();
    (function frame(t) {
      const k = Math.min(1, (t - t0) / ms);
      step(k);
      if (k < 1) requestAnimationFrame(frame); else res();
    })(t0);
  });
}

/* ---------- self-install: CSS + layers + chip ---------- */
const style = document.createElement('style');
style.textContent = `#board .piece{display:none} #actors,#fxlayer{position:absolute;inset:6px;pointer-events:none} #actors{z-index:3}#fxlayer{z-index:5} #animChip{min-height:16px;margin-top:8px;font-size:.72rem;color:#6c7086;text-align:center} .actor{position:absolute;left:0;top:0;width:12.5%;height:12.5%;display:flex;align-items:center;justify-content:center} .actor svg{width:92%;height:92%;display:block;overflow:visible} .a-in{position:relative;width:100%;height:100%;transform:scaleX(var(--face,1))} .a-bob,.a-pop{width:100%;height:100%} .a-shadow{position:absolute;left:50%;bottom:3.5%;width:60%;height:9%;transform:translateX(-50%);border-radius:50%;background:radial-gradient(50% 50% at 50% 50%, rgba(12,9,4,.32), rgba(12,9,4,0) 72%);transition:opacity .25s} .actor[data-type="N"] .a-shadow{width:76%} .actor.idle .a-bob{animation:breathe 2.4s ease-in-out infinite} .actor.gait .a-bob{animation:none} .actor.walking.nolegs .a-bob{animation:waddle .6s ease-in-out infinite} .actor.hop .a-bob{animation:hopJump .34s ease-out} .actor.celebrating .a-bob{animation:celeBounce .55s ease-out} .actor.punching .a-bob{animation:punchLunge .24s cubic-bezier(.2,.8,.3,1) forwards} .actor.hurt .a-in,.actor.shudder .a-in{animation:shudder .14s linear 2} .actor.tumbling .a-bob{animation:tumbleDyn .48s cubic-bezier(.3,.7,.4,1) forwards} .actor.tumbling .a-shadow{opacity:.45} .actor.poofing .a-pop{animation:poofPop .3s ease-out forwards} .actor.poofing .a-shadow{opacity:0} .actor.dizzy .a-bob{animation:dizzy .6s ease-in-out} .actor.casting .wpn[data-wpn="staff"]{filter:drop-shadow(0 0 2.5px #7fd4ff) drop-shadow(0 0 5px rgba(79,168,255,.7))} #boardWrapper.quake{animation:quake .32s linear} @keyframes quake{0%,100%{transform:translate(0,0)}20%{transform:translate(-3px,2px)}40%{transform:translate(3px,-2px)}60%{transform:translate(-2px,-2px)}80%{transform:translate(2px,2px)}} @keyframes breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.6%)}} @keyframes waddle{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-3%) rotate(-2deg)}75%{transform:translateY(-3%) rotate(2deg)}} @keyframes hopJump{0%,100%{transform:translateY(0)}40%{transform:translateY(-10%)}} @keyframes celeBounce{0%,100%{transform:translateY(0)}25%{transform:translateY(-12%)}50%{transform:translateY(0)}75%{transform:translateY(-8%)}} @keyframes punchLunge{0%{transform:translate(0,0)}35%{transform:translate(calc(var(--lx,6px)*-.4),calc(var(--ly,0px)*-.4))}70%,100%{transform:translate(var(--lx,6px),var(--ly,0px))}} @keyframes tumbleDyn{0%{transform:none}25%{transform:translate(calc(var(--tx,0px)*.4),calc(var(--ty,0px)*.4)) rotate(calc(var(--rot,80deg)*.33))}55%{transform:translate(var(--tx,0px),var(--ty,0px)) rotate(var(--rot,80deg))}75%{transform:translate(calc(var(--tx,0px)*.8),var(--ty,0px)) rotate(calc(var(--rot,80deg)*.85))}100%{transform:translate(var(--tx,0px),var(--ty,0px)) rotate(var(--rot,80deg))}} @keyframes poofPop{0%{transform:scale(1);opacity:1}40%{transform:scale(1.15)}100%{transform:scale(1.35);opacity:0;filter:blur(2px)}} @keyframes shudder{0%,100%{transform:scaleX(var(--face,1))}25%{transform:scaleX(var(--face,1)) translateX(-4%)}75%{transform:scaleX(var(--face,1)) translateX(4%)}} @keyframes dizzy{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}50%{transform:rotate(8deg)}75%{transform:rotate(-6deg)}} .star{position:absolute;width:52px;height:52px;margin:-26px;background:#ffd35c;clip-path:polygon(50% 0,63% 32%,98% 35%,72% 55%,82% 90%,50% 70%,18% 90%,28% 55%,2% 35%,37% 32%);animation:starPop .35s ease-out forwards} @keyframes starPop{0%{transform:scale(0) rotate(-30deg);opacity:0}30%{opacity:1}60%{transform:scale(1.25)}100%{transform:scale(1.1);opacity:0}} .spark{position:absolute;width:14px;height:14px;margin:-7px;background:#ffe08a;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0% 50%,38% 38%);animation:sparkFly .55s ease-out forwards} .spark.arcane{background:#9fe0ff} @keyframes sparkFly{from{transform:rotate(var(--a,0deg)) translateX(4px);opacity:1}to{transform:rotate(var(--a,0deg)) translateX(30px) scale(0);opacity:0}} .ring{position:absolute;width:44px;height:44px;margin:-22px;border:3px solid #ffd35c;border-radius:50%;animation:ringExpand .45s ease-out forwards} .ring.arcane{border-color:#7fd4ff;box-shadow:0 0 14px rgba(127,212,255,.7)} @keyframes ringExpand{from{transform:scale(.2);opacity:.9}to{transform:scale(1.6);opacity:0}} .dust{position:absolute;width:12px;height:12px;margin:-6px;background:#d8cbb8;border-radius:50%;animation:dustUp .4s ease-out forwards} @keyframes dustUp{to{transform:translate(-8px,-12px) scale(1.4);opacity:0}} .fx-slash{position:absolute;width:56px;height:56px;margin:-28px;border-radius:50%;border:5px solid transparent;border-top-color:#fff3c4;border-right-color:#ffd35c;filter:drop-shadow(0 0 6px rgba(255,211,92,.8));animation:slashArc .3s ease-out forwards} .fx-slash.cleave{width:72px;height:72px;margin:-36px;border-width:6px;border-top-color:#ffffff;border-right-color:#ff8a5c;filter:drop-shadow(0 0 8px rgba(255,138,92,.8))} .fx-slash.stab{width:34px;height:34px;margin:-17px;border-width:4px} @keyframes slashArc{0%{transform:rotate(calc(var(--a,0deg) - 95deg)) scale(.5);opacity:0}25%{opacity:1}100%{transform:rotate(calc(var(--a,0deg) + 45deg)) scale(1.15);opacity:0}} .fx-shock{position:absolute;width:60px;height:22px;margin:-11px -30px;border:3px solid #ffd35c;border-radius:50%;box-shadow:0 0 10px rgba(255,211,92,.6);animation:shockWave .45s ease-out forwards} @keyframes shockWave{from{transform:scale(.2);opacity:.95}to{transform:scale(2.1);opacity:0}} .fx-pierce{position:absolute;width:54px;height:5px;margin:-2.5px -27px;background:linear-gradient(90deg,transparent,#fff3c4,#ffd35c);border-radius:2px;box-shadow:0 0 8px rgba(255,211,92,.8);animation:pierceFly .32s ease-out forwards} @keyframes pierceFly{from{transform:rotate(var(--a,0deg)) scaleX(.2);opacity:1}to{transform:rotate(var(--a,0deg)) scaleX(1.6);opacity:0}} .fx-bash{position:absolute;width:34px;height:34px;margin:-17px;border:3px solid #fff3c4;border-radius:50%;animation:ringExpand .35s ease-out forwards} .fx-bolt{position:absolute;width:16px;height:16px;margin:-8px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#eaf7ff,#7fd4ff 45%,#2f7fd4);box-shadow:0 0 12px #7fd4ff,0 0 26px rgba(79,168,255,.6)}`;
document.head.appendChild(style);
document.getElementById('boardWrapper').insertAdjacentHTML('beforeend',
  '<div id="actors"></div><div id="fxlayer"></div><div id="animChip"></div>');

/* ---------- actor system ---------- */
const actorsEl = document.getElementById('actors');
const fxEl = document.getElementById('fxlayer');
const chipEl = document.getElementById('animChip');
const cellPx = () => actorsEl.clientWidth / 8;
const key = (r, c) => r + ',' + c;
const center = (r, c) => ({ x: c * cellPx(), y: r * cellPx() });
const setChip = t => { chipEl.textContent = t; };
function setBusy(b) {
  animBusy = b;
  document.getElementById('undoBtn').disabled = b;
  document.getElementById('restartBtn').disabled = b;
}
function makeActor(r, c, piece) {
  const el = document.createElement('div');
  el.className = 'actor idle';
  el.dataset.color = piece[0]; el.dataset.type = piece[1]; el.dataset.face = '1';
  el.innerHTML = '<div class="a-in"><div class="a-shadow"></div><div class="a-bob"><div class="a-pop">' +
    PIECE_SVG[piece[0] + piece[1]] + '</div></div></div>';
  if (!el.querySelector('.leg')) el.classList.add('nolegs');
  const p = center(r, c);
  el.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
  actorsEl.appendChild(el); actors.set(key(r, c), el);
  return el;
}
function rebuildActors() {
  actors.clear(); actorsEl.innerHTML = '';
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++)
    if (board[r][c]) makeActor(r, c, board[r][c]);
  setChip('');
}
const actorAt = (r, c) => actors.get(key(r, c));
const kingActor = col => [...actors.values()].find(a => a.dataset.color === col && a.dataset.type === 'K');
const face = (el, d) => { el.dataset.face = String(d); el.querySelector('.a-in').style.setProperty('--face', d); };

/* ---------- graceful stride-locked walk & realistic quadruped trot ----------
   Position eases in/out; leg phase is locked to distance travelled so feet/hooves
   plant against the board instead of sliding. Quadrupeds (fl/fr/bl/br) use a
   diagonal-pair trot (fl+br vs fr+bl) with realistic neck/head nod. */
function slide(el, dr, dc, ms, opts = {}) {
  return new Promise(res => {
    const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform) || [0, 0, 0];
    const x0 = +m[1], y0 = +m[2], cell = cellPx();
    const dx = dc * cell, dy = dr * cell, dist = Math.hypot(dr, dc);
    if (Math.abs(dc) > 0.01) face(el, dc < 0 ? -1 : 1);
    const legs = [...el.querySelectorAll('.leg')];
    const head = el.querySelector('.horse-head');
    const isQuad = legs.length >= 4;
    const legged = legs.length > 0 && dist > 0.04;
    const bob = el.querySelector('.a-bob');
    el.classList.remove('idle');
    el.classList.add(legged ? 'gait' : 'walking');
    const gallop = opts.gait === 'gallop';
    const cycles = dist * (isQuad ? (gallop ? 1.15 : 0.95) : (gallop ? 0.65 : 0.9));
    const ampMul = isQuad ? (gallop ? 0.92 : 0.72) : ((gallop ? 1.25 : 1) * 0.62);
    const last = {};
    const t0 = performance.now();
    function frame(t) {
      const k = Math.min(1, (t - t0) / ms), e = easeInOut(k);
      el.style.transform = 'translate(' + (x0 + dx * e).toFixed(2) + 'px,' + (y0 + dy * e).toFixed(2) + 'px)';
      if (legged) {
        const ph = e * cycles * Math.PI * 2;
        for (const g of legs) {
          const id = g.dataset.leg;
          /* Diagonal trot pairing for 4-legged horse: fl & br in phase; fr & bl opposite */
          const phaseOff = (id === 'r' || id === 'fr' || id === 'bl') ? Math.PI : 0;
          const s = Math.sin(ph + phaseOff);
          const a = s * (+g.dataset.amp || 16) * ampMul;
          last[id] = a;
          g.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' ' + g.dataset.px + ' ' + g.dataset.py + ')');
        }
        if (isQuad) {
          /* Grounded horse trot: subtle suspension lift & forward pitch, natural neck nod */
          const by = -Math.abs(Math.sin(ph)) * cell * 0.014;
          const pitch = Math.sin(ph * 2) * 1.1 + Math.sin(k * Math.PI) * 1.4;
          bob.style.transform = 'translateY(' + by.toFixed(2) + 'px) rotate(' + pitch.toFixed(2) + 'deg)';
          if (head) {
            const nod = -Math.abs(Math.sin(ph)) * 3.8;
            head.setAttribute('transform', 'rotate(' + nod.toFixed(2) + ' 20 15)');
          }
        } else {
          const by = -Math.abs(Math.sin(ph)) * cell * 0.016;
          const lean = Math.sin(k * Math.PI) * 2.2;
          bob.style.transform = 'translateY(' + by.toFixed(2) + 'px) rotate(' + lean.toFixed(2) + 'deg)';
        }
      }
      if (k < 1) requestAnimationFrame(frame);
      else {
        const from = { ...last }, t1 = performance.now();
        const endBob = legged ? -Math.abs(Math.sin(cycles * Math.PI * 2)) * cell * (isQuad ? 0.014 : 0.016) : 0;
        (function settle(t) {
          const q = Math.min(1, (t - t1) / 220), eo = easeOut(q);
          if (legged) {
            for (const g of legs) {
              if (q >= 1) g.removeAttribute('transform');
              else {
                const a = (from[g.dataset.leg] || 0) * (1 - eo);
                g.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' ' + g.dataset.px + ' ' + g.dataset.py + ')');
              }
            }
            if (head) {
              if (q >= 1) head.removeAttribute('transform');
              else head.setAttribute('transform', 'rotate(' + (-2 * (1 - eo)).toFixed(2) + ' 20 15)');
            }
            bob.style.transform = 'translateY(' + (endBob * (1 - eo)).toFixed(2) + 'px)';
          }
          if (q < 1) requestAnimationFrame(settle);
          else {
            bob.style.transform = '';
            el.classList.remove('gait', 'walking');
            el.classList.add('idle');
            res();
          }
        })(t1);
      }
    }
    requestAnimationFrame(frame);
  });
}
function spawnFX(cls, x, y, ang) {
  const d = document.createElement('div');
  d.className = cls; d.style.left = x + 'px'; d.style.top = y + 'px';
  if (ang != null) d.style.setProperty('--a', ang + 'deg');
  fxEl.appendChild(d); setTimeout(() => d.remove(), 700);
}
function quake() {
  const w = document.getElementById('boardWrapper');
  w.classList.remove('quake'); void w.offsetWidth; w.classList.add('quake');
  setTimeout(() => w.classList.remove('quake'), 360);
}

/* ---------- weapon system ---------- */
const PROFILES = {
  sword:  { wind: -38, hit: 105,  windMs: 150, hitMs: 110, recMs: 300, thrust: 0,  windTx: 0 },
  gsword: { wind: 62,  hit: -108, windMs: 170, hitMs: 120, recMs: 320, thrust: 0,  windTx: 0 },
  hammer: { wind: 150, hit: -100, windMs: 220, hitMs: 130, recMs: 360, thrust: 0,  windTx: 0 },
  lance:  { wind: -14, hit: 6,    windMs: 180, hitMs: 110, recMs: 320, thrust: 15, windTx: -3.5 },
  staff:  { wind: -12, hit: 22,   windMs: 180, hitMs: 150, recMs: 340, thrust: 0,  windTx: 0 },
  dagger: { wind: -24, hit: 140,  windMs: 120, hitMs: 100, recMs: 280, thrust: 0,  windTx: 0 },
  shield: { wind: -6,  hit: 0,    windMs: 100, hitMs: 100, recMs: 240, thrust: 3.4, windTx: 0 }
};
const STRIKE_LABEL = { K: 'Sword slash', Q: 'Greatsword cleave', R: 'Warhammer slam', N: 'Cavalry lance thrust', B: 'Arcane bolt', P: 'Shield bash + stab' };
function weaponsOf(el) {
  const o = {};
  el.querySelectorAll('.wpn').forEach(g => { o[g.dataset.wpn] = g; });
  return o;
}
function wpnSetter(g) {
  const px = g.dataset.px, py = g.dataset.py;
  return (a, tx) => g.setAttribute('transform', 'translate(' + (tx || 0) + ' 0) rotate(' + a + ' ' + px + ' ' + py + ')');
}
async function strike(g, p) {
  const set = wpnSetter(g);
  const wtx = p.windTx || 0;
  await tween(p.windMs, k => { const e = easeOut(k); set(p.wind * e, wtx * e); });
  await tween(p.hitMs, k => { const e = easeIn(k); set(p.wind + (p.hit - p.wind) * e, wtx + (p.thrust - wtx) * e); });
}
async function recover(g, p) {
  const set = wpnSetter(g);
  await tween(p.recMs, k => { const e = easeOut(k); set(p.hit * (1 - e), p.thrust * (1 - e)); });
  g.removeAttribute('transform');
}
async function knockDown(def, ux, uy, rot, big) {
  def.classList.add('hurt'); await wait(90);
  def.style.setProperty('--tx', (ux * (big ? 18 : 14)) + 'px');
  def.style.setProperty('--ty', (uy * (big ? 12 : 10)) + 'px');
  def.style.setProperty('--rot', ((Math.sign(ux) || 1) * rot) + 'deg');
  def.classList.add('tumbling');
  await wait(480);
}
async function poof(def, x, y, arcane) {
  def.classList.add('poofing');
  spawnFX(arcane ? 'ring arcane' : 'ring', x, y);
  for (let i = 0; i < 6; i++) spawnFX(arcane ? 'spark arcane' : 'spark', x, y, i * 60);
  await wait(320);
  def.remove();
}
function fireBolt(att, tx, ty) {
  return new Promise(res => {
    const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(att.style.transform) || [0, 0, 0];
    const cell = cellPx(), f = +(att.dataset.face || 1);
    const sx = +m[1] + cell / 2 + f * cell * 0.28, sy = +m[2] + cell * 0.16;
    const b = document.createElement('div');
    b.className = 'fx-bolt'; b.style.left = sx + 'px'; b.style.top = sy + 'px';
    fxEl.appendChild(b);
    const a = b.animate(
      [{ transform: 'translate(0,0) scale(.7)' }, { transform: 'translate(' + (tx - sx) + 'px,' + (ty - sy) + 'px) scale(1.1)' }],
      { duration: 240, easing: 'cubic-bezier(.3,.2,.6,1)' });
    a.onfinish = () => { b.remove(); res(); };
  });
}
async function weaponCombat(att, def, ux, uy, targetR, targetC, inPlace) {
  const w = weaponsOf(att), type = att.dataset.type;
  const need = { K: ['sword'], Q: ['gsword'], R: ['hammer'], N: ['lance'], B: ['staff'], P: ['shield', 'dagger'] }[type];
  if (!need || !need.every(k => w[k])) return false;
  const tc = center(targetR, targetC), h = cellPx() / 2, tx = tc.x + h, ty = tc.y + h;
  const ang = Math.atan2(uy, ux) * 180 / Math.PI;
  setChip((att.dataset.color === 'w' ? 'White ' : 'Black ') + STRIKE_LABEL[type] + '!');
  const groundY = tc.y + cellPx() * 0.85;

  if (type === 'B') {
    att.classList.add('casting');
    await strike(w.staff, PROFILES.staff);
    const rec = recover(w.staff, PROFILES.staff);
    await fireBolt(att, tx, ty - 6);
    spawnFX('ring arcane', tx, ty - 6);
    for (let i = 0; i < 6; i++) spawnFX('spark arcane', tx, ty - 6, i * 60);
    if (inPlace) { def.classList.add('shudder'); await wait(220); }
    else { def.classList.add('dizzy'); await wait(420); def.classList.remove('dizzy'); }
    await poof(def, tx, ty, true);
    await rec; att.classList.remove('casting');
    return true;
  }
  if (type === 'P') {
    await strike(w.shield, PROFILES.shield);
    spawnFX('fx-bash', tx, ty);
    def.classList.add('shudder');
    const bashRec = recover(w.shield, PROFILES.shield);
    await wait(180); def.classList.remove('shudder');
    await strike(w.dagger, PROFILES.dagger);
    spawnFX('fx-slash stab', tx, ty - 4, ang);
    spawnFX('star', tx, ty - 8);
    const stabRec = recover(w.dagger, PROFILES.dagger);
    if (inPlace) { def.classList.add('shudder'); await wait(220); await poof(def, tx, ty, false); }
    else { await knockDown(def, ux, uy, 70, false); spawnFX('dust', tx, groundY); await poof(def, tx, ty, false); }
    await Promise.all([bashRec, stabRec]);
    return true;
  }
  const kind = need[0], p = PROFILES[kind];
  await strike(w[kind], p);
  const recP = recover(w[kind], p);
  if (kind === 'hammer') {
    spawnFX('fx-shock', tx, groundY);
    spawnFX('star', tx, ty - 8);
    spawnFX('dust', tx - 10, groundY); spawnFX('dust', tx + 10, groundY); spawnFX('dust', tx, groundY);
    quake();
    if (inPlace) { def.classList.add('shudder'); await wait(260); await poof(def, tx, ty, false); }
    else { await knockDown(def, ux, uy, 96, true); await poof(def, tx, ty, false); }
  } else if (kind === 'lance') {
    spawnFX('fx-pierce', tx, ty - 6, ang);
    spawnFX('star', tx, ty - 8);
    for (let i = 0; i < 5; i++) spawnFX('spark', tx, ty - 6, ang + (i - 2) * 22);
    if (inPlace) { def.classList.add('shudder'); await wait(240); await poof(def, tx, ty, false); }
    else { await knockDown(def, ux, uy, 68, false); spawnFX('dust', tx, groundY); await poof(def, tx, ty, false); }
  } else {
    spawnFX(kind === 'gsword' ? 'fx-slash cleave' : 'fx-slash', tx, ty - 6, ang);
    spawnFX('star', tx, ty - 8);
    if (kind === 'gsword') quake();
    if (inPlace) { def.classList.add('shudder'); await wait(240); await poof(def, tx, ty, false); }
    else { await knockDown(def, ux, uy, kind === 'gsword' ? 92 : 84, kind === 'gsword'); spawnFX('dust', tx, groundY); await poof(def, tx, ty, false); }
  }
  await recP;
  return true;
}

/* ---------- scenes ---------- */
async function animateMove(mv) {
  const from = mv.from, to = mv.to;
  const dr = to.r - from.r, dc = to.c - from.c;
  const att = actorAt(from.r, from.c);
  const defSq = mv.captured ? to : (mv.enPassant ? { r: from.r, c: to.c } : null);
  const def = defSq ? actorAt(defSq.r, defSq.c) : null;
  if (!att) { setBusy(false); return; }
  const isKnight = att.dataset.type === 'N';
  const gait = isKnight ? 'gallop' : 'walk';

  if (def && mv.captured) {
    setChip('Approaching…');
    const len = Math.hypot(dr, dc) || 1;
    const ux = dc / len, uy = dr / len;
    const HALT = isKnight ? 0.85 : 0.72;
    const approach = Math.max(0.1, len - HALT);
    const hr = uy * approach, hc = ux * approach;
    await slide(att, hr, hc, travelMs(approach), { gait });
    if (Math.abs(dc) > 0.01) face(att, dc < 0 ? -1 : 1);
    const cell = cellPx();
    const armed = Object.keys(weaponsOf(att)).length > 0;
    const lunge = isKnight ? 0.24 : (armed ? 0.14 : 0.22);
    att.style.setProperty('--lx', (ux * cell * lunge) + 'px');
    att.style.setProperty('--ly', (uy * cell * lunge) + 'px');
    att.classList.add('punching');
    const ran = await weaponCombat(att, def, ux, uy, to.r, to.c, false);
    if (!ran) {
      setChip('Attacker: Attacking • Defender: Falling');
      await wait(150);
      const dcen = center(to.r, to.c), h = cell / 2;
      spawnFX('star', dcen.x + h, dcen.y + h - 8);
      await knockDown(def, ux, uy, 84, false);
      spawnFX('dust', dcen.x + h, dcen.y + cell * 0.85);
      await poof(def, dcen.x + h, dcen.y + h, false);
    }
    att.classList.remove('punching');
    actors.delete(key(defSq.r, defSq.c));
    setChip('Taking the square');
    await slide(att, dr - hr, dc - hc, travelMs(HALT), { gait: 'walk' });
    att.classList.add('celebrating'); setChip('Attacker: Celebrating');
    await wait(550); att.classList.remove('celebrating');

  } else if (def) {
    await slide(att, dr, dc, travelMs(Math.hypot(dr, dc)), { gait });
    const ep = center(defSq.r, defSq.c), h = cellPx() / 2;
    const ux = Math.sign(defSq.c - to.c) || 1;
    face(att, ux);
    const cell = cellPx();
    att.style.setProperty('--lx', (ux * cell * 0.12) + 'px');
    att.style.setProperty('--ly', '0px');
    att.classList.add('punching');
    const ran = await weaponCombat(att, def, ux, 0, defSq.r, defSq.c, true);
    if (!ran) {
      def.classList.add('shudder'); await wait(260);
      await poof(def, ep.x + h, ep.y + h, false);
    }
    att.classList.remove('punching');
    actors.delete(key(defSq.r, defSq.c));

  } else {
    setChip('Walking…');
    await slide(att, dr, dc, travelMs(Math.hypot(dr, dc)), { gait });
    if (att.classList.contains('nolegs')) {
      att.classList.add('hop'); await wait(340); att.classList.remove('hop');
    }
  }

  actors.delete(key(from.r, from.c)); actors.set(key(to.r, to.c), att);

  if (mv.rook) {
    const rk = actorAt(mv.rook.from.r, mv.rook.from.c);
    if (rk) {
      const rl = Math.hypot(mv.rook.to.r - mv.rook.from.r, mv.rook.to.c - mv.rook.from.c);
      await slide(rk, mv.rook.to.r - mv.rook.from.r, mv.rook.to.c - mv.rook.from.c, travelMs(rl), { gait: 'walk' });
      actors.delete(key(mv.rook.from.r, mv.rook.from.c));
      actors.set(key(mv.rook.to.r, mv.rook.to.c), rk);
    }
  }
  if (mv.promotion) {
    const p = center(to.r, to.c), h = cellPx() / 2;
    spawnFX('ring', p.x + h, p.y + h);
    for (let i = 0; i < 6; i++) spawnFX('spark', p.x + h, p.y + h, i * 60);
    att.querySelector('.a-pop').innerHTML = PIECE_SVG[mv.piece[0] + mv.promotion];
    att.dataset.type = mv.promotion;
    att.classList.toggle('nolegs', !att.querySelector('.leg'));
    att.classList.add('celebrating'); await wait(450); att.classList.remove('celebrating');
  }
  if (mv.suffix === '#' || mv.suffix === '+') {
    const k = kingActor(turn);
    if (k) {
      k.classList.add(mv.suffix === '#' ? 'dizzy' : 'shudder');
      await wait(mv.suffix === '#' ? 650 : 300);
      k.classList.remove('dizzy', 'shudder');
    }
  }
  setChip(''); setBusy(false);
  _renderCaptured(); _renderMoveLog(); _updateStatus();
  if (gameOver && pendingEndShow) { pendingEndShow = false; _showGameOver(); }
}

/* ---------- hooks ---------- */
let _renderCaptured, _renderMoveLog, _updateStatus, _showGameOver;
window.addEventListener('load', () => {
  _renderCaptured = window.renderCaptured;
  _renderMoveLog = window.renderMoveLog;
  _updateStatus = window.updateStatus;
  _showGameOver = window.showGameOver;
  const skipWhileBusy = fn => (...a) => { if (!animBusy) return fn(...a); };
  window.renderCaptured = skipWhileBusy(_renderCaptured);
  window.renderMoveLog = skipWhileBusy(_renderMoveLog);
  window.updateStatus = skipWhileBusy(_updateStatus);
  window.showGameOver = () => { if (animBusy) pendingEndShow = true; else _showGameOver(); };
  const _exec = window.executeMove;
  window.executeMove = move => {
    setBusy(true);
    _exec(move);
    if (pendingPromotion) return;
    animateMove(moveHistory[moveHistory.length - 1]);
  };
  const _promo = window.completePromotion;
  window.completePromotion = t => {
    _promo(t);
    animateMove(moveHistory[moveHistory.length - 1]);
  };
  const _click = window.handleSquareClick;
  window.handleSquareClick = (r, c) => { if (!animBusy) _click(r, c); };
  rebuildActors();
});

/* ---------- auto re-sync (undo / restart / theme / resize) ---------- */
new MutationObserver(() => { if (!animBusy) rebuildActors(); })
  .observe(document.getElementById('board'), { childList: true, subtree: true });
window.addEventListener('resize', () => { if (!animBusy) rebuildActors(); });
})();