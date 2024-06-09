import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
import { makeCard, deleteCard, activeLikeButton } from './scripts/card.js';
import { openPopupWindow, addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from './scripts/modal.js';

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

    const placesList = document.querySelector('.places__list');
    placesList.append(card);
  });
}    

addCard(initialCards);

// --------------- Вводим данные в форму редактирования профиля  ---------------- //

addPopupAnimated(profilePopup);

function handleFormSubmit(evt) {
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

openPopupWindow(openEditButton, profilePopup);
openPopupWindow(openAddButton, placePopup);

//------------------ Функция отрытия большой картинки ------------------ //

function openImagePopup(cardElement) { // openPopup - openImagePopup => openPopupCallBack при объявлении addCard 
  
  popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
  popupImageText.textContent = cardElement.name; // текст - элемент массива 
  popupImageText.alt = cardElement.name; //элемент массива

  addPopupOpened(popupImageWindow);
  addPopupAnimated(popupImageWindow);
}
 
// -------------------- Валидация форм -------------------- //

// formSelector: '.popup__form'  - html-элемент формы
// inputSelector: '.popup__input' - html-элемент поле ввода 

function showInputError(formSelector, inputSelector, errorMessage) {
  
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); 
  
  // находим элемент ошибки внутри самой функции
  
  inputSelector.classList.add('form__input_type_error'); // добавляем красную линию 
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active'); // выводим подпись с сообщением об ошибке
};

function hideInputError(formSelector, inputSelector) {

  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); 
    // находим элемент ошибки внутри самой функции

  inputSelector.classList.remove('form__input_type_error'); // убираем красную линию
  errorElement.classList.remove('form__input-error_active'); // убираем подпись с сообщением об ошибке
  errorElement.textContent = ''; // убираем сообщение об ошибке
};

// formSelector: '.popup__form'  - html-элемент форма
// inputSelector: '.popup__input' - html-элемент поле ввода 
// функция получает параметром форму, в которой находится проверяемое поле, и это само поле - проверяемое поле ввода

function checkInputValidity(formSelector, inputSelector) { //не проверено 
  // сначала надо как-то вызвать очистку формы 

  if (inputSelector.validity.patternMismatch) { // не проверено
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};


// проверяем валидность всех полей, чтобы настроить статус кнопки

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

// функция для выключения и включения кнопки Сохранить

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_disabled');
  } else { 
        buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled');
  }
};


// Добавляем слушатель событий всем полям ввода внутри формы
// Функция setEventListeners принимает параметром элемент формы и добавляет полям нужные обработчики

function setEventListeners(formSelector) {
  // добавляет обработчики сразу всем полям формы

  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  console.log(inputList);
  const buttonElement = formSelector.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement); // блокируем кнопку с самого начала

  inputList.forEach((inputSelector) => {

    inputSelector.addEventListener('input', function () {

      checkInputValidity(formSelector, inputSelector);
      
      toggleButtonState(inputList, buttonElement);
    });    
  });
};



// Добавление обработчиков всем формам

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
  });
};

enableValidation();


//clearValidation(someForm, validationConfig);

/*
function clearValidation(someForm, validationConfig) {

  const inputList = Array.from(someForm.querySelectorAll('.popup__input'));
  const buttonElement = someForm.querySelector('.popup__button');


  const validationConfig = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else { 
          buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
  };
  
}

*/
