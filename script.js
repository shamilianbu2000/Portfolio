/* JavaScript Engine for Shamili Anbuselvan Portfolio */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
const hasGSAP = typeof gsap !== 'undefined';
const navLinks = document.querySelectorAll('.nav-links a');

if (hasGSAP) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ immediateRender: false });
}

/* A11Y Check: Custom Cursor */
if (window.matchMedia('(pointer:fine)').matches) {
  document.documentElement.classList.add('js-custom-cursor');
}

/* MOBILE NAV BAR TOGGLE */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('menuBtn');
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('menuBtn');
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open navigation menu');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* SCREEN PAGE LOADER */
const loaderEl = document.getElementById('loader');
const counterEl = document.getElementById('loaderCounter');
const fillEl = document.getElementById('loaderFill');
const loaderBar = document.querySelector('.loader-bar');

if (prefersReducedMotion || !hasGSAP) {
  if (loaderEl) {
    loaderEl.style.display = 'none';
    loaderEl.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.hero .line-inner').forEach(el => el.style.transform = 'none');
  const hl = document.querySelector('.hero-label');
  if (hl) hl.style.opacity = '1';
  const hr = document.querySelector('.hero-right');
  if (hr) hr.style.opacity = '1';
} else {
  gsap.to({ v: 1 }, {
    v: 100, duration: 2, ease: 'power3.inOut',
    onUpdate: function() {
      const v = Math.round(this.targets()[0].v);
      if (counterEl) counterEl.textContent = v;
      if (fillEl) fillEl.style.width = v + '%';
      if (loaderBar) loaderBar.setAttribute('aria-valuenow', v);
    },
    onComplete: () => {
      gsap.to(counterEl, { scale: 1.1, opacity: 0, duration: .4, ease: 'power2.in' });
      gsap.to(loaderEl, {
        yPercent: -100, duration: 1, delay: .3, ease: 'power4.inOut',
        onComplete: () => {
          if (loaderEl) {
            loaderEl.style.display = 'none';
            loaderEl.setAttribute('aria-hidden', 'true');
          }
          animateHero();
        }
      });
    }
  });
}

/* HERO ENTRANCE MOVEMENT */
function animateHero() {
  if (prefersReducedMotion || !hasGSAP) return;
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }});
  tl.to('.hero .line-inner', { y: 0, duration: 1.5, stagger: .18 })
    .to('.hero-label', { opacity: 1, duration: 1.2 }, '-=1')
    .to('.hero-right', { opacity: 1, duration: 1.2 }, '-=.9')
    .from('.hero-glow1, .hero-glow2', { opacity: 0, scale: .5, duration: 2.5, ease: 'power2.out' }, '-=1.5');
}

/* CUSTOM GSAP TRAILING POINTER CURSOR */
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');
const starlight = document.querySelector('.cursor-starlight');
const mouse = { x: 0, y: 0 };
const pos = { x: 0, y: 0 };
const dotPos = { x: 0, y: 0 };
const starPos = { x: 0, y: 0 };

let isHovered = false;

if (dot) {
  if (prefersReducedMotion && starlight) {
    starlight.style.display = 'none';
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mousedown', () => {
    if (starlight && !prefersReducedMotion && hasGSAP) {
      gsap.to(starlight, { width: 200, height: 200, duration: 0.15, ease: 'power2.out' });
    }
  });

  document.addEventListener('mouseup', () => {
    if (starlight && !prefersReducedMotion && hasGSAP) {
      gsap.to(starlight, { width: isHovered ? 170 : 120, height: isHovered ? 170 : 120, duration: 0.5, ease: 'power2.out' });
    }
  });

  (function moveCursor() {
    dotPos.x += (mouse.x - dotPos.x) * .55;
    dotPos.y += (mouse.y - dotPos.y) * .55;
    dot.style.transform = `translate(${dotPos.x - 6}px, ${dotPos.y - 6}px)`;
    
    if (starlight && !prefersReducedMotion) {
      starPos.x += (mouse.x - starPos.x) * .08;
      starPos.y += (mouse.y - starPos.y) * .08;
      starlight.style.transform = `translate3d(${starPos.x}px, ${starPos.y}px, 0) translate(-50%, -50%)`;
    }
    
    requestAnimationFrame(moveCursor);
  })();

  document.querySelectorAll('a, button, .project-card, .stat, .skill-tag, .tech-pill, .contact-chip, .btn-big, .nav-cta, .currently-item, .footer-back, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovered = true;
      if (starlight && !prefersReducedMotion && hasGSAP) {
        gsap.to(starlight, { width: 170, height: 170, duration: .4, ease: 'power2.out' });
      }
    });
    el.addEventListener('mouseleave', () => {
      isHovered = false;
      if (starlight && !prefersReducedMotion && hasGSAP) {
        gsap.to(starlight, { width: 120, height: 120, duration: .5, ease: 'power2.out' });
      }
    });
  });
}

