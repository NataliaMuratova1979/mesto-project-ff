import './pages/index.css'; 
import { makeCard, deleteCard, activeLike } from './scripts/card.js';
import { /*openPopupWindow,*/ addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';
import { savesAvatar, savesCard, savesUser, updatesCards, updatesUser } from './scripts/api.js';
//import { renderLoading } from './scripts/utils.js';



// -------------- Константы элементов DOM -------------- //

const placesList = document.querySelector('.places__list'); // addCard

const profilePopup = document.querySelector('.popup_type_edit'); // редактирование профиля
const formEditProfile = document.forms['edit-profile']; // форма редактирования профиля
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
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

const avatarButton = document.querySelector('.profile__image-hover');
const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar']; // форма редактирования аватара
const inputAvatar = formAvatar.querySelector('.popup__input_type_url_avatar');


// -------------- Отображение карточек из массива при открытии страницы ---------------- //

function addCard(cardArray, userId) { // cardArray - массив карточек, полученный из промиса

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLike, openImagePopup, userId); //подставляем data в функцию makeCard
  
    // ------ закрашиваем сердечко у лайкнутой карточки ------- //

    const cardLikeButton = card.querySelector('.card__like-button');
    for (let i = 0; i < data.likes.length; i++) {
      if (data.likes[i]._id === userId) {
        cardLikeButton.classList.add('card__like-button_is-active');
      } 
    }
    
    placesList.append(card); // --- добавляем карточку --- //
  });
}    

// --------------- Вводим данные в форму добавления новой карточки  ---------------- //

function makeNewCardData(evt) { // функция добавления карточки 
  evt.preventDefault();
  
  const button = formElementPlace.querySelector('.popup__button');
  button.innerHTML = "Сохранение...";
  console.log(button);
  console.log('это кнопка сохранить');
  
  // добавляем карточку на страницу в начало контейнера

  const newCardFromInput = {
    "name": placeInput.value,
    "link": linkInput.value,
  };

  savesCard(newCardFromInput).then((data) => {

    const cardDataFromServer = data;
    const userId = cardDataFromServer.owner._id;
    const cardToInsert = makeCard(cardDataFromServer, deleteCard, activeLike, openImagePopup, userId);

    placesList.prepend(cardToInsert);
    })

    .catch((err) => {
      console.log(err)
    })

    .finally(() => {
      button.innerHTML = "Сохранить...";
      console.log(button);
    });

    removePopupOpened(placePopup);     
};

formElementPlace.addEventListener('submit', makeNewCardData); 


// ------------------ Вызываем функции открытия попапа по кнопке ------------------ //

openEditButton.addEventListener('click', function (event) {

  //nameInput.placeholder = profileTitle.textContent;
  //jobInput.placeholder = profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig); 
  addPopupOpened(profilePopup);  

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

 });

openAddButton.addEventListener('click', function (event) {// добавляем карточку

  addPopupOpened(placePopup);
  clearValidation(formElementPlace, validationConfig);
});

//------------------ Функция отрытия большой картинки ------------------ //

function openImagePopup(cardElement) { // openPopup - openImagePopup => openPopupCallBack при объявлении addCard 
  
  popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
  popupImageText.textContent = cardElement.name; // текст - элемент массива 
  popupImageText.alt = cardElement.name; //элемент массива

  addPopupOpened(popupImageWindow);
}
 
enableValidation(validationConfig);
addPopupAnimated(popupImageWindow);

const profileImage = document.querySelector('.profile__image');
const card = document.querySelector('.card');

//---------------- Загрузка информации о пользователе с сервера ----------------//
// updatesUser - функция загрузки информации о пользователе с сервера

  
//---------------- Загрузка карточек с сервера ----------------//
// updatesCards - функция загрузки карточек с сервера


// --------------- ПРОМИС --------------- //

Promise.all([updatesUser(), updatesCards()])
  .then(([userData, cardData]) => {
    
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = (`url(${userData.avatar})`);

    const pageOwnerId = userData._id; // назначаем переменную хозяина страницы
    
    cardData.forEach((card) => { 
      const cardOwnerId = card.owner._id; // назначаем переменную автора карточки
      const cardId = card._id;
    });
     
  addCard(cardData, pageOwnerId)
  })
  
  .catch(error => {
    console.error(error)
});

// --------------- Вводим данные в форму редактирования профиля  ---------------- //
// ---------------------- Редактирование профиля на сервере ----------------------//
// savesUser - функция редактирования профиля на сервере     

formEditProfile.addEventListener('submit', function(event) { // отправляем данные на сервер по клику
  event.preventDefault();

  profileTitle.textContent = nameInput.value;  
  profileDescription.textContent = jobInput.value;

  removePopupOpened(profilePopup); 

  const button = formEditProfile.querySelector('.popup__button');
  button.innerHTML = "Сохранение...";

  const newUserFromInput = {
    "name": nameInput.value,
    "about": jobInput.value,
  }

  savesUser(newUserFromInput).then((data) => {
      console.log(data)
    })
          
    .catch((err) => {
      console.log(err)
    })

    .finally(() => {
      button.innerHTML = "Сохранить";
      console.log(button);
    });
});
  

//---------------- Добавление карточки на сервер ----------------//
// savesCard - Функция сохранения карточки на сервере

//---------------- Обновление аватара пользователя ----------------//
// savesAvatar - функция редактирования профиля на сервере

avatarButton.addEventListener('click', function (event) { // Открываем форму редактирования аватара пользователя
  clearValidation(formAvatar, validationConfig);
  addPopupOpened(avatarPopup);
});

formAvatar.addEventListener('submit', function(event) { // отправляем данные на сервер по клику
  event.preventDefault();
  console.log(inputAvatar.value);

  const button = formAvatar.querySelector('.popup__button');
  button.innerHTML = "Сохранение...";

  const newUserAvatar = {
    "avatar": inputAvatar.value,
  }

  // https://st.peopletalk.ru/wp-content/uploads/2024/01/7582018093978a7ad840211319501d5b.jpg

  savesAvatar(newUserAvatar).then((data) => {
 
    profileImage.style.backgroundImage = (`url(${data.avatar})`);
    removePopupOpened(avatarPopup)
    })
      
    .catch((err) => {
      console.log(err)
    })

    .finally(() => {
      button.innerHTML = "Сохранить";
      console.log(button);
    }); 
  
});