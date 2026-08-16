/* ==========================================================================
   FRANKLIN ELETROMEC — INTERACTIVE INDUSTRIAL CORRIDOR MAP / DASHBOARD
   ========================================================================== */

export function initInteractiveMap() {
  const corridorTabs = document.querySelectorAll('.corridor-pill');
  const corridorPanels = document.querySelectorAll('.corridor-info-panel');

  corridorTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      corridorTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-corridor');
      corridorPanels.forEach((panel) => {
        if (panel.getAttribute('data-corridor-panel') === target) {
          panel.style.display = 'block';
          setTimeout(() => {
            panel.style.opacity = '1';
          }, 30);
        } else {
          panel.style.opacity = '0';
          panel.style.display = 'none';
        }
      });
    });
  });
}