/* MAGNETIC HOVER INTERACTIVE ACTIONS */
document.querySelectorAll('.nav-cta, .btn-big, .contact-chip, .footer-back, .stat').forEach(btn => {
  if (prefersReducedMotion || !hasGSAP) return;
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, {
      x: (e.clientX - r.left - r.width / 2) * .25,
      y: (e.clientY - r.top - r.height / 2) * .25,
      duration: .4, ease: 'power3.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.35)' });
  });
});

/* GLOW LIGHT PARALLAX ON MOUSE MOVE */
window.addEventListener('mousemove', e => {
  if (prefersReducedMotion || !hasGSAP) return;
  const rx = (e.clientX / window.innerWidth - .5) * 2;
  const ry = (e.clientY / window.innerHeight - .5) * 2;
  gsap.to('.hero-glow1', { x: rx * 25, y: ry * 20, duration: 2.5, ease: 'power2.out' });
  gsap.to('.hero-glow2', { x: -rx * 15, y: -ry * 12, duration: 3, ease: 'power2.out' });
});

if (hasGSAP) {
  /* SCROLL TRIGGER ANIMATION BINDS */
  const ta = 'play none none reverse';

  // Section labels reveal
  gsap.utils.toArray('.sec-label').forEach(el => {
    gsap.from(el, {
      x: -50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: ta }
    });
  });

  // Section titles reveal
  gsap.utils.toArray('.sec-title').forEach(el => {
    gsap.from(el, {
      y: 70, opacity: 0, duration: 1.3, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: ta }
    });
  });

  // About paragraphs reveal
  gsap.utils.toArray('.about-text p').forEach((p, i) => {
    gsap.from(p, {
      y: 40, opacity: 0, duration: 1, delay: i * .12, ease: 'power3.out',
      scrollTrigger: { trigger: p, start: 'top 90%', toggleActions: ta }
    });
  });

  // Stat blocks reveal
  gsap.utils.toArray('.stat').forEach((el, i) => {
    gsap.from(el, {
      y: 50, opacity: 0, scale: .85, duration: .9, delay: i * .08,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: el.parentElement, start: 'top 82%', toggleActions: ta }
    });
  });

  // Stats counter logic
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => gsap.to(el, {
        innerText: target, duration: 2, snap: { innerText: 1 }, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(+el.innerText) + '+'; }
      }),
      once: true
    });
  });

  // Skill cells reveal
  gsap.utils.toArray('.skill-cell').forEach((el, i) => {
    gsap.from(el, {
      y: 40, opacity: 0, scale: .92, duration: .7, delay: i * .05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-grid', start: 'top 82%', toggleActions: ta }
    });
  });

  // Education card reveal
  gsap.utils.toArray('.edu-card').forEach((el, i) => {
    gsap.from(el, {
      y: 45, opacity: 0, duration: .9, delay: i * .12, ease: 'power3.out',
      scrollTrigger: { trigger: '.edu-grid', start: 'top 84%', toggleActions: ta }
    });
  });

  // Philosophy section reveal
  gsap.from('.philosophy-text', {
    y: 50, opacity: 0, duration: 1.3, ease: 'power3.out',
    scrollTrigger: { trigger: '.philosophy', start: 'top 84%', toggleActions: ta }
  });
  gsap.from('.philosophy-attr', {
    y: 25, opacity: 0, duration: .9, delay: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.philosophy', start: 'top 80%', toggleActions: ta }
  });

  // Currently status list reveal
  gsap.utils.toArray('.currently-item').forEach((el, i) => {
    gsap.from(el, {
      y: 18, opacity: 0, scale: .88, duration: .6, delay: i * .07,
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '.currently', start: 'top 92%', toggleActions: ta }
    });
  });

  // Contact section reveals
  gsap.from('.contact-title', {
    y: 70, opacity: 0, scale: .95, duration: 1.3, ease: 'power4.out',
    scrollTrigger: { trigger: '.contact', start: 'top 78%', toggleActions: ta }
  });
  gsap.from('.contact-sub', {
    y: 35, opacity: 0, duration: 1, delay: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact', start: 'top 72%', toggleActions: ta }
  });
  gsap.utils.toArray('.contact-chip').forEach((el, i) => {
    gsap.from(el, {
      y: 25, opacity: 0, scale: .88, duration: .6, delay: i * .07,
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: '.contact-row', start: 'top 87%', toggleActions: ta }
    });
  });
  gsap.from('.contact-form-container', {
    y: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-form-container', start: 'top 85%', toggleActions: ta }
  });

  /* INFINITE SCROLL MARQUEE */
  const mq = document.getElementById('marquee1');
  if (mq) {
    mq.innerHTML += mq.innerHTML;
    if (!prefersReducedMotion) {
      gsap.to(mq, {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: 'none'
      });
    }
  }

  /* HERO SCROLL PARALLAX GLOWS */
  if (!prefersReducedMotion) {
    gsap.to('.hero-glow1', {
      y: -80,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .4 }
    });
  }

  /* HORIZONTAL AUTO-SCROLL MARQUEE FOR PROJECTS */
  function setupProjectsAutoScroll() {
    const track = document.getElementById('projectsTrack');
    if (!track) return;

    if (typeof gsap === 'undefined') {
      track.style.overflowX = 'auto';
      return;
    }

    const originalCards = Array.from(track.children);
    const originalCount = originalCards.length;

    // Clone and append to create seamless scroll loop
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    function initAnimation() {
      gsap.set(track, { x: 0 });
      const cards = track.querySelectorAll('.project-card');
      if (cards.length < originalCount + 1) return;

      // Distance to scroll is the offset of the first duplicated card minus the first card
      const scrollDistance = cards[originalCount].offsetLeft - cards[0].offsetLeft;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        duration: 45, // loop speed
        repeat: -1,
        runBackwards: false
      });

      // Pause on hover
      track.addEventListener('mouseenter', () => tween.pause());
      track.addEventListener('mouseleave', () => tween.play());

      // Focus accessibility support
      cards.forEach(card => {
        card.addEventListener('focusin', () => tween.pause());
        card.addEventListener('focusout', () => tween.play());
      });
    }

    if (!prefersReducedMotion) {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initAnimation);
      } else {
        setTimeout(initAnimation, 300);
      }
    } else {
      track.style.overflowX = 'auto';
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setupProjectsAutoScroll);
  } else {
    setupProjectsAutoScroll();
  }

  /* ACTIVE NAV SECTION SYNC */
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(s => {
    ScrollTrigger.create({
      trigger: s, start: 'top 40%', end: 'bottom 40%',
      onToggle: self => {
        if (self.isActive) {
          navLinks.forEach(l => l.classList.remove('active'));
          const l = document.querySelector(`.nav-links a[href="#${s.id}"]`);
          if (l) l.classList.add('active');
        }
      }
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

if (window.scrollY > 60 && navEl) navEl.classList.add('scrolled');

(function setActiveNavOnLoad() {
  const scrollY = window.scrollY + window.innerHeight * .4;
  let activeSection = null;
  document.querySelectorAll('section[id]').forEach(s => {
    if (s.offsetTop <= scrollY) activeSection = s;
  });
  if (activeSection) {
    navLinks.forEach(l => l.classList.remove('active'));
    const l = document.querySelector('.nav-links a[href="#' + activeSection.id + '"]');
    if (l) l.classList.add('active');
  }
})();

/* CONTACT FORM VALIDATION */
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const messageInput = document.getElementById('formMessage');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    let isValid = true;
    
    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.style.display = 'block';
      nameInput.style.borderColor = '#DC2626';
      isValid = false;
    } else {
      nameError.style.display = 'none';
      nameInput.style.borderColor = 'var(--border)';
    }
    
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
      emailError.style.display = 'block';
      emailInput.style.borderColor = '#DC2626';
      isValid = false;
    } else {
      emailError.style.display = 'none';
      emailInput.style.borderColor = 'var(--border)';
    }
    
    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.style.display = 'block';
      messageInput.style.borderColor = '#DC2626';
      isValid = false;
    } else {
      messageError.style.display = 'none';
      messageInput.style.borderColor = 'var(--border)';
    }
    
    if (isValid) {
      contactForm.submit();
    }
  });
}

/* REFRESH LAYOUT DIMENSIONS */
ScrollTrigger.refresh();
Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(res => {
    if (document.readyState === 'complete') res();
    else window.addEventListener('load', res, { once: true });
  })
]).then(() => ScrollTrigger.refresh());

