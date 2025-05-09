document.addEventListener('DOMContentLoaded', () => {
    const codexTitles = document.querySelectorAll('.codex-title');
  
    codexTitles.forEach(title => {
      title.addEventListener('click', () => {
        const meta = title.nextElementSibling;
        meta.classList.toggle('active');
        const isExpanded = meta.classList.contains('active');
        title.setAttribute('aria-expanded', isExpanded);
      });
  
      title.setAttribute('aria-expanded', 'false');
    });
  
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    navToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
  });