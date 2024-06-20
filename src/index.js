import './pages/index.css'; 
//import { initialCards } from './scripts/cards.js';
import { makeCard, deleteCard, activeLike } from './scripts/card.js';
import { /*openPopupWindow,*/ addPopupOpened, closeModal, addPopupAnimated, removePopupOpened } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { saveAvatarToServer, saveCardToServer, saveUserToServer, updateCardsFromServer, updateUserFromServer } from './scripts/api.js';



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

const avatarButton = document.querySelector('.profile__image-hover');
const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar']; // форма редактирования аватара
const inputAvatar = formAvatar.querySelector('.popup__input_type_url_avatar');


// -------------- Отображение карточек из массива при открытии страницы ---------------- //

function addCard(cardArray, userId) { // cardArray - массив карточек, полученный из промиса

  cardArray.forEach((data) => { //data - каждый элемент массива 

    const card = makeCard(data, deleteCard, activeLike, openImagePopup, userId); //подставляем data в функцию makeCard
  
    //console.log(data); // данные карточки, полученные с сервера
    //console.log(userId); // id юзера, полученный с сервера и переданный аргументом из промиса

    // ------- убираем иконку корзинки с чужих карточек ------- //

    const deleteButton = card.querySelector('.card__delete-button');
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
        cardLikeButton.classList.add('card__like-button_is-active');
      } 
    }
    // --- добавляем карточку --- //
    placesList.append(card); 
  });
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

  renderLoading(true);
  
  // добавляем карточку на страницу в начало контейнера

  const newCardFromInput = {
    "name": placeInput.value,
    "link": linkInput.value,
  };

  saveCardToServer(newCardFromInput).then((data) => {
    console.log('данные');
    console.log(data);    
    const cardDataFromServer = data;
    console.log(cardDataFromServer);

    const userId = cardDataFromServer.owner._id;

    const cardToInsert = makeCard(cardDataFromServer, deleteCard, activeLike, openImagePopup, userId);

    placesList.prepend(cardToInsert);

    evt.target.reset(); 

    renderLoading(false);

    removePopupOpened(placePopup);
  });   
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

openAddButton.addEventListener('click', function (event) {// добавляем карточку

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


const profileImage = document.querySelector('.profile__image');
const card = document.querySelector('.card');

//---------------- Загрузка информации о пользователе с сервера ----------------//
// updateUserFromServer - функция загрузки информации о пользователе с сервера

  
//---------------- Загрузка карточек с сервера ----------------//
// updateCardsFromServer - функция загрузки карточек с сервера


// --------------- ПРОМИС --------------- //

Promise.all([updateUserFromServer(), updateCardsFromServer()])
  .then(([userData, cardData]) => {
    
    console.log(userData);    
    console.log(cardData);
    
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = (`url(${userData.avatar})`);

    const pageOwnerId = userData._id; // назначаем переменную хозяина страницы
    console.log(pageOwnerId); // 0831699e8c089d4fe917fe41 (правильно)
    
    cardData.forEach((card) => { 
    
      const cardOwnerId = card.owner._id; // назначаем переменную автора карточки
      console.log(cardOwnerId); //688d72b1e612f990d333e149
      const cardId = card._id;
      
    }); 
    
    addCard(cardData, pageOwnerId); 
  });

//---------------- Редактирование профиля на сервере ----------------//
// saveUserToServer - функция редактирования профиля на сервере

formElement.addEventListener('submit', function(event) { // отправляем данные на сервер по клику
  event.preventDefault();

  renderLoading(true);

  const newUserFromInput = {
    "name": nameInput.value,
    "about": jobInput.value,
  }

  saveUserToServer(newUserFromInput).then((data) => {

     console.log(data)
 
     .catch((err) => {
       console.log(err)
     })

     .finally(() => {
     renderLoading(false);
     });
  });
});
  

//---------------- Добавление карточки на сервер ----------------//
// saveCardToServer - Функция сохранения карточки на сервере

//---------------- Обновление аватара пользователя ----------------//
// saveAvatarToServer - функция редактирования профиля на сервере

avatarButton.addEventListener('click', function (event) { // Открываем форму редактирования аватара пользователя
  clearValidation(formAvatar);
  addPopupOpened(avatarPopup);
});

formAvatar.addEventListener('submit', function(event) { // отправляем данные на сервер по клику
  event.preventDefault();
  console.log(inputAvatar.value);

  renderLoading(true);

  const newUserAvatar = {
    "avatar": inputAvatar.value,
  }

  saveAvatarToServer(newUserAvatar).then((data) => {
 
     profileImage.style.backgroundImage = (`url(${data.avatar})`)

      .catch((err) => {
        console.log(err)
      })

      .finally(() => {
      renderLoading(false);
    });
  });

  removePopupOpened(avatarPopup);
});


// ------------ Функция уведомления о процессе загрузки ------------ //
// saveAvatarToServer saveUserToServer saveCardToServer 

function renderLoading(isLoading) {
  if (isLoading) {
    savePlaceButton.innerHTML = "Сохранение...";
  } else {
    savePlaceButton.innerHTML = "Сохранить";
  }
}
