import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

function populateBreeds() {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      hideLoader();
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      breedSelect.addEventListener('change', handleBreedSelect);
    })
    .catch(error => {
      showError();
      hideLoader();
      console.error(error);
    });
}

function handleBreedSelect() {
  const breedId = breedSelect.value;

  showLoader();
  hideError();

  fetchCatByBreed(breedId)
    .then(catData => {
      hideLoader();
      renderCatInfo(catData);
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
    });
}

function renderCatInfo(catData) {
  const { url, breed, description, temperament } = catData;

  catInfo.innerHTML = `
    
    <img class="cat-image" src="${url}" alt="Cat Image">
    <h2 class="cat-breed">${breed}</h2>
    <p class="cat-description">${description}</p>
    <p class="cat-temperament">${temperament}</p>
    
  `;
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

populateBreeds();
