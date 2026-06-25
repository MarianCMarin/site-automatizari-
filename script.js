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
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ============================================
// CONTACT FORM — EMAILJS
// ============================================
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

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
      showError('nume', 'Te rog introdu numele tau.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Te rog introdu adresa de email.');
      valid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Adresa de email nu este valida.');
      valid = false;
    }

    if (!mesaj) {
      showError('mesaj', 'Te rog descrie pe scurt ce vrei sa automatizezi.');
      valid = false;
    }

    if (!gdpr) {
      showError('gdpr', 'Este necesar acordul pentru prelucrarea datelor.');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Se trimite...';
    submitBtn.disabled = true;

    const telefon = document.getElementById('telefon') ? document.getElementById('telefon').value.trim() : '';
    const firma = document.getElementById('firma') ? document.getElementById('firma').value.trim() : '';

    emailjs.send('service_42fdawn', 'template_j4048ov', {
      nume: nume,
      email: email,
      mesaj: mesaj,
      telefon: telefon,
      firma: firma
    }).then(function() {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }, function(error) {
      submitBtn.textContent = 'Trimite mesajul';
      submitBtn.disabled = false;
      alert('Eroare la trimitere. Te rog incearca din nou. (' + JSON.stringify(error) + ')');
    });
  });
}

// ============================================
// SMOOTH SCROLL PENTRU ANCORE INTERNE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
