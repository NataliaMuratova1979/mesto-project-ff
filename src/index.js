import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';

const popup = document.querySelector('.popup');  


//-----------------------------функция открытия попапа --------------------------------------//

const popupEdit = document.querySelector('.popup_type_edit'); // модальное окно редактировать профиль
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля

const popupAdd = document.querySelector('.popup_type_new-card'); // модальное окно добавить карточку
const openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки

function openPopupWindow(button, window) {
  button.addEventListener('click', function (event) {
    window.classList.add("popup_is-opened");
    closeModalByOverlay(window);
  });
}

openPopupWindow(openEditButton, popupEdit);
openPopupWindow(openAddButton, popupAdd);

// --------------- Назначаем кнопки закрытия модальных окон ---------------- //

let closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
closePopupButtons.forEach(closeModal);

// ---------------- функция закрытия модального окна по кнопке ---------------- //

function closeModal(button)  {
  button.addEventListener('click', function (event) { 

    let popupToClose = button.closest('div.popup');

    popupToClose.classList.remove('popup_is-opened');
    popupToClose.classList.add('popup_is-animated');

  });
}

// ---------------- функция закрытия модального окна по оверлею ---------------- //
// функция вызывается в коде на строке 18 (для модальных окон редактирования) и строке 133 (для попапа большой картинки)

function closeWindow(window) {
  window.classList.add('popup_is-animated');
};

function closeModalByOverlay(popupToClose) {

  popupToClose.addEventListener('click', event => {

  console.log ('проверка');

  if(event.target === event.currentTarget) {
    console.log(event.target);
    console.log('в чем разница');
    console.log(event.currentTarget);

    closeModal(event.target);
  }
});
};

// ---------------- функция закрытия модального окна по esc ---------------- //
/*
popup.addEventListener('keydown', function(e) {
  if(e.key === 27 ){

  closeWindow(popupOpened);
  }
  });
*/

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack) { //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardElement.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardElement.name; //элемент массива

    // функция колбэк - удаление карточки
  
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления    
    deleteButton.addEventListener('click', () => { // по нажатию на кнопку запускается колбэк
        deleteCallBack(placesItem); // 
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

function deleteCard(item) { //deleteCard => deleteCallBack при объявлении addCard
   item.remove(); //убираем карточку
}

function activeLikeButton(button) { // activeLikeButton => likeCallBack при объявлении addCard
  button.classList.add('card__like-button_is-active');
};

function openPopup(cardElement) { // openPopup => openPopupCallBack при объявлении addCard

    const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно
    const popupImageContent = popupImageWindow.querySelector('.popup__content_content_image');
    const popupImagePicture = popupImageContent.querySelector('.popup__image');
    const popupImageText = popupImageContent.querySelector('.popup__caption');
    
    popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
    popupImageText.textContent = cardElement.name; // текст - элемент массива 

  popupImageWindow.classList.add('popup_is-opened');

  closeModalByOverlay(popupImageWindow); //функция закрытия по оверлею 
};  

// --------------- Создаем новую карточку ---------------- //

const placePopup = document.querySelector('.popup_type_new-card');

const formElementPlace = document.forms['new-place']; // вторая форма в документе 
console.log(formElementPlace); // работает

const savePlaceButton = formElementPlace.querySelector('.popup__button');

let arrayToAdd = initialCards;

const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
const linkInput = formElementPlace.querySelector('.popup__input_type_url');

  
function makeNewCardData(evt) { // функция добавления карточки 
  evt.preventDefault();
  
  const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
  const linkInput = formElementPlace.querySelector('.popup__input_type_url');

  let newCardData = new Object();    

  newCardData.name = placeInput.value;
  newCardData.link = linkInput.value;

  arrayToAdd.unshift(newCardData); 

  let cardToInsert = makeCard(newCardData, deleteCard, activeLikeButton, openPopup);

  placesList.prepend(cardToInsert); // добавляем карточку на страницу в начало контейнера

  placeInput.value = '';
  linkInput.value = '';
}

formElementPlace.addEventListener('submit', makeNewCardData); 

savePlaceButton.addEventListener('click', function (event) { // закрываем попап по кнопке Сохранить
  placePopup.classList.add('popup_is-animated');
});
  


// -------------- Добавляем карточки на страницу ---------------- //

const placesList = document.querySelector('.places__list'); // был внутри функции addCard

function addCard(cardArray) {

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLikeButton, openPopup); //подставляем data в функцию makeCard

    const placesList = document.querySelector('.places__list');
    placesList.append(card);
  });
}    

addCard(initialCards);



// --------------- Редактируем профиль ---------------- //

const formElement = document.forms[0]; // это первая форма в документе
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value; 
}

formElement.addEventListener('submit', handleFormSubmit);
const saveProfileButton = formElement.querySelector('.popup__button');
closeModal(saveProfileButton);








/*
openEditButton.addEventListener('click', function (event) {
  popupEdit.setAttribute('style',
  `display: flex;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
  transition: visibility 0s, opacity 0.6s;`);
});

openAddButton.addEventListener('click', function (event) {
  popupAdd.setAttribute('style',
  `display: flex;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
  transition: visibility 0s, opacity 0.6s;`);
});

*/
