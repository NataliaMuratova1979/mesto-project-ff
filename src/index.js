import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
//import './components/modals.js';


// ---------------- функция закрытия модального окна по кнопке ---------------- //

function closeModal(button)  {
  button.addEventListener('click', function (event) { 

    let popupToClose = button.closest('div.popup');

    popupToClose.setAttribute('style',
    `display: flex;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      user-select: none;
      transition: visibility 0s 0.6s, opacity 0.6s;`);
  });
}



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
  button.setAttribute('style', 
  `background: transparent url('../../../../images/like-active.svg') no-repeat;`);
};

function openPopup(cardElement) { // openPopup => openPopupCallBack при объявлении addCard

    const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно
    const popupImageContent = popupImageWindow.querySelector('.popup__content_content_image');
    const popupImagePicture = popupImageContent.querySelector('.popup__image');
    const popupImageText = popupImageContent.querySelector('.popup__caption');
    
    popupImagePicture.src = cardElement.link; //картинка модального окна - элемент массива
    popupImageText.textContent = cardElement.name; // текст - элемент массива 

  popupImageWindow.setAttribute('style',
  `display: flex;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
  transition: visibility 0s, opacity 0.6s;`);
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
  placePopup.setAttribute('style',
    `display: flex;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: visibility 0s 0.6s, opacity 0.6s;`);
});
  


// -------------- Добавляем карточки на страницу ---------------- //

const placesList = document.querySelector('.places__list'); // был внутри функции addCard

function addCard(cardArray) {

  cardArray.forEach((data) => { //data - каждый элемент массива 
    console.log(data);

    const card = makeCard(data, deleteCard, activeLikeButton, openPopup); //подставляем data в функцию makeCard
    console.log(card);

    const placesList = document.querySelector('.places__list');
    placesList.append(card);
  });
}    

addCard(initialCards);



//-------------------------------------------------------------------//

let popup = document.querySelectorAll('.popup'); // весь попап (включая оверлей)

let popupEdit = document.querySelector('.popup_type_edit'); // модальное окно редактировать профиль
let openEditButton = document.querySelector('.profile__edit-button'); //кнопка открытия окна редактирования профиля

let popupAdd = document.querySelector('.popup_type_new-card'); // модальное окно добавить карточку
let openAddButton = document.querySelector('.profile__add-button'); //кнопка открытия окна добавления карточки


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



// --------------- Назначаем кнопки закрытия модальных окон ---------------- //


let closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
closePopupButtons.forEach(closeModal);
//saveButtons.forEach(closeModal);


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






// ------------------------- ЧЕРНОВИКИ ------------------------- //




/*
let newCardData = new Object();

newCardData.name = 'blabla';
newCardData.link = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";

initialCards.unshift(newCardData);
console.log(initialCards);
console.log('получилось');
*/






/*
function makeNewCardData(evt) {
  console.log('получилось');

  evt.preventDefault();

  console.log('получилось');

  console.log(initialCards);
  /*

    placeInput.value = '';
    linkInput.value = '';
    */
/*
    let newCardData = new Object();    

    newCardData.name =  placeInput.value;
    console.log(newCardData.name);

    newCardData.link = linkInput.value;
    console.log(newCardData.link);


    initialCards.unshift(newCardData);
*/
    /*
    placeInput.value = '';
    linkInput.value = '';
    

    return newCardData;

}


*/



/*
function handleFormSubmit(evt) {
  evt.preventDefault();

/*
  nameInput.value = "";
  jobInput.value = "";
*/

  //document.querySelector('.profile__title').textContent = nameInput.value;
 // document.querySelector('.profile__description').textContent = jobInput.value; 

  /*
  function closePopup(button)  {
    button.addEventListener('click', function (event) { 
  
      let closestDiv = formElement.closest('div.popup__content');
      console.log('CLOSESTDIV')
      console.log(closestDiv);
  
      closestDiv.setAttribute('style',
      `display: flex;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        transition: visibility 0s 0.6s, opacity 0.6s;`);
    });

    closePopup(saveButton);

}

formElement.addEventListener('submit', handleFormSubmit);


*/



  
/*function addCard(cardArray) { //при вызове функции на место cardArray встанет наш массив initialCards
 /* for (i = 0; i < cardArray.length; i++) {
    const cardElement = cardArray[i];

    const placesList = document.querySelector('.places__list');

    placesList.append(makeCard(cardElement, deleteCard)); //добавляем карточку 
  }
}*/


/*
formElementPlace.addEventListener('submit', (e) => {
  e.preventDefault();
    const fornData = new FormData(formElementPlace); // создаем объект FormData, передаем в него элемент формы
    const nameInput = formData.get('name');
    const linkInput = formData.get('link');

    const newCardData = new Object();
    newCardData.name = nameInput;
    newCardData.link = linkInput;
  

    arrayToAdd.unshift(newCardData);
});

formElementPlace.addEventListener('submit', makeNewCardData);
*/





/*
  function closePopup(button)  {
    button.addEventListener('click', function (event) { 
  
      let closestDiv = formElement.closest('div.popup__content');
      console.log('CLOSESTDIV')
      console.log(closestDiv);
  
      closestDiv.setAttribute('style',
      `display: flex;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        user-select: none;
        transition: visibility 0s 0.6s, opacity 0.6s;`);
    });

    closePopup(saveButton);

    
*/







// --------------- Создаем функции создания видимости и невидимости  ---------------- //

/*
function makeInvisible(object) { // добавить стиль
  object.setAttribute('style',
  `display: flex;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: visibility 0s 0.6s, opacity 0.6s;`);
};

function makeVisible(oblect) {// добавить стиль 
  object.setAttribute('style',
  `display: flex;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
  transition: visibility 0s, opacity 0.6s;`);
};
*/