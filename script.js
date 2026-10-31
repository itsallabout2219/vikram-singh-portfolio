const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Filter the project cards without reloading the page.
const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// Reveal sections as they enter the viewport.
const revealTargets = document.querySelectorAll(
  '.intro-grid, .stats-grid, .section-heading, .project-card, .skills-layout, .timeline-item, .contact-panel'
);
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// Subtle pointer tilt on the profile card for mouse users.
const visual = document.querySelector('.hero-visual');
const profile = document.querySelector('.profile-card');
if (visual && profile && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  visual.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    profile.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 6}deg) rotate(1deg)`;
  });
  visual.addEventListener('pointerleave', () => profile.style.transform = 'rotate(2deg)');
}

// Theme switch with localStorage persistence and system preference detection.
const themeToggle = document.querySelector('.theme-toggle');
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

const applyTheme = (isLight) => {
  document.body.classList.toggle('light-theme', isLight);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.textContent = isLight ? '☼' : '◐';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isLight ? '#f3f2ed' : '#101114');
  }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  applyTheme(true);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-theme');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Rotating terminal microcopy.
const terminalText = document.getElementById('terminal-text');
const phrases = ['Building what’s next', 'Flutter · Dart · BLoC', 'From idea to release'];
let phraseIndex = 0;
if (terminalText) {
  window.setInterval(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    terminalText.classList.add('terminal-out');
    window.setTimeout(() => {
      terminalText.textContent = phrases[phraseIndex];
      terminalText.classList.remove('terminal-out');
    }, 180);
  }, 2800);
}
