// export function imageMarkup (arrayOfResults) {
//   let markup = arrayOfResults
//     .map(
//       card =>
//         `<div class="photo-card">
//                 <a href="${card.largeImageURL}">
//                 <div class="thumb">
//                 <img
//                   src="${card.webformatURL}"
//                   alt=" ${card.webformatURL}"
//                   loading="lazy"
//                   />
//                   </div>
//                 </a>
//                 <div class="info">
//                   <p class="info-item"><b>Likes</b><br> ${card.likes}</p>
//                   <p class="info-item"><b>Views</b><br> ${card.views}</p>
//                   <p class="info-item"><b>Comments</b><br> ${card.comments}</p>
//                   <p class="info-item"><b>Downloads</b><br> ${card.downloads}</p>
//                 </div>
//               </div>`
//     )
//     .join('');
// // Это нужно перенести при запуске функции использовать
//   galleryEl.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();
// }

// export function markupCard (arrayOfResults) {
//   return (markup = arrayOfResults
//     .map(
//       ({ largeImageURL, webformatURL, likes, views, comments, downloads }) =>
//         `<div class="photo-card">
//                   <a href="${largeImageURL}">
//                   <div class="thumb">
//                   <img
//                     src="${webformatURL}"
//                     alt=" ${webformatURL}"
//                     loading="lazy"
//                     />
//                     </div>
//                   </a>
//                   <div class="info">
//                     <p class="info-item"><b>Likes</b><br> ${likes}</p>
//                     <p class="info-item"><b>Views</b><br> ${views}</p>
//                     <p class="info-item"><b>Comments</b><br> ${comments}</p>
//                     <p class="info-item"><b>Downloads</b><br> ${downloads}</p>
//                   </div>
//                 </div>`
//     )
//     .join(''));
//   //   console.log(markup);
// }
