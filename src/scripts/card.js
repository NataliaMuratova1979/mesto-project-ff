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
    const likeCount = placesItem.querySelector('.card__like-count'); 
    const likeButton = placesItem.querySelector('.card__like-button'); // назначаем кнопку лайк
    likeButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
      likeCallBack(likeButton, cardElement, userId, likeCount);  
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

function activeLike(button, data, user, count) { // activeLikeButton => likeCallBack при объявлении addCard card.js
    const arr = data.likes;
    console.log(data.likes);
    console.log(data.likes.length);
    console.log(arr.length);
    console.log(count); // число лайкков под сердечком   

    const currentCount = parseInt(arr.length, 10);
    console.log(currentCount);
    
    if (arr.length === 0) {
      button.classList.add('card__like-button_is-active');
      putLIkeOnServer(data); 
      count.textContent = currentCount + 1;
    }
     
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id !== user) {
        button.classList.add('card__like-button_is-active');
        putLIkeOnServer(data);  
        count.textContent = currentCount + 1;
  
      } else {
        button.classList.remove('card__like-button_is-active');
        removeLikeFromServer(data);
        count.textContent = currentCount - 1;
      }
    }
}
