/* ==========================================================================
   FRANKLIN ELETROMEC — PROJECT SHOWCASE & DETAIL LIGHTBOX
   ========================================================================== */

import { i18n } from './i18n-engine.js';

export function initProjectFilter() {
  // Modal Technical Specs & Lightbox Handler
  const modal = document.getElementById('projectModal') || document.getElementById('capabilityModal');

  document.querySelectorAll('[data-open-modal], .project-card').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      // If clicking inside a direct contact link, let it proceed
      if (e.target.closest('a[href^="#contact"]') && !trigger.classList.contains('btn-open-project-modal')) {
        return;
      }
      e.preventDefault();

      const modalId = trigger.getAttribute('data-open-modal') || 'projectModal';
      const activeModal = document.getElementById(modalId) || document.getElementById('projectModal') || document.getElementById('capabilityModal');
      
      if (!activeModal) return;

      const capabilityKey = trigger.getAttribute('data-capability');
      const projectKey = trigger.getAttribute('data-project');
      const imgSrc = trigger.getAttribute('data-img') || trigger.querySelector('.project-img')?.getAttribute('src');
      const categoryTag = trigger.getAttribute('data-category-tag') || trigger.querySelector('.project-category-tag')?.textContent;
      const locationTag = trigger.getAttribute('data-location-tag') || trigger.querySelector('.project-location-tag')?.textContent;

      // Update Modal Image if available
      const modalImg = activeModal.querySelector('.modal-dynamic-img');
      if (modalImg && imgSrc) {
        modalImg.src = imgSrc;
        modalImg.alt = "Franklin Eletromec Industrial Execution";
      }

      // Update Tags
      const modalBadge = activeModal.querySelector('.modal-dynamic-badge');
      if (modalBadge && categoryTag) {
        modalBadge.textContent = categoryTag;
      }

      const modalLocation = activeModal.querySelector('.modal-dynamic-location');
      if (modalLocation && locationTag) {
        modalLocation.textContent = locationTag;
      }

      // Dynamic translations for Title & Description
      const modalTitle = activeModal.querySelector('.modal-dynamic-title');
      const modalBody = activeModal.querySelector('.modal-dynamic-body');

      if (projectKey) {
        const titleKey = `projects.${projectKey}_title`;
        const descKey = `projects.${projectKey}_desc`;
        if (modalTitle) modalTitle.textContent = i18n.translate(titleKey);
        if (modalBody) modalBody.textContent = i18n.translate(descKey);
      } else if (capabilityKey) {
        const titleKey = `capabilities.${capabilityKey}_title`;
        const descKey = `capabilities.${capabilityKey}_modal`;
        if (modalTitle) modalTitle.textContent = i18n.translate(titleKey);
        if (modalBody) modalBody.textContent = i18n.translate(descKey);
      }

      activeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modals
  document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn') || e.target.closest('.modal-close-btn')) {
        document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('active'));
        document.body.style.overflow = '';
      }
    });
  });

  // Close with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
}
