document.addEventListener('DOMContentLoaded', () => {
    function attachCodexListeners() {
      const codexTitles = document.querySelectorAll('.codex-title');
      codexTitles.forEach(title => {
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.setAttribute('aria-expanded', 'false');
  
        title.addEventListener('click', () => {
          const meta = title.nextElementSibling;
          meta.classList.toggle('active');
          const isExpanded = meta.classList.contains('active');
          title.setAttribute('aria-expanded', isExpanded);
        });
  
        title.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            title.click();
          }
        });
      });
    }
  
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    navToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
  
    // Initial attachment and re-attach for dynamic content
    attachCodexListeners();
    document.addEventListener('codicesLoaded', attachCodexListeners);
  });