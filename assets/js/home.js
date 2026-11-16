/* Page d'accueil : préloader, souffle du hero, cartes empilées, timeline, ney jouable. */
(function () {
  'use strict';
  const APP = window.APP || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    const hasGsap = !!window.gsap;

    /* ====================================================================
       Souffle du hero : des rubans qui ondulent, un souffle qui devient signal.
       ==================================================================== */
    const breath = document.getElementById('breath');
    if (breath) {
      const ctx = breath.getContext('2d');
      let W = 0, H = 0, dpr = 1, t = 0, mx = -1, my = -1, tx = -1, ty = -1, running = true;
      const ribbons = Array.from({ length: 7 }, (_, i) => ({
        y: 0.25 + i * 0.09, amp: 18 + i * 7, k: 0.0045 + i * 0.0009, sp: 0.5 + i * 0.12, ph: i * 1.3,
        col: i % 3 === 0 ? [233, 162, 59] : i % 3 === 1 ? [94, 234, 212] : [242, 239, 232], a: i % 3 === 2 ? 0.07 : 0.16,
      }));
      const motes = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.8, v: 0.01 + Math.random() * 0.03, d: Math.random() * 6 }));
      function resize() { dpr = Math.min(window.devicePixelRatio || 1, 2); const r = breath.getBoundingClientRect(); W = r.width; H = r.height; breath.width = W * dpr; breath.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
      new ResizeObserver(resize).observe(breath); resize();
      window.addEventListener('mousemove', (e) => { const r = breath.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; }, { passive: true });
      let last = 0;
      function frame(now) {
        if (!running) return;
        const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now; if (!reduced) t += dt;
        mx += ((tx < 0 ? W * 0.6 : tx) - mx) * 0.05; my += ((ty < 0 ? H * 0.5 : ty) - my) * 0.05;
        ctx.clearRect(0, 0, W, H);
        // motes
        motes.forEach((m) => {
          const x = ((m.x + t * m.v) % 1) * W, y = (m.y + Math.sin(t * 0.4 + m.d) * 0.01) * H;
          ctx.fillStyle = `rgba(233,162,59,${0.25 * m.s / 2.4})`; ctx.beginPath(); ctx.arc(x, y, m.s, 0, Math.PI * 2); ctx.fill();
        });
        // rubans
        ribbons.forEach((rb, i) => {
          const baseY = H * rb.y;
          ctx.beginPath();
          for (let x = -20; x <= W + 20; x += 6) {
            const dx = x - mx, dy = baseY - my, dist = Math.sqrt(dx * dx + dy * dy);
            const push = Math.exp(-dist * dist / (2 * 160 * 160)) * 60 * (dy < 0 ? -1 : 1);
            const y = baseY + Math.sin(x * rb.k + t * rb.sp + rb.ph) * rb.amp + Math.sin(x * rb.k * 2.7 - t * rb.sp * 0.7 + rb.ph) * rb.amp * 0.35 + push + Math.sin(t * 0.3 + i) * 10;
            x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          const g = ctx.createLinearGradient(0, 0, W, 0);
          g.addColorStop(0, `rgba(${rb.col},0)`); g.addColorStop(0.35, `rgba(${rb.col},${rb.a})`); g.addColorStop(0.7, `rgba(${rb.col},${rb.a * 0.8})`); g.addColorStop(1, `rgba(${rb.col},0)`);
          ctx.strokeStyle = g; ctx.lineWidth = 1.2 + (i % 3 === 0 ? 0.8 : 0); ctx.stroke();
        });
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      new IntersectionObserver((en) => { running = en[0].isIntersecting; if (running) { last = performance.now(); requestAnimationFrame(frame); } }).observe(breath);
    }

    /* ====================================================================
       Préloader puis entrée du hero.
       ==================================================================== */
    const loader = document.getElementById('loader');
    const heroIntro = () => {
      if (!hasGsap) { document.querySelectorAll('.hero__kicker,.hero__lead,.hero__status,.hero__cta,.hero__photo,.hero__scroll').forEach((e) => (e.style.opacity = 1)); document.querySelectorAll('.hero__w').forEach((e) => (e.style.transform = 'none')); return; }
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero__w', { y: 0, rotate: 0, duration: 1.2, stagger: 0.12 }, 0)
        .to('.hero__kicker', { opacity: 1, duration: .8 }, 0.2)
        .to('.hero__lead', { opacity: 1, y: 0, duration: 1, startAt: { y: 20 } }, 0.6)
        .to('.hero__status', { opacity: 1, y: 0, duration: .9, startAt: { y: 16 } }, 0.8)
        .to('.hero__cta', { opacity: 1, y: 0, duration: .9, startAt: { y: 16 } }, 0.95)
        .to('.hero__photo', { opacity: 1, y: 0, scale: 1, duration: 1.4, startAt: { y: 40, scale: .96 } }, 0.3)
        .to('.hero__scroll', { opacity: 1, duration: 1 }, 1.4);
    };
    if (loader && hasGsap && !reduced && !sessionStorage.getItem('tm-loaded')) {
      document.body.style.overflow = 'hidden';
      if (APP.lenis) APP.lenis.stop();
      const count = document.getElementById('loaderCount'), bar = document.getElementById('loaderBar');
      const prog = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => { loader.remove(); document.body.style.overflow = ''; if (APP.lenis) APP.lenis.start(); sessionStorage.setItem('tm-loaded', '1'); } });
      tl.to('.loader__name span', { y: 0, opacity: 1, duration: .9, stagger: .035, ease: 'power4.out' }, 0)
        .to(prog, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(prog.v)).padStart(2, '0'); bar.style.transform = 'scaleX(' + prog.v / 100 + ')'; } }, 0.2)
        .to('.loader__name span', { y: '-110%', opacity: 0, duration: .6, stagger: .02, ease: 'power3.in' }, 1.7)
        .to('.loader__count, .loader__bar', { opacity: 0, duration: .3 }, 1.9)
        .to(loader, { yPercent: -100, duration: .9, ease: 'power4.inOut' }, 2.05)
        .add(heroIntro, 2.35);
    } else {
      if (loader) loader.remove();
      heroIntro();
    }

    /* ---------- Parallaxe de la photo ---------- */
    const photo = document.getElementById('heroPhoto');
    if (photo && fine && !reduced && hasGsap) {
      const frame = photo.querySelector('.hero__frame');
      const hero = document.querySelector('.hero');
      hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        gsap.to(frame, { rotateY: px * 10, rotateX: -py * 10, x: px * 14, y: py * 14, duration: 1, ease: 'power3.out', transformPerspective: 900 });
        photo.querySelectorAll('.hero__badge').forEach((b, i) => gsap.to(b, { x: px * (18 + i * 8), y: py * (18 + i * 8), duration: 1.2, ease: 'power3.out' }));
      });
      hero.addEventListener('mouseleave', () => { gsap.to(frame, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 1.2 }); gsap.to('.hero__badge', { x: 0, y: 0, duration: 1.2 }); });
    }

    /* ====================================================================
       Marquee : vitesse liée au défilement.
       ==================================================================== */
    const mq = document.getElementById('marquee');
    if (mq && !reduced) {
      mq.innerHTML += mq.innerHTML; // boucle
      let x = 0, vel = 0, lastY = window.scrollY;
      const half = () => mq.scrollWidth / 2;
      window.addEventListener('scroll', () => { const y = window.scrollY; vel += (y - lastY) * 0.08; lastY = y; }, { passive: true });
      (function loop() {
        vel *= 0.92; x -= 0.6 + Math.min(6, Math.abs(vel)) * Math.sign(vel || 1) * (vel < 0 ? 1 : 1);
        const h = half(); if (x <= -h) x += h; if (x > 0) x -= h;
        mq.style.transform = `translate3d(${x}px,0,0)`; requestAnimationFrame(loop);
      })();
    }

    /* ====================================================================
       Manifeste : inclinaison 3D et reflet.
       ==================================================================== */
    if (fine && !reduced && hasGsap) {
      document.querySelectorAll('.tilt').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
          gsap.to(card, { rotateY: (px - .5) * 8, rotateX: -(py - .5) * 8, duration: .6, ease: 'power3.out', transformPerspective: 800 });
        });
        card.addEventListener('mouseleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1,.5)' }));
      });
    }

    /* ====================================================================
       Projets : cartes empilées qui se tassent quand la suivante arrive.
       ==================================================================== */
    const cards = [...document.querySelectorAll('.card')];
    cards.forEach((card, i) => {
      const canvas = card.querySelector('.card__sig');
      const sig = card.dataset.sig;
      const T = { bg: card.style.getPropertyValue('--pbg').trim(), bg2: card.style.getPropertyValue('--pbg2').trim(), ink: card.style.getPropertyValue('--pink').trim(), muted: card.style.getPropertyValue('--pmuted').trim(), accent: card.style.getPropertyValue('--pac').trim(), accent2: card.style.getPropertyValue('--pac2').trim() };
      let anim = null;
      if (window.SIG && SIG[sig] && canvas) {
        anim = SIG[sig](canvas, T, { mini: false });
        new IntersectionObserver((en) => { en[0].isIntersecting ? anim.start() : anim.stop(); }, { threshold: 0.05 }).observe(card);
      }
      if (hasGsap && window.ScrollTrigger && !reduced && i < cards.length - 1) {
        const link = card.querySelector('.card__link');
        gsap.fromTo(link, { scale: 1, filter: 'brightness(1)' }, {
          scale: 0.92, filter: 'brightness(.55)', ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top+=100', scrub: true },
        });
      }
    });

    /* ====================================================================
       Parcours : le rail se remplit au défilement.
       ==================================================================== */
    const tl = document.querySelector('.tl'), prog = document.querySelector('.tl__progress');
    if (tl && prog && hasGsap && window.ScrollTrigger && !reduced) {
      gsap.to(prog, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 } });
    } else if (prog) prog.style.transform = 'scaleY(1)';

    /* ====================================================================
       Navigation : section active.
       ==================================================================== */
    const links = [...document.querySelectorAll('.nav__links a')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (sections.length) {
      const so = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id)); });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach((s) => so.observe(s));
    }

    /* ====================================================================
       Le ney : un instrument qui se joue à la souris (Web Audio).
       ==================================================================== */
    const ney = document.getElementById('ney');
    if (ney) {
      const FREQ = { 'E4': 329.63, 'F4': 349.23, 'G4': 392.0, 'A4': 440.0, 'Bb4': 466.16, 'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46 };
      let ac = null, master = null, noiseBuf = null, current = null, playing = false;
      function audio() {
        if (ac) return ac;
        ac = new (window.AudioContext || window.webkitAudioContext)();
        master = ac.createGain(); master.gain.value = 0.5;
        const comp = ac.createDynamicsCompressor(); master.connect(comp); comp.connect(ac.destination);
        // souffle : bruit filtré
        const len = ac.sampleRate * 2; noiseBuf = ac.createBuffer(1, len, ac.sampleRate); const d = noiseBuf.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.11; }
        return ac;
      }
      function note(name, dur, when) {
        const c = audio(); const f = FREQ[name] || 440; const t0 = when || c.currentTime;
        const g = c.createGain(); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.9, t0 + 0.09); g.gain.setValueAtTime(0.9, t0 + dur - 0.15); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600; lp.Q.value = 0.7;
        g.connect(lp); lp.connect(master);
        // deux oscillateurs légèrement désaccordés + vibrato
        const vib = c.createOscillator(); vib.frequency.value = 5.2; const vg = c.createGain(); vg.gain.value = 3.5; vib.connect(vg);
        [[0, 'triangle', 0.55], [1.003, 'sine', 0.35], [2.0, 'sine', 0.08]].forEach(([mult, type, amp]) => {
          const o = c.createOscillator(); o.type = type; o.frequency.value = f * mult; vg.connect(o.detune);
          const og = c.createGain(); og.gain.value = amp; o.connect(og); og.connect(g); o.start(t0); o.stop(t0 + dur + 0.05);
        });
        vib.start(t0); vib.stop(t0 + dur + 0.05);
        // souffle
        const n = c.createBufferSource(); n.buffer = noiseBuf; n.loop = true; const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f * 2; bp.Q.value = 2.5;
        const ng = c.createGain(); ng.gain.setValueAtTime(0, t0); ng.gain.linearRampToValueAtTime(0.35, t0 + 0.05); ng.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
        n.connect(bp); bp.connect(ng); ng.connect(master); n.start(t0); n.stop(t0 + dur + 0.05);
        return t0 + dur;
      }
      const holes = [...ney.querySelectorAll('.hole')];
      function light(name, dur) {
        const h = holes.find((x) => x.dataset.note === name); if (!h) return;
        h.classList.add('is-on'); setTimeout(() => h.classList.remove('is-on'), dur * 1000);
        emit(dur);
      }
      holes.forEach((h) => {
        const play = () => { if (current === h) return; current = h; note(h.dataset.note, 0.9); light(h.dataset.note, 0.9); setTimeout(() => { if (current === h) current = null; }, 300); };
        h.addEventListener('mouseenter', () => { if (fine) play(); });
        h.addEventListener('click', play);
        h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
      });
      // phrase : un petit taqsim en Bayati sur ré
      const btn = document.getElementById('neyPlay');
      if (btn) {
        const phrase = [['D5', .5], ['Eb5', .35], ['D5', .35], ['C5', .5], ['Bb4', .4], ['A4', .7], ['Bb4', .3], ['C5', .3], ['D5', .9], ['C5', .3], ['Bb4', .3], ['A4', .5], ['G4', .5], ['F4', .4], ['E4', .9], ['F4', .35], ['G4', .35], ['A4', 1.4]];
        const label = btn.textContent;
        btn.addEventListener('click', () => {
          if (playing) return; playing = true; btn.textContent = '…'; btn.disabled = true;
          const c = audio(); if (c.state === 'suspended') c.resume();
          let when = c.currentTime + 0.05, elapsed = 50;
          phrase.forEach(([n, d]) => { note(n, d + 0.1, when); setTimeout(() => light(n, d), elapsed); when += d; elapsed += d * 1000; });
          setTimeout(() => { playing = false; btn.textContent = label; btn.disabled = false; }, elapsed + 200);
        });
      }
      // particules de souffle sur le canvas
      const nb = document.getElementById('neyBreath');
      let parts = [];
      function emit(dur) { const n = Math.round(dur * 40); for (let i = 0; i < n; i++) parts.push({ x: 0.06, y: 0.5 + (Math.random() - .5) * 0.08, vx: 0.25 + Math.random() * 0.35, vy: (Math.random() - .5) * 0.06, life: 1, s: 1 + Math.random() * 2.5, delay: Math.random() * dur * 0.7 }); }
      if (nb) {
        const nctx = nb.getContext('2d'); let W = 0, H = 0, dpr = 1, last = 0;
        const resize = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); const r = nb.getBoundingClientRect(); W = r.width; H = r.height; nb.width = W * dpr; nb.height = H * dpr; nctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
        new ResizeObserver(resize).observe(nb); resize();
        (function loop(now) {
          const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
          nctx.clearRect(0, 0, W, H);
          parts = parts.filter((p) => p.life > 0);
          parts.forEach((p) => {
            if (p.delay > 0) { p.delay -= dt; return; }
            p.x += p.vx * dt; p.y += p.vy * dt + Math.sin(now * 0.004 + p.s) * 0.0004; p.life -= dt * 0.6; p.vx *= 0.995;
            nctx.fillStyle = `rgba(233,162,59,${0.5 * p.life})`; nctx.beginPath(); nctx.arc(p.x * W, p.y * H, p.s * (1.2 - p.life * 0.6), 0, Math.PI * 2); nctx.fill();
          });
          requestAnimationFrame(loop);
        })(0);
      }
    }
  });
})();
