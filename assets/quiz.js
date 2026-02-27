const quizForm = document.getElementById('quiz-form');
const quizStatus = document.getElementById('quiz-status');
const quizResult = document.getElementById('quiz-result');

if (quizForm && quizStatus && quizResult) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quizForm);
    const requiredKeys = ['paint', 'priority', 'usage', 'time', 'budget'];
    const missing = requiredKeys.find((key) => !data.get(key));

    if (missing) {
      quizStatus.textContent = 'Odpowiedz na wszystkie pytania.';
      quizStatus.className = 'form-status error';
      return;
    }

    const paint = data.get('paint');
    const priority = data.get('priority');
    const usage = data.get('usage');
    const budget = data.get('budget');

    let recommendation = 'Pakiet Premium';
    let href = '/#kontakt';
    let details = 'Rekomendujemy jednoetapową korektę i zabezpieczenie lakieru.';

    if (priority === 'interior') {
      recommendation = 'Detailing wnętrza';
      details = 'Skupimy się na dokładnym czyszczeniu i zabezpieczeniu wnętrza.';
    } else if (priority === 'sale') {
      recommendation = 'Pakiet sprzedażowy';
      href = '/uslugi/pakiet-sprzedazowy.html';
      details = 'Pakiet pod szybkie odświeżenie i lepszą prezentację auta przed sprzedażą.';
    } else if (paint === 'heavy' || budget === 'high' || usage === 'highway') {
      recommendation = 'Korekta lakieru + powłoka ceramiczna';
      href = '/uslugi/powloki-ceramiczne.html';
      details = 'Wieloetapowa korekta i mocna ochrona pod intensywne użytkowanie.';
    } else if (paint === 'new' && usage === 'city') {
      recommendation = 'Powłoka elastomerowa';
      href = '/uslugi/powloki-elastomerowe.html';
      details = 'Lekka ochrona dla auta codziennego z naciskiem na łatwą pielęgnację.';
    }

    quizResult.hidden = false;
    quizResult.innerHTML = `<h2>Twoja rekomendacja: ${recommendation}</h2><p>${details}</p><a class="btn" href="${href}">Przejdź do kontaktu</a>`;
    quizStatus.textContent = 'Gotowe!';
    quizStatus.className = 'form-status ok';
  });
}
