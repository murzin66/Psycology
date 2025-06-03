window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (sec.getAttribute('id') === link.getAttribute('href').substring(1)) {
          link.classList.add('active');
        }
      });
    }
  });
});