export { makeCard, deleteCard, activeLike };

import { deletesCard } from './api.js';
import { putsLIke } from './api.js';
import { removesLike } from './api.js';


 
// ------------------------ функция создания карточки с 5-го спринта ------------------------// 

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack, userId) { //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект
    const placesItemImage = placesItem.querySelector('.card__image');

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItemImage.src = cardElement.link; //элемент массива
    placesItemImage.alt = cardElement.name; //элемент массива

    // функция колбэк - удаление карточки      
    // отображаем корзинку только на своей карточке
    
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления 
    const cardOwnerId = cardElement.owner._id;

    if (cardOwnerId !== userId) { 
      deleteButton.classList.add('invisible');
    };
    
    deleteButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
      deleteCallBack(placesItem, cardElement); // 
    }); 

    // функция колбэк - лайк картинки 
    // отображаем количество лайков карточки //

    const likesNumber = cardElement.likes.length;
    const likeCount = placesItem.querySelector('.card__like-count'); 
    const likeButton = placesItem.querySelector('.card__like-button'); // назначаем кнопку лайк
    likeCount.innerHTML = likesNumber;

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
  
  deletesCard(data).then((data) => {
    console.log(data);
    item.remove() 
  })
  .catch((err) => {
    console.log(err)
  })    
};

function activeLike(button, dataCard, user, count) { // activeLike => likeCallBack при объявлении addCard card.js
       
    const arrLikes = dataCard.likes;
    
    if (button.classList.contains('card__like-button_is-active')) {
      button.classList.remove('card__like-button_is-active');

      removesLike(dataCard).then((data) => {             
        const currentCount = parseInt(data.likes.length, 10);
        count.textContent = currentCount;
      })
      .catch((err) => {
        console.log(err)
      })      
      
    } else {
      button.classList.add('card__like-button_is-active');

      putsLIke(dataCard).then((data) => {
        const currentCount = parseInt(data.likes.length, 10);
        count.textContent = currentCount;
      })
      .catch((err) => {
        console.log(err)
      })
    }
}
