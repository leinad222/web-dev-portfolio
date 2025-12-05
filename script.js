// ============================================
// HEADER BACKGROUND ON SCROLL
// ============================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'var(--container-color)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
  }
});

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active-link');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active-link');
    }
  });
});

// ============================================
// LIGHT & DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('change-theme');
const html = document.documentElement;
const THEME_KEY = 'portfolio-theme';

// Load saved theme or default to dark
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'light') {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  updateThemeIcon(newTheme);
});

// ============================================
// MOBILE MENU TOGGLE & CLOSE
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinksAll = document.querySelectorAll('.nav-link');

// Open menu
navToggle.addEventListener('click', () => {
  navMenu.classList.add('active');
});

// Close menu button
navClose.addEventListener('click', () => {
  navMenu.classList.remove('active');
});

// Close menu when clicking on a link
navLinksAll.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
window.addEventListener("load", () => {
  if (window.location.hash === "#menu") {
    history.replaceState(null, null, window.location.pathname);
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Text gradient animation
  gsap.utils.toArray('.text-gradient').forEach((span) => {
    gsap.to(span, {
      backgroundSize: '100%, 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: span,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      }
    });
  });

  // Fade-in animation for cards and sections
  gsap.utils.toArray('.services-card, .skill-item, .contact-item').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // Stagger animation for home section
  gsap.from('.home-data > *', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.2,
  });
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
