const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.service-row').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.service-item');
    const expanded = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(expanded));
  });
});

const chips = document.querySelectorAll('.chip');
const galleryItems = document.querySelectorAll('.gallery-item');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');

    galleryItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

const packageButtons = document.querySelectorAll('.line-btn');
const packageSelect = document.getElementById('package-select');

packageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    packageSelect.value = button.dataset.package;
    document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [...form.querySelectorAll('input[required], textarea[required], select[required]')];
  const firstInvalid = fields.find((field) => !field.checkValidity());

  if (firstInvalid) {
    formStatus.textContent = 'Sprawdź pola formularza i spróbuj ponownie.';
    formStatus.className = 'form-status error';
    firstInvalid.focus();
    return;
  }

  formStatus.textContent = 'Dziękujemy. Oddzwonimy lub odpiszemy jeszcze dziś.';
  formStatus.className = 'form-status ok';
  form.reset();
});
