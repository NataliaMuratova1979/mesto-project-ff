import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { makeCard, deleteCard, activeLikeButton } from './scripts/card.js';
import { /*openPopupWindow,*/ addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';


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


const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно большая картинка
const popupImageContent = popupImageWindow.querySelector('.popup__content_content_image');
const popupImagePicture = popupImageContent.querySelector('.popup__image');
const popupImageText = popupImageContent.querySelector('.popup__caption');

const openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля
const openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки

const closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
closePopupButtons.forEach(closeModal);

// -------------- Отображение шести карточек при открытии страницы ---------------- //

function addCard(cardArray) {

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLikeButton, openImagePopup); //подставляем data в функцию makeCard

    placesList.append(card);
  });
}    

addCard(initialCards);

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

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

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




function updateUser() {
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.link = data.avatar;
    });
}

updateUser();

function updateCards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    headers: {
      authorization: '4b9f7beb-0341-4736-bda4-4b385e06b9d8'
    }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {      

      console.log('данные') 
      console.log(data);
      console.log(data[0]);

      const newArray = data;

      console.log('массив');
      console.log(newArray);

      console.log('элемент массива');
      console.log(newArray[0]);
      console.log(newArray[0].name);
      console.log(newArray[0].link);

      console.log('placesList');
      console.log(placesList);

      console.log('функция');
      console.log(addCard);

      addCard(newArray);    
       
    });
}

updateCards();



