import app from './app.js';

const form = document.getElementById('search-form');
const list = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onBtnClick);

function clearGallery() {
  list.innerHTML = '';
}

function onFormSubmit(e) {
  e.preventDefault();
  app.query = e.currentTarget.elements.query.value.trim();
  if (!app.query) return;

  app.resetPage();
  clearGallery();
  fetchImages();
}

function onBtnClick() {
  fetchImages();
}

async function fetchImages() {
  try {
    const images = await app.fetchImages();
    if (images.length === 0) {
      alert('No images found. Try another query.');
      return;
    }
    renderGallery(images);
    loadMoreBtn.hidden = false;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) => `
      <li class="photo-card">
        <img src="${webformatURL}" alt="${tags}"/>
        <div class="stats">
          <p class="stats-item">likes: <b>${likes}</b></p>
          <p class="stats-item">views: <b>${views}</b></p>
          <p class="stats-item">comments: <b>${comments}</b></p>
          <p class="stats-item">saved: <b>${downloads}</b></p>
        </div>
      </li>
    `
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
}
