export { makeCard, deleteCard, activeLike };

import { deleteCardFromServer } from './api.js';
import { putLIkeOnServer } from './api.js';
import { removeLikeFromServer } from './api.js';


 
// ------------------------ функция создания карточки с 5-го спринта ------------------------// 

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack, userId) { //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardElement.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardElement.name; //элемент массива

    // функция колбэк - удаление карточки

    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления 
    deleteButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
      deleteCallBack(placesItem, cardElement); // 
    }); 

    // функция колбэк - лайк картинки 

    const likeButton = placesItem.querySelector('.card__like-button'); // назначаем кнопку лайк
    likeButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
      likeCallBack(likeButton, cardElement, userId);  
    });
    
    //функция колбэк - открытие модального окна
    
    const popupImageButton = placesItem.querySelector('.card__image'); // картинка становится кнопкой  
    popupImageButton.addEventListener('click', () => { // по нажатию на картинку запускается колбэк
      openPopupCallBack(cardElement);
    });  
 
    // выводим карточки на страницу

    return placesItem;
  }

// ----------------- Функции - колбэки ----------------- //

function deleteCard(item, data) { //deleteCard => deleteCallBack при объявлении addCard card.js
   item.remove(); //убираем карточку
   deleteCardFromServer(data); // функция удаления карточки с сервера принимает аргументом данные из массива
};

function activeLike(button, data, user) { // activeLikeButton => likeCallBack при объявлении addCard card.js
    const arr = data.likes;
    console.log(data.likes);
    console.log(data.likes.length);
    console.log(arr.length);
    if (arr.length === 0) {
      button.classList.add('card__like-button_is-active');
      putLIkeOnServer(data);       
    }
    console.log(user);
    console.log('ниж е');
   // console.log(arr[0]._id);
    console.log('dsit'); 


/*
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id !== user) {
        console.log('nouser');
        button.classList.add('card__like-button_is-active');
        putLIkeOnServer(data);      
      } else {
        console.log('user');    

        button.classList.remove('card__like-button_is-active');
        removeLikeFromServer(data);
      }
    }*/
}

  //removeLikeFromServer(data);


/*
button.classList.add('card__like-button_is-active');
putLIkeOnServer(data);
console.log('получилосьььььььь');
console.log(user);
console.log(data.likes);
const array = data.likes;
console.log(array);
console.log('получилосьььььььь');
*/

