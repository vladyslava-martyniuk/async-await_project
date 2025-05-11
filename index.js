const api_key = '49388392-02e817ef61ae4618fbf814ce7';
const imageGalleryForm = document.querySelector('#image-gallery');
const imageGallery = document.querySelector('#image-gallery-display');
const loadMoreBtn = document.querySelector('#load-more-btn');
let page = 1;
let query = '';

// Обробка форми
imageGalleryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  page = 1;
  query = event.target.searchQuery.value.trim();
  await fetchImages();
});

// Завантажити ще
loadMoreBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  page++;
  await fetchImages();
});

// Отримання зображень
async function fetchImages() {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${api_key}&q=${encodeURIComponent(query)}&page=${page}&per_page=40`);
    const data = await response.json();
    displayImages(data.hits);

    if (data.hits.length > 0 && page === 1) {
      loadMoreBtn.style.display = 'block';
    } else if (data.hits.length < 40) {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Помилка при отриманні зображень:', error);
  }
}

// Відображення зображень
function displayImages(images) {
  if (page === 1) {
    imageGallery.innerHTML = '';
  }

  images.forEach(image => {
    const container = document.createElement('div');
    container.classList.add('image-container');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const info = document.createElement('div');
    info.classList.add('image-info');
    info.innerHTML = `
    <span><strong>Назва:</strong> ${image.tags.split(',')[0]}</span>
      <span><strong>Автор:</strong> ${image.user}</span>
      <span><strong>Лайки:</strong> ${image.likes}</span>
      <span><strong>Коментарі:</strong> ${image.comments}</span>
      <span><strong>Завантаження:</strong> ${image.downloads}</span>
      
    `;

    container.appendChild(img);
    container.appendChild(info);
    imageGallery.appendChild(container);
  });
}

fetchImages();