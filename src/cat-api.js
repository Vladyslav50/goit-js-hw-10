//   'live_FwjhWwkGLjGN8TLOa1eAqVzQ6HVtvMsLqxochOk1NnCiCkwt4EynL6DfOgvYXhlw';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_FwjhWwkGLjGN8TLOa1eAqVzQ6HVtvMsLqxochOk1NnCiCkwt4EynL6DfOgvYXhlw';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Не вдалося завантажити породи котів');
    }
  });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Не вдалося отримати інформацію про кота');
    }
  });
}
