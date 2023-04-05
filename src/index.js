import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// import debounce from 'lodash.debounce';
import './sass/_common.scss';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import './js/notiflix.notification';
var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

// Ключ pixabay и основной URL
const KEY = '35107875-0af5883f359969caac6a8f266';
const BASE_URL = 'https://pixabay.com/api/';

// Получаем доступ к форме
const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');
// const body = document.querySelector('body');

// const galleryRef = document.querySelector('.gallery');
// console.log(loadMoreBtnRef);
console.log(loadMoreBtnRef);

let inputValue = '';
let lastInputValue = '';
let total = '';

let perPage = 40;
let currentPage = 1;
// Первоначально кнопка невидимая, появляется после 1 запроса
loadMoreBtnRef.style.display = 'none';

searchFormRef.addEventListener('submit', onSearch);

function onSearch (event) {
  event.preventDefault();
  inputValue = event.currentTarget.searchQuery.value.trim();
  console.log(inputValue);
  // Если строчка без значений, мы очищаем строчку,выводим сообщение и прекращаем выполнение
  if (inputValue === '') {
    galleryRef.innerHTML = '';
    Notiflix.Notify.failure('Please enter a keyword to continue the search');
    return;
  }
  if (inputValue === lastInputValue) {
    currentPage += 1;
  }
  if (inputValue === !lastInputValue) {
    // Если значение инпута отличается от последнего, то новое значение импута запишется в переменную lastInputValue (теперь оно последнее значение ввода)
    lastInputValue = inputValue;
    // значение страницы становится 1, так как новый запрос и с 1 страницы
    currentPage = 1;
    // и мы очищаем сточку импута
    galleryRef.innerHTML = '';
  }
}
