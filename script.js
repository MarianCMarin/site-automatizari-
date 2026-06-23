// ============================================
// NAV SCROLL BEHAVIOR
// ============================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});

// ============================================
// INTERSECTION OBSERVER — FADE IN
// ============================================
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger pentru elemente multiple în același container
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ============================================
// FORM VALIDATION & SUBMIT
// ============================================
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(fieldId, msg) {
  const el = document.getElementById('err-' + fieldId);
  const input = document.getElementById(fieldId);
  if (el) el.textContent = msg;
  if (input) input.classList.add('error');
}

function clearError(fieldId) {
  const el = document.getElementById('err-' + fieldId);
  const input = document.getElementById(fieldId);
  if (el) el.textContent = '';
  if (input) input.classList.remove('error');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear errors on input
['nume', 'email', 'mesaj'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(id));
  }
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    ['nume', 'email', 'mesaj', 'gdpr'].forEach(id => clearError(id));

    const nume = document.getElementById('nume').value.trim();
    const email = document.getElementById('email').value.trim();
    const mesaj = document.getElementById('mesaj').value.trim();
    const gdpr = document.getElementById('gdpr').checked;

    if (!nume) {
      showError('nume', 'Te rog introdu numele tău.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Te rog introdu adresa de email.');
      valid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Adresa de email nu este validă.');
      valid = false;
    }

    if (!mesaj) {
      showError('mesaj', 'Te rog descrie pe scurt ce vrei să automatizezi.');
      valid = false;
    }

    if (!gdpr) {
      showError('gdpr', 'Este necesar acordul pentru prelucrarea datelor.');
      valid = false;
    }

    if (!valid) return;

    // Simulate submit (înlocuiește cu Formspree sau mailto în producție)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Se trimite...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }, 1000);
  });
}

// ============================================
// SMOOTH SCROLL PENTRU ANCORE INTERNE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // înălțimea nav-ului
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
