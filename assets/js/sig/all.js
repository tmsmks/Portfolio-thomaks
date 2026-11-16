/* Animations « signature » : une par projet. Chaque fonction reçoit un hôte (canvas ou conteneur),
   un thème {bg, bg2, ink, muted, accent, accent2} et des options {mini}. Elle renvoie {start, stop}. */
(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SIG = (window.SIG = {});

  /* Fabrique commune : canvas HiDPI, redimensionnement, boucle rAF. */
  function make(host, draw, setup) {
    const canvas = host.tagName === 'CANVAS' ? host : host.appendChild(document.createElement('canvas'));
    const ctx = canvas.getContext('2d');
    const S = { W: 0, H: 0, t: 0, dpr: 1, running: false, raf: 0, last: 0 };
    function resize() {
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      S.W = Math.max(1, r.width); S.H = Math.max(1, r.height);
      canvas.width = S.W * S.dpr; canvas.height = S.H * S.dpr;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      if (setup) setup(S);
      frame(performance.now(), true);
    }
    function frame(now, once) {
      const dt = Math.min(0.05, (now - (S.last || now)) / 1000); S.last = now;
      if (!reduced || once) S.t += dt;
      ctx.clearRect(0, 0, S.W, S.H);
      draw(ctx, S);
      if (S.running && !once) S.raf = requestAnimationFrame(frame);
    }
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    resize();
    return {
      start() { if (reduced || S.running) return; S.running = true; S.last = 0; S.raf = requestAnimationFrame(frame); },
      stop() { S.running = false; cancelAnimationFrame(S.raf); },
      canvas,
    };
  }
  const rnd = (a, b) => a + Math.random() * (b - a);
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  function alpha(hex, a) {
    const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

  /* ------------------------------------------------------------------
     End of Life — un scénario qui se dessine comme un graphe, un parcours
     qui s'illumine.
     ------------------------------------------------------------------ */
  SIG.graph = function (host, T, o) {
    let nodes = [], edges = [], path = [], pathT = 0, nextPick = 4;
    function setup(S) {
      nodes = []; edges = [];
      const cols = o.mini ? 5 : 8, m = o.mini ? 14 : 60;
      const colW = (S.W - 2 * m) / (cols - 1);
      let prev = [];
      for (let c = 0; c < cols; c++) {
        const n = c === 0 || c === cols - 1 ? 1 : 2 + Math.floor(Math.random() * 3);
        const layer = [];
        for (let i = 0; i < n; i++) {
          const y = S.H * (o.mini ? 0.15 : 0.1) + S.H * (o.mini ? 0.7 : 0.5) * ((i + 0.5) / n) + rnd(-S.H * 0.04, S.H * 0.04);
          const node = { x: m + c * colW + rnd(-10, 10), y, r: o.mini ? 3 : 5, c, i: nodes.length, out: [] };
          nodes.push(node); layer.push(node);
        }
        layer.forEach((b) => { prev.forEach((a) => { if (Math.random() < 0.75 || a.out.length === 0) { edges.push({ a, b, k: edges.length }); a.out.push(b); } }); });
        prev.forEach((a) => { if (a.out.length === 0) { const b = layer[Math.floor(Math.random() * layer.length)]; edges.push({ a, b, k: edges.length }); a.out.push(b); } });
        prev = layer;
      }
      pick(); pathT = 0;
    }
    function pick() {
      path = []; let n = nodes[0];
      while (n) { path.push(n); n = n.out.length ? n.out[Math.floor(Math.random() * n.out.length)] : null; }
    }
    return make(host, (ctx, S) => {
      const grow = Math.min(1, S.t / 2.2);
      // arêtes
      edges.forEach((e, idx) => {
        const p = Math.min(1, Math.max(0, grow * edges.length * 1.4 - idx) );
        if (p <= 0) return;
        ctx.strokeStyle = alpha(T.ink, 0.28); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y);
        const cx = (e.a.x + e.b.x) / 2;
        ctx.bezierCurveTo(cx, e.a.y, cx, e.b.y, e.a.x + (e.b.x - e.a.x) * p, e.a.y + (e.b.y - e.a.y) * p);
        ctx.stroke();
      });
      // parcours joueur (tracé le long des courbes, jusqu'au point courant)
      if (S.t > 2.4) {
        pathT += 0.016 * (o.mini ? 1.6 : 1); const seg = pathT * 1.2;
        ctx.strokeStyle = T.accent; ctx.lineWidth = o.mini ? 2 : 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          const p = Math.min(1, Math.max(0, seg - (i - 1)));
          if (p <= 0) break;
          const a = path[i - 1], b = path[i], cx = (a.x + b.x) / 2;
          for (let u = 0.05; u <= p + 1e-6; u += 0.05) {
            const k = Math.min(u, p), m1 = 1 - k;
            const x = m1 * m1 * m1 * a.x + 3 * m1 * m1 * k * cx + 3 * m1 * k * k * cx + k * k * k * b.x;
            const y = m1 * m1 * m1 * a.y + 3 * m1 * m1 * k * a.y + 3 * m1 * k * k * b.y + k * k * k * b.y;
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        if (seg > path.length + 1.5) { pick(); pathT = 0; }
      }
      // nœuds
      nodes.forEach((n, idx) => {
        const p = Math.min(1, Math.max(0, grow * nodes.length * 1.2 - idx));
        if (p <= 0) return;
        const onPath = S.t > 2.4 && path.indexOf(n) > -1 && path.indexOf(n) <= pathT * 1.2;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * p * (onPath ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = onPath ? T.accent : T.bg; ctx.fill();
        ctx.lineWidth = 1.5; ctx.strokeStyle = onPath ? T.accent : T.ink; ctx.stroke();
        if (!o.mini && n.c === 0) { ctx.beginPath(); ctx.arc(n.x, n.y, 11, 0, Math.PI * 2); ctx.strokeStyle = alpha(T.accent2, 0.6); ctx.stroke(); }
      });
    }, setup);
  };

  /* ------------------------------------------------------------------
     IAssou3 — un téléphone où l'IA parle la première.
     ------------------------------------------------------------------ */
  SIG.chat = function (host, T, o) {
    const stars = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), s: rnd(0.5, 2), v: rnd(0.02, 0.08) }));
    const script = [[0, 0.52, 2], [1, 0.4, 1], [0, 0.6, 3], [1, 0.3, 1], [0, 0.5, 2], [0, 0.42, 1]]; // [qui, largeur, lignes]
    return make(host, (ctx, S) => {
      // étoiles qui montent
      stars.forEach((st) => { const y = ((st.y - S.t * st.v * 0.1) % 1 + 1) % 1; ctx.fillStyle = alpha(T.accent2, 0.35 * st.s / 2); ctx.beginPath(); ctx.arc(st.x * S.W, y * S.H, st.s, 0, Math.PI * 2); ctx.fill(); });
      // téléphone
      const ph = o.mini ? S.H * 0.95 : Math.min(S.H * 0.82, 560), pw = ph * 0.48;
      const px = o.mini ? S.W / 2 - pw / 2 : S.W * 0.68 - pw / 2, py = o.mini ? S.H * 0.08 : S.H * 0.12 + Math.sin(S.t * 0.8) * 6;
      ctx.save(); ctx.translate(px, py); if (!o.mini) ctx.rotate(-0.04);
      roundRect(ctx, 0, 0, pw, ph, pw * 0.12); ctx.fillStyle = alpha(T.ink, 0.06); ctx.fill(); ctx.strokeStyle = alpha(T.ink, 0.35); ctx.lineWidth = 1.5; ctx.stroke();
      roundRect(ctx, pw * 0.3, pw * 0.05, pw * 0.4, pw * 0.05, 8); ctx.fillStyle = alpha(T.ink, 0.25); ctx.fill();
      // bulles
      const cycle = 11, tt = S.t % cycle; let y = ph * 0.14; const pad = pw * 0.08;
      script.forEach(([who, w, lines], i) => {
        const appear = 0.6 + i * 1.5; const p = Math.min(1, Math.max(0, (tt - appear) / 0.5));
        const bw = pw * w, bh = lines * pw * 0.07 + pw * 0.08;
        if (p > 0) {
          const bx = who === 0 ? pad : pw - pad - bw;
          ctx.save(); ctx.globalAlpha = ease(p); ctx.translate(0, (1 - ease(p)) * 10);
          roundRect(ctx, bx, y, bw, bh, pw * 0.06);
          if (who === 0) { const g = ctx.createLinearGradient(bx, y, bx + bw, y); g.addColorStop(0, T.accent); g.addColorStop(1, T.accent2); ctx.fillStyle = g; } else ctx.fillStyle = alpha(T.ink, 0.18);
          ctx.fill();
          for (let l = 0; l < lines; l++) { roundRect(ctx, bx + pw * 0.05, y + pw * 0.045 + l * pw * 0.07, bw * (l === lines - 1 ? 0.55 : 0.82), pw * 0.035, 4); ctx.fillStyle = who === 0 ? alpha(T.bg, 0.55) : alpha(T.ink, 0.5); ctx.fill(); }
          ctx.restore();
        } else if (tt > appear - 0.6 && who === 0) {
          // points « en train d'écrire »
          for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(pad + pw * 0.06 + k * pw * 0.05, y + pw * 0.05 + Math.sin(S.t * 8 + k) * 2, pw * 0.014, 0, Math.PI * 2); ctx.fillStyle = alpha(T.accent, 0.8); ctx.fill(); }
        }
        if (p > 0 || tt > appear - 0.6) y += bh + pw * 0.05;
      });
      ctx.restore();
      // halo
      if (!o.mini) { const g = ctx.createRadialGradient(px + pw / 2, py + ph / 2, 10, px + pw / 2, py + ph / 2, ph); g.addColorStop(0, alpha(T.accent2, 0.12)); g.addColorStop(1, alpha(T.accent2, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, S.W, S.H); }
    });
  };

  /* ------------------------------------------------------------------
     PI_26 — les lumières d'un hôpital, une courbe de risque, un seuil.
     ------------------------------------------------------------------ */
  SIG.grid = function (host, T, o) {
    let cells = [], cols = 0, rows = 0, outage = -10;
    function setup(S) {
      const size = o.mini ? 10 : 18; cols = Math.floor(S.W / size); rows = Math.floor(S.H * (o.mini ? 0.7 : 0.42) / size);
      cells = Array.from({ length: cols * rows }, () => ({ on: Math.random() < 0.7, f: rnd(0.2, 1), p: Math.random() * 6 }));
    }
    return make(host, (ctx, S) => {
      const size = o.mini ? 10 : 18, gap = o.mini ? 2 : 4;
      const risk = (x) => 0.35 + 0.28 * Math.sin(x * 2.1 + S.t * 0.5) + 0.2 * Math.sin(x * 5.3 - S.t * 0.9) + 0.08 * Math.sin(x * 13 + S.t);
      const head = risk(1.0);
      if (head > 0.72 && S.t - outage > 5) outage = S.t;
      const dark = S.t - outage < 2.2 ? 1 - Math.abs((S.t - outage) / 2.2 - 0.5) * 2 : 0;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const cell = cells[r * cols + c]; const x = c * size, y = r * size;
        const flick = 0.7 + 0.3 * Math.sin(S.t * cell.f * 3 + cell.p);
        const zone = Math.exp(-Math.pow((c / cols - 0.72) * 3, 2));
        const fade = o.mini ? 1 : Math.min(1, 0.25 + c / cols); const a = (cell.on ? 0.18 + 0.5 * flick * (1 - dark * zone) : 0.05) * fade;
        ctx.fillStyle = cell.on ? alpha(T.accent, a) : alpha(T.ink, 0.05);
        ctx.fillRect(x + gap / 2, y + gap / 2, size - gap, size - gap);
      }
      // courbe de risque
      const y0 = rows * size + (o.mini ? 6 : 24), h = o.mini ? S.H - y0 - 4 : S.H * 0.16;
      const thr = y0 + h * (1 - 0.72);
      ctx.setLineDash([6, 6]); ctx.strokeStyle = alpha(T.ink, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, thr); ctx.lineTo(S.W, thr); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath();
      for (let x = 0; x <= S.W; x += 4) { const v = risk(x / S.W); const y = y0 + h * (1 - v); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.strokeStyle = T.accent2; ctx.lineWidth = o.mini ? 1.5 : 2.2; ctx.stroke();
      ctx.lineTo(S.W, y0 + h); ctx.lineTo(0, y0 + h); ctx.closePath(); ctx.fillStyle = alpha(T.accent2, 0.08); ctx.fill();
      const hy = y0 + h * (1 - head);
      ctx.beginPath(); ctx.arc(S.W - 2, hy, o.mini ? 3 : 5, 0, Math.PI * 2); ctx.fillStyle = head > 0.72 ? T.accent : T.accent2; ctx.fill();
      if (!o.mini) { ctx.font = '600 12px Archivo, sans-serif'; ctx.fillStyle = alpha(T.ink, 0.6); ctx.fillText('P(outage) ' + head.toFixed(2), S.W - 120, hy - 10); }
    }, setup);
  };

  /* ------------------------------------------------------------------
     DSM Gestion — une voix devient un document, puis un tampon.
     ------------------------------------------------------------------ */
  SIG.invoice = function (host, T, o) {
    return make(host, (ctx, S) => {
      const cycle = 9, tt = S.t % cycle;
      const dw = Math.min(S.W * (o.mini ? 0.5 : 0.34), 360), dh = dw * 1.3;
      const dx = o.mini ? S.W / 2 - dw / 2 + S.W * 0.12 : S.W * 0.72 - dw / 2, dy = o.mini ? (S.H - dh) / 2 : S.H * 0.1;
      // onde vocale à gauche
      const wx = o.mini ? S.W * 0.06 : S.W * 0.16, ww = o.mini ? S.W * 0.3 : S.W * 0.3, wy = o.mini ? S.H / 2 : S.H * 0.36;
      const speaking = tt < 4.5;
      const bars = o.mini ? 14 : 34;
      for (let i = 0; i < bars; i++) {
        const x = wx + (i / bars) * ww; const env = Math.exp(-Math.pow((i / bars - 0.5) * 2.2, 2));
        const hgt = speaking ? (8 + 60 * env * Math.abs(Math.sin(S.t * 9 + i * 0.7) * Math.sin(S.t * 2.3 + i))) : 6;
        ctx.fillStyle = alpha(T.accent2, speaking ? 0.9 : 0.35); roundRect(ctx, x, wy - hgt / 2, ww / bars * 0.55, hgt, 3); ctx.fill();
      }
      // flèche
      const ap = Math.min(1, Math.max(0, (tt - 1) / 1.2));
      ctx.strokeStyle = alpha(T.accent, 0.9); ctx.lineWidth = 2; ctx.setLineDash([8, 7]); ctx.lineDashOffset = -S.t * 40;
      ctx.beginPath(); ctx.moveTo(wx + ww + 16, wy); ctx.lineTo(wx + ww + 16 + (dx - wx - ww - 32) * ap, wy); ctx.stroke(); ctx.setLineDash([]);
      // document
      ctx.save(); ctx.translate(dx, dy);
      ctx.fillStyle = alpha(T.accent2, 0.96); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; ctx.fillRect(0, 0, dw, dh); ctx.shadowColor = 'transparent';
      ctx.fillStyle = T.accent; ctx.fillRect(dw * 0.08, dh * 0.07, dw * 0.3, dh * 0.03);
      ctx.fillStyle = alpha(T.bg, 0.35); ctx.fillRect(dw * 0.6, dh * 0.07, dw * 0.32, dh * 0.018); ctx.fillRect(dw * 0.6, dh * 0.1, dw * 0.22, dh * 0.018);
      const lines = 9;
      for (let i = 0; i < lines; i++) {
        const p = Math.min(1, Math.max(0, (tt - 1.6 - i * 0.32) / 0.45));
        if (p <= 0) break;
        const y = dh * 0.2 + i * dh * 0.065; const amount = i % 3 === 2;
        ctx.fillStyle = alpha(T.bg, amount ? 0.75 : 0.45);
        ctx.fillRect(dw * 0.08, y, dw * (amount ? 0.5 : 0.62) * p, dh * 0.02);
        if (amount) { ctx.fillStyle = T.accent; ctx.fillRect(dw * 0.72, y, dw * 0.2 * p, dh * 0.02); }
      }
      // total
      const tp = Math.min(1, Math.max(0, (tt - 5) / 0.5));
      if (tp > 0) { ctx.fillStyle = alpha(T.bg, 0.85); ctx.fillRect(dw * 0.08, dh * 0.84, dw * 0.84 * tp, 2); ctx.fillStyle = T.accent; ctx.fillRect(dw * 0.62, dh * 0.88, dw * 0.3 * tp, dh * 0.03); }
      // tampon de validation
      const sp = Math.min(1, Math.max(0, (tt - 6) / 0.45));
      if (sp > 0) {
        const s = 1.8 - 0.8 * ease(sp);
        ctx.save(); ctx.translate(dw * 0.3, dh * 0.72); ctx.rotate(-0.25); ctx.scale(s, s); ctx.globalAlpha = sp;
        ctx.strokeStyle = T.accent; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, dw * 0.13, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-dw * 0.06, 0); ctx.lineTo(-dw * 0.015, dw * 0.045); ctx.lineTo(dw * 0.065, -dw * 0.05); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    });
  };

  /* ------------------------------------------------------------------
     Triply — une route en pointillés entre des épingles, sur une carte.
     ------------------------------------------------------------------ */
  SIG.map = function (host, T, o) {
    let pins = [], land = [];
    function setup(S) {
      pins = [[0.12, 0.5], [0.32, 0.22], [0.52, 0.45], [0.72, 0.18], [0.9, 0.42]].map(([x, y]) => ({ x: x * S.W, y: y * S.H * (o.mini ? 1.5 : 1) }));
      land = Array.from({ length: 5 }, (_, i) => ({ x: rnd(0.1, 0.9) * S.W, y: rnd(0.2, 0.8) * S.H, r: rnd(60, 160) * (o.mini ? 0.5 : 1), k: i }));
    }
    function pt(i) { // point sur la polyligne lissée à l'abscisse i (0..pins.length-1)
      const a = pins[Math.floor(i)], b = pins[Math.min(pins.length - 1, Math.floor(i) + 1)]; const p = i - Math.floor(i);
      const my = (a.y + b.y) / 2 - 40; const x = (1 - p) * (1 - p) * a.x + 2 * (1 - p) * p * ((a.x + b.x) / 2) + p * p * b.x; const y = (1 - p) * (1 - p) * a.y + 2 * (1 - p) * p * my + p * p * b.y;
      return { x, y };
    }
    return make(host, (ctx, S) => {
      // terres
      land.forEach((l) => { ctx.beginPath(); for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.3) { const r = l.r * (0.8 + 0.2 * Math.sin(a * 3 + l.k) + 0.1 * Math.sin(a * 7)); const x = l.x + Math.cos(a) * r, y = l.y + Math.sin(a) * r * 0.7; a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.closePath(); ctx.fillStyle = alpha(T.bg2, 0.9); ctx.fill(); ctx.strokeStyle = alpha(T.ink, 0.12); ctx.stroke(); });
      // graticule
      ctx.strokeStyle = alpha(T.ink, 0.07); ctx.lineWidth = 1; for (let x = 0; x < S.W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, S.H); ctx.stroke(); } for (let y = 0; y < S.H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S.W, y); ctx.stroke(); }
      const cycle = 10, tt = S.t % cycle, prog = Math.min(pins.length - 1, (tt / 7) * (pins.length - 1));
      // route
      ctx.setLineDash([2, 7]); ctx.lineCap = 'round'; ctx.strokeStyle = T.accent; ctx.lineWidth = o.mini ? 2 : 3; ctx.beginPath();
      for (let i = 0; i <= prog; i += 0.03) { const p = pt(i); i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); }
      ctx.stroke(); ctx.setLineDash([]);
      // épingles
      pins.forEach((p, i) => {
        const vis = Math.min(1, Math.max(0, (prog - i + 0.3) / 0.3)); if (vis <= 0) return;
        const r = (o.mini ? 5 : 8) * ease(vis);
        const ring = ((tt * 1.2 + i) % 2) / 2; ctx.beginPath(); ctx.arc(p.x, p.y, r + ring * 22, 0, Math.PI * 2); ctx.strokeStyle = alpha(T.accent2, 0.5 * (1 - ring)); ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x, p.y - r * 1.2, r, 0, Math.PI * 2); ctx.fillStyle = T.accent2; ctx.fill();
        ctx.beginPath(); ctx.moveTo(p.x - r * 0.8, p.y - r * 0.8); ctx.lineTo(p.x, p.y + r * 0.6); ctx.lineTo(p.x + r * 0.8, p.y - r * 0.8); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y - r * 1.2, r * 0.4, 0, Math.PI * 2); ctx.fillStyle = T.bg; ctx.fill();
      });
      // voyageur
      const h = pt(prog); ctx.beginPath(); ctx.arc(h.x, h.y, o.mini ? 4 : 6, 0, Math.PI * 2); ctx.fillStyle = T.ink; ctx.fill();
    }, setup);
  };

  /* ------------------------------------------------------------------
     Objectif Prime — une courbe qui descend, un anneau qui se remplit.
     ------------------------------------------------------------------ */
  SIG.curve = function (host, T, o) {
    const pts = Array.from({ length: 14 }, (_, i) => ({ x: i / 13, y: 0.15 + ease(i / 13) * 0.72 + Math.sin(i * 2.3) * 0.05 }));
    return make(host, (ctx, S) => {
      const cycle = 8, tt = S.t % cycle, prog = Math.min(1, tt / 4.5);
      const m = o.mini ? 10 : S.W * 0.08, w = (o.mini ? S.W - 2 * m : S.W * 0.56), top = o.mini ? S.H * 0.1 : S.H * 0.12, h = o.mini ? S.H * 0.8 : S.H * 0.42;
      // grille
      ctx.strokeStyle = alpha(T.ink, 0.08); ctx.lineWidth = 1; for (let i = 0; i <= 4; i++) { const y = top + (h * i) / 4; ctx.beginPath(); ctx.moveTo(m, y); ctx.lineTo(m + w, y); ctx.stroke(); }
      // objectif
      ctx.setLineDash([6, 6]); ctx.strokeStyle = alpha(T.accent2, 0.8); ctx.beginPath(); ctx.moveTo(m, top + h * 0.9); ctx.lineTo(m + w, top + h * 0.9); ctx.stroke(); ctx.setLineDash([]);
      // courbe
      const X = (p) => m + p.x * w, Y = (p) => top + p.y * h;
      ctx.beginPath(); ctx.moveTo(X(pts[0]), Y(pts[0]));
      const n = prog * (pts.length - 1);
      for (let i = 1; i < pts.length; i++) {
        if (i > n + 1) break;
        const a = pts[i - 1], b = pts[i], p = Math.min(1, n - (i - 1)); if (p <= 0) break;
        const cx1 = X(a) + (X(b) - X(a)) * 0.5, bx = X(a) + (X(b) - X(a)) * p, by = Y(a) + (Y(b) - Y(a)) * ease(p);
        ctx.bezierCurveTo(cx1, Y(a), cx1, by, bx, by);
      }
      ctx.strokeStyle = T.accent; ctx.lineWidth = o.mini ? 2.5 : 4; ctx.lineCap = 'round'; ctx.stroke();
      ctx.lineTo(X(pts[Math.min(pts.length - 1, Math.floor(n))]) + (n % 1) * (w / 13), top + h); ctx.lineTo(X(pts[0]), top + h); ctx.closePath(); ctx.fillStyle = alpha(T.accent, 0.12); ctx.fill();
      pts.forEach((p, i) => { if (i > n) return; ctx.beginPath(); ctx.arc(X(p), Y(p), o.mini ? 3 : 5, 0, Math.PI * 2); ctx.fillStyle = T.bg; ctx.fill(); ctx.strokeStyle = T.accent; ctx.lineWidth = 2; ctx.stroke(); });
      // anneau
      if (!o.mini) {
        const cx = S.W * 0.8, cy = S.H * 0.34, r = Math.min(S.H * 0.2, 110);
        ctx.lineWidth = 14; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = alpha(T.ink, 0.08); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * prog * 0.78); ctx.strokeStyle = T.accent2; ctx.stroke();
        ctx.font = '800 ' + r * 0.5 + 'px Outfit, sans-serif'; ctx.fillStyle = T.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('−' + Math.round(prog * 7.8) + '%', cx, cy); ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
      }
    });
  };

  /* ------------------------------------------------------------------
     EcoTracker — des feuilles qui tombent, des observations qui apparaissent.
     ------------------------------------------------------------------ */
  SIG.leaves = function (host, T, o) {
    let leaves = [], obs = [];
    function setup(S) {
      leaves = Array.from({ length: o.mini ? 14 : 40 }, () => ({ x: Math.random() * S.W, y: Math.random() * S.H, s: rnd(5, 13) * (o.mini ? 0.6 : 1), v: rnd(12, 30), a: Math.random() * 6, w: rnd(0.4, 1.2), hue: Math.random() }));
      obs = Array.from({ length: 7 }, () => ({ x: rnd(0.08, 0.92) * S.W, y: rnd(0.15, 0.85) * S.H, t0: rnd(0, 9) }));
    }
    return make(host, (ctx, S) => {
      // courbes de niveau
      ctx.strokeStyle = alpha(T.ink, 0.07); ctx.lineWidth = 1;
      for (let k = 0; k < 6; k++) { ctx.beginPath(); for (let x = 0; x <= S.W; x += 10) { const y = S.H * (0.15 + k * 0.14) + Math.sin(x * 0.01 + k) * 18 + Math.sin(x * 0.027 + k * 2) * 8; x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
      // observations
      obs.forEach((ob) => { const p = ((S.t - ob.t0) % 9 + 9) % 9; if (p > 2.5) return; const e = Math.min(1, p / 0.4); ctx.beginPath(); ctx.arc(ob.x, ob.y, 4 + e * 2, 0, Math.PI * 2); ctx.fillStyle = T.accent; ctx.fill(); ctx.beginPath(); ctx.arc(ob.x, ob.y, 6 + p * 14, 0, Math.PI * 2); ctx.strokeStyle = alpha(T.accent, Math.max(0, 0.6 - p * 0.25)); ctx.lineWidth = 1.5; ctx.stroke(); });
      // feuilles
      leaves.forEach((l) => {
        l.y += l.v * 0.016; l.x += Math.sin(S.t * l.w + l.a) * 0.4; l.a += 0.01;
        if (l.y > S.H + 20) { l.y = -20; l.x = Math.random() * S.W; }
        ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(Math.sin(S.t * l.w + l.a) * 0.8 + l.a);
        ctx.beginPath(); ctx.ellipse(0, 0, l.s, l.s * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = l.hue < 0.7 ? alpha(T.accent, 0.55) : alpha(T.accent2, 0.6); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-l.s, 0); ctx.lineTo(l.s, 0); ctx.strokeStyle = alpha(T.bg, 0.5); ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      });
    }, setup);
  };

  /* ------------------------------------------------------------------
     MLOps — un pipeline en quatre étapes, un paquet qui circule.
     ------------------------------------------------------------------ */
  SIG.dag = function (host, T, o) {
    const names = ['prepare', 'train', 'evaluate', 'serve'];
    return make(host, (ctx, S) => {
      const n = 4, m = o.mini ? S.W * 0.1 : S.W * 0.14, gap = (S.W - 2 * m) / (n - 1), y = S.H * (o.mini ? 0.5 : 0.56), r = o.mini ? 9 : 26;
      const cycle = 7, tt = S.t % cycle, prog = Math.min(n - 1, (tt / 4.5) * (n - 1));
      // fond : points
      ctx.fillStyle = alpha(T.ink, 0.08); for (let x = 0; x < S.W; x += 24) for (let yy = 0; yy < S.H; yy += 24) ctx.fillRect(x, yy, 1.5, 1.5);
      // arêtes
      for (let i = 0; i < n - 1; i++) {
        const x1 = m + i * gap + r, x2 = m + (i + 1) * gap - r; const done = prog >= i + 1, active = prog > i && prog < i + 1;
        ctx.setLineDash([6, 6]); ctx.lineDashOffset = -S.t * 30; ctx.strokeStyle = done ? T.accent2 : active ? T.accent : alpha(T.ink, 0.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.setLineDash([]);
        if (active) { const p = prog - i; ctx.beginPath(); ctx.arc(x1 + (x2 - x1) * p, y, 5, 0, Math.PI * 2); ctx.fillStyle = T.accent; ctx.fill(); }
      }
      // nœuds
      for (let i = 0; i < n; i++) {
        const x = m + i * gap; const state = prog >= i + 0.98 || (i === n - 1 && tt > 4.4) ? 2 : prog >= i ? 1 : 0;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = T.bg; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = state === 2 ? T.accent2 : state === 1 ? T.accent : alpha(T.ink, 0.3); ctx.stroke();
        if (state === 1) { ctx.beginPath(); ctx.arc(x, y, r * 0.55, S.t * 6, S.t * 6 + 4); ctx.strokeStyle = T.accent; ctx.lineWidth = 3; ctx.stroke(); }
        if (state === 2) { ctx.beginPath(); ctx.moveTo(x - r * 0.4, y); ctx.lineTo(x - r * 0.1, y + r * 0.3); ctx.lineTo(x + r * 0.45, y - r * 0.35); ctx.strokeStyle = T.accent2; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
        if (!o.mini) { ctx.font = '600 13px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.fillStyle = alpha(T.ink, state ? 0.9 : 0.45); ctx.fillText(names[i], x, y + r + 24); ctx.textAlign = 'start'; }
      }
      if (!o.mini) { ctx.font = '500 12px "JetBrains Mono", monospace'; ctx.fillStyle = alpha(T.ink, 0.5); ctx.fillText('$ dvc repro' + (tt < 4.5 ? '  …' : '  ✓ pipeline up to date'), m, y - r - 30); }
    });
  };
})();
