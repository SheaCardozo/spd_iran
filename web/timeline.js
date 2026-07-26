(() => {
  const body = document.body;
  const toggle = document.querySelector('.theme-toggle');
  const progress = document.querySelector('.reading-progress span');
  const navLinks = [...document.querySelectorAll('.contents a')];
  const sections = [...document.querySelectorAll('.chapter')];
  const themeKey = 'last-majles-primer-theme';

  const setTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    toggle.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
  };

  const preferredTheme =
    localStorage.getItem(themeKey) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(preferredTheme);

  toggle.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem(themeKey, next);
    setTheme(next);
  });

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    progress.style.width = `${ratio * 100}%`;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (!visible.length) return;
      const id = visible[0].target.id;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    },
    {rootMargin: '-12% 0px -72% 0px', threshold: 0},
  );

  sections.forEach((section) => observer.observe(section));
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive: true});
  window.addEventListener('resize', updateProgress);
})();
