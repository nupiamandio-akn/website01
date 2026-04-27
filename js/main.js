// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// ===== SEARCH TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const searchInput = document.getElementById('searchInput');
    const placeholders = {
      oportunidades: 'Pesquisa: bolsa, estágio, emprego, área...',
      empresas: 'Nome da empresa ou instituição...',
      estudantes: 'Nome do estudante ou número de matrícula...',
    };
    if (searchInput) searchInput.placeholder = placeholders[tab.dataset.tab] || '';
  });
});

// ===== SEARCH FUNCTION =====
function doSearch() {
  const query = document.getElementById('searchInput')?.value?.trim();
  const location = document.getElementById('searchLocation')?.value;
  if (!query && !location) {
    alert('Por favor, introduz um termo de pesquisa ou selecciona uma localização.');
    return;
  }
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (location) params.set('cidade', location);
  window.location.href = `resultados.html?${params.toString()}`;
}

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch();
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target || '0', 10);
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('pt-PT');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger counter when hero enters view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(heroStats);
}

// ===== SCROLL ANIMATIONS =====
const revealElements = document.querySelectorAll(
  '.cat-card, .oport-card, .estagio-card, .noticia-card, .evento-card, .parceiro, .sobre-card'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp .5s ease both';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }

  // Active nav highlight
  const sections = ['oportunidades', 'bolsas', 'estagios', 'noticias', 'eventos', 'sobre'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail')?.value;
  if (!email) return;
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Subscrito!';
  btn.style.background = '#1a7a3a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Subscrever';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
      if (mobileNav) mobileNav.classList.remove('open');
    }
  });
});
