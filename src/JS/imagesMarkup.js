import { galleryRef } from '../index';

export function markupImage (arrayOfResults) {
  let markup = arrayOfResults
    .map(
      ({ largeImageURL, webformatURL, likes, views, comments, downloads }) =>
        `<div class="photo-card">
                  <a href="${largeImageURL}">
                  <div class="thumb">
                  <img
                    src="${webformatURL}"
                    alt=" ${webformatURL}"
                    loading="lazy"
                    />
                    </div>
                  </a>
                  <div class="info">
                    <p class="info-item"><b>Likes</b><br> ${likes}</p>
                    <p class="info-item"><b>Views</b><br> ${views}</p>
                    <p class="info-item"><b>Comments</b><br> ${comments}</p>
                    <p class="info-item"><b>Downloads</b><br> ${downloads}</p>
                  </div>
                </div>`
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
