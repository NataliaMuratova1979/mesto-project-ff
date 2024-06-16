export { makeCard, deleteCard, activeLikeButton };

import { deleteCardFromServer } from './api.js';
 
// ------------------------ функция создания карточки с 5-го спринта ------------------------// 

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack) { //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

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
      likeCallBack(likeButton);
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
   deleteCardFromServer(data);
}

function activeLikeButton(button) { // activeLikeButton => likeCallBack при объявлении addCard card.js
  button.classList.add('card__like-button_is-active');
};



