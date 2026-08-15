/* ReachOut Pro — Main JS */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== Mobile Navigation ===== */
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  let mobileNav = document.querySelector('.mobile-nav');

  function buildMobileNav() {
    if (mobileNav) return mobileNav;
    const nav = document.createElement('div');
    nav.className = 'mobile-nav';

    const desktopLinks = document.querySelector('.nav-links');
    const authActions = document.querySelector('.navbar .auth-actions');
    if (desktopLinks) {
      const clone = desktopLinks.cloneNode(true);
      // Make dropdowns clickable on mobile
      clone.querySelectorAll('.dropdown > .nav-item').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          a.parentElement.classList.toggle('open');
        });
      });
      nav.appendChild(clone);
    }
    if (authActions) {
      const authClone = authActions.cloneNode(true);
      nav.appendChild(authClone);
    }
    document.querySelector('.navbar')?.after(nav);
    return nav;
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!mobileNav) {
        mobileNav = buildMobileNav();
      }
      const open = mobileNav.classList.toggle('active');
      hamburger.classList.toggle('open', open);
      body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Close mobile nav on link click outside dropdown toggles
  document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('active')) {
      if (e.target.closest('.mobile-nav a:not(.dropdown > .nav-item)')) {
        mobileNav.classList.remove('active');
        hamburger?.classList.remove('open');
        body.style.overflow = '';
      }
    }
  });

  /* ===== Navbar Scroll State ===== */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ===== FAQ Accordion ===== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    });
  });

  /* ===== Pricing Toggle ===== */
  const toggleBtns = document.querySelectorAll('.pricing-toggle button');
  const monthlyPrices = ['₹0', '₹199', '₹1,499'];
  const yearlyPrices = ['₹0', '₹149', '₹1,199'];

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isYearly = btn.dataset.period === 'yearly';
      const prices = isYearly ? yearlyPrices : monthlyPrices;
      document.querySelectorAll('.pricing-card .price .amount').forEach((el, i) => {
        el.textContent = prices[i];
      });
      document.querySelectorAll('.pricing-card .price .period').forEach(el => {
        el.textContent = isYearly ? '/mo (billed yearly)' : '/month';
      });
    });
  });

  /* ===== Scroll Reveal ===== */
  const reveals = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ===== Smooth scroll for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
