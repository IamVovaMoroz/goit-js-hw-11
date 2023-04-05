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
// const loadMoreBtnRef = document.querySelector('.load-more');
// const body = document.querySelector('body');

// const galleryRef = document.querySelector('.gallery');
// console.log(loadMoreBtnRef);
console.log(searchFormRef);
