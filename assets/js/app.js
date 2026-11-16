/* Comportements communs : défilement doux, curseur, navigation, transitions, révélations. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const APP = (window.APP = { reduced, fine, lenis: null });

  /* ---------- Découpage de texte ---------- */
  APP.splitWords = function (el) {
    if (el.dataset.split) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const outer = document.createElement('span'); outer.className = 'w'; outer.style.setProperty('--wi', i);
      const inner = document.createElement('span'); inner.textContent = w; outer.appendChild(inner);
      el.appendChild(outer); if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.dataset.split = '1';
  };
  APP.splitChars = function (el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const chars = [];
    words.forEach((w, i) => {
      const wrd = document.createElement('span'); wrd.className = 'wrd';
      [...w].forEach((c) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; wrd.appendChild(s); chars.push(s); });
      el.appendChild(wrd); if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return chars;
  };

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    const hasGsap = !!window.gsap;
    if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    /* ---------- Défilement doux (Lenis) ---------- */
    if (!reduced && window.Lenis && fine) {
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      APP.lenis = lenis;
      if (hasGsap) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
      }
      // ancres
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href'); if (id.length < 2) return;
          const target = document.querySelector(id); if (!target) return;
          e.preventDefault(); lenis.scrollTo(target, { offset: -60, duration: 1.4 });
          history.replaceState(null, '', id);
        });
      });
    }
    APP.scrollTo = (target) => { if (APP.lenis) APP.lenis.scrollTo(target, { offset: -60 }); else target.scrollIntoView({ behavior: 'smooth' }); };

    /* ---------- Barre de progression ---------- */
    const bar = document.querySelector('.progress span');
    const nav = document.querySelector('.nav, .pnav');
    let lastY = 0;
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      if (nav) {
        nav.classList.toggle('is-scrolled', y > 24);
        nav.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && !document.body.classList.contains('menu-open'));
      }
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* ---------- Menu mobile ---------- */
    const burger = document.querySelector('.nav__burger'), mnav = document.getElementById('mnav');
    if (burger && mnav) {
      const close = () => { burger.setAttribute('aria-expanded', 'false'); mnav.classList.remove('is-open'); mnav.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open'); if (APP.lenis) APP.lenis.start(); };
      burger.addEventListener('click', () => {
        const open = burger.getAttribute('aria-expanded') !== 'true';
        if (!open) return close();
        burger.setAttribute('aria-expanded', 'true'); mnav.classList.add('is-open'); mnav.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open'); if (APP.lenis) APP.lenis.stop();
      });
      mnav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setTimeout(close, 50)));
    }

    /* ---------- Curseur ---------- */
    const cur = document.querySelector('.cursor');
    if (cur && fine && !reduced) {
      const dot = cur.querySelector('.cursor__dot'), ring = cur.querySelector('.cursor__ring'), label = cur.querySelector('.cursor__label');
      let mx = -100, my = -100, rx = -100, ry = -100, shown = false;
      cur.classList.add('is-hidden');
      window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; if (!shown) { shown = true; rx = mx; ry = my; cur.classList.remove('is-hidden'); } }, { passive: true });
      document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
      document.addEventListener('mouseenter', () => cur.classList.remove('is-hidden'));
      window.addEventListener('mousedown', () => cur.classList.add('is-down'));
      window.addEventListener('mouseup', () => cur.classList.remove('is-down'));
      (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; dot.style.transform = `translate(${mx}px,${my}px)`; ring.style.transform = `translate(${rx}px,${ry}px)`; label.style.left = rx + 'px'; label.style.top = ry + 'px'; requestAnimationFrame(loop); })();
      const viewLabel = document.documentElement.lang === 'en' ? 'View' : 'Voir';
      document.addEventListener('mouseover', (e) => {
        const t = e.target.closest('[data-cursor], a, button');
        cur.classList.remove('is-link', 'is-view');
        if (!t) return;
        const kind = t.dataset.cursor || 'link';
        cur.classList.add(kind === 'view' ? 'is-view' : 'is-link');
        label.textContent = kind === 'view' ? viewLabel : '';
      });
    }

    /* ---------- Boutons magnétiques ---------- */
    if (fine && !reduced && hasGsap) {
      document.querySelectorAll('.magnetic').forEach((el) => {
        const strength = 0.35;
        el.addEventListener('mousemove', (e) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: .6, ease: 'power3.out' });
        });
        el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1, .4)' }));
      });
    }

    /* ---------- Révélations au défilement ---------- */
    document.querySelectorAll('.reveal-words').forEach(APP.splitWords);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal, .reveal-words').forEach((el) => io.observe(el));

    /* ---------- Transitions de page (voile) ---------- */
    const veil = document.querySelector('.veil');
    if (veil && !reduced && hasGsap) {
      gsap.set(veil, { scaleY: 0, transformOrigin: 'top' });
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]'); if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank' || /^https?:/i.test(href) || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        gsap.to(veil, { scaleY: 1, transformOrigin: 'bottom', duration: .55, ease: 'power3.inOut', onComplete: () => { window.location.href = href; } });
      });
      window.addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(veil, { scaleY: 0 }); });
    }

    /* ---------- Copie de l'e-mail ---------- */
    document.querySelectorAll('[data-copy]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (!navigator.clipboard) return;
        e.preventDefault();
        navigator.clipboard.writeText(el.dataset.copy).then(() => {
          const hint = el.querySelector('.contact__mail-hint'); if (!hint) { window.location.href = el.href; return; }
          const old = hint.textContent; hint.textContent = document.documentElement.lang === 'en' ? 'Copied ✓' : 'Copié ✓';
          setTimeout(() => { hint.textContent = old; }, 1800);
        }).catch(() => { window.location.href = el.href; });
      });
    });
  });
})();
