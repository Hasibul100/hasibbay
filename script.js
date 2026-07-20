/* =========================================================
   HASIBBAY PORTFOLIO — script.js
   Vanilla JS. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('is-hidden');
      }, 350);
    }
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById('site-header');
  var backToTop = document.getElementById('back-to-top');

  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) header.classList.toggle('is-scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Typing animation ---------- */
  var typedEl = document.getElementById('typed-text');
  var phrases = [
    'Binary & Forex Trader',
    'Web Developer',
    'Student',
    'Problem Solver',
    'Technology Enthusiast'
  ];

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeLoop() {
    if (!typedEl) return;

    if (prefersReducedMotion) {
      typedEl.textContent = phrases[0];
      return;
    }

    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(tick, deleting ? 35 : 65);
    }

    tick();
  }
  typeLoop();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Skill bar fill on scroll ---------- */
  var skillBars = document.querySelectorAll('.skill-bar');

  if ('IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var fill = entry.target.querySelector('.skill-bar__fill');
            var percent = entry.target.getAttribute('data-percent') || 0;
            if (fill) fill.style.width = percent + '%';
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillBars.forEach(function (bar) { skillObserver.observe(bar); });
  } else {
    skillBars.forEach(function (bar) {
      var fill = bar.querySelector('.skill-bar__fill');
      var percent = bar.getAttribute('data-percent') || 0;
      if (fill) fill.style.width = percent + '%';
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat__num');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { counterObserver.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var circle = document.createElement('span');
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);

      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(circle);
      setTimeout(function () { circle.remove(); }, 650);
    });
  });

  /* ---------- Contact form (front-end only demo) ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field before sending.';
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      status.textContent = 'Sending…';

      setTimeout(function () {
        status.textContent = 'Thanks, ' + name + '! Your message has been noted — I\'ll reply to ' + email + ' soon.';
        form.reset();
      }, 900);
    });
  }

  /* ---------- Ambient ticker canvas (signature background element) ---------- */
  var canvas = document.getElementById('ticker-canvas');

  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var candles = [];
    var W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      var count = Math.floor(W / 46);
      candles = [];
      var price = H * 0.5;

      for (var i = 0; i < count; i++) {
        var change = (Math.random() - 0.5) * H * 0.12;
        var open = price;
        var close = price + change;
        var high = Math.max(open, close) + Math.random() * H * 0.03;
        var low = Math.min(open, close) - Math.random() * H * 0.03;
        price = close;

        candles.push({
          x: i * 46 + 20,
          open: open,
          close: close,
          high: high,
          low: low,
          bull: close < open
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      candles.forEach(function (c) {
        ctx.strokeStyle = c.bull ? 'rgba(6,182,212,0.5)' : 'rgba(56,189,248,0.35)';
        ctx.fillStyle = c.bull ? 'rgba(6,182,212,0.18)' : 'rgba(56,189,248,0.12)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(c.x, c.high);
        ctx.lineTo(c.x, c.low);
        ctx.stroke();

        var top = Math.min(c.open, c.close);
        var height = Math.max(Math.abs(c.close - c.open), 2);
        ctx.fillRect(c.x - 8, top, 16, height);
        ctx.strokeRect(c.x - 8, top, 16, height);
      });
    }

    resize();
    draw();
    window.addEventListener('resize', function () {
      resize();
      draw();
    });
  }

})();
