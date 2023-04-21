import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import debounce from 'lodash.debounce';
import './sass/_common.scss';
// import { markupImage } from './JS/imagesMarkup';

import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

// Ключ pixabay и основной URL
const KEY = '35107875-0af5883f359969caac6a8f266';
const BASE_URL = 'https://pixabay.com/api/';

// Получаем доступ к форме
const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');
export const galleryRef = document.querySelector('.gallery');
// let markup;
let inputValue = '';
let lastInputValue = '';

let perPage = 40;
let currentPage = 1;
const DEBOUNCE_DELAY = 300;
// Первоначально кнопка невидимая, появляется после 1 запроса
loadMoreBtnRef.style.display = 'none';

searchFormRef.addEventListener('submit', getSearchResults);
loadMoreBtnRef.addEventListener(
  'click',
  debounce(moreSearchResults, DEBOUNCE_DELAY)
);

async function getSearchResults (event) {
  event.preventDefault();

  //   определяет значение инпута
  try {
    inputValue = event.currentTarget.searchQuery.value.trim();

    // Если строчка без значений, мы очищаем строчку,выводим сообщение и прекращаем выполнение

    if (inputValue === '') {
      galleryRef.innerHTML = '';
      Notiflix.Notify.failure('Please enter a keyword to continue the search');
      loadMoreBtnRef.style.display = 'none';
      return;
    }
    if (inputValue === lastInputValue) {
      currentPage += 1;
    }
    if (inputValue !== lastInputValue) {
      // Если значение инпута отличается от последнего, то новое значение импута запишется в переменную lastInputValue (теперь оно последнее значение ввода)
      lastInputValue = inputValue;
      // значение страницы становится 1, так как новый запрос и с 1 страницы
      currentPage = 1;
      // и мы очищаем сточку импута
      galleryRef.innerHTML = '';
    }

    const data = await addImages(currentPage, inputValue);
    console.log(data);
    // Результаты с сервера записываем в переменную
    const arrayOfResults = data.hits;
    // Если результат поиска 0, то оставляем страница 1, кнопка загрузить больше не появляется+сообщение выводим об ошибке
    if (data.totalHits === 0) {
      currentPage = 1;
      loadMoreBtnRef.style.display = 'none';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    // Если результат поиска больше нуля, значит что то нашло и
    if (arrayOfResults.length > 0) {
      // Запускаем функцию создания html разметки, передаём туда arrayOfResults(результат с backend)
      markupImage(arrayOfResults);
      // Кнопка видимая становится
      loadMoreBtnRef.style.display = 'block';
      // Если страница текущая равна 1, значит первый поиск выполнили и выдаем сообщение
      if (currentPage === 1) {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      }
      currentPage += 1;
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Функция при нажатии кнопки загрузить больше
async function moreSearchResults () {
  try {
    let data = await addImages(lastInputValue, currentPage);
    const arrayOfResults = data.hits;
    console.log(arrayOfResults);
    // всего результатов
    console.log(data.totalHits);

    if (arrayOfResults.length > 0) {
      markupImage(arrayOfResults);
      loadMoreBtnRef.style.display = 'block';
      if (currentPage === 1) {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
      }
      currentPage += 1;
    }
    if (currentPage >= Math.ceil(data.totalHits / 40)) {
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
      loadMoreBtnRef.style.display = 'none';
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function addImages () {
  try {
    const response = await axios(
      `${BASE_URL}?key=${KEY}&q=${inputValue}&type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

function markupImage (arrayOfResults) {
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


// Задача 9

 const instance = axios.create({
  baseURL: 'https://dummyjson.com/'
})

export function userAddByRequest (user) {
  return instance.post(`users/add`, user)
}

// Вешаем слушателя на форму submit
const formAddUserData = document.querySelector("#newUserForm")
// console.log(formAddUserData)

const forUserDataMarcupPlace = document.querySelector("#newUserSection")

formAddUserData.addEventListener("submit", onFormAddUserData)

function onFormAddUserData(event){
  event.preventDefault();

  const firstName = event.target.elements.firstName.value.trim()
  console.log(firstName)
  const lastName = event.target.elements.lastName.value.trim()
  const email = event.target.elements.email.value.trim()
  const password = event.target.elements.password.value.trim()
  const birthDate = event.target.elements.birthDate.value.trim()
  const age = event.target.elements.age.value.trim()
  const address = event.target.elements.address.value.trim()
  const city = event.target.elements.city.value.trim()
  const postalCode = event.target.elements.postalCode.value.trim()
  const state = event.target.elements.state.value.trim()

  userAddByRequest({firstName ,lastName,  email, password, age, birthDate,  address: { address, city, postalCode, state  } }).then(({ data }) => {
        function createNewUserMarkup (user) {
          return `
          
          <p> firstName: ${user.firstName}</p><p>lastName: ${user.lastName}</p>
          <p>email: ${user.email}</p>
          <p>password: ${user.password}</p>
          <p>age: ${user.age}</p>
          <p>birthDate: ${user.birthDate}</p>
          
          <ul>
          <p>User address: </p>
          <li> Address: ${user.address.address}</li>
          <li>City: ${user.address.city}</li>
          <li>Postal Code: ${user.address.postalCode}</li>
          <li>State: ${user.address.state}</li>

          </ul>
        
          `
        }
        forUserDataMarcupPlace.innerHTML = createNewUserMarkup(data)
      })


}



// const usersForm = document.querySelector('#userByNameForm')
// const usersPlace = document.querySelector('#usersByName')

// usersForm.addEventListener('submit', onUsersFormSubmit)

// function onUsersFormSubmit (event) {
//   event.preventDefault()
//   // Тут вводим event.target.elements потом значение с импута в html - name и value
//   const usersNameInput = event.target.elements.name.value.trim()
//   console.log(usersNameInput)

//   getUserByName(usersNameInput).then(({ data: { users } }) => {
//     let markupUser = users
//       .map(
//         user =>
//           `<li><p> Вот данные User(s) с FirstName: ${user.firstName}</p><p>LastName: ${user.lastName}</p><p>Age: ${user.age}</p><p>Email: ${user.email}</p><p>Phone: ${user.phone}</p></li>`
//       )
//       .join('')
//     usersPlace.innerHTML = markupUser
//   })
// }

const instanc = axios.create({
  baseURL: 'https://dummyjson.com/'
})

function getAllPostsByKeywords (posts) {
  return instanc.get(`posts/search?q=${posts}`)
}

const postsForm = document.querySelector("#filteredPostsForm")


postsForm.addEventListener("submit", onPostsForm)

function onPostsForm (event){
  event.preventDefault()

  const inputKeywords = event.target.elements.keyword.value

  getAllPostsByKeywords(inputKeywords).then(({data: {posts}})=>{

    // console.log({data: {posts}})
    let markupPost = posts
          .map(
            post =>
              `<li><p> Post title: ${post.title}</p><p>Post: ${post.body}</p><p>userId: ${post.userId}</p>
              <ul>
    ${post.tags.map(tag => `<li>${tag}</li>`).join('')}
  </ul>
              </li>`
          )
          .join('')
          postsForm.innerHTML = markupPost

  }
  
  )
}