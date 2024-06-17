import './pages/index.css'; 
//import { initialCards } from './scripts/cards.js';
import { makeCard, deleteCard, activeLike } from './scripts/card.js';
import { /*openPopupWindow,*/ addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

//import { deleteCardFromServer } from './scripts/api.js';


// -------------- Константы элементов DOM -------------- //

const placesList = document.querySelector('.places__list'); // addCard

const profilePopup = document.querySelector('.popup_type_edit'); // редактирование профиля
const formElement = document.forms['edit-profile']; // форма редактирования профиля
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 


const placePopup = document.querySelector('.popup_type_new-card'); // добавление новой карточки
const formElementPlace = document.forms['new-place']; // форма добавления новой карточки
const savePlaceButton = formElementPlace.querySelector('.popup__button');
const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
const linkInput = formElementPlace.querySelector('.popup__input_type_url');

const openDeleteCardButton = formElementPlace.querySelector('.popup__button');


const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно большая картинка
const popupImageContent = popupImageWindow.querySelector('.popup__content_content_image');
const popupImagePicture = popupImageContent.querySelector('.popup__image');
const popupImageText = popupImageContent.querySelector('.popup__caption');

const popupCardDelete = document.querySelector('.popup_type_delete-card');

const openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля
const openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки

const closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
closePopupButtons.forEach(closeModal);


// -------------- Отображение карточек из массива при открытии страницы ---------------- //

function addCard(cardArray, userId) { // cardArray - массив карточек, полученный из промиса

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLike, openImagePopup, userId); //подставляем data в функцию makeCard
  
    console.log(data); // данные карточки, полученные с сервера


    console.log(userId); // id юзера, полученный с сервера и переданный аргументом из промиса

    // ------- убираем иконку корзинки с чужих карточек ------- //

    const deleteButton = card.querySelector('.card__delete-button');
    console.log(deleteButton);
    const cardOwnerId = data.owner._id;
    if (cardOwnerId !== userId) { 
      deleteButton.classList.add('invisible');
    };

    // ------- отображаем количество лайков карточки ------- //

    const likesNumber = data.likes.length;
    const cardLikeCount = card.querySelector('.card__like-count');
    cardLikeCount.innerHTML = likesNumber;

    // ------ закрашиваем сердечко у лайкнутой карточки ------- //

    const cardLikeButton = card.querySelector('.card__like-button');
    for (let i = 0; i < data.likes.length; i++) {
      if (data.likes[i]._id === userId) {
        console.log('черное сердечко');
        cardLikeButton.classList.add('card__like-button_is-active');
      } 
    }
   

    placesList.append(card); 
  });
   // ---------------- добавляем карточку ---------------- //
}    

// --------------- Вводим данные в форму редактирования профиля  ---------------- //

addPopupAnimated(profilePopup);

function handleFormSubmit(evt) {// функция редактирования профиля

  evt.preventDefault();
  profileTitle.textContent = nameInput.value;  
  profileDescription.textContent = jobInput.value; 

  removePopupOpened(profilePopup); 
}

formElement.addEventListener('submit', handleFormSubmit);

// --------------- Вводим данные в форму добавления новой карточки  ---------------- //

function makeNewCardData(evt) { // функция добавления карточки 
  evt.preventDefault();
  
  const newCardData = new Object();    

  newCardData.name = placeInput.value;
  newCardData.link = linkInput.value;

  const cardToInsert = makeCard(newCardData, deleteCard, activeLikeButton, openImagePopup);

  placesList.prepend(cardToInsert); // добавляем карточку на страницу в начало контейнера

  const newCardFromInput = {
    "name": placeInput.value,
    "link": linkInput.value,
  };

  saveCardToServer(newCardFromInput);
 
  evt.target.reset(); 

  removePopupOpened(placePopup);
}

formElementPlace.addEventListener('submit', makeNewCardData); 


// ------------------ Вызываем функции открытия попапа по кнопке ------------------ //

openEditButton.addEventListener('click', function (event) {

  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileDescription.textContent;

  clearValidation(formElement); 
  addPopupOpened(profilePopup);

  //nameInput.value = profileTitle.textContent;
  //jobInput.value = profileDescription.textContent;
  //update placeholder

  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileDescription.textContent;

 });

openAddButton.addEventListener('click', function (event) {

  addPopupOpened(placePopup);
  clearValidation(formElementPlace);
});

//------------------ Функция отрытия большой картинки ------------------ //

function openImagePopup(cardElement) { // openPopup - openImagePopup => openPopupCallBack при объявлении addCard 
  
  popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
  popupImageText.textContent = cardElement.name; // текст - элемент массива 
  popupImageText.alt = cardElement.name; //элемент массива

  addPopupOpened(popupImageWindow);
  addPopupAnimated(popupImageWindow);
}
 
enableValidation();

/*
Токен: 4b9f7beb-0341-4736-bda4-4b385e06b9d8
Идентификатор группы: wff-cohort-16
*/


/*const profile__image background-image url */
const profileImage = document.querySelector('.profile__image');
//const profileTitle = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__description'); 
const card = document.querySelector('.card');
//const UserId = card.owner._id;

//---------------- Загрузка информации о пользователе с сервера ----------------//

function updateUserFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then((res) => {
      return res.json();
    })
}    
  
updateUserFromServer();

//---------------- Загрузка карточек с сервера ----------------//

function updateCardsFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then((res) => {
      return res.json();
    })
}

updateCardsFromServer();


// --------------- ПРОМИС --------------- //

Promise.all([updateUserFromServer(), updateCardsFromServer()])
  .then(([userData, cardData]) => {
    
    console.log(userData);    
    console.log(cardData);
    
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.link = userData.avatar;

    const pageOwnerId = userData._id; // назначаем переменную хозяина страницы
    console.log(pageOwnerId); // 0831699e8c089d4fe917fe41 (правильно)
    
    cardData.forEach((card) => { 
    
      const cardOwnerId = card.owner._id; // назначаем переменную автора карточки
      console.log(cardOwnerId); //688d72b1e612f990d333e149
      const cardId = card._id;
      
    }); 
    
    addCard(cardData, pageOwnerId); 
  })


//---------------- Редактирование профиля на сервере ----------------//

console.log('редактируем профиль');

function saveUserToServer(newUser) {  // функция редактирования профиля на сервере
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {

    method: 'PATCH',
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser),
    })

    .then(res => res.json())
    .then(res => console.log(res))  
}


formElement.addEventListener('submit', function(event) { // отправляем данные на сервер по клику

  event.preventDefault();

  const newUserFromInput = {
    "name": nameInput.value,
    "about": jobInput.value,
  }

  console.log(newUserFromInput);
  saveUserToServer(newUserFromInput);
  console.log('все работает');

});
  

//---------------- Добавление карточки на сервер ----------------//

console.log('добавляем карточку');

function saveCardToServer(newCard) {  // функция редактирования карточек на сервере
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {

    method: 'POST',
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCard),
    })

    .then(res => res.json())
    .then(res => console.log(res))
}

