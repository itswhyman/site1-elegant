/* SITE 1 — ELEGANT MOTION ENGINE */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const isMobile = window.matchMedia('(max-width: 780px)').matches;

  /* -------- 1. HERO — Title line split + staggered reveal -------- */
  function initHero() {
    const titleEl = document.getElementById('hero-title');
    const content = document.querySelector('.hero-content');
    const eyebrow = document.querySelector('.hero-eyebrow');
    const sub = document.getElementById('hero-sub');
    const cta = document.getElementById('hero-cta');
    const header = document.getElementById('header');

    // Split title into lines (approximation: word-wrap aware)
    if (titleEl && !titleEl.querySelector('.line-mask')) {
      const text = titleEl.textContent.trim();
      const words = text.split(/\s+/);
      titleEl.innerHTML = `<span class="line-mask"><span class="line-inner">${words.slice(0, Math.ceil(words.length / 2)).join(' ')}</span></span><span class="line-mask"><span class="line-inner">${words.slice(Math.ceil(words.length / 2)).join(' ')}</span></span>`;
    }

    requestAnimationFrame(() => {
      if (header) header.classList.add('is-loaded');
      if (content) content.classList.add('is-visible');
    });

    setTimeout(() => {
      titleEl?.querySelectorAll('.line-inner').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 180);
      });
      setTimeout(() => eyebrow?.classList.add('is-visible'), 500);
      setTimeout(() => sub?.classList.add('is-visible'), 700);
      setTimeout(() => cta?.classList.add('is-visible'), 900);
    }, 120);
  }

  /* -------- 2. Scroll reveal with stagger -------- */
  function initScrollReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    // Plain reveals
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    // Services — staggered
    document.querySelectorAll('.service-card').forEach((el, i) => {
      el.style.transitionDelay = (i * 110) + 'ms';
      io.observe(el);
    });

    // Gallery — staggered clip reveal
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      el.style.transitionDelay = (i * 130) + 'ms';
      io.observe(el);
    });

    // Testimonials
    document.querySelectorAll('.testi-card').forEach((el, i) => {
      el.style.transitionDelay = (i * 140) + 'ms';
      io.observe(el);
    });

    // About features list (triggers child cascade via CSS)
    const featList = document.getElementById('about-features');
    if (featList) io.observe(featList);
  }

  /* -------- 3. Subtle parallax on hero bg -------- */
  function initParallax() {
    if (isMobile) return;
    const heroBg = document.getElementById('hero-bg');
    if (!heroBg) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = `translateY(${y * 0.22}px) scale(1.06)`;
        }
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* -------- 4. Section label crossfade on viewport enter -------- */
  function initLabelFlourish() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.letterSpacing = '0.24em';
          entry.target.style.transition = 'letter-spacing 1.4s cubic-bezier(0.16,1,0.3,1)';
          setTimeout(() => { entry.target.style.letterSpacing = '0.18em'; }, 30);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.section-label').forEach(el => io.observe(el));
  }

  /* -------- 5. Nav underline slide -------- */
  function initNavUnderline() {
    document.querySelectorAll('.nav--horizontal a').forEach(link => {
      link.style.position = 'relative';
      link.style.transition = 'color 0.4s ease';
    });
  }

  /* -------- Boot -------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    initHero();
    // Defer observers slightly so public.js dynamic content has settled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initScrollReveals();
        initParallax();
        initLabelFlourish();
        initNavUnderline();
      });
    });
  }
})();