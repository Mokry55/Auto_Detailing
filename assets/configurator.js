const configForm = document.getElementById('config-form');
const configStatus = document.getElementById('config-status');
const configResult = document.getElementById('config-result');

if (configForm && configStatus && configResult) {
  configForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(configForm);
    const requiredKeys = ['paint', 'priority', 'usage', 'time', 'budget'];
    const missing = requiredKeys.find((key) => !data.get(key));

    if (missing) {
      configStatus.textContent = 'Odpowiedz na wszystkie pytania.';
      configStatus.className = 'form-status error';
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

    configResult.hidden = false;
    configResult.innerHTML = `<h2>Twoja rekomendacja: ${recommendation}</h2><p>${details}</p><a class="btn" href="${href}">Przejdź do kontaktu</a>`;
    configStatus.textContent = 'Gotowe!';
    configStatus.className = 'form-status ok';
  });
}
