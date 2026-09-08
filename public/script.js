document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('contactSubmit');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await resp.json();

      if (resp.ok && result.ok) {
        if (statusEl) {
          statusEl.textContent = "Thanks! I'll get back to you within a business day.";
          statusEl.className = 'form-status success';
        }
        form.reset();
      } else if (statusEl) {
        statusEl.textContent = result.error || 'Something went wrong. Please try again.';
        statusEl.className = 'form-status error';
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Could not reach the server. Please try again.';
        statusEl.className = 'form-status error';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }
    }
  });
}
