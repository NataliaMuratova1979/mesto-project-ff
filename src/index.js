import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { makeCard, deleteCard, activeLikeButton } from './scripts/card.js';
import { openPopupWindow, closeModal, closeWindow, closeModalByOverlay, closeModalByEsc, openPopup } from './scripts/modal.js';


// -------------- Отображение шести карточек при открытии страницы ---------------- //

const placesList = document.querySelector('.places__list'); 

function addCard(cardArray) {

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLikeButton, openPopup); //подставляем data в функцию makeCard

    const placesList = document.querySelector('.places__list');
    placesList.append(card);
  });
}    

addCard(initialCards);

// --------------- Вводим данные в форму редактирования профиля  ---------------- //

const formElement = document.forms['edit-profile']; // это первая форма в документе
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

// --------------- Вводим данные в форму добавления новой карточки  ---------------- //

const placePopup = document.querySelector('.popup_type_new-card');

const formElementPlace = document.forms['new-place']; // вторая форма в документе 
console.log(formElementPlace); // работает

const savePlaceButton = formElementPlace.querySelector('.popup__button');

const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
const linkInput = formElementPlace.querySelector('.popup__input_type_url');


function makeNewCardData(evt) { // функция добавления карточки 
  evt.preventDefault();
  
  const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
  const linkInput = formElementPlace.querySelector('.popup__input_type_url');

  let newCardData = new Object();    

  newCardData.name = placeInput.value;
  newCardData.link = linkInput.value;

  //arrayToAdd.unshift(newCardData); 

  let cardToInsert = makeCard(newCardData, deleteCard, activeLikeButton, openPopup);

  placesList.prepend(cardToInsert); // добавляем карточку на страницу в начало контейнера

  placeInput.value = '';
  linkInput.value = '';

  closeModal(savePlaceButton);
}

formElementPlace.addEventListener('submit', makeNewCardData); 
savePlaceButton.addEventListener('click', function (event) { // закрываем попап по кнопке Сохранить
  placePopup.classList.remove('popup_is-opened');
});


const popupEdit = document.querySelector('.popup_type_edit'); // модальное окно редактировать профиль
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля

const popupAdd = document.querySelector('.popup_type_new-card'); // модальное окно добавить карточку
const openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки

openPopupWindow(openEditButton, popupEdit);
openPopupWindow(openAddButton, popupAdd);