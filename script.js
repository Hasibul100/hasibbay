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

  /* ---------- Contact form — EmailJS integration ----------
     1. Create a free account at https://www.emailjs.com
     2. Add an Email Service (e.g. Gmail) and a Template with
        {{from_name}}, {{from_email}}, {{message}} variables.
     3. Replace the three placeholders below with your real IDs.
     4. Until configured, the form falls back to a local demo mode
        so it never appears broken to visitors.
  ------------------------------------------------------------ */
  var EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
  var EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
  var EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

  var emailjsConfigured =
    EMAILJS_PUBLIC_KEY.indexOf('YOUR_') !== 0 &&
    EMAILJS_SERVICE_ID.indexOf('YOUR_') !== 0 &&
    EMAILJS_TEMPLATE_ID.indexOf('YOUR_') !== 0;

  if (emailjsConfigured && window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var submitBtn = form.querySelector('button[type="submit"]');

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
      if (submitBtn) submitBtn.setAttribute('disabled', 'true');

      if (emailjsConfigured && window.emailjs) {
        window.emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            message: message
          })
          .then(function () {
            status.textContent = 'Thanks, ' + name + '! Your message was sent successfully.';
            form.reset();
          })
          .catch(function () {
            status.textContent = 'Something went wrong sending your message. Please email hasibbay0.2@gmail.com directly.';
          })
          .finally(function () {
            if (submitBtn) submitBtn.removeAttribute('disabled');
          });
      } else {
        // Demo fallback until EmailJS keys are configured above
        setTimeout(function () {
          status.textContent = 'Thanks, ' + name + '! Your message has been noted — I\'ll reply to ' + email + ' soon.';
          form.reset();
          if (submitBtn) submitBtn.removeAttribute('disabled');
        }, 900);
      }
    });
  }

  /* ---------- GitHub API — auto-load latest public repositories ---------- */
  var ghGrid = document.getElementById('github-projects-grid');
  var ghStatus = document.getElementById('github-projects-status');
  var GITHUB_USERNAME = 'Hasibul100';

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderGithubRepos(repos) {
    if (!ghGrid) return;
    if (!repos.length) {
      if (ghStatus) ghStatus.textContent = 'No public repositories found yet.';
      return;
    }

    if (ghStatus) ghStatus.remove();

    repos.forEach(function (repo) {
      var card = document.createElement('article');
      card.className = 'project-card glass gh-card';
      card.innerHTML =
        '<div class="project-card__body">' +
          '<h3>' + escapeHtml(repo.name) + '</h3>' +
          '<p>' + escapeHtml(repo.description || 'No description provided.') + '</p>' +
          '<div class="gh-card__meta">' +
            '<span>⭐ ' + repo.stargazers_count + '</span>' +
            (repo.language ? '<span>' + escapeHtml(repo.language) + '</span>' : '') +
          '</div>' +
          '<div class="project-card__actions">' +
            '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" class="btn btn--sm btn--outline">GitHub</a>' +
            (repo.homepage ? '<a href="' + repo.homepage + '" target="_blank" rel="noopener noreferrer" class="btn btn--sm btn--gradient">Live Demo</a>' : '') +
          '</div>' +
        '</div>';
      ghGrid.appendChild(card);
    });
  }

  if (ghGrid) {
    fetch('https://api.github.com/users/' + GITHUB_USERNAME + '/repos?sort=updated&per_page=6')
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(function (repos) {
        var visible = repos.filter(function (r) { return !r.fork; }).slice(0, 6);
        renderGithubRepos(visible);
      })
      .catch(function () {
        if (ghStatus) ghStatus.textContent = 'Live repositories are temporarily unavailable — check my GitHub directly.';
      });
  }

  /* ---------- TradingView widget init ---------- */
  function initTradingView() {
    if (typeof TradingView === 'undefined') return;
    var container = document.getElementById('tradingview_widget');
    if (!container) return;

    new TradingView.widget({
      autosize: true,
      symbol: 'FX:EURUSD',
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#1e293b',
      enable_publishing: false,
      hide_top_toolbar: false,
      save_image: false,
      container_id: 'tradingview_widget'
    });
  }

  if (document.readyState === 'complete') {
    initTradingView();
  } else {
    window.addEventListener('load', initTradingView);
  }

  /* ---------- Bangla / English language toggle ---------- */
  var translations = {
    bn: {
      'nav.about': 'সম্পর্কে', 'nav.skills': 'দক্ষতা', 'nav.experience': 'অভিজ্ঞতা',
      'nav.projects': 'প্রজেক্ট', 'nav.trading': 'ট্রেডিং', 'nav.services': 'সেবা',
      'nav.testimonials': 'মতামত', 'nav.contact': 'যোগাযোগ',
      'hero.location': 'ঢাকা, বাংলাদেশ', 'hero.imText': 'আমি',
      'hero.desc': 'আমি বাজারকে ঠিক যেভাবে কোড পড়ি — ধৈর্য নিয়ে, কাঠামোগতভাবে, এবং সবসময় পরবর্তী সিগন্যালের অপেক্ষায়। দিনে চার্ট ট্রেড করি, রাতে ওয়েব তৈরি করি।',
      'hero.downloadCv': 'সিভি ডাউনলোড করুন', 'hero.contactMe': 'যোগাযোগ করুন',
      'about.eyebrow': 'আমাকে জানুন', 'about.title': 'আমার সম্পর্কে',
      'about.p1': 'আমি হাসিববে, ঢাকা, বাংলাদেশ থেকে একজন স্বপ্রণোদিত ট্রেডার ও ডেভেলপার। আমার জগৎ দুটি সমান্তরাল চার্টে চলে — ক্যান্ডেলস্টিক এবং কোড — এবং আমি বছরের পর বছর ধরে দুটোই শৃঙ্খলার সাথে পড়তে শিখেছি।',
      'about.p2': 'একজন <strong>বাইনারি ও ফরেক্স ট্রেডার</strong> হিসেবে আমি প্রাইস অ্যাকশন অধ্যয়ন করি, কঠোর নিয়মে ঝুঁকি ব্যবস্থাপনা করি এবং প্রতিটি ট্রেডকে জুয়া নয়, একটি ডেটা পয়েন্ট হিসেবে বিবেচনা করি। একজন <strong>ওয়েব ডেভেলপার</strong> হিসেবে আমি আধুনিক টুলিং ব্যবহার করে পরিষ্কার, দ্রুত ও অ্যাক্সেসিবল ইন্টারফেস তৈরি করি। আমি একজন পূর্ণকালীন <strong> শিক্ষার্থী</strong>ও, নিয়মিত নতুন দক্ষতা অর্জন করছি।',
      'about.p3': 'সবচেয়ে বড় কথা, আমি একজন <strong>সমস্যা সমাধানকারী</strong> এবং <strong>প্রযুক্তি উৎসাহী</strong> — জটিল সিস্টেমকে সহজ, পুনরাবৃত্তিযোগ্য প্রক্রিয়ায় ভাঙতে আমি উপভোগ করি, তা ট্রেডিং কৌশল হোক বা সফটওয়্যার আর্কিটেকচার।',
      'skills.eyebrow': 'যা নিয়ে আমি কাজ করি', 'skills.title': 'দক্ষতা ও বিশেষজ্ঞতা',
      'exp.eyebrow': 'আমার যাত্রা', 'exp.title': 'অভিজ্ঞতার টাইমলাইন',
      'edu.eyebrow': 'পটভূমি', 'edu.title': 'শিক্ষা',
      'projects.eyebrow': 'নির্বাচিত কাজ', 'projects.title': 'প্রজেক্ট সমূহ',
      'projects.ghEyebrow': 'সরাসরি GitHub থেকে', 'projects.ghTitle': 'সাম্প্রতিক পাবলিক রিপোজিটরি',
      'trading.eyebrow': 'মার্কেট ও কৌশল', 'trading.title': 'ট্রেডিং জ্ঞান',
      'trading.sub': 'প্রতিটি ট্রেডের পেছনের শৃঙ্খলা।', 'trading.liveMarket': 'লাইভ মার্কেট — EUR/USD',
      'services.eyebrow': 'আমি যেভাবে সাহায্য করতে পারি', 'services.title': 'সেবাসমূহ',
      'testimonials.eyebrow': 'সুন্দর মতামত', 'testimonials.title': 'প্রশংসাপত্র',
      'contact.eyebrow': 'চলুন কথা বলি', 'contact.title': 'যোগাযোগ করুন',
      'contact.sub': 'কোনো প্রজেক্ট, প্রশ্ন বা ট্রেডিং আইডিয়া আছে? পাঠিয়ে দিন।',
      'contact.name': 'নাম', 'contact.email': 'ইমেইল', 'contact.message': 'বার্তা', 'contact.send': 'বার্তা পাঠান'
    }
  };

  var originalText = {};
  var langToggle = document.getElementById('lang-toggle');
  var CURRENT_LANG_KEY = 'hasibbay-lang';

  function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!originalText[key]) originalText[key] = el.innerHTML;

      if (lang === 'bn' && translations.bn[key]) {
        el.innerHTML = translations.bn[key];
      } else {
        el.innerHTML = originalText[key];
      }
    });

    document.documentElement.setAttribute('lang', lang === 'bn' ? 'bn' : 'en');
    if (langToggle) langToggle.setAttribute('data-active-lang', lang);
    try { localStorage.setItem(CURRENT_LANG_KEY, lang); } catch (err) { /* storage unavailable */ }
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = langToggle.getAttribute('data-active-lang') || 'en';
      applyLanguage(current === 'en' ? 'bn' : 'en');
    });

    var savedLang = 'en';
    try { savedLang = localStorage.getItem(CURRENT_LANG_KEY) || 'en'; } catch (err) { /* storage unavailable */ }
    applyLanguage(savedLang);
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
