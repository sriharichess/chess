/* animations.js — cartoon presentation layer. Rules stay 100% untouched in chess.html.
   HTML change required: <script src="animations.js"></script> after pieces.js. */
(function () {
  'use strict';
  let animBusy = false;        // input lock while a scene plays
  let pendingEndShow = false;  // game-over modal deferred until scene ends
  const actors = new Map();    // "r,c" -> element
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- self-install: CSS + layers + chip ---------- */
  const style = document.createElement('style');
  style.textContent = `
    #board .piece{display:none}
    #actors,#fxlayer{position:absolute;inset:6px;pointer-events:none}
    #actors{z-index:3}#fxlayer{z-index:5}
    #animChip{min-height:16px;margin-top:8px;font-size:.72rem;color:#6c7086;text-align:center}
    .actor{position:absolute;left:0;top:0;width:12.5%;height:12.5%;display:flex;align-items:center;justify-content:center}
    .actor svg{width:92%;height:92%;display:block}
    .a-in{width:100%;height:100%;transform:scaleX(var(--face,1))}
    .a-bob,.a-pop{width:100%;height:100%}
    .actor.idle .a-bob{animation:breathe 1.9s ease-in-out infinite}
    .actor.walking .a-bob{animation:walkBob .3s linear infinite}
    .actor.hop .a-bob{animation:hopJump .28s ease-out}
    .actor.celebrating .a-bob{animation:celeBounce .5s ease-out}
    .actor.punching .a-bob{animation:punchLunge .22s cubic-bezier(.2,.8,.3,1) forwards}
    .actor.hurt .a-in,.actor.shudder .a-in{animation:shudder .14s linear 2}
    .actor.tumbling .a-bob{animation:tumbleDyn .48s cubic-bezier(.3,.7,.4,1) forwards}
    .actor.poofing .a-pop{animation:poofPop .3s ease-out forwards}
    .actor.dizzy .a-bob{animation:dizzy .6s ease-in-out}
    @keyframes breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-2%)}}
    @keyframes walkBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7%)}}
    @keyframes hopJump{0%,100%{transform:translateY(0)}40%{transform:translateY(-12%)}}
    @keyframes celeBounce{0%,100%{transform:translateY(0)}25%{transform:translateY(-14%)}50%{transform:translateY(0)}75%{transform:translateY(-9%)}}
    @keyframes punchLunge{0%{transform:translate(0,0)}35%{transform:translate(calc(var(--lx,6px)*-.4),calc(var(--ly,0px)*-.4))}70%,100%{transform:translate(var(--lx,6px),var(--ly,0px))}}
    @keyframes tumbleDyn{0%{transform:none}25%{transform:translate(calc(var(--tx,0px)*.4),calc(var(--ty,0px)*.4)) rotate(calc(var(--rot,80deg)*.33))}55%{transform:translate(var(--tx,0px),var(--ty,0px)) rotate(var(--rot,80deg))}75%{transform:translate(calc(var(--tx,0px)*.8),var(--ty,0px)) rotate(calc(var(--rot,80deg)*.85))}100%{transform:translate(var(--tx,0px),var(--ty,0px)) rotate(var(--rot,80deg))}}
    @keyframes poofPop{0%{transform:scale(1);opacity:1}40%{transform:scale(1.15)}100%{transform:scale(1.35);opacity:0;filter:blur(2px)}}
    @keyframes shudder{0%,100%{transform:scaleX(var(--face,1))}25%{transform:scaleX(var(--face,1)) translateX(-4%)}75%{transform:scaleX(var(--face,1)) translateX(4%)}}
    @keyframes dizzy{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}50%{transform:rotate(8deg)}75%{transform:rotate(-6deg)}}
    .star{position:absolute;width:52px;height:52px;margin:-26px;background:#ffd35c;clip-path:polygon(50% 0,63% 32%,98% 35%,72% 55%,82% 90%,50% 70%,18% 90%,28% 55%,2% 35%,37% 32%);animation:starPop .35s ease-out forwards}
    @keyframes starPop{0%{transform:scale(0) rotate(-30deg);opacity:0}30%{opacity:1}60%{transform:scale(1.25)}100%{transform:scale(1.1);opacity:0}}
    .spark{position:absolute;width:14px;height:14px;margin:-7px;background:#ffe08a;clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0% 50%,38% 38%);animation:sparkFly .55s ease-out forwards}
    @keyframes sparkFly{from{transform:rotate(var(--a,0deg)) translateX(4px);opacity:1}to{transform:rotate(var(--a,0deg)) translateX(30px) scale(0);opacity:0}}
    .ring{position:absolute;width:44px;height:44px;margin:-22px;border:3px solid #ffd35c;border-radius:50%;animation:ringExpand .45s ease-out forwards}
    @keyframes ringExpand{from{transform:scale(.2);opacity:.9}to{transform:scale(1.6);opacity:0}}
    .dust{position:absolute;width:12px;height:12px;margin:-6px;background:#d8cbb8;border-radius:50%;animation:dustUp .4s ease-out forwards}
    @keyframes dustUp{to{transform:translate(-8px,-12px) scale(1.4);opacity:0}}`;
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
    el.dataset.color = piece[0]; el.dataset.type = piece[1];
    el.innerHTML = '<div class="a-in"><div class="a-bob"><div class="a-pop">' +
      PIECE_SVG[piece[0] + piece[1]] + '</div></div></div>';
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
  const face = (el, d) => el.querySelector('.a-in').style.setProperty('--face', d);
  function slide(el, dr, dc, ms) {
    return new Promise(res => {
      const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform) || [0, 0, 0];
      const x0 = +m[1], y0 = +m[2], x1 = x0 + dc * cellPx(), y1 = y0 + dr * cellPx();
      if (Math.abs(dc) > 0.01) face(el, dc < 0 ? -1 : 1);
      el.classList.add('walking');
      const a = el.animate(
        [{ transform: 'translate(' + x0 + 'px,' + y0 + 'px)' },
         { transform: 'translate(' + x1 + 'px,' + y1 + 'px)' }],
        { duration: ms, easing: 'linear' });
      a.onfinish = () => {
        el.style.transform = 'translate(' + x1 + 'px,' + y1 + 'px)';
        el.classList.remove('walking'); res();
      };
    });
  }
  function spawnFX(cls, x, y, ang) {
    const d = document.createElement('div');
    d.className = cls; d.style.left = x + 'px'; d.style.top = y + 'px';
    if (ang != null) d.style.setProperty('--a', ang + 'deg');
    fxEl.appendChild(d); setTimeout(() => d.remove(), 700);
  }

  /* ---------- scenes ---------- */
  async function animateMove(mv) {
    const from = mv.from, to = mv.to;
    const att = actorAt(from.r, from.c);
    const defSq = mv.captured ? to : (mv.enPassant ? { r: from.r, c: to.c } : null);
    const def = defSq ? actorAt(defSq.r, defSq.c) : null;
    if (!att) { setBusy(false); return; }

    if (def && mv.captured) {                       // THE capture scene (contained fight)
      setChip('Attacker: Walking • Defender: in trouble');
      const len = Math.hypot(to.r - from.r, to.c - from.c) || 1;
      const ux = (to.c - from.c) / len, uy = (to.r - from.r) / len;
      const sr = uy * 0.42, sc = ux * 0.42;         // strike point INSIDE destination square
      await slide(att, (to.r - from.r) + sr, (to.c - from.c) + sc, 340);
      setChip('Attacker: Attacking • Defender: Falling');
      att.style.setProperty('--lx', (ux * 10) + 'px');
      att.style.setProperty('--ly', (uy * 10) + 'px');
      att.classList.add('punching');
      await wait(150);
      const dc = center(to.r, to.c), h = cellPx() / 2;
      spawnFX('star', dc.x + h, dc.y + h - 8);
      def.classList.add('hurt');
      await wait(90);                               // hit-stop
      def.style.setProperty('--tx', (ux * 14) + 'px');  // clamped: never leaves
      def.style.setProperty('--ty', (uy * 10) + 'px');  // its own square
      def.style.setProperty('--rot', ((Math.sign(ux) || 1) * 84) + 'deg');
      def.classList.add('tumbling');
      spawnFX('dust', dc.x + h, dc.y + cellPx() * 0.85);
      await wait(480);
      def.classList.add('poofing');
      spawnFX('ring', dc.x + h, dc.y + h);
      for (let i = 0; i < 6; i++) spawnFX('spark', dc.x + h, dc.y + h, i * 60);
      await wait(320);
      def.remove(); actors.delete(key(defSq.r, defSq.c));
      att.classList.remove('punching');
      await slide(att, -sr, -sc, 140);              // occupy the square
      att.classList.add('celebrating'); setChip('Attacker: Celebrating');
      await wait(520); att.classList.remove('celebrating');
    } else if (def) {                               // en passant: shock-vanish in place
      await slide(att, to.r - from.r, to.c - from.c, 340);
      const ep = center(defSq.r, defSq.c), h = cellPx() / 2;
      def.classList.add('shudder'); await wait(260);
      def.classList.add('poofing');
      spawnFX('ring', ep.x + h, ep.y + h);
      for (let i = 0; i < 6; i++) spawnFX('spark', ep.x + h, ep.y + h, i * 60);
      await wait(320);
      def.remove(); actors.delete(key(defSq.r, defSq.c));
    } else {                                        // quiet move: walk + hop
      setChip('Walking…');
      await slide(att, to.r - from.r, to.c - from.c, 340);
      att.classList.add('hop'); await wait(280); att.classList.remove('hop');
    }
    actors.delete(key(from.r, from.c)); actors.set(key(to.r, to.c), att);

    if (mv.rook) {                                  // castling: rook slides after king
      const rk = actorAt(mv.rook.from.r, mv.rook.from.c);
      if (rk) {
        await slide(rk, mv.rook.to.r - mv.rook.from.r, mv.rook.to.c - mv.rook.from.c, 220);
        actors.delete(key(mv.rook.from.r, mv.rook.from.c));
        actors.set(key(mv.rook.to.r, mv.rook.to.c), rk);
      }
    }
    if (mv.promotion) {                             // sparkle + swap to new piece
      const p = center(to.r, to.c), h = cellPx() / 2;
      spawnFX('ring', p.x + h, p.y + h);
      for (let i = 0; i < 6; i++) spawnFX('spark', p.x + h, p.y + h, i * 60);
      att.querySelector('.a-pop').innerHTML = PIECE_SVG[mv.piece[0] + mv.promotion];
      att.dataset.type = mv.promotion;
      att.classList.add('celebrating'); await wait(450); att.classList.remove('celebrating');
    }
    if (mv.suffix === '#' || mv.suffix === '+') {   // king reacts to check / mate
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

  /* ---------- hooks (installed after chess.html's inline script defines them) ---------- */
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
      if (pendingPromotion) return;                 // modal path resumes below
      animateMove(moveHistory[moveHistory.length - 1]);
    };
    const _promo = window.completePromotion;
    window.completePromotion = t => {
      _promo(t);
      animateMove(moveHistory[moveHistory.length - 1]);
    };
    const _click = window.handleSquareClick;
    window.handleSquareClick = (r, c) => { if (!animBusy) _click(r, c); };
  });

  /* ---------- auto re-sync (undo / restart / theme / resize) ---------- */
  new MutationObserver(() => { if (!animBusy) rebuildActors(); })
    .observe(document.getElementById('board'), { childList: true, subtree: true });
  window.addEventListener('resize', () => { if (!animBusy) rebuildActors(); });
})();