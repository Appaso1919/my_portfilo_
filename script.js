/* ── NAVBAR ── */
const navbar  = document.getElementById('navbar');
const toggle  = document.getElementById('nav-toggle');
const drawer  = document.getElementById('nav-drawer');
const navLinks = document.querySelectorAll('.nav-links a, #nav-drawer a');

// scroll glass effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// hamburger
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  drawer.classList.toggle('open');
});

// close drawer on link click
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// active section highlight
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

/* ── CURSOR ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .exp-card, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '56px'; ring.style.height = '56px';
    ring.style.borderColor = 'rgba(34,211,238,.6)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px'; ring.style.height = '36px';
    ring.style.borderColor = 'rgba(34,211,238,.45)';
  });
});

/* ── PARTICLE NETWORK ── */
(function() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random()-.5)*.4; this.vy = (Math.random()-.5)*.4;
      this.r = Math.random() * 1.5 + .5;
      this.alpha = Math.random() * .4 + .1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(59,130,246,${this.alpha})`;
      ctx.fill();
    }
  }
  for (let i=0; i<90; i++) particles.push(new Particle());
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => { p.update(); p.draw(); });
    // connect nearby
    for (let i=0; i<particles.length; i++) {
      for (let j=i+1; j<particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${.12 * (1 - dist/120)})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION (on scroll into view) ── */
const bars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = bar.getAttribute('data-width');
      setTimeout(() => { bar.style.width = target + '%'; }, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.2 });
bars.forEach(b => barObserver.observe(b));