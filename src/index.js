import './pages/index.css'; 
import { initialCards } from './scripts/cards.js';
//import './components/modals.js';

function makeCard(cardElement, deleteCallBack, likeCallBack, openPopupCallBack) { 
    //при добавлении карточки cardElement = элемент массива, deleteCallBack = deleteCard

    const cardTemplate = document.querySelector('#card-template').content; // берем шаблон

    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); // клонируем его, создаем объект

    placesItem.querySelector('.card__title').textContent = cardElement.name; //элемент массива 
    placesItem.querySelector('.card__image').src = cardElement.link; //элемент массива
    placesItem.querySelector('.card__image').alt = cardElement.name; //элемент массива
  
    const deleteButton = placesItem.querySelector('.card__delete-button'); // назначаем кнопку удаления
    
    deleteButton.addEventListener('click', () => { 
        deleteCallBack(placesItem); // 
    }); 

    const popupImageButton = placesItem.querySelector('.card__image'); // картинка становится кнопкой
    const popupImageWindow = document.querySelector('.popup_type_image'); // модальное окно
    document.querySelector('.popup__image').src = cardElement.link; //картинка модального окна - элемент массива
    document.querySelector('.popup__caption').textContent = cardElement.name; // текст - элемент массива 

    // функция колбэк - лайк картинки 

    const likeButton = placesItem.querySelector('.card__like-button');

    likeButton.addEventListener('click', () => {
      likeCallBack(likeButton);
    });
       
    
    //функция колбэк - открытия модального окна

    popupImageButton.addEventListener('click', () => {
      openPopupCallBack(popupImageWindow);
    });  
    
        
    return placesItem;
    console.log(placesItem);
  }




// ----------------- Функции - колбэки ----------------- //

function deleteCard(item) { //deleteCard => deleteCallBack при объявлении addCard
   item.remove(); //убираем карточку
}

function activeLikeButton(button) { // activeLikeButton => likeCallBack при объявлении addCard
  button.setAttribute('style', 
  `background: transparent url('../../../../images/like-active.svg') no-repeat;`);
};


function openPopup(window) { // openPopup => openPopupCallBack при объявлении addCard
  window.setAttribute('style',
  `display: flex;
  visibility: visible;
  opacity: 1;
  pointer-events: all;
  transition: visibility 0s, opacity 0.6s;`);
};  







// --------------- Создаем новую карточку ---------------- //

const formElementPlace = document.forms['new-place']; // вторая форма в документе 
console.log(formElementPlace); // работает

const placeInput = formElementPlace.querySelector('.popup__input_type_card-name');
console.log(placeInput); // работает

const linkInput = formElementPlace.querySelector('.popup__input_type_url');
console.log(linkInput); // работает

console.log(initialCards); // работает

let arrayToAdd = initialCards;
console.log(arrayToAdd); // работает


function makeNewCardData(evt) {
  evt.preventDefault();
  console.log('ура получилось'); // не работает


  let newCardData = {
    name: 'чтототам',
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  }
  
  console.log(newCardData);

  /*let newCardData = new Object();    

  newCardData.name =  placeInput.value;
  console.log(newCardData.name);

  newCardData.link = linkInput.value;
  console.log(newCardData.link);*/

  arrayToAdd.unshift(newCardData);
  

  //evt.target.reset();
}

formElementPlace.addEventListener('submit', makeNewCardData);



// -------------- Добавляем карточки на страницу ---------------- //

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



// функция-добавлялка новой карточки 
// при клике на "Сохранить" новая карточка долна попадать в начало контейнера с ними
// диалоговое окно автоматически закрывается и очищается форма
// чтобы создавать новые карточки, добавить обработчик событий submit
/*


function addNewCard






function addNewCard(cardArray) {



  const newCard = makeCard(newData, deleteCard);
  console.log(newCard);

  const newCardPlace = cardArray[0];
}

*/

//addNewCard(initialCards)









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

// --------------- Назначаем кнопки закрытия модальных окон ---------------- //


let closePopupButtons = document.querySelectorAll('.popup__close'); //массив кнопки закрытия модального окна
console.log(closePopupButtons);

let saveButtons = document.querySelectorAll('.popup__button'); //массив кнопки Сохранить
  
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

closePopupButtons.forEach(closeModal);
saveButtons.forEach(closeModal);



// --------------- Редактируем профиль ---------------- //

const formElement = document.forms[0]; // это первая форма в документе
//console.log(formElement);

const nameInput = formElement.elements.name;
//console.log(nameInput);

const jobInput = formElement.elements.description;
//console.log(jobInput);

function handleFormSubmit(evt) {
  evt.preventDefault();

/*
  nameInput.value = "";
  jobInput.value = "";
*/

  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value; 

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

//evt.target.reset(); - очищаем форму 

}

formElement.addEventListener('submit', handleFormSubmit);








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
