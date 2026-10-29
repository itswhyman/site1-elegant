(function () {
  const cfg = Storage.load();
  Object.keys(cfg.colors || {}).forEach(k => {
    const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
    document.documentElement.style.setProperty('--' + cssKey, cfg.colors[k]);
  });

  document.title = cfg.seo?.title || cfg.business.name;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = cfg.seo?.description || cfg.business.tagline;

  // Logo — works for text OR image
  const logoEl = document.getElementById('logo');
  if (cfg.business.logoImage) {
    logoEl.innerHTML = `<img src="${cfg.business.logoImage}" alt="${cfg.business.name}">`;
  } else {
    logoEl.textContent = cfg.business.logoText || cfg.business.name;
  }
  document.getElementById('footer-logo').textContent = cfg.business.logoText || cfg.business.name;
  document.getElementById('footer-tagline').textContent = cfg.business.tagline;
  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${cfg.business.name}. Tüm hakları saklıdır.`;

  // Hero
  document.getElementById('hero-title').textContent = cfg.hero.title;
  document.getElementById('hero-sub').textContent = cfg.hero.subtitle;
  const heroCta = document.getElementById('hero-cta');
  heroCta.textContent = cfg.hero.ctaText;
  heroCta.href = cfg.hero.ctaLink || '#iletisim';
  const heroBg = document.getElementById('hero-bg');
  if (cfg.hero.image) {
    heroBg.style.backgroundImage = `url(${cfg.hero.image})`;
    heroBg.style.opacity = Math.max(0.85, 1 - (cfg.hero.overlay || 0.15));
  }

  // Services
  const servicesGrid = document.getElementById('services-grid');
  const formServices = document.getElementById('form-services');
  formServices.innerHTML = '<option value="">Hizmet seçin</option>';
  (cfg.services || []).filter(s => s.visible !== false).forEach((s, idx) => {
    servicesGrid.innerHTML += `
      <article class="menu-item">
        <span class="menu-num">${String(idx+1).padStart(2,'0')}</span>
        <div class="menu-body">
          <h3 class="menu-title">${esc(s.title)}</h3>
          <p class="menu-desc">${esc(s.desc)}</p>
        </div>
        <div class="menu-meta">
          <span class="menu-price">${esc(s.price)}</span>
          ${s.duration ? `<span class="menu-dur">${esc(s.duration)}</span>` : ''}
        </div>
      </article>`;
    formServices.innerHTML += `<option>${esc(s.title)}</option>`;
  });

  // Gallery
  const galleryGrid = document.getElementById('gallery-grid');
  (cfg.gallery || []).forEach(g => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item';
    fig.innerHTML = `<img src="${g.url}" alt="${esc(g.alt)}" loading="lazy" onerror="this.style.background='#ddd';this.style.minHeight='100%'">`;
    galleryGrid.appendChild(fig);
  });

  // About
  document.getElementById('about-title').textContent = cfg.about.title;
  document.getElementById('about-text').textContent = cfg.about.text;
  const feats = document.getElementById('about-features');
  (cfg.about.features || []).forEach(f => feats.innerHTML += `<li>${esc(f)}</li>`);
  if (cfg.about.image) document.getElementById('about-img').src = cfg.about.image;

  // Testimonials (approved only)
  const testiGrid = document.getElementById('testi-grid');
  (cfg.testimonials || []).filter(t => t.approved !== false).forEach(t => {
    testiGrid.innerHTML += `
      <figure class="quote-item">
        <span class="quote-mark">“</span>
        <blockquote class="quote-text">${esc(t.text)}</blockquote>
        <figcaption class="quote-meta">
          <span class="stars">${'<span class="star"></span>'.repeat(t.rating || 5)}</span>
          <cite class="quote-author">— ${esc(t.name)}</cite>
        </figcaption>
      </figure>`;
  });

  // Contact
  const b = cfg.business;
  document.getElementById('contact-info').innerHTML = `
    <div class="info-item"><strong>Telefon</strong><a href="tel:${b.phone.replace(/\s/g,'')}">${esc(b.phone)}</a></div>
    <div class="info-item"><strong>WhatsApp</strong><a href="https://wa.me/${b.whatsapp}" target="_blank" rel="noopener">Mesaj Gönder</a></div>
    <div class="info-item"><strong>E-posta</strong><a href="mailto:${b.email}">${esc(b.email)}</a></div>
    <div class="info-item"><strong>Adres</strong><p>${esc(b.address)}</p></div>
    <div class="info-item"><strong>Saatler</strong><p>${esc(b.hours)}</p></div>`;

  const socialEl = document.getElementById('footer-social');
  if (b.social?.instagram) socialEl.innerHTML += `<a href="${b.social.instagram}" target="_blank" rel="noopener">Instagram</a>`;
  if (b.social?.facebook) socialEl.innerHTML += `<a href="${b.social.facebook}" target="_blank" rel="noopener">Facebook</a>`;
  if (b.social?.tiktok) socialEl.innerHTML += `<a href="${b.social.tiktok}" target="_blank" rel="noopener">TikTok</a>`;

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Teşekkürler! En kısa sürede dönüş yapacağız.');
    e.target.reset();
  });

  // ---- Star picker init ----
  document.querySelectorAll('.star-picker').forEach(widget => {
    const btns = widget.querySelectorAll('.star-btn');
    const hidden = widget.closest('form').querySelector('input[name="rating"]');
    let current = parseInt(widget.dataset.rating) || 5;
    function paint(v) { btns.forEach((b, i) => b.classList.toggle('filled', i < v)); }
    paint(current);
    btns.forEach((btn, i) => {
      btn.addEventListener('mouseenter', () => paint(i + 1));
      btn.addEventListener('mouseleave', () => paint(current));
      btn.addEventListener('click', () => {
        current = i + 1;
        widget.dataset.rating = current;
        if (hidden) hidden.value = current;
        paint(current);
      });
    });
  });

  // Review form
  document.getElementById('review-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const review = {
      id: 't' + Date.now(),
      name: f.name.value.trim(),
      text: f.text.value.trim(),
      rating: Math.min(5, Math.max(1, parseInt(f.rating.value) || 5)),
      approved: false
    };
    if (!review.name || !review.text) return;
    const fresh = Storage.load();
    if (!fresh.testimonials) fresh.testimonials = [];
    fresh.testimonials.push(review);
    if (Storage.save(fresh)) {
      alert('Yorumunuz alındı! Yönetici onayından sonra yayınlanacak.');
      f.reset();
      f.querySelectorAll('.star-btn').forEach((b, i) => b.classList.toggle('filled', i < 5));
      f.querySelector('input[name="rating"]').value = 5;
      f.querySelector('.star-picker').dataset.rating = 5;
    }
  });

  // ---- Animations ----
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 780px)').matches;

  requestAnimationFrame(() => {
    document.getElementById('header')?.classList.add('is-loaded');
    document.querySelector('.hero-content')?.classList.add('is-visible');
  });
  setTimeout(() => {
    document.querySelector('.hero-eyebrow')?.classList.add('is-visible');
    document.getElementById('hero-sub')?.classList.add('is-visible');
    document.getElementById('hero-cta')?.classList.add('is-visible');
  }, 400);

  if (!reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px 5% 0px' });

    document.querySelectorAll('.menu-item').forEach((el, i) => { el.style.transitionDelay = (i * 90) + 'ms'; io.observe(el); });
    document.querySelectorAll('.gallery-item').forEach((el, i) => { el.style.transitionDelay = (i * 110) + 'ms'; io.observe(el); });
    document.querySelectorAll('.quote-item').forEach((el, i) => { el.style.transitionDelay = (i * 120) + 'ms'; io.observe(el); });
    const aboutImg = document.getElementById('about-img'); if (aboutImg) io.observe(aboutImg);
    const aboutFeats = document.getElementById('about-features'); if (aboutFeats) io.observe(aboutFeats);

    // FALLBACK: force reveal after 2.5s
    setTimeout(() => {
      document.querySelectorAll('.menu-item, .gallery-item, .quote-item, .about-img, .about-features').forEach(el => el.classList.add('is-visible'));
    }, 2500);

    if (!isMobile) {
      const bg = document.getElementById('hero-bg');
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight * 1.2 && bg) bg.style.transform = `translateY(${y * 0.2}px) scale(1.06)`;
          ticking = false;
        });
        ticking = true;
      }, { passive: true });
    }
  } else {
    document.querySelectorAll('.menu-item, .gallery-item, .quote-item, .about-img, .about-features').forEach(el => el.classList.add('is-visible'));
  }

  function esc(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
})();