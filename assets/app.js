const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Otwórz menu');
    });
  });
}

const chips = document.querySelectorAll('.chip');
const galleryItems = document.querySelectorAll('.gallery-item');

if (chips.length && galleryItems.length) {
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
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxImage && lightboxClose && galleryItems.length) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.full;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.classList.remove('no-scroll');
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
}

const packageButtons = document.querySelectorAll('.line-btn');
const packageSelect = document.getElementById('package-select');
const customServiceWrap = document.getElementById('custom-service-wrap');
const customService = document.getElementById('custom-service');

packageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!packageSelect) return;
    packageSelect.value = button.dataset.package;
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  });
});

function toggleCustomServiceField() {
  if (!packageSelect || !customServiceWrap || !customService) return;
  const isOther = packageSelect.value === 'Inne';
  customServiceWrap.hidden = !isOther;
  customService.required = isOther;
  if (!isOther) customService.value = '';
}

if (packageSelect) {
  packageSelect.addEventListener('change', toggleCustomServiceField);
  toggleCustomServiceField();
}

const form = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (form && formStatus) {
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

    if (customService && customService.required && !customService.value.trim()) {
      formStatus.textContent = 'Uzupełnij pole „Jaka usługa?”.';
      formStatus.className = 'form-status error';
      customService.focus();
      return;
    }

    formStatus.textContent = 'Dziękujemy. Oddzwonimy lub odpiszemy jeszcze dziś.';
    formStatus.className = 'form-status ok';
    form.reset();
    toggleCustomServiceField();
  });
}

document.querySelectorAll('[data-ba]').forEach((block) => {
  const card = block.closest('.ba-card');
  const range = card?.querySelector('[data-ba-range]');
  const beforeLayer = block.querySelector('.ba-before');
  const divider = block.querySelector('.ba-divider');

  if (!(range instanceof HTMLInputElement) || !beforeLayer || !divider) return;

  const setSplit = (value) => {
    const split = `${value}%`;
    beforeLayer.style.width = split;
    divider.style.left = split;
  };

  setSplit(range.value);
  range.addEventListener('input', () => setSplit(range.value));
  range.addEventListener('change', () => setSplit(range.value));
});
