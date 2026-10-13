// Toggle dropdowns on touch / small screens and provide basic accessibility updates
document.addEventListener('DOMContentLoaded', () => {
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  dropdownLinks.forEach(link => {
    // initialize aria
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    link.addEventListener('click', (e) => {
      // only intercept clicks on small screens (optional)
      if (window.matchMedia('(max-width: 640px)').matches) {
        e.preventDefault(); // prevent navigation to the parent link
        const li = link.parentElement;
        const isOpen = li.classList.toggle('open');
        link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });

    // allow Enter/Space to toggle on keyboard when on small screens
    link.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && window.matchMedia('(max-width: 640px)').matches) {
        e.preventDefault();
        const li = link.parentElement;
        const isOpen = li.classList.toggle('open');
        link.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // close any open dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(d => {
        d.classList.remove('open');
        const a = d.querySelector('a');
        if (a) a.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // optional: close dropdowns on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown.open').forEach(d => {
        d.classList.remove('open');
        const a = d.querySelector('a');
        if (a) a.setAttribute('aria-expanded', 'false');
      });
    }
  });
});
