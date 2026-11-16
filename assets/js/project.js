/* Pages projet : animation signature, titre lettre à lettre, galerie horizontale, compteurs. */
(function () {
  'use strict';
  const APP = window.APP || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    const hasGsap = !!window.gsap && !!window.ScrollTrigger;
    const cs = getComputedStyle(document.documentElement);
    const T = { bg: cs.getPropertyValue('--bg').trim(), bg2: cs.getPropertyValue('--bg2').trim(), ink: cs.getPropertyValue('--ink').trim(), muted: cs.getPropertyValue('--muted').trim(), accent: cs.getPropertyValue('--accent').trim(), accent2: cs.getPropertyValue('--accent2').trim() };

    /* ---------- Signature ---------- */
    const host = document.getElementById('sig');
    if (host && window.SIG && SIG[host.dataset.sig]) {
      const anim = SIG[host.dataset.sig](host, T, { mini: false });
      anim.start();
      new IntersectionObserver((en) => { en[0].isIntersecting ? anim.start() : anim.stop(); }).observe(host);
      if (hasGsap && !reduced) gsap.to(host, { yPercent: 25, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.phero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    /* ---------- Entrée du titre ---------- */
    const title = document.getElementById('pTitle');
    if (title) {
      if (hasGsap && !reduced && APP.splitChars) {
        const chars = APP.splitChars(title);
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });
        tl.to(chars, { y: 0, duration: 1.1, stagger: { each: 0.025, from: 'start' } }, 0)
          .to('.phero__meta', { opacity: 1, duration: .8 }, 0.3)
          .to('.phero__sub', { opacity: 1, y: 0, duration: 1, startAt: { y: 18 } }, 0.7)
          .to('.phero__tags', { opacity: 1, y: 0, duration: .9, startAt: { y: 14 } }, 0.9);
      } else {
        document.querySelectorAll('.phero__meta,.phero__sub,.phero__tags').forEach((e) => (e.style.opacity = 1));
      }
    }

    /* ---------- Galerie horizontale épinglée ---------- */
    const gal = document.getElementById('gallery');
    if (gal && hasGsap && !reduced && window.matchMedia('(min-width: 900px)').matches) {
      const sec = gal.closest('.pgallery');
      const dist = () => gal.scrollWidth - window.innerWidth + 40;
      gsap.to(gal, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top 12%', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
      gal.querySelectorAll('.pgallery__item').forEach((it) => it.classList.add('is-in'));
    } else if (gal) {
      gal.style.width = 'auto'; gal.style.overflowX = 'auto'; gal.style.scrollSnapType = 'x mandatory';
      gal.querySelectorAll('.pgallery__item').forEach((it) => { it.style.scrollSnapAlign = 'start'; it.classList.add('is-in'); });
    }

    /* ---------- Compteurs ---------- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return; io.unobserve(en.target);
          const el = en.target, raw = el.dataset.count;
          const m = raw.match(/-?\d[\d\s ]*(?:[.,]\d+)?/); if (!m) return;
          const numStr = m[0].replace(/[\s ]/g, ''); const decimals = (numStr.split(/[.,]/)[1] || '').length; const target = parseFloat(numStr.replace(',', '.'));
          const prefix = raw.slice(0, m.index), suffix = raw.slice(m.index + m[0].length);
          const sep = numStr.includes(',') ? ',' : '.';
          const fmt = (v) => { let s = v.toFixed(decimals).replace('.', sep); if (!decimals && v >= 1000) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return prefix + s + suffix; };
          if (!hasGsap || reduced) { el.textContent = fmt(target); return; }
          const o = { v: 0 }; gsap.to(o, { v: target, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v)) });
        });
      }, { threshold: 0.5 });
      counters.forEach((c) => io.observe(c));
    }
  });
})();
