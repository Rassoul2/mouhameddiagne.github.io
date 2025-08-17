// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id === '#' || id.length < 2) return;
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth',block:'start'});
    // close mobile nav
    navList?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#nav-list');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
  navList.style.display = navList.classList.contains('open') ? 'flex' : '';
});

// Theme toggle (dark/light) with localStorage
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if(localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && prefersLight)){
  root.classList.add('light');
}
document.getElementById('themeToggle')?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Filter projects by chip
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  projects.forEach(p => {
    if(f === 'all' || p.dataset.tags.includes(f)){
      p.style.display = '';
    } else {
      p.style.display = 'none';
    }
  });
}));

// Project modals
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.modal;
    const modal = document.getElementById(id);
    if(modal){
      modal.setAttribute('aria-hidden','false');
    }
  });
});
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.modal')?.setAttribute('aria-hidden','true'));
});
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) m.setAttribute('aria-hidden','true'); });
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal[aria-hidden="false"]').forEach(m => m.setAttribute('aria-hidden','true'));
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (mailto warning)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  const email = form.querySelector('#email').value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    e.preventDefault();
    toast('Merci d’entrer un email valide.');
  } else {
    toast('Ouverture de votre messagerie…');
  }
});

// Toast helper
function toast(msg){
  const t = document.querySelector('.toast');
  if(!t) return;
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => { t.hidden = true; }, 2500);
}
