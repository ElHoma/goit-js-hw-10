const apiKey =
  'live_TpYG3Dw36GgeRehIgPaGU2TQSwgAlaZqQPTjlRcF4HF6U70MLoNn6yp7e5moKhWu';
const baseUrl = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const url = `${baseUrl}/breeds`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const url = `${baseUrl}/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => {
      const catData = {
        url: data[0].url,
        breed: data[0].breeds[0].name,
        description: data[0].breeds[0].description,
        temperament: data[0].breeds[0].temperament,
      };
      return catData;
    });
}
