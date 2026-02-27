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

document.querySelectorAll('.ba').forEach((ba) => {
  const beforeImg = ba.querySelector('.ba__img--before');
  const afterImg = ba.querySelector('.ba__img--after');
  const beforeWrap = ba.querySelector('.ba__before-wrap');
  const divider = ba.querySelector('.ba__divider');
  const range = ba.querySelector('.ba__range');

  if (!beforeImg || !afterImg || !beforeWrap || !divider || !range) return;

  beforeImg.src = ba.dataset.before || '';
  afterImg.src = ba.dataset.after || '';

  const update = (value) => {
    beforeWrap.style.width = `${value}%`;
    divider.style.left = `${value}%`;
  };

  update(range.value);
  range.addEventListener('input', () => update(range.value));
});

const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quizForm.checkValidity()) {
      quizForm.reportValidity();
      return;
    }

    const answers = Object.fromEntries(new FormData(quizForm).entries());
    let recommendation = 'Pakiet Start: mycie + szybkie odświeżenie';
    let includes = ['Mycie detailingowe', 'Dekontaminacja', 'Odkurzanie wnętrza', 'Kontrola stanu lakieru'];
    let duration = 'około 1 dzień';
    let slug = '/uslugi/pakiet-sprzedazowy.html';

    if (answers.priority === 'interior') {
      recommendation = 'Detailing wnętrza + opcja ozonowania';
      includes = ['Pranie i czyszczenie tapicerki', 'Czyszczenie detali kokpitu', 'Impregnacja powierzchni', 'Opcjonalne ozonowanie'];
      duration = '6–10 godzin';
      slug = '/uslugi/detailing-wnetrza.html';
    } else if (answers.goal === 'sale') {
      recommendation = 'Pakiet sprzedażowy: szybki efekt i przygotowanie do ogłoszenia';
      includes = ['Mycie i dekontaminacja', 'Odświeżenie wnętrza', 'Korekta wizualna 1-step', 'Szybka ochrona lakieru'];
      duration = '1 dzień';
      slug = '/uslugi/pakiet-sprzedazowy.html';
    } else if (answers.paint === 'heavy' && (answers.protection === 'ceramic' || answers.budget === 'high')) {
      recommendation = 'Korekta 2-etapowa + powłoka ceramiczna';
      includes = ['Inspekcja i pomiar lakieru', 'Korekta wieloetapowa', 'Aplikacja ceramiki', 'Raport pielęgnacji po odbiorze'];
      duration = '2–3 dni';
      slug = '/uslugi/powloki-ceramiczne.html';
    } else if (answers.paint === 'light') {
      recommendation = 'Korekta 1-etapowa + sealant';
      includes = ['One-step polish', 'Usunięcie lekkich swirlów', 'Warstwa sealantu', 'Mycie serwisowe po 2 tygodniach'];
      duration = '1–2 dni';
      slug = '/uslugi/korekta-lakieru.html';
    } else if (answers.paint === 'ok' && answers.protection !== 'none') {
      recommendation = 'Odświeżenie lakieru + dopasowana ochrona';
      includes = ['Przygotowanie powierzchni', 'One-step finishing', 'Aplikacja ochrony', 'Instrukcja pielęgnacji'];
      duration = '1 dzień';
      slug = answers.protection === 'ceramic' ? '/uslugi/powloki-ceramiczne.html' : '/uslugi/korekta-lakieru.html';
    } else if (answers.priority === 'full') {
      recommendation = 'Pakiet Kompleks: zewnątrz + wnętrze';
      includes = ['Detailing wnętrza', 'Mycie i dekontaminacja', 'Korekta dopasowana do stanu', `Ochrona: ${answers.protection === 'none' ? 'do decyzji po inspekcji' : answers.protection}`];
      duration = '1–3 dni';
      slug = '/uslugi/pakiet-sprzedazowy.html';
    }

    quizResult.hidden = false;
    quizResult.innerHTML = `
      <h3>${recommendation}</h3>
      <ul>${includes.map((item) => `<li>${item}</li>`).join('')}</ul>
      <p><strong>Orientacyjny czas:</strong> ${duration}</p>
      <div class="quiz-result__cta">
        <a class="btn" href="#kontakt">Wyślij zdjęcia do wyceny</a>
        <a class="btn btn--ghost" href="tel:+48123123123" aria-label="Zadzwoń do studia">Zadzwoń</a>
        <a class="text-link" href="${slug}">Dowiedz się więcej o pakiecie</a>
      </div>
      <p>To wstępna rekomendacja, dokładna wycena po ocenie auta.</p>
    `;
    quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
