/* ---- Custom cursor ---- */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  if (cursor) {
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
  }
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('expand'));
});

/* ---- Text scramble ---- */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scramble(el) {
  const original = el.dataset.original || el.textContent.trim();
  el.dataset.original = original;
  let i = 0;
  clearInterval(el._si);
  el._si = setInterval(() => {
    el.textContent = original
      .split('')
      .map((ch, idx) => {
        if (ch === ' ') return ' ';
        if (idx < Math.floor(i)) return original[idx];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
    if (i >= original.length) {
      clearInterval(el._si);
      el.textContent = original;
    }
    i += 0.4;
  }, 28);
}

document.querySelectorAll('[data-scramble]').forEach(el => {
  el.addEventListener('mouseenter', () => scramble(el));
});

/* ---- Scroll reveal ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---- Mobile nav toggle ---- */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}
