/**
 * Utility functions for the AEAFR portal
 */

export function doSearch() {
  const q = document.getElementById('searchKeyword')?.value?.trim();
  const area = document.getElementById('searchArea')?.value;
  const type = document.getElementById('searchType')?.value;
  
  if (!q && !area && !type) {
    document.getElementById('searchKeyword')?.focus();
    return;
  }
  
  const p = new URLSearchParams();
  if (q) p.set('q', q);
  if (area) p.set('area', area);
  if (type) p.set('tipo', type);
  window.location.href = 'bolsas.html?' + p.toString();
}

export function setupSearchListeners() {
  // Enter key on search input
  document.getElementById('searchKeyword')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });

  // Hero tag search
  document.querySelectorAll('.hero-tag').forEach(tag => {
    tag.addEventListener('click', e => {
      e.preventDefault();
      const kw = document.getElementById('searchKeyword');
      if (kw) { 
        kw.value = tag.textContent; 
        doSearch(); 
      }
    });
  });
}

export function setupViewTabs() {
  document.querySelectorAll('.view-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

export function setupFilterButton() {
  document.querySelector('.btn-filter')?.addEventListener('click', () => {
    const checked = [...document.querySelectorAll('.fcheck input:checked')]
      .map(i => i.parentElement.textContent.trim());
    if (checked.length) {
      alert('Filtros aplicados: ' + checked.slice(0, 3).join(', ') + (checked.length > 3 ? '…' : ''));
    }
  });
}

export function setupPagination() {
  document.querySelectorAll('.pag-btn:not(.pag-next)').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

export function setupBackToTop() {
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });
}

export function setupScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.cat-item, .event-item, .news-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity .35s ease, transform .35s ease';
    observer.observe(el);
  });
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('pt-PT').format(new Date(date));
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
