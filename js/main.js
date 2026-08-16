/* ==========================================================================
   FRANKLIN ELETROMEC — MAIN APPLICATION ENTRY POINT
   ========================================================================== */

import { i18n } from './i18n-engine.js';
import { initAnimations } from './animations.js';
import { initProjectFilter } from './project-filter.js';
import { initInteractiveMap } from './interactive-map.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Animations & Scroll Watchers
  initAnimations();

  // 2. Initialize Project Gallery & Modals
  initProjectFilter();

  // 3. Initialize Interactive Map / Dashboard
  initInteractiveMap();

  // 4. Mobile Menu Navigation
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');

  if (menuToggle && drawer && overlay) {
    const toggleMenu = () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('open');
        overlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close drawer when any nav link or CTA is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 5. Contact Form Submission & Toast Feedback
  const contactForm = document.getElementById('projectRequestForm');
  const toast = document.getElementById('toastNotice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual submitting state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        // Show toast
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 5000);
        }
      }, 900);
    });
  }

  // 6. Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
