// back-to-top functionality
;(function() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // when user scrolls down 200px, show the button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  // on click, smooth scroll to top
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();