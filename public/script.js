document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});
