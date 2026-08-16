/* ==========================================================================
   FRANKLIN ELETROMEC — ANIMATIONS & SCROLL OBSERVER
   ========================================================================== */

export function initAnimations() {
  // 1. Sticky Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // 3. Process Timeline animation
  const processSection = document.querySelector('.process-section');
  const progressLine = document.querySelector('.timeline-progress-line');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  if (processSection && progressLine && 'IntersectionObserver' in window) {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressLine.style.width = '90%';
            timelineNodes.forEach((node, index) => {
              setTimeout(() => {
                node.classList.add('active');
              }, (index + 1) * 200);
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    processObserver.observe(processSection);
  }

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const drawer = document.querySelector('.mobile-drawer');
          const overlay = document.querySelector('.mobile-drawer-overlay');
          const toggle = document.querySelector('.mobile-menu-toggle');
          if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            overlay?.classList.remove('active');
            toggle?.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // 5. Active Nav Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length > 0 && navLinks.length > 0) {
    const handleScrollspy = () => {
      const scrollY = window.pageYOffset;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', handleScrollspy, { passive: true });
    handleScrollspy();
  }
}

