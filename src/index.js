// Імпортуємо необхідні функції і модулі

import Notiflix from 'notiflix'; // Імпорт бібліотеки Notiflix
import SlimSelect from 'slim-select'; // Імпорт бібліотеки SlimSelect

import { fetchBreeds, fetchCatByBreed } from './cat-api';

// Створюємо рядок з опцією-плейсхолдером для селекту
const selectPlaceholder = `<option class="js-placeholder" value="choose">Select the cat</option>`;

// Отримуємо посилання на HTML-елементи
const select = document.querySelector('.breed-select');
const catInfoCard = document.querySelector('.cat-info');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

// Додаємо плейсхолдер до селекту
select.insertAdjacentHTML('afterbegin', selectPlaceholder);

// Відображаємо завантажувач і ховаємо селект
loaderMessage.hidden = false;
select.hidden = true;

// Функція для генерації розмітки для селекту
function markupSelect(arr) {
  return arr
    .map(({ name, id }) => {
      return `<option class="js-select-option" value="${id}">${name}</option>`;
    })
    .join('');
}

// Отримуємо список порід та заповнюємо селект
fetchBreeds()
  .then(data => {
    select.insertAdjacentHTML('beforeend', markupSelect(data));
    // console.log(data);
    loaderMessage.hidden = true;
    select.hidden = false;
  })
  .catch(err => console.log(err));

// Додаємо обробник події для зміни вибору в селекті
select.addEventListener('change', onChangeSelect);

// Функція для обробки вибору в селекті
function onChangeSelect() {
  catInfoCard.classList.add('cat-card');
  errorMessage.hidden = true;
  loaderMessage.hidden = false;
  select.hidden = true;
  // console.log(select.value);
  fetchCatByBreed(select.value)
    .then(data => {
      console.log(data[0]);
      const img = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      catInfoCard.innerHTML = createCatCard(
        img,
        name,
        description,
        temperament
      );
      loaderMessage.hidden = true;
      select.hidden = false;
      catInfoCard.classList.remove('cat-card');
    })
    .catch(err => {
      Notiflix.Report.failure(
        'Something went wrong!',
        'Please try again later'
      );

      loaderMessage.hidden = true;
      select.hidden = false;
      console.log(err);
      catInfoCard.classList.add('cat-card');
    });
}

// Функція для створення розмітки карточки кота
function createCatCard(img, name, description, temperament) {
  return `<img class="js-cat-photo" src="${img}" alt="${name}" width="500">
    <div class="js-cat-description">
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p>
    </div>`;
}
